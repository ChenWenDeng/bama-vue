import {loginReq} from "../../api/user";

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
    login: function (state) {
        loginReq('', function (res) {
            document.write(res);
            // if (res.length > 0){
            //     for (let key in res){
            //         res[key].thumbnail = res[key].more.thumbnail
            //     }
            // }
            //
            // state.searchResult = res;
        })
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