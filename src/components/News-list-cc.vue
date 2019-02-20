<template>
    <van-list v-model="loading"
              :finished="finished"
              finished-text="没有更多了"
              :error.sync="error"
              error-text="请求失败，点击重新加载"
              @load="onLoad">
        <div v-for="(value, key) in data" :key="key">
            <img class="news-list-thumbnail-cc" v-lazy="value.thumbnail">
        </div>
    </van-list>
</template>

<script>
    import Vue from 'vue';
    import {List, Lazyload} from 'vant';

    Vue.use(List);
    Vue.use(Lazyload);

    export default {
        props: ['data'],
        components: {
            [List.name]: List,
        },

        data() {
            return {
                list: [],
                loading: false,
                finished: false,
                error: false,
            }
        },

        created: function () {

        },

        methods: {
            onLoad() {
                // 异步更新数据
                // setTimeout(() => {
                //     for (let i = 0; i < 10; i++) {
                //         this.list.push(this.list.length + 1);
                //     }
                //     // 加载状态结束
                //     this.loading = false;
                //
                //     // 数据全部加载完成
                //     if (this.list.length >= 40) {
                //         this.finished = true;
                //     }
                // }, 500);
            },
        }
    }
</script>

<style type="text/css">
    .news-list-thumbnail-cc{
        width: 100%;
        height: 240px;
    }
</style>