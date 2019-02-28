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