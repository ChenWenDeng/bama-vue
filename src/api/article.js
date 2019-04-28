import { req_get, req_post } from '../utils/request';

/**
 * 获取文章详情
 * @param id
 * @param callback
 */
function readReq(id, callback) {
    let api_url = 'api/portal/articles/read';

    let data = {
        id: id,
        relation: 'user,categories'
    };

    req_get(api_url, data, callback);
}

/**
 * 获取相关的文章列表
 * @param data
 * @param callback
 * @returns {boolean}
 */
function articleListReq(data, callback) {
    let api_url = 'api/portal/articles/category';

    if (data) {
        req_get(api_url, data, callback);
    } else {
        return false;
    }
}

/**
 * 搜索请求
 * @param keyword
 * @param callback
 * @returns {boolean}
 */
function searchReq(keyword, callback) {
    let api_url = 'api/portal/search';

    if (!keyword) return false;

    let data = {
        keyword,
        post_status: 1
    };

    req_get(api_url, data, callback);
}

/**
 * 获取推荐内容
 * @param data
 * @param callback
 * @returns {boolean}
 */
function recommendReq(data, callback){
    let api_url = 'api/portal/articles/recommend';

    if (data) {
        req_get(api_url, data, callback);
    } else {
        return false;
    }
}

/**
 * 关注请求
 * @param data
 * @param callback
 * @returns {boolean}
 */
function doLikeReq(data, callback) {
    let api_url = 'api/portal/articles/doLike';

    if (data) {
        req_post(api_url, data, callback);
    } else {
        return false;
    }
}

export {
    readReq,
    articleListReq,
    searchReq,
    recommendReq,
    doLikeReq
}