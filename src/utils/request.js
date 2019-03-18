function req_get(url, data, callback) {
    let HOST_URL = process.env.HOST_URL;

    let patt = /http/;
    if (!patt.test(url)) {
        url = HOST_URL + url;
    }

    if (data) {
        let urlParamArr = [];
        for (let key in data) {
            urlParamArr.push(key + '=' + data[key]);
        }
        let urlParam = '?' + urlParamArr.join('&');

        url += urlParam;
    }

    fetch(url).then(response => response.json()).then(json => {
        typeof callback == "function" && callback(json);
    });
}

export {
    req_get
};