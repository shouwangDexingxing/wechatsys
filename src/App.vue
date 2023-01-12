<template>
    <v-app id="inspire" class="grey lighten-3 pa-b-1">
        <!--top-->
        <v-app-bar dense
                   color="primary"
                   dark
                   app
        >
            <v-container class="py-0 fill-height">

                <v-img contain src="./assets/LOGO_TEXT_LIGHT.png"
                       max-height="44"
                       max-width="180"
                ></v-img>
                <v-tabs style="width:auto!important;"
                        align-with-title
                        show-arrows
                        dark
                        background-color="primary"
                        exact
                >
                    <v-tab v-for="firstMenu in  navMenu"
                           :key="firstMenu.id"
                           :to="firstMenu.path"
                    >{{ firstMenu.txt }}
                    </v-tab>
                </v-tabs>
                <v-spacer></v-spacer>
                <v-avatar size="32">
                    <v-icon dark>
                        mdi-account-circle
                    </v-icon>
                </v-avatar>

            </v-container>
        </v-app-bar>
        <!--nav-->

        <v-main class="grey lighten-4">
            <v-container>
                <v-row>
                    <v-col class="d-flex">
                        <navBar class="flex-shrink-0"></navBar>
                        <div style="width:1rem" class="flex-shrink-0">&nbsp;</div>
                        <div class="flex-grow-1 overflow-y-auto" style="max-height:calc(100vh - 72px)">
                            <router-view></router-view>
                        </div>

                    </v-col>
                </v-row>


            </v-container>
        </v-main>

        <v-overlay :value="$store.state.overlay">
            <v-progress-circular
                    indeterminate
                    size="64"
            ></v-progress-circular>
        </v-overlay>
        <!--msg提示消息-->
        <v-snackbar
                right
                :color="$store.state.snackbarcolor"
                v-model="$store.state.snackbar"
                :timeout="$store.state.timeout"
        >{{ $store.state.message }}
        </v-snackbar>

    </v-app>
</template>
<script>
    import navBar from "./components/navBar"
    import {navFirstMenu, home} from "./assets/js/navigationJson"
    import qywxapi from "./api/qyweixinapi";
    import {setStorage} from "./assets/js/comm";

    export default {
        data: () => ({
            navMenu: navFirstMenu,
            home: home,
        }),
        components: {
            navBar
        },
        created() {
            //拉取基础配置信息
            this.getBaseCfg();
        },
        methods: {
            reurihost: function () {
                window.location = window.location.origin;
            },
            getBaseCfg() {
                //拉取基础配置信息
                qywxapi.postFormAPI('adminapi',
                    {act: 'get_config'})
                    .then(res => {
                            let userList = {};
                            let key_tag_List = {};
                            let dept_list_id = [];
                            let useCnt = 0;
                            for (let userItem of res.u_userList) {
                                userList[userItem['userid']] = userItem;
                                useCnt++;
                            }
                            // for (let key in res.u_accountList) {
                            //     let userid = res.u_accountList[key]['userid'];
                            //     if (userList[userid]) {
                            //         res.u_accountList[key]['name'] = userList[userid]['name'];
                            //         res.u_accountList[key]['departname'] = userList[userid]['departname'];
                            //     }
                            // }
                            for (let key in res.u_followByUserList) {
                                let userid = res.u_followByUserList[key]['userid'];
                                if (userList[userid]) {
                                    res.u_followByUserList[key]['departname'] = userList[userid]['departname'];
                                    res.u_followByUserList[key]['status'] = userList[userid]['status'];
                                }
                            }
                            for (let val of res.c_tag_group) {
                                for (let tag of val.tag) {
                                    key_tag_List[tag.id] = tag.name
                                }
                            }
                            for (let val of res.u_deptList) {
                                if (val['parentid'] == 0) {
                                    this.$store.state.dept.company = val['id']
                                }
                                dept_list_id.push(val['id']);
                            }

                            setStorage('corpid', res.cfg_corpid);
                            this.$store.state.dept.dept_list = res.u_deptList;
                            this.$store.state.dept.dept_list_id = dept_list_id;

                            this.$store.state.user = {
                                // acc_list: res.u_accountList,
                                follow_list: res.u_followByUserList,
                                key_u_list: userList,
                                useCnt:useCnt,
                            };
                            this.$store.state.corp_cfg = {
                                corpid: res.cfg_corpid,
                                corp_name: res.cfg_corp_name,
                                corp_logo: res.cfg_corp_logo_url,
                                get_time: res.cfg_time_custer,
                            };
                            this.$store.state.customer = {
                                tag_list: res.c_tag_group,
                                key_tag_List: key_tag_List,
                                add_way: res.c_add_way
                            };
                            console.log(this.$store.state)
                        }
                    )
            }
        },
    }

</script>
<style>
    ::-webkit-scrollbar {
        width: 5px;
        height: 5px;
    }

    ::-webkit-scrollbar-thumb {
        border-radius: 5px;
        -webkit-box-shadow: inset 0 0 5px rgb(0 0 0 / 20%);
        background: #eee;
    }

    @media (min-width: 960px) {
        .container {
            max-width: 100%
        }
    }

    @media (min-width: 1264px) {
        .container {
            max-width: 1785px
        }
    }
</style>