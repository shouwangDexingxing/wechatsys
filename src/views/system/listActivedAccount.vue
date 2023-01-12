<template>
    <v-card>
        <v-tabs background-color="grey lighten-3">
            <v-tab class="justify-start">
                配置了客户联系功能的成员列表
            </v-tab>
            <v-tab  class="justify-start">
                企业标签
            </v-tab>
            <v-tab-item>
                <div class="flex-grow-1"><br>
                    <v-data-table
                            :headers="headers_follow_user"
                            locale="zh-cn"
                            :items="this.$store.state.user.follow_list"
                    >
                    </v-data-table>
                </div>
            </v-tab-item>
            <v-tab-item>
                <v-card class="flex-grow-1"
                        v-if="this.$store.state.customer.tag_list">
                    <v-card-text class="card-text"
                            v-for="item_tag in this.$store.state.customer.tag_list"
                            :key="item_tag.group_id"
                    >
                        <h2 class="text-h6"> {{item_tag.group_name}} </h2>
                        <v-chip-group
                                column
                                multiple
                        >
                            <v-chip
                                    outlined
                                    :key="key_"
                                    v-for="(value,key_) in item_tag.tag"
                            >
                                {{ value.name }}
                            </v-chip>
                        </v-chip-group>
                    </v-card-text>
                </v-card>
            </v-tab-item>
        </v-tabs>
    </v-card>
</template>

<script>

    export default {
        name: "listActivedAccount",
        data(){
            return {
                timeFollowUser: [],
                headers_acc: [
                    {
                        text: '已激活服务许可成员',
                        align: 'start',
                        filterable: false,
                        value: 'name',
                    },
                    { text: '所在部门', value: 'departname' },
                    { text: '账号类型', value: 'type' },
                    { text: '激活时间', value: 'active_time' },
                    { text: '过期时间', value: 'expire_time' },
                ],
                headers_follow_user: [
                    {
                        text: '姓名',
                        align: 'start',
                        filterable: false,
                        value: 'name',
                    },
                    { text: '所在部门', value: 'departname' },
                    { text: '状态', value: 'status' },
                ],
                headers_tag_group:[
                    { text: '所在部门', value: 'departname' },
                ],
            }
        },
        methods:{

        }
    }
</script>

<style scoped>
.card-text{
    border-bottom: 1px solid rgba(0, 0, 0, 0.12);
}
</style>