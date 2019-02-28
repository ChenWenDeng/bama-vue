<template>
    <div class="container">
        <div class="box-cc login-btn">
            <van-button block round plain size="normal" type="primary" :loading="loading" loading-text="正在登陆" @click="doLogin">微信一键登陆</van-button>
        </div>
        <footer-cc></footer-cc>
    </div>
</template>

<script>
    import {Button} from 'vant';

    export default {
        name: "login",

        components: {
            [Button.name]: Button,
        },

        data() {
            return{
                loading: false
            }
        },

        methods:{
            doLogin(){
                this.loading = true;
            }
        },

        beforeCreate: function() {
            document.body.className = 'bg-cc';
        },

        beforeDestroy: function() {
            document.body.removeAttribute("class","bg-cc");
        }
    }
</script>

<style type="text/css">
    .bg-cc{
        width: 100%;
        height: -webkit-fill-available;
        background-image: url('../../assets/guide.png');
        background-repeat:no-repeat;
        background-size:100% 100%;
        -moz-background-size:100% 100%;
    }

    .login-btn {
        position: fixed;
        width: 80%;
        left: 10%;
        bottom: 190px;
    }
</style>