const proxy = require("http-proxy-middleware");

module.exports = function(app) {
    app.use(proxy("/v1", {
        target: "https://faucet-api.ethsana.org" , //配置你要请求的服务器地址
        changeOrigin: true,
    }))
};
