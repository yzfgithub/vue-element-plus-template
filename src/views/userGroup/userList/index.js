import { ref, reactive } from 'vue';
import { getMemberInfoList, getMemberGroupInfoById } from '@/api/userGroup'

export default function() {
    const selectionShow = ref(false);
    const addUserVisible = ref(false);
    const listTableRef = ref()

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

    const getDetail = (newId) => {
        getMemberGroupInfoById(newId).then(res => {
            res.success && (defState.titleName = res.data.name)
        })
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
    const addUserHandle = () => {
        addUserVisible.value = true
    }
    const closeAddUserModal = () => {
        addUserVisible.value = false
    }

    return {
        selectionShow, addUserVisible, defState, listTableRef,
        getDetail, getList, patchDelete, patchDeleteCancel, clearSelectionData, addUserHandle, closeAddUserModal
    }
}