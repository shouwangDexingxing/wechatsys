<template>
    <v-dialog
            v-model="dialog"
            persistent
            max-width="1200"

    >
        <template v-slot:activator="{ on, attrs }">
            <v-combobox
                    v-bind="attrs"
                    v-on="on"
                    v-model="commboxVmode"
                    label="部门/员工"
                    dense
                    vaule="123432"
                    multiple
                    hide-selected
            ></v-combobox>
        </template>
        <v-card>
            <v-card-title class="d-flex justify-space-between">
                <span class="text-h5">选择部门/员工</span>
                <v-icon small @click="save(0)">mdi-close</v-icon>
            </v-card-title>
            <v-divider></v-divider>
            <div class="d-flex pa-3">
                <v-card class="boxCard"
                        outlined
                        max-height="600"
                        min-height="300"
                >
                    <v-navigation-drawer
                            v-model="deptVal"
                            touchless
                            dense>
                        <v-toolbar class="grey lighten-4" flat dense>
                            <v-toolbar-title @click="loadUsers()">{{$store.state.corp_cfg.corp_name}}</v-toolbar-title>
                        </v-toolbar>
                        <v-treeview

                                dense
                                selectable
                                activatable
                                return-object
                                selection-type="independent"
                                :items="items"
                                :active="valueselect"
                                @input="selectFun"
                                @update:active="loadUsers"
                        ></v-treeview>
                    </v-navigation-drawer>
                </v-card>

                <div class="mx-1"></div>
                <v-card class="flex-grow-1 overflow-auto"
                        max-height="600"
                        min-height="300"
                        outlined>
                    <v-list dense
                            light
                            min-width="280"
                    >
                        <v-subheader>{{checkDeptName}}</v-subheader>
                        <v-list-item
                                v-for="(item) in deptUserList"
                                :key="item.id"
                        >
                            <v-checkbox
                                    dense
                                    v-model="valueChecbox"
                                    :label="item.name"
                                    :value="item"
                                    hide-details
                            ></v-checkbox>
                        </v-list-item>
                    </v-list>
                </v-card>

                <div class="mx-1"></div>
                <v-card
                        class="flex-shrink-0 overflow-auto "
                        outlined
                        width="280"
                        max-height="600"
                        min-height="300"
                >
                    <v-list dense
                            light
                            disabled
                            width="280"
                    >
                        <v-subheader>选中的部门/成员</v-subheader>
                        <v-list-item
                                v-for="(item,i) in selectList"
                                :key="i"
                        >
                            <v-list-item-icon v-if="item.parentid">
                                <v-icon>mdi-folder-account-outline</v-icon>
                            </v-list-item-icon>
                            <v-list-item-icon v-else>
                                <v-icon>mdi-account</v-icon>
                            </v-list-item-icon>

                            <v-list-item-title>{{item.name}}</v-list-item-title>
<!--                            <v-btn x-small-->
<!--                                   depressed-->
<!--                                   @click="delActiveUser(item)">-->
<!--                                <v-icon small>mdi-close</v-icon>-->
<!--                            </v-btn>-->
                        </v-list-item>

                    </v-list>
                </v-card>

            </div>
            <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn
                        color="blue darken-1"
                        text
                        @click="save(0)"
                >取消
                </v-btn>
                <v-btn
                        color="blue darken-1"
                        text
                        @click="save(1)"
                >确定
                </v-btn>
            </v-card-actions>
        </v-card>
    </v-dialog>
</template>

<script>
    import qywxapi from "../api/qyweixinapi";
    import {getStorage, isNull, creatTree, hasOwnPropertyCall} from "../assets/js/comm";

    export default {
        name: "CommboxUserDept",
        data() {
            return {
                checkDeptName: '',
                items: [],
                dialog: false,
                checkBox: false,   //treeview 事件选中标记
                deptVal: true,    //部门导航树显示还是隐藏
                valueselect: [],   //选中的部门
                valueChecbox: [],    //选中的成员
                deptUserList: [],   //当前active部门的成员
                selectList: [],      //选中的部门及成员列表 valueselect 与 valueChecbox 合集

                commboxVmode: [],    //部门人员选择框显示信息
                commboxValue: {
                    userid: [],
                    partyid: []
                }   //传到后台信息 按部门id,userid区分


            }
        },
        watch: {
            dialog: {
                handler(newValue) {
                    if (newValue == true) {
                        this.loadChildrenDepart();
                        this.deptVal = true;
                    }
                },
                // deep: true,
            },
            valueChecbox: {
                handler() {
                    this.concatArray();
                },
            },
            valueselect: {
                handler() {
                    this.concatArray();
                },
            },
        },
        methods: {
            getChieldData() {
                return this.commboxValue;
            },
            init(){
                this.items = [];
                this.valueChecbox = [];    //选中的成员
                this.deptUserList = [];   //当前active部门的成员
                this.selectList = [];      //选中的部门及成员列表 valueselect 与 valueChecbox 合集
                this.commboxVmode = []
                this.commboxValue = {
                    userid: [],
                    partyid: []
                };
            },
            save(flag) {
                this.dialog= false;
                if (flag) {
                    this.commboxVmode = [];
                    this.commboxValue = {
                        userid: [],
                        partyid: []
                    }
                    this.selectList.forEach((item) => {
                        if (hasOwnPropertyCall(item, 'parentid')) {
                            this.commboxValue.partyid.push(item.id);
                        } else {
                            this.commboxValue.userid.push(item.userid);
                        }
                        this.commboxVmode.push(item.name);
                    });
                }else {
                    this.init();
                }
            }
            ,
            //获取部门
            loadChildrenDepart() {
                this.deptUserList = [];
                if (this.items.length > 0) {
                    return false;
                }
                return qywxapi.postFormAPI('adminapi', {
                    act: 'dept_list_all',
                    corpid: getStorage('corpid'),
                }).then(res => {
                    if (!isNull(res)) {
                        this.items = creatTree.TreeNode(res, 'id', 'parentid', 'is_first_parent');
                    }
                })
            }
            ,
            //得到人员
            loadUsers(node) {
                if (this.checkBox === true) {
                    this.checkBox = false;
                    return false;
                }
                let departId = 0;
                if (node == undefined) {
                    this.checkDeptName = this.$store.state.corp_cfg.corp_name;
                } else if (node.length <= 0) {
                    return false;
                } else {
                    departId = node[0]['id'];
                    this.checkDeptName = node[0]['name'];
                }


                return qywxapi.postFormAPI('adminapi',
                    {
                        act: 'user_depart_list',
                        departId: departId,
                        corpid: getStorage('corpid'),
                    }
                ).then(res => {
                    this.deptUserList = res;
                })
            }
            ,
            //得到选中部门
            selectFun(node) {
                this.checkBox = true;
                this.valueselect = node;
            },
            concatArray() {
                this.selectList = this.valueselect.concat(this.valueChecbox);
            }
        }
    }
</script>

<style scoped>

</style>