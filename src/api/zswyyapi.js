import http from '../utils/http'
import {zswyyurl} from './urlapi'

let resquest = "/zswyy/"
// '/suite/getAuthCod'
export default{
    getListAPI(act,params){
        return http.get(`${resquest}`+zswyyurl[act],params);
        // return http.get(`${resquest}`+qywxurl.act,params)
    },
    postFormAPI(act,params){
        //post 把json数据转为 formData
        if(typeof params == 'object'){
            let formData = new FormData();
            for (let key in params ){
                formData.append(key, params[key]);
            }
            params = formData ;
        }
        return http.post(`${resquest}`+zswyyurl[act],params);
    }
}