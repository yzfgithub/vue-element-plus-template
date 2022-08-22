import { queryUsersFuzzy, getMemberGroupInfoById } from '@/api/userGroup'
import { debounce } from 'lodash-es';
import { reactive, ref } from 'vue'

  export default function() {
    // 存放表单数据
    let formState = reactive({
        leaderList: [],
        memberList: []
    });
    // 编辑时记录用户组id
    let isEdit = ref(false);
    let groupId = ref('')
    let editState = reactive({
      leaderArr: [],
      memberArr: []
    })

    // 领导选择
    let lastLeaderFetchId = 0
    let leaderList = reactive({
        list: [],
        fetching: false
    })
    // let leaderArr = []
    // let memberArr = []

    // 成员选择
    let lastMemberFetchId = 0
    let memberList = reactive({
        list: [],
        fetching: false
    })
    
    const fetchLeaderUser = debounce(value => {
        lastLeaderFetchId += 1;
        const fetchId = lastLeaderFetchId;
        leaderList.list = [];
        leaderList.fetching = true;
        queryUsersFuzzy({userName: value}).then(res => {
          if(res.success) {
              if (fetchId !== lastLeaderFetchId) {
              // for fetch callback order
                  return;
              }
              if(res.data) {
                const data = res.data.map(user => {
                    return Object.assign({}, user, {
                        label: `${user.departmentLeader} （${user.userName}）`,
                        value: user.userName,
                    })
                  });
                  leaderList.list = data
              }
              leaderList.fetching = false;
          }
        })
      }, 300);

    const fetchMemberUser = debounce(value => {
      lastMemberFetchId += 1;
      const fetchId = lastMemberFetchId;
      memberList.list = [];
      memberList.fetching = true;
      queryUsersFuzzy({userName: value}).then(res => {
        if(res.success) {
            if (fetchId !== lastMemberFetchId) {
            // for fetch callback order
                return;
            }
            if(res.data) {
              const data = res.data.map(user => {
                  return Object.assign({}, user, {
                      label: `${user.departmentLeader} （${user.userName}）`,
                      value: user.userName,
                      id: null
                  })
                });
                memberList.list = data
            } else {
              memberList.list = []
            }
            memberList.fetching = false;
        }
      })
    }, 300);


    const resetData = () => {
        formState['name'] = ''
        formState['introduction'] = ''
        formState['type'] = ''
        // formState['leaderList'] = []
        // formState['memberList'] = []
        isEdit.value = false
    }
    const initData = (id) => {
        groupId.value = id
        getMemberGroupInfoById(id).then(res => {
            if(res.success) {
                formState['name'] = res.data.name
                formState['introduction'] = res.data.introduction
                formState['type'] = `${res.data.type}`
                formState['leaderList'] = res.data.leaderList.map(item => {
                  return Object.assign({}, item, {
                    label: `${item.departmentLeader} （${item.userName}）`,
                    value: item.userName,
                  })
                })
                formState['memberList'] = res.data.memberList.map(item => {
                  return Object.assign({}, item, {
                    label: `${item.departmentLeader} （${item.userName}）`,
                    value: item.userName,
                  })
                })
                editState['leaderArr'] = formState['leaderList']
                editState['memberArr'] = formState['memberList']
                // leaderArr = formState['leaderList']
                // memberArr = formState['memberList']
                // console.log(memberArr,'memberArr')
            }
        })
        isEdit.value = true
    }

    const handleLeaderDeselect = (val) => {
      const idx = editState.leaderArr.findIndex(item => item.value === val.key)
      editState.leaderArr.splice(idx, 1)
    }
    const handleLeaderSelect = (val, opt) => {
        editState.leaderArr.push(opt)
    }
    const handleMemberDeselect = (val) => {
        const idx = editState.memberArr.findIndex(item => item.value === val.key)
        editState.memberArr.splice(idx, 1)
    }
    const handleMemberSelect = (val, opt) => {
        editState.memberArr.push(opt)
    }

    return {
      // 领导，成员选择
      leaderList,
      fetchLeaderUser,
      memberList,
      fetchMemberUser,
      editState,
      // 表单数据与初始化
      formState,
      isEdit,
      groupId,
      resetData,
      initData,
      // 复选框处理
      handleLeaderSelect,
      handleLeaderDeselect, 
      handleMemberSelect, 
      handleMemberDeselect,
    }
    
  }