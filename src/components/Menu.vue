<template>
    <el-menu
      :default-openeds="openeds"
      :default-active="currentKey"
      unique-opened
      class="el-menu-vertical-demo">
      <el-sub-menu v-for="item in menuList" :key="item.index" :index="item.index">
        <template v-slot:title>
          <i class="el-icon-location"></i>
          <span>{{item.name}}</span>
        </template>
        <el-menu-item-group>
          <el-menu-item @click="menuClickHandle(val, item)" v-for="val in item.children" :key="val.id" :index="val.index">
            {{val.name}}
          </el-menu-item>
        </el-menu-item-group>
      </el-sub-menu>
    </el-menu>
</template>

<script>
import { reactive, toRefs, onMounted } from 'vue'
import { ElMenu, ElSubMenu, ElMenuItemGroup,ElMenuItem } from 'element-plus'
import { useRouter } from 'vue-router'

export default {
  name: 'HelloWorld',
  props: {
    msg: String,
    menuList: Array
  },
  components: { ElMenu, ElSubMenu, ElMenuItemGroup,ElMenuItem },
  setup(props) {

    const router = useRouter();
    console.log(props)

    const menuKeys = reactive({
      currentKey:  '',
      openeds: new Array(0)
    })

    const handleOpen = (key, keyPath) => {
      console.log(key, keyPath);
    }
    const handleClose = (key, keyPath) => {
      console.log(key, keyPath);
    }
    // const tabClickHandle = (val) => {
    //   console.log(val)
    //   menuKeys.currentKey = val.index
    // }
    const menuClickHandle = (val, item) => {
      console.log(item);
      // menuKeys.currentKey = val.index
      router.push(`${val.path}`)
      // console.log(menuKeys.currentKey)
    }
    onMounted(() => {
      props.menuList.forEach(item => {
        if(item.children) {
          item.children.forEach(val => {
            if(val.path === location.pathname) {
               menuKeys['currentKey'] = val.index;
               menuKeys['openeds'] = [item.index]
            }
          })
        }
      })
      console.log(menuKeys,'ss')
    })

    return {
      handleOpen, handleClose, menuClickHandle, ...toRefs(menuKeys)
    };
  }
}
</script>

<style scoped>

::v-deep .el-menu .is-active {
  background: #efefef
}
</style>