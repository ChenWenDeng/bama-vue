import {loginReq} from "../../api/user";
import storge from '../../utils/storge'

const state = {
    token: null,
    userInfo: null,

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
            value: ''
        }
    ]
};

const setter = {};

const getters = {
    token: (state) => {
        return mutations.token(state);
    },
    userInfo: (state) => {
        return mutations.userInfo(state);
    },
    menu: (state) =>{
        let userInfo = mutations.userInfo(state);

        if (userInfo.mobile) {
            state.menu[3].value = userInfo.mobile;
        }

        return state.menu;
    },
    auth: (state) => {
        return !state.token || !state.userInfo;
    }
};

const mutations = {
    //登录
    login: (state, callback) => {
        if (state.token && state.userInfo) {
            let result = {code: 1, msg: '您已经登录，请勿重复登录！'};

            typeof callback === 'function' && callback(result);

            return true;
        }else{
            if (mutations.loadCacheInfo(state)) {
                let result = {code: 1, msg: '登录成功！'};

                typeof callback === 'function' && callback(result);

                return true;
            }else {
                loginReq('', (res) => {
                    if (res.code === 1) {
                        state.token = res.data.token;
                        state.userInfo = res.data.user;

                        mutations.cacheInfo(state, state.token, state.userInfo);
                    }

                    let result = {code: res.code, msg: res.msg};

                    typeof callback === 'function' && callback(result);
                });
            }
        }
    },
    //登录判断
    checkAuth: (state, callback) => {
        if (typeof callback === 'function') {
            callback(state.auth);
        } else {
            return state.auth;
        }
    },
    token: (state) => {
        !state.token && mutations.loadCacheInfo(state);

        return state.token;
    },
    userInfo: (state) =>{
        !state.userInfo && mutations.loadCacheInfo(state);

        return state.userInfo;
    },
    cacheInfo: (state, token, userInfo) =>{
        if (token && userInfo){
            storge.set('token', token);
            storge.set('userInfo', userInfo);

            return true;
        } else {
            return false;
        }
    },
    loadCacheInfo: (state) => {
        if (state.userInfo && state.token) {
            return true;
        }

        let token = storge.get('token');
        let userInfo = JSON.parse(storge.get('userInfo'));

        if (token && userInfo) {
            state.token = token;
            state.userInfo = userInfo;

            return true;
        }else {
            return false;
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