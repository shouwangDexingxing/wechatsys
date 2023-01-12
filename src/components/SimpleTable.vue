<template>
    <v-card outlined>
        <v-card-title>
            {{options.caption}}
            <v-spacer></v-spacer>
            <v-text-field
                    v-model="search"
                    append-icon="mdi-magnify"
                    label="搜索"
                    single-line
                    hide-details
            ></v-text-field>
        </v-card-title>
        <v-data-table
                :headers="headers"
                :items="desserts"
                :items-per-page="10"
                :search="search"
                class="elevation-1"
                locale="zh-cn"
        ></v-data-table>
    </v-card>
</template>

<script>
    export default {
        name: "SimpleTable",
        data(){
            return {
                search: ''
            }
        },
        props: ['headers', 'desserts', 'options'],
    }
</script>
<style scoped>

</style>