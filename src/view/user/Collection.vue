<template>
    <div>
        <header-cc :title="title" left-text="返回"></header-cc>

        <van-list v-model="collectionLoading"
                  :finished="collectionFinished"
                  finished-text="没有更多了"
                  :error.sync="collectionError"
                  error-text="请求失败，点击重新加载"
                  @load="loadCollection">
            <collection-item-cc v-for="(value, key) in collection" :key="key" :item="value" @click="read(value)"></collection-item-cc>
        </van-list>
    </div>
</template>

<script>

    import {mapGetters, mapActions} from 'vuex'
    import {List} from 'vant';

    export default {
        name: "Collection",

        components: {
            [List.name]: List,
        },

        computed: {
            ...mapGetters('collection', [
                'collection',
                'collectionLoading',
                'collectionFinished',
                'collectionError'
            ]),
        },

        data(){
            return{
                title: document.title
            }
        },

        created() {

        },

        methods: {
            ...mapActions('collection', [
                'loadCollection'
            ]),
            read: function (article) {
                let id = article.id;
                this.$router.push({
                    name: 'content',
                    params: {
                        id
                    }
                })
            },
        }
    }
</script>

<style type="text/css">

</style>