import { req_get } from '../utils/request';

function readReq(id, callback) {
    let api_url = 'api/portal/articles/read';

    let data = {
        id: id,
        relation: 'user,categories'
    };

    req_get(api_url, data, callback);
}

function articleListReq(data, callback) {
    let api_url = 'api/portal/articles/category';

    if (data) {
        req_get(api_url, data, callback);
    } else {
        return false;
    }
}

function searchReq(keyword, callback) {
    let api_url = 'api/portal/search';

    if (!keyword) return false;

    let data = {
        keyword,
        post_status: 1
    };

    req_get(api_url, data, callback);
}

function recommendReq(data, callback){
    let api_url = 'api/portal/articles/recommend';

    if (data) {
        req_get(api_url, data, callback);
    } else {
        return false;
    }
}

export {
    readReq,
    articleListReq,
    searchReq,
    recommendReq
}