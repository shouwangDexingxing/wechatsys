import request from './request'
import {base_url} from '../api/urlapi'
const http ={
    /**
     * methods: 请求方式
     * url 请求地址
     * params 请求参数
     */
    get(url,params){
        let config = getUrlConfig(url, { method: 'get'});
        if(params) config.params = params
        return request(config)
    },
    post(url,params){
        let config = getUrlConfig(url, { method: 'post'});
        if(params) config.data = params
        return request(config)
    },
    put(url,params){
        let config = getUrlConfig(url, { method: 'put'});
        if(params) config.params = params
        return request(config)
    },
    delete(url,params){
        let config = getUrlConfig(url, { method: 'delete'});
        if(params) config.params = params
        return request(config)
    }
}

function getUrlConfig(url,cfg) {
    if(!url){
        return cfg
    }
    if(url.substr(0,10) == '/qyweixin/')
    {
        cfg.baseURL  = base_url.qyweixin;
        cfg.url = url.substr(10, url.length);
    }
    else  if(url.substr(0,7) == '/zswyy/'){
        cfg.baseURL  = base_url.zswyy;
        cfg.url = url.substr(7, url.length);
    }
    else {
        // cfg.baseURL  = base_url.qyweixin;
        cfg.url = url;
    }
    return  cfg;
}
//导出
export default http