<template>
    <div>
        <v-item-group multiple
                      v-for="(item, i) in  tagGroup"
                      :key="i"
        >
            <v-subheader>{{ item.group_name }}</v-subheader>
            <v-chip-group
                    column
                    multiple
            >
                <v-chip
                        @input="toParentData(value)"
                        filter
                        outlined
                        :key="key_"
                        v-for="(value,key_) in item.tag"
                >
                    {{ value.name }}
                </v-chip>
            </v-chip-group>
        <v-divider></v-divider>
        </v-item-group>
    </div>
</template>

<script>
    export default {
        name: "chipTag",
        data: () => ({
            tag_out_list: [],
        }),
        props:['tagGroup','checkTag'],      //tagGroup所有tag组列表，checkTag选中的tag列表
        methods:{
            //父组件调用函数
            toParentData(val){
                if(
                    Object.prototype.hasOwnProperty.call(val, 'ischeck')
                    && val.ischeck
                ){
                    val.ischeck=false;
                   delete this.tag_out_list[val.id];
                }else {
                    val.ischeck=true;
                    this.tag_out_list[val.id]=val.name;
                }
                this.$emit('handleChildData',this.tag_out_list)
            }
        }
    }
</script>

<style scoped>

</style>