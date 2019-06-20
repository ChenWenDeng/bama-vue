import axios from 'axios'
import { config, statusCode } from './config'
import store from '@/store/store.js'
import {router} from '@/router'
import storge from '@/utils/storge';
import  storage from '@/utils/storage'

const axiosInstance = new class Axios {
    constructor() {
        this.instance = null;
        this.loading = null;
        this.cancel = () => {};
        this.queue = [];

        return this.init();
    }

    init() {
        let cancelToken = new axios.CancelToken(fnCancel => {
            this.cancel = fnCancel;
        });
        let axiosConfig = Object.assign({
            cancelToken
        }, config)
        this.instance = axios.create(axiosConfig)
        this.injectRequestHook();
        this.injectResponseHook();
        return this.instance;
    }

    injectRequestHook() {
        this.instance.interceptors.request.use(config => {
            // token
            // let token = store.state.login.token;
            // let token = storge.get('token')
            let token = storage.localGet('token')
            if (token) {
                config.headers = {
                    // 'Access-Control-Allow-Origin':'*',
                    'XX-token': token,
                    'XX-Device-Type': 'wxapp',
                } 
            }
            return config;
        }, error => {
            return Promise.reject(error);
        })
    }

    // injectResponseHook() {
    //     this.instance.interceptors.response.use(response => {
    //         //处理token
    //         //Vue刷新token，判断token是否过期、失效
    //         //在发送任何一次请求时，如果需要更新token,响应体中后端的同学给我返回了token这个字段，token出现在了响应体中，说明这时候是需要刷新token的（其他非刷新token的请求时是没有token字段的），这时用localStorage保存最新token，自动覆盖掉原来旧的token，这样下次再调用新接口时用的就是最新的token了，这样用户也感知不到token更新的过程（不同公司有不同定义----前端和后端一起定义）
    //         //一般响应状态码 code :0，表示请求成功。①响应状态码 code:10010表示token过期 ②响应状态码 code:10011 表示token无效
    //         // if (response.data.code === 10010 || response.data.code === 10011) { // ①10010 token过期（30天） ②10011 token无效 这些状态码需要和后端一起定义， 都会跳转到登录页，重新进行登录并获取最新的token
    //         //     Storage.localRemove('token') // 删除已经失效或过期的token（不删除也可以，因为登录后覆盖）
    //         //     router.replace({
    //         //         path: '/Login' // 到登录页重新获取token
    //         //     })
    //         // } else if (response.data.token) { // 判断token是否存在，如果存在说明需要更新token  
    //         //     Storage.localSet('token', response.data.token) // 覆盖原来的token(默认一天刷新一次) 为什么需要刷新token?因为出于安全性的考虑,一般是一天或几个小时更新token，看项目需要
    //         // }
    //         return response;
    //     }, error => {
    //         return error
    //     })
    // }

    injectResponseHook() {
        this.instance.interceptors.response.use(response => {
            //处理token
            //Vue刷新token，判断token是否过期、失效
            //在发送任何一次请求时，如果需要更新token,响应体中后端的同学给我返回了token这个字段，token出现在了响应体中，说明这时候是需要刷新token的（其他非刷新token的请求时是没有token字段的），这时用localStorage保存最新token，自动覆盖掉原来旧的token，这样下次再调用新接口时用的就是最新的token了，这样用户也感知不到token更新的过程（不同公司有不同定义----前端和后端一起定义）
            //一般响应状态码 code :0，表示请求成功。①响应状态码 code:10010表示token过期 ②响应状态码 code:10011 表示token无效
            if (response.data.code == 10001) { // ①10010 token过期（30天） ②10011 token无效 这些状态码需要和后端一起定义， 都会跳转到登录页，重新进行登录并获取最新的token
                // Storage.localRemove('token') // 删除已经失效或过期的token（不删除也可以，因为登录后覆盖）
                router.replace({
                    path: '/login' // 到登录页重新获取token
                })
            } 
            else if (response.data.token) { // 判断token是否存在，如果存在说明需要更新token  
                // Storage.localSet('token', response.data.token) // 覆盖原来的token(默认一天刷新一次) 为什么需要刷新token?因为出于安全性的考虑,一般是一天或几个小时更新token，看项目需要
                localStorage.setItem('token',response.data.token)
            }
            return response;
        }, error => {
            return error
        })
    }
}

export default axiosInstance;