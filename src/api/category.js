function categoryReq(data, callback) {
    let HOST_URL = process.env.HOST_URL;
    let API_URL = 'api/portal/categories';

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
    }else {
        return false;
    }
}

export {
    categoryReq
}