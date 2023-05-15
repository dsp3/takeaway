module.exports = {
    devServer: {
        // 默认值 为localhost 127.0.0.1
        // 端口默认为8080
        // host: "localhost",
        // port: "8080",
        // 默认有的
        proxy: {
            "/api": { // 配置你要让那些路径要跨域
                // 你可以让该路径前面添加api
                // login
                // 是后台路径
                target: "http://localhost:3000", // 38

                // true 代表跨域
                changOrigin: true,
                pathRewrite: { //忽略api ,将api变成空格
                    "^/api": ""
                }
            }
        }
    }
}
