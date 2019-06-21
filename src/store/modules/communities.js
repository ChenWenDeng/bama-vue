import { getUrl, getUrl2 } from '@/config/';
import  { fetch } from '@/service/ajaxWrap'
// import {

// } from './../mutation-types'

const state = {

}

const mutations = {

}   

const actions = {
    //文章
   showAcrticle({commit, dispatch}, data = {}) {
        const params = {
            category_id : data.category_id,
            parent_id: data.pid
        }
        fetch({commit,params, dispatch, method: 'get',
            url: getUrl2('get_articleList'),
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

    pAcrticle({commit, dispatch}, data = {}) {
        const params = {
            category_id : data.category_id,
            order: data.order,
            limit:data.limit
        }
        fetch({commit,params, dispatch, method: 'get',
            url: getUrl2('get_articleList'),
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
