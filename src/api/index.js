import { postRequest } from '../utils/request';

export async function getLoginUser(params) {
  return postRequest({
    url: 'apiservice/emp/api/login/getLoginUser',
    method: 'post',
    data: params,
    errorTitle: '登录接口'
  });
}