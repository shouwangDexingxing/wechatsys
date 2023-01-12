import Vue from 'vue'
import VueRouter from 'vue-router'

//使用编程式路由实现跳转的时候，多次执行会抛出NavigationDuplicated的警告错误是因为"vue-router"3版本之后 底层引入了promise,而通过声明式导航没有出现此类问题是因为vue-router底层已经处理好了。
Vue.use(VueRouter)
const originalPush = VueRouter.prototype.push
VueRouter.prototype.push = function push(location) {
    return originalPush.call(this, location).catch(err => err)
}

const routes = [
    {
        path: '/wechat/system',
        name: 'system',
        meta:{title:'企微设置-万业云'},
        redirect:'/wechat/system/authapp',
        component: () => import( '@/components/breadcrumb'),
        children:[
            {path:'authapp',  meta:{title:'自建应用代开发'}, name: 'authapp', component:() => import( '@/views/system/AuthApp')       },
            {path:'organization', meta:{title:'企微通讯录'}, name: 'organization',  component:() => import( '@/views/system/Organization')  },
            {path:'activedAccount', meta:{title:'企业账号列表'}, name: 'activedAccount',  component:() => import( '@/views/system/listActivedAccount')  },
            {path:'apiLicence', meta:{title:'接口调用许可'}, name: 'apiLicence',  component:() => import( '@/views/system/ApiLicence')  }

            // {path:'apiAppChatMenu', meta:{title:'配置到聊天工具栏'}, name: 'apiAppChatMenu',  component:() => import( '@/views/system/apiAppChatMenu')  },
            // {path:'towechatMessage', meta:{title:'应用内推送消息到企微'}, name: 'towechatMessage',  component:() => import( '@/views/system/towechatMessage')  }
        ],
    },
    {
        path: '/wechat/customer',
        name: 'customer',
        meta:{title:'客户管理-万业云'},
        redirect:'/wechat/customer/custLists',
        component: () => import( '@/components/breadcrumb'),
        children:[
            {path:'custLists',  meta:{title:'企微客户'}, name: 'custLists', component:() => import( '@/views/customer/custLists')       },
            {path:'groupMessageAdd',  meta:{title:'客户群发'}, name: 'groupMessageAdd', component:() => import( '@/views/customer/groupMessageAdd')       },
            {path:'groupMessageList',  meta:{title:'群发记录'}, name: 'groupMessageList', component:() => import( '@/views/customer/groupMessageList')       },
            {path:'lossRemind', meta:{title:'流失提醒'}, name: 'lossRemind',  component:() => import( '@/views/customer/lossRemind')  }
        ],
    },
    {
        path: '/wechat/dataAnalysis',
        name: 'dataAnalysis',
        component: () => import( '@/components/breadcrumb'),
        redirect:'/wechat/dataAnalysis/overviews',
        children:[
            {path:'overviews',  meta:{title:'数据概览'}, name: 'overviews', component:() => import( '@/views/dataAnalysis/overviews')       },
            {path:'customerAnalysis',  meta:{title:'客户分析'}, name: 'customerAnalysis', component:() => import( '@/views/dataAnalysis/customerAnalysis')       },
            {path:'customerGroup',  meta:{title:'客群分析'}, name: 'customerGroup', component:() => import( '@/views/dataAnalysis/customerGroup')       },
            {path:'conversation', meta:{title:'会话分析'}, name: 'conversation',  component:() => import( '@/views/dataAnalysis/conversation')  }
        ],
    },
    {   //主页
        path: '/wechat/',
        name: 'system',
        meta:{title:'企微应用-万业云'},
        redirect:'/wechat/system/authapp',
    },
    {
        path: '*',
        meta:{title:'找不到页面'},
        component: require('@/views/404.vue').default,
    }
]

const router = new VueRouter({
    mode: 'history',
    routes
})



export default router
