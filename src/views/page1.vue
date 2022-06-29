<template>
  <div class="hello">
    <div>1</div>
    <el-button @click="toNextPage">I am ElButton</el-button>
  </div>
</template>

<script>
import { useStore } from 'vuex'
import { reactive, ref, toRefs, watch, computed, onMounted } from 'vue'
import { getLoginUser } from '@/api/index'
import { useRouter } from 'vue-router'
import { ElButton } from 'element-plus'

export default {
  name: 'HelloWorld',
  components: { ElButton },
  props: {
    msg: String
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

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
