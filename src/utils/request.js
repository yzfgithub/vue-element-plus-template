import axios from 'axios';
// import QS from 'qs';
// import { Toast } from 'vant'
import Cookies from 'js-cookie'

const axiosInstance = axios.create({
    baseURL: '/'
})


axiosInstance.defaults.timeout=10000

axiosInstance.defaults.headers.post['Content-Type'] = 'application/json;charset=UTF-8'

axiosInstance.interceptors.request.use(
    config => {
        const token = Cookies.get('token')
        config.headers.token = token
        return config;
    },
    error => {
        return Promise.err(error)
    }
)

axiosInstance.interceptors.response.use(
    response => {
        const result = {...response}
        return result
    },
    error => {
        if(error.response.status) {
            switch(error.response.status) {
                case 401:
                    this.$router.push('/login')
                    break;
                default:
                    this.$message({
                        message: '恭喜你，这是一条成功消息',
                        type: 'success'
                    });
                    break;
            }
        }
        return Promise.reject(error.response)
    }
)

export function getRequest(config) {
    return axiosInstance(config).catch(function(res){
        return res;
    })
}

export function postRequest(config) {
    if (config.data) {
        config.data = [config.data];
    }
    if (!config.transformResponse) {
        config.transformResponse = [];
    }

    Array.isArray(config.transformResponse) &&
    config.transformResponse.push(data => {
      return {
        ...JSON.parse(data || '{}'),
        errorTitle: config.errorTitle
      };
    });
    return axiosInstance(config).catch(function(res){
        return res;
    })
}