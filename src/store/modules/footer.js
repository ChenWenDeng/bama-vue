const state = {
    tabers: [
        {name: 'index', title: '首页', icon: 'wap-home', path: '/index'},
        {name: 'news', title: '更多资讯', icon: 'newspaper-o', path: '/news'},
        {name: 'home', title: '答题', icon: 'orders-o', path: ''},
        {name: 'login', title: '个人中心', icon: 'contact', path: '/login'}
    ],
    active: 0,
    loginComponent: {name: 'login', title: '个人中心', icon: 'contact', path: '/login'},
    userComponent: {name: 'user', title: '个人中心', icon: 'contact', path: '/user'},
};

const setter = {};

const getters = {
    tabers: function (state) {
        return state.tabers;
    },
    active: function (state) {
        return state.active;
    }
};

const mutations = {
    taberUpdate(state, newTabers) {
        state.tabers = newTabers;
        return true;
    },
    userCheck(state, auth) {
        if (typeof auth == 'undefined') {
            return false;
        }

        if (auth) {
            state.tabers[3] = state.userComponent;
        } else {
            state.tabers[3] = state.loginComponent;
        }

        return true;
    }
};

const actions = {
    userCheck: ({commit}, auth) => {
        if (auth !== true && auth !== false) {

            commit('user/checkAuth', function (auth) {
                commit('userCheck', auth);
            }, { root: true });

        } else {

            commit('userCheck', auth);
        }
    }
};

export default {
    namespaced: true,//用于在全局引用此文件里的方法时标识这一个的文件名
    state,
    setter,
    getters,
    mutations,
    actions,
}