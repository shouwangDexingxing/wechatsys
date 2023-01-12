<template>
    <div>
        <v-card outlined class="mb-2">
            <v-card-actions class="d-flex pa-2 align-stretch">
                <div class="grey lighten-4 rounded box-number  pa-3 ma-2 box-width">
                    <div class="top">&nbsp;</div>
                    <div class="text-h6h5 font-weight-medium">
                        {{dataCnt.chat_total}}
                    </div>
                    <div>客群总数</div>
                </div>
                <div class="grey lighten-4 rounded box-number  pa-3 ma-2 box-width">
                    <div class="top">
                        <span class="top-left">较前日</span>
                        <span v-if="dataCnt.old_new_chat_cnt>0" class="up-success float-right">
                            <v-icon>mdi-arrow-up-thin</v-icon>
                             {{dataCnt.old_new_chat_cnt}}
                        </span>
                        <span v-else-if="dataCnt.old_new_chat_cnt" class="down-red float-right">
                            <v-icon>mdi-arrow-down-thin</v-icon>{{Math.abs(dataCnt.old_new_chat_cnt)}}
                        </span>
                        <span v-else class="float-right"> {{dataCnt.old_new_chat_cnt}}</span>
                    </div>
                    <div class="text-h6 font-weight-medium">
                        {{dataCnt.new_chat_cnt}}
                    </div>
                    <div>
                        新增客群
                        <v-tooltip top color="default">
                            <template v-slot:activator="{ on, attrs }">
                                <v-icon size="12" v-bind="attrs" v-on="on" class="text--secondary">mdi-help-circle
                                </v-icon>
                            </template>
                            <span>昨日新增客户群数量</span>
                        </v-tooltip>
                    </div>
                </div>
<!--                <div class="grey lighten-4 rounded box-number  pa-3 ma-2 box-width">-->
<!--                    <div class="top">-->
<!--                        <span class="top-left">较前日</span>-->
<!--                        <span v-if="dataCnt.old_del_chat_cnt>0" class="up-success float-right">-->
<!--                            <v-icon>mdi-arrow-up-thin</v-icon>-->
<!--                             {{dataCnt.old_del_chat_cnt}}-->
<!--                        </span>-->
<!--                        <span v-else-if="dataCnt.old_del_chat_cnt" class="down-red float-right">-->
<!--                            <v-icon>mdi-arrow-down-thin</v-icon>{{Math.abs(dataCnt.old_del_chat_cnt)}}-->
<!--                        </span>-->
<!--                        <span v-else class="float-right"> {{dataCnt.old_del_chat_cnt}}</span>-->
<!--                    </div>-->
<!--                    <div class="text-h6 font-weight-medium">-->
<!--                        {{dataCnt.del_chat_cnt}}-->
<!--                    </div>-->
<!--                    <div>解散客群-->
<!--                    </div>-->
<!--                </div>-->
<!--                <div class="grey lighten-4 rounded box-number  pa-3 ma-2 box-width">-->
<!--                    <div class="top">-->
<!--                        <span class="top-left">较前日</span>-->
<!--                        <span v-if="dataCnt.old_onlay_new_chat_cnt>0" class="up-success float-right">-->
<!--                            <v-icon>mdi-arrow-up-thin</v-icon>-->
<!--                             {{dataCnt.old_onlay_new_chat_cnt}}-->
<!--                        </span>-->
<!--                        <span v-else-if="dataCnt.old_onlay_new_chat_cnt" class="down-red float-right">-->
<!--                            <v-icon>mdi-arrow-down-thin</v-icon>{{Math.abs(dataCnt.old_onlay_new_chat_cnt)}}-->
<!--                        </span>-->
<!--                        <span v-else class="float-right"> {{dataCnt.old_onlay_new_chat_cnt}}</span>-->
<!--                    </div>-->
<!--                    <div class="text-h6 font-weight-medium">-->
<!--                        {{dataCnt.onlay_new_chat_cnt}}-->
<!--                    </div>-->
<!--                    <div>净增客群</div>-->
<!--                </div>-->
                <div class="grey lighten-4 rounded box-number  pa-3 ma-2 box-width">
                    <div class="top">
                        <span class="top-left">活跃率</span>
                        <span  class="float-right">  {{dataCnt.old_chat_has_msg}}</span>
                    </div>
                    <div class="text-h6 font-weight-medium">
                        {{dataCnt.chat_has_msg}}
                    </div>
                    <div>活跃客群
                        <v-tooltip top color="default">
                            <template v-slot:activator="{ on, attrs }">
                                <v-icon size="12" v-bind="attrs" v-on="on" class="text--secondary">mdi-help-circle
                                </v-icon>
                            </template>
                            <span>昨日有发过消息的客户群数量</span>
                        </v-tooltip>
                    </div>
                </div>
                <div class="grey lighten-4 rounded box-number  pa-3 ma-2 box-width">
                    <div class="top">
                        <span class="top-left">较前日</span>
                        <span v-if="dataCnt.old_msg_total>0" class="up-success float-right">
                            <v-icon>mdi-arrow-up-thin</v-icon>
                             {{dataCnt.old_msg_total}}
                        </span>
                        <span v-else-if="dataCnt.old_msg_total" class="down-red float-right">
                            <v-icon>mdi-arrow-down-thin</v-icon>{{Math.abs(dataCnt.old_msg_total)}}
                        </span>
                        <span v-else class="float-right"> {{dataCnt.old_msg_total}}</span>
                    </div>
                    <div class="text-h6-h5 font-weight-medium">
                        {{dataCnt.msg_total}}
                    </div>
                    <div>
                        群消息总数
                        <v-tooltip top color="default">
                            <template v-slot:activator="{ on, attrs }">
                                <v-icon size="12" v-bind="attrs" v-on="on" class="text--secondary">mdi-help-circle
                                </v-icon>
                            </template>
                            <span>昨日客户群消息总数</span>
                        </v-tooltip>
                    </div>
                </div>
            </v-card-actions>
        </v-card>

        <v-card outlined class="mb-2">
            <div class="pt-8 px-4">
                <DateSlot @handleParam="searchDataChat"
                          :options="{id:'chant'}"
                          ref="childChant"
                ></DateSlot>
            </div>
            <v-card-text>
                <EchartLine :chartData="chartGroupLine"></EchartLine>
            </v-card-text>
        </v-card>

        <v-card outlined class="mb-2">
            <div class="d-flex justify-space-between mx-4 mt-8">
                <DateSlot @handleParam="searchDataChat"
                          :options="{id:'table'}"
                          ref="childTable"
                ></DateSlot>
                <XlsxExplode  :parentFnSheet="getSheetData"></XlsxExplode>
            </div>
            <v-card-text>
                <SimpleTable :headers="chartHeaders"
                             :desserts="chartDesserts"
                             :options="{caption:'客群数据汇总'}"
                             @handleParam="searchDataCustomer"
                ></SimpleTable>
            </v-card-text>
        </v-card>
    </div>
