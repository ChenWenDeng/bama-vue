module.exports = {
    lintOnSave: false,
    assetsDir: 'static',
    publicPath: './',
    devServer: {
        // 设置代理
        proxy: {
            "api/": {
                target: "https://klzz.hualinginfo.com/",
                ws: true,
                changOrigin: true,
                pathRequiresRewrite: {
                    "^api/": "api/"
                }
            }
        }
    },
    chainWebpack: config => {
        config.plugin("define").tap(args => {
            args[0]["process.env"] = JSON.stringify(process.env);
            return args;
        });
    },
};

