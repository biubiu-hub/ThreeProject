// vue-cli 脚手架的配置文件
module.exports = {
    lintOnSave: false,
    devServer: {
        host: "localhost",//0.0.0.0
        port: 8080,
        open: true,//自动打开浏览器
        inline: true,
        proxy: {//反向代理
            "/yun": {
                target: "http://47.104.209.44:3333/",
                pathRewrite: {
                    "^/yun": ""
                }
            },
            "/vue": {
                target: "http://localhost:3000",
            },
            "/maizuo": {
                target: "https://m.maizuo.com",
                pathRewrite: {
                    "^/maizuo": ""
                }
            },
            "/public": {
                target: "http://localhost:3000",
                pathRewrite: {
                    "^/public": ""
                }
            },

        }
    },
    // publicPath:"",//项目上线打包
    css: {
        loaderOptions: {
            css: {},
            postcss: {
                plugins: [//插件
                    require("postcss-px2rem")({
                        remUnit: 37.5 //自动除以100
                        // remUnit: 100 //网易适配
                    })
                ]
            }
        }
    }
}