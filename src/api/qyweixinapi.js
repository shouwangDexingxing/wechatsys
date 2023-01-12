import http from '../utils/http'
import {qyweixinurl} from './urlapi'
//
/**
 *   resquest  http://197.82.15.15:8088/request/...
 *   '/testIp'����vue-cil��config��index.js�����õĴ���
 */
let resquest = "/qyweixin/"
// '/suite/getAuthCod'
export default{
    getListAPI(act,params){
        return http.get(`${resquest}`+qyweixinurl[act],params);
    },
    postFormAPI(act,params){
        //post 把json数据转为 formData
        if(typeof params == 'object'){
            let formData = new FormData();
            for (let key in params ){
                if(typeof params[key] == 'object'){
                    params[key] =JSON.stringify(params[key]);
                }
                formData.append(key, params[key]);
            }
            params = formData ;
        }
        return http.post(`${resquest}`+qyweixinurl[act],params);
    }
}