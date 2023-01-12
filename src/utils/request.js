import Vue from 'vue'
import axios from 'axios'
import {base_url} from '@/api/urlapi'
import store from '../store/index'

// 使用element-ui Message做消息提醒
// import { Message} from 'element-ui';
//1. 创建新的axios实例，

const service = axios.create({
    // 公共接口
    baseURL: base_url.qyweixin,
    // 超时时间 单位是ms，这里设置了3s的超时时间
    timeout: 3000
})
// 2.请求拦截器
service.interceptors.request.use(config => {
    //发请求前做的一些处理，数据转化，配置请求头，设置token,设置loading等，根据需求去添加
    // config.data = JSON.stringify(config.data); //数据转化,也可以使用qs转换 不转行，直接用 new formdagta()
    store.state.overlay=true;
    config.headers = {
        'Content-Type': 'application/x-www-form-urlencoded' //配置请求头
    }
    //注意使用token的时候需要引入cookie方法或者用本地localStorage等方法，推荐js-cookie
    // const token = localStorage.getItem("token");
    const token = 'dwFz9y0sbyXgAn9bMdDrtwvd249MTt1aWQ9MTtob3N0PTExOC4xNzguMjM5LjEzMTt0PTE2NzMyMjgyMjU7bm9uY2U9MTkwOTUwMzY5NTtjaWQ9MjA7ZGI9YTIwO2h0dHBfaG9zdD10ZXN0d2ViLnpzd3l5LmNvbTt1c3I95puo000o5pWP';

    if (token) {
        if(!config.params ){
            config.params = {};
        }
        config.params.token = token; //如果要求携带在参数中
        // config.headers.token= token; //如果要求携带在请求头中
    }
    return config
}, error => {
    Promise.reject(error)
})

// 3.响应拦截器
service.interceptors.response.use(
    (response) => {
        setTimeout(() => {
            store.state.overlay=false;
        }, 800);
        const res = response.data;
        if (response.config.responseType !== 'blob') {
            store.state.message = res.msg;
            switch (res.ok) {
                case  'ok':
                    store.state.snackbarcolor = '';
                    return res.data
                case 'oksyn':
                    store.state.snackbarcolor = 'success';
                    break;
                case 'errcode':
                    store.state.snackbarcolor = '';
                    console.log(store.state)
                    break;
                default:
                    store.state.snackbarcolor = '';
                 break;
            }
            store.state.snackbar = true;
            // return Promise.reject(new Error(res.msg || 'Error'))
            return res;
        }
        return res
    },
    (error) => {
        let res = error.response
        if (error.response) {
            if (res.status == 401) {
                Vue.prototype.parentFns.portal_logout()
            }
        }
        return Promise.reject(error)
    }
)
//4.导入文件
export default service
