<template>
    <div id="user-group">
        <div class="left-menu">
            <LeftMenu></LeftMenu>
        </div>
        <div class="right-content">
            <router-view></router-view>
        </div>
    </div>
</template>

<script setup>
    import { onMounted } from 'vue'
    import LeftMenu from './leftMenu'
    import { useStore } from 'vuex'

    let store = useStore()

    onMounted(() => {
        store.dispatch('getGroupListActions');
    })

    {
        LeftMenu
    }
</script>


<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
@import './index.scss';
</style>
