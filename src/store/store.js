import Vue from "vue"
import Vuex from 'vuex'

import {config} from './config.js'

import news from "./modules/news"
import index from './modules/index.js'
import footer from './modules/footer.js'
import articleDetails from './modules/articleDetails.js'

Vue.use(Vuex);

const store = new Vuex.Store({
    state: {
        config,
    },
    modules: {
        news,
        footer,
        index,
        articleDetails
    }
});

export {
    store
}