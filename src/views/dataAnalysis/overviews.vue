<template>
    <div>
        <v-card outlined>
            <v-card-actions class="d-flex pa-2 justify-space-between align-center">
                <div class="d-inline-flex">
                    <v-avatar size="100">
                        <img src="https://cdn.vuetifyjs.com/images/john.jpg" alt="John">
                    </v-avatar>
                    <div class="ml-4">
                        <br>
                        <p>张三</p>
                        部门/角色
                    </div>
                </div>
                <div class="grey lighten-4 rounded box-number  pa-3 ma-2 box-width">
                    <div class="text-h6 font-weight-medium">
                        {{analysis_data.user_cnt}}
                    </div>
                    <div>客户总数（去重）</div>
                </div>
                <div class="grey lighten-4 rounded box-number  pa-3 ma-2 box-width">
                    <div class="text-h6 font-weight-medium">
                        {{analysis_data.chat_total}}
                    </div>
                    <div>客群总数</div>
                </div>
                <div class="grey lighten-4 rounded box-number  pa-3 ma-2 box-width">
                    <div class="text-h6 font-weight-medium">
                        {{analysis_data.member_total}}
                    </div>
                    <div>客群总人数</div>
                </div>
            </v-card-actions>
        </v-card><br>
        <v-card outlined>
            <v-card-title>客户数据</v-card-title>
            <v-card-actions>
                <div style="width:100%" class="d-flex flex-wrap">
                    <div class="grey lighten-4 rounded box-number text-center pa-3 ma-2">
                        <div class="text-h5 font-weight-medium ">
                            {{behavior_data.new_contact_cnt}}
                        </div>
                        <div>
                            昨日新增
                        </div>
                    </div>
                    <div class="grey lighten-4 rounded box-number text-center pa-3 ma-2">
                        <div class="text-h5 font-weight-medium">
                            {{behavior_data.chat_cnt}}
                        </div>
                        <div>
                            单聊客户
                            <v-tooltip top color="default">
                                <template v-slot:activator="{ on, attrs }">
                                    <v-icon size="12" v-bind="attrs" v-on="on" class="text--secondary">mdi-help-circle</v-icon>
                                </template>
                                <span>成员有主动发送过消息的单聊总数</span>
                            </v-tooltip>
                        </div>
                    </div>
                    <div class="grey lighten-4 rounded box-number text-center pa-3 ma-2">
                        <div class="text-h5 font-weight-medium">
                            {{behavior_data.new_apply_cnt}}
                        </div>
                        <div>
                            发起申请
                            <v-tooltip top color="default">
                                <template v-slot:activator="{ on, attrs }">
                                    <v-icon size="12" v-bind="attrs" v-on="on" class="text--secondary">mdi-help-circle</v-icon>
                                </template>
                                <span>发起申请数，成员通过「搜索手机号」、「扫一扫」等渠道主动向客户发起的好友申请数量</span>
                            </v-tooltip>
                        </div>
                    </div>
                    <div class="grey lighten-4 rounded box-number text-center pa-3 ma-2">
                        <div class="text-h5 font-weight-medium">
                            {{behavior_data.negative_feedback_cnt}}
                        </div>
                        <div>
                            昨日流失
                        </div>
                    </div>
                    <div class="grey lighten-4 rounded box-number text-center pa-3 ma-2">
                        <div class="text-h5 font-weight-medium">
                            {{behavior_data.message_cnt}}
                        </div>
                        <div>
                            发送消息
                            <v-tooltip top color="default">
                                <template v-slot:activator="{ on, attrs }">
                                    <v-icon size="12" v-bind="attrs" v-on="on" class="text--secondary">mdi-help-circle</v-icon>
                                </template>
                                <span>成员在单聊中发送的消息总数</span>
                            </v-tooltip>
                        </div>
                    </div>
                </div>
            </v-card-actions>
            <v-card-text>
                <EchartLine :chartData="chartBehavior"></EchartLine>
            </v-card-text>
        </v-card>
        <br>
        <v-card outlined>
            <v-card-title>客群数据</v-card-title>
            <v-card-actions>
                <div style="width:100%" class="d-flex flex-wrap">
                    <div class="grey lighten-4 rounded box-number text-center pa-3 ma-2">
                        <div class="text-h5 font-weight-medium">
                            {{group_data.new_chat_cnt}}
                        </div>
                        <div>
                            昨日新增客群
                        </div>
                    </div>
                    <div class="grey lighten-4 rounded box-number text-center pa-3 ma-2">
                        <div class="text-h5 font-weight-medium">
                            {{group_data.new_member_cnt}}
                        </div>
                        <div>
                            新增群成员
                        </div>
                    </div>
                    <div class="grey lighten-4 rounded box-number text-center pa-3 ma-2">
                        <div class="text-h5 font-weight-medium">
                            {{group_data.member_has_msg}}
                        </div>
                        <div>
                            活跃成员
                            <v-tooltip top color="default">
                                <template v-slot:activator="{ on, attrs }">
                                    <v-icon size="12" v-bind="attrs" v-on="on" class="text--secondary">mdi-help-circle</v-icon>
                                </template>
                                <span>截至当天有发过消息的群成员数</span>
                            </v-tooltip>
                        </div>
                    </div>
                </div>
            </v-card-actions>
            <v-card-text>
                <EchartLine :chartData="chartGroup"></EchartLine>
            </v-card-text>
        </v-card>
    </div>

