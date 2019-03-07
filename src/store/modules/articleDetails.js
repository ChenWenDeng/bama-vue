import {commentReq} from '../../api/comment.js'
import {readReq} from '../../api/article.js'

const state = {
    article: {},
    commentList: {
        loading: false,
        finished: false,
        error: false,
        data: []
    }
};

const setter = {
    article: function (newValue) {
        state.article = newValue;
    }
};

const getters = {
    article: function (state) {
        return state.article;
    },
    commentList: function (state) {
        return state.commentList;
    }
};

const mutations = {
    init(state) {
        state.article = {};
        state.commentList = {
            loading: false,
            finished: false,
            error: false,
            data: []
        };
    },
    read(state, id) {
        readReq(id, function (res) {
            if (res) {
                state.article = res;
            }
        });
    },
    loadComment(state, id) {
        if (!state.commentList.finished) {
            // //console.log('加载评论', id, state.commentList);

            state.commentList.loading = true;

            setTimeout(() => {
                let start = state.commentList.data.length;

                commentReq(id, start, function (res) {
                    if (res != '' && res[0].length > 0) {
                        state.commentList.data = state.commentList.data.concat(res[0]);
                    } else {
                        state.commentList.finished = true;
                    }
                    state.commentList.loading = false;
                });

            }, 500);
        }
    }
};

const actions = {
    read({commit}) {
        commit('read')
    },
    loadComment({commit}) {
        commit('loadComment')
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