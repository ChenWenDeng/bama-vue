import {loginReq} from "../../api/user";

const state = {
    token: null,
    userInfo: {}
};

const setter = {};

const getters = {
    token: function (state) {
        return state.token;
    },
    userInfo: function (state) {
        return state.userInfo;
    }
};

const mutations = {
    login: function (state, callback) {
        loginReq('', function (res) {
            if (res.code == 1) {
                state.token = res.data.token;
                state.userInfo = res.data.user;
            }

            let result = {code: res.code, msg: res.msg};

            callback(result);
        });
    },

};

const actions = {
    login: function () {

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