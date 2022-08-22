<template>
    <div class="left-box">
        <div class="left-handle">
            <div class="title">用户组 （{{userGroupList.data.length}}）</div>
            <div @click="newGroup" class="add-btn">新增用户组</div>
        </div>
        <div class="group-box">
            <div v-for="(item, index) in userGroupList.data" :key="index" @click="showGroup(item.id)" class="group-item">
                <div class="name">
                    {{item.name}}
                </div>
                <FormOutlined @click.stop.prevent="editGroup(item.id)" class="edit-icon" />
                <div class="count">{{item.memberTotal}}</div>
                
            </div>
        </div>
    </div>
</template>

<script setup>
    import { defineComponent, onMounted, toRefs, watch, reactive } from 'vue'
    import { FormOutlined } from '@ant-design/icons-vue';
    import { useRouter } from 'vue-router'
    import { useStore } from 'vuex'

    const router = useRouter()
    let store = useStore();

    // components
    const defComponents = defineComponent({
        components: {
            FormOutlined
        }
    })

    
    let userGroupList = reactive({
        data: []
    })
    // 二级路由跳转
    const newGroup = () => {
        router.push(`/userGroup/groupCreate`)
    }
    const editGroup = (id) => {
        router.push(`/userGroup/groupEdit/${id}`)
    }
    const showGroup = (id) => {
        router.push(`/userGroup/userList/${id}`)
    }

    watch(()=>store.state.userGroupStore.groupList,(newV, oldV) => {
        userGroupList['data'] = newV
    }, {
        deep: true
    })

    // 返回
    {
        toRefs(defComponents), newGroup, editGroup, showGroup, userGroupList
    }
</script>


<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
.left-box{
    width: 100%;
    height: 100%;
    /* padding: 0 20px; */
    .left-handle{
        display: flex;
        align-items: center;
        justify-content: space-between;
        line-height: 40px;
        margin-bottom: 30px;
        .title{
            color: #2d2d2d;
            font-weight: 600;
            font-size: 18px;
        }
        .add-btn{
            font-size: 14px;
            color: #1184fa;
            cursor: pointer;
        }
    }
    .group-box{
        height: calc(100% - 70px);
        overflow-y: auto;
        .group-item{
            display: flex;
            justify-content: space-between;
            /* line-height: 60px; */
            padding: 10px 0 10px 5px;
            align-items: center;
            cursor: pointer;
            overflow: hidden;
            .name {
                flex: 1;
                line-height: 20px;
            }
            .count, .edit-icon{
                width: 50px;
                text-align: center;
                line-height: 20px;
            }
            img{
                display: inline-block;
                width: 40px;
                height: 40px;
                margin-right: 10px;
            }
            .edit-icon{
                display: none
            }
        }
        .group-item:hover{
            background: #eee;
            .count {
               display: none 
            }
            .edit-icon{
                display: block
            }
            .edit-icon:hover{
                color: #1184fa
            }
        }
    }
}
</style>
