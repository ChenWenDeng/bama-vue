import Vue from "vue";
import Vuex from 'vuex';

import {Tabers, APP_NAME} from '../config/config.js';

import {NewsList} from "./news";

Vue.use(Vuex);

const store = new Vuex.Store({
    state: {
        APP_NAME,
        Tabers,
        NewsList,
    }
});

export {
    store
}