import Vue from "vue";
import Vuex from 'vuex';

import {tabers, APP_NAME} from '../config/config.js';

import {newsList} from "./news";
import {circleRecommend} from './index.js'

Vue.use(Vuex);

const store = new Vuex.Store({
    state: {
        APP_NAME,
        tabers,
        newsList,
        circleRecommend
    }
});

export {
    store
}