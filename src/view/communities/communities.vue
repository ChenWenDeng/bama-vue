<template>
  <div class="Elderly">
    <HeaderTop>
      <div class="left-container" slot="left">
        <router-link tag="i" to="/" class="iconfont iconzuojiantou"></router-link>
        <span class="left-title">老年社区</span>
        <!-- <i @click="_jump" class="iconfont icon-fanhui"></i> -->
      </div>
      <div class="center-container" slot="center"></div>
      <div class="right-container" slot="right"></div>
    </HeaderTop>
    <div class="Elderly-top">
      <div class="img">
        <span class="span1">热议话题</span>
        <p>舞动健康，舞动快乐</p>
        <span class="span2">10万次浏览</span>
      </div>
      <!-- <div class="img"  @click="push(showdata.id)">
        <span class="span1">热议话题</span>
        <p>{{showdata.description}}</p>
        <span class="span2">{{showdata.hits}}次浏览</span>
      </div>-->
      <div class="ul">
        <ul>
          <li
            v-for="(item,index) in lists"
            :key="index"
            @click="push(item.id)"
          >{{lists[index].post_title}}</li>
        </ul>
      </div>
    </div>
    <div class="Elderly-center">
      <van-tabs v-model="active" animated @click="_qieHuang">
        <van-tab title="热门话题">
          <ul>
            <li
              v-for="(item,index) in list"
              :key="index"
              @click="push(item.id)"
              v-if="list.length > 0"
            >
              <img :src="item.thumbnail" alt class="img1">
              <div class="article-cc">
                <div style="padding-bottom: 4px; overflow: hidden;">
                  <div style="overflow: hidden;">
                    <h4 class="article-item-title">{{item.post_title}}</h4>
                  </div>
                  <div style="float: right; margin-top: 2px;">
                    <span
                      class="van-tag van-tag--plain van-hairline--surround"
                      style="color: rgb(255, 44, 44);"
                    >置顶</span>
                    <span
                      class="van-tag van-tag--plain van-hairline--surround"
                      style="color: rgb(68, 146, 255);margin-left:0.4rem"
                    >推荐</span>
                    <!---->
                  </div>
                </div>
                <div class="article-info">
                  <span class="article-time">{{item.published_time}}</span>
                  <span class="iconfont iconziyuan36">{{item.comment_count}}</span>
                </div>
              </div>
            </li>
            <li v-if="list.length == 0" style="text-align:center">暂无内容...</li>
          </ul>
        </van-tab>
        <van-tab title="社区生活">
          <ul>
            <li
              v-for="(item,index) in list"
              :key="index"
              @click="push(item.id)"
              v-if="list.length > 0"
            >
              <img :src="item.thumbnail" alt class="img1">
              <div class="article-cc">
                <div style="padding-bottom: 4px; overflow: hidden;">
                  <div style="overflow: hidden;">
                    <h4 class="article-item-title">{{item.post_title}}</h4>
                  </div>
                  <div style="float: right; margin-top: 2px;">
                    <span
                      class="van-tag van-tag--plain van-hairline--surround"
                      style="color: rgb(255, 44, 44);"
                    >置顶</span>
                    <span
                      class="van-tag van-tag--plain van-hairline--surround"
                      style="color: rgb(68, 146, 255);margin-left:0.4rem"
                    >推荐</span>
                    <!---->
                  </div>
                </div>
                <div class="article-info">
                  <span class="article-time">{{item.published_time}}</span>
                  <span class="iconfont iconziyuan36">{{item.comment_count}}</span>
                </div>
              </div>
            </li>
            <li v-if="list.length == 0" style="text-align:center">暂无内容...</li>
          </ul>
        </van-tab>
      </van-tabs>
    </div>
  </div>
