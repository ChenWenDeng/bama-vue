<template>
  <section class="expertVideo-container">
    <HeaderTop>
      <div class="left-container" slot="left">
        <router-link tag="i" to="/expert" class="iconfont icon-fanhui"></router-link>
      </div>
      <!-- <div class="search-container" slot="center">{{expertVideoList[0].category}}</div> -->
      <div
        class="search-container"
        slot="center"
        v-for="(item,index) in expertVideoList[0]"
        :key="index"
      >{{item.category}}</div>
      <div class="right-container" slot="right"></div>
    </HeaderTop>
    <section class="expertVideo-box">
      <ul>
        <!-- <van-list
                :loading="loading"
                :finished="finished"
                finished-text="没有更多了"
                @load="this.init"
        >-->
        <li
          v-for="(item,index) in expertVideoList"
          :key="index"
          @click="jumpExpertVideoDetails(item)"
        >
          <div class="video-div">
            <img :src="item.thumbnail" alt />
            <div class="mask">
              <i class="iconfont icon-play"></i>
            </div>
          </div>
          <div class="bottom-container">
            <div>{{item.post_title}}</div>
            <!-- <p>张三 人民医院 风湿免疫科 主治医师</p> -->
          </div>
        </li>
        <!-- </van-list> -->
      </ul>
    </section>
  </section>
</template>

<script>
import { mapGetters, mapActions } from "Vuex";
import HeaderTop from "../../components/headerTop";
export default {
  name: "expertVideo",
  components: {
    HeaderTop
  },
  data() {
    return {
      datas: 0
    };
  },
  mounted() {
    this.datas = this.$route.query.id;
    this.init();
  },
  computed: {
    ...mapGetters("expertVideo", ["expertVideoList"]),
    loading() {
      return this.$store.state.expertVideo.loading;
    },
    finished() {
      return this.$store.state.expertVideo.finished;
    }
  },
  methods: {
    // ...mapActions('expertVideo',[
    //     'getExpertVideo'
    // ]),
    init() {
      let vm = this;
      vm.$store.dispatch("expertVideo/getExpertVideo", {
        data: {
          id: vm.datas
        }
      });
    },
    jumpExpertVideoDetails(val) {
      let id = val.post_id;
      console.log(id);
      this.$router.push({
        path: "/expertVideoDetails",
        query: {
          id: id
        }
      });
    }
  }
};
</script>

<style lang="scss" scoped>
.expertVideo-container {
  width: 100%;
  min-height: 660px;
  background: #f4f4f4;
  .header-container {
    background: #f4f4f4 !important;
    border-bottom: 0.0625rem solid #ddd;
    .left-container {
      .iconfont {
        color: #fff;
        width: 0.625rem;
        height: 1.0938rem;
      }
    }
    .search-container {
      color: #fff !important;
      font-weight: bold;
    }
  }
  .expertVideo-box {
    width: 100%;
    // margin-top: 2.75rem;
    // padding: 0.625rem 0.625rem 1.25rem 0.625rem;
    ul {
      // display: flex;
      // flex-wrap: wrap;
      padding-top: 5%;
      background: #fff;
      li {
        display: flex;
        // flex-direction: column;
        align-items: center;
        background: #fff;
        padding: 0 5% 5% 5%;
        border-radius: 0.25rem;
        // float: left;
        // iframe{
        //     width: 100%;
        //     height: 6.5625rem;
        // }
        .video-div {
          width: 40%;
          position: relative;
        }
        img {
          height: 6rem;
          width: 100%;
        }
        .mask {
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          display: flex;
          justify-content: center;
          align-items: center;
          background: rgba(0, 0, 0, 0.5);
          .iconfont {
            color: #fff;
            font-size: 1.875rem;
          }
        }
        .bottom-container {
          width: 60%;
          // padding: 0.625rem;
          div {
            width: 100%;
            height: 50px;
            color: #333333;
            font-size: 0.9375rem;
            // padding-bottom: 0.5625rem;
            line-height: 1.5625rem;
            white-space: initial;
            overflow: hidden;
            text-overflow: ellipsis;
            display: -webkit-box;
            -webkit-line-clamp: 2;
            -webkit-box-orient: vertical;
            color: #333333;
            text-align: left;
            padding-left: 2.5%;
          }
          p {
            font-size: 8px;
            color: #666666;
            line-height: 0.9375rem;
          }
        }
      }
    }
  }
  .router-slid-enter-active,
  .router-slid-leave-active {
    transition: all 0.4s;
  }
  .router-slid-enter,
  .router-slid-leave-active {
    transform: translate3d(2rem, 0, 0);
    opacity: 0;
  }
}
</style>






