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


<!-- 
<template>
  <el-config-provider :locale="locale">
    <Layout :menuList="menuList">
      <router-view></router-view>
    </Layout>
  </el-config-provider>

</template>

<script>
import Layout from '@/components/Layout.vue'

import { ElConfigProvider } from 'element-plus'
import zhCn from 'element-plus/lib/locale/lang/zh-cn'

export default {
  name: 'App',
  components:{ Layout, ElConfigProvider },
  setup() {
    const menuList = [{
      path: '/nav1',
      name: '导航一',
      index: '1',
      children: [{
        path: '/page1',
        name: '标题一',
        index: '1-1'
      },{
        path: '/page2',
        name: '标题二',
        index: '1-2'
      },{
        path: '/template',
        name: 'template',
        index: '1-3'
      }]
    },{
      path: '/nav2',
      name: '导航二',
      index: '2',
      children: [{
        path: '/page3',
        name: '标题三',
        index: '2-1'
      },{
        path: '/page4',
        name: '标题四',
        index: '2-2'
      }]
    }]
    return {
      menuList, locale: zhCn,
    }
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
body{
  margin: 0;
  padding: 0;
}
.divide-block{
  width: 100%;
  height: 20px;
  background: rgba(128, 128, 128, 0.14);
}
</style> -->
