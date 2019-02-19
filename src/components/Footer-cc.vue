<template>

    <van-tabbar v-model="active">
        <van-tabbar-item v-for="taber in tabers" :icon="taber.icon" :info="taber.info">
            {{taber.name}}
        </van-tabbar-item>
    </van-tabbar>

</template>

<script>
    import {Tabbar, TabbarItem} from 'vant';

    export default {
        components: {
            [Tabbar.name]: Tabbar,
            [TabbarItem.name]: TabbarItem
        },

        data() {
            return {
                tabers: this.$store.state.tabers,
                active: 0
            }
        }
    };

</script>

<style lang="less">

</style>