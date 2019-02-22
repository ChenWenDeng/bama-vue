import {config} from '../config.js';

const state = {
    init: false,
    news: {
        0: []
    },
    category: {
        0: {}
    },
    active: 0
};


const setter = {
    category: function (newValue) {
        for (var i = 0; i < newValue.length; i++) {
            newValue[i].loading = false;
            newValue[i].finished = false;
            newValue[i].error = false;
        }
        state.category = newValue;
    },
    news: function (newValue) {
        if (typeof state.news[state.active] == 'undefined') {
            state.news[state.active] = [];
        }
        state.news[state.active] = state.news[state.active].concat(newValue);
    },
    active: function (newValue) {
        state.active = newValue;
    }
};

const getters = {
    category: function (state) {
       return state.category;
    },
    news: function (state) {
        return state.news;
    },
    active: function (state) {
        return state.active;
    }
};

const mutations = {
    init: function(){
        if (!state.init) {
            state.init = !state.init;

            mutations.loadCategory(state);
            mutations.loadNews(state);
        }

    },
    loadCategory: function () {
        let url = config.HOST_URL + 'api/portal/categories?where[parent_id]=2&order[]=+list_order';

        fetch(url).then(response => response.json()).then(json => {
            if (json.data.length > 0) {
                setter.category(json.data);
            }
        });
    },
    loadNews: function () {
        setTimeout(() => {
            if (!state.category[state.active].finished) {
                state.category[state.active].loading = true;

                let pageRow = 20;
                let count = typeof state.news[state.active] == 'undefined' ? 0 : state.news[state.active].length;
                let urlParam = '?category_id=' + state.category[state.active].id + '&limit=' + count + ',' + pageRow;
                let url = config.HOST_URL + 'api/portal/articles/category' + urlParam;

                fetch(url).then(response => response.json()).then(json => {
                    if (json.data.length > 0) {
                        setter.news(json.data);
                        state.category[state.active].loading = false;
                    } else {
                        state.category[state.active].finished = true;
                    }
                });
            }
        }, 500);
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