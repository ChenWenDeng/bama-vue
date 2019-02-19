import Vue from "vue";
import Vuex from 'vuex';

import {tabers, app_name} from '../config/config.js';

Vue.use(Vuex);

const store = new Vuex.Store({
    state: {
        app_name,
        tabers
    }
});

export {
    store
}