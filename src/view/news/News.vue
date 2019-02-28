<template>
    <div class="container">
        <van-tabs v-model="active" @change="tabChange" swipeable sticky>
            <van-tab v-for="(item, index) in category" :key="index" :title="item.name">
                <van-list v-model="item.loading"
                          :finished="item.finished"
                          finished-text="没有更多了"
                          :error.sync="item.error"
                          error-text="请求失败，点击重新加载"
                          @load="loadNews">
                    <article-item-cc v-for="(value, key) in news[index]" :key="key" @click="read(value)" :item="value"></article-item-cc>
                </van-list>
            </van-tab>
        </van-tabs>

        <back-top-cc></back-top-cc>

        <footer-cc></footer-cc>
    </div>
</template>

<script>
    import Vue from 'vue';
    import {mapGetters, mapActions} from 'vuex'
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
                circleRecommendData: {}
            };
        },

        methods: {
            ...mapActions('news', [
                'loadCategory',
                'loadNews',
                'init'
            ]),
            tabChange: function(){
                this.loadNews();
            },
            read: function (article) {
                let id = article.id;
                this.$router.push({
                    name: 'content',
                    params: {
                        id
                    }
                })
            }
        }
    };
</script>

<style>
    .van-list {
        background: #f3f3f3;
    }
</style>