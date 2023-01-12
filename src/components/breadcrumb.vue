<!--面包屑控件-->
<template>
    <div class="d-flex flex-column" style="height: 100%">
        <div class="d-flex">
<!--            <div class="align-self-center" @click.stop="$store.state.drawer= !$store.state.drawer">-->
<!--                <div class="align-self-center" @click.stop="$store.state.drawer= !$store.state.drawer">-->
<!--                <v-icon v-if="$store.state.drawer==true" size="16" color="rgb(193, 193, 193)">mdi-arrow-collapse-left</v-icon>-->
<!--                <v-icon v-else size="16" color="rgb(193, 193, 193)">mdi-arrow-collapse-right</v-icon>-->
<!--            </div>-->
            <v-breadcrumbs :items="crumbs"></v-breadcrumbs>
        </div>

        <router-view class="flex-grow-1"></router-view>
    </div>

</template>
<script>
    import {home,navFirstMenu,navJson} from '../assets/js/navigationJson'
    export default {
        name: "breadcrumb",
        data: () => ({
            crumbs: [],
        }),
        mounted() {
            this.setbreadCrumb();
        },
        watch:{
            $route(){
                this.setbreadCrumb();
            }
        },
        methods: {
            setbreadCrumb: function () {
                if(this.$route.matched.length<=0){
                    return false;
                }
                this.crumbs= [
                    {
                        text: home.txt,
                        disabled:false,
                        href: home.path
                    }
                ];
                if(this.$route.matched.length==1){
                    this.crumbs.push(
                        {
                            text: navFirstMenu[this.$route.matched[0].name].txt,
                            disabled:true,
                            href: ''
                        }
                    )
                }else if(this.$route.matched.length==2){
                    this.crumbs.push(
                        {
                            text: navFirstMenu[this.$route.matched[0].name].txt,
                            disabled:false,
                            href: this.$route.matched[0].path,
                        }
                    )
                    this.crumbs.push(
                        {
                            text: navJson[this.$route.matched[0].name][this.$route.matched[1].name].txt,
                            disabled:true,
                            href: '',
                        }
                    )
                }
            },
        },
    }
</script>

<style scoped>
    .v-application ul{padding-left:.6rem}
</style>