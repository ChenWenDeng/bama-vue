import store from '@/store/store.js'
// import fetchJsonp from 'fetch-jsonp';
function req_get(url, data, callback) {
    let HOST_URL = 'https://klzz.hualinginfo.com/';
    // let HOST_URL = process.env.HOST_URL;
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
        typeof callback == "function" && callback(json.data);
    });
}

function req_post(url, data, callback) {
    let token = store.state.login.token;
    // url ='/api/' + url;
    url = '/agent'+url;
    let opts = {
        method: 'POST',
        mode: 'cors',
        credentials: 'include',
        headers: {
            'Content-Type': 'multipart/form-data',
            'XX-Token': token,
            'XX-Device-Type': 'wxapp',
            'Content-Type':'application/json'
        },
        body: JSON.stringify(data)
    };
    fetch(url, opts).then(response => response.json()).then(json => {
        typeof callback == "function" && callback(json.data);
    });
}


// function req_map_get(url, data, callback) {
//     if (data) {
//         let urlParamArr = [];
//         for (let key in data) {
//             urlParamArr.push(key + '=' + data[key]);
//         }
//         let urlParam = '?' + urlParamArr.join('&');

//         url += urlParam;
//     }
//     let opts = {
//         method: 'GET',
//         headers: {
//             // 'Content-Type':'application/json'
//         },
//     };
//     fetch(url, opts).then(response => response.json()).then(json => {
//         typeof callback == "function" && callback(json.data);
//         console.log(response)
//     });
// }

function req_map_get(url, data, callback) {
    if (data) {
        let urlParamArr = [];
        for (let key in data) {
            urlParamArr.push(key + '=' + data[key]);
        }
        let urlParam = '?' + urlParamArr.join('&');

        url += urlParam;
    }
    let opts = {
        method: 'GET',
        headers: {
            // 'Content-Type':'application/json'
        },
    };
    fetchJsonp(url, opts, {
        jsonpCallback: 'custom_callback', // 回调函数名称，默认callback
      })
      .then(function(response) {
        return response.json()
      }).then(function(json) {
        // console.log('parsed json', json)
        typeof callback == "function" && callback(json);
      }).catch(function(ex) {
        // console.log('parsing failed', ex)
    })
}


export {
    req_get,
    req_post,
    req_map_get
};