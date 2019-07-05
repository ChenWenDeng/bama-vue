
import { getUrl, getUrl2 } from '@/config/';
import  { fetch } from '@/service/ajaxWrap'
import {
    subCategoriesReq,
  } from './../../api'
import {

} from './../mutation-types'

const state = {
    informationList:[]
}

const mutations = {
   
}

const actions = {

    getInformation({commit, dispatch}, data = {}) {
        const params = {
            field: 'field=id,parent_id,more,post_title,post_excerpt,published_time,comment_count,post_favorites,post_hits,recommended',
            category_id: 26
        }
        subCategoriesReq(params, function (res) {
            if (res.categories.length > 0) {
                res = res.categories;
                state.informationList = res
            }
        })
    }

    

}

const getters = {
    informationList(state){
        return state.informationList
    }
}


export default {
    namespaced: true,
    state,
    mutations,
    actions,
    getters
}
