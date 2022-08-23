<template>
  <a-config-provider :locale="zh_CN" prefixCls="ug">
    <!-- 列表无数据自定义展示 -->
    <template #renderEmpty>
      <svg-icon className="no-data" iconClass="noList" />
      <!-- <a-empty /> -->
      <div class="tc">暂无数据</div>
    </template>

    <div id="page-ctn" ref="pageCtnRef">
      <router-view />
    </div>

  </a-config-provider>
</template>
<script>
import zh_CN from 'ant-design-vue/lib/locale-provider/zh_CN'
// import { Empty } from 'ant-design-vue';
import dayjs from 'dayjs';
import 'dayjs/locale/zh-cn';
dayjs.locale('zh-cn');
import { onMounted, onUnmounted, ref } from 'vue'
import { message } from 'ant-design-vue'
import EventBus from '@/utils/eventBus'

export default {
  name: 'page-ctn',
  setup() {  
    const pageCtnRef = ref()

    

    onMounted(() => {
      message.config({
        getContainer: () => pageCtnRef.value
      })

      EventBus.$on('pop', ({type, msg}) => {
        console.log(type, msg)
        message[type](msg)
      })
    })
    onUnmounted(() => {
      EventBus.$off('pop');
    })

    return { zh_CN, pageCtnRef, message }
  }
}
</script>
<style lang="scss">
.no-data {
  display: block;
  width: 100px;
  height: 100px;
  margin: 0 auto;
}
.tc {
  text-align: center;
}
#page-ctn {
  height: calc(100vh - 64px);
  font-family: Avenir, Helvetica, Arial, sans-serif;
  color: #2c3e50;
  background: #f2f5f9;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
</style>