</template>
<script>
import Vue from "vue";
import HeaderTop from "../../components/headerTop";
import { Tab, Tabs } from "vant";
Vue.use(Tab).use(Tabs);
export default {
  components: {
    HeaderTop
  },
  data() {
    return {
      list: [],
      lists: [],
      loading: false,
      finished: false,
      active: 0,
      showdata: ""
    };
  },
  methods: {
    push(id) {
      this.$router.push("content/" + id);
    },
    _qieHuang() {
      if (this.active == 0) {
        let vm = this;
        vm.$store.dispatch("communities/showAcrticle", {
          category_id: 74,
          pid: 11,
          scCallback(res) {
            if (res.code == 1) {
              vm.list = res.data;
            } else {
            }
          },
          afterCallback() {}
        });
      } else {
        let vm = this;
        vm.$store.dispatch("communities/showAcrticle", {
          category_id: 75,
          pid: 11,
          scCallback(res) {
            if (res.code == 1) {
              vm.list = res.data;
            } else {
            }
          },
          afterCallback() {}
        });
      }
    },
    _show() {
      let vm = this;
      vm.$store.dispatch("communities/pAcrticle", {
        category_id: 24,
        order: "post_like desc,comment_count desc",
        limit: "6",
        scCallback(res) {
          if (res.code == 1) {
            vm.lists = res.data;
          } else {
          }
        },
        afterCallback() {}
      });
    },
    _showhot() {
      let vm = this;
      vm.$store.dispatch("communities/showhot", {
        id: 4,
        scCallback(res) {
          if (res.code == 1) {
            vm.showdata = res.data;
          } else {
          }
        },
        afterCallback() {}
      });
    }
  },
  mounted() {
    this._qieHuang(0);
    this._show();
    // this._showhot();
  }
};
</script>
<style scoped lang="scss">
.Elderly {
  margin-bottom: 20px;
  .header-container {
    .left-container {
      display: flex;
      align-items: center;
      i {
        font-size: 1rem;
      }
      .left-title {
        font-size: 14px;
        padding-left: 6px;
        color: #fff;
      }
    }
  }
  .Elderly-top {
    background: #fff;
    margin: 0.6rem 0.6rem 0 0.6rem;
    border-radius: 0.625rem;
    .img {
      height: 5.375rem;
      background: url("../../assets/Snipaste.png");
      background-size: 100% 5.375rem;
      position: relative;
      .span1 {
        color: #ffffff;
        font-size: 0.8125rem;
        background: #4492ff;
        display: inline-block;
        padding: 4px;
        margin: 1.4rem 0 0.4rem 1rem;
      }
      .span2 {
        position: absolute;
        font-size: 0.8125rem;
        color: #ffffff;
        right: 1.2rem;
        top: 0.6rem;
      }
      p {
        font-size: 0.9375rem;
        margin: 0;
        color: #ffffff;
        padding-left: 1rem;
      }
    }
    .ul {
      position: relative;
      ul::after {
        content: "";
        border-left: 1px solid #f0f0f0;
        position: absolute;
        height: 122px;
        right: 50%;
      }
      ul {
        width: 100%;
        display: flex;
        justify-content: flex-start;
        flex-direction: row;
        flex-wrap: wrap;
        li {
          width: 46%;
          font-size: 0.9375rem;
          height: 2.5rem;
          line-height: 2.5rem;
          padding-left: 4%;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
          &:nth-child(3) {
            border-top: 1px solid #f0f0f0;
            border-bottom: 1px solid #f0f0f0;
          }
          &:nth-child(4) {
            border-top: 1px solid #f0f0f0;
            border-bottom: 1px solid #f0f0f0;
          }
        }
      }
    }
  }
  .Elderly-center {
    border-radius: 0.625rem;
    margin: 0.8rem 0.6rem 0 0.6rem;
    background: #fff;
    /deep/.van-tabs__line {
      background: #4492ff;
    }
    /deep/ .van-tab--active {
      color: #4492ff;
      font-weight: bold;
      font-size: 1rem;
    }
    /deep/ .van-ellipsis {
      font-weight: bold;
      font-size: 1rem;
    }
    ul {
      li {
        padding: 0.8rem 0.6rem;
        border-bottom: 1px solid #eeeeee;
        img {
          width: 7rem;
          height: 5.8rem;
          margin-right: 0.6rem;
          border-radius: 0.2rem;
          float: left;
        }
        .article-cc {
          margin: 0;
          overflow: hidden;
          height: 5.8rem;
          position: relative;
          .article-info {
            overflow: hidden;
            color: grey;
            position: absolute;
            padding: 1px 0;
            font-size: 0.7rem;
            bottom: 0;
            width: 100%;
            .article-time {
              margin-right: 4px;
              font-size: 0.6rem;
              color: grey;
            }
            /deep/ .iconziyuan36:before {
              font-size: 0.7rem;
              padding-right: 0.2rem;
            }
            .iconziyuan36 {
              font-size: 0.7rem;
              margin-right: 0.6rem;
              float: right;
            }
          }
          .article-item-title {
            font-size: 0.9375rem;
            color: #333333;
            margin: 0;
            padding: 0;
            overflow: hidden;
            display: -webkit-box;
            -webkit-box-orient: vertical;
            -webkit-line-clamp: 1;
          }
        }
      }
    }
  }
}
</style>

