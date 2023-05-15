import request from '../utils/request'

export const homeEcharts_api = (shuju) => request.get("/census/homeEcharts", shuju)
export const order_api = (shuju) => request.get("/census/ordercensus", shuju)
export const goods_api = (shuju) => request.get("/census/goodscensus", shuju)