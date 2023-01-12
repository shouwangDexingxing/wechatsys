<!--时间段筛选控件-->
<template>
    <div class="d-inline-flex flex-wrap ">
        <v-btn-toggle
                class="mr-2 mb-6"
                color="primary"
                v-model="toggle_exclusive"
                mandatory
        >
            <v-btn small>近一周</v-btn>
            <v-btn small>近一月</v-btn>
            <v-btn small>自定义日期</v-btn>
        </v-btn-toggle >
        <div  class="dateBox mr-2"
              v-if="toggle_exclusive==2">
            <dateRangeComp
                    ref="childDate"
                    :options="{dense:'dense'}">
            </dateRangeComp>
        </div>

        <div v-if="options.dept" style="max-width:600px" class="mr-2">
            <CommboxUserDept ref="childUserParty" ></CommboxUserDept>
        </div>
        <div class="mr-2">
            <v-btn color="primary"
                   class="mr-2"
                   @click="getDataList"
                   small
            >查询</v-btn>
            <v-btn small @click="reSetData">重置</v-btn>
        </div>
    </div>
</template>

<script>
    import dateRangeComp from './dateRangeComp'
    import CommboxUserDept from '../components/CommboxUserDept'
    export default {
        name: "DateSlot",
        props:{
            options:{
                type: Object,
                default: null
            }
        },
        data() {
            return {
                toggle_exclusive: undefined,
                userDeptDialog:false,
                date:{
                    begin:'',
                    end:'',
                },

                items:[],
            }
        },
        components:{
            dateRangeComp,
            CommboxUserDept
        },
        created() {
            //拉取基础配置信息
        },
        methods: {
            getDataList:function () {
                let param = {   time:this.toggle_exclusive, id:this.options.id};
                switch (this.toggle_exclusive) {
                    case 0:
                    case 1:
                        param.begin='';
                        param.end='';
                        break;
                    default:
                        var  timeBeginEnd = this.$refs.childDate.getBeginEnd();
                        param.begin=timeBeginEnd.begin;
                        param.end=timeBeginEnd.end;
                        break;
                }
                if(this.options.dept==true){
                    let childUserParty =  this.$refs.childUserParty.getChieldData();
                    param.partyid = childUserParty.partyid;
                    param.userid = childUserParty.userid;
                }
                this.$emit('handleParam', param);
            },
            reSetData(){
                this.toggle_exclusive=0;
                if(this.options.dept==true){
                    this.$refs.childUserParty.init();
                }
            }
        }
    }
</script>

<style scoped>
.dateBox{
    max-width:350px;
    min-width:260px;
}
</style>