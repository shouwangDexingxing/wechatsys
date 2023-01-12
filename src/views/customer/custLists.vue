<template>
    <div class="d-flex flex-column">
        <v-card outlined class="pa-2">
            <v-card-actions>
                <v-tooltip bottom>
                    <template v-slot:activator="{ on, attrs }">
                        <v-icon class="mx-2"
                                :color="timeCuster && timeCuster+7200>(Math.trunc(new Date().getTime()/1000))
                                ? '' : 'primary'"
                                @click="wechatCuster"
                                v-bind="attrs"
                                v-on="on">mdi-account-arrow-down
                        </v-icon>
                    </template>
                    <span>同步客户{{ timeCuster ? '（由于企业微信开放平台的限制，四小时内不得重复同步操作）' : '' }}</span>
                </v-tooltip>

                <span size="32" class="text-body-2 text--disabled">
                                    客户最近同步时间：{{ timeCuster }}
                                </span>
                <v-spacer></v-spacer>
                <v-tooltip left>
                    <template v-slot:activator="{ on, attrs }">
                        <v-btn icon
                               v-bind="attrs"
                               v-on="on"
                               @click="show = !show"
                        >
                            <v-icon>{{ show ? 'mdi-chevron-up' : 'mdi-chevron-down' }}</v-icon>
                        </v-btn>
                    </template>
                    <span>{{ show ? '收起' : '展开筛选项' }}</span>
                </v-tooltip>
            </v-card-actions>
            <v-expand-transition>
                <v-form v-show="show" ref="form">
                    <v-container fluid id="containerForm">
                        <v-row>
                            <v-col class="py-0" cols="12"
                                   md="4"
                                   xl="3"

                            >
                                <v-text-field
                                        label="客户姓名"
                                        v-model="search.data.name"
                                ></v-text-field>
                            </v-col>
                            <v-col class="py-0" cols="12"
                                   md="4"
                                   xl="3"
                            >
                                <v-select v-model="search.data.utype"
                                          :items="search.prop.user_type"
                                          label="客户类型"
                                ></v-select>
                            </v-col>
                            <v-col class="py-0" cols="12"
                                   md="4"
                                   xl="3"
                            >
                                <v-select v-model="search.data.userid"
                                          :items="search.prop.follow_userid"
                                          label="跟进员工"
                                >
                                </v-select>
                            </v-col>
                            <v-col class="d-flex align-center py-0" cols="12"
                                    md="4"
                                    xl="3"
                            >
                                <v-combobox class="pr-2"
                                            label="客户标签"
                                            :value="search.prop.tag_list"
                                            multiple
                                            chips
                                            dense
                                ></v-combobox>
                                <v-btn @click="dialogTag=true" small>选择标签</v-btn>
                                <!--tag对话框-->
                                <v-dialog
                                        v-model="dialogTag"
                                        scrollable
                                        min-width="500px"
                                        max-width="50%"
                                        min-height="200px"
                                >
                                    <v-card>
                                        <v-card-title>请选择筛选标签</v-card-title>
                                        <v-divider></v-divider>
                                        <v-card-text>
                                            <chipTag @handleChildData="handleGetTag"
                                                     :tagGroup="$store.state.customer.tag_list"></chipTag>
                                        </v-card-text>
                                    </v-card>
                                </v-dialog>
                            </v-col>

                            <v-col class="py-0" cols="12"
                                   md="4"
                                   xl="3"
                            >
                                <v-select v-model="search.data.status"
                                          :items="search.prop.status"
                                          label="跟进状态"
                                ></v-select>
                            </v-col>
                            <v-col class="py-0" cols="12"
                                   md="4"
                                   xl="3"
                            >
                                <v-select v-model="search.data.add_way"
                                          :items="$store.state.customer.add_way"
                                          label="添加方式"
                                ></v-select>
                            </v-col>
                            <v-col class="py-0" cols="12"
                                   md="4"
                                   xl="3"
                            >
                                <dateRangeComp ref="childDate"   :options="{dense:''}"></dateRangeComp>
                            </v-col>
                            <v-col class="align-self-center py-0" cols="12"
                                   md="4"
                                   xl="3"
                            >
                                <v-btn color="primary"
                                       class="mr-4"
                                       @click="setFormData"
                                >查询
                                </v-btn>
                                <v-btn @click="reset" class="mr-10">重置</v-btn>
                            </v-col>
                        </v-row>
                    </v-container>
                </v-form>
            </v-expand-transition>
        </v-card>
        <br>
        <div class="flex-grow-1">
            <v-data-table
                    :headers="headers"
                    :items="desserts"
                    class="elevation-1"
            >
                <template v-slot:item.name="{ item }">
                    <div class="d-flex py-2">

                        <v-avatar
                                class="mr-2"
                                size="48"
                                tile
                        ><img :src="(item.avatar?item.avatar:defaultHeadJpeg)"
                        ></v-avatar>
                        <div class="flex-shrink-0">
                            {{ item.external_contact.name }}<br>
                            <v-icon dense color="orange" v-if="item.gender==2">mdi-account-tie-woman</v-icon>
                            <v-icon dense color="primary" v-else-if="item.gender==1">mdi-account-tie</v-icon>
                            <v-icon dense v-else>mdi-account</v-icon>

                            <v-btn v-if="item.type==1"
                                   text
                                   small
                                   class="pa-0"
                                   color="success">@{{ search.prop.user_type[1]['text']
                                }}
                            </v-btn>
                            <v-btn v-else-if="item.type==2"
                                   text
                                   small
                                   class="pa-0"
                                   color="orange">@{{
                                search.prop.user_type[0]['text'] }}
                            </v-btn>
                            <v-btn v-else
                                   text
                                   small
                                   class="pa-0">@{{ search.prop.user_type[2]['text'] }}
                            </v-btn>
                        </div>
                    </div>
                </template>
                <template v-slot:item.userid="{ item }">
                    {{ Object.prototype.hasOwnProperty.call($store.state.user.key_u_list ,item.follow_info.userid)
                    ? $store.state.user.key_u_list[item.follow_info.userid]['name']
                    : '-' }}
                </template>
                <template v-slot:item.tag_id="{ item }">
                    <div v-if="item.tag_id">
                        <v-chip-group
                                column
                        >
                            <v-chip small
                                    outlined
                                    :key="key_"
                                    v-for="(value,key_) in item.tag_id.split(',')"
                            >
                                {{ $store.state.customer.key_tag_List[value] }}
                            </v-chip>
                        </v-chip-group>
                    </div>
                </template>
                <template v-slot:item.createtime="{ item }">
                    {{ item.createtime }}
                </template>
            </v-data-table>
        </div>
    </div>

