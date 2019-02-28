import {searchReq} from "../../api/article.js";
const state = {
    keyword: '',
    searchResult: [],
};

const setter = {

};

const getters = {
    articleList(state){
        return state.searchResult;
    }
};

const mutations = {
    search: function (state) {
        searchReq(state.keyword, function (res) {
            if (res.length > 0){
                for (let key in res){
                    res[key].thumbnail = res[key].more.thumbnail
                }
            }

            state.searchResult = res;
        })
    }
};

const actions = {
    search({ commit }) {
        commit('search')
    },
};

export default {
    namespaced: true,//用于在全局引用此文件里的方法时标识这一个的文件名
    state,
    setter,
    getters,
    mutations,
    actions,
}