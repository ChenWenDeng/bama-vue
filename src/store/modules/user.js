import {loginReq} from "../../api/user";

const state = {
    token: null,
    userInfo: {},

    menu: [
        {
            id: 0,
            title: '我的收藏',
            icon: "like-o"
        },
        {
            id: 1,
            title: '消息中心',
            icon: "comment-o"
        },
        {
            id: 2,
            title: '意见反馈',
            icon: "envelop-o"
        },
        {
            id: 3,
            title: '修改手机',
            icon: "phone-o",
            value: '133000000'
        }
    ]
};

const setter = {};

const getters = {
    token: (state) => {
        return state.token;
    },
    userInfo: (state) => {
        return state.userInfo;
    },
    menu: (state) =>{
        return state.menu;
    },
    auth: (state) => {
        return !(!state.token || state.userInfo.length === 0);
    }
};

const mutations = {
    //登录
    login: (state, callback) => {
        loginReq('', (res) => {
            if (res.code == 1) {
                state.token = res.data.token;
                state.userInfo = res.data.user;
            }

            let result = {code: res.code, msg: res.msg};

            typeof callback === 'function' && callback(result);
        });
    },
    //登录判断
    checkAuth: (state, callback) => {
        if (typeof callback === 'function') {
            callback(state.auth);
        } else {
            return state.auth;
        }
    }
};

const actions = {
    login: function ({commit, dispatch}, callback) {
        commit('login', (res) => {
            callback(res);

            //登录后taber菜单修改
            dispatch('footer/userCheck', '', {root: true});
        });
    },
    checkAuth: function ({commit}, callback) {
        commit('checkAuth', callback);
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