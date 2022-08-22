<template>
    <div id="user-group-table" ref="userGroupTableRef">
      <div v-if="selectionShow" class="selection-handle">
        <div>已经选择{{state.selectedKeys.length}}人</div>
        <div>
          <a-button @click="removePatchPerson" size="small" type="primary" class="remove-btn">移出用户组</a-button>
          &nbsp;&nbsp;
          <a-button @click="cancelDeletePerson" size="small" class="remove-btn">取消</a-button>
        </div>
      </div>
      <a-table
      :scroll="{ y: 600 }"
      :row-selection="selectionShow ? { selectedRowKeys: state.selectedRowKeys, onChange: onSelectChange } : null" 
      :dataSource="dataSourceList" 
      :columns="columns" 
      :loading="tableLoading"
      @change="tableChange"
      :rowKey="(record) => record.id"
      :pagination="{
        pageSize: pagination.pageSize,
        pageNum: pagination.page,
        total: pagination.total,
        showQuickJumper: true,
        showSizeChanger: true,
        showTotal: (total, range) => `共${total}条`,
        pageSizeOptions: ['10', '50', '100']
      }"
      >
      
      <template #bodyCell="{ column, text, record }">
        
        <template v-if="column.dataIndex === 'operation'">
          <div class="table-edit">
            <span @click="removeSinglePerson(record)">移出用户组</span>
          </div>
        </template>
      </template>

      </a-table>
    </div>
</template>

<script setup>
  import { defineExpose, reactive, defineProps, toRefs, defineEmits, createVNode, ref } from 'vue'
  import { Modal, message } from 'ant-design-vue';
  import { ExclamationCircleOutlined } from '@ant-design/icons-vue'
  import { deleteMember } from '@/api/userGroup'
  import { useStore } from 'vuex'

  let store = useStore()

  const columns = [
          {
            title: '成员',
            dataIndex: 'realName',
            key: 'realName',
            width: 100,
          },
          {
            title: '手机号',
            dataIndex: 'phone',
            key: 'phone',
            width: 120,
          },
          {
            title: '邮箱',
            dataIndex: 'email',
            key: 'email',
            width: 150,
          },
          {
            title: '员工类型',
            dataIndex: 'type',
            key: 'type',
            width: 90,
            customRender: ({ text } ) => {
              return text === 0 ? '成员' : '负责人'
            }
          },
          {
            title: '所属组织',
            dataIndex: 'companyName',
            key: 'companyName',
          },
          {
            title: '工作地',
            dataIndex: 'address',
            key: 'address',
          },
          {
            title: '操作',
            dataIndex: 'operation',
            key: 'operation',
            width: 140,
          },
        ]
  const defEmits = defineEmits(['patchDeleteCancel', 'getList'])

  const defProps = defineProps({
    selectionShow: {
      type: Boolean,
      default: false
    },
    tableLoading: {
      type: Boolean,
      default: false
    },
    dataSourceList: {
      type: Array,
      default: () => []
    },
    pagination: {
      type: Object,
    },
    titleName: {
      type: String
    }
  })

  const { selectionShow, dataSourceList, pagination, tableLoading, titleName } = toRefs(defProps)

  const state = reactive({
    // 保存的记录，已经选择的key
    selectedKeys: [],
    // 当前页面中选择的key
    selectedRowKeys: [],
  })
  const userGroupTableRef = ref()

  // 复选框勾选改变
  const onSelectChange = (arr) => {
    // 当前页选择项赋值
    state.selectedRowKeys = arr
    const curPageList = dataSourceList.value.map(item => item)
    const midSelectedKeys = state.selectedKeys.map(item => item);

    for(let i = 0; i< curPageList.length; i++) {
      const skIndex = midSelectedKeys.findIndex(val => val.id === curPageList[i].id)
      const srkIndex = arr.findIndex(val => val === curPageList[i].id)

      // 记录包含，当前页不包含
      if(skIndex > -1 && srkIndex === -1) {
        midSelectedKeys.splice(skIndex, 1)
        // 当前页包含， 记录不包含
      } else if(skIndex === -1 && srkIndex > -1) {
        midSelectedKeys.push(curPageList[i])
      }
    }
    state.selectedKeys = midSelectedKeys
  }

  // 清空选择项数组
  const clearSelectionData = () => {
    state.selectedRowKeys = []
    state.selectedKeys = []
  }

  // table分页改变
  const tableChange = (pagination) => {
    defEmits('getList', {page: pagination.current, pageSize: pagination.pageSize})
    state.selectedRowKeys = state.selectedKeys.map(item => item.id)
  }

  // 移出方法
  const removePerson = (arr) => {
    deleteMember(arr).then(res => {
      if(res.success) {
        // 成员列表重新获取
        defEmits('getList', {})
        // 清空批量数据
        cancelDeletePerson()
        // 重新获取左列表
        store.dispatch('getGroupListActions');
      }
    })
  }
  // 单人移出事件
  const removeSinglePerson = (record) => {
    Modal.confirm({
        title: '删除用户组成员',
        icon: <ExclamationCircleOutlined style="color: #469ffb;" />,
        content: `是否删除成员${record.realName}？`,
        getContainer: () => userGroupTableRef.value,
        onOk() {
            removePerson([record.id])
        },
        onCancel() {},
    });
  }
  // 批量移出
  const removePatchPerson = () => {
    if(!state.selectedKeys.length) {
      message.warning('选中用户组不能为空')
      return false
    }
    const firstName = state.selectedKeys[0].realName
    Modal.confirm({
        title: '移出用户组',
        icon: <ExclamationCircleOutlined style="color: #469ffb;" />,
        content: createVNode('span',null, [
          createVNode('span', null, `是否将【${firstName}${state.selectedKeys.length > 1 ? '等' : ''}`),
          createVNode('span', {style: 'color: #469ffb;'}, `${state.selectedKeys.length > 1 ? state.selectedKeys.length : ''}`),
          createVNode('span', null, `${state.selectedKeys.length > 1 ? '人' : ''}】移出【${titleName.value}】用户组？`),
          ]),
        getContainer: () => userGroupTableRef.value,
        onOk() {
          const params = state.selectedKeys.map(item => item.id)
          removePerson(params)
        },
        onCancel() {},
      });
  }
  // 取消移出
  const cancelDeletePerson = () => {
    defEmits('patchDeleteCancel')
    clearSelectionData()
  }
  
  // 使父组件可以调用子组件方法
  defineExpose({
    clearSelectionData
  })

  {
    columns, state, onSelectChange, cancelDeletePerson,
    selectionShow, dataSourceList, pagination, tableLoading, tableChange, userGroupTableRef
  }
</script>

<style lang="scss" scoped>
.selection-handle{
  display: flex;
  justify-content: space-between;
  line-height: 50px;
  .remove-btn{
    font-size: 12px;
  }
}
 .table-edit {
  color:#40a9ff;
  span{
    margin: 0 10px;
    cursor: pointer;
  }    
}
</style>