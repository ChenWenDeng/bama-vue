<template>
    <div>
        <header-cc :title="title" left_icon="bell" right_icon="search" @onClickLeft="onClickLeft"
                   @onClickRight="onClickRight"></header-cc>

        <van-swipe :autoplay="3000" style="margin-bottom: 4px;">
            <van-swipe-item v-for="(image, index) in carousel" :key="index">
                <img v-lazy="image" style="width: 100%;height: 240px;"/>
            </van-swipe-item>
        </van-swipe>

        <category-cc :data="categoryList"></category-cc>

        <div class="recommend-cc">
            <div class="recommend-title-cc">
                <h3 class="recommend-left-cc">每周话题</h3>
                <p class="recommend-right-cc">更多话题</p>
            </div>
            <news-list-cc :data="circleRecommend"></news-list-cc>
        </div>

        <div class="recommend-cc">
            <div class="recommend-title-cc">
                <h3 class="recommend-left-cc">推荐内容</h3>
            </div>
            <news-list-cc :data="newsRecommend"></news-list-cc>
        </div>

        <footer-cc></footer-cc>
    </div>
</template>

<script>
    import Vue from 'vue';
    import {mapGetters, mapMutations} from 'vuex'
    import {Swipe, SwipeItem, Lazyload} from 'vant';
    import category from '../../components/Category-cc.vue';
    import NewsListCc from "../../components/News-list-cc";

    // options 为可选参数，无则不传
    Vue.use(Lazyload, '');

    export default {
        components: {
            [Swipe.name]: Swipe,
            [SwipeItem.name]: SwipeItem,
            'category-cc': category,
            'news-list-cc': NewsListCc,
        },

        computed: {
            ...mapGetters('index', [
                'categoryList',
                'circleRecommend',
                'newsRecommend',
                'carousel'
            ])
        },

        created: function () {
            this.loadCircleRecommend();
            this.loadNewsRecommend();
        },

        data() {
            return {
                title: this.$store.state.config.APP_NAME,
            };
        },

        methods: {
            ...mapMutations('index', [
                'loadCircleRecommend',
                'loadNewsRecommend',
            ]),
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
</style>