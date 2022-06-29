
export default {
    state: {
        token:'test-token'
    },
    getters: {
        token: state => state.token
    },
    mutations: {
        setToken(state, data) {
            state.token = data
        }
    },
    actions: {
        setTokenActions({ commit }, params) {
            commit('setToken', params)
        },
    }
}