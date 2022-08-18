<template>
    <div class="list-box">
        <ListHeadCom :titleName="defState.titleName" @patchDelete="patchDelete" @getList="querySearch" @addUser="addUserHandle"></ListHeadCom>
        <cus-tip :message="'为保证企业信息安全，请及时将岗位变动与离职成员进行管理。'"></cus-tip>
        <ListTableCom ref="listTableRef" :titleName="defState.titleName" :dataSourceList="defState.dataSourceList" :tableLoading="defState.tableLoading" :pagination="defState.pagination" :selectionShow="selectionShow" @patchDeleteCancel="patchDeleteCancel" @getList="paginationChange"></ListTableCom>
        <addUser :addUserVisible="addUserVisible" @addNewUserEmit="addNewUserEmit" @closeAddUserModal="closeAddUserModal"></addUser>
    </div>
</template>

<script setup>
    import { defineComponent, toRefs, ref, reactive, watch } from 'vue';
    import { useRouter } from 'vue-router'
    import CusTip from '@/components/CusTip.vue'
    import ListHeadCom from './listHeadCom.vue'
    import ListTableCom from './listTableCom.vue'
    import { getMemberInfoList, getMemberGroupInfoById } from '@/api/userGroup'
    import addUser from '../addUser/index.vue'

    const defComponents = defineComponent({
        components: {
            ListHeadCom, CusTip, ListTableCom, addUser
        }
    })

    const defState = reactive({
        dataSourceList: [],
        pagination: {
            total: 0,
            page: 1,
            pageSize: 10
        },
        tableLoading: false,
        titleName: ''
    })

    const router = useRouter()
    const listTableRef = ref()
    const selectionShow = ref(false);

    const addUserVisible = ref(false);

    let queryForm = {}
    const patchDelete = () => {
        selectionShow.value = true
    }
    const patchDeleteCancel = () => {
        selectionShow.value = false
    }

    const clearSelectionData = () => {
        patchDeleteCancel()
        if(listTableRef.value) {
            listTableRef.value.clearSelectionData()
        }
    }

    const querySearch = (value) => {
        clearSelectionData()
        queryForm = value
        const params = Object.assign({}, {
            page: defState.pagination.page,
            pageSize: defState.pagination.pageSize,
            groupId: router.currentRoute.value.params.id
        }, value)

        getList(params)
    }
    const paginationChange = (value) => {
        const params = Object.assign({}, queryForm, {
            page: value.page || defState.pagination.page,
            pageSize: value.pageSize || defState.pagination.pageSize,
            groupId: router.currentRoute.value.params.id
        })
        getList(params)
    }

    const getList = (params) => {
        defState.tableLoading = true
        getMemberInfoList(params).then(res => {
            defState.tableLoading = false
            if(res.success) {
                defState.dataSourceList = res.data.result
                defState['pagination'].total = res.data.total
                defState['pagination'].pageSize = res.data.pageSize
                defState['pagination'].page = res.data.page
            }
        })
    }

    const getDetail = (newId) => {
        getMemberGroupInfoById(newId).then(res => {
            res.success && (defState.titleName = res.data.name)
        })
    }

    const addUserHandle = () => {
        addUserVisible.value = true
    }
    const closeAddUserModal = () => {
        addUserVisible.value = false
    }

    const addNewUserEmit = () => {
        console.log('ss')
        querySearch({sort: '1'})
    }

    watch(() => router.currentRoute.value.params.id,(newId) => {
        if(newId && router.currentRoute.value.path.indexOf('userList') > -1) {
            defState.dataSourceList = []
            defState.pagination = {
                total: 0,
                page: 1,
                pageSize: defState.pagination.pageSize
            }
            // 隐藏与清空批量
            clearSelectionData()

            getDetail(newId)
            
            querySearch({sort: '1'})
        }
    },{ immediate: true });

    {
        toRefs(defComponents), selectionShow, toRefs(defState), listTableRef, addNewUserEmit
    }
</script>


<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
.list-box{
    width: 100%;
    min-width: 960px;
}
</style>
