<template>
<div class="goods">
    <el-form :inline="true">
        <el-form-item label="时间范围">
            <el-date-picker v-model="value1" type="daterange" range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期">
            </el-date-picker>
        </el-form-item>
        <el-button type="primary">查询</el-button>
    </el-form>
    <echart :data="sales"></echart>
</div>
</template>

<script>
import { goods_api } from "@/api/census";

import echart from "@/components/echarts/goods";
export default {
    data() {
        return {
            value1: "",
            sales: [],
        }
    },
    components: {
        echart,
    },
    async created() {
        const {data} = await goods_api();
        this.sales = data;
    },
};
</script>

<style lang="less" scoped>
#chart-container {
    position: relative;
    height: 100vh;
    overflow: hidden;
    width: 95%;
    height: 500px;
    margin: 0 auto;
    background: #fff
}

.goods {
    width: 98%;
    .el-form {
        margin: 20px;
    }
}
</style>
