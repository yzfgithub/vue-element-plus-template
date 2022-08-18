import { createApp } from 'vue'
import App from './App.vue'

import store from './store/index'
import router from './router/index'

import './assets/iconfont/iconfont.css'
// 全局scss
import '@/styles/common.scss'
// 自动化svg
import { registerSvgComponent } from './icons'
// 注册组件
import { registerAntVComponent } from '@/utils/ant'

// import './mock/mock'

let instance = null;
function render(props = {}) {
    const { container } = props;
    instance = createApp(App)

    registerSvgComponent(instance)
    registerAntVComponent(instance)
    
    instance.use(router)
    instance.use(store)
    instance.mount(container ? container.querySelector('#app') : '#app')
}

// 独立运行时
if (!window.__POWERED_BY_QIANKUN__) {
    render()
  }
  
  export async function bootstrap() {
    console.log('[vue] vue app bootstraped')
  }
  export async function mount(props) {
    console.log('[vue] props from main framework', props)
    render(props)
  }
  export async function unmount() {
    instance.$destroy()
    instance.$el.innerHTML = ''
    instance = null
    router = null
  }
  