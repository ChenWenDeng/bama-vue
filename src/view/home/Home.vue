<template>
    <div class="container">
        <header-cc :title="title" left_icon="bell" right_icon="search" @onClickLeft="onClickLeft"
                   @onClickRight="onClickRight"></header-cc>

        <van-swipe :autoplay="3000" style="margin-bottom: 2px;">
            <van-swipe-item v-for="(image, index) in carousel" :key="index">
                <img v-lazy="image" style="width: 100%;height: 240px;"/>
            </van-swipe-item>
        </van-swipe>

        <category-cc :data="categoryList"></category-cc>

        <div class="recommend-cc m-top-cc">
            <div class="recommend-title-cc">
                <h3 class="recommend-left-cc">每周话题</h3>
                <p class="recommend-right-cc">更多话题</p>
            </div>
            <van-list :finished="circleRecommendFinished"
                      finished-text="没有更多了"
                      :error.sync="circleRecommendError"
                      error-text="请求失败，点击重新加载">
                <article-item-cc v-for="(value, key) in circleRecommend" :key="key" :item="value" @click="read(value)"></article-item-cc>
            </van-list>
        </div>

        <div class="recommend-cc m-top-cc">
            <div class="recommend-title-cc">
                <h3 class="recommend-left-cc">推荐内容</h3>
            </div>
            <van-list v-model="newsRecommendLoading"
                      :finished="newsRecommendFinished"
                      finished-text="没有更多了"
                      :error.sync="newsRecommendError"
                      error-text="请求失败，点击重新加载"
                      @load="loadNewsRecommend">
                <article-item-cc v-for="(value, key) in newsRecommend" :key="key" :item="value"  @click="read(value)"></article-item-cc>
            </van-list>
        </div>

        <footer-cc></footer-cc>
    </div>
</template>

<script>
    import Vue from 'vue';
    import {mapGetters, mapActions} from 'vuex'
    import {Swipe, SwipeItem, Lazyload, List} from 'vant';
    import ArticleItemCc from "../../components/Article-item-cc";

    // options 为可选参数，无则不传
    Vue.use(Lazyload, '');

    export default {
        components: {
            ArticleItemCc,
            [Swipe.name]: Swipe,
            [SwipeItem.name]: SwipeItem,
            [List.name]: List,
        },

        computed: {
            ...mapGetters('index', [
                'categoryList',
                'circleRecommend',
                'circleRecommendFinished',
                'circleRecommendError',
                'newsRecommend',
                'newsRecommendFinished',
                'newsRecommendError',
                'carousel'
            ]),
            newsRecommendLoading: {
                set: function (newValue) {
                    this.$store.state.index.newsRecommend.loading = newValue;
                },
                get: function () {
                    return this.$store.state.index.newsRecommend.loading;
                }
            }
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
            ...mapActions('index', [
                'loadCircleRecommend',
                'loadNewsRecommend',
                'init'
            ]),
            read: function (article) {
                console.log(article);
                let id = article.id;
                this.$router.push({
                    name: 'content',
                    params: {
                        id
                    }
                })
            },
            onClickLeft() {
                // if (this.left_icon != '') {
                //     return true;
                // }
            },
            onClickRight() {
                return false;
            },
            categoryItemClick: function (props) {
                console.log(props);

                return true;
            }
        }
    };


</script>

<style>

    .recommend-cc {
        background: white;
    }

    .recommend-title-cc {
        height: 40px;
        line-height: 40px;
        padding: 4px 12px;
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