<template>
    <div>
        <v-card outlined class="mb-2">
            <v-card-actions class="d-flex pa-2 align-stretch">
                <div class="grey lighten-4 rounded box-number  pa-3 ma-2 box-width">
                    <div class="top">
                        <span class="top-left">含重复</span>
                        <span class="float-right">{{dataCnt.distinct_user_cnt}}</span>
                    </div>
                    <div class="text-h6">{{dataCnt.user_cnt}}</div>
                    <div>
                        客户总数
                        <v-tooltip top color="default">
                            <template v-slot:activator="{ on, attrs }">
                                <v-icon size="12" v-bind="attrs" v-on="on" class="text--secondary">mdi-help-circle
                                </v-icon>
                            </template>
                            <span>数据截至到同步拉取时间，或者正确配置客户回调服务器的客户为实时数据</span>
                        </v-tooltip>
                    </div>
                </div>
                <div class="grey lighten-4 rounded box-number  pa-3 ma-2 box-width">
                    <div class="top">
                        <span class="top-left">较前日</span>
                        <span v-if="dataCnt.prev_new_contact_cnt>0" class="up-success float-right">
                            <v-icon>mdi-arrow-up-thin</v-icon>
                             {{dataCnt.prev_new_contact_cnt}}
                        </span>
                        <span v-else-if="dataCnt.prev_new_contact_cnt<0" class="down-red float-right">
                            <v-icon>mdi-arrow-down-thin</v-icon>{{Math.abs(dataCnt.prev_new_contact_cnt)}}
                        </span>
                        <span v-else class="float-right"> {{dataCnt.prev_new_contact_cnt}}</span>
                    </div>
                    <div class="text-h6 font-weight-medium">
                        {{dataCnt.new_contact_cnt}}
                    </div>
                    <div>昨日新增
                        <v-tooltip top color="default">
                            <template v-slot:activator="{ on, attrs }">
                                <v-icon size="12" v-bind="attrs" v-on="on" class="text--secondary">mdi-help-circle
                                </v-icon>
                            </template>
                            <span>成员新添加的客户数量</span>
                        </v-tooltip>
                    </div>
                </div>
                <div class="grey lighten-4 rounded box-number pa-3 ma-2 box-width">
                    <div class="top">
                        <span class="top-left">较前日</span>
                        <span v-if="dataCnt.negative_feedback_cnt>0" class="up-success float-right">
                            <v-icon>mdi-arrow-up-thin</v-icon>
                             {{dataCnt.negative_feedback_cnt}}
                        </span>
                        <span v-else-if="dataCnt.negative_feedback_cnt<0" class="down-red float-right">
                            <v-icon>mdi-arrow-down-thin</v-icon>{{Math.abs(dataCnt.negative_feedback_cnt)}}
                        </span>
                        <span v-else class="float-right"> {{dataCnt.negative_feedback_cnt}}</span>
                    </div>
                    <div class="text-h6 font-weight-medium">
                        {{dataCnt.negative_feedback_cnt}}
                    </div>
                    <div>昨日流失
                        <v-tooltip top color="default">
                            <template v-slot:activator="{ on, attrs }">
                                <v-icon size="12" v-bind="attrs" v-on="on" class="text--secondary">mdi-help-circle
                                </v-icon>
                            </template>
                            <span>成员删除或加入黑名单的客户数量</span>
                        </v-tooltip>
                    </div>
                </div>
                <div class="grey lighten-4 rounded box-number pa-3 ma-2 box-width">
                    <div class="top">
                        <span class="top-left">较前日</span>
                        <span v-if="dataCnt.new_apply_cnt>0" class="up-success float-right">
                            <v-icon>mdi-arrow-up-thin</v-icon>
                             {{dataCnt.new_apply_cnt}}
                        </span>
                        <span v-else-if="dataCnt.new_apply_cnt<0" class="down-red float-right">
                            <v-icon>mdi-arrow-down-thin</v-icon>{{Math.abs(dataCnt.new_apply_cnt)}}
                        </span>
                        <span v-else class="float-right"> {{dataCnt.new_apply_cnt}}</span>
                    </div>
                    <div class="text-h6 font-weight-medium">
                        {{dataCnt.new_apply_cnt}}
                    </div>
                    <div>
                        昨日发起申请
                        <v-tooltip top color="default">
                            <template v-slot:activator="{ on, attrs }">
                                <v-icon size="12" v-bind="attrs" v-on="on" class="text--secondary">mdi-help-circle
                                </v-icon>
                            </template>
                            <span>成员通过「搜索手机号」、「扫一扫」、「从微信好友中添加」等渠道主动向客户发起的好友申请数量</span>
                        </v-tooltip>
                    </div>
                </div>
            </v-card-actions>
        </v-card>
        <v-card outlined class="mb-2">
            <div  class="mx-4 mt-8">
                <DateSlot @handleParam="searchDataCustomer"
                          :options="{id:'customer',dept:false}"
                          ref="childAll"
                ></DateSlot>
            </div>
            <v-card-text>
                <EchartLine :chartData="chartUserLine"></EchartLine>
            </v-card-text>
        </v-card>
        <v-card outlined class="mb-2">
            <div class="mx-4 mt-8">
                <DateSlot @handleParam="searchDataCustomer"
                          :options="{id:'topCustomer',dept:true}"
                          ref="childTop10"
                ></DateSlot>
            </div>
            <v-card-text>
                <EchartBar :chartData="chartUserBarTop"></EchartBar>
            </v-card-text>
        </v-card>
        <v-card outlined class="mb-2">
            <div class="d-flex justify-space-between mx-4 mt-8">
                <DateSlot @handleParam="searchDataCustomer"
                          :options="{id:'table',dept:true}"
                          ref="childTable"
                ></DateSlot>
                <XlsxExplode  :parentFnSheet="getSheetData"></XlsxExplode>
            </div>
            <v-card-text>
                <SimpleTable :headers="chartHeaders"
                             :desserts="chartDesserts"
                             :options="{caption:'成员联系明细'}"
                             @handleParam="searchDataCustomer"
                ></SimpleTable>
            </v-card-text>
        </v-card>
    </div>
