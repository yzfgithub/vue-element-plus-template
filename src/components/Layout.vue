<template>
    <el-container>
      <el-header class="header">Header</el-header>
      <el-container class="container-box">
        <el-aside class="left-menu" width="200px">
          <Menu :menuList="menuList"></Menu>
        </el-aside>
        <el-main class="container">
            <slot></slot>
        </el-main>
      </el-container>
    </el-container>
</template>

<script>
import { useStore } from 'vuex'
import { reactive, ref, toRefs, watch, computed, onMounted } from 'vue'
import { getLoginUser } from '@/api/index'
import { useRouter } from 'vue-router'
import { ElContainer, ElHeader, ElAside,ElMain } from 'element-plus'
import Menu from './Menu'

export default {
  name: 'HelloWorld',
  components: { ElContainer, ElHeader, ElAside, ElMain, Menu },
  props: {
    msg: String,
    menuList: Array
  },
  setup(props) {
    const router = useRouter()
    console.log(props)
    let store = useStore();
    let text = ref(store.state.userStore.token)
    let state = reactive({
      name: store.state.userStore.token,
      age: 21
    })


    const sd = computed(() => {
        console.log('lala')
        const aa = store.state.userStore.token
        return ref(aa)
    })
    watch(sd, (newV, oldV) => {
        console.log(newV, oldV, 'val')
    })

    onMounted(() => {
      testFun();
    })

    const toNextPage = () => router.push('/page2')
    const changeStore = () => {
      const random = (Math.random()*100).toFixed(2)
        store.dispatch('setTokenActions', random)
        
    }
    const testFun = async () => {
        const res  = await getLoginUser();
        console.log(res);
    }

    return {
      toNextPage, changeStore, ...toRefs(state), text, sd
    };
  }
}
</script>

<style scoped>
.header{
    background: green;
    color: white;
    height: 60px;
}
.container-box {
    min-height: calc(100vh - 60px);
    background: rgba(128, 128, 128, 0.14)
}
.left-menu{
    color: white;
    background: #ffffff;
    margin-top: 20px;
    margin: 20px 0;
}
.container {
    background: #ffffff;
    margin: 20px;
    padding: 0;
}
</style>
