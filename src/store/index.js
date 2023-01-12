import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        snackbar: false,
        message: '提示消息',
        timeout: 2000,
        snackbarcolor: '',
        overlay:true,
        corp_cfg: {corpid: 0, corp_name: '', corp_logo: '', get_time: 0},
        user: {
            useCnt: 0,
            follow_list: [], key_u_list: [], dept_list: []
        },
        dept: {dept_list: [], company: 0, dept_list_id: []}, //company：是否有全公司部门权限，
        customer: {tag_list: [], key_tag_List: [], add_way: []},
        // analysis:[t:0],  //  数据分析，拉取后保存到此处，限制访问频率每5分钟拉取一次
        chartColors:['RGB(32,119,180)', 'RGB(255,127,14)', 'RGB(44,160,44)','RGB(214,39,40)',
            'RGB(148,103,189)', 'RGB(140,86,75)','RGB(227,119,194)','RGB(126,126,126)'],
        // chartColors:[
        //     'silver','blue', 'lime','aqua','red','fuchsia','yelow',
        //     'back','navy','green','teal', 'maroon','purple','olive','gray','white'
        // ],
        drawer: null,  //左侧菜单是否展开
        navList: [],
    },
    mutations: {
        showsnackbar(state, newValue) {
            state.message = newValue;
            state.snackbar = true
        },
        hidesnackbar(state) {
            state.snackbar = false;
        }
    },
    actions: {},
    modules: {}
})
