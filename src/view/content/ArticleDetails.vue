<template>
  <div class="article-details-cc" v-if="article.id">
    <div class="main">
      <h1 class="title">{{ title }}</h1>
      <div class="info">
        <img class="author-img" :src="avatar" height="40" width="40">
        <div class="info-right">
          <span class="author">{{author}}</span>
          <br>
          <span class="publish">{{publish}}</span>
        </div>
      </div>
      <div class="content" v-html="content" style="overflow: hidden;"></div>
      <div class="video" v-if="video">
        <video width="100%" height="auto" controls>
          <source :src="video" type="video/mp4">您的浏览器不支持 video 标签。
        </video>
      </div>
    </div>

    <div class="control-panel-cc m-top-cc">
      <div class="control-item-cc" @click="doLike" :class="{ active: isActive }">
        <span class="fa fa-thumbs-o-up"></span>
        {{ like }}
      </div>
      <div class="control-item-cc" @click="doCollecttwo" v-if="collectA" style="color:red">
        <span class="fa fa-star"></span>收藏
      </div>
      <div class="control-item-cc" @click="doCollect" v-else style="color: grey;">
        <span class="fa fa-star"></span>收藏
      </div>
      <div class="control-item-cc" @click="share">
        <span class="fa fa-share-alt"></span>分享
      </div>
      <div class="weixin-mask" v-if="pveover" @click="colse" @touchmove.prevent>
        <div style="color:#fff;font-size:1rem">
          <img src="../../assets/jiantou.png">点击右上角按钮，然后在弹出的菜
          <br>单中进行分享
        </div>
      </div>
      <div class="weixin-mask weixin-mask1" v-if="colseover" @click="pvcolse" @touchmove.prevent>
        <div style="color:#fff;font-size:1rem">
          <img src="../../assets/jiantou2.png">
          <span>
            点击右下角按钮，然后在弹出的菜
            <br>单中进行分享
          </span>
        </div>
      </div>
      <!-- <van-popup v-model="show"  position="center" overlay="false" style=""><span style="font-size:1rem;color:#fff">点击右上角按钮，然后在弹出的菜单中进行分享</span></van-popup> -->
    </div>

    <div></div>

    <div class="comment m-top-cc" style="margin-bottom: 30px;">
      <div class="comment-title">
        <h4>全部回复</h4>
      </div>
      <van-list
        v-model="commentLoading"
        :finished="commentFinished"
        finished-text="没有更多了"
        :error.sync="commentError"
        error-text="请求失败，点击重新加载"
        @load="loadComment(id)"
      >
        <comment-item-cc v-for="(value, key) in commentData" :key="key" :item="value"></comment-item-cc>
      </van-list>
    </div>

    <div class="commenting-cc">
      <input placeholder="说说您的看法···" v-model="commentValue">
      <div class="commenting-right-cc" @click="doPulish">发表</div>
    </div>
  </div>
</template>

<script>
import storage from "@/utils/storage";
import article from "@/utils/article";
import { mapGetters, mapMutations, mapActions } from "vuex";
import { handlePublishTimeDesc } from "../../utils/time.js";
import { List, Popup } from "vant";
import { Toast } from "vant";
import { fips } from "crypto";

