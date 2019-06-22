<template>
  <div class="container">
    <header-cc
      :title="title"
      left_icon="bell"
      right_icon="search"
      @onClickLeft="onClickLeft"
      @onClickRight="onClickRight"
    ></header-cc>
    <!-- <HeaderTop>
      <div class="left-container" slot="left">
        <span class="left-title">首页</span>
      </div>
      <div class="center-container" slot="center"></div>
      <div class="right-container" slot="right"></div>
    </HeaderTop> -->
    <!-- <div class="search-container">
      <div class="left-container">
        <i class="iconfont iconiconfontzhizuobiaozhun22"></i>
        <input type="text" placeholder="请输入关键词" @click="_jump">
      </div>
      <div class="right-container">
        <i class="iconfont iconxiaoxitongzhitixinglingshenglingdang"></i>
      </div>
    </div> -->
    <van-swipe :autoplay="3000" style="margin-bottom:0.5rem;">
      <van-swipe-item v-for="(item, index) in carousel" :key="index">
        <img v-lazy="item.image" style="width: 100%;height: 240px;">
      </van-swipe-item>
    </van-swipe>

    <category-cc :data="categoryList"></category-cc>

    <div class="recommend-cc m-top-cc">
      <div class="recommend-title-cc">
        <h3 class="recommend-left-cc">每周话题</h3>
        <!-- <p class="recommend-right-cc">更多话题</p> -->
      </div>
      <!-- <van-list finished-text="没有更多了" error-text="请求失败，点击重新加载">
        <article-item-cc
          v-for="(value, key) in circleRecommend"
          :key="key"
          :item="value"
          @click="read(value)"
        ></article-item-cc>
      </van-list> -->
      <ul class="recommend-ul">
        <li v-for="(item,index) in circleRecommend" :key="index" @click="read(item)">
          <img :src="item.thumbnail" alt="">
          <p>{{item.post_title}}</p>
          <div class="bottom-container">
            <div class="left-container">
              <span>{{item.published_time}}</span>
              <span class="iconfont iconziyuan36">
                {{item.comment_count}}
              </span>
            </div>
            <div class="right-container">
              <span v-if="item.tag.top">置顶</span>
              <span v-if="item.tag.recommended">推荐</span>
            </div>
          </div>
        </li>
      </ul>
    </div>

    <div class="recommend-cc m-top-cc">
      <div class="recommend-title-cc">
        <!-- <h3 class="recommend-left-cc">推荐内容</h3> -->
        <h3 class="recommend-left-cc">老年头条</h3>
      </div>
      <van-list
        v-model="newsRecommendLoading"
        :finished="newsRecommendFinished"
        finished-text="没有更多了"
        :error.sync="newsRecommendError"
        error-text="请求失败，点击重新加载"
        @load="loadNewsRecommend"
      >
        <article-item-cc
          v-for="(value, key) in newsRecommend"
          :key="key"
          :item="value"
          @click="read(value)"
        ></article-item-cc>
      </van-list>
    </div>

    <back-top-cc></back-top-cc>

    <footer-cc></footer-cc>
  </div>
</template>

<script>
import Vue from "vue";
import { mapGetters, mapActions } from "vuex";
import { Swipe, SwipeItem, Lazyload, List } from "vant";
import ArticleItemCc from "../../components/Article-item-cc";
import HeaderTop from '../../components/headerTop'

// options 为可选参数，无则不传
Vue.use(Lazyload, "");

