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
        }
    },
    read(state, id) {
        let url = process.env.BASE_URL + 'api/portal/articles/read?id=' + id + '&relation=user,categories';

        fetch(url).then(response => response.json()).then(json => {
            if (json.data) {
                state.article = json.data;

                return true;
            } else {
                return false;
            }
        });
    },
    loadComment(state, id) {
        if (!state.commentList.finished) {
            console.log('加载评论', id, state.commentList);

            state.commentList.loading = true;

            setTimeout(() => {
                let pageRow = 20;
                let count = state.commentList.data.length;
                let urlParam = 'object_id=' + id + '&table_name=portal_post&relation=user&limit=' + count + ',' + pageRow;
                let url = process.env.BASE_URL + 'api/user/comments?' + urlParam;

                fetch(url).then(response => response.json()).then(json => {
                    if (json.data != '' && json.data[0].length > 0) {
                        state.commentList.data = state.commentList.data.concat(json.data[0]);
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