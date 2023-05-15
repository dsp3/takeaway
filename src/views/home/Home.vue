<template>
  <div id="head">
    <Details :dat="sales"></Details>
    <echart :data="sales"></echart>
  </div>
</template>

<script>
import { homeEcharts_api } from "@/api/census";
import echart from "@/components/echarts/home";
import Details from "./list.vue";
export default {
  components: {
    Details,
    echart,
  },
  data() {
    return {
      sales: [],
    };
  },
  async created() {
    const { data } = await homeEcharts_api();
    this.sales = data;
  },
};
</script>

<style lang="less" scoped>
#head{
  width: 100%;
}
#chart-container {
  background: #fff;
  margin: 10px auto 0;
  padding: 20px;
}
</style>