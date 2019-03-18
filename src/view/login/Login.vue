<template>
    <div class="container">
        <div class="box-cc login-btn">
            <div></div>
            <van-button v-if="isWXBrowser" block round plain size="normal" type="primary" :loading="loading" loading-text="正在登陆"
                        @click="doLogin">微信一键登陆
            </van-button>
        </div>
        <footer-cc></footer-cc>
    </div>
</template>

<script>
    import Vue from 'vue';
    import {mapActions} from 'vuex'
    import {Button, Notify} from 'vant';
    import Cookies from 'js-cookie';

    Vue.use(Notify);

    export default {
        name: "login",

        components: {
            [Button.name]: Button,
        },

        data() {
            return {
                loading: false,
                openid: null,
                isWXBrowser: true
            }
        },

        created() {
           this.init();
        },

        methods: {
            ...mapActions('user', [
                'login'
            ]),
            init(){
                // this.checkWXBrowser();
                // this.openid = Cookies.get('openid');
            },
            doLogin() {
                // if (!this.openid) {
                //     Notify('请在微信浏览器中进行登录授权~');
                //     return true;
                // }
                this.loading = true;

                let that = this;

                this.login(function (res) {
                    that.loading = false;

                    if (res.code === 1){

                        setTimeout(() => {
                            that.jumpUserCenter();
                        }, 1000);

                        Notify({
                            message: res.msg,
                            duration: 1000,
                            background: '#00bf19'
                        });
                    }else {
                        Notify(res.msg);
                    }
                });
            },
            checkWXBrowser () {
                //window.navigator.userAgent属性包含了浏览器类型、版本、操作系统类型、浏览器引擎类型等信息，这个属性可以用来判断浏览器类型
                var ua = window.navigator.userAgent.toLowerCase();
                //通过正则表达式匹配ua中是否含有MicroMessenger字符串
                if (ua.match(/MicroMessenger/i) == 'micromessenger') {
                    this.isWXBrowser = true;
                } else {
                    Notify('请在微信浏览器中打开本网站');
                    this.isWXBrowser = false;
                }
            },
            jumpUserCenter: function () {
                this.$router.push({
                    name: 'user'
                })
            }
        },

        beforeCreate: function () {
            document.body.className = 'bg-cc';
        },

        beforeDestroy: function () {
            document.body.removeAttribute("class", "bg-cc");
        }
    }
</script>

<style type="text/css">
    .bg-cc {
        width: 100%;
        height: -webkit-fill-available;
        background-image: url('../../assets/guide.png');
        background-repeat: no-repeat;
        background-size: 100% 100%;
        -moz-background-size: 100% 100%;
    }

    .login-btn {
        position: fixed;
        width: 80%;
        left: 10%;
        bottom: 190px;
    }
</style>