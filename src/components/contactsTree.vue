<template>
    <div class="d-flex py-4 flex-grow-1">
        <v-card class="flex-grow-0 flex-shrink-0"
                outlined
                v-if="items">
            <v-navigation-drawer dense>
                <v-toolbar class="grey lighten-4" flat dense>
                    <v-toolbar-title @click="loadUsers">{{corp_name}}</v-toolbar-title>
                </v-toolbar>
                <v-treeview
                        dense
                        activatable
                        :items="items"
                        :load-children="loadChildrenDepart"
                        @update:active="loadUsers"
                ></v-treeview>
            </v-navigation-drawer>
        </v-card>
        <div class="mx-1"></div>

        <v-card class="flex-grow-1" outlined>
            <v-card-title>全公司成员列表</v-card-title>
            <v-data-table
                    :headers="headers"
                    :items="desserts_Ulist"
                    class="elevation-1"
            >
                <template v-if="options.userid==1"
                          v-slot:header.userid="{ header }">
                    {{header.userid}}
                </template>
                <template v-slot:item.status="{ item }">
                    {{ item.status }}
                </template>
                <template v-slot:item.providerActiveCode="{ item }">
                    <div v-if="item.providerActiveCode.length==1">
                        {{item.providerActiveCode[0].type}}
                        <span v-if="options.crud" class="text-caption text--disabled">{{item.providerActiveCode[0].status}}</span>
                    </div>
                    <div v-else-if="item.providerActiveCode.length==2">
                        {{item.providerActiveCode[0].type}}
                        <span v-if="options.crud" class="text-caption text--disabled">{{item.providerActiveCode[0].status}}</span>
                        ，{{item.providerActiveCode[1].type}}
                        <span v-if="options.crud" class="text-caption text--disabled">{{item.providerActiveCode[1].status}}</span>
                    </div>
                </template>
                <template v-slot:item.actions="{ item,index }">
                    <div v-if="item.providerActiveCode.length==0
                    ||  (item.providerActiveCode.length==1 && item.providerActiveCode[0].type!='互通帐号')
                    ">
                        <v-btn text
                               small
                               outlined
                               color="success"
                               @click="bindActiveCode(item,index)">
                            账号设置
                        </v-btn>
                    </div>

                </template>
            </v-data-table>
        </v-card>

        <v-dialog
                v-if="accountInfo"
                v-model="bindCodeDialog"
                max-width="500"
        >
            <v-card>
                <v-card-title>成员基本信息</v-card-title>
                <v-divider></v-divider>
                <v-card-text>
                    <v-list dense>
                        <v-list-item>
                            <v-list-item-action>姓名</v-list-item-action>
                            <v-list-item-content>
                                {{accountInfo.name}}
                            </v-list-item-content>
                        </v-list-item>
                        <v-list-item>
                            <v-list-item-action>部门</v-list-item-action>
                            <v-list-item-content>
                                {{accountInfo.departname.join(',')}}
                            </v-list-item-content>
                        </v-list-item>
                        <v-list-item>
                            <v-list-item-action>职务</v-list-item-action>
                            <v-list-item-content>
                                {{accountInfo.position}}
                            </v-list-item-content>
                        </v-list-item>
                        <v-list-item>
                            <v-list-item-action>状态</v-list-item-action>
                            <v-list-item-content>
                                {{accountInfo.status}}
                            </v-list-item-content>
                        </v-list-item>
                        <v-list-item>
                            <v-list-item-action>当前账号</v-list-item-action>
                            <v-list-item-content>
                                <v-checkbox v-for="item of accountInfo.providerActiveCode"
                                            :key="item.id"
                                            disabled
                                            dense
                                            input-value="true">
                                    <template v-slot:label>
                                        <div>{{item.type}} | {{item.status}}</div>
                                    </template>
                                </v-checkbox>
                            </v-list-item-content>
                        </v-list-item>
                        <v-list-item>
                            <v-list-item-action>许可激活</v-list-item-action>
                            <v-list-item-content
                                    v-if="accountInfo.providerActiveCode.length==0">&nbsp;&nbsp;
                                <v-checkbox dense
                                            v-model="radiosActiveCode"
                                            label="基础帐号"
                                            color="indigo"
                                            value="1"
                                            hide-details
                                ></v-checkbox>&nbsp;&nbsp;
                                <v-checkbox
                                        dense
                                        v-model="radiosActiveCode"
                                        label="互通帐号"
                                        color="indigo darken-3"
                                        value="2"
                                        hide-details
                                ></v-checkbox>
                                <!--                                    基础账号 拥有调用身份验证、应用发消息等接口-->
                                <!--                                    未绑定的账号可以绑定基础账号，或互通账号。已绑定基础账号的，只能再绑定互通账号-->
                            </v-list-item-content>
                            <v-list-item-content v-else-if="accountInfo.providerActiveCode.length==1 && accountInfo.providerActiveCode[0].type=='基础帐号'">
                                <v-checkbox
                                        dense
                                        v-model="radiosActiveCode"
                                        label="互通帐号"
                                        color="indigo"
                                        value="2"
                                        hide-details
                                ></v-checkbox>
                            </v-list-item-content>
                        </v-list-item>

                        <v-list-item>
                            <v-list-item-action>激活码</v-list-item-action>
                            <v-list-item-content v-if="accountInfo.activeCode">
                                {{accountInfo.activeCode.code}}
                            </v-list-item-content>
                        </v-list-item>
                    </v-list>
                </v-card-text>
                <v-divider></v-divider>
                <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn color="green darken-1"
                           text
                           @click="saveActivCode"
                    >
                        保存
                    </v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>
    </div>
