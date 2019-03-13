import {req_get} from "../utils/request";

function loginReq(data, callback){
    let api_url = 'api/wxserver/public/login';

    req_get(api_url, data, callback);
}

export default {
    loginReq
}