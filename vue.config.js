// module.exports = {
//     lintOnSave: false,
//     assetsDir: 'static',
//     publicPath: './',
//     devServer: {
//         open: true,
//         host: 'localhost',
//         port: 8080,
//         hotOnly: false,
//         https: false,
//         // 设置代理
//         proxy: {
//             "api/": {
//                 target: "https://klzz.hualinginfo.com/",
//                 ws: true,
//                 changOrigin: true,
//                 pathRequiresRewrite: {
//                     "^api/": "api/"
//                 }
//             },
//             '/health': {
//                 target: 'http://watch.hualinginfo.com',
//                 ws: true, 
//                 changOrigin: true,
//                 pathRewrite: {
//                     '^/health': '/'
//                 }
//             },
//             '/agent': {
//                 target: 'https://klzz.hualinginfo.com',
//                 // target: 'cf.com',
//                 // ws: true, 
//                 changOrigin: true,
//                 pathRewrite: {
//                     '^/agent': ''
//                 }
//             },
//         }
//     },
//     chainWebpack: config => {
//         config.plugin("define").tap(args => {
//             args[0]["process.env"] = JSON.stringify(process.env);
//             return args;
//         });
//     },
// };

const path = require('path');
module.exports = {
    lintOnSave: false,
    assetsDir: 'static',
    publicPath: './',
    configureWebpack: {
        externals: {
          "BMap": "BMap"
        }
      },
    chainWebpack: config => {
        config.plugin("define").tap(args => {
            args[0]["process.env"] = JSON.stringify(process.env);
            return args;
        });
        config.resolve.alias
        .set('@', path.resolve('src'))
        .set('views', path.resolve('src/views'));
    },
    devServer: {
        open: true,
        host: 'localhost',
        port: 8080,
        hotOnly: false,
        https: false,
        proxy: {
            '/health': {
                target: 'http://watch.hualinginfo.com',
                ws: true, 
                changOrigin: true,
                pathRewrite: {
                    '^/health': '/'
                }
            },
            '/agent': {
                target: 'https://klzz.hualinginfo.com',
                // ws: true, 
                changOrigin: true,
                pathRewrite: {
                    '^/agent': ''
                }
            },
            "api/": {
                                target: "https://klzz.hualinginfo.com/",
                                ws: true,
                                changOrigin: true,
                                pathRequiresRewrite: {
                                    "^api/": "api/"
                                }
            },
        }
    },
};