</template>

<script>
    import qywxapi from '../../api/qyweixinapi'
    import {getStorage, getTime} from "../../assets/js/comm";
    import EchartLine from '../../components/EchartLine'

    export default {
        name: "overviews",
        data() {
            return {
                item_company: {     avatar: this.$store.state.corp_cfg.corp_logo     },
                behavior_data: {
                    new_apply_cnt: '-',
                    new_contact_cnt: '-',
                    chat_cnt: '-',
                    message_cnt: '-',
                    negative_feedback_cnt: '-',
                    reply_percentage: '-',
                    avg_reply_time: '-',
                },
                group_data:{
                    new_chat_cnt:'-',
                    new_member_cnt:'-',
                    member_has_msg:'-',
                    chat_total:'-',
                    member_total:'-'
                },
                analysis_data:{
                    member_total:'-',
                    chat_total:'-',
                    user_cnt:'-',
                },
                chartBehavior: null,
                chartGroup: null
            }
        },
        components: {
            EchartLine
        },
        mounted() {
            this.getAnalysis();
        },
        methods: {
            getAnalysis() {
                let partyid = this.$store.state.dept.company
                    ? [this.$store.state.dept.company]
                    : this.$store.state.dept.dept_list_id;

                qywxapi.postFormAPI('admcontact',
                    {
                        act: 'analysis_overviews',
                        corpid: getStorage('corpid'),
                        partyid: partyid
                    }
                ).then(res => {

                    //客户数据
                    let todayAnaly = res.user[res.user.length - 1];
                    this.behavior_data.chat_cnt = todayAnaly.chat_cnt;
                    this.behavior_data.message_cnt = todayAnaly.message_cnt;
                    this.behavior_data.negative_feedback_cnt = todayAnaly.negative_feedback_cnt;
                    this.behavior_data.new_apply_cnt = todayAnaly.new_apply_cnt;
                    this.behavior_data.new_contact_cnt = todayAnaly.new_contact_cnt;
                    this.chartBehavior = this.showChartBehavior(res.user);

                    // //客群数据
                    this.chartGroup = this.showChartGroup(res.group);
                    if(res.group.length){
                        let groupData = res.group[res.group.length-1];
                        this.group_data.new_chat_cnt = groupData.new_chat_cnt;
                        this.group_data.new_member_cnt = groupData.new_member_cnt;
                        this.group_data.member_has_msg = groupData.member_has_msg;
                        this.group_data.chat_total = groupData.chat_total;
                        this.group_data.member_total = groupData.member_total;
                    }
                    this.analysis_data = res.cnt;

                }).catch(err => {
                    console.log(err);
                })
            },
            showChartBehavior(behavior_user) {
                let echartData={
                    dataset: {
                        source: [
                            ['客户联系数据','新增客户','单聊客户','发起申请','流失客户','发送消息']
                        ]
                    },
                    series: [{ type: 'line', smooth: true }, { type: 'line', smooth: true }, { type: 'line' , smooth: true }
                        , { type: 'line' , smooth: true }, { type: 'line' , smooth: true }]
                }
                for (let val of behavior_user) {
                    echartData.dataset.source.push([
                        getTime(val['stat_time'], 5),
                        val['new_contact_cnt'],
                        val['chat_cnt'],
                        val['new_apply_cnt'],
                        val['negative_feedback_cnt'],
                        val['message_cnt']
                    ]);
                }
                return echartData;
            },
            showChartGroup(group_items) {
                let echartData={
                    dataset: {
                        source: [
                            ['客群数据','新增客群','客群总数','活跃客群','新增成员','活跃成员','客群总消息','客群总人数']
                        ]
                    },
                    series: [
                        {type:'line', smooth:true,}, {type:'line', smooth:true}, {type:'line', smooth:true},
                        {type:'line', smooth:true}, {type:'line', smooth:true}, {type:'line', smooth:true}, {type:'line', smooth:true}
                    ]
                }
                for (let val of group_items) {

                    echartData.dataset.source.push([
                        getTime(val['stat_time'], 5),
                        val.new_chat_cnt,
                        val.chat_total,
                        val.chat_has_msg,
                        val.new_member_cnt,
                        val.member_has_msg,
                        val.msg_total,
                        val.member_total
                    ]);
                }
                return echartData;
            }
        }
    }
</script>

<style scoped>
    .top {
        margin-bottom: .375rem;;
        opacity: .7;
        font-weight: 400;
        font-size: .625rem !important;
        letter-spacing: .0178571429em !important;
    }
    .box-width {
        width: 200px;
        display: flex;
        flex-direction:column;
        justify-content:space-between;
    }
    .box-width>div:last-child{
        font-size:.875rem;
    }
</style>