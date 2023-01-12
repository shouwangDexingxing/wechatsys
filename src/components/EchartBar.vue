<template>
    <div class="chart-container pa-3 d-flex justify-center align-center">暂无数据</div>
</template>

<script>
    import * as echarts from 'echarts';
    export default {
        name: "EchartBar",
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
            chartViews(BarOption) {
                BarOption.yAxis = {}
                BarOption.legend = {}
                BarOption.tooltip = {
                    trigger: 'axis'
                };
                BarOption.toolbox = {
                    show: true,
                    feature: {
                        dataView: { show: true, readOnly: false },
                        magicType: { show: true, type: ['line', 'bar'] },
                        restore: { show: true },
                        saveAsImage: { show: true }
                    }
                };

                this.myChart = echarts.init(
                    this.$el, null, {locale :'ZH'}
                );
                this.myChart.setOption(BarOption);
                window.onresize = this.myChart.resize;
            }
        }
    }
</script>

<style scoped>
    .chart-container{
        height: auto;
        max-height: 700px;
        min-height: 400px;
        width: 100%;
    }
</style>