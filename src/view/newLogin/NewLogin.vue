<template>
  <div class="login">
    <HeaderTop>
      <div class="left-container" slot="left">
        <router-link tag="i" to="/login" class="iconfont iconzuojiantou"></router-link>
        <span class="left-title">登录</span>
        <!-- <i @click="_jump" class="iconfont icon-fanhui"></i> -->
      </div>
      <div class="center-container" slot="center"></div>
      <div class="right-container" slot="right"></div>
    </HeaderTop>
    <div class="logina">
      <h1>验证码快捷登录</h1>
      <van-cell-group>
        <van-field
          v-model="phone"
          center
          clearable
          :error-message="phoneErr"
          placeholder="请输入手机号码"
          @input="inputPhone"
          class="iconfont iconziyuan41"
        ></van-field>
        <van-field
          v-model="code"
          center
          clearable
          :error-message="codeErr"
          placeholder="请输入验证码"
          @input="inputCode"
          class="iconfont iconziyuan42"
        >
          <van-button
            class="button1"
            slot="button"
            size="small"
            type="primary"
            :disabled="btnState"
            @click="clickBtn"
          >{{btnText}}</van-button>
        </van-field>
      </van-cell-group>
      <div class="btn-container">
        <div class="left-box">
          <van-checkbox v-model="checked">同意</van-checkbox>
          <span class="span1">《用户服务协议》</span>
        </div>
        <span class="div1" @click="regiser">立即注册</span>
      </div>

      <!-- <van-button type="default" @click="login" class="button2">登录</van-button> -->
      <van-button
        class="button2"
        :loading="isLogin"
        @click="login"
        loading-text="登录中"
        :class="{btnColor: phone || code}">{{!isLogin && '登录'}}</van-button>
    </div>
  </div>
</template>

