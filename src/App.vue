<template>
  <a-config-provider :locale="zh_CN" prefixCls="ug">
    <!-- 列表无数据自定义展示 -->
    <template #renderEmpty>
      <svg-icon className="no-data" iconClass="noList" />
      <!-- <a-empty /> -->
      <div class="tc">暂无数据</div>
    </template>

    <div id="app">
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

export default {
  setup() {
    return { zh_CN }
  }
  // components: { Empty },
  // methods: {}
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
#app {
  height: calc(100vh - 64px);
  font-family: Avenir, Helvetica, Arial, sans-serif;
  color: #2c3e50;
  background: #f2f5f9;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
</style>
