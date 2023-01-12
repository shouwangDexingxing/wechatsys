<template>
    <div v-if="is_install_qwdapp===false">
        <v-dialog v-if="!auth_corp_info.corpid"
                  v-model="dialog"
                  fullscreen
                  hide-overlay
                  transition="dialog-bottom-transition"
        >
            <template v-slot:activator="{ on, attrs }">
                <v-btn
                        color="primary ma-5"
                        dark
                        v-bind="attrs"
                        v-on="on"
                        @click="installApp"
                >
                    添加代开发自建应用
                </v-btn>
            </template>
            <v-card class="d-flex flex-column" outlined>
                <v-toolbar dark
                           class="flex-grow-0 default"
                >
                    <v-btn
                            icon
                            dark
                            @click="dialog = false"
                    >
                        <v-icon>mdi-close</v-icon>
                    </v-btn>
                    <v-spacer></v-spacer>
                    <v-toolbar-items>
                        <v-btn
                                dark
                                text
                                @click="getAuthInfo"
                        >
                            已完成二维码授权
                        </v-btn>
                    </v-toolbar-items>
                </v-toolbar>
                <v-card-text class="d-flex grey lighten-3 flex-grow-1 justify-center flex-column ">
                    <div id="posent-qr-code" class="align-self-center pa-10 d-flex flex-column">
                        <div class="text-h6 text-center d-block">扫码授权代开发自建应用</div>
                        <canvas id="canvasQr" class="pa-2 my-4 align-self-center d-inline-block"></canvas>
                        <div id="canvasErr" class="pa-2 my-4 align-self-center d-none justify-center align-center">
                            二维码生成失败
                        </div>
                        <v-overlay
                                :absolute="absolute"
                                :value="overlay"
                        >
                        </v-overlay>
                    </div>
                    <div class="my-10  text-center">
                        <ul style="list-style-type: none">
                            <li>请使用您的企业微信管理员账号授权</li>
                            <li>授权成功后您的企业微信将与系统对接绑定</li>
                        </ul>
                    </div>
                </v-card-text>
            </v-card>
        </v-dialog>
        <v-card v-else outlined>
            <v-toolbar
                    outlined
                    dense
                    light
            >
                <v-toolbar-title>授权的企业微信及相关开发配置</v-toolbar-title>
                <v-dialog
                        v-model="dialog_edit"
                        width="700"
                >
                    <v-card>
                        <v-card-title class="text-h5 grey lighten-2">
                            应用基础信息
                        </v-card-title>

                        <v-card-text>
                            <v-form ref="form"
                                    v-model="valid"
                                    lazy-validation
                            >
                                <v-file-input
                                        v-model="corp_config.logo"
                                        accept="image/png, image/jpeg"
                                        hint="建议使用750*750，1M以内的jpg、png图片"
                                        prepend-icon="mdi-camera"
                                        show-size
                                        label="应用LOGO"
                                ></v-file-input>

                                <v-text-field
                                        v-model="corp_config.name"
                                        :counter="10"
                                        :rules="appnameRules"
                                        label="应用名称"
                                        required
                                ></v-text-field>
                                <v-textarea
                                        v-model="corp_config.intro"
                                        :counter="120"
                                        :rules="appintroRules"
                                        label="应用介绍"
                                        required
                                ></v-textarea><!--4-->

                                <!--                                <v-text-field v-model="corp_config.contacts_secret"-->
                                <!--                                              :rules="apptokenRules"-->
                                <!--                                              label="通讯录同步Secret"-->
                                <!--                                              required-->
                                <!--                                ></v-text-field>-->
                                <!--                                <v-text-field v-model="corp_config.corp_token"-->
                                <!--                                              :rules="apptokenRules"-->
                                <!--                                              label="Token签名"-->
                                <!--                                              required-->
                                <!--                                              disabled-->
                                <!--                                ></v-text-field>-->
                                <!--                   -->

                                <!--                                <v-text-field v-model="corp_config.encoding_aes_key"-->
                                <!--                                              :rules="appEncodingAESKeyRules"-->
                                <!--                                              label="EncodingAESKey密匙"-->
                                <!--                                              disabled-->
                                <!--                                              required-->
                                <!--                                ></v-text-field>-->

                            </v-form>
                        </v-card-text>
                        <v-divider></v-divider>
                        <v-card-actions>
                            <v-spacer></v-spacer>
                            <v-btn
                                    color="primary"
                                    text
                                    @click="validate"
                            >保存
                            </v-btn>
                        </v-card-actions>
                    </v-card>
                </v-dialog>

                <v-dialog
                        v-model="dialog_edit_customer"
                        width="700"
                >
                    <v-card>
                        <v-card-title class="text-h5 grey lighten-2">设置客户接收事件服务器</v-card-title>
                        <v-card-text>
                            <v-form ref="form"
                                    v-model="valid"
                                    lazy-validation
                            >
                                <v-text-field
                                        v-model="corp_config.customer_corp_token"
                                        :rules="apptokenRules"
                                        label="Token签名"
                                        required
                                ></v-text-field>
                                <v-text-field
                                        v-model="corp_config.customer_encoding_aes_key"
                                        :rules="appEncodingAESKeyRules"
                                        label="EncodingAESKey密匙"
                                        required
                                ></v-text-field>
                                <v-text-field
                                        v-model="corp_config.customer_callback_url"
                                        label="服务器URL地址"

                                        disabled
                                ></v-text-field>
                            </v-form>
                        </v-card-text>
                        <v-divider></v-divider>
                        <v-card-actions>
                            <v-spacer></v-spacer>
                            <v-btn
                                    color="primary"
                                    text
                                    @click="validateCustomer"
                            >保存
                            </v-btn>
                        </v-card-actions>
                    </v-card>
                </v-dialog>
            </v-toolbar>
            <v-tabs vertical left>
                <v-tab>
                    <v-icon left>mdi-wechat</v-icon>
                    授权企业信息
                </v-tab>
                <v-tab>
                    <v-icon left>mdi-cog-outline</v-icon>
                    应用开发配置
                </v-tab>
                <v-tab grow>
                    <v-icon left>mdi-account-cog-outline
                    </v-icon>
                    客户回调配置
                </v-tab>

                <!--授权企业信息-->
                <v-tab-item>
                    <v-card class="min-ht-5" outlined>
                        <v-card-text>
                            <v-list dense>
                                <v-list-item class="d-flex">
                                    <img class="logo rounded" :src="auth_corp_info.corp_square_logo_url">
                                </v-list-item>


                                <v-list-item class="d-flex">
                                    <div class="txt-left">公司名称</div>
                                    <div class="txt-right">
                                        <v-badge :value="hover"
                                                 :content="auth_corp_info.corp_type"
                                                 transition="slide-x-transition"
                                        >

                                            <v-hover v-model="hover">
                                                <span>{{ auth_corp_info.corp_name }}</span>
                                            </v-hover>
                                        </v-badge>

                                        <span class="text-body-2 text--disabled"> （ {{ auth_corp_info.subject_type }}）</span>
                                    </div>
                                </v-list-item>
                                <v-list-item class="d-flex">
                                    <div class="txt-left">行业类型</div>
                                    <div class="txt-right">{{ auth_corp_info.corp_sub_industry }}</div>
                                </v-list-item>
                                <div v-if="auth_corp">
                                    <v-list-item class="d-flex">
                                        <div class="txt-left">授权管理员</div>
                                        <div class="txt-right">{{ auth_user_info.name }}</div>
                                    </v-list-item>
                                    <v-list-item class="d-flex">
                                        <div class="txt-left">授权时间</div>
                                        <div class="txt-right">{{ auth_corp.ctime }}</div>
                                    </v-list-item>
                                </div>
                            </v-list>
                        </v-card-text>
                    </v-card>
                </v-tab-item>

                <!--应用基础信息-->
                <v-tab-item>
                    <v-card class="min-ht-5" outlined>
                        <v-card-text>
                            <v-list dense>
                                <v-list-item class="d-flex align-stretch">
                                    <img class="logo-zd" :src="corp_config_Log">
                                    <div class="ml-5">
                                        <v-badge class="text-h6" v-if="auth_status==1"
                                                 inline
                                                 color="green"
                                                 content="使用中"
                                        >{{corp_config.name}}
                                        </v-badge>
                                        <v-badge v-else-if="auth_status==2"
                                                 inline
                                                 color="primary"
                                                 content="代开发中"
                                        >{{corp_config.name}}
                                        </v-badge>
                                        <v-badge v-else-if="auth_status==0"
                                                 inline
                                                 color="error"
                                                 content="已取消授权"
                                        >{{corp_config.name}}
                                        </v-badge>
                                        <span v-else>{{corp_config.name}}</span>
                                        <v-btn class="primary float-right"
                                               small
                                               @click="editData"
                                        >编辑
                                        </v-btn>
                                        <div class="text--secondary px-1">{{corp_config.intro}}</div>
                                    </div>
                                </v-list-item>
                                <v-divider class="ma-4"></v-divider>
                                <!--开发配置信息-->
                                <v-list-item class="d-flex">
                                    <div class="txt-left">应用主页</div>
                                    <div class="txt-right flex-grow-1">
                                        {{corp_config.app_home_page}}

                                        <v-tooltip bottom>
                                            <template v-slot:activator="{ on, attrs }">
                                                <v-btn @click="GetListActivedAccount"
                                                       small
                                                       class="primary float-right"
                                                       v-bind="attrs"
                                                       v-on="on"
                                                >更新应用设定</v-btn>
                                            </template>
                                            <ul>
                                                <li>获取企业的帐号列表（查询本企业下的平台能力服务帐号列表，即供应商可提供相关接口许可服务的账号）</li>
                                                <li>获取配置了客户联系功能的成员列表</li>
                                                <li>更新企业标签</li>
                                            </ul>
                                        </v-tooltip>
                                        <v-tooltip bottom>
                                            <template v-slot:activator="{ on, attrs }">
                                                <v-btn @click="InitQywxData"
                                                       small
                                                       class="success float-right mx-2"
                                                       v-bind="attrs"
                                                       v-on="on"
                                                >应用数据初始化</v-btn>
                                            </template>
                                            <ul>
                                                <li>根据授权拉取客群数据</li>
                                                <li>获取一月内的【群聊】、【客户联系】统计数据</li>
                                            </ul>
                                        </v-tooltip>
                                    </div>
                                </v-list-item>
                                <v-list-item class="d-flex">
                                    <div class="txt-left">代开发应用回调URL</div>
                                    <div class="txt-right">{{corp_config.callback_url}}</div>
                                </v-list-item>
                                <v-list-item class="d-flex">
                                    <div class="txt-left">Token</div>
                                    <div class="txt-right ">
                                        {{corp_config.corp_token}}
                                        <!--                                        <v-icon>mdi-content-copy</v-icon>-->
                                    </div>
                                </v-list-item>
                                <v-list-item class="d-flex">
                                    <div class="txt-left">EncodingAESKey</div>
                                    <div class="txt-right">{{corp_config.encoding_aes_key}}</div>
                                </v-list-item>
                                <v-list-item class="d-flex">
                                    <div class="txt-left">设置通讯录同步接收事件服务器</div>
                                    <div class="txt-right"> URL、Token、EncodingAESKey 请使用本页面对应参
                                        <div class="text--disabled">如何设置：企微后台->管理工具->通讯录同步助手->设置接收事件服务器</div>
                                    </div>
                                </v-list-item>
                                <v-list-item class="blue lighten-5">
                                    <v-list-item-subtitle>
                                        <v-icon>mdi-alert-circle-outline</v-icon>
                                        【应用LOGO】【应用名称】【应用简介】修改后，请联系您的专属客服，以便能把修改的信息及时更新到企业微信代开应用
                                    </v-list-item-subtitle>
                                </v-list-item>
                            </v-list>
                        </v-card-text>
                    </v-card>
                </v-tab-item>

                <!--客户回调配置-->
                <v-tab-item>
                    <v-card class="min-ht-5" outlined>
                        <v-card-text>
                            <v-list dense>
                                <v-list-item class="d-flex">
                                    <div class="txt-left">Token</div>
                                    <div class="txt-right flex-grow-1 d-flex justify-space-between align-center">
                                        <span>{{corp_config.customer_corp_token}}</span>
                                        <v-btn class="primary"
                                               small
                                               @click="editCustomerSet"
                                        >设置接收事件服务器
                                        </v-btn>
                                    </div>
                                </v-list-item>
                                <v-list-item class="d-flex">
                                    <div class="txt-left">EncodingAESKey</div>
                                    <div class="txt-right flex-grow-1 d-flex justify-space-between align-center">
                                        <span>{{corp_config.customer_encoding_aes_key}}</span>
                                    </div>
                                </v-list-item>
                                <v-list-item class="d-flex">
                                    <div class="txt-left">服务器URL地址</div>
                                    <div class="txt-right flex-grow-1 d-flex justify-space-between align-center">
                                        <span>{{corp_config.customer_callback_url}}</span>
                                    </div>
                                </v-list-item>
                            </v-list>
                        </v-card-text>
                    </v-card>
                </v-tab-item>
            </v-tabs>
        </v-card>
    </div>
