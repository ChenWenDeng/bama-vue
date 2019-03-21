import storge from './storge';

function req_get(url, data, callback) {
    // let HOST_URL = process.env.HOST_URL;
    //
    // let patt = /http/;
    // if (!patt.test(url)) {
    //     url = HOST_URL + url;
    // }

    if (data) {
        let urlParamArr = [];
        for (let key in data) {
            urlParamArr.push(key + '=' + data[key]);
        }
        let urlParam = '?' + urlParamArr.join('&');

        url += urlParam;
    }

    var promise= fetch(url,{
        method: 'GET',
        headers: {
            'XX-Token': storge.get('token'),
            'XX-Device-Type': 'mobile',
            'content-type': 'application/json'
        }
        })
        .then(response => response.json())
        .catch(function(err) {
        // Error :(
            console.log(err);
        });

    promise.then(function (data) {
        // console.log(data)
        typeof callback === "function" && callback(data);
    }).catch(function (error) {
        console.log(error)
    })
}

function req_post(url, data, callback) {
    // let HOST_URL = process.env.HOST_URL;
    //
    // let patt = /http/;
    // if (!patt.test(url)) {
    //     url = HOST_URL + url;
    // }

    let options = {
        body: JSON.stringify(data), // must match 'Content-Type' header
        cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
        credentials: 'same-origin', // include, same-origin, *omit
        headers: {
            'XX-Token': storge.get('token'),
            'XX-Device-Type': 'mobile',
            'content-type': 'application/json'
        },
        method: 'POST', // *GET, POST, PUT, DELETE, etc.
        mode: 'cors', // no-cors, cors, *same-origin
        redirect: 'follow', // manual, *follow, error
        referrer: 'no-referrer', // *client, no-referrer
    };

    var promise= fetch(url, options)
        .then(response => response.json())
        .catch(function(err) {
            // Error :(
            console.log(err);
        });

    promise.then(function (data) {
        // console.log(data)
        typeof callback === "function" && callback(data);
    }).catch(function (error) {
        console.log(error)
    });
}

export {
    req_get,
    req_post
};