<template>
    <van-tabbar v-model="active">
        <van-tabbar-item v-for="taber in tabers" :icon="taber.icon" :info="taber.info">{{taber.name}}</van-tabbar-item>
    </van-tabbar>
</template>

<script>
    import {Tabbar, TabbarItem} from 'vant';
    import {mapGetters} from 'vuex';

    export default {
        components: {
            [Tabbar.name]: Tabbar,
            [TabbarItem.name]: TabbarItem
        },

        computed: {
            ...mapGetters('footer', [
                'tabers',
                'active'
            ])
        },

        data() {
            return {

            }
        }
    };

</script>

<style lang="less">

</style>