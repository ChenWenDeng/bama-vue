<template>
    <div>
        <header-cc :title="title" left_icon="bell" right_icon="search" @onClickLeft="onClickLeft" @onClickRight="onClickRight"></header-cc>

        <van-swipe :autoplay="3000">
            <van-swipe-item v-for="(image, index) in images" :key="index">
                <img v-lazy="image" style="width: 100%;height: 240px;"/>
            </van-swipe-item>
        </van-swipe>

        <category-cc :data="categoryList"></category-cc>

        <footer-cc></footer-cc>
    </div>
</template>

<script>
    import Vue from 'vue';
    import {Swipe, SwipeItem, Lazyload} from 'vant';
    import category from '../../components/Category-cc.vue';
    import {Carousel, CategoryList} from '../../store/index.js';

    // options 为可选参数，无则不传
    Vue.use(Lazyload, '');

    export default {
        components: {
            [Swipe.name]: Swipe,
            [SwipeItem.name]: SwipeItem,
            'category-cc': category
        },

        data() {
            return {
                title: this.$store.state.APP_NAME,

                images: Carousel,

                categoryList: CategoryList,
            };
        },

        methods: {
            onClickLeft() {
                // if (this.left_icon != '') {
                //     return true;
                // }
            },
            onClickRight() {
                return false;
            },
            categoryItemClick: function(props){
                console.log(props);

                return true;
            }
        }
    };


</script>

<style lang="less">

</style>