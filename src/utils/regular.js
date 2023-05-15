
// 我是正则表达式
//用户名正则
export const userNameRule = value => /^[0-9a-zA-Z\u4e00-\u9fa5]{3,6}$/.test(value)

//密码的正则
export const pwdRule = value => /^[0-9a-zA-Z]{3,6}$/.test(value)