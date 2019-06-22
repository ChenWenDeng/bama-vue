<template>
  <div class="container user-box">
    <div class="head-info" @click="toUserInfo">
      <div class="head-img">
        <img :src="userList.avatar" class="avatar">
      </div>
      <div class="head-user-info">
        {{ userList.user_nickname }}
        <br>
        <span class="user-level">普通会员</span>
      </div>
    </div>
    <van-cell-group>
      <van-cell
        v-for="item in menu"
        :icon="item.icon"
        :key="item.id"
        :title="item.title"
        is-link
        :value="item.value"
        @click="jump(item.path)"
      />
    </van-cell-group>

    <footer-cc></footer-cc>
  </div>
</template>

<script>
import Vue from "vue";
import { mapGetters, mapMutations, mapActions } from "vuex";

import { Cell, CellGroup, Notify ,Toast} from "vant";
import storage from "@/utils/storage";

Vue.use(Cell).use(CellGroup).use(Toast);

Vue.use(Notify);

export default {
  name: "User",
  data(){
      return{
          userList:[]
      }
  },

  computed: {
    ...mapGetters("user", ["token", "userInfo", "auth", "menu"]),
    userInfoss() {
      return this.$store.state.user.userInfo;
    }
  },
  mounted() {
    // var token = storage.localGet("token");
    // fetch("https://klzz.hualinginfo.com/api/user/profile/userInfo", {
    //     method: "get",
    //     headers: {
    //       "XX-Token": token,
    //       "XX-Device-Type": "wxapp"
    //     },
    //   })
    //     .then(response => response.json())
    //     .catch(error => console.error("Error:", error))
    //     .then(response => {
    //       if(response.code==10001){
    //         this.$router.push("/login")
    //       }
    //       this.userList = response.data
    //     });
    this.init()
  },
  created() {},
  watch: {},
  methods: {
    //初始化
    init(){
      var vm = this
      vm.$store.dispatch("user/getUserInfo", {
          scCallback(res) {
            if (res.code == 1) {
              vm.userList = res.data
              console.log(vm.userList)
            } else if(res.code == 10001){
              Toast('请先登录')
            } else{
              Toast(res.msg)
            }
          },
          afterCallback() {}
      });
    },
    toUserInfo() {
      this.$router.push({
        name: "userInfo"
      });
    },
    jump(name) {
      this.$router.push({
        name: name
      });
    }
  }
};
</script>

<style type="text/css">
.user-box .van-cell-group .van-cell,
.user-box .van-cell-group .van-icon {
  font-size: 1rem;
}

.user-box .van-cell-group .van-cell {
  padding-top: 15px;
  padding-bottom: 15px;
}

.user-box .head-info {
  overflow: hidden;
  padding: 38px 30px;
  background: #398bff;
  position: relative;
}

.user-box .head-img {
  float: left;
  margin-right: 20px;
}

.user-box .head-user-info {
  float: left;
  color: white;
  font-size: 1.3rem;
  padding-top: 8px;
}

.user-box .avatar {
  width: 70px;
  height: 70px;
  border-radius: 50%;
}

.user-box .head-user-info .user-level {
  font-size: 0.8rem;
}
</style>