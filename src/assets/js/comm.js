
export function getStorage(key) {
    let  expires = localStorage.getItem(key + '_expires');
    if (expires && new Date() > new Date(Number(expires))) {
        localStorage.removeItem(key);
        localStorage.removeItem(key+ '_expires')
        return localStorage.getItem(key);
    }

    let v = localStorage.getItem(key);
    if(v && v != 'undefined'){
        try{
            v = JSON.parse(v);
        }catch (e) {
            console.log(e)
        }
    }
    return v;
}
/* expires 过期时间秒*/
export function setStorage(key, val,expires) {
    let _expir = 43200; //默认过期时间
    // let _expir = 60; //默认过期时间
    val = val ? JSON.stringify(val) : '';
    expires = typeof expires !== 'undefined' ? expires : _expir;

    localStorage.setItem(key, val);
    localStorage.setItem(key + '_expires', (new Date().valueOf()+expires*1000));
}
export function delStorage(key) {
    localStorage.removeItem(key);
}
export function clearStorage() {
    localStorage.clear();
}

export function setSessionStorage(key, val) {
    sessionStorage.setItem(key,val)
}
export function getSessionStorage(key) {
    sessionStorage.getItem(key)
}
export function delSessionStorage(key) {
    sessionStorage.removeItem(key)
}

export function isNull(data)
{
    if (!data) return true;
    if (JSON.stringify(data) === '{}') return true;
    if (JSON.stringify(data) === '[]') return true;
    return false;
}

// export function copyTxt(objDom) {
//     // content-copy
//     // document.execCommand('copy');
// }
/*
         @unixTime unix时间戳 10位，
         @tp <10格式化时间戳  其值为1=>'/'
             =10 获取本地unix当前时间戳
     */
export function getTime (unixTime, tp) {
    if (unixTime && unixTime != undefined &&
        unixTime.toString().length == 10
    ) {
        let datesjc = unixTime * 1000;
        var myDate = new Date(datesjc);
    } else {
        myDate = new Date();
    }
    let y = myDate.getFullYear();
    let m = myDate.getMonth();
    let day = myDate.getDate();
    let h = myDate.getHours();
    let i = myDate.getMinutes();
    let s = myDate.getSeconds();
    let d = (day < 10 ? '0' : '') + day;

    m = (m < 9 ? '0' : '') + (m+1);
    i = (i < 10 ? '0' : '') + i;
    s = (s < 10 ? '0' : '') + s;
    let t = (y + '年' + m + '月' + d + '日 ' + h + '时' + i + '分');
    switch (tp) {
        case 1:
            t = (y + '/' + m + '/' + d + ' ' + h + ':' + i);
            break;
        case 10:
            t = Date.parse(myDate) / 1000;
            break;
        case 2:
            t = h + ':' + i + ':' + s;
            break;
        case 3:
            var todayTime = new Date();
            var today = todayTime.getDay();
            t = day == today
                ? (h + ':' + i + ':' + s)
                : (m + '月' + d + '日 ' + h + ':' + i + ':' + s);
            break;
        case 5:
            t = m + '-' + d;
            break;
        case 6:
            t = m + '月' + d +'日';
            break;
        case 4:
            t = y + '年' + m + '月' + d + '日';
            break;
        case 0:
        default:
            break;

    }
    return t;
}
export function hasOwnPropertyCall(sourcesContents,key) {
    return Object.prototype.hasOwnProperty.call(sourcesContents, key)
        ? sourcesContents[key]
        : null;
}

//一位数组对象集合转化为树形结构的集合
export let  creatTree = {
    /**
     * 普通list集合转成树形集合
     * @param data      list集合
     * @param idField   子节点字段名
     * @param parentField 父节点字段名
     * @param topValue 最顶级父节点字段值（如 0 1 -1）
     */
    TreeNode(data, idField, parentField,deletField) {
        let  arr = [];
        for (var i = 0, l = data.length; i < l; i++) {
            var item = data[i];
            if (item != null && item[deletField]==1) {
                this.tranData(data, item, idField, parentField,deletField);
                delete item[deletField]
                arr.push(item);
            }
        }
        return arr;
    },

    tranData (data, parent, idField, parentField,deletField) {
        var temp = [];
        //循环太多次,后期需要优化
        for (var i = 0, l = data.length; i < l; i++) {
            var item = data[i];
            // console.log(i )
            if (item != null && item[parentField] == parent[idField]) {
                this.tranData(data, item, idField, parentField,deletField);
                delete item[deletField]
                temp.push(item);
            }
        }
        if(temp.length>0){
            parent["children"] = temp;
        }
    }
}



