<template>
    <v-card>
        <v-list>
            <v-list-item>
                <v-list-item-subtitle>联系客服开启企业微信消息推送后，可推送消息给企微指定员工、企微部门、标签（成员），三者不可同时为空</v-list-item-subtitle>
            </v-list-item>
            <v-list-item>
                <v-list-item-title>消息组一</v-list-item-title>
                <v-list-item-subtitle>
                    成员1，成员2，部门3，标签1
                </v-list-item-subtitle>
            </v-list-item>
            <h3>列如：</h3>
            <v-list-item>
                <v-list-item-title>下单消息</v-list-item-title>
                <v-list-item-subtitle>成品库张三，审单部门，财务标签</v-list-item-subtitle>
            </v-list-item>
            <v-list-item>
                <v-list-item-title>回款</v-list-item-title>
                <v-list-item-subtitle>成品库张三，审单部门，财务标签</v-list-item-subtitle>
            </v-list-item>
        </v-list>
    </v-card>
</template>

<script>
    export default {
        name: "towechatMessage"
    }
</script>

<style scoped>

</style>