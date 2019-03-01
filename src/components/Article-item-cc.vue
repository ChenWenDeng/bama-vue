<template>
    <div class="article-item-cc m-bottom-cc" @click="$emit('click')">
        <img class="article-item-thumbnail-cc" v-lazy="img">
        <h4 class="article-item-title-cc">{{ title }}</h4>
        <p class="describe-cc">{{ brief }}</p>
        <div class="article-info-cc">
            <div class="article-info-left-cc">
                <span class="article-time-cc">{{ publish }}</span>
            </div>
            <div class="article-info-right-cc">
                <span class="fa fa-eye"></span>{{hits}}
                <span class="fa fa-thumbs-o-up"></span>{{like}}
                <span class="fa fa-star-o"></span>{{favorites}}
                <span class="fa fa fa-commenting-o"></span>{{comment_count}}
            </div>
        </div>
        <div class="article-tag">
            <van-tag v-for="(value, key) in tag" :key="key" :color="tagColor(key)">{{ value }}</van-tag>
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
    }

    .article-item-cc:last-child {
        margin-bottom: 0;
    }

    .article-item-thumbnail-cc {
        width: 100%;
        height: 210px;
    }

    .article-item-title-cc {
        margin: 4px 12px;
        font-size: 1.1rem;
    }

    .describe-cc {
        margin: 4px 12px;
        font-size: 13px;
        color: grey;

        overflow: hidden;
        display: -webkit-box;
        -webkit-box-orient: vertical;
        -webkit-line-clamp: 2;
    }

    .article-info-cc {
        overflow: hidden;
        color: grey;
        padding: 4px 12px;
        font-size: 13px;
        height: 20px;
        line-height: 20px;
    }

    .article-info-cc span{
        margin-right: 2px;
    }

    .article-info-left-cc {
        float: left;
    }

    .article-info-right-cc {
        float: right;
    }

    .article-info-right-cc span{
        margin-left: 4px;
    }

    .article-tag{
        position: absolute;
        top: 0;
        right: 0;
    }

    .van-tag{
        margin-right: 6px;
    }
</style>