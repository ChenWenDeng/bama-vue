let storage={
    //=============sessionStorage设置缓存=============
    //设置缓存
    sessionSet:function(name,data){
        sessionStorage.removeItem(name);
        sessionStorage.setItem(name,JSON.stringify(data))
    },
    //获取缓存
    sessionGet:function(name){
        return JSON.parse(sessionStorage.getItem(name))
    },
    //清除缓存
    sessionRemove: function (name) {
        sessionStorage.removeItem(name)
    },
    //=============localStorage设置缓存=============
    // 设置缓存
     localSet: function (name, data) {
        localStorage.removeItem(name)
        localStorage.setItem(name, JSON.stringify(data))
    },

    // 设置缓存
    // localSet: function (name, data, days) {
    //     // localStorage.removeItem(name)
    //     // localStorage.setItem(name, JSON.stringify(data))

    //     // localStorage.removeItem(name)
    //     if(data){
    //         var Days = days || 1; // 默认保留7天
    //         var exp = new Date();
    //         localStorage[name] = JSON.stringify({
    //             data,
    //             // expires: exp.getTime() + Days * 24 * 60 * 60 * 1000
    //             expires: exp.getTime() + Days * 3000
    //         })
            
    //     }
    // },

    // 获取缓存
    localGet: function (name) {
        return JSON.parse(localStorage.getItem(name))
    },
    // 清除缓存
    localRemove: function (name) {
        localStorage.removeItem(name)
    }

}
export default storage;