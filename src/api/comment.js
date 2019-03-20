import { req_get } from '../utils/request';

function doCommentReq(url, data) {
    let token = '';
    let opts = {
        method: 'POST',
        mode: 'cors',
        credentials: 'include',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            'XX-Token': token,
            'XX-Device-Type': 'wxapp',
        },
        body: JSON.stringify(data)
    };

    fetch(url, opts).then(response => response.json()).then(json => {
        if (json.data) {
            // state.article = json.data;

            return true;
        } else {
            return false;
        }
    });
}

function commentReq(id, start, callback) {
    let API_URL = 'api/user/comments';

    if (typeof start === 'undefined') start = 0;
    let pageRow = 20;


    let data = {
        object_id: id,
        table_name: 'portal_post',
        relation: 'user',
        limit: start + ',' + pageRow
    };

    req_get(API_URL, data, function (res) {
        typeof callback === "function" && callback(res);
    })
}

export {
    commentReq,
    doCommentReq
}