export default {
  props: ["id"],

  components: {
    [List.name]: List,
    [Popup.name]: Popup
  },

  created() {
    this.init();
    let articleId = this.id;
    this.read(articleId);
    this.pusharticleId = articleId;
  },

  computed: {
    ...mapGetters("articleDetails", ["article", "commentList"]),
    title: function() {
      return this.article.post_title;
    },
    avatar: function() {
      return this.article.user.avatar;
    },
    author: function() {
      return this.article.user.user_nickname;
    },
    publish: function() {
      return handlePublishTimeDesc(this.article.published_time);
    },
    content: function() {
      return this.article.post_content;
    },
    video: function() {
      return this.article.more.video;
    },
    like: function() {
      return this.article.post_like;
    },
    describe: function() {
      return this.article.post_excerpt;
    },
    thumbnail: function() {
      return this.article.thumbnail;
    },

    commentLoading: function() {
      return this.commentList.loading;
    },
    commentFinished: function() {
      return this.commentList.finished;
    },
    commentError: function() {
      return this.commentList.error;
    },
    commentData: function() {
      return this.commentList.data;
    }
  },

  watch: {
    title: function(newVal) {
      document.title = newVal;
    }
  },

  data() {
    return {
      commentValue: "",
      pusharticleId: 0,
      collectA: false,
      wenId: 0,
      isActive: false,
      show: false,
      pveover: false,
      colseover: false
    };
  },

  methods: {
    ...mapMutations("articleDetails", ["read", "loadComment", "init"]),
    ...mapActions("articleDetails", ["doLike"]),
    // doCollect: function() {
    //   return true;
    // },

    //发表文章
    doPulish() {
      let val = this.article;
      let vm = this;
      if (!val.pid) val.pid = 0;
      if (!val.to_user_id) val.to_user_id = "";
      vm.$store.dispatch("common/loadPinLun", {
        object_id: val.id,
        category_id: val.categories[0].id,
        pid: val.pid,
        content: vm.commentValue,
        to_user_id: val.to_user_id,
        scCallback(res) {
          if (res.code == 1) {
            Toast(res.msg);
            vm.textareaText = "";
            vm.show = false;
            // vm.reload();
            vm.$router.go(0);
          } else if (res.code == 10001) {
            Toast("请先登录");
          } else {
            Toast(res.msg);
          }
        },
        afterCallback() {}
      });
    },

    //判断文章是否收藏
    pdcollect() {
      // let val = this.article;
      let vm = this;
      console.log(this.article, 111);
      vm.$store.dispatch("common/isArticles", {
        object_id: this.pusharticleId,
        scCallback(res) {
          if (res.code == 1) {
            vm.collectA = true;
            // Toast(res.msg);
          } else if (res.code == 10001) {
            Toast("请先登录");
          } else if (res.code == 0) {
            vm.collectA = false;
            // Toast(res.msg);
          } else {
            Toast(res.msg);
          }
        },
        afterCallback() {}
      });
    },

    //收藏文章
    doCollect() {
      let val = this.article;
      let vm = this;
      console.log("收藏文章");
      vm.$store.dispatch("common/collectArticles", {
        id: val.id,
        scCallback(res) {
          if (res.code == 1) {
            vm.collectA = true;
            Toast(res.msg);
          } else if (res.code == 10001) {
            Toast("请先登录");
          } else {
            Toast(res.msg);
          }
        },
        afterCallback() {}
      });
    },

    //取消收藏
    doCollecttwo() {
      let val = this.article;
      let vm = this;
      console.log("取消文章");
      vm.$store.dispatch("common/cancelArticles", {
        id: val.id,
        scCallback(res) {
          if (res.code == 1) {
            vm.collectA = false;
            Toast(res.msg);
          } else if (res.code == 10001) {
            Toast("请先登录");
          } else {
            Toast(res.msg);
          }
        },
        afterCallback() {}
      });
    },

    //点赞
    doLike() {
      let vm = this;
      let val = this.article;
      console.log(val);
      vm.$store.dispatch("common/fabulous", {
        id: val.id,
        scCallback(res) {
          console.log(res);
          if (res.code == 1) {
            vm.isActive = true;
            vm.article.post_like++;
            vm.like++;
            Toast(res.msg);
          } else if (res.code == 10001) {
            Toast("请先登录");
          } else {
            vm.isActive = true;
            Toast(res.msg);
          }
        },
        afterCallback() {}
      });
    },

    //分享
    share() {
      if (article.isWeiXin()) {
        // alert("请在微信上打开，在进行分享操作");
        // return;
        this.pveover = true;
      } else {
        this.colseover = true;
      }
    },
    colse() {
      this.pveover = false;
    },
    pvcolse() {
      this.colseover = false;
    }
  },
  mounted() {
    this.pdcollect();
  }
};
</script>

<style type="text/css">
.weixin-mask {
  background-color: rgba(0, 0, 0, 0.3);
  overflow: hidden;
  position: fixed;
  z-index: 10;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
}
.weixin-mask > div {
  width: 70%;
  text-align: center;
  color: #fff;
  margin: 20% auto;
}
.weixin-mask img {
  position: absolute;
  right: 0;
  top: 0;
}
body {
  height: 100%;

  overflow: hidden;
  overflow-y: scroll;
}
.article-details-cc .main {
  padding: 12px;
  background-color: white;
}

.article-details-cc .title {
  font-size: 1.2rem;
  margin-top: 0;
  margin-bottom: 18px;
}
.article-details-cc .info {
  margin-bottom: 20px;
}
.article-details-cc .author-img {
  border-radius: 50%;
  float: left;
  margin-right: 12px;
}

.article-details-cc .info-right {
  overflow: hidden;
  padding-top: 3px;
}

.article-details-cc .author {
  font-weight: 700;
  font-size: 0.9rem;
}

.article-details-cc .publish {
  font-size: 0.7rem;
  color: grey;
}

.article-details-cc .content img {
  width: 100%;
  margin: 0;
  padding: 0;
}
.article-details-cc .content table {
  width: 100%;
  margin: 0;
  padding: 0;
}

.control-panel-cc {
  overflow: hidden;
  background-color: white;
  text-align: center;
  padding-top: 8px;
  padding-bottom: 8px;
  color: grey;
  font-size: 0.8rem;
}

.control-item-cc {
  width: 33%;
  height: 18px;
  line-height: 18px;
  float: left;
}

.control-item-cc span {
  margin-right: 3px;
}

.article-details-cc .comment {
  background: white;
  overflow: hidden;
}

.article-details-cc .comment-title {
  height: 26px;
  line-height: 26px;
  padding: 12px;
}

.article-details-cc .comment-title h4 {
  font-weight: 400;
  margin: 0;
}

.commenting-cc {
  width: 100%;
  position: fixed;
  bottom: 0;
  overflow: hidden;
  background-color: white;
  height: 40px;
  line-height: 40px;
  border-top: 1px solid #f8f8f8;
}

.commenting-cc input {
  border: none;
  padding: 0 8px;
  float: left;
  width: 84%;
}

.commenting-right-cc {
  overflow: hidden;
  text-align: center;
  color: grey;
}
.control-panel-cc .van-popup {
  background-color: #000;
  opacity: 0.3;
}
/* .active{color: red;} */
.overlayer {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 10;
  background-color: #000;
  opacity: 0.3;
}
.weixin-mask1 div {
  bottom: 0;
  position: absolute;
  padding: 36% 0;
  margin: 0;
  width: 100%;
}
.weixin-mask1 span {
  display: block;
}
.weixin-mask1 img {
  bottom: 0;
  top: auto;
}
</style>
