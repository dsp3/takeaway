import axios from "axios";
import qs from "qs";
// import storage from "@/utils/storage";

// 全封装

const newAxios = axios.create({
  baseURL: process.env.VUE_APP_BASE_API,
  timeout: 10000000,
  // headers:请求头
});
// 添加请求拦截器
newAxios.interceptors.request.use(
  function (config) {
    // 在发送请求之前做些什么
    // let token = storage.get("sell_token")
    // if (token) {
    //     config.headers.Authorization = token
    // }
    return config;
  },
  function (error) {
    // 对请求错误做些什么
    return Promise.reject(error);
  }
);
// 添加响应拦截器
newAxios.interceptors.response.use(
  function (response) {
    // 对响应数据做点什么
    return response.data; //将返回的数据过滤留下我们需要的data
  },
  function (error) {
    // 对响应错误做点什么
    return Promise.reject(error);
  }
);
// 全封装
// 路径 方法 需要传输的数据
function request(url, method = "get", shuju = {}) {
  return newAxios({
    url,
    method,
    data: method == "post" ? qs.stringify(shuju) : "",
    params: method == "get" ? shuju : "",
  });
}
function post(url, shuju) {
  return request(url, "post", shuju);
}
function get(url, shuju) {
  return request(url, "get", shuju);
}
export default {
  post,
  get,
};
