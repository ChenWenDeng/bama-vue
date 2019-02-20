import Vue from "vue";
import Vuex from 'vuex';

import {config} from '../config/config.js';

import news from "./news";
import index from './index.js'
import footer from './footer.js'

Vue.use(Vuex);

const store = new Vuex.Store({
    state: {
        config,
        news,
        index,
        footer
    }
});

export {
    store
}