<template>
    <div class="comment-item-cc">
        <div class="comment-item-left-cc">
            <img class="comment-user-avatar" v-lazy="avatar">
        </div>
        <div class="comment-item-right-cc">
            <div class="comment-item-info-cc">
                <div class="comment-item-info-left-cc">
                    <span class="comment-user-name-cc">{{ nickname }}</span>
                    <br/>
                    <span class="comment-time-cc">{{ publish }}</span>
                </div>
            </div>
            <div class="comment-item-content-cc" v-html="content"></div>
        </div>
    </div>
</template>

<script>
    import Vue from 'vue';
    import {Lazyload} from 'vant';
    import {handlePublishTimeDesc, formatDateTime} from '../utils/time.js'

    // options 为可选参数，无则不传
    Vue.use(Lazyload, '');

    export default {
        name: "Comment-item-cc",

        props: ['item'],

        computed: {
            avatar: function () {
                return this.item.user.avatar;
            },
            publish: function () {
                return handlePublishTimeDesc(formatDateTime(this.item.create_time * 1000));
            },
            nickname: function () {
                return this.item.user.user_nickname;
            },
            content: function () {
                return this.item.content;
            }
        },

        data() {
            return {}
        }

    }
</script>

<style type="text/css">
    .comment-item-cc {
        border-top: 1px solid #f8f8f8;
        padding: 15px;
        background-color: white;
    }

    .comment-item-cc:last-child{
        border-bottom: 1px solid #f8f8f8;
    }

    .comment-item-left-cc {
        float: left;
        margin-right: 15px;
    }

    .comment-user-avatar {
        height: 36px;
        width: 36px;
        border-radius: 50%;
    }

    .comment-item-right-cc {
        overflow: hidden;
    }

    .comment-item-info-cc {
    }

    .comment-item-info-left-cc {
    }

    .comment-user-name-cc {
        font-size: 1rem;
    }

    .comment-time-cc {
        font-size: 0.7rem;
        color: grey;
    }

    .comment-item-content-cc {
        margin-top: 8px;
    }
</style>