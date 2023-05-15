<template>
  <div class="details">
    <div class="small" v-for="(ele, index) in ist" :key="index">
      <i :class="ele.icon" :style="{ color: ele.color }"></i>
      <div>
        <p>{{ ele.title }}</p>
        <p>{{ ele.data }}</p>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  props: ["dat"],
  data() {
    return {
      ist: [
        {
          icon: "iconfont icon-yiwanchengdingdan",
          title: "总订单",
          color: "#1296db",
          data: 0,
        },
        {
          icon: "iconfont icon-jinbi",
          title: "总销售额",
          color: "#d4287c",
          data: 0,
        },
        {
          icon: "iconfont icon-dingdan",
          title: "今日订单数",
          color: "#1296db",
          data: 0,
        },
        {
          icon: "iconfont icon-qian4",
          title: "今日销售额",
          color: "#1afa29",
          data: 0,
        },
      ],
    };
  },
  watch: {
    dat: {
      deep: true,
      immediate: true,
      handler(n) {
        for (let ele of n) {
        //   let a=Number(ele.a)/10
        //   let time=setInterval(()=>{
        //      this.ist[0].data =parseInt(this.ist[0].data+a);
        //     if(this.ist[0].data>=4167){
        //     clearInterval(time)
        //     this.ist[0].data=4167
        //   }
        //   },500)
         
          this.ist[0].data += ele.a;//4167
          this.ist[1].data += ele.b;
          this.ist[2].data += ele.c;
          this.ist[3].data += ele.d;
        }
      },
    },
  },
  // mounted() {
  //   let a=ele.a/200
  //         let b=ele.b/200
  //         let c=ele.c/200
  //         let d=ele.d/200
   
  // },
};
</script>

<style lang="less" scoped>
.details {
  display: flex;
  .small {
    flex: 1;
    height: 100px;
    margin: 20px;
    display: flex;
    align-items: center;
    background: #fff;
    justify-content: space-around;
    user-select: none;
    cursor: pointer;
    .iconfont {
      font-size: 80px;
    }
    div {
      height: 100%;
      display: flex;
      flex-direction: column;
      justify-content: space-evenly;
      p {
        &:nth-child(1) {
          color: #aaa;
          font-size: 20px;
        }
        &:nth-child(2) {
          font-size: 16px;
        }
      }
    }
  }
}
</style>