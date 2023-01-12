<template>
    <v-card>
        <v-card-text>
            <v-toolbar
                    flat
                    height="72"
            >
                <span>应用可见范围内的企业部门组织架构，成员列表</span>
                <v-spacer></v-spacer>
<!--                <v-btn color="success"-->
<!--                       class="mr-3"-->
<!--                       dark-->
<!--                       @click="getQywxDeptUsers"-->
<!--                >同步</v-btn>-->
                <v-btn color="primary"
                       dark
                       @click="accountDialog"
                >账号绑定到万业云
                </v-btn>
            </v-toolbar>

            <ContactsTree
                    :options="{userid:0}"
            ></ContactsTree>
            <accountBind ref="child"></accountBind>
        </v-card-text>
    </v-card>
</template>

<script>
    import ContactsTree from '../../components/contactsTree.vue';
    import accountBind from '../../components/accountBind.vue';
    // import qywxapi from "../../api/qyweixinapi";
    // import {getStorage} from "../../assets/js/comm";

    export default {
        name: 'Organization',
        components: {
            ContactsTree,
            accountBind
        },
        methods: {
            accountDialog() {
                this.$refs.child.accDialogEvent();
            },
            departidToLoadUser(val) {
                this.departId = val;
            },
            // getQywxDeptUsers() {
            //     qywxapi.postFormAPI('adminqywx', {act: 'dept_list', corpid: getStorage('corpid')})
            //         .then(res => res.data)
            //         .then(json => {
            //             console.log(json)
            //         })
            //         .catch(err => console.warn(err))
            // }
        }
    }
</script>

<style scoped>

</style>