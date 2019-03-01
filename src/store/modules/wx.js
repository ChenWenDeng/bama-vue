import wx from 'weixin-js-sdk'

const state = {
    token: null,
    info: {}
};

const setter = {

};

const getters = {
    token: function (state) {
        return state.token;
    }
};

const mutations = {
    init(){
        wx.config({
            debug: true, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
            appId: '', // 必填，公众号的唯一标识
            timestamp: Date.parse(new Date()) / 1000, // 必填，生成签名的时间戳
            nonceStr: parseInt(Math.random() * 10000), // 必填，生成签名的随机串
            signature: '',// 必填，签名
            jsApiList: [] // 必填，需要使用的JS接口列表
        });
    }
};

const actions = {};

export default {
    namespaced: true,//用于在全局引用此文件里的方法时标识这一个的文件名
    state,
    setter,
    getters,
    mutations,
    actions,
}