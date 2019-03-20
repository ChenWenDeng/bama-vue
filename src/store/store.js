import Vue from "vue"
import Vuex from 'vuex'

import news from "./modules/news"
import index from './modules/index'
import footer from './modules/footer'
import search from './modules/search'
import user from './modules/user'
import collection from './modules/collection'
import articleDetails from './modules/articleDetails'

Vue.use(Vuex);

const store = new Vuex.Store({
    state: {

    },
    modules: {
        news,
        footer,
        index,
        search,
        user,
        collection,
        articleDetails
    }
});

export {
    store
}