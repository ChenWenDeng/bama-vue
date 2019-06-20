import axiosInstance from "./axios";
import qs from 'qs';


export const http = {
    exec: (method, url, params = {}) => {
        const options = {
            method,
            url,
        }
        if ( options.method == 'put'  || options.method == 'postJson' || options.method == 'patch') {
            options.headers = {
                'Content-Type': 'application/json; charset=UTF-8'
            }
            options.data = params;
        }
        if (options.method == 'get' || options.method == 'delete') {
            options.params = params;
        }
        if (options.method == 'post') {
            options.headers = {
                // 'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
                'Content-Type': 'application/json; charset=UTF-8'
                 //'Content-Type': 'multipart/form-data; charset=UTF-8'
            }
            //options.data = qs.stringify(params);
            options.data = params;
        }
        if (options.method == 'postJson') {
            options.method = 'post';
            options.data = JSON.stringify(params);
        }
        return new Promise((resolve, reject) => {
            axiosInstance(options)
                .then(response => {
                    if (response.status == 200) {
                        resolve(response.data);
                    } else {

                    }
                }, error => {
                    reject(error)
                })
        })
    },

    get: (url, query) => {
        return http.exec('get', url, query)
    },

    post: (url, data) => {
        return http.exec('post', url, data);
    },

    put: (url, data) => {
        return http.exec('put', url, data);
    },

    delete: (url, data) => {
        return http.exec('delete', url, data);
    },

    postJson: (url, data) => {
        return http.exec('postJson', url, data);
    },

    patch: (url, data) => {
        return http.exec('patch', url, data);
    },

    jsonp: (url , params , option) => {
        return new Promise((resolve , reject) => {
            jsonp(url , option , (err , data) => {
                if(!err){
                    resolve(data);
                }else{
                    reject(data);
                }
            })
        })
    },

    all: (promiseArr) => {
        return new Promise((resolve, reject)=>{
            axiosInstance.all(promiseArr)
            .then(axiosInstance.spread(function(){
                resolve(Object.values(arguments));
            }))
            .catch(error=>{
                reject(error);
            });
        });
    }
}