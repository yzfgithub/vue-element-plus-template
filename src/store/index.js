import { createStore } from 'vuex'

import userStore from './modules/user'

export default createStore({
    modules: { userStore }
})