const state = {
    tabers: [
        {name: 'home',title: '首页', icon: 'wap-home', path: '/home'},
        {name: 'news',title: '更多资讯', icon: 'newspaper-o', path: '/news'},
        {name: 'home',title: '答题', icon: 'orders-o', path: ''},
        {name: 'user',title: '个人中心', icon: 'contact', path: '/user'}
    ],
    active: 0
};

const setter = {

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
    setter,
    getters,
    mutations,
    actions,
}