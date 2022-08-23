<template>
    <div id="add-user-box" ref="addUserBoxRef"></div>
    <a-modal 
      v-model:visible="addUserShow"
      title="添加项目成员"
      :width="1200"
      class="user"
      :maskClosable="false"
      :getContainer="() => $refs.addUserBoxRef"
      @cancel="handleCancel"
    >
      <template v-slot:footer>
        <a-button @click="handleCancel"> 取消 </a-button>
        <a-button type="primary" @click="addMemberOk"> 添加 </a-button>
      </template>
      <p class="notice">添加成功后，对方将收到一条已加入项目的通知</p>
      <p class="notice">
        从集团成员中选择（如想添加的成员不属于本集团，请点击<span
          @click="addNewUser"
          > 添加成员 </span
        >）
      </p>
      <div class="title">成员添加</div>

      <div class="userContent">
        <a-transfer
          v-if="addUserShow"
          ref="transferRef"
          :data-source="defState.memberData"
          :target-keys="defState.targetKeys"
          showSearch
          :filter-option="
            (inputValue, item) => item.fullName.indexOf(inputValue) !== -1
          "
          @change="onChange"
          @search="handleSearch"
        >
          <template
            #children="{ selectedKeys, filteredItems,onItemSelectAll, onItemSelect }"
          >
            <a-table
              :row-selection="
                getRowSelection({
                  selectedKeys,
                  onItemSelectAll,
                  onItemSelect
                })
              "
              :columns="leftColumns"
              :data-source="filteredItems"
              size="small"
              :custom-row="
                ({ key }) => ({
                  on: {
                    click: () => {
                      itemSelect(key, !selectedKeys.includes(key))
                    }
                  }
                })
              "
            />
          </template>
        </a-transfer>
      </div>

      <AddNewUser :modelVisible="userVisible" @modelCancel="modelCancel" ></AddNewUser>

    </a-modal>
</template>

<script setup>
    import { defineComponent, toRefs, ref, reactive, computed, defineProps, defineEmits } from 'vue';
    import { queryUserByFullName, postMemberGroupMember } from '@/api/common'
    import { debounce, difference } from 'lodash-es';
    import AddNewUser from './AddNewUser.vue'
    import { useRouter } from 'vue-router'
    import { useStore } from 'vuex'
    import EventBus from '@/utils/eventBus'

    const defProps = defineProps({
        addUserVisible: {
            type: Boolean,
            default: false
        }
    })
    const defComponents = defineComponent({
        components: {
            AddNewUser
        }
    })
    const defEmit = defineEmits(['closeAddUserModal', 'addNewUserEmit'])

    const addUserShow = computed({
      get: () => {
          return defProps.addUserVisible
        },
      set: () => {}
    })


    let store = useStore()
    const transferRef = ref()
    const router = useRouter()
    const defState = reactive({
        targetKeys: [],
        memberData: []
    })

    let leftTableData = []
    let rightTableData = []

    let userVisible = ref(false)
    const addUserBoxRef = ref()

    const leftColumns = [
        {
          dataIndex: 'fullName',
          title: '成员名'
        },
        {
          dataIndex: 'deptName',
          title: '部门'
        },
        {
          dataIndex: 'position',
          title: '职务'
        },
        {
          dataIndex: 'phone',
          title: '手机号'
        }
      ]
    
    const handleCancel = () => {
        defState.targetKeys = []
        defState.memberData = []
        leftTableData = []
        rightTableData =[]
        defEmit('closeAddUserModal')
    }

    const addMemberOk = () => {
      if (rightTableData.length <= 0) {
        // message.warning('请添加成员')
        EventBus.$emit('pop',{type: 'warning', msg: '请添加成员'})
      } else {
        const memberList = rightTableData.map(item => {
          return Object.assign({}, item, {
            departmentLeader: item.fullName,
            dMobilePhoneNum: item.phone,
            jobName: item.position,
            dEmail: item.email,
          })
        })
        postMemberGroupMember({memberList: memberList, groupId: router.currentRoute.value.params.id }).then(res=> {
          if (res.success) {
            EventBus.$emit('pop',{type: 'success', msg: '添加成员成功'})
            store.dispatch('getGroupListActions');
            defEmit('addNewUserEmit')
            handleCancel()
          } else {
            EventBus.$emit('pop',{type: 'error', msg: res.msg})
          }
        })
      }
    }
    const addNewUser = () => {
        userVisible.value = true
    }
    const modelCancel = () => {
        userVisible.value = false
    }

    const onChange = (nextTargetKeys) => {
      defState.targetKeys = nextTargetKeys
      defState.targetKeys.forEach(item => {
        defState.memberData.forEach(ele => {
          if (ele.key === item) {
            let flag = rightTableData.some(e => e.key === item)
            if (flag) return
            rightTableData.push(ele)
          }
        })
      })
    }

    const handleSearch = debounce((dir, value) => {
      if (dir === 'left') {
        if (!value) return
        queryUserByFullName({
            fullName: value
        }).then(res => {
          if (res.code * 1 == 200) {
            leftTableData = res.data
            leftTableData.forEach(ele => {
              ele['key'] = ele.userId
              rightTableData = rightTableData.filter(
                e => e.key !== ele.key
              )
            })
            defState.memberData = leftTableData.concat(rightTableData)
          } else {
            EventBus.$emit('pop',{type: 'error', msg: res.msg})
          }
        })
      }
    }, 100)

    const getRowSelection = ({ selectedKeys, onItemSelectAll, onItemSelect }) => {
      return {
        onSelectAll: (selected, selectedRows) => {
          const treeSelectedKeys = selectedRows.map(({ key }) => key)
          const diffKeys = selected
            ? difference(treeSelectedKeys, selectedKeys)
            : difference(selectedKeys, treeSelectedKeys)
          onItemSelectAll(diffKeys, selected)
        },
        onSelect: ({ key }, selected) => {
          onItemSelect(key, selected)
        },
        selectedRowKeys: selectedKeys
      }
    }

    {
        toRefs(defComponents), addUserShow, toRefs(defState), transferRef, leftColumns, getRowSelection, userVisible, addUserBoxRef
    }
</script>

<style lang="scss" scoped>
@import './index.scss';
</style>