</template>

<script>
    import qywxapi from '../../api/qyweixinapi'
    import {getStorage, setStorage} from '../../assets/js/comm'
    import QRCode from 'qrcode'

    export default {
        name: "AuthApp",
        data() {
            return {
                dialog: false,
                dialog_edit: false,
                dialog_edit_customer: false,
                is_install_qwdapp: false,
                absolute: false,
                overlay: false,
                qrcode_value: '',
                auth_corp_info: {corpid: ''},
                auth_info_agent: null,
                auth_user_info: null,
                auth_corp: null,
                auth_status: 0,
                hover: false,
                corp_config: null,
                corp_config_Log: '',
                valid: true,
                appnameRules: [
                    v => (v.length >= 2 && v.length <= 10) || '请输入2-10个字',
                ],
                appintroRules: [
                    v => (v.length >= 4 && v.length <= 120) || '请输入4-120个字',
                ],
                apptokenRules: [
                    v => !!v || '请输入内容'
                ],
                appEncodingAESKeyRules: [
                    v => !!v || '请输入内容'
                ],

            }
        },
        //created mounted
        mounted() {
            this.getAuthInfo();
        },
        methods: {
            parseAuthCorpInfo(authCorpInfo) {
                authCorpInfo.corp_type = authCorpInfo.corp_type == 'verified'
                    ? '认证号' : (authCorpInfo.corp_type == 'unverified'
                        ? '注册号' : authCorpInfo.corp_type);
                switch (authCorpInfo.subject_type) {
                    case 1:
                        authCorpInfo.subject_type = '企业';
                        break;
                    case 2:
                        authCorpInfo.subject_type = '政府以及事业单位';
                        break;
                    case 3:
                        authCorpInfo.subject_type = '其他组织';
                        break;
                    case 4:
                        authCorpInfo.subject_type = '团队号';
                        break;
                    default:
                        break;
                }
                return authCorpInfo;
            },
            parseAuthInfoAgent(AuthInfoAgent) {
                switch (AuthInfoAgent.privilege.level) {
                    case 0:
                        AuthInfoAgent.privilege.level = '基础权限';
                        break;
                    case 1:
                        AuthInfoAgent.privilege.level = '通讯录基本信息只读';
                        break;
                    case 2:
                        AuthInfoAgent.privilege.level = '通讯录全部信息只读';
                        break;
                    case 3:
                        AuthInfoAgent.privilege.level = '通讯录全部信息读写';
                        break;
                    case 4:
                        AuthInfoAgent.privilege.level = '单个基本信息只读';
                        break;
                    case 5:
                        AuthInfoAgent.privilege.level = '通讯录全部信息只写';
                        break;
                }
                return AuthInfoAgent;
            },
            installApp: function () {
                this.loading = true;
                this.dialog = true;
                this.getQrcodeVaue()

            },
            getQrcodeVaue: function () {
                this.overlay = true;
                qywxapi.getListAPI('adminqywx', {'act': 'getAuthCodeUrl'})
                    .then(res => {
                        this.qrcode_value = res;
                        this.canvasQrCode();
                    }).catch(err => {
                    console.log(err);
                    this.overlay = false;
                })
            },
            canvasQrCode: function () {
                let instice = this;
                let canvasEl = document.getElementById('canvasQr');
                let errorEl = document.getElementById('canvasErr');

                QRCode.toCanvas(
                    canvasEl,
                    instice.qrcode_value,
                    function (error, canvas) {
                        console.log(canvas);
                        if (error) {
                            canvasEl.classList.remove('d-inline-block');
                            errorEl.classList.remove('d-none');
                            canvasEl.classList.add('d-none');
                            errorEl.classList.add('d-flex');
                        }
                        instice.overlay = false;
                    })
            },
            // getNewAuth: function () {
            //     qywxapi.postFormAPI(
            //         'adminqywx',
            //         {
            //             act: 'get_auth_info',
            //             corpid: getStorage('corpid')
            //         }).then(res => {
            //             console.log(res)
            //         })
            // },
            getAuthInfo() {
                this.dialog = false;
                qywxapi.postFormAPI('adminapi', {act: 'auth_corp_info'})
                    .then(res => {
                        if (res == null) {
                            return false;
                        }
                        console.log(res)
                        let instace = this;
                        let resData = res.auth_corp;
                        instace.auth_corp_info = instace.parseAuthCorpInfo(resData.auth_corp_info);
                        instace.auth_info_agent = instace.parseAuthInfoAgent(resData.auth_info.agent[0]);
                        instace.auth_user_info = resData.auth_user_info;
                        delete resData.auth_corp_info;
                        delete resData.auth_info;
                        delete resData.auth_user_info;
                        instace.auth_corp = resData;
                        instace.corp_config = res.config;
                        instace.corp_config.name = instace.auth_info_agent.name;
                        instace.auth_status = res.auth_corp.status;
                        if (res.config.logo) {
                            instace.corp_config_Log = res.config.logo;
                        }

                        if (!getStorage('corpid') && instace.auth_status == 1) {
                            setStorage('corpid', res.auth_corp_info.corpid);
                        }
                    })
            },
            editData() {
                this.dialog_edit = true;
            },
            editCustomerSet() {
                this.dialog_edit_customer = true;
            },
            validate() {
                this.$refs.form.validate();
                this.corp_config.act = 'save_cfg_token_aeskey';
                this.corp_config.corpid = getStorage('corpid');
                qywxapi.postFormAPI('adminapi', this.corp_config)
                    .then(res => {
                        this.dialog_edit = false;
                        console.log(res)
                    })
                // return true;
            },
            validateCustomer() {
                this.$refs.form.validate();
                qywxapi.postFormAPI(
                    'adminapi',
                    {
                        act: 'save_token_aeskey_bycustomer',
                        corpid: getStorage('corpid'),
                        customer_url: this.corp_config.customer_callback_url,
                        customer_token: this.corp_config.customer_corp_token,
                        customer_encoding_aes_key: this.corp_config.customer_encoding_aes_key
                    }
                ).then(res => {
                    this.dialog_edit_customer = false;
                    console.log(res)
                })
            },
            //更新服务商许可账号、配置了客户联系功能成员
            GetListActivedAccount(){
                qywxapi.postFormAPI('adminqywx',
                    {
                        act: 'list_actived_account',
                        corpid:getStorage('corpid'),
                    })
                    .then(res => {
                        console.log(res);
                    })
            },
            InitQywxData(){
                qywxapi.postFormAPI('adminqywx',
                    {
                        act: 'init_qywx',
                        allow_party:this.auth_info_agent.privilege.allow_party.toString(),
                        allow_user:this.auth_info_agent.privilege.allow_user.toString(),
                        corpid:getStorage('corpid'),
                    })
                    .then(res => {
                        console.log(res)

                    })
            }
        },
    }

</script>
<style scoped>
    #posent-qr-code {
        height: 464px;
        width: 496px;
        background-color: white;
    }

    #canvasQr, #canvasErr {
        width: 300px;
        height: 300px;
        border: 1px solid RGB(226, 226, 226);
    }

    .txt-left {
        min-width: 80px;
        color: #787878;
        font-size: 14px;
        padding-right: 20px
    }

    .txt-left:after {
        content: '：';
        /*margin-right: 1rem*/
    }

    .min-ht-5 {
        min-height: 200px
    }

    .logo {
        border: 1px solid #e4e6e9;
        box-sizing: border-box;
        height: 60px;
        padding: .3rem
    }

    .logo-zd {
        border: 1px solid #e4e6e9;
        box-sizing: border-box;
        height: 80px;
        width: 80px;
        padding: .3rem;
        border-radius: 3px;
    }
</style>