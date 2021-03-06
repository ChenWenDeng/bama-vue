import { getUrl, getUrl2 } from '@/config/';
import  { fetch } from '@/service/ajaxWrap'
import storage from '@/utils/storage'
// import {

// } from './../mutation-types'

const state = {

}

const mutations = {

}   

const actions = {
    //验证码
    getCodeMsg({commit, dispatch}, data = {}) {
        const params = {
            'username': data.data.phone
        }
        fetch({commit,params, dispatch, method: 'post',
            url: getUrl2('get_Code'),
            before() {
            },
            success ({ res, commit, dispatch }) {
                data.scCallback && data.scCallback(res);
            },
            error ({ err, commit, dispatch }){
            },
            after () {
                data.afterCallback && data.afterCallback()
            }
        })
    },


    //注册
    register({commit, dispatch}, data = {}) {
        const params = {
            username : data.data.username,
            password : data.data.password,
            verification_code : data.data.verification_code
        }
        fetch({commit,params, dispatch, method: 'post',
            url: getUrl2('immediately_register'),
            before() {

            },
            success ({ res, commit, dispatch }) {
                storage.sessionSet('token',res.data.token)
                storage.sessionSet('userInfo',res.data.user)
                data.scCallback && data.scCallback(res);
            },
            error ({ err, commit, dispatch }){
            },
            after () {
                data.afterCallback && data.afterCallback()
            }
        })
    },

}

const getters = {
}


export default {
    namespaced: true,
    state,
    mutations,
    actions,
    getters
}
