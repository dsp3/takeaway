import request from '../utils/request'
// 店铺管理
export const info_api = (shuju) => request.get("/shop/info", shuju)
// 店铺照片
export const sphoto_api = (shuju) => request.post("/shop/sphoto", shuju)
// 店铺修改
export const supd_api = (shuju) => request.post("/shop/supd", shuju)