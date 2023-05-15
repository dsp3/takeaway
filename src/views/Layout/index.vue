<template>
  <div class="layout">
    <left-menu class="left-menu"></left-menu>
    <right-main class="right-main"></right-main>
  </div>
</template>

<script>
import LeftMenu from "./commodule/LeftMenu.vue";
import RightMain from "./commodule/RightMain.vue";
export default {
  components: {
    LeftMenu,
    RightMain,
  },
  mounted () {
    document.webkitExitFullscreen()

  },
};
</script>

<style lang="less" scoped>
.layout {
  display: flex;
  width: 100%;
  height: 100%;
  .left-menu {
    width: 200px;
    background: #304156;
  }
  .right-main {
    background: #f0f2f5;
    display: flex;
align-items: center;
  }
}
</style>