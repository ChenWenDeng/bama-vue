import {
    videoDetailsReq,
    pinLunReq,
    fabulousReq
  } from './../../api'
import { getUrl, getUrl2 } from '@/config/';
import  { fetch } from '@/service/ajaxWrap'
import {

} from './../mutation-types'

const state = {
    expertVideoDetailsData:[]
}

const mutations = {
   
}

const actions = {
    getExpertVideoDetails({commit, dispatch}, parasm = {}) {       
        const params = {
            id: parasm.data.id,
            relation:'user,categories'
        }
        videoDetailsReq(params, function (res) {
            if (res) {
                state.expertVideoDetailsData = res;
            }
        })
    },
}

const getters = {
    expertVideoDetailsData(state){
        return state.expertVideoDetailsData
    }
}


export default {
    namespaced: true,
    state,
    mutations,
    actions,
    getters
}
