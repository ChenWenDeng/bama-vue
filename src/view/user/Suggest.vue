<template>
    <div>

    </div>
</template>

<script>
    import Vue from 'vue';
    import {mapGetters, mapMutations} from 'vuex'

    import {Cell, CellGroup, Notify} from 'vant';

    Vue.use(Cell).use(CellGroup);

    Vue.use(Notify);

    export default {
        name: "Suggest",

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

<style scoped>

</style>