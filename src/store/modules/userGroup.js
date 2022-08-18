import { getMemberGroupLeft } from '@/api/userGroup'

const getGroupList = (params, commit) => {
    getMemberGroupLeft(params).then(res=>{
        console.log(res,'res', params)
        if (res.success) {
            commit('setGroupList', res.data ?? [])
        }
    })
    
}

export default {
    state: {
        groupList: []
    },
    getters: {
        token: state => state.groupList
    },
    mutations: {
        setGroupList(state, data) {
            state.groupList = data
        }
    },
    actions: {
        getGroupListActions({ commit }, params) {
            // commit('setGroupList', params)
            getGroupList(params, commit)
        },
    }
}