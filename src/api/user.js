import {req_get, req_post,req_post_no_auth} from "../utils/request";

function wxLoginReq(data, callback){
    let api_url = 'api/wxserver/public/login';

    req_get(api_url, data, callback);
}

function collectionReq(data, callback) {
    let api_url = 'api/user/favorites/my';

    req_get(api_url, data, callback);
}

function updateUserInfoReq(data, callback) {
    let api_url = 'api/user/profile/userInfo';

    req_post(api_url, data, callback);
}

//新增获取验证码
function getCode(data,callback){
    let api_url = 'api/user/verification_code/send';
    req_get(api_url, data, callback);
}
 
//新增登录
function newLogin(data,callback){
    let api_url = 'api/user/public/login';
    req_post_no_auth(api_url, data, callback);
}

export {
    wxLoginReq,
    collectionReq,
    updateUserInfoReq,
    getCode,
    newLogin
}