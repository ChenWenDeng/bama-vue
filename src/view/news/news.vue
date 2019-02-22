<template>
    <div>
        <van-tabs v-model="active" @change="tabChange" swipeable sticky>
            <van-tab v-for="(item, index) in category" :key="index" :title="item.name">
                <van-list v-model="item.loading"
                          :finished="item.finished"
                          finished-text="没有更多了"
                          :error.sync="item.error"
                          error-text="请求失败，点击重新加载"
                          @load="loadNews">
                    <news-item-cc v-for="(value, key) in news[index]" :key="key" :item="value"></news-item-cc>
                </van-list>
            </van-tab>
        </van-tabs>

        <footer-cc></footer-cc>
    </div>
</template>

<script>
    import Vue from 'vue';
    import {mapGetters, mapMutations} from 'vuex'
    import {List, Tabs, Tab, Lazyload} from 'vant';

    // options 为可选参数，无则不传
    Vue.use(Lazyload, '');

    export default {
        components: {
            [List.name]: List,
            [Tabs.name]: Tabs,
            [Tab.name]: Tab,
        },

        computed: {
            ...mapGetters('news', [
                'category',
                'news',
            ]),
            active: {
                set: function (newValue) {
                    this.$store.state.news.active = newValue;
                },
                get: function () {
                    return this.$store.state.news.active;
                }
            },
        },

        created() {
            this.init();
        },

        data() {
            return {
                title: this.$store.state.config.APP_NAME,

                circleRecommendData: {}
            };
        },

        methods: {
            ...mapMutations('news', [
                'loadCategory',
                'loadNews',
                'init'
            ]),
            tabChange: function(){
                this.loadNews();
            },
        }
    };


</script>

<style>

    .recommend-cc {
        margin-top: 8px;
        background: white;
    }

    .recommend-title-cc {
        height: 40px;
        line-height: 40px;
        padding: 4px 8px;
        overflow: hidden;
        font-size: 0.8rem;
    }

    .recommend-left-cc {
        float: left;
        margin: 0;
        font-weight: 500;
    }

    .recommend-right-cc {
        margin: 0;
        float: right;
    }

    .van-list {
        background: #f3f3f3;
    }
</style>