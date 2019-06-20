<template>
  <div class="fillMessage">
    <HeaderTop>
      <div class="left-container" slot="left">
        <router-link tag="i" to="/login" class="iconfont iconzuojiantou"></router-link>
        <span>填写资料</span>
        <!-- <i @click="_jump" class="iconfont icon-fanhui"></i> -->
      </div>
      <div class="center-container" slot="center"></div>
      <div class="right-container" slot="right"></div>
    </HeaderTop>
    <div class="tupian-container">
      <van-uploader :after-read="onRead">
        <div class="img-box">
          <i v-if="!isShow" class="iconfont iconxiangji"></i>
          <img v-show="isShow" class="head-img" src ref="goodsImg">
        </div>
        <p>添加头像</p>
      </van-uploader>
    </div>
    <div class="fillCenter">
      <van-cell-group>
        <van-field
          v-model="username"
          clearable
          label="昵称"
          placeholder="请输入您的昵称"
          @click-right-icon="$toast('question')"
        />
        <div class="radio">
          <div class="van-cell__title van-field__label">
            <span>性别</span>
          </div>
          <div class="van-field__body">
            <van-radio-group v-model="radio">
              <van-radio name="1">男</van-radio>
              <van-radio name="2">女</van-radio>
            </van-radio-group>
          </div>
        </div>
        <van-field v-model="age" clearable label="生日" placeholder="请输入您的生日" @click="birth"/>
      </van-cell-group>
      <!-- 时间控件 -->
      <van-popup v-model="show" position="bottom">
        <van-datetime-picker
          v-model="currentDate"
          type="date"
          :min-date="minDate"
          @cancel="_Cancel"
          @confirm="_Confirm"
          title="生日日期"
        />
      </van-popup>

      <van-button class="button2" @click="wancheng">完成</van-button>
    </div>
  </div>
</template>
<script>
import Vue from "vue";
import HeaderTop from "../../components/headerTop";
import storage from "@/utils/storage";
import {
  Field,
  Button,
  RadioGroup,
  Radio,
  Uploader,
  DatetimePicker,
  Popup,
  Toast
} from "vant";
Vue.use(Field);
Vue.use(Button);
Vue.use(RadioGroup);
Vue.use(Radio);
Vue.use(Uploader);
Vue.use(DatetimePicker);
Vue.use(Popup);
Vue.use(Toast);
export default {
  components: {
    HeaderTop
  },
  data() {
    return {
      radio: "1",
      username: "",
      age: "",
      isShow: false,
      minDate: new Date(),
      maxDate: new Date(2019, 10, 1),
      currentDate: new Date(),
      show: false,
      imgUrl: ""
    };
  },
  methods: {
    // 选择图片后执行
    onRead(file) {
      //将原图片显示为选择的图片
      this.$refs.goodsImg.src = file.content;
      this.isShow = true;

      var formData = new FormData();
      formData.append("content", file.content);
      formData.append("name", file.file.name);
      formData.append("size", file.file.size);

      var token = storage.localGet("token");
      fetch("https://klzz.hualinginfo.com/api/user/upload/base64_one", {
        method: "post",
        headers: {
          "XX-Token": token,
          "XX-Device-Type": "wxapp"
        },
        body: formData
      })
        .then(response => response.json())
        .catch(error => console.error("Error:", error))
        .then(response => {
          console.log(response.data.url);
          this.imgUrl = response.data.url;
        });
    },
    upDian(file) {
      // this.$refs['files'].click()
      //  console.log(file);
      //将原图片显示为选择的图片
      this.$refs.goodsImg.src = file.content;
      this.isShow = true;
    },

    wancheng() {
      console.log(this.radio);
      if (this.radio == 1) {
        var gender = 1;
      } else {
        var gender = 2;
      }
      var vm = this;
      vm.$store.dispatch("fillMessage/pushZiLioa", {
        data: {
          user_nickname: vm.username,
          sex: gender,
          birthday: vm.age,
          avatar: this.imgUrl
        },
        scCallback(res) {
          Toast(res.msg);
        },
        afterCallback(res) {}
      });
    },
    //时间弹窗
    birth() {
      this.show = !this.show;
    },
    _Confirm: function(value) {
      this.age = this.formatDateTime(value);
      this.show = false;
      console.log(this.age);
    },
    _Cancel: function() {
      this.show = false;
    },
    //中国标准时间转换
    formatDateTime(date) {
      var y = date.getFullYear();
      var m = date.getMonth() + 1;
      m = m < 10 ? "0" + m : m;
      var d = date.getDate();
      d = d < 10 ? "0" + d : d;
      return y + "-" + m + "-" + d;
    }
  }
};
</script>
<style lang="scss" scoped>
.fillMessage {
  padding: 0rem 2.375rem 2.8125rem 2.375rem;
  /deep/ .iconfont {
    font-size: 1.125rem;
    margin-right: 0.625rem;
  }
  .van-cell:not(:last-child)::after {
    border: none;
  }
  .van-cell,
  .radio {
    border-bottom: 1px solid #ebedf0;
    margin-bottom: 1.4rem;
  }
  .van-popup {
    width: 100%;
  }
  /deep/ .left-container span {
    font-size: 1.0625rem;
  }
  .tupian-container {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 100%;
    padding: 0rem 0rem 2.7813rem 0rem;
    margin-top: 1.75rem;
    .van-uploader {
      display: flex;
      justify-content: center;
      align-items: center;
      flex-direction: column;
      border-radius: 50%;
      .img-box {
        width: 4.3125rem;
        height: 4.3125rem;
        display: flex;
        justify-content: center;
        align-items: center;
        background: #d7d7d7;
        border-radius: 50%;
        img {
          width: 100%;
          height: 100%;
          border-radius: 50%;
        }
        .iconfont {
          font-size: 2.5rem;
          color: #fff;
          margin-right: 0rem;
        }
      }
      p {
        font-size: 0.875rem;
        color: #333333;
        margin-top: 0.625rem;
      }
    }
  }
  .radio {
    position: relative;
    display: flex;
    width: 100%;
    overflow: hidden;
    box-sizing: border-box;
    color: #323233;
    font-size: 14px;
    line-height: 24px;
    background-color: #fff;
    padding: 10px 15px;
    .van-radio-group {
      display: inline-flex;
      width: 100%;
    }
    .van-radio {
      flex-grow: 1;
    }
    .van-field__body {
      display: inline-flex;
      flex-grow: 1;
    }
    .van-field__label {
      flex-grow: 1;
    }
  }
  .button2 {
    height: 2.8125rem;
    width: 100%;
    background: #a0c4fa;
    font-size: 1rem;
    color: #fff;
    margin-top: 2.2rem;
    border-radius: 0.25rem;
  }

  /deep/ .van-radio__label {
    margin-right: 20%;
  }
}
</style>
<style>
body {
  background: #fff;
}
</style>
