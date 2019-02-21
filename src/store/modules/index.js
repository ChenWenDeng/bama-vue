import {config} from '../config.js';

const state = {
    carousel: [
        'https://img.yzcdn.cn/public_files/2017/09/05/3bd347e44233a868c99cf0fe560232be.jpg',
        'https://klzz.hualinginfo.com/upload/admin/20190131/bc8a078c96e648391058faa132b7e627.png',
        'https://klzz.hualinginfo.com/upload/admin/20190131/421de037010e30c9e81a628428896743.png'
    ],
    circleRecommend: [],
    newsRecommend: [],
    categoryList: [{
        "id": 7,
        "slide_id": 2,
        "status": 1,
        "list_order": 10000,
        "title": "更多资讯",
        "image": "https:\/\/klzz.hualinginfo.com\/upload\/admin\/20190219\/2d2c549970637afa7151dd10ae4764f4.png",
        "url": "#",
        "target": "",
        "description": "更多资讯",
        "content": "更多资讯",
        "more": null
    }, {
        "id": 8,
        "slide_id": 2,
        "status": 1,
        "list_order": 10000,
        "title": "答题抢红包",
        "image": "https:\/\/klzz.hualinginfo.com\/upload\/admin\/20190219\/78861dc6260f5896f7d2987f0c9ce5d6.png",
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
        "title": "话题回顾",
        "image": "https:\/\/klzz.hualinginfo.com\/upload\/admin\/20190219\/f4d52f907673b9be7979405f20c84ed7.png",
        "url": "#",
        "target": "",
        "description": "话题回顾",
        "content": "话题回顾",
        "more": null
    }, {
        "id": 10,
        "slide_id": 2,
        "status": 1,
        "list_order": 10000,
        "title": "我的钱包",
        "image": "https:\/\/klzz.hualinginfo.com\/upload\/admin\/20190219\/28f0d1a40e359ba63499f6af483f9c54.png",
        "url": "#",
        "target": "",
        "description": "我的钱包",
        "content": "我的钱包",
        "more": null
    }],

};

const getters = {
    carousel: function (state) {
        return state.carousel;
    },
    circleRecommend: function (state) {
        return state.circleRecommend;
    },
    newsRecommend: function (state) {
        return state.newsRecommend;
    },
    categoryList: function (state) {
        return state.categoryList;
    }
};

const mutations = {
    loadCircleRecommend: function (state) {
        let url = config.HOST_URL + 'api/portal/articles/recommend?parent_id=1&limit=1';

        // let data = {
        //     parent_id: 1,
        //     limit: 1
        // };
        //
        // let method = 'GET';

        // let options = {
        //     body: JSON.stringify(data), // must match 'Content-Type' header
        //     cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
        //     credentials: 'same-origin', // include, same-origin, *omit
        //     headers: {
        //         'user-agent': 'Mozilla/4.0 MDN Example',
        //         'content-type': 'application/json'
        //     },
        //     method: method, // *GET, POST, PUT, DELETE, etc.
        //     mode: 'cors', // no-cors, cors, *same-origin
        //     redirect: 'follow', // manual, *follow, error
        //     referrer: 'no-referrer', // *client, no-referrer
        // };

        fetch(url).then(response => response.json()).then(json => {
            state.circleRecommend = state.circleRecommend.concat(json.data);
        });
    },
    loadNewsRecommend: function (state) {
        let page = 1;
        let url = config.HOST_URL + 'api/portal/articles/recommend?parent_id=2&page=' + page;
        // let data = {
        //     parent_id: 1,
        //     limit: 1
        // };
        //
        // let method = 'GET';

        // let options = {
        //     body: JSON.stringify(data), // must match 'Content-Type' header
        //     cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
        //     credentials: 'same-origin', // include, same-origin, *omit
        //     headers: {
        //         'user-agent': 'Mozilla/4.0 MDN Example',
        //         'content-type': 'application/json'
        //     },
        //     method: method, // *GET, POST, PUT, DELETE, etc.
        //     mode: 'cors', // no-cors, cors, *same-origin
        //     redirect: 'follow', // manual, *follow, error
        //     referrer: 'no-referrer', // *client, no-referrer
        // };

        fetch(url).then(response => response.json()).then(json => {
            state.newsRecommend = state.newsRecommend.concat(json.data);
        });
    },
};
const actions = {};

export default {
    namespaced: true,//用于在全局引用此文件里的方法时标识这一个的文件名
    state,
    getters,
    mutations,
    actions,
}