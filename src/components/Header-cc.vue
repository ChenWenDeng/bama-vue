<template>
    <van-nav-bar v-if="left_icon" :title="title" @click-left="onClickLeft" @click-right="onClickRight">
        <van-icon v-if="left_icon" :name="left_icon" slot="left" />
        <van-icon v-if="right_icon" :name="right_icon" slot="right" />
    </van-nav-bar>

    <van-nav-bar v-else :title="title" :left-text="left_text" left-arrow @click-left="onClickLeft" @click-right="onClickRight">
        <van-icon v-if="right_icon" :name="right_icon" slot="right" />
    </van-nav-bar>
</template>


<script>
    import {NavBar, Icon, Toast} from 'vant';

    export default {
        props: {
            title: {
                type: String,
                required: true
            },
            left_icon:{
                type: String,
                default: ''
            },
            right_icon: {
                type: String,
                default: ''
            },
            left_text: {
                type: String,
                default: '返回'
            }
        },

        components: {
            [NavBar.name]: NavBar,
            [Icon.name]: Icon
        },

        data() {
            return {

            }
        },

        created: function(){

        },

        methods: {
            onClickLeft() {
                let bool = false;

                if (typeof this.$parent.onClickLeft == 'function'){
                    bool = this.$parent.onClickLeft();
                }

                if (!bool && !this.left_icon) {
                    console.log('自动返回上一页~！');
                    this.$router.back(-1);
                }
            },
            onClickRight() {
                let bool = false;

                if (typeof this.$parent.onClickRight == 'function'){
                    bool = this.$parent.onClickRight();
                }

                if (!bool) {
                    console.log('未作处理~！');
                }
            }
        }
    };

</script>

<style lang="less">

</style>