import request from '../utils/request'
// 订单表查询
export const orderList_api = (shuju) => request.post("/order/list", shuju)
//订单单条数据查询
export const singleDatum_api = (shuju) => request.post("/order/singleDatum", shuju)
// 订单修改
export const editlist_api = (shuju) => request.post("/order/editlist", shuju)
// 订单模糊查询
export const cha_api = (shuju) => request.post("/order/cha", shuju)


