import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import vuetify from './plugins/vuetify'
import {navJson} from  './assets/js/navigationJson'

/*css
*   [red   pink    purple  deep-purple indigo  blue    light-blue  cyan    teal    green   light-green lime    yellow
*   amber   orange  deep-orange brown   blue-grey   grey    shades]
*  */

Vue.config.productionTip = false

router.beforeEach((to, from, next) => {
    if (to.matched.some(record => record.meta.requiresAuth)) {
        // let auth = router.app.getStorage('auth');
        // let lasttime = router.app.getStorage('lasttime');
        // let nowT =  router.app.getTime(null,10);
        // if(nowT<lasttime && auth){ //已超时、无auth 直接退出登录 清空登录信息
        //     router.app.$axios.post('/islogin',
        //         {
        //             lgname  : router.app.getStorage('lgname'),
        //             auth    :  auth,
        //         })
        //         .then(function (response) {
        //             if(response.data.status == 'success'){
        //                 next();
        //             }else{
        //                 next('/wslogin');
        //             }
        //         })
        //         .catch(function (error) {
        //             next('/wslogin');
        //             console.log(error);
        //         });
        // }else {
        //     next('/wslogin');
        // }
    } else {
        next();
    }
    //菜单
    let navKey = to.matched[0].name;
    store.state.navList =  Object.prototype.hasOwnProperty.call(navJson,navKey) ?  navJson[navKey] : [];
    next();
    /* 路由发生变化修改页面title */
    if (to.meta.title) {
        document.title = to.meta.title
    }
})

new Vue({
    router,
    store,
    vuetify,
    render: h => h(App)
}).$mount('#app')
