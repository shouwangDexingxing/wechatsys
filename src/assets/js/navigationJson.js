/*二级导航菜单数据*/
export let  navJson =  {
    system: {
        authapp: {txt: '代开发配置', name: 'authapp'},
        organization: {txt: '应用可见范围', name: 'organization'},
        activedAccount: {txt: '常用设置列表', name: 'activedAccount'},
        apiLicence: {txt: '接口调用许可', name: 'apiLicence'},
        // apiAppChatMenu: {txt: '配置应用到聊天工具栏', name: 'apiAppChatMenu'},
        // towechatMessage: {txt: '应用内推送消息到企微员工', name: 'towechatMessage'},

    },
    customer:{
        custLists:{ txt:'企微客户', name:'custLists'},
        // groupMessageAdd:{ txt:'客户群发', name:'groupMessageAdd'},
        // groupMessageList:{ txt:'群发记录', name:'groupMessageList'},
        // lossRemind:{ txt:'流失提醒', name:'lossRemind'},
    },
    dataAnalysis: {
        overviews: {txt: '数据概览', name: 'overviews'},
        customerAnalysis: {txt: '客户分析', name: 'customerAnalysis'},
        conversation: {txt: '会话聊天', name: 'conversation'},
        customerGroup: {txt: '客群分析', name: 'customerGroup'},
    },
}
//一级菜单
export let navFirstMenu = {
    dataAnalysis:{ txt:'运营中心', path:'/wechat/dataAnalysis'},
    customer:{ txt:'客户管理', path:'/wechat/customer'},
    // customerMaintain:{ txt:'客情维护', path:'/wechat/customerMaintain'},
    system:{ txt:'企微设置', path:'/wechat/system'},
}

export let home = { txt:'企微SCRM', path:'/wechat',id:'home'};
