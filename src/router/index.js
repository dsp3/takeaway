import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '../views/Login';
import Layout from '../views/Layout';

Vue.use(VueRouter)

const routes = [
  //配置重定向跳转
  { path: "/", redirect: "/login" },
  //登录
  { path: "/login", component: Login },
  //后台首页
  {
    path: "/home", component: Layout, redirect: "/home/",
    children: [{ path: "/", component: () => import("../views/home/Home.vue") }]
  },
  // 订单
  {
    path: "/order", component: Layout, redirect: "/order/", meta: { title: '订单管理' },
    children:
      [{ path: "list", component: () => import("../views/order/OrderList.vue"), meta: { title: '订单列表' } },]
  },
  // 商品
  {
    path: "/goods", component: Layout, redirect: "/goods/", meta: { title: '商品管理' },
    children: [
      { path: "list", component: () => import("../views/goods/GoodsList.vue"), meta: { title: '商品列表' } },
      { path: "save", component: () => import("../views/goods/GoodsSave.vue"), meta: { title: '添加商品' } },
      { path: "type", component: () => import("../views/goods/GoodsType.vue"), meta: { title: '商品分类' } }]
  },
  // 店铺
  {
    path: "/shop", component: Layout, redirect: "/shop/",
    children: [{ path: "", component: () => import("../views/Shop/ShopIndex.vue"), meta: { title: '店铺管理' } }]
  },
  // 用户管理
  {
    path: "/users", component: Layout, redirect: "/users/", meta: { title: '用户管理' },
    children: [{ path: "list", component: () => import("../views/users/UserList.vue"), meta: { title: '用户列表' } },
    { path: "personal", component: () => import("../views/users/UserPersonal.vue"), meta: { title: '个人中心' } },
    { path: "save", component: () => import("../views/users/UserSave.vue"), meta: { title: '添加用户' } },
    { path: "userpwd", component: () => import("../views/users/UserPwd.vue"), meta: { title: '修改密码' } },]
  },
  //统计
  {
    path: "/census", component: Layout, redirect: "/census/", meta: { title: '统计' },
    children: [{ path: "goos", component: () => import("../views/census/GoodsCensus.vue"), meta: { title: '商品统计' } },
    { path: "order", component: () => import("../views/census/OrderCensus.vue"), meta: { title: '订单统计' } }]
  },
  //地址管理
  {
    path: "/address", name: "address", meta: { title: "地址管理" }, component: Layout, children: [
      { path: "/", redirect: "list" },
      { path: "list", component: () => import("../views/address/list.vue"), meta: { title: "地址列表" } }
    ]
  },
  //头像剪切
  {
    path: "/cropper", name: "cropper", component: Layout, children: [
      { path: "/", redirect: "cropper" },
      { path: "cropper", component: () => import("@/components/cropper/vue-cropper") }
    ]
  },
]

const router = new VueRouter({
  routes
})

export default router
