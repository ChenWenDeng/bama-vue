<template>
    <div class="article-item-cc m-bottom-cc" @click="$emit('click')">
        <div class="article-item-main-cc">
            <img class="article-item-thumbnail-cc" v-lazy="img">
            <div class="article-item-main-right-cc">
                <h4 class="article-item-title-cc">{{ title }}</h4>
                <p class="describe-cc">{{ brief }}</p>
            </div>
        </div>
    </div>
</template>

<script>
    import Vue from 'vue';
    import {Tag, Lazyload} from 'vant';

    // options 为可选参数，无则不传
    Vue.use(Lazyload, '');

    export default {
        props: ['item'],
        components: {
            [Tag.name]: Tag,
        },

        computed: {
            img: function () {
                return this.item.thumbnail;
            },
            title: function () {
                return this.item.title;
            },
            brief: function () {
                return this.item.description;
            },
        },


        methods: {
            tagColor: function (key) {
                return this.color[key] ? this.color[key] : this.color.default;
            },
            click: function () {

            }
        }
    }
</script>
