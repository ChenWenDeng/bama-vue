<template>
    <div class="container user-box">
        <van-cell-group>
            <van-cell v-for="item in menu" :icon="item.icon" :key="item.id" :title="item.title" is-link :value="item.value" />
        </van-cell-group>

        <footer-cc></footer-cc>
    </div>
</template>

<script>
    import Vue from 'vue';
    import {mapGetters, mapMutations} from 'vuex'

    import {Cell, CellGroup, Notify} from 'vant';

    Vue.use(Cell).use(CellGroup);

    Vue.use(Notify);

    export default {
        name: "User",

        computed: {
            ...mapGetters('user', [
                'token',
                'userInfo',
                'auth',
                'menu'
            ]),
        },

        created() {

        },

        methods: {

        }
    }
</script>

<style type="text/css">
    .user-box .van-cell-group .van-cell, .user-box .van-cell-group .van-icon{
        font-size: 1rem;
    }

    .user-box .van-cell-group .van-cell{
        padding-top: 15px;
        padding-bottom: 15px;
    }
</style>