<template>
    <div>
        <v-card>
            <v-card-actions class="d-flex pa-4  align-center">
                <v-container>
                    <v-row>
                        <v-col class="grey lighten-4 rounded box-number text-center pa-3 ma-2">
                            <div class="text-h5 font-weight-medium">
                                {{userLicence.useCnt}}
                            </div>
                            <div>应用可见人数</div>
                        </v-col>
                        <v-col class="grey lighten-4 rounded box-number text-center pa-3 ma-2">
                            <div class="text-h5 font-weight-medium">
                                {{userLicence.activCnt}}
                            </div>
                            <div>已激活人数</div>
                        </v-col>
                        <v-col class="grey lighten-4 rounded box-number text-center pa-3 ma-2">
                            <div class="text-h5 font-weight-medium">
                                {{userLicence.noActiveCnt}}
                            </div>
                            <div>未激活人数</div>
                        </v-col>

                        <v-col class="grey lighten-4 rounded box-number text-center pa-3 ma-2">
                            <div class="text-h5 font-weight-medium">
                                {{userLicence.all_count}}
                            </div>
                            <div>已购买许可数</div>
                        </v-col>
                        <v-col class="grey lighten-4 rounded box-number text-center pa-3 ma-2">
                            <div class="text-h5 font-weight-medium">
                                {{userLicence.base_count}}
                            </div>
                            <div>基础账号</div>
                        </v-col>
                        <v-col class="grey lighten-4 rounded box-number text-center pa-3 ma-2">
                            <div class="text-h5 font-weight-medium">
                                {{userLicence.external_contact_count}}
                            </div>
                            <div>互通账号</div>
                        </v-col>



                    </v-row>
                </v-container>
            </v-card-actions>
            <v-divider></v-divider>


            <v-tabs background-color="grey lighten-3">
                <v-tab class="justify-start">
                    服务许可帐号
                </v-tab>
                <v-tab class="justify-start">
                    许可激活码
                </v-tab>
                <v-tab class="justify-start">
                    购买订单列表
                </v-tab>

                <v-tab-item class="pa-3">
                    <v-container>
                        <v-row justify="end">
                            <v-dialog
                                    v-model="dialog"
                                    fullscreen
                                    hide-overlay
                                    transition="dialog-bottom-transition"
                            >
                                <template v-slot:activator="{ on, attrs }">
                                    <v-btn color="primary"
                                           dark
                                           v-bind="attrs"
                                           v-on="on"
                                    >账号许可管理</v-btn>
                                </template>
                                <v-card>
                                    <div class="container">
                                        <v-toolbar
                                                dense
                                                color="primary"
                                                dark>

                                            <v-toolbar-title>帐号激活</v-toolbar-title>
                                            <v-spacer></v-spacer>
                                            <v-toolbar-items>
                                                <v-btn icon
                                                       dark
                                                       @click="dialog = false"
                                                ><v-icon>mdi-close</v-icon></v-btn>
                                            </v-toolbar-items>
                                        </v-toolbar>
                                    </div>
                                    <v-card-text class="d-flex container" width="100%">
                                        <ContactsTree
                                                :activeCodeList="desserts_code"
                                                :dialog="dialog"
                                                :options="{crud:true}"></ContactsTree>
                                    </v-card-text>
                                </v-card>
                            </v-dialog>
                        </v-row>
                    </v-container>
                    <div class="flex-grow-1">
                        <v-data-table
                                :headers="headers_acc"
                                :items="desserts_acc"
                                locale="zh-cn"
                        ></v-data-table>
                    </div>
                </v-tab-item>
                <v-tab-item>
                    <div class="flex-grow-1">
                        <v-data-table
                                :headers="headers_code"
                                :items="desserts_code"
                                locale="zh-cn"
                        ></v-data-table>
                    </div>
                </v-tab-item>
                <v-tab-item>
                    <div class="flex-grow-1">
                        <v-data-table
                                :headers="headers_order"
                                :items="desserts_order"
                                locale="zh-cn"
                        >
                        </v-data-table>
                    </div>
                </v-tab-item>
            </v-tabs>
            <br>
        </v-card>
    </div>