export default {
  components: {
    ArticleItemCc,
    [Swipe.name]: Swipe,
    [SwipeItem.name]: SwipeItem,
    [List.name]: List,
    HeaderTop
  },

  computed: {
    ...mapGetters("index", [
      "categoryList",
      "circleRecommend",
      "newsRecommend",
      "newsRecommendFinished",
      "newsRecommendError",
      "carousel"
    ]),
    newsRecommendLoading: {
      set: function(newValue) {
        this.$store.state.index.newsRecommend.loading = newValue;
      },
      get: function() {
        return this.$store.state.index.newsRecommend.loading;
      }
    }
  },

  created() {
    this.init();
  },

  data() {
    return {
      title: process.env.APP_NAME,

      circleRecommendData: {}
    };
  },

  methods: {
    ...mapActions("index", [
      "loadCircleRecommend",
      "loadNewsRecommend",
      "loadCarousel",
      "init"
    ]),
    read: function(article) {
      //console.log(article);
      let id = article.id;
      this.$router.push({
        name: "content",
        params: {
          id
        }
      });
    },
    onClickLeft() {
      // if (this.left_icon != '') {
      //     return true;
      // }
    },
    onClickRight() {
      this.$router.push({
        name: "search"
      });

      return true;
    },
    categoryItemClick: function(props) {
      //console.log(props);

      this.$router.push({
        name: props.content
      });

      return true;
    },
    _jump(){
      this.$router.push("/search")
    }
  }
};
</script>

<style>
.recommend-cc {
  background: white;
  margin: 0.6rem 0.6rem 0 0.6rem;
  padding: 0 0.6rem;
}

.recommend-title-cc {
  height: 28px;
  line-height: 28px;
  padding: 0.6rem 0 0 0;
  overflow: hidden;
  font-size: 0.8rem;
  /* border-bottom: 1px solid #f5f5f5; */
}

.recommend-left-cc {
  float: left;
  margin: 0;
  font-weight: 500;
}

.recommend-right-cc {
  margin: 0;
  float: right;
}

.van-list {
  background: #f3f3f3;
}
</style>

<style lang="scss" scoped>
.container{
  .search-container{
    display: flex;
    z-index: 999;
    width: 100%;
    height: 1.875rem;
    position: absolute;
    top: 3.375rem;
    left: 0;
    right: 0;
    .left-container{
      width: 87%;
      height: 1.875rem;
      padding-left: 0.625rem;
      .iconfont{
        z-index: 99;
        position: absolute;
        top: 0.375rem;
        left: 6.625rem;
        color:#C9C9C9;
        font-weight: bold;
      }
      input{
        position: relative;
        width: 100%;
        height: 100%;
        border:none;
        padding: 0;
        border-radius: 3.125rem;
        text-align: center;
      }
      input::-webkit-input-placeholder, textarea::-webkit-input-placeholder { 
        /* WebKit browsers */ 
        color: #C9C9C9; 
        } 
        input:-moz-placeholder, textarea:-moz-placeholder { 
        /* Mozilla Firefox 4 to 18 */ 
        color: #C9C9C9; 
        } 
        input::-moz-placeholder, textarea::-moz-placeholder { 
        /* Mozilla Firefox 19+ */ 
        color: #C9C9C9; 
        } 
        input:-ms-input-placeholder, textarea:-ms-input-placeholder { 
        /* Internet Explorer 10+ */ 
        color: #C9C9C9; 
      }
    }
    .right-container{
      display: flex;
      justify-content: center;
      align-items: center;
      width: 13%;
      height: 1.875rem;
      i{
        font-size: 1.1563rem;
        color: #fff;
      }
    }
  }
  .recommend-ul{
    width: 100%;
    li{
       width: 100%;
      img{
        width: 100%;
        height: 8.9375rem;
      }
      p{
        font-size: 1.125rem;
        color:#333333;
        margin-top: 5px;
        line-height: 1.875rem;
      }
      .bottom-container{
        display: flex;
        justify-content: space-between;
        align-items: center;
        width: 100%;
        padding-bottom: 1.25rem;
        .left-container{
          display: flex;
          align-items: center;
          font-size: 0.625rem;
          color:#6E6E6E;
          .iconziyuan36{
            font-size: 0.6875rem;
            margin-left: 0.9375rem;
            color:#6E6E6E;
          }
        }
        .right-container{
          display: flex;
          align-items: center;
          span:nth-child(1){
            border:0.0625rem solid #FF2C2C;
            color:#FF2C2C;
          }
          span:nth-child(2){
            border:0.0625rem solid #4492FF;
            color: #4492FF;
          }
          span{
            display: flex;
            justify-content: center;
            align-items: center;
            width: 25px;
            height: 15px;
            font-size: 0.625rem;
            border-radius: 0.1875rem;
            margin-right: 5px;
          }
        }
      }
    }
  }
}
</style>
