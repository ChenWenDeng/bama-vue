function readReq(id, callback) {
    let HOST_URL = process.env.HOST_URL;
    let API_URL = 'api/portal/articles/read';


    let data = {
        id: id,
        relation: 'user,categories'
    };

    let urlParamArr = [];
    for (let key in data) {
        urlParamArr.push(key + '=' + data[key]);
    }
    let urlParam = '?' + urlParamArr.join('&');


    let url = HOST_URL + API_URL + urlParam;

    fetch(url).then(response => response.json()).then(json => {
        typeof callback == "function" && callback(json.data);
    });
}

function articleListReq(data, callback) {
    let HOST_URL = process.env.HOST_URL;
    let API_URL = 'api/portal/articles/category';

    if (data) {
        let urlParamArr = [];
        for (let key in data) {
            urlParamArr.push(key + '=' + data[key]);
        }
        let urlParam = '?' + urlParamArr.join('&');


        let url = HOST_URL + API_URL + urlParam;

        fetch(url).then(response => response.json()).then(json => {
            typeof callback == "function" && callback(json.data);
        });
    } else {
        return false;
    }
}

function searchReq(keyword, callback) {
    let HOST_URL = process.env.HOST_URL;
    let API_URL = 'api/portal/search';

    if (!keyword) return false;

    let data = {
        keyword,
        post_status: 1
    };

    let urlParamArr = [];
    for (let key in data) {
        urlParamArr.push(key + '=' + data[key]);
    }
    let urlParam = '?' + urlParamArr.join('&');


    let url = HOST_URL + API_URL + urlParam;

    fetch(url).then(response => response.json()).then(json => {
        typeof callback == "function" && callback(json.data);
    });

}

function recommendReq(data, callback){
    let HOST_URL = process.env.HOST_URL;
    let API_URL = 'api/portal/articles/recommend';

    if (data) {
        let urlParamArr = [];
        for (let key in data) {
            urlParamArr.push(key + '=' + data[key]);
        }
        let urlParam = '?' + urlParamArr.join('&');


        let url = HOST_URL + API_URL + urlParam;

        fetch(url).then(response => response.json()).then(json => {
            typeof callback == "function" && callback(json.data);
        });
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