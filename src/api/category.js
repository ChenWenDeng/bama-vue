import { req_get } from '../utils/request';

function categoryReq(data, callback) {
    let api_url = 'api/portal/categories';

    if (data) {
        req_get(api_url, data, callback);
    }else {
        return false;
    }
}

export {
    categoryReq
}