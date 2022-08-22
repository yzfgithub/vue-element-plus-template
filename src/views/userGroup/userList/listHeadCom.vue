<template>
    <div class="list-head">
        <div class="title" :title="titleName">{{titleName}}</div>
        <div class="cus-input"></div>
        
        <div class="right-handle">
             <a-input v-model:value="searchName" @change="changeInput" @pressEnter="onSearch" style="width: 200px;margin-right: 20px;" placeholder="搜索成员名称">
                <template #suffix>
                    <search-outlined @click="onSearch" />
                </template>
            </a-input>
            <div>
                排序:
                <a-select
                ref="select"
                v-model:value="sortType"
                style="width: 120px"
                @change="handleChange"
                class="sort"
                :getPopupContainer="
                    triggerNode => {
                    return triggerNode.parentNode
                    }
                "
                >
                    <a-select-option v-for="(item, index) in sortTypeList" :key="index" :value="item.value">{{item.label}}</a-select-option>
                </a-select>
            </div>
            <a-button @click="addNewPerson" type="primary" class="add-btn">
                <template #icon><plus-outlined /></template>
                <span class="add-label">添加成员</span>
            </a-button>
            &nbsp;&nbsp;&nbsp;&nbsp;
            <a-button @click="patchDelete" class="btn">批量删除</a-button>
        </div>
    </div>
</template>

<script setup>
    import { defineComponent, defineProps, toRefs, defineEmits, ref } from 'vue';
    import { PlusOutlined, SearchOutlined } from '@ant-design/icons-vue';
    import { sortTypeList } from '@/utils/constant'

    // components
    const defComponents = defineComponent({
        components: {
            PlusOutlined, SearchOutlined
        }
    })
    // emit
    const defEmits = defineEmits(['patchDelete', 'getList', 'addUser'])
    // props
    const defProps = defineProps({
        titleName: {
            type: String,
            default: ''
        }
    })

    const { titleName } = toRefs(defProps)
    const sortType = ref('1');
    const searchName = ref('');

    // 添加成员事件
    const addNewPerson = () => {
        defEmits('addUser')
    }

    // 批量删除事件
    const patchDelete = () => {
        defEmits('patchDelete')
    }

    // 输入框内容修改
    const changeInput = (e) => {
        searchName.value = e.target.value
    }

    // 输入框搜索
    const onSearch = () => {
        defEmits('getList', {sort: sortType.value, name: searchName.value})
    }

    // 类型改变搜索
    const handleChange = (val) => {
        sortType.value = val;
        defEmits('getList', {sort: parseInt(sortType.value), name: searchName.value})
    }

    // return 
    {
        toRefs(defComponents), titleName, handleChange, onSearch, addNewPerson, patchDelete, sortTypeList, searchName
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
    .list-head {
        display: flex;
        height: 33px;
        line-height: 33px;
        align-items: center;
        font-size: 14px;
        .title {
            font-size: 20px;
            font-weight: 500;
            width: 390px;
            word-wrap: break-word; /*强制换行*/
            overflow: hidden; /*超出隐藏*/
            text-overflow: ellipsis;/*隐藏后添加省略号*/
            white-space: nowrap;/*强制不换行*/
        }
        .cus-input{
            flex: 1;
        }
        .search-input:hover, .search-input:focus{
            border-color: #40a9ff;
        }
        .right-handle {
            width: 580px;
            display: flex;
            .sort {
                width: 100px !important;
                margin-right: 20px;
            }
            ::v-deep .sort .ug-select-selector {
                border: none;
                outline-style: none;
            }
            .add-btn {
                width: 90px;
                font-size: 12px;
                .add-label {
                    margin-left: 2px;
                }
            }
        }
    }
</style>
