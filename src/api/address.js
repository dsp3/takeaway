//第一步: 我们封装的request.js
import request from "../utils/request";
//简写
// 查询地址列表
export const addressList_api = (data) => request.get("/address/list", data)
// 添加地址
export const addAddress_api = (data) => request.post("/address/add", data)
// 删除地址
export const addressDel_api = (data) => request.get("/address/del", data)
// 修改地址
export const addressEdit_api = (data) => request.post("/address/edit", data)