</template>

<script>
    import qywxapi from "../api/qyweixinapi";
    import {getStorage} from "../assets/js/comm";

    export default {
        name: 'contactsTree',
        props: ['options', 'dialog', 'activeCodeList'],
        data() {
            return {
                bindCodeDialog: false,
                radiosActiveCode: null,
                activeCodeBase: [],
                activeCodeExternal: [],
                items: null,
                corp_name: this.$store.state.corp_cfg.corp_name,
                headers: [],
                desserts_Ulist: [],
                accountInfo: null,
            }
        },
        watch: {
            dialog: {
                handler(newValue) {
                    if (newValue === true) {
                        this.loadChildrenDepart(null,);
                        this.loadUsers([0]);
                        this.setTableCulomn();
                    } else {
                        this.items = null;
                    }
                },
                // deep: true,
            },
            radiosActiveCode: {
                handler(newValue) {
                    this.changeSelectCode(newValue);
                }
            }

        },
        mounted() {
            this.loadChildrenDepart(null);
            this.loadUsers([0]);
            this.setTableCulomn();
        },
        methods: {
            //获取部门
            loadChildrenDepart(node) {
                let parentid;
                if (node === null) {
                    parentid = 1;
                } else {
                    parentid = node.id;
                }
                return qywxapi.postFormAPI('adminapi', {
                    act: 'dept_list',
                    parentid: parentid,
                    corpid: getStorage('corpid'),
                }).then(res => {
                    if (node === null) {
                        this.items = res;
                    } else {
                        node.children = res;
                    }
                })
            },
            //得到人员
            loadUsers(node) {
                let departId = node[0] == undefined ? 0 : node[0];
                return qywxapi.postFormAPI('adminapi',
                    {
                        act: 'user_depart_list',
                        departId: departId,
                        corpid: getStorage('corpid'),
                    }
                ).then(res => {
                    this.desserts_Ulist = res;
                })
            },
            setTableCulomn() {
                let headers = [
                    {text: '姓名', value: 'name',},
                    {text: '部门', value: 'departname'},
                    {text: '职务', value: 'position'},
                    {text: '状态', value: 'status'},
                    {text: '账号信息', value: 'providerActiveCode'},
                    // { text: '账号状态', value: 'providerActiveCode' },
                    // { text: '账号信息', value: 'providerActiveCode[0].type' },
                    // { text: '账号状态', value: 'providerActiveCode[0].status' },
                ];
                if (this.options.userid == 1) {
                    headers.push({text: 'userID', value: 'userid'})
                }
                if (this.options.crud && this.dialog) {
                    headers.push({text: '操作', value: 'actions', sortable: false});
                    if (this.activeCodeList.length) {
                        for (let val of this.activeCodeList) {
                            if (val.type == '基础帐号') {
                                this.activeCodeBase.push(val)
                            }
                            if (val.type == '互通帐号') {
                                this.activeCodeExternal.push(val)
                            }
                        }
                    }
                }
                this.headers = headers;
            }
            , bindActiveCode(useItem,index) {
                // console.log(useItem,index)
                useItem.index = index;
                this.bindCodeDialog = true;
                this.accountInfo = useItem;
                this.radiosActiveCode = null;
            },
            //绑定激活账号
            changeSelectCode(val) {
                switch (parseInt(val)) {
                    case 1:
                        this.accountInfo.activeCode = {
                            type: 1,
                            code: this.activeCodeBase[0]['active_code'],
                        }
                        break;
                    case 2:
                        this.accountInfo.activeCode = {
                            type: 1,
                            code: this.activeCodeExternal[0]['active_code'],
                        }
                        break;
                    default:
                        this.accountInfo.activeCode = null;
                        break;
                }
            },
            saveActivCode() {
                let instance = this;
                if(!this.accountInfo.activeCode){
                    this.$store.state.message = '请选择需要继续开通的账号类型';
                    this.$store.state.snackbar = true;
                    return false;
                }
                qywxapi.postFormAPI('adminqywx',
                    {
                        act: 'save_one_active_code',
                        corpid: getStorage('corpid'),
                        id: this.accountInfo.id,
                        userid: this.accountInfo.userid,
                        activeCode: this.accountInfo.activeCode,
                    }
                ).then(res => {
                    console.log(instance.desserts_Ulist)
                    instance.desserts_Ulist[instance.accountInfo.index]['providerActiveCode'] = res.providerActiveCode;
                    this.bindCodeDialog = false;
                    // console.log(res,index)
                })
            }
        }
    }
</script>

<style scoped>

</style>