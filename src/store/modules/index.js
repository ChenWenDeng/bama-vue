import {recommendReq} from '../../api/article.js'
import {req_get} from '../../utils/request'

const state = {
    init: false,
    reload: false,
    carousel: [],
    circleRecommend: {
        loading: false,
        finished: false,
        error: false,
        data: []
    },
    newsRecommend: {
        loading: false,
        finished: false,
        error: false,
        data: []
    },
    categoryList: [{
        "id": 7,
        "slide_id": 2,
        "status": 1,
        "list_order": 10000,
        "title": "更多资讯",
        "image": "https://klzz.hualinginfo.com/upload/admin/20190219/2d2c549970637afa7151dd10ae4764f4.png",
        "url": "#",
        "target": "",
        "description": "更多资讯",
        "content": "news",
        "more": null
    }, {
        "id": 8,
        "slide_id": 2,
        "status": 1,
        "list_order": 10000,
        "title": "答题抢红包",
        "image": "https://klzz.hualinginfo.com/upload/admin/20190219/78861dc6260f5896f7d2987f0c9ce5d6.png",
        "url": "#",
        "target": "",
        "description": "答题抢红包",
        "content": "答题抢红包",
        "more": null
    }, {
        "id": 9,
        "slide_id": 2,
        "status": 1,
        "list_order": 10000,
        "title": "老年社区",
        "image": "https://klzz.hualinginfo.com/upload/admin/20190219/f4d52f907673b9be7979405f20c84ed7.png",
        "url": "#",
        "target": "",
        "description": "老年社区",
        "content": "communities",
        "more": null
    }, {
        "id": 10,
        "slide_id": 2,
        "status": 1,
        "list_order": 10000,
        "title": "健康卫士",
        "image": "https://klzz.hualinginfo.com/upload/admin/20190219/28f0d1a40e359ba63499f6af483f9c54.png",
        "url": "#",
        "target": "",
        "description": "健康卫士",
        "content": "健康卫士",
        "more": null
    }],

};

const setter = {
};

const getters = {
    carousel: function (state) {
        return state.carousel;
    },
    circleRecommend: function (state) {
        return state.circleRecommend.data;
    },
    circleRecommendError: function (state) {
        return state.circleRecommend.error;
    },
    newsRecommend: function (state) {
        return state.newsRecommend.data;
    },
    newsRecommendLoading: function (state) {
        return state.newsRecommend.loading;
    },
    newsRecommendFinished: function (state) {
        return state.newsRecommend.finished;
    },
    newsRecommendError: function (state) {
        return state.newsRecommend.error;
    },
    categoryList: function (state) {
        return state.categoryList;
    },
};

const mutations = {
    init(){
        if (!state.init) {
            state.init = !state.init;

            mutations.loadCarousel(state);
            mutations.loadCircleRecommend(state);
        }

    },
    loadCarousel(state){
        let url = 'api/home/slides/1?status=1';

        req_get(url, null, function (res) {
            if (res.data.length > 0) {
                state.carousel = res.data[0].items;
            }
        });

    },
    loadCircleRecommend(state) {
        if (!state.circleRecommend.finished) {
            setTimeout(() => {
                let data = {
                    parent_id: 1,
                    limit: 1
                };

                recommendReq(data, function (res) {
                    let data = res.data;
                    if (data.length > 0) {
                        state.circleRecommend.data = state.circleRecommend.data.concat(data);
                    } else {
                        state.circleRecommend.finished = true;
                    }

                    state.circleRecommend.loading = false;
                });
            },500)
        }
    },
    loadNewsRecommend(state) {
        if (!state.newsRecommend.finished) {
            setTimeout(() => {
                let pageRow = 20;
                let count = state.newsRecommend.data.length;

                let data = {
                    parent_id: 2,
                    limit: count + ',' + pageRow
                };
                recommendReq(data, function (res) {
                    let data = res.data;
                    if (data.length > 0) {
                        state.newsRecommend.data = state.newsRecommend.data.concat(data);
                    } else {
                        state.newsRecommend.finished = true;
                    }

                    state.newsRecommend.loading = false;
                });
            }, 500)
        }
    },
};
const actions = {
    init({ commit }) {
        commit('init')
    },
    loadCircleRecommend({ commit }){
        commit('loadCircleRecommend')
    },
    loadNewsRecommend({ commit }){
        commit('loadNewsRecommend')
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