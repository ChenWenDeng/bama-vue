// 系统
import Vue from 'vue';
import App from './App.vue';
import {router} from './router';

import {store} from './store/store.js';

import load_components from './components/load.js';

load_components;

new Vue({
    router,
    store,
    el: '#app',
    render: h => h(App)
});