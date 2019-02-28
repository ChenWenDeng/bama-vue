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
    let BASE_URL = process.env.BASE_URL;
    let API_URL = 'api/user/comments';

    if (typeof start == 'undefined') start = 0;
    let pageRow = 20;


    let data = {
        object_id: id,
        table_name: 'portal_post',
        relation: 'user',
        limit: start + ',' + pageRow
    };

    let urlParamArr = [];
    for (let key in data) {
        urlParamArr.push(key + '=' + data[key]);
    }
    let urlParam = '?' + urlParamArr.join('&');


    let url = BASE_URL + API_URL + urlParam;

    fetch(url).then(response => response.json()).then(json => {
        typeof callback == "function" && callback(json.data);
    });
}

export {
    commentReq,
    doCommentReq
}