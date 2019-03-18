import storge from '../../utils/storge'

const state = {
    tabers: [
        {name: 'index', title: '首页', icon: 'wap-home', path: '/index'},
        {name: 'news', title: '更多资讯', icon: 'newspaper-o', path: '/news'},
        {name: 'home', title: '答题', icon: 'orders-o', path: ''}
    ],
    active: 0,
    loginComponent: {name: 'login', title: '个人中心', icon: 'contact', path: '/login'},
    userComponent: {name: 'user', title: '个人中心', icon: 'contact', path: '/user'},
};

const setter = {};

const getters = {
    tabers: function (state) {
        return mutations.getTabers(state);
    },
    active: function (state) {
        return state.active;
    }
};

const mutations = {
    getTabers(state){
        let auth = storge.get('token');

        auth ? state.tabers[3] = state.userComponent: state.tabers[3] = state.loginComponent;

        return state.tabers;
    }
};

const actions = {

};

export default {
    namespaced: true,//用于在全局引用此文件里的方法时标识这一个的文件名
    state,
    setter,
    getters,
    mutations,
    actions,
}