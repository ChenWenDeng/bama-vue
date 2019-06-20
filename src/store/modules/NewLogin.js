// // import {
//     // getCodeMsg
// // } from './../../api'
// import { getUrl, getUrl2 } from '@/config/'
// import  storage from '@/utils/storage'
// import  { fetch } from '@/service/ajaxWrap'

// import { Toast } from 'vant';
// import {
//     SET_USERINFO,
//     SET_TOKEN
// } from './../mutation-types'
// import { from } from '_array-flatten@2.1.2@array-flatten';

// const state = {
//     // userInfo: storage.localGet('userInof') || {
//     //     mobile: '18494699137'
//     // },
//     // token:  storage.localGet('token') || 'f7de94b63ee71c8cbc0c80643c9425b92a5589c497c187d93a883f0f11ac9dfb',

//     //注视
//     userInfo: storage.localGet('userInfo') || {},
//     token:  storage.localGet('token') || '',
// }

// const mutations = {
//     [SET_USERINFO] (state, val) {
//         state.userInfo = val;
//         storage.localSet('userInfo', val); //设置在缓存里,下次在别的页面要用就取出来  Storage.localGet('userInfo');
//     },
//     [SET_TOKEN] (state, val) {
//         state.token = val;
//         storage.localSet('token', val);
//     }
// }   

// const actions = {
//     codeMsg({commit, dispatch, state, rootState}, data = {}) {
//         const params = {
//             'username': data.data.phone,
//         }

//         fetch({commit,params, dispatch, method: 'post',
//             url: getUrl2('get_code_msg'),
//             before() {

//             },
//             success ({ res, commit, dispatch }) {
//                 data.scCallback && data.scCallback(res);
//                 if(res.code == 1){
//                     Toast(res.msg);
//                 }else if(res.code == 10001){
//                     Toast('请先登录');
//                 }else{
//                     Toast(res.msg);
//                 }
//             },
//             error ({ err, commit, dispatch }){
//             },
//             after () {
//                 data.afterCallback && data.afterCallback()
//             }
//         })
//     },

//     login({commit, dispatch, state, rootState}, data = {}) {
//         const params = {
//             username : data.data.username,
//             // password : data.data.password,
//             verification_code : data.data.verification_code,
//             device_type: 'wxapp',
//         }
//         fetch({commit,params, dispatch, method: 'post',
//             url: getUrl2('immediately_login'),
//             before() {

//             },
//             success ({ res, commit, dispatch }) {
//                 if(res.code == 1) {
//                     console.log(res.data.token,'token')
//                     console.log(res.data.user,'user')
//                     // localStorage.setItem('token',JSON.stringify(res.data.token))
//                     // localStorage.setItem('userInfo',JSON.stringify(res.data.user))
//                     commit(SET_TOKEN, res.data.token); 
//                     commit(SET_USERINFO,res.data.user);  
//                 }
//                 data.scCallback && data.scCallback(res);
//             },
//             error ({ err, commit, dispatch }){
//             },
//             after () {
//                 data.afterCallback && data.afterCallback();
//             }
//         })
//     },
//     // logOut({commit, dispatch}, data = {}) {
//     //     storage.localRemove('userInfo')
//     //     storage.localRemove('token')
//     //     storage.localRemove('phoneNumber')
//     // }
// }

// const getters = {
//     getToken: function (state) {
//         return state.token;
//     }
// }


// export default {
//     namespaced: true,
//     state,
//     mutations,
//     actions,
//     getters
// }






import { getUrl, getUrl2 } from '@/config/';
import  storage from '@/utils/storage'
// import  storage from '@/utils/storge'
import storge from '../../utils/storge'
import  { fetch } from '@/service/ajaxWrap'
// import {

//   } from './../../api'
import {
    SET_USERINFO,
    SET_TOKEN
} from './../mutation-types'

const state = {
    // userInfo: storage.localGet('userInof') || {
    //     mobile: '18494699137'
    // },
    // token:  storage.localGet('token') || 'f7de94b63ee71c8cbc0c80643c9425b92a5589c497c187d93a883f0f11ac9dfb',
    userInfo: storage.localGet('userInfo') || {},
    token:  storage.localGet('token') || '',
}

const mutations = {
    [SET_USERINFO] (state, val) {
        state.userInfo = val;
        storage.localSet('userInfo', val); //设置在缓存里,下次在别的页面要用就取出来  Storage.localGet('userInfo');
    },
    [SET_TOKEN] (state, val) {
        state.token = val;
        storage.localSet('token', val);
    }
}   


const actions = {
    //验证码
    codeMsg({commit, dispatch, state, rootState}, data = {}) {
        const params = {
            'username': data.data.phone,
        }
        fetch({commit,params, dispatch, method: 'post',
            url: getUrl2('get_code_msg'),
            before() {
            },
            success ({ res, commit, dispatch }) {
                data.scCallback && data.scCallback(res);
                if(res.code == 1){
                    Toast(res.msg);
                }else if(res.code == 10001){
                    Toast('请先登录');
                }else{
                    Toast(res.msg);
                }
            },
            error ({ err, commit, dispatch }){
            },
            after () {
                data.afterCallback && data.afterCallback()
            }
        })
    },

    //验证码登录
    login({commit, dispatch, state, rootState}, data = {}) {
        const params = {
            username : data.data.username,
            // password : data.data.password,
            verification_code : data.data.verification_code,
            device_type: 'wxapp',
        }
        fetch({commit,params, dispatch, method: 'post',
            url: getUrl2('immediately_login'),
            before() {
            },
            success ({ res, commit, dispatch }) {
                if(res.code == 1) {
                    commit(SET_TOKEN, res.data.token); 
                    commit(SET_USERINFO,res.data.user);  
                    rootState.user.userInfo = res.data.user
                    rootState.user.token = res.data.token
                }
                data.scCallback && data.scCallback(res);
            },
            error ({ err, commit, dispatch }){
            },
            after () {
                data.afterCallback && data.afterCallback();
            }
        })
    },

    //密码登录
    mimalogin({commit, dispatch, state, rootState}, data = {}) {
        const params = {
            username : data.data.username,
            password : data.data.password,
            device_type: 'wxapp',
        }
        fetch({commit,params, dispatch, method: 'post',
            url: getUrl2('immediately_login'),
            before() {
            },
            success ({ res, commit, dispatch }) {
                if(res.code == 1) {
                    commit(SET_TOKEN, res.data.token); 
                    commit(SET_USERINFO,res.data.user);  
                    storge.set('token', res.data.token);
                    storge.set('userInfo', res.data.user);
                }
                data.scCallback && data.scCallback(res);
            },
            error ({ err, commit, dispatch }){
            },
            after () {
                data.afterCallback && data.afterCallback();
            }
        })
    },
}

const getters = {
    getToken: function (state) {
        return state.token;
    }
}


export default {
    namespaced: true,
    state,
    mutations,
    actions,
    getters
}
