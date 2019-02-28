function categoryReq(data, callback) {
    let BASE_URL = process.env.BASE_URL;
    let API_URL = 'api/portal/categories';

    if (data) {
        let urlParamArr = [];
        for (let key in data) {
            urlParamArr.push(key + '=' + data[key]);
        }
        let urlParam = '?' + urlParamArr.join('&');


        let url = BASE_URL + API_URL + urlParam;

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