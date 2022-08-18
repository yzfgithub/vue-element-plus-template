import Request from '../utils/request';

/**
 * 新增用户组
 * @param {name, introduction, type, leaderList, memberList} params 
 * @returns 
 */
export async function postMemberGroup(params) {
  return Request({
    url: 'appStore/v1.0/dashboard/postMemberGroup',
    method: 'post',
    data: params
  });
}

/**
 * 更新用户组
 * @param {id} params 
 * @returns 
 */
 export async function putMember(params) {
  return Request({
    url: 'appStore/v1.0/dashboard/putMember',
    method: 'put',
    data: params
  });
}

/**
 * 删除用户组
 * @param {} params 
 * @returns 
 */
export async function deleteMemberById(id) {
  return Request({
    url: `appStore/v1.0/dashboard/deleteMember/${id}`,
    method: 'delete',
    data: {}
  });
}

/**
 * 删除用户组成员
 * @param {} params 
 * @returns 
 */
export async function deleteMember(params) {
  return Request({
    url: 'appStore/v1.0/dashboard/deleteMember',
    method: 'delete',
    data: params,
    errorTitle: '删除用户组成员'
  });
}

/** 
 * 左侧列表查询 
 * @param {} params 
 * @returns 
 */
export async function getMemberGroupLeft(params) {
  return Request({
    url: 'appStore/v1.0/dashboard/getMemberGroupLeft',
    method: 'post',
    data: params
  });
}

/**
 * 用户组详情
 * @param {} params 
 * @returns 
 */
export async function getMemberGroupInfoById(id) {
  return Request({
    url: `appStore/v1.0/dashboard/getMemberGroupInfoById/${id}`,
    method: 'get',
    data: {}
  });
}

/**
 * 用户组成员列表
 * @param {userName} params 
 * @returns 
 */
export async function getMemberInfoList(params) {
  return Request({
    url: 'appStore/v1.0/dashboard/getMemberInfoList',
    method: 'post',
    data: params
  });
}

/**
 * 负责人和成员查询
 * @param {userName} params 
 * @returns 
 */
export async function queryUsersFuzzy(params) {
  return Request({
    url: 'appStore/v1.0/dashboard/queryUsersFuzzy',
    method: 'post',
    data: params
  });
}