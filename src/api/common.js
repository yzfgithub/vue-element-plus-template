import Request from '../utils/request';

/**
 * 成员管理--成员搜索
 * @param {fullName} params 
 * @returns 
 */
export async function memberAshSetting(params) {
  return Request({
    url: 'appStore/v1.0/dashboard/memberAshSetting',
    method: 'post',
    data: params
  });
}

/**
 * 成员管理--添加成员--获取组织列表
 * @param {} params 
 * @returns 
 */
export async function getOrgList(params) {
  return Request({
    url: 'appStore/v1.0/dashboard/getOrgList',
    method: 'post',
    data: params
  });
}

/**
 * 成员管理--添加成员--获取组织列表
 * @param {} params 
 * @returns 
 */
export async function addStoreUser(params) {
  return Request({
    url: 'appStore/v1.0/dashboard/addStoreUser',
    method: 'post',
    data: params
  });
}
/**
 * 成员管理--添加成员--添加接口
 * @param {} params 
 * @returns 
 */
export async function postMemberGroupMember(params) {
  return Request({
    url: 'appStore/v1.0/dashboard/postMemberGroupMember',
    method: 'post',
    data: params
  });
}