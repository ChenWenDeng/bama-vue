module.exports = {
    chainWebpack: config => {
        config.plugin("define").tap(args => {
            args[0]["process.env"] = JSON.stringify(process.env);
            return args;
        });
    },
};