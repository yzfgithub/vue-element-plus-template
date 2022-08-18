<template>
    <div id="new-user-modal"></div>
    <a-modal
    v-model:visible="modelVisible"
    title="添加成员"
    :width="838"
    @cancel="handleCancel"
    :getContainer="getContainer"
    >
    <template v-slot:footer class="custom-footer-btn">
        <a-button type="primary" @click="handleSave"> 保存 </a-button>
        <a-button @click="handleCancel"> 取消 </a-button>
    </template>
    <div class="form">
    <a-form 
    ref="newUserFormRef" 
    :model="defForm" 
    :label-col="labelCol" 
    :wrapper-col="wrapperCol" 
    :rules="rules"
    >
        <a-row>
            <a-col :span="12">
                <a-form-item 
                label="姓名：" 
                name="name"
                >
                    <a-input
                    v-model:value="defForm.name"
                    placeholder="请输入姓名"
                    allowClear
                    style="width: 290px;"
                    />
                </a-form-item>
            </a-col>
            <a-col :span="12">
                <a-form-item label="性别：" name="sex">
                    <a-radio-group v-model:value="defForm.sex">
                    <a-radio value="2"> 男 </a-radio>
                    <a-radio value="1"> 女 </a-radio>
                    </a-radio-group>
                </a-form-item>
            </a-col>
        </a-row>

        <a-row>
            <a-col :span="12">
            <a-form-item label="手机号：" name="phone">
                <a-input
                v-model:value="defForm.phone"
                placeholder="请输入手机号"
                allowClear
                style="width: 290px;"
                />
            </a-form-item>
            </a-col>
            <a-col :span="12">
            <a-form-item label="员工类型：" name="type">
                <a-select
                v-model:value="defForm.type"
                :getPopupContainer="
                    triggerNode => {
                    return triggerNode.parentNode
                    }
                "
                >
                <a-select-option
                    v-for="(item, index) in type"
                    :key="index"
                    :value="item.value"
                >
                    {{ item.label }}
                </a-select-option>
                </a-select>
            </a-form-item>
            </a-col>
        </a-row>
        <a-row>
            <a-col :span="6">
            <a-form-item
                label="证件号："
                name="credentialsType"
                :label-col="{ span: 12 }"
                :wrapper-col="{ span: 12 }"
            >
                <a-select
                v-model:value="defForm.credentialsType"
                style="width: 85px;"
                :getPopupContainer="
                    triggerNode => {
                    return triggerNode.parentNode
                    }
                "
                >
                <a-select-option
                    v-for="(item, index) in certificate"
                    :key="index"
                    :value="item.value"
                >
                    {{ item.label }}
                </a-select-option>
                </a-select>
            </a-form-item>
            </a-col>
            <a-col :span="6">
            <a-form-item name="credentialsNo">
                <a-input
                v-model:value="defForm.credentialsNo"
                style="width: 190px;"
                placeholder="请输入身份证号"
                allowClear
                />
            </a-form-item>
            </a-col>
            <a-col :span="12">
            <a-form-item label="邮箱号码：" name="email">
                <a-input
                v-model:value="defForm.email"
                placeholder="请输入邮箱号码"
                allowClear
                style="width: 290px;"
                />
            </a-form-item>
            </a-col>
        </a-row>
        <a-row>
            <a-col :span="24">
            <a-form-item
                label="所属组织："
                name="orgCode"
                :label-col="{ span: 3 }"
                :wrapper-col="{ span: 21 }"
            >
                <a-select
                v-model:value="defForm.orgCode"
                style="width: 99%;"
                placeholder="请选择"
                :getPopupContainer="
                    triggerNode => {
                    return triggerNode.parentNode
                    }
                "
                >
                <a-select-option
                    v-for="(item, index) in defState.company"
                    :key="index"
                    :value="item.orgCode"
                >
                    {{ item.orgName }}
                </a-select-option>
                </a-select>
            </a-form-item>
            </a-col>
        </a-row>

        <a-row>
            <a-col :span="12">
            <a-form-item label="生效时间：" name="effectiveTime">
                <a-date-picker
                v-model:value="defForm.effectiveTime"
                format="YYYY-MM-DD"
                style="width: 290px;"
                disabled
                :getCalendarContainer="
                    trigger => {
                    return trigger.parentNode
                    }
                "
                />
            </a-form-item>
            </a-col>
            <a-col :span="12">
            <a-form-item label="失效时间：" name="invalidTime">
                <a-date-picker
                v-model:value="defForm.invalidTime"
                format="YYYY-MM-DD"
                style="width: 290px;"
                :disabled-date="disabledEndDate"
                :getCalendarContainer="
                    trigger => {
                    return trigger.parentNode
                    }
                "
                />
            </a-form-item>
            </a-col>
        </a-row>
    </a-form>
    </div>
    </a-modal>

</template>

<script setup>
    import { defineComponent, toRefs, ref, reactive, watch, defineProps, defineEmits, onMounted } from 'vue';
    import AddNewUser from './AddNewUser.js'
    import { getOrgList, addStoreUser } from '@/api/common'
    import { debounce } from 'lodash-es';
    import moment from 'moment'
    import { message } from 'ant-design-vue';
    import dayjs from 'dayjs'
    
    const defProps = defineProps({
        modelVisible: {
            type: Boolean,
            default: false
        }
    })
    const defEmit = defineEmits(['modelCancel'])

    const { modelVisible } = toRefs(defProps)

    const defState = reactive({
        company: [],
    })
    const defForm = reactive({
        credentialsType: 1,
        type: 1,
        effectiveTime: moment(new Date()),
        invalidTime: dayjs(moment(new Date()).add(1, 'Y').endOf('day').format('YYYY-MM-DD'), 'YYYY-MM-DD')
    })


    const { rules, labelCol, wrapperCol, type, certificate } = AddNewUser()
    const newUserFormRef = ref()

    const getOrgListFun = () => {
        getOrgList().then(res => {
            defState.company = res.data
        })
    }

    const handleSave = debounce(() => {
        newUserFormRef.value.validateFields().then(res => {
            console.log(res);
             defForm['effectiveTime'] = moment(defForm['effectiveTime']).format('YYYY-MM-DD')
             defForm['invalidTime'] = moment(defForm['invalidTime']).format('YYYY-MM-DD')
            addStoreUser(defForm).then(res => {
                if (res.success) {
                    message.info('保存成功')
                    this.handleCancel()
                } else {
                    message.warning(res.msg)
                }
            })

        })
        
    }, 300)
    const handleCancel = () => {
        newUserFormRef.value.resetFields()
        defEmit('modelCancel')
    }
    // 失效时间禁用1年外
    const disabledEndDate = (current) => {
      return (
        current < moment(defForm.effectiveTime).endOf('day') ||
        current > moment(defForm.effectiveTime).add(1, 'Y').endOf('day')
      )
    }
    const getContainer = () => {
        return document.getElementById("new-user-modal")
    }

    onMounted(() => {
        getOrgListFun()
    })

    {
        toRefs(defState), defForm, labelCol, wrapperCol, type, certificate, modelVisible, rules, newUserFormRef, disabledEndDate, getContainer
    }

</script>

<style lang="scss" scoped>
 #new-user-modal {
    .form {
        width: 100%;
    }
    .avatar {
        width: 100px;
        height: 140px;
    }
    ::v-deep .ug-select {
        width: 290px;
    }
    ::v-deep .ug-form-item {
        margin-bottom: 16px;
    }
    ::v-deep .ug-modal-content .ug-modal-footer {
        text-align: center;
    }
 }

</style>