<template>
    <van-list v-model="loading" :error.sync="error" error-text="请求失败，点击重新加载" @load="onLoad">
        <div>test</div>
    </van-list>
</template>

<script>
    import Vue from 'vue';
    import {List} from 'vant';

    Vue.use(List);

    export default {
        components: {
            [List.name]: List,
        },

        data() {
            return {
                loading: false,

                data: this.$store.state.tabers,
            }
        },

        created: function(){

        },

        methods: {
            onLoad: function(){

            }
        }
    }
</script>

<style scoped>

</style>