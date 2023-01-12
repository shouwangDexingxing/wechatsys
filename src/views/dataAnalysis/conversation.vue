<template>
    <div>
        <v-card outlined class="mb-2">
            <v-card-actions class="d-flex pa-2 align-stretch">
                <div class="grey lighten-4 rounded box-number  pa-3 ma-2 box-width">
                    <div class="top">
                        <span class="top-left">较前日</span>
                        <span v-if="dataCnt.new_chat_cnt>0" class="up-success float-right">
                            <v-icon>mdi-arrow-up-thin</v-icon>
                             {{dataCnt.new_chat_cnt}}
                        </span>
                        <span v-else-if="dataCnt.new_chat_cnt" class="down-red float-right">
                            <v-icon>mdi-arrow-down-thin</v-icon>{{Math.abs(dataCnt.new_chat_cnt)}}
                        </span>
                        <span v-else class="float-right"> {{dataCnt.new_chat_cnt}}</span>
                    </div>
                    <div class="text-h6 font-weight-medium">
                        {{dataCnt.chat_cnt}}
                    </div>
                    <div>昨日单聊
                        <v-tooltip top color="default">
                            <template v-slot:activator="{ on, attrs }">
                                <v-icon size="12" v-bind="attrs" v-on="on" class="text--secondary">mdi-help-circle
                                </v-icon>
                            </template>
                            <span>成员有主动发送过消息的单聊数量</span>
                        </v-tooltip>
                    </div>
                </div>
                <div class="grey lighten-4 rounded box-number  pa-3 ma-2 box-width">
                    <div class="top">
                        <span class="top-left">较前日</span>
                        <span v-if="dataCnt.new_message_cnt>0" class="up-success float-right">
                            <v-icon>mdi-arrow-up-thin</v-icon>
                             {{dataCnt.new_message_cnt}}
                        </span>
                        <span v-else-if="dataCnt.new_message_cnt" class="down-red float-right">
                            <v-icon>mdi-arrow-down-thin</v-icon>{{Math.abs(dataCnt.new_message_cnt)}}
                        </span>
                        <span v-else class="float-right"> {{dataCnt.new_message_cnt}}</span>
                    </div>
                    <div class="text-h6 font-weight-medium">
                        {{dataCnt.message_cnt}}
                    </div>
                    <div>昨日发送消息
                        <v-tooltip top color="default">
                            <template v-slot:activator="{ on, attrs }">
                                <v-icon size="12" v-bind="attrs" v-on="on" class="text--secondary">mdi-help-circle
                                </v-icon>
                            </template>
                            <span>成员在单聊中发送的消息总数</span>
                        </v-tooltip>
                    </div>
                </div>
                <div class="grey lighten-4 rounded box-number pa-3 ma-2 box-width">
                    <div class="top">
                        <span class="top-left">较前日</span>
                        <span v-if="dataCnt.new_reply_percentage>0" class="up-success float-right">
                            <v-icon>mdi-arrow-up-thin</v-icon>
                             {{dataCnt.new_reply_percentage}}%
                        </span>
                        <span v-else-if="dataCnt.new_reply_percentage<0" class="down-red float-right">
                            <v-icon>mdi-arrow-down-thin</v-icon>{{Math.abs(dataCnt.new_reply_percentage)}}%
                        </span>
                        <span v-else class="float-right"> {{dataCnt.new_reply_percentage}}</span>
                    </div>
                    <div class="text-h6 font-weight-medium">
                        {{dataCnt.reply_percentage}}
                        <span v-if="dataCnt.reply_percentage"></span>
                    </div>
                    <div>昨日已回复聊天占比
                        <v-tooltip top color="default">
                            <template v-slot:activator="{ on, attrs }">
                                <v-icon size="12" v-bind="attrs" v-on="on" class="text--secondary">mdi-help-circle
                                </v-icon>
                            </template>
                            <span>一个自然日内，客户首先发消息的会话中，成员回复了的会话的占比。若数据展示为“-”代表没有给成员发送消息的客户，该项无法计算</span>
                        </v-tooltip>
                    </div>
                </div>
                <div class="grey lighten-4 rounded box-number pa-3 ma-2 box-width">
                    <div class="top">
                        <span class="top-left">较前日</span>
                        <span v-if="dataCnt.new_avg_reply_time>0" class="up-success float-right">
                            <v-icon>mdi-arrow-up-thin</v-icon>
                             {{dataCnt.new_avg_reply_time}}
                        </span>
                        <span v-else-if="dataCnt.new_avg_reply_time<0" class="down-red float-right">
                            <v-icon>mdi-arrow-down-thin</v-icon>{{Math.abs(dataCnt.new_avg_reply_time)}}
                        </span>
                        <span v-else class="float-right"> {{dataCnt.new_avg_reply_time}}</span>
                    </div>
                    <div class="text-h6 font-weight-medium">
                        {{dataCnt.avg_reply_time}}
                    </div>
                    <div>
                        平均首次回复时长(分)
                        <v-tooltip top color="default">
                            <template v-slot:activator="{ on, attrs }">
                                <v-icon size="12" v-bind="attrs" v-on="on" class="text--secondary">mdi-help-circle
                                </v-icon>
                            </template>
                            <span>一个自然日内，客户首先发消息至成员回复之间的时长，为首次回复时长。所有的首次回复总时长/已回复单聊总数，即为平均首次回复时长</span>
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
                <EchartLine :chartData="chartChatLine"></EchartLine>
            </v-card-text>
        </v-card>

        <v-card outlined class="mb-2">
            <div class="d-flex justify-space-between mx-4 mt-8">
                <DateSlot @handleParam="searchDataChat"
                          :options="{id:'table',dept:true}"
                          ref="childTable"
                ></DateSlot>
                <XlsxExplode :parentFnSheet="getSheetData"></XlsxExplode>
            </div>
            <v-card-text>
                <SimpleTable
                        :headers="chartHeaders"
                        :desserts="chartDesserts"
                        :options="{caption:'成员聊天分析'}"
                        @handleParam="searchDataChat"
                ></SimpleTable>
            </v-card-text>
        </v-card>
    </div>
