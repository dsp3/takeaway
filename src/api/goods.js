import request from '../utils/request'
// 商品列表
export const goodsList_api = (shuju) => request.post("/goods/list", shuju)
//商品分类
export const goodsType_api = (shuju) => request.get("/goods/goodstype", shuju)
//商品删除
export const goodsDel_api = (shuju) => request.post("/goods/del", shuju)
// 模糊查询
export const goodsLike_api = (shuju) => request.post("/goods/like", shuju)
//商品添加
export const goodsadd_api = (shuju) => request.post("/goods/add", shuju)
//商品分类表查询
export const catelist_api = (shuju) => request.get("/goods/catelist", shuju)
//分类表修改
export const edittype_api = (shuju) => request.post("/goods/edittype", shuju)
// 商品图片的上传
export const gphoto_api = (shuju) => request.post("/goods/gphoto", shuju)
// 商品修改
export const edit_api = (shuju) => request.post("/goods/edit", shuju)
// 商品类型删除
export const deltype_api = (shuju) => request.post("/goods/deltype", shuju)






