import request from '../utils/request'
//用户登录
export const login_api = (shuju) => request.post("/users/dl", shuju)
//用户列表显示
export const userList_api = (shuju) => request.get("/users/list", shuju)
//用户删除
export const userDel_api = (shuju) => request.post("/users/userdel", shuju)
//  批量删除
export const batchdel_api = (shuju) => request.get("/users/batchdel", shuju)

//用户添加
export const userAdd_api = (shuju) => request.post("/users/useradd", shuju)
//修改头像
export const usertou_api = (shuju) => request.get("/users/avataredit", shuju)
// 个人中心
export const personal_api = (shuju) => request.get("/users/personal", shuju)
// 修改用户组和用户名
export const edit_api = (shuju) => request.post("/users/edit", shuju)
// 修改密码
export const editpwd_api = (shuju) => request.post("/users/editpwd", shuju)
//查看旧密码
export const checkopwd_api = (shuju) => request.get("/users/checkopwd", shuju)
