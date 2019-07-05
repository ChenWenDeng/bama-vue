import { getUrl, getUrl2 } from '@/config/';
// import {Uploaderes} from './../../api'
import { fetch } from '@/service/ajaxWrap'
import qs from 'qs';
// import {
//   } from './../../api'
import {

} from './../mutation-types'

const state = {
    typeName: null,
    commentList :[], //全部评论
}

const mutations = {

}

const actions = {
    //修改信息
    xiuGaiName({ commit, dispatch, state, rootState }, data = {}) {
        switch (state.typeName) {
            case 'nc':
                var paramses = {
                    user_nickname: data.data.can
                };
                break;
            case 'xb':
                var paramses = {
                    sex: data.data.can
                };
                break;
            case 'sr':
                var paramses = {
                    birthday: data.data.can
                };
                break;
            case 'sg':
                var paramses = {
                    height: data.data.can
                };
                break;
            case 'tz':
                var paramses = {
                    weight: data.data.can
                };
                break;
            case 'tx':
                var paramses = {
                    avatar: data.data.can
                };
                break;
            default:
                return false;
        }
        var params
        params = paramses
        fetch({
            commit, params, dispatch, method: 'post',
            url: getUrl2('user_XinXi'),
            before() {
            },
            success({ res, commit, dispatch }) {
                data.scCallback && data.scCallback(res);
            },
            error({ err, commit, dispatch }) {
            },
            after() {
                data.afterCallback && data.afterCallback()
            }
        })
    },


    //评论
    loadPinLun({ commit, dispatch, state, rootState }, data = {}) {
        let object_id = data.object_id;
        let category_id = data.category_id;
        let content = data.content;
        let pid = data.pid;
        let to_user_id = data.to_user_id;
        const params = {
            object_id: object_id,
            table_name: 'portal_post',
            content: content,
            parent_id: pid,
            to_user_id: to_user_id,
            url: `{action:portal/Article/index,param:{id:${object_id} ,cid:${category_id}}}`
        };


        fetch({
            commit, params, dispatch, method: 'post',
            url: getUrl2('pinLun_Req'),
            before() {

            },
            success({ res, commit, dispatch }) {
                data.scCallback && data.scCallback(res);
            },
            error({ err, commit, dispatch }) {
            },
            after() {
                data.afterCallback && data.afterCallback()
            }
        })
    },

    //全部评论
    getAllPinLun({commit, dispatch, state, rootState}, data = {}) {
        if (!data.data.id) data.data.id = data.data.id;
        var pageRows = 20;
        var old_length = state.commentList.length;
        var timeOut = old_length == 0 ? 1 : 1200;
        var page = parseInt(old_length / pageRows) + 1;
       


        let params={
                    object_id :data.data.id,
                    page:page,
                    table_name:'portal_post',
                    relation:'user'
        }
        fetch({commit,params, dispatch, method: 'get',
            url: getUrl2('get_allPinLun'),
            before() {
                state.loading = true;
            },
            success ({ res, commit, dispatch }) {
                state.commentList = res.data
                data.scCallback && data.scCallback(res);
            },
            error ({ err, commit, dispatch }){
            },
            after () {
                state.loading = false;
                data.afterCallback && data.afterCallback()
            }
        })
    },


    //收藏文章
    collectArticles({ commit, dispatch, state, rootState }, data = {}) {
        const params = {
            id: data.id
        };
        fetch({
            commit, params, dispatch, method: 'post',
            url: getUrl2('collection_Req'),
            before() {

            },
            success({ res, commit, dispatch }) {
                data.scCallback && data.scCallback(res);
            },
            error({ err, commit, dispatch }) {
            },
            after() {
                data.afterCallback && data.afterCallback()
            }
        })
    },

    //取消文章
    cancelArticles({ commit, dispatch, state, rootState }, data = {}) {
        const params = {
        };
        fetch({
            commit, params, dispatch, method: 'delete',
            url: getUrl2('cancel_is_collection') + '/' + data.id,
            before() {

            },
            success({ res, commit, dispatch }) {
                data.scCallback && data.scCallback(res);
            },
            error({ err, commit, dispatch }) {
            },
            after() {
                data.afterCallback && data.afterCallback()
            }
        })
    },

    //判断文章是否收藏
    isArticles({ commit, dispatch, state, rootState }, data = {}) {

        const params = {
            object_id: data.object_id,
            table_name: 'portal_post',
        };
        fetch({
            commit, params, dispatch, method: 'get',
            url: getUrl2('is_collection'),
            before() {

            },
            success({ res, commit, dispatch }) {
                console.log(res)
                data.scCallback && data.scCallback(res);
            },
            error({ err, commit, dispatch }) {
            },
            after() {
                data.afterCallback && data.afterCallback()
            }
        })
    },
    //是否收藏
    isCollection({commit, dispatch, state, rootState}, data = {}) {
        const params = {
            table_name : 'portal_post',
            object_id : data.data.id
        }

        fetch({commit,params, dispatch, method: 'get',
            url: getUrl2('is_collection'),
            before() {

            },
            success ({ res, commit, dispatch }) {
                data.scCallback && data.scCallback(res);
                console.log(res)
            },
            error ({ err, commit, dispatch }){
            },
            after () {
                data.afterCallback && data.afterCallback()
            }
        })
    },

    //点赞
    fabulous({ commit, dispatch, state, rootState }, data = {}) {
        const params = {
            id: data.id
        };
        fetch({
            commit, params, dispatch, method: 'post',
            url: getUrl2('fabulous_Req'),
            before() {

            },
            success({ res, commit, dispatch }) {
                console.log(res)
                data.scCallback && data.scCallback(res);
            },
            error({ err, commit, dispatch }) {
            },
            after() {
                data.afterCallback && data.afterCallback()
            }
        })
    },
    //预约
    registration({ commit, dispatch, state, rootState }, data = {}) {
        const params = {
            name:data.name,
            mobile:data.mobile
        };
        fetch({
            commit, params, dispatch, method: 'post',
            url: getUrl2('get_registration'),
            before() {

            },
            success({ res, commit, dispatch }) {
                console.log(res)
                data.scCallback && data.scCallback(res);
            },
            error({ err, commit, dispatch }) {
            },
            after() {
                data.afterCallback && data.afterCallback()
            }
        })
    },

    loadType: function ({ commit, dispatch, state, rootState }, typeName) {
        state.typeName = typeName;
    },

}

const getters = {
    commentList(state){
        return state.commentList
    },
}


export default {
    namespaced: true,
    state,
    mutations,
    actions,
    getters
}
