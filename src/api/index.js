// const BASE_URL = 'https://klzz.hualinginfo.com/'

import { req_get, req_post, req_map_get } from './ajax';


//健康资讯

function articleListReq(data, callback) {
    let api_url = 'api/portal/articles/category';

    if (data) {
        req_get(api_url, data, callback);
    }else {
        return false;
    }
}

function subCategoriesReq(data, callback) {
    let api_url = 'api/portal/categories/subCategories';

    if (data) {
        req_get(api_url, data, callback);
    }else {
        return false;
    }
}

//健康资讯视频详情
function videoDetailsReq(data, callback) {
    let api_url = 'api/portal/articles/read';

    if (data) {
        req_get(api_url, data, callback);
    }else {
        return false;
    }
}


//文章详情
function pictureDetailsReq(data, callback) {
    let api_url = 'api/portal/articles/read';

    if (data) {
        req_get(api_url, data, callback);
    }else {
        return false;
    }
}

//评论
// function pinLunReq(data, callback) {
//     let api_url = 'api/user/comments';

//     if (data) {
//         req_post(api_url, data, callback);
//     }else {
//         return false;
//     }
// }

// //点赞
// function fabulousReq(data, callback) {
//     let api_url = 'api/portal/articles/doLike';

//     if (data) {
//         req_post(api_url, data, callback);
//     }else {
//         return false;
//     }
// }

//请求验证码
// function getCodeMsg(data, callback) {
//     let api_url = 'api/user/verification_code/send';
//     // if(!data) return false
//     if (data) {
//         req_get(api_url, data, callback);
//     }else {
//         return false;
//     }
// }

// 健康监护
function custodyReq(data, callback) {
    let api_url = 'index/user/getStaDay';
    req_post(api_url, data, callback);
}


//添加家人
function addFamilyMsg(data, callback) {
    let api_url = 'api/user/device/add';
    if(!data) return false
    if (data) {
        req_get(api_url, data, callback);
    }else {
        return false;
    }
}

//首页文章列表
function getArticleList(data, callback) {
    let api_url = 'api/portal/articles/recommend';
    if(!data) return false
    if (data) {
        req_get(api_url, data, callback);
    }else {
        return false;
    }
}

// //收藏
// function collectionReq(data, callback) {
//     let api_url = 'api/portal/articles/doFavorite';
//     if(!data) return false
//     if (data) {
//         req_post(api_url, data, callback);
//     }else {
//         return false;
//     }
// }

//获取全部评论
// function getAllPinLunReq(data, callback) {
//     let api_url = 'api/user/comments';
//     if(!data) return false
//     if (data) {
//         req_get(api_url, data, callback);
//     }else {
//         return false;
//     }
// }


function getAddressReq(data, callback) {
    let api_url = 'http://api.map.baidu.com/geocoder/v2/';
    if(!data) return false
    if (data) {
        req_map_get(api_url, data, callback);
    }else {
        return false;
    }
}
export {
    articleListReq,
    subCategoriesReq,
    // getCodeMsg,
    custodyReq,
    addFamilyMsg,
    videoDetailsReq,
    // pinLunReq,
    // fabulousReq,
    getArticleList,
    // collectionReq,
    // getAllPinLunReq,
    pictureDetailsReq,
    getAddressReq
}