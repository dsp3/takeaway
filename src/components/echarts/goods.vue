<template>
<div id="main" v-loading="loading"></div>
</template>

  
<script>
import * as echarts from "echarts";
export default {
    props: ["data"],
    data() {
        return {
            myChart: null,
            loading:false
        };
    },
    mounted() {
            this.myChart = echarts.init(document.getElementById("main"));
        let option = {
            tooltip: {
                trigger: "axis",
                axisPointer: {
                    type: "cross",
                    label: {
                        backgroundColor: "#6a7985",
                    },
                },
            },
            legend: {
                data: ["总订单", "总销售额", "今日订单数", "今日销售额"],
            },
            toolbox: {
                feature: {
                    saveAsImage: {},
                },
            },
            grid: {
                left: "3%",
                right: "4%",
                bottom: "3%",
                containLabel: true,
            },
            xAxis: [{
                type: "category",
                boundaryGap: false,
                data: this.data.map((item) => item.week),
            }, ],
            yAxis: [{
                type: "value",
            }, ],
            series: [{
                    name: "总订单",
                    type: "line",
                    stack: "Total",
                    areaStyle: {},
                    emphasis: {
                        focus: "series",
                    },
                    data: this.data.map((item) => item.a),
                },
                {
                    name: "总销售额",
                    type: "line",
                    stack: "Total",
                    areaStyle: {},
                    emphasis: {
                        focus: "series",
                    },
                    data: this.data.map((item) => item.b),
                },
                {
                    name: "今日订单数",
                    type: "line",
                    stack: "Total",
                    areaStyle: {},
                    emphasis: {
                        focus: "series",
                    },
                    data:this.data.map((item) => item.c),
                },
                {
                    name: "今日销售额",
                    type: "line",
                    stack: "Total",
                    areaStyle: {},
                    emphasis: {
                        focus: "series",
                    },
                    data: this.data.map((item) => item.d),
                },
            ],
        };
        this.myChart.setOption(option);
       
    },
    watch: {
        data: {
            handler() {
                this.myChart.setOption({
                    xAxis: {
                        data: this.data.map((item) => item.week),
                    },
                    series: [{
                            data: this.data.map((item) => item.a),
                        },
                        {
                            data: this.data.map((item) => item.b),
                        },
                        {
                            data: this.data.map((item) => item.c),
                        },
                        {
                            data: this.data.map((item) => item.d),
                        },
                    ],
                });
            },
        },
    },
};
</script>

  
<style lang="less" scoped>
#main {
    width: 100%;
    height: 500px;
}
</style>
