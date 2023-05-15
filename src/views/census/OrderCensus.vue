<template>
<div class="goos">
    <el-form :inline="true">
        <el-form-item label="时间范围">
            <el-date-picker v-model="value1" type="daterange" range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期">
            </el-date-picker>
        </el-form-item>
        <el-button type="primary">查询</el-button>
    </el-form>
    <div id="chart-container" ></div>
</div>
</template>

<script>
import * as echarts from "echarts";

export default {
    data() {
        return {
            value1:""
        }
    },
    methods: {
        init() {
            var dom = document.getElementById("chart-container");
            var myChart = echarts.init(dom, null, {
                renderer: "canvas",
                useDirtyRect: false,
            });
            var app = {};

            var option;

            const colors = ["#5470C6", "#91CC75", "#EE6666"];
            option = {
                color: colors,
                tooltip: {
                    trigger: "axis",
                    axisPointer: {
                        type: "cross",
                    },
                },
                grid: {
                    right: "20%",
                },
                toolbox: {
                    feature: {
                        dataView: {
                            show: true,
                            readOnly: false
                        },
                        restore: {
                            show: true
                        },
                        saveAsImage: {
                            show: true
                        },
                    },
                },
                legend: {
                    data: ["上周金额", "本周金额", "浏览量"],
                },
                xAxis: [{
                    type: "category",
                    axisTick: {
                        alignWithLabel: true,
                    },
                    // prettier-ignore
                    data: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
                }, ],
                yAxis: [{
                        type: "value",
                        name: "上周金额",
                        position: "right",
                        alignTicks: true,
                        axisLine: {
                            show: true,
                            lineStyle: {
                                color: colors[0],
                            },
                        },
                        axisLabel: {
                            formatter: "{value}",
                        },
                    },
                    {
                        type: "value",
                        name: "本周金额",
                        position: "right",
                        alignTicks: true,
                        offset: 80,
                        axisLine: {
                            show: true,
                            lineStyle: {
                                color: colors[1],
                            },
                        },
                        axisLabel: {
                            formatter: "{value}",
                        },
                    },
                    {
                        type: "value",
                        name: "增长率",
                        position: "left",
                        alignTicks: true,
                        axisLine: {
                            show: true,
                            lineStyle: {
                                color: colors[2],
                            },
                        },
                        axisLabel: {
                            formatter: "{value}",
                        },
                    },
                ],
                series: [{
                        name: "上周金额",
                        type: "bar",
                        data: [
                            2.0, 4.9, 7.0, 135.6, 162.2, 32.6, 20.0, 6.4,, 23.2, 25.6, 76.7,
                            3.3,
                        ],
                    },
                    {
                        name: "本周金额",
                        type: "bar",
                        yAxisIndex: 1,
                        data: [
                            2.6, 5.9,175.6, 182.2, 9.0, 26.4, 28.7, 70.7,  48.7, 18.8, 6.0,
                            2.3,
                        ],
                    },
                    {
                        name: "浏览量",
                        type: "line",
                        yAxisIndex: 2,
                        data: [
                            2.0, 2.2, 3.3, 4.5, 6.3, 5.2, 20.3, 23.4, 23.0, 10.5, 12.0, 6.2,
                        ],
                    },
                ],
            };

            if (option && typeof option === "object") {
                myChart.setOption(option);
            }
            window.addEventListener("resize", myChart.resize);
        },
    },
    mounted() {
        this.init();
    },
};
</script>

<style lang="less" scoped>
.goos {
    width: 98%;
#chart-container{
  width: 95%; height: 550px;
  background: #fff;
  margin: 0 auto;
}
    .el-form {
        margin: 20px;
    }
}
</style>