</template>

<script>
    import qywxapi from "../../api/qyweixinapi";
    import {getStorage, getTime} from "../../assets/js/comm";
    import EchartLine from "../../components/EchartLine";
    import DateSlot from "../../components/DateSlot";
    import SimpleTable from "../../components/SimpleTable";
    import XlsxExplode from '../../components/XlsxExplode'

    export default {
        name: "conversation",
        data() {
            return {
                dataCnt: {
                    chat_cnt: '-',          //昨日单聊
                    message_cnt: '-',       //发送消息总数
                    reply_percentage: '-',   //已回复聊天占比
                    avg_reply_time: '-',     //平均首次回复时长
                    new_reply_percentage: 0,    //较前日
                    new_message_cnt: 0,
                    new_chat_cnt: 0,
                    new_avg_reply_time: 0
                },
                chartChatLine: null,
                chartHeaders: [
                    {text: '成员', value: 'name'},
                    {text: '聊天总数', value: 'chat_cnt'},
                    {text: '发送消息', value: 'message_cnt'},
                    {text: '已回复聊天占比', value: 'reply_percentage'},
                    {text: '平均首次回复时长', value: 'avg_reply_time'},
                ],
                chartDesserts:[],
            }
        },
        components: {
            EchartLine, DateSlot, SimpleTable, XlsxExplode
        },
        mounted() {
            this.$refs.childChant.getDataList();
            this.$refs.childTable.getDataList();
        },
        methods: {
            searchDataChat(param) {
                qywxapi.postFormAPI('admcontact',
                    {
                        act: 'chant_analysis_list',
                        ctrl: param.id,
                        corpid: getStorage('corpid'),
                        param: JSON.stringify(param)
                    }
                ).then(res => {
                    switch (param.id) {
                        case 'chant':
                            this.dataCnt = res.dataCnt;
                            this.chartChatLine = this.showChartLine(res.list);
                            break;
                        case 'table':
                            this.chartUserTable = this.showChartTable(res.list);
                            break;
                    }

                }).catch(err => {
                    console.log(err);
                })
            },
            showChartLine(list) {
                let len = list.length;
                let echartData = {
                    title: {
                        text: '会话数据总览'
                    },
                    dataset: {
                        source: [['会话分析', '聊天总数', '发送消息', '已回复聊天占比(%)', '平均首次回复时长(分)']]
                    },
                    series: [{type: 'line', smooth: true}, {type: 'line', smooth: true}, {
                        type: 'line',
                        smooth: true
                    }, {type: 'line', smooth: true}]
                }
                for (let i = 0; i < len; i++) {
                    echartData.dataset.source.push([
                        getTime(list[i]['stat_time'], 4),
                        list[i]['chat_cnt'],
                        list[i]['message_cnt'],
                        list[i]['reply_percentage'] * 10,
                        list[i]['avg_reply_time'],
                    ])
                }
                return echartData;
            },
            showChartTable(tableData) {
                this.chartDesserts = [];

                console.log(this.chartDesserts);
                for (let item of tableData) {
                    this.chartDesserts.push(
                        {
                            name: item.name,
                            chat_cnt: item.chat_cnt,
                            message_cnt: item.message_cnt,
                            avg_reply_time: item.avg_reply_time,
                            reply_percentage: item.reply_percentage
                        }
                    );
                }
                console.log(this.chartDesserts);
            },
            getSheetData() {
                return {
                    header: this.chartHeaders,
                    sheetData: this.chartDesserts,
                    title: '会话分析'
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