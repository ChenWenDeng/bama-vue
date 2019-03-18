<template>
    <div class="userInfo">
        <div class="head-info">
            <div class="head-img">
                <img :src="userInfo.avatar" class="avatar"/>
            </div>
        </div>
    </div>
</template>

<script>
    import Vue from 'vue';
    import {mapGetters, mapMutations} from 'vuex'

    import {Cell, CellGroup, Notify} from 'vant';

    Vue.use(Cell).use(CellGroup);

    Vue.use(Notify);

    export default {
        name: "UserInfo",

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
            toUserInfo() {

            }
        }
    }
</script>

<style type="text/css">
    .userInfo .van-cell-group .van-cell, .user-box .van-cell-group .van-icon{
        font-size: 1rem;
    }

    .userInfo .van-cell-group .van-cell{
        padding-top: 15px;
        padding-bottom: 15px;
    }

    .userInfo .head-info{
        overflow: hidden;
        padding: 38px 30px;
        background: #398bff;
        position: relative;
        text-align: center;
    }

    .userInfo .head-user-info{
        float: left;
        color: white;
        font-size: 1.3rem;
        padding-top: 8px;
    }

    .userInfo .avatar{
        width: 70px;
        height: 70px;
        border-radius: 50%;
    }

    .userInfo .head-user-info .user-level{
        font-size: 0.8rem;
    }


</style>