<script>
import Vue from "vue";
import { getCode, newLogin } from "../../api/user";
import {
  Button,
  Cell,
  CellGroup,
  Field,
  Toast,
  RadioGroup,
  Radio,
  Checkbox,
  CheckboxGroup
} from "vant";
import HeaderTop from "../../components/headerTop";
Vue.use(RadioGroup);
Vue.use(Radio);
Vue.use(Checkbox);
Vue.use(CheckboxGroup);
Vue.use(Toast);
export default {
  name: "NewLogin",
  components: {
    [Button.name]: Button,
    [Cell.name]: Cell,
    [CellGroup.name]: CellGroup,
    [Field.name]: Field,
    HeaderTop
  },
  data() {
    return {
      phone: "",
      code: "",
      btnText: "发送验证码",
      btnState: false,
      phoneErr: "",
      codeErr: "",
      time: 60,
      radio: "0",
      checked: false,
      isLogin: false //是否在登录中
    };
  },
  methods: {
    inputPhone() {
      this.phone && (this.phoneErr = "");
    },
    inputCode() {
      console.log(this.code);
      this.code && (this.codeErr = "");
    },
    clickBtn() {
      let vm = this;
      let isPss = vm._phoneValidation();
      if (!isPss) {
        return;
      }

      vm.$store.dispatch("NewLogin/codeMsg", {
        data: {
          phone: vm.phone
        }
      });
      vm.btnState = true;
      vm.time = 60;
      var auth_timetimer = setInterval(() => {
        vm.time--;
         vm.btnText =  vm.time + "s";
        if (vm.time <= 0) {
          vm.btnState = false;
           vm.btnText = "发送验证码";
          clearInterval(auth_timetimer);
        }
      }, 1000);
    },
    //跳转注册
    regiser() {
      this.$router.push({
        path: "register",
        name: "register"
      });
    },
    //手机验证
    _phoneValidation() {
      if (!this.phone) {
        Toast("手机号码不能为空");
        return false;
      }
      if (!/^[1][3,4,5,7,8][0-9]{9}$/.test(this.phone)) {
        Toast("请输入正确的手机号码");
        return false;
      }
      return true;
    },
    login() {
      console.log(this.checked);
      let vm = this;
      let isPss = vm._phoneValidation();
      if (!isPss) {
        return;
      }
      if (!vm.code) {
        return Toast("验证码不能为空");
      }
      if (vm.checked == false) {
        return Toast("请先同意用户服务协议!");
      }
      vm.isLogin = true;
      vm.$store.dispatch("NewLogin/login", {
        data: {
          username: vm.phone,
          // password: vm.pwd,
          verification_code: vm.code
        },
        scCallback(res) {
          console.log(res);
          vm.isLogin = false;
          //登录成功后进行的步骤
          //this.$router.push('/home');//可以跳转
          if (res.code == 1) {
            if (vm.$route.query.redirect == undefined) {
              vm.$router.push("/");
            } else {
              vm.$router.push(vm.$route.query.redirect);
            }
          } else {
            Toast(res.msg);
          }
        },
        afterCallback(err) {
          vm.isLogin = false;
          // vm.$toast('登录失败,请重新登录');
        }
      });
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.login {
  background: #fff;
  height: 100%;
  /deep/ .iconzuojiantou:before {
    font-size: 1rem;
  }
  .header-container {
    .left-container {
      display: flex;
      align-items: center;
      i {
        font-size: 1.125rem;
      }
      .left-title {
        font-size: 1.0625rem;
      }
    }
  }
  .iconzuojiantou {
    margin-right: 0.625rem;
  }
  .logina {
    // position: fixed;
    // width: 80%;
    // left: 10%;
    // top: 20%;
    .van-hairline--top-bottom::after,
    .van-cell:not(:last-child)::after {
      border: none;
    }
    padding: 2.8125rem 2.375rem;
    /deep/ .van-field__control {
      font-size: 1rem;
      color: #333;
    }
    /deep/ .van-field__control::-webkit-input-placeholder,
    /deep/ .van-field__control:-moz-placeholder,
    /deep/ .van-field__control::-moz-placeholder,
    /deep/ .van-field__control:-ms-input-placeholder {
      color: red;
      font-size: 1rem;
    }
    h1 {
      font-size: 1.125rem;
      margin:0 0 2.4rem 0;
    }
    .button1 {
      display: flex;
      justify-content: center;
      align-items: center;
      width: 4.8125rem;
      // height: 28.5px;
      border: 1px solid #237bff;
      border-radius: 4px;
      background: none;
      color: #237bff;
    }
    .button2 {
      height: 2.8125rem;
      width: 100%;
      background: #a0c4fa;
      font-size: 1rem;
      color: #fff;
      margin-top: 2.2rem;
      border-radius: 0.25rem;
      &.btnColor{
        background: #4492ff;
      }
    }
    .iconziyuan41:before,
    .iconziyuan42:before {
      font-size: 1.25rem;
      color: #999999;
    }
    .van-cell--center {
      padding-left: 0;
      border-bottom: 1px solid #ebedf0;
      margin-bottom: 1.8rem;
    }
    .van-cell--center:last-child{
      margin-bottom: 0;
    }
    .van-radio-group {
      display: inline-flex;
      margin: 6% 0;
      width: 100%;
    }
    .van-radio {
      flex-grow: 1;
    }
    .span1 {
      color: #237bff;
      font-size: 0.8125rem;
    }
    .div1 {
      flex-grow: 1;
      text-align: right;
      font-size: 0.8125rem;
    }
    .btn-container {
      width: 100%;
      display: flex;
      justify-content: space-between;
      padding: 0.9rem 0rem;
      .left-box {
        display: flex;
        align-items: center;
      }
    }
  }
}
</style>
<style lang="scss">
body {
  background: #fff !important;
}
.van-checkbox {
  display: flex;
  align-items: center !important;
}
.van-checkbox__label {
  font-size: 0.8125rem;
}
.van-icon-success {
  width: 0.9375rem;
  height: 0.9375rem;
  font-size: 0.9375rem;
}
.iconziyuan41::before,
.iconziyuan42::before {
  margin-right: 0.625rem;
}
.van-field {
  padding-right: 0rem;
}
</style>
