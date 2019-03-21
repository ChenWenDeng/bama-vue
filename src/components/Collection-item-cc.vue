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

<style type="text/css">
    .article-item-cc {
        position: relative;
        background: white;
    }

    .article-item-cc:last-child {
        margin-bottom: 0;
    }

    .article-item-main-cc {
        height: 90px;
        padding-top: 16px;
        padding-bottom: 12px;
        overflow: hidden;
    }

    .article-item-thumbnail-cc {
        width: 130px;
        height: 90px;
        margin-left: 12px;
        margin-right: 8px;
        border-radius: 4px;
        float: left;
    }

    .article-item-main-right-cc {
        margin: 0;
        overflow: hidden;
    }

    .article-item-title-cc {
        font-size: 1.1rem;
        margin: 0;
        padding: 0;
        overflow: hidden;
        display: -webkit-box;
        -webkit-box-orient: vertical;
        -webkit-line-clamp: 1;
    }

    .describe-cc {
        font-size: 1rem;
        color: grey;
        margin: 0;
        overflow: hidden;
        display: -webkit-box;
        -webkit-box-orient: vertical;
        -webkit-line-clamp: 3;
    }

    .article-item-main-right-cc span {
        font-size: 0.6rem;
    }

    .article-info-cc span, .article-item-main-right-cc span {
        margin-right: 4px;
    }
</style>