import { getUrl, getUrl2 } from '@/config/';
import  { fetch } from '@/service/ajaxWrap'
// import {

// } from './../mutation-types'

const state = {

}

const mutations = {

}   

const actions = {
    //信息
    pushZiLioa({commit, dispatch}, data = {}) {
        const params = {
            'user_nickname': data.data.user_nickname,
            'sex':data.data.sex,
            'birthday':data.data.birthday,
            'avatar':data.data.avatar
        }
        fetch({commit,params, dispatch, method: 'post',
            url: getUrl2('user_XinXi'),
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
    }

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
