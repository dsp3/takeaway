<template>
  <div id="main"></div>
</template>

<script>
import * as echarts from "echarts";
export default {
  props: ["data"],
  data() {
    return {
      myChart: null,
    };
  },
  mounted() {
    this.init()
  },
  methods: {
    init() {
      this.myChart = echarts.init(document.getElementById("main"));
    let option = {
      title: {
        text: "数据统计",
      },
      tooltip: {
        trigger: "axis",
      },
      legend: {
        data: ["总订单", "总销售额", "今日订单数", "今日销售额"],
      },
      grid: {
        left: "3%",
        right: "4%",
        bottom: "3%",
        containLabel: true,
      },
      toolbox: {
        feature: {
          saveAsImage: {},
        },
      },
      xAxis: {
        type: "category",
        boundaryGap: false,
        data: this.data.map((item) => item.week),
      },
      yAxis: {
        type: "value",
      },
      series: [
        {
          name: "总订单",
          type: "line",
          stack: "Total",
          data: this.data.map((item) => item.a),
        },
        {
          name: "总销售额",
          type: "line",
          stack: "Total",
          data: this.data.map((item) => item.b),
        },
        {
          name: "今日订单数",
          type: "line",
          stack: "Total",
          data: this.data.map((item) => item.c),
        },
        {
          name: "今日销售额",
          type: "line",
          stack: "Total",
          data: this.data.map((item) => item.d),
        },
      ],
    };
    this.myChart.setOption(option);
    }
  },
  watch: {
    data: {
      handler() {
        this.myChart.setOption({
          xAxis: {
            data: this.data.map((item) => item.week),
          },
          series: [
            {
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
  background: #fff;
  width: 95%;
  margin: 0 auto;
  height: 500px;
}
</style>