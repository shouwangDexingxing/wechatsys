<!--企微账号绑定到万业云系统-->
<template>
    <v-dialog
            v-model="accDialog"
            fullscreen

            transition="dialog-bottom-transition"
            scrollable
    >
        <v-card tile>
            <v-container>
            <v-toolbar
                    max-height="65"
                    flat
                    dark
                    color="primary"
            >
                <v-toolbar-title>企微通讯录员工绑定到万业云账号</v-toolbar-title>
                <v-spacer></v-spacer>
                <v-toolbar-items>
                    <v-btn dark
                            text
                            @click="accDialogEvent"
                    >关闭</v-btn>
                </v-toolbar-items>
            </v-toolbar>
            <v-card-text class="d-flex flex-wrap">
                <div class="mr-2 flex-grow-1">
                    <v-card-title >
                        应用可见范围
                    </v-card-title>
                    <ContactsTree
                            :dialog="accDialog"
                            :options="{userid:1}"></ContactsTree>
                </div>
                <div >
                    <v-card-title>万业云账户系统</v-card-title>
                    <v-card-subtitle>请把左边企微通讯录对应人员的userID复制到右侧需要绑定的登录账号中</v-card-subtitle>
                    <v-data-table
                            :headers="headers"
                            :items="desserts"
                            class="elevation-1"
                    >
                        <template v-slot:item.qywx_userid="props">
                            <!-- :return-value.sync="props.item.qywx_userid" -->
                            <v-edit-dialog
                                    large
                                    cancel-text="取消"
                                    save-text="保存"
                                    persistent
                                    @save="save(props.item)"
                                    @open="open(props.item)"
                            >
                                {{ props.item.qywx_userid }}
                                <template v-slot:input>
                                    <div class="mt-4 text-subtitle-1">
                                        {{edit_dialog_title}}
                                    </div>
                                    <v-text-field
                                            v-model="props.item.qywx_userid"
                                            label="对应userID"
                                            single-line
                                            counter
                                    ></v-text-field>
                                </template>
                            </v-edit-dialog>
                        </template>
                    </v-data-table>
                </div>
            </v-card-text>
            </v-container>
        </v-card>

    </v-dialog>
</template>

<script>
    import ContactsTree from '../components/contactsTree.vue';
    import zswyyapi from "../api/zswyyapi";
    import {getStorage} from '../assets/js/comm'
    export default {
        name: "accountBind",
        components: {
            ContactsTree,
        },
        data() {
            return {
                accDialog: false,
                edit_dialog_title:'修改此账号绑定的userID',
                old_node: '',
                desserts: [],
                headers: [
                    {
                        text: '姓名',
                        value: 'usr',
                    },
                    {
                        text: '登录账号',
                        value: 'logname',
                    },
                    {
                        text: '部门',
                        value: 'dept',
                    },
                    {
                        text: '角色',
                        value: 'pid',
                    },
                    {
                        text: '企业微信员工唯一userID',
                        value: 'qywx_userid',
                    },

                ],
            }
        },
        methods:{
            accDialogEvent(){
                this.accDialog = !this.accDialog;
                if(this.accDialog===true){
                    this.getWyyUser();
                }
            },
            getWyyUser(){
                return zswyyapi.postFormAPI('qywx', {act: 'get_wyy_user',})
                    .then(res => {  this.desserts = res;    })
            },
            save(node){
                //判断userID是否唯一
                let ischecked = this.validateUserID(node);
                if(ischecked){
                    //提交数据
                     zswyyapi.postFormAPI('qywx', {
                         act: 'set_qywx_userid',
                         id:node.id,
                         logname:node.logname,
                         corpid:getStorage('corpid'),
                         userid:node.qywx_userid
                     }).then(res => {
                         this.$store.commit('showsnackbar',res.data);
                     })
                }
                return false

            },
            open(node){
                this.edit_dialog_title = '绑定账号“'+node.logname+'”的userId';
                this.old_node = node;
            },
            validateUserID(node){
                for(let user of this.desserts){
                    if(
                        node.id!=user.id
                        && user.qywx_userid==node.qywx_userid
                        && node.qywx_userid
                    ){
                        this.$store.commit('showsnackbar','【'+node.usr+'】的企业微信员工userID重复');
                        node.qywx_userid=this.old_node.qywx_userid;
                        return false;
                    }
                }
                return  true;
            }
        }
    }
</script>

<style scoped>

</style>