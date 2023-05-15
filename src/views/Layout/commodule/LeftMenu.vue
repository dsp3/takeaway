<template>
  <div class="left">
    <div class="logo">
      <i class="iconfont icon-diancan-2"></i> <span>外卖商家中心</span>
    </div>
    <el-row>
      <el-col :span="12">
        <el-menu
          default-active="computedrouter"
          class="el-menu-vertical-demo"
          background-color="#202f3f"
          text-color="#fff"
          active-text-color="gold"
          router
          unique-opened
        >
          <!--default-active 当前激活菜单的 index -->
          <!-- unique-opened 是否只保持一个子菜单的展开  -->
          <el-menu-item index="/home">
            <i class="iconfont icon-shouye"></i>
            <span slot="title">后台首页</span>
          </el-menu-item>
          <el-menu-item index="/order/list">
            <i class="iconfont icon-dingdanguanli"></i>
            <span slot="title">订单管理</span>
          </el-menu-item>

          <el-submenu index="/goods">
            <template slot="title">
              <i class="iconfont icon-shangpin"></i>
              <span slot="title">商品管理</span>
            </template>
            <el-menu-item-group>
              <el-menu-item index="/goods/list">商品列表</el-menu-item>
              <el-menu-item index="/goods/save">商品添加</el-menu-item>
              <el-menu-item index="/goods/type">商品分类</el-menu-item>
            </el-menu-item-group>
          </el-submenu>
          <el-menu-item index="/shop">
            <i class="iconfont icon-dianpu"></i>
            <span slot="title">店铺管理</span>
          </el-menu-item>

          <el-submenu index="/users">
            <template slot="title">
              <i class="iconfont icon-zhanghao"></i>
              <span slot="title">账号管理</span>
            </template>
            <el-menu-item-group>
              <el-menu-item index="/users/list">账号列表</el-menu-item>
              <el-menu-item index="/users/save">添加账号</el-menu-item>
              <el-menu-item index="/users/userpwd">修改密码</el-menu-item>
              <el-menu-item index="/users/personal">个人中心</el-menu-item>
            </el-menu-item-group>
          </el-submenu>

          <el-submenu index="/census">
            <template slot="title">
              <i class="iconfont icon-chartmixed"></i>
              <span slot="title">销售管理</span>
            </template>
            <el-menu-item-group>
              <el-menu-item index="/census/goos">商品统计</el-menu-item>
              <el-menu-item index="/census/order">订单统计</el-menu-item>
            </el-menu-item-group>
          </el-submenu>
          <el-submenu index="/address">
            <template slot="title">
              <i class="iconfont icon-dizhi"></i>
              <span>地址管理</span>
            </template>
            <el-menu-item index="/address/list">地址列表</el-menu-item>
          </el-submenu>
        </el-menu>
      </el-col>
    </el-row>
  </div>
</template>

<script>
export default {
  computed: {
    computedrouter() {
      return this.$route.path;
    },
  },
};
</script>

<style lang="less" scoped>
.el-menu {
  width: 200px;
  border-right: none;
  height: 100%;
}

.logo {
  width: 100%;
  height: 80px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 20px;
  color: #fff;

  .iconfont {
    color: aqua;
    margin: 10px;
  }
}
.iconfont{
  font-size: 25px;
  margin-right: 10px;
}
</style>
