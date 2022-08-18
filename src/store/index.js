import { createStore } from 'vuex'

// import userStore from './modules/user'
import userGroupStore from './modules/userGroup'

export default createStore({
    modules: { userGroupStore }
})