import { getUrl, getUrl2 } from '@/config/';
import  { fetch } from '@/service/ajaxWrap'
import {
    articleListReq,
  } from './../../api'
import {
} from './../mutation-types'

const state = {
    expertVideoList:[],
    loading: false,
    finished: false,
    index : 0
}

const mutations = {
}

const actions = {
    getExpertVideo({commit, dispatch}, parasm = {}) {     
        if (!state.finished) {  
                let data = {
                    category_id : parasm.data.id
                };
                articleListReq(data, function (res) {
                        state.expertVideoList = res
                });
        }
    }
}

const getters = {
    expertVideoList(state){
        return state.expertVideoList
    }
}


export default {
    namespaced: true,
    state,
    mutations,
    actions,
    getters
}
