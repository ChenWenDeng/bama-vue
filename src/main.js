// 系统
import Vue from 'vue';
import App from './App.vue';
import {router} from './router';

import {store} from './store/store.js';

import load_components from './components/load.js';

// import {Toast } from 'vant';
// Vue.use(Toast);
import { Swipe, SwipeItem ,Card,Tab, Tabs ,Popup,Rate,Area,Uploader,DatetimePicker,Picker, List,Notify,Button, Toast ,ImagePreview ,Lazyload,AddressEdit  } from 'vant';

Vue.use(Swipe).use(SwipeItem).use(Card).use(Tab).use(Tabs).use(Popup).use(Rate).use(Area).use(Uploader).use(DatetimePicker).use(Picker).use( List).use(Notify ).use(Button).use(Toast).use(ImagePreview).use(Lazyload).use(AddressEdit);

load_components;

new Vue({
    router,
    store,
    el: '#app',
    render: h => h(App)
});

Date.prototype.format = function(fmt) {
    var o = {
        "M+" : this.getMonth()+1,                 //月份
        "d+" : this.getDate(),                    //日
        "h+" : this.getHours(),                   //小时
        "m+" : this.getMinutes(),                 //分
        "s+" : this.getSeconds(),                 //秒
        "q+" : Math.floor((this.getMonth()+3)/3), //季度
        "S"  : this.getMilliseconds()             //毫秒
    };
    if(/(y+)/.test(fmt)) {
        fmt=fmt.replace(RegExp.$1, (this.getFullYear()+"").substr(4 - RegExp.$1.length));
    }
    for(var k in o) {
        if(new RegExp("("+ k +")").test(fmt)){
            fmt = fmt.replace(RegExp.$1, (RegExp.$1.length==1) ? (o[k]) : (("00"+ o[k]).substr((""+ o[k]).length)));
        }
    }
    return fmt;
};