</template>

<script>
    import dateRangeComp from '../../components/dateRangeComp'
    import chipTag from '../../components/chipTag'
    import qywxapi from "../../api/qyweixinapi"
    import {getStorage, getTime} from "../../assets/js/comm";

    export default {
        name: "custLists",
        data() {
            return {
                show: true,
                timeCuster: '',
                dialogTag: false,
                defaultHeadJpeg: require('../../assets/images/default_head.jpeg'),
                search: {
                    prop: {
                        user_type: [
                            {text: '企业微信', value: 2},
                            {text: '微信', value: 1},
                        ],
                        follow_userid: [],
                        tag_list: [],
                        status: ['跟进中', '已流失'],
                    },
                    data: {
                        name: '',
                        utype: '',
                        tag: [],
                        userid: [],
                        status: '',
                        add_way: -1,
                        begin: '',
                        end: ''
                    }
                },
                headers: [
                    {
                        text: '客户',
                        align: 'start',
                        filterable: false,
                        value: 'name',
                    },
                    {text: '标签', value: 'tag_id'},
                    {text: '跟进员工', value: 'userid'},
                    {text: '添加方式', value: 'add_way'},
                    {text: '添加时间', value: 'createtime'},
                    // { text: '操作', value: 'iron' },
                ],
                desserts: [],
            }
        },
        components: {
            dateRangeComp,
            chipTag
        },
        mounted() {
            this.timeCuster = getTime(this.$store.state.corp_cfg.get_time);
            this.setFormData();
        },
        methods: {
            //筛选企微客户
            setFormData() {
                let begin_end = this.$refs.childDate.getBeginEnd();
                this.search.data.begin = begin_end.begin;
                this.search.data.end = begin_end.end;

                qywxapi.postFormAPI('admcontact',
                    {
                        act: 'get_contact_list',
                        corpid: getStorage('corpid'),
                        param: JSON.stringify(this.search.data)
                    }).then(res => {
                    this.desserts = res;
                })
            },
            reset() {
                this.$refs.form.reset()
            },
            //向企微拉取客户到后台
            wechatCuster() {
                let nowTime = Math.trunc(new Date().getTime() / 1000);
                if (this.timeCuster && this.timeCuster + 10 > nowTime) {
                    return false;
                }


                qywxapi.postFormAPI('adminqywx',
                    {
                        act: 'externalcontact_list',
                        corpid: getStorage('corpid'),
                    })
                    .then(res => {
                        console.log(res)
                    })
            },
            //选择标签时间
            handleGetTag(checkTag) {
                let tagList = [];
                let tagId = [];
                for (let id in checkTag) {
                    tagList.push({text: checkTag[id], value: id});
                    tagId.push(id);
                }
                this.search.prop.tag_list = tagList;
                this.search.data.tag = tagId;
                console.log(this.search.data)
            }
        }
    }
</script>