<template>
  <div class="hello">
    2
  <el-button @click="onClickLeft">I am ElButton</el-button>
  </div>
</template>

<script>
import { useStore } from 'vuex'
import { reactive, ref, toRefs } from 'vue'
import { useRouter } from 'vue-router'
import { ElButton } from 'element-plus'

export default {
  name: 'HelloWorld',
  props: {
    msg: String
  },
  components: { ElButton },
  setup(props) {
    const router = useRouter()
    console.log(props)
    let store = useStore();
    let text = ref(store.state.userStore.token)
    console.log(store.state.userStore.token)
    let state = reactive({
      name: store.state.userStore.token,
      age: 21
    })
    const onClickLeft = () => router.go(-1);
    return {
      onClickLeft, ...toRefs(state), text
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
