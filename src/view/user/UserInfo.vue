<template>
    <div class="userInfo">
        <header-cc :title="title" left-text="返回"></header-cc>

        <div class="head-info">
            <div class="head-img">
                <van-uploader :after-read="onRead" accept="image/gif, image/jpeg, image/png" multiple>
                    <img :src="userInfo.avatar" class="avatar"/>
                </van-uploader>
            </div>
        </div>

        <div class="user-info-box">
            <div class="user-info-item-left">
                昵称
            </div>
            <div class="user-info-item-right">
                <input maxlength="28" value="dasghdj"/>
            </div>
        </div>
        <div class="user-info-box">
            <div class="user-info-item-left">
                昵称
            </div>
            <div class="user-info-item-right">
                <input maxlength="28" value="dasghdj"/>
            </div>
        </div>
        <div class="user-info-box">
            <div class="user-info-item-left">
                昵称
            </div>
            <div class="user-info-item-right">
                <input maxlength="28" value="dasghdj"/>
            </div>
        </div>
        <div class="user-info-box">
            <div class="user-info-item-left">
                昵称
            </div>
            <div class="user-info-item-right">
                <input maxlength="28" value="dasghdj"/>
            </div>
        </div>
        <div class="user-info-box">
            <div class="user-info-item-left">
                昵称
            </div>
            <div class="user-info-item-right">
                <input maxlength="28" value="dasghdj"/>
            </div>
        </div>
    </div>
</template>

<script>
    import Vue from 'vue';
    import {mapGetters, mapMutations} from 'vuex'
    import {Cell, CellGroup, Notify, Uploader} from 'vant';

    Vue.use(Cell).use(CellGroup).use(Notify).use(Uploader);

    export default {
        name: "UserInfo",

        computed: {
            ...mapGetters('user', [
                'token',
                'userInfo',
                'auth',
                'menu'
            ]),
            title: () =>{
                return document.title;
            }
        },

        created() {

        },

        methods: {
            toUserInfo() {

            },
            onRead(){

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
        padding: 48px 30px;
        margin-bottom: 18px;
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

    .userInfo .user-info-box{
        padding-top: 15px;
        padding-bottom: 15px;
        font-size: 1rem;
        color: #5f5f5f;
        background: white;
        border-top: 1px solid #eeeeee;
    }

    .userInfo .user-info-box:last-child{
        border-bottom: 1px solid #eeeeee;
    }

    .userInfo .user-info-box input{
        border: 0;
        margin: 0;
        padding: 0;
        width: 90%;
    }

    .userInfo .user-info-box .user-info-item-left{
        float: left;
        margin-left: 24px;
        margin-right: 60px;
    }

    .userInfo .user-info-box .user-info-item-right{
        overflow: hidden;
    }
</style>