const state = {
    tabers: [
        {name: '首页', icon: 'wap-home', path: '/home'},
        {name: '更多资讯', icon: 'newspaper-o', path: '/news'},
        {name: '答题', icon: 'orders-o', path: ''},
        {name: '个人中心', icon: 'contact', path: '/user'}
    ],
    active: 0
};

const getters = {
    tabers: function (state) {
        return state.tabers;
    },
    active: function (state) {
        return state.active;
    }
};

const mutations = {};

const actions = {};

export default {
    namespaced: true,//用于在全局引用此文件里的方法时标识这一个的文件名
    state,
    getters,
    mutations,
    actions,
}