</template>

<script>
    import qywxapi from "../../api/qyweixinapi";
    import {getStorage} from "../../assets/js/comm";
    import ContactsTree from '../../components/contactsTree.vue';

    export default {
        name: "ApiLicence",
        data() {
            return {
                dialog: false,
                userLicence: {
                    useCnt:'-',
                    activCnt: '-',
                    base_count:'-',
                    external_contact_count:'-',
                    all_count:'-',
                    noActiveCnt:'-'
                },
                headers_acc: [
                    {
                        text: '许可成员',
                        align: 'start',
                        filterable: false,
                        value: 'name',
                    },
                    // {text: '所在部门', value: 'departname'},
                    {text: '账号类型', value: 'type'},
                    {text: '激活时间', value: 'active_time'},
                    {text: '过期时间', value: 'expire_time'},
                ],
                headers_order:[
                    {
                        text: '订单号',
                        value: 'order_id',
                    },
                    {
                        text: '订单类型',
                        value: 'order_type',
                    },
                    {
                        text: '订单状态',
                        value: 'order_status',
                    },
                    {
                        text: '购买时间',
                        value: 'pay_time',
                    },
                    {
                        text: '基础帐号',
                        value: 'base_count',
                    },
                    {
                        text: '互通帐号',
                        value: 'external_contact_count',
                    }, {
                        text: '购买的月数',
                        value: 'months',
                    }, {
                        text: '购买的天数',
                        value: 'days',
                    }
                ],
                headers_code:[
                    {text: '激活码', value: 'active_code'},
                    {text: '账号类型', value: 'type'},
                    {text: '账号状态', value: 'status'},
                    {text: '创建时间', value: 'create_time'},
                    {text: '首次激活', value: 'active_time'},
                    {text: '过期时间', value: 'expire_time'},
                    {text: '绑定成员', value: 'username'},
                ],
                desserts_acc: [],
                desserts_order:[],
                desserts_code:[],
            }
        },
        mounted() {
            this.getLicenceOrder();
        },
        components: {
            ContactsTree,
        },
        methods: {
            getLicenceOrder() {
                //adminapi provider
                // qywxapi.postFormAPI('provider',
                qywxapi.postFormAPI('adminapi',
                    {
                        act: 'licence_order',
                        corpid: getStorage('corpid'),
                    }
                ).then(res => {
                    let userList = this.$store.state.user.key_u_list;
                    let activeCodeType_1 = [];
                    let activeCodeType_2 = [];
                    for (let key in res.account_list) {
                        let userid = res.account_list[key]['userid'];
                        if (userList[userid]) {
                            res.account_list[key]['name'] = userList[userid]['name'];
                            res.account_list[key]['departname'] = userList[userid]['departname'];
                        }
                    }
                    for (let key in res.code_list) {
                        let userid = res.code_list[key]['userid'];
                        res.code_list[key]['username'] = userList[userid]?userList[userid]['name']:'';
                        if(res.code_list[key]=='基础账号'){
                            activeCodeType_1.push( res.code_list[key])
                        }
                        if(res.code_list[key]=='互通账号'){
                            activeCodeType_2.push( res.code_list[key])
                        }
                    }


                    this.desserts_acc = res.account_list;
                    this.desserts_order = res.licence_order;
                    this.desserts_code = res.code_list;
                    this.userLicence = res.account_cnt;

                    let noActiveCnt =   this.$store.state.user.useCnt - res.account_list.length;
                    this.userLicence = {
                        useCnt: this.$store.state.user.useCnt,
                        activCnt: res.account_list.length,
                        base_count:res.account_cnt.base_count,
                        external_contact_count:res.account_cnt.external_contact_count,
                        all_count:res.account_cnt.all_count,
                        noActiveCnt:isNaN(noActiveCnt) ? '-' : noActiveCnt,
                    }
                    We just sent your authentication code via email to 9********@qq.com. The code will expire at 4:53PM CST.


                });
            }
        }
    }
</script>

<style scoped>
    /*.box-number {*/
    /*    width: 180px;*/
    /*}*/
</style>