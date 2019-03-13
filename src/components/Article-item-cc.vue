<template>
    <div class="article-item-cc m-bottom-cc" @click="$emit('click')">
        <div class="article-item-main-cc">
            <img class="article-item-thumbnail-cc" v-lazy="img">
            <div class="article-item-main-right-cc">
                <h4 class="article-item-title-cc">
                    <template  v-for="(value, key) in tag">
                        <van-tag v-if="key == 'top' || key == 'recommended'" plain :key="key" :color="tagColor(key)">{{ value }}</van-tag>
                    </template>
                    {{ title }}
                </h4>
                <p class="describe-cc">{{ brief }}</p>
            </div>
        </div>
        <div class="article-info-cc">
            <template v-for="(value, key) in tag">
                <van-tag v-if="key != 'top' && key != 'recommended'" :key="key" plain :color="tagColor(key)">{{ value }}</van-tag>
            </template>
            <span>{{comment_count}}人评论</span>
            <span class="article-time-cc">{{ publish }}</span>
        </div>
    </div>
</template>

<script>
    import Vue from 'vue';
    import {Tag, Lazyload} from 'vant';
    import {handlePublishTimeDesc} from '../utils/time.js'

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
                return this.item.post_title;
            },
            brief: function () {
                return this.item.post_excerpt;
            },
            favorites: function () {
                return this.item.post_favorites;
            },
            like: function () {
                return this.item.post_like;
            },
            hits: function () {
                return this.item.post_hits;
            },
            comment_count: function () {
                return this.item.comment_count
            },
            tag: function () {
                return this.item.tag;
            },
            publish: function () {
                return handlePublishTimeDesc(this.item.published_time);
            }
        },

        data() {
            return {
                color: {
                    default: '#f2826a',
                    category: '#5bc0de',
                    top:'#AEDD81',
                    recommend: '#f34612'
                }
            }
        },

        methods: {
            onLoad() {
                // 异步更新数据
                // setTimeout(() => {
                //     for (let i = 0; i < 10; i++) {
                //         this.list.push(this.list.length + 1);
                //     }
                //     // 加载状态结束
                //     this.loading = false;
                //
                //     // 数据全部加载完成
                //     if (this.list.length >= 40) {
                //         this.finished = true;
                //     }
                // }, 500);
            },
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
        padding-top: 12px;
    }

    .article-item-cc:last-child {
        margin-bottom: 0;
    }

    .article-item-main-cc{
        height: 80px;
        overflow: hidden;
    }

    .article-item-thumbnail-cc {
        width: 120px;
        height: 80px;
        margin-left: 12px;
        margin-right: 8px;
        float: left;
    }

    .article-item-main-right-cc{
        margin:0;
        overflow: hidden;
    }

    .article-item-title-cc {
        font-size: 1rem;
        margin: 0;
        padding: 0;
        margin-bottom: 4px;
        overflow: hidden;
        display: -webkit-box;
        -webkit-box-orient: vertical;
        -webkit-line-clamp: 1;
    }

    .describe-cc {
        font-size: 13px;
        color: grey;
        margin: 0;
        overflow: hidden;
        display: -webkit-box;
        -webkit-box-orient: vertical;
        -webkit-line-clamp: 3;
    }

    .article-info-cc {
        overflow: hidden;
        color: grey;
        padding: 4px 12px;
        font-size: 0.8rem;
        height: 20px;
        line-height: 20px;
        margin-right: 4px;
    }

    .article-info-cc span{
        margin-right: 4px;
    }


    .article-info-right-cc span, .article-item-main-right-cc span{
        margin-right: 4px;
    }

    .article-info-right-cc span:last-child, .article-item-main-right-cc span:last-child{
        margin-right: 0;
    }
</style>