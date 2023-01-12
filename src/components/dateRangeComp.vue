<!--时间段选择组件-->
<template>
    <div class="d-flex align-center">
        <v-menu v-model="menu_begin"
                :close-on-content-click="false"
                :nudge-right="40"
                transition="scale-transition"
                offset-y
                min-width="auto"
        >
            <template v-slot:activator="{ on, attrs }">
                <v-text-field
                        v-model="date_begin"
                        label="起始日期"
                        append-icon="mdi-calendar-month-outline"
                        v-bind="attrs"
                        v-on="on"
                        :dense="options.dense"
                ></v-text-field>
            </template>
            <v-date-picker
                    v-model="date_begin"
                    @input="menu_begin = false"
                    @change="changBegin"
                    :allowed-dates="allowDateBegin"
                    no-title
                    locale="zh-cn"
                    :day-format="(date)=>date.split('-')[2]"
            ></v-date-picker>
        </v-menu>

        <span class="mx-2 text--disabled">至</span>

        <v-menu v-model="menu_end"
                :close-on-content-click="false"
                :nudge-right="40"
                transition="scale-transition"
                offset-y
                min-width="auto"
        >
            <template v-slot:activator="{ on, attrs }">
                <v-text-field
                        v-model="date_end"
                        label="截至日期"
                        append-icon="mdi-calendar-month-outline"
                        readonly
                        v-bind="attrs"
                        v-on="on"
                        :dense="options.dense"
                ></v-text-field>
            </template>
            <v-date-picker
                    v-model="date_end"
                    @input="menu_end = false"
                    @change="changBegin"
                    :allowed-dates="allowDateEnd"
                    no-title
                    locale="zh-cn"
                    :day-format="(date)=>date.split('-')[2]"
            ></v-date-picker>
        </v-menu>
    </div>
</template>

<script>
    export default {
        name: "dateRangeComp",
        props:['options'],
        data: () => ({
            date_begin: '',
            date_end: '',
            menu_begin: false,
            menu_end: false,
        }),
        methods: {
            allowDateBegin(val){
                if(this.date_end){
                    let cur = new Date(val).getTime();
                    let end = new Date(this.date_end).getTime();
                    return  cur<end
                }
                return true;
            },
            allowDateEnd(val){
                if(this.date_begin){
                    let cur = new Date(this.date_begin).getTime();
                    let end = new Date(val).getTime();
                    return  cur<end
                }
                return true;
            },
            changBegin(){
                if(this.date_begin && this.date_end){
                    this.$emit('handleChange', { begin:this.date_begin,end:this.date_end })
                }
            },
            //父组件调用获取起始，结束时间
            getBeginEnd(){
                return { begin:this.date_begin,end:this.date_end }
            }
        },
    }
</script>

<style scoped>
   .top-0{
        padding-top:0!important;
        margin-top: 0!important;
    }
</style>
