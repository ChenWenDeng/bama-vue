<template>
    <div class="container">
        <van-search placeholder="请输入搜索关键词" shape="round" v-model="keyword" @search="onSearch"/>

        <van-list v-model="loading"
                  :finished="finished"
                  finished-text="没有更多了"
                  :error.sync="error"
                  error-text="请求失败，点击重新加载"
                  @load="finish"
                  :immediate-check="check">
            <article-item-cc v-for="(value, key) in articleList" :key="key" @click="read(value)" :item="value"></article-item-cc>
        </van-list>
    </div>
</template>

<script>
    import Vue from 'vue';
    import {mapGetters, mapActions} from 'vuex'
    import {Search, Toast, List} from 'vant';


    Vue.use(Search);

    export default {
        name: "search",

        components:{
            [List.name]: List,
        },

        computed:{
            keyword:{
                set(val) {
                    this.$store.state.search.keyword = val
                },
                get(){
                    return this.$store.state.search.keyword;
                }
            },
            ...mapGetters('search', [
                'articleList',
            ]),
        },

        data() {
            return {
                loading: false,
                finished: false,
                error: false,
                check: false
            }
        },

        methods: {
            ...mapActions('search', [
                'search',
            ]),
            onSearch() {
                let that = this;

                setTimeout(function () {
                    if (that.keyword) {
                        that.search();
                    } else {
                        Toast.fail('搜索内容??');
                    }

                    this.loading = false;
                }, 500);
            },
            read: function (article) {
                let id = article.id;
                this.$router.push({
                    name: 'content',
                    params: {
                        id
                    }
                })
            },
            finish: function () {
                this.loading = false;
                this.finished = true;
            }
        }
    }
</script>

<style type="text/css">

</style>