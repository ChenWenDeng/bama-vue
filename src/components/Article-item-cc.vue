<template>
  <div class="article-item-cc m-bottom-cc" @click="$emit('click')">
    <div class="article-item-main-cc">
      <img class="article-item-thumbnail-cc" v-lazy="img">
      <div class="article-item-main-right-cc">
        <div style="padding-bottom: 4px; overflow: hidden;">
          <div style="overflow: hidden;">
            <h4 class="article-item-title-cc">{{ title }}</h4>
          </div>
          <div style="float: right;margin-top: 2px;">
            <template v-for="(value, key) in tag">
              <van-tag
                v-if="key == 'top' || key == 'recommended'"
                plain
                :key="key"
                :color="tagColor(key)"
              >{{ value }}</van-tag>
            </template>
          </div>
        </div>
        <div class="article-info-cc">
          <template v-for="(value, key) in tag">
            <van-tag
              v-if="key != 'top' && key != 'recommended'"
              :key="key"
              plain
              :color="tagColor(key)"
            >
              {{ value
              }}
            </van-tag>
          </template>
          <span class="article-time-cc">{{ publish }}</span>
          <span class="iconfont iconziyuan36">{{comment_count}}</span>
        </div>
        <!-- <p class="describe-cc">{{ brief }}</p> -->
      </div>
    </div>
  </div>
</template>

<script>
import Vue from "vue";
import { Tag, Lazyload } from "vant";
import { handlePublishTimeDesc } from "../utils/time.js";

// options 为可选参数，无则不传
Vue.use(Lazyload, "");

export default {
  props: ["item"],
  components: {
    [Tag.name]: Tag
  },

  computed: {
    img: function() {
      return this.item.thumbnail;
    },
    title: function() {
      return this.item.post_title;
    },
    brief: function() {
      return this.item.post_excerpt;
    },
    favorites: function() {
      return this.item.post_favorites;
    },
    like: function() {
      return this.item.post_like;
    },
    hits: function() {
      return this.item.post_hits;
    },
    comment_count: function() {
      return this.item.comment_count;
    },
    tag: function() {
      return this.item.tag;
    },
    publish: function() {
      return handlePublishTimeDesc(this.item.published_time);
    }
  },

  data() {
    return {
      color: {
        default: "#4492FF",
        category: "#6E6E6E",
        top: "#FF2C2C",
        recommend: "#f34612"
      }
    };
  },

  methods: {
    tagColor: function(key) {
      return this.color[key] ? this.color[key] : this.color.default;
    },
    click: function() {}
  }
};
</script>

<style type="text/css">
.article-item-cc {
  position: relative;
  background: white;
  margin-bottom: 0;
}

.article-item-cc:last-child {
  margin-bottom: 0;
}

.article-item-main-cc {
  /* padding-top: 16px; */
  overflow: hidden;
  padding: 0.8rem 0;
  border-bottom: 1px solid #eeeeee;
}

.article-item-thumbnail-cc {
  width: 7rem;
  height: 5.8rem;
  /* margin-left: 0.8rem;*/
  margin-right: 0.6rem;
  border-radius: 0.2rem;
  float: left;
}

.article-item-main-right-cc {
  margin: 0;
  overflow: hidden;
  height: 5.8rem;
  position: relative;
}

.article-item-title-cc {
  font-size: 0.9375rem;
  color: #333333;
  margin: 0;
  padding: 0;
  overflow: hidden;
  /* display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 1; */
  height: 2.5rem;
  overflow:hidden; 
  text-overflow:ellipsis;
  display:-webkit-box; 
  -webkit-box-orient:vertical;
  -webkit-line-clamp:2; 
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

.article-info-cc {
  overflow: hidden;
  color: grey;
  position: absolute;
  padding: 1px 0;
  font-size: 0.7rem;
  bottom: 0;
  /* height: 20px; */
  /* line-height: 20px; */
}

.article-item-main-right-cc span {
  font-size: 0.6rem;
}

.article-info-cc span,
.article-item-main-right-cc span {
  margin-right: 4px;
}
.article-item-main-cc /deep/ .iconziyuan36:before {
  font-size: 0.7rem;
  padding-right: 0.2rem;
  color: #C8C8C8;
}
.article-item-main-cc .iconfont {
  font-size: 0.7rem;
}
</style>