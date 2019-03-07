<template>
    <div>
        <van-tabbar v-model="active" @change="change(active)">
            <van-tabbar-item v-for="taber in tabers" :key="taber.name" :icon="taber.icon" :info="taber.info">{{taber.title}}</van-tabbar-item>
        </van-tabbar>
    </div>
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
            active: {
                set: function (newValue) {
                    this.$store.state.footer.active = newValue;
                },
                get: function () {
                    return this.$store.state.footer.active;
                }
            },
            ...mapGetters('footer', [
                'tabers'
            ]),

        },

        created: function () {
            this.current();
        },

        data() {
            return {}
        },

        methods: {
            change: function (active) {
                this.$router.push({
                    name: this.tabers[active].name
                });
            },
            current: function () {
                const currentPathName = this.$router.currentRoute.name;
                if (this.tabers[this.active].name != currentPathName) {
                   for (let i=0;i<this.tabers.length;i++){
                       if (this.tabers[i].name == currentPathName) {
                           this.active = i;

                           return true;
                       }
                   }
                }
            }
        }
    };

</script>

<style type="text/css">

</style>