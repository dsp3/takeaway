<template>
  <el-card class="box-card">
    <div slot="header" class="clearfix">
      <span><slot name="title"></slot></span>
    </div>
    <div class="text item">
      <slot name="content"></slot>
    </div>
  </el-card>
</template>

<script>
export default {};
</script>

<style lang="less" scoped>
.el-card{
margin-top: 20px;
}
/deep/ .el-card__body, .el-main{
  padding:0  !important;
}
</style>