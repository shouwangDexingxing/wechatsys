<template>
    <div class="chart-container pa-3 d-flex justify-center align-center">暂无数据</div>

</template>

<script>
    import * as echarts from 'echarts';

    export default {
        name: "EchartLine",
        data() {
            return {
                myChart: null
            }
        },
        props: {
            chartData: {
                type: Object,
                default: null
            }
        },
        watch: {
            chartData: {
                handler(newValue) {
                    this.chartViews(newValue)
                },
                // deep: true,
            }
        },
        methods: {
            chartViews(echartOption) {
                echartOption.xAxis = {type: 'category'}
                echartOption.yAxis = {}
                echartOption.legend = {}
                echartOption.tooltip = {
                    trigger: 'axis',
                    axisPointer: {
                        type: 'cross'
                    }
                };
                echartOption.toolbox = {
                    show: true,
                    feature: {
                        dataView: { show: true, readOnly: false },
                        magicType: { show: true, type: ['line', 'bar'] },
                        restore: { show: true },
                        saveAsImage: { show: true }
                    }
                }


                this.myChart = echarts.init(
                    this.$el, null, {locale :'ZH'}
                );
                this.myChart.setOption(echartOption);
                window.onresize = this.myChart.resize;
            }
        }
    }


</script>

<style scoped>
    .chart-container {
        height: auto;
        max-height: 700px;
        min-height: 400px;
        width: 100%;
    }
</style>