</template>

<script>
    import qywxapi from "../../api/qyweixinapi";
    import {getStorage, getTime, hasOwnPropertyCall} from "../../assets/js/comm";
    import EchartLine from '../../components/EchartLine'
    import EchartBar from '../../components/EchartBar'
    import SimpleTable from '../../components/SimpleTable'
    import DateSlot from '../../components/DateSlot'
    import XlsxExplode from '../../components/XlsxExplode'

    export default {
        name: "customer",
        data() {
            return {
                chartUserLine: null,
                chartUserBarTop: null,
                chartUserTable: null,
                chartHeaders: [
                    {text: '成员', value: 'name'},
                    {text: '新增客户', value: 'new_contact_cnt'},
                    {text: '流失客户', value: 'negative_feedback_cnt'},
                    {text: '当日发起申请', value: 'new_apply_cnt'},
                ],
                chartDesserts: [],
                dataCnt: {
                    user_cnt: '-',             //客户总数
                    new_contact_cnt: '-',      //新增
                    negative_feedback_cnt: '-', //流失
                    new_apply_cnt: '-',         //发起申请

                    distinct_user_cnt: 0,
                    prev_new_contact_cnt: 0,
                    prev_negative_feedback_cnt: 0,
                    prev_new_apply_cnt: 0,
                }
            }
        },
        mounted() {
            this.$refs.childAll.getDataList();
            this.$refs.childTop10.getDataList();
            this.$refs.childTable.getDataList();
        },
        components: {
            EchartLine, EchartBar, SimpleTable, DateSlot, XlsxExplode
        },
        methods: {
            showChartTop10(data) {
                let barEchartOption = {
                    title: {
                        text: '员工新增客户TOP10'
                    },
                    legend: {
                        data: ['客户日增']
                    },
                    xAxis: {
                        type: 'category',
                        data: []
                    },
                    series: [
                        {
                            name: '客户新增',
                            type: 'bar',
                            data: []
                        }
                    ]
                };
                let ulist_key = this.$store.state.user.key_u_list;

                for (let item of data) {
                    let userName = hasOwnPropertyCall(ulist_key, item.userid) ? ulist_key[item.userid]['name'] : '未知员工';
                    barEchartOption.xAxis.data.push(userName);
                    barEchartOption.series[0].data.push(item.cnt)
                }
                return barEchartOption;
            },
            showChartBehavior(behavior_user) {
                let echartData = {
                    title: {
                        text: '客户数据总览'
                    },
                    dataset: {
                        source: [['客户数据分析',
                            // '客户总数',
                            '新增客户', '发起申请', '客户流失']]
                    },
                    series: [{type: 'line', smooth: true}, {type: 'line', smooth: true}, {type: 'line', smooth: true}]
                }
                //客户总数计算出来
                let len = behavior_user.length;
                for (let i = 0; i < len; i++) {
                    echartData.dataset.source.push([
                        getTime(behavior_user[i]['stat_time'], 5),
                        behavior_user[i]['new_contact_cnt'],
                        behavior_user[i]['new_apply_cnt'],
                        behavior_user[i]['negative_feedback_cnt'],
                    ])
                }
                return echartData;
            },
            showChartTable(tableData) {
                this.chartDesserts = [];
                for (let item of tableData) {
                    this.chartDesserts.push(
                        {
                            name: item.name,
                            new_contact_cnt: item.new_contact_cnt,
                            negative_feedback_cnt: item.negative_feedback_cnt,
                            new_apply_cnt: item.new_apply_cnt
                        }
                    );
                }
            },
            searchDataCustomer(param) {
                qywxapi.postFormAPI('admcontact',
                    {
                        act: 'customer_analysis_list',
                        ctrl: param.id,
                        corpid: getStorage('corpid'),
                        param: JSON.stringify(param)
                    }
                ).then(res => {
                    switch (param.id) {
                        case 'customer':
                            this.dataCnt = res.dataCnt;
                            this.chartUserLine = this.showChartBehavior(res.list);
                            break;
                        case 'topCustomer':
                            this.chartUserBarTop = this.showChartTop10(res.list);
                            break;
                        case 'table':
                            this.chartUserTable = this.showChartTable(res.list);
                            break;
                    }

                }).catch(err => {
                    console.log(err);
                })
            },
            getSheetData() {
                return {
                    header: this.chartHeaders,
                    sheetData: this.chartDesserts,
                    title: '客户分析'
                }
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
    .down-red, .mdi-arrow-down-thin:before {
        color: red;
    }
    .up-success, .mdi-arrow-up-thin:before {
        color: #4caf50;
    }
    .mdi-arrow-up-thin:before, .mdi-arrow-down-thin:before {
        font-size: 1.25rem !important;
    }
</style>