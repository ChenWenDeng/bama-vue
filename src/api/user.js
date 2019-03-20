import {req_get, req_post} from "../utils/request";

function wxLoginReq(data, callback){
    let api_url = 'api/wxserver/public/login';

    req_get(api_url, data, callback);
}

function collectionReq(data, callback) {
    let api_url = 'api/user/favorites/my';

    req_get(api_url, data, callback);
}

export {
    wxLoginReq,
    collectionReq
}