</template>

<script>
    import EchartLine from "../../components/EchartLine";
    import DateSlot from "../../components/DateSlot";
    import {getStorage, getTime} from "../../assets/js/comm";
    import qywxapi from "../../api/qyweixinapi";
    import SimpleTable from "../../components/SimpleTable";
    import XlsxExplode from "../../components/XlsxExplode";
    export default {
        name: "customerGroup",
        data() {
            return {
                dataCnt: {
                    chat_total: '-',          //客户群总数量
                    new_chat_cnt: '-',       //新增客户群数量
                    chat_has_msg: '-',      //发过消息的客户群数量
                    new_member_cnt: '-',     //客户群新增群人数
                    msg_total: '-',         //客户群消息总数
                    new_message_cnt: 0,
                    new_avg_reply_time: 0
                },
                chartGroupLine: null,
                chartHeaders: [
                    {text: '日期', value: 'stat_time'},
                    {text: '客群总数', value: 'chat_total'},
                    {text: '新增客群', value: 'new_chat_cnt'},
                    {text: '活跃客群', value: 'chat_has_msg'},
                    {text: '客群总人数', value: 'member_total'},
                    {text: '新增群人数', value: 'new_member_cnt'},
                    {text: '活跃群人数', value: 'member_has_msg'},
                    {text: '客群消息', value: 'msg_total'},
                ],
                chartDesserts: [],
            }
        },
        components: {
            EchartLine, DateSlot,
            XlsxExplode,
            SimpleTable,
        },
        mounted() {
            this.$refs.childChant.getDataList();
            this.$refs.childTable.getDataList();
        },
        methods: {
            searchDataChat(param) {
                qywxapi.postFormAPI('admcontact',
                    {
                        act: 'chant_analysis_group',
                        ctrl: param.id,
                        corpid: getStorage('corpid'),
                        param: JSON.stringify(param)
                    }
                ).then(res => {
                    switch (param.id) {
                        case 'chant':
                            var dataCnt = res.dataCnt;
                            //计算活跃率
                            res.dataCnt.old_chat_has_msg =
                                dataCnt.chat_total<=0 || dataCnt.chat_has_msg ? '-'
                                : ((dataCnt.chat_has_msg/dataCnt.chat_total)*100+'%');
                            this.dataCnt = res.dataCnt;
                            this.chartGroupLine = this.showChartLine(res.list);
                            break;
                        case 'table':
                            this.showChartTable(res.list);
                            break;
                    }

                }).catch(err => {
                    console.log(err);
                })
            },
            showChartLine(list){
                let len = list.length;
                let echartData = {
                    title: {
                        text: '客群趋势'
                    },
                    dataset: {
                        source: [[ '日期','客群总数', '新增客群', '活跃客群']]
                    },
                    series: [
                        {type: 'line', smooth: true},
                        {type: 'line', smooth: true},
                        {type: 'line', smooth: true},
                    ]
                }
                for (let i = 0; i < len; i++) {
                    echartData.dataset.source.push([
                        getTime(list[i]['stat_time'], 5),
                        list[i]['chat_total'],
                        list[i]['new_chat_cnt'],
                        list[i]['chat_has_msg'],
                    ])
                }
                return echartData;
            },
            showChartTable(list) {
                this.chartDesserts = [];
                for (let item of list) {
                    this.chartDesserts.push(
                        {
                            stat_time: getTime(item['stat_time'], 4),
                            chat_total: item.chat_total,
                            new_chat_cnt: item.new_chat_cnt,
                            chat_has_msg: item.chat_has_msg,
                            member_total: item.member_total,
                            new_member_cnt: item.new_member_cnt,
                            member_has_msg: item.member_has_msg,
                            msg_total: item.msg_total,
                        }
                    );
                }
            },
            getSheetData() {
                return {
                    header: this.chartHeaders,
                    sheetData: this.chartDesserts,
                    title: '客群数据'
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