<template>
    <v-card>
        <v-card-title>实现的应用功能配置信息</v-card-title>
        <v-card-subtitle>企业微信客户聊天右侧边栏实现的单个应用功能</v-card-subtitle>
        <v-list>
            <v-list-item>
                <v-list-item-title>企微客户绑定(单个新增/绑定)</v-list-item-title>
            </v-list-item>
            <v-list-item>
                <v-list-item-title>企微客户导入（批量）</v-list-item-title>
            </v-list-item>
            <v-list-item>
                <v-list-item-title>开单（绑定客户后）</v-list-item-title>
            </v-list-item>
        </v-list>
    </v-card>
</template>

<script>
    export default {
        name: "apiAppChatMenu"
    }
</script>

<style scoped>

</style>