<template>
    <v-btn small
           class="success"
           @click="exportFile">导出</v-btn>
</template>

<script>
    import {getTime} from "../assets/js/comm";
    import {utils, writeFileXLSX} from "xlsx";

    export default {
        name: "XlsxExplode",
        props:{
            parentFnSheet:{
                type: Function,
                default: null
            }
        },
        methods:{
            exportFile(){
                let data = this.parentFnSheet();
                let sheetData = [];
                let sheet0=[];
                let sheetName = data.title ?data.title : getTime(null,5);
                sheetName = sheetName+'.xlsx'

                for(let item of data.header){
                    sheet0.push(item.text);
                }
                sheetData.push(sheet0)
                for(let item of data.sheetData){
                    let sheetRow = [];
                    for (let key in item){
                        sheetRow.push(item[key]);
                    }
                    sheetData.push(sheetRow);
                }

                const ws = utils.aoa_to_sheet(sheetData);
                const wb = utils.book_new();
                utils.book_append_sheet(wb, ws, "Data");
                writeFileXLSX(wb, sheetName);
            }
        }
    }
</script>

<style scoped>

</style>