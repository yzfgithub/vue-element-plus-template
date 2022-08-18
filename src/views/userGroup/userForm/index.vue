<template>
    <div class="form-box">
        <div class="form-title">
            {{isEdit ? '编辑用户组' : '添加用户组'}}
        </div>
        <a-form
            :model="formState"
            layout="vertical"
            name="basic"
            autocomplete="off"
            ref="formRef"
        >
            <a-form-item
            label="名称"
            name="name"
            :rules="[{ required: true, message: '请填写用户组名称!' }]"
            >
                <a-input v-model:value="formState.name" maxlength="20" placeholder="名称长度不能大于20"/>
            </a-form-item>

            <a-form-item
            label="简介"
            name="introduction"
            >
                <a-textarea v-model:value="formState.introduction" maxlength="300" placeholder="最多输入300字"/>
            </a-form-item>

            <a-form-item label="类型" name="type" :rules="[{ required: true, message: '请选择类型' }]">
                <a-radio-group v-model:value="formState.type">
                    <a-radio value="1">内部</a-radio>
                    <a-radio value="2">外部</a-radio>
                    <a-radio value="3">外包</a-radio>
                    <a-radio value="4">其他</a-radio>
                </a-radio-group>
            </a-form-item>

            <a-form-item name="leaderList" label="负责人" :rules="[{ required: true, message: '请选择负责人' }]">
                <a-select
                    v-model:value="formState.leaderList"
                    mode="multiple"
                    label-in-value
                    placeholder="请选择负责人"
                    style="width: 100%"
                    :filter-option="false"
                    :not-found-content="leaderList.fetching ? undefined : null"
                    :options="leaderList.list"
                    @search="fetchLeaderUser"
                    @select="handleLeaderSelect"
                    @deselect="handleLeaderDeselect"
                >
                    <template v-if="leaderList.fetching" #notFoundContent>
                        <a-spin size="small" />
                    </template>
                </a-select>
            </a-form-item>

            <a-form-item
            name="memberList"
            label="成员"
            :rules="[{ required: true, message: '请选择成员' }]"
            >
            <a-select
                v-model:value="formState.memberList"
                mode="multiple"
                label-in-value
                placeholder="请选择成员"
                style="width: 100%"
                :filter-option="false"
                :not-found-content="memberList.fetching ? undefined : null"
                :options="memberList.list"
                @search="fetchMemberUser"
                @select="handleMemberSelect"
                @deselect="handleMemberDeselect"
            >
                <template v-if="memberList.fetching" #notFoundContent>
                    <a-spin size="small" />
                </template>
            </a-select>
            </a-form-item>
        </a-form>
        <div class="form-handle">
            <div>
                <a-button @click="submitHandle" type="primary">保存</a-button>
                &nbsp;
                <a-button @click="cancelHandle">取消</a-button>
            </div>
            <div v-if="isEdit">
                <a-button @click="deleteHandle" type="primary" danger>删除用户组</a-button>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref, watch } from 'vue';
import { useRouter } from 'vue-router'
import { Modal } from 'ant-design-vue';
import { postMemberGroup, putMember, deleteMemberById, } from '@/api/userGroup'
import baseFun from './index'
import { useStore } from 'vuex'
import { debounce } from 'lodash-es';

    let store = useStore()
    // 获取路由信息
    const router = useRouter();
    const formRef = ref()

    // 领导成员选择
    const { leaderList, fetchLeaderUser, memberList, fetchMemberUser, editState, isEdit, groupId, formState, resetData, initData } = baseFun()

    // 提交操作
    const submitHandle = debounce(() => {
        formRef.value.validateFields().then(res => {
            const params = Object.assign({}, res, {
                type: parseInt(res.type),
                leaderList: editState['leaderArr'],
                memberList: editState['memberArr'],
            })
            if(isEdit.value) {
                params.id = groupId.value
                putMember(params).then((res) => {
                    res.success && (router.push(`/userGroup/userList/${groupId.value}`),store.dispatch('getGroupListActions'))
                })
            } else {
                postMemberGroup(params).then(res => {
                    res.success && (router.push(`/userGroup/userList/${res.data}`),store.dispatch('getGroupListActions'))
                })
            }
        }).catch(err => {
            console.log(err)
        })
    }, 300)

    //取消
    const cancelHandle = () => {
      router.push('/userGroup/groupEdit')
    }

    // 删除
    const deleteHandle = () => {
        Modal.confirm({
            title: '删除用户组',
            icon: <ExclamationCircleOutlined style="color: #469ffb;" />,
            content: '是否删除该用户组',
            onOk() {
                deleteMemberById(router.currentRoute.value.params.id).then(res => {
                    router.go('/userGroup/groupEdit')
                })
            },
            onCancel() {},
        });
    }

    const handleLeaderDeselect = (val) => {
        const idx = editState.leaderArr.findIndex(item => item.value === val.key)
        editState.leaderArr.splice(idx, 1)
    }
    const handleLeaderSelect = (val, opt) => {
        editState.leaderArr.push(opt)
    }
    const handleMemberDeselect = (val) => {
        console.log('ressss', editState.memberArr)
        const idx = editState.memberArr.findIndex(item => item.value === val.key)
        editState.memberArr.splice(idx, 1)
    }
    const handleMemberSelect = (val, opt) => {
        console.log('ressss', editState.memberArr)
        editState.memberArr.push(opt)
    }

    watch(() => router.currentRoute.value.params.id,(newId) => {
        if(newId && router.currentRoute.value.path.indexOf('groupEdit') > -1) {
            resetData()
            initData(newId)
        } else {
            resetData()
        }
    },{ immediate: true });

    { formState, isEdit, submitHandle, cancelHandle, deleteHandle, handleLeaderSelect, handleLeaderDeselect, handleMemberSelect, handleMemberDeselect,
        leaderList, fetchLeaderUser, memberList, fetchMemberUser
    }
</script>


<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
.form-box{
    width: 708px;
    .form-title {
        font-size: 22px;
        font-weight: 600;
        color: #2d2d2d;
        margin-bottom: 28px;
    }
    .form-handle {
        display: flex;
        justify-content: space-between;
    }
}
</style>
