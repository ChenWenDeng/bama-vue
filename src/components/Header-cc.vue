<template>
    <van-nav-bar :title="title" :left-text="left_text" left-arrow>
        <van-icon v-if="right_name" :name="right_name" slot="right"/>
    </van-nav-bar>
</template>

<script>
    import {NavBar} from 'vant';

    export default {
        props: {
            title: {
                type: String,
                required: true
            },
            right_name: {
                type: String,
                default: ''
            },
            left_text: {
                type: String,
                default: '返回'
            }
        },

        components: {
            [NavBar.name]: NavBar
        },

        data() {
            return {
                tabers: this.$store.state.tabers
            }
        },

        methods: {
            onClickLeft() {
                Toast('返回');
            },
            onClickRight() {
                Toast('按钮');
            }
        }
    };

</script>

<style lang="less">

</style>