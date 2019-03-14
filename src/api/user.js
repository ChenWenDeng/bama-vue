import {req_get} from "../utils/request";

function loginReq(data, callback){
    // let api_url = 'api/wxserver/public/login';
    
    let res = {"code":1,"msg":"登录成功!","data":{"token":"bc2db6d2bbb5d646177c2fafb5af0dcbfca80ff404802581941cd9a9b7537bb1","user":{"id":23,"user_type":2,"sex":1,"weight":null,"height":null,"health":null,"birthday":0,"collect_category":null,"last_login_time":1548672740,"score":0,"coin":0,"balance":"0.99","lottery_times":183,"create_time":1548672740,"user_status":1,"user_login":"","user_pass":"","user_nickname":"+.-","user_email":"","user_url":"","turename":null,"avatar":"https://wx.qlogo.cn/mmopen/vi_32/u2N3lFzvSjiba3Q4rLWU5kria09YHbo4LMTLbY4Mtc6CKPJOjwZ9WLic75lPYtePTRia0wr5A2qIHepC67OfokXyyQ/132","signature":"","last_login_ip":"183.40.33.213","user_activation_key":"","mobile":"15608029630","more":null}},"url":"","wait":3};

    callback(res);
    // req_get(api_url, data, callback);
}

export {
    loginReq
}