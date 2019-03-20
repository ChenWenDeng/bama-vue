import {collectionReq} from "../../api/user.js";

const state = {
    collection: {
        loading: false,
        finished: false,
        error: false,
        data: []
    }
};

const setter = {};

const getters = {
    collection: function (state) {
        return state.collection.data;
    },
    collectionLoading: function (state) {
        return state.collection.loading;
    },
    collectionFinished: function (state) {
        return state.collection.finished;
    },
    collectionError: function (state) {
        return state.collection.error;
    },
};

const mutations = {
    loadCollection: function (state) {
        if (!state.collection.finished) {
            setTimeout(() => {
                let pageRow = 20;
                let count = state.collection.data.length;

                let limit = count + ',' + pageRow;

                let data = {
                    limit: limit
                };

                collectionReq(data, function (res) {
                    let data = res.data;
                    if (data.length > 0) {
                        state.collection.data = state.collection.data.concat(data);
                    } else {
                        state.collection.finished = true;
                    }

                    state.collection.loading = false;
                });
            },500)
        }
    }
};

const actions = {
    loadCollection({commit}) {
        commit('loadCollection')
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