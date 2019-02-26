<template>
    <div class="article-details-cc" v-if="article.id">
        <div class="main">
            <h1 class="title">{{ title }}</h1>
            <div class="info">
                <img class="author-img" :src="avatar" height="40" width="40">
                <div class="info-right">
                    <span class="author">{{author}}</span><br/><span class="publish">{{publish}}</span>
                </div>
            </div>
            <div class="content" v-html="content"></div>
            <div class="video" v-if="video">
                <video width="100%" height="auto" controls>
                    <source :src="video" type="video/mp4">
                    您的浏览器不支持 video 标签。
                </video>
            </div>
        </div>

        <div class="control-panel-cc m-top-cc">
            <div class="control-item-cc" @click="doLike(id)">
                <span class="fa fa-thumbs-o-up"></span>{{ like }}
            </div>
            <div class="control-item-cc" @click="doCollect(id)">
                <span class="fa fa-star"></span>收藏
            </div>
            <div class="control-item-cc" @click="doShare">
                <span class="fa fa-share-alt"></span>分享
            </div>
        </div>

        <div class="comment m-top-cc" style="margin-bottom: 30px;">
            <div class="comment-title">
                <h4>全部回复</h4>
            </div>
            <van-list v-model="commentLoading"
                      :finished="commentFinished"
                      finished-text="没有更多了"
                      :error.sync="commentError"
                      error-text="请求失败，点击重新加载"
                      @load="loadComment(id)">
                <comment-item-cc v-for="(value, key) in commentData" :key="key" :item="value"></comment-item-cc>
            </van-list>
        </div>

        <div class="commenting-cc">
            <input placeholder="说说您的看法···" v-model="commentValue">
            <div class="commenting-right-cc">发表</div>
        </div>
    </div>
</template>

<script>
    import {mapGetters, mapMutations} from 'vuex'
    import {handlePublishTimeDesc} from '../../api/time.js'
    import {List} from 'vant';


    export default {
        props: ['id'],

        components: {
            [List.name]: List,
        },

        created() {
            this.init();
            let articleId = this.id;
            this.read(articleId);
        },

        computed: {
            ...mapGetters('articleDetails', [
                'article',
                'commentList'
            ]),
            title: function(){
                return this.article.post_title;
            },
            avatar: function () {
                return this.article.user.avatar;
            },
            author: function () {
                return this.article.user.user_nickname;
            },
            publish: function () {
                return handlePublishTimeDesc(this.article.published_time);
            },
            content: function () {
                return this.article.post_content;
            },
            video: function () {
                return this.article.more.video;
            },
            like: function(){
                return this.article.post_like;
            },

            commentLoading: function () {
                return this.commentList.loading;
            },
            commentFinished: function () {
                return this.commentList.finished;
            },
            commentError: function () {
                return this.commentList.error;
            },
            commentData: function () {
                return this.commentList.data;
            }
        },

        watch: {
            title: function (newVal, oldVal) {
                document.title = newVal;
            }
        },

        data() {
            return {
                commentValue: ''
            }
        },

        methods: {
            ...mapMutations('articleDetails', [
                'read',
                'loadComment',
                'init'
            ]),
            doLike: function (id) {
                return true;
            },
            doCollect: function (id) {
                return true;
            },
            doShare: function () {
                return true;
            }
        }

    }
</script>

<style type="text/css">
    .article-details-cc .main{
        padding:12px;
        background-color: white;
    }

    .article-details-cc .title{
        font-size: 1.2rem;
        margin-top: 0;
        margin-bottom: 18px;
    }
    .article-details-cc .info{
        margin-bottom: 20px;
    }
    .article-details-cc .author-img{
        border-radius: 50%;
        float: left;
        margin-right: 12px;
    }

    .article-details-cc .info-right{
        overflow: hidden;
        padding-top: 3px;
    }

    .article-details-cc .author{
        font-weight: 700;
        font-size: 0.9rem;
    }

    .article-details-cc .publish{
        font-size: 0.7rem;
        color: grey;
    }

    .article-details-cc .content img{
        width: 100%;
    }
    .article-details-cc .content table{
        width: 100%;
    }

    .control-panel-cc{
        overflow: hidden;
        background-color: white;
        text-align: center;
        padding-top: 8px;
        padding-bottom: 8px;
        color: grey;
        font-size: 0.8rem;
    }

    .control-item-cc{
        width: 33%;
        height: 18px;
        line-height: 18px;
        float: left;
    }

    .control-item-cc span{
        margin-right: 3px;
    }

    .article-details-cc .comment{
        background: white;
        overflow: hidden;
    }

    .article-details-cc .comment-title{
        height: 26px;
        line-height: 26px;
        padding: 12px;
    }

    .article-details-cc .comment-title h4{
        font-weight: 400;
        margin: 0;
    }

    .commenting-cc{
        width: 100%;
        position: fixed;
        bottom: 0;
        overflow: hidden;
        background-color: white;
        height: 40px;
        line-height: 40px;
        border-top: 1px solid #f8f8f8;
    }

    .commenting-cc input{
        border: none;
        padding: 0 8px;
        float: left;
        width: 84%;
    }

    .commenting-right-cc{
        overflow: hidden;
        max-width: 40px;
        text-align: center;
        color: grey;
    }
</style>