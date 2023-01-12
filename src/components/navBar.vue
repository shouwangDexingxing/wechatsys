<template>
<!--    v-model="$store.state.drawer"-->
    <v-navigation-drawer
            class="flex-grow-0"
            color="white"
            width="200"
            clipped
            style="border-radius: 5px;height:calc(100vh - 72px)"
    >
        <v-list dense style="padding:0!important;">
            <v-list-item-group v-model="selectedItem">
                <v-list-item
                        v-for=" (menu,index) in navlist"
                        @click="routerLink(menu.name)"
                        :key="index"
                ><v-list-item-content >
                        <v-list-item-title>{{ menu.txt}}</v-list-item-title>
                    </v-list-item-content>
                </v-list-item>
            </v-list-item-group>
        </v-list>
    </v-navigation-drawer>
</template>

<script>
    export default {
        name: "navBar",
        data: () => ({
            navlist : [],
            selectedItem:0
        }),
        watch:{
          $route(to){
              this.setNavList(to.matched[to.matched.length-1].name);
          }
        },
        methods: {
            routerLink: function (path) {
                this.$router.push(path);
            },
            setNavList(navName){
                this.navlist = this.$store.state.navList;
                let selectedItem=0;
                for (let key in this.navlist){
                    if(navName==key){
                        break;
                    }
                    selectedItem++;
                }
                this.selectedItem = selectedItem;
            }
        },
    }
</script>

<style scoped>

</style>