<template>
    <div class="news-item-cc">
        <img class="news-item-thumbnail-cc" v-lazy="img">
        <h4 class="news-item-title-cc">{{ title }}</h4>
        <p>{{ brief }}</p>
        <div class="news-info-cc">
            <div class="news-info-left-cc">
                <span class="news-time-cc">{{ issued }}</span>
            </div>
            <div class="news-info-right-cc">
                <span class="fa fa-eye"></span>{{hits}}
                <span class="fa fa-thumbs-o-up"></span>{{like}}
                <span class="fa fa-star-o"></span>{{favorites}}
                <span class="fa fa fa-commenting-o"></span>{{comment_count}}
            </div>
        </div>
        <div class="tag">
            <van-tag v-for="(value, key) in tag" :key="key" :color="tagColor(key)">{{ value }}</van-tag>
        </div>
    </div>
</template>

<script>
    import {Tag} from 'vant';
    import {handlePublishTimeDesc} from '../api/time.js'

    export default {
        props: ['item'],
        components: {
            [Tag.name]: Tag,
        },

        data() {
            return {
                img: this.item.thumbnail,
                title: this.item.post_title,
                brief: this.item.post_excerpt,
                favorites: this.item.post_favorites,
                like: this.item.post_like,
                hits: this.item.post_hits,
                comment_count: this.item.comment_count,
                tag: this.item.tag,

                color: {
                    default: '#f2826a',
                    category: '#5bc0de',
                    top:'#AEDD81',
                    recommend: '#f34612'
                }
            }
        },

        computed: {
            issued: function () {
                return handlePublishTimeDesc(this.item.published_time);
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
            }
        }
    }
</script>

<style type="text/css">
    .news-item-cc {
        position: relative;
        background: white;
        margin-bottom: 8px;
    }

    .news-item-cc:last-child {
        margin-bottom: 0;
    }

    .news-item-thumbnail-cc {
        width: 100%;
        height: 210px;
    }

    .news-item-title-cc {
        margin: 4px 8px;
        font-size: 1.1rem;
    }

    p {
        margin: 4px 8px;
        font-size: 13px;
        color: grey;

        overflow: hidden;
        display: -webkit-box;
        -webkit-box-orient: vertical;
        -webkit-line-clamp: 2;
    }

    .news-info-cc {
        overflow: hidden;
        color: grey;
        padding: 4px 8px;
        font-size: 13px;
    }

    .news-info-cc span{
        margin-right: 2px;
    }

    .news-info-left-cc {
        float: left;
    }

    .news-info-right-cc {
        float: right;
    }

    .news-info-right-cc span{
        margin-left: 4px;
    }

    .tag{
        position: absolute;
        top: -2px;
        right: 0;
    }

    .van-tag{
        margin-right: 6px;
    }
</style>