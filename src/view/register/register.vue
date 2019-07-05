<template>
  <section class="register-container">
    <div class="container">
      <HeaderTop>
        <div class="left-container" slot="left">
          <router-link tag="i" to="/NewLogin" class="iconfont icon-fanhui">注册</router-link>
          <!-- <i @click="_jump" class="iconfont icon-fanhui"></i> -->
        </div>
        <div class="center-container" slot="center"></div>
        <div class="right-container" slot="right"></div>
      </HeaderTop>
      <section class="register-box">
        <ul class="pwdLoginUl">
          <p class="title">新用户注册</p>
          <li class="phone-li">
            <input type="text" placeholder="请输入11位手机号码" v-model="phone" @input="handleInput">
            <i class="iconfont iconquxiao" v-if="phone" @click="phone = ''"></i>
          </li>
          <li class="pwd-li">
            <input type="password" maxlength="8" placeholder="请输入密码，6-16个字符" v-model="pwd">
            <i class="iconfont iconquxiao" v-if="pwd" @click="pwd = ''"></i>
          </li>
          <li class="code-li">
            <input type="text" placeholder="请输入验证码" v-model="codeText">
            <span
              class="yanzheng"
              @click="getCode"
            >{{time>0 ? `${time}秒后重新发送` : '获取验证码'}}</span>
          </li>
          <p class="code-p" v-if="time>0">
            <i class="iconfont icon-xuanze"></i>
            验证码已发送，请耐心等待
          </p>
        </ul>
        <div class="xieyi">
          <label for @click="isAgree = !isAgree">
            <i class="iconfont icondui" :class="{dui:isAgree}"></i>
          </label>
          <p>
            同意
            <router-link tag="span" to class="yonghu">《用户服务协议》</router-link>
          </p>
        </div>
        <div class="btn-container">
          <!-- <div class="btn" :class="{btnColor: phone || pwd}" @click="_register">注册</div> -->
          <van-button class="btn" :class="{btnColor: phone || pwd}" :loading="isLogin" @click="_register" loading-text="注册中">{{!isLogin && '立即注册'}}</van-button>
        </div>
      </section>
    </div>
  </section>
</template>

<script>
import HeaderTop from "../../components/headerTop";
import Vue from "vue";
import {
  Button,
  Toast
} from "vant";
Vue.use(Button);
Vue.use(Toast)
export default {
  components: {
    HeaderTop
  },
  data() {
    return {
      pwd: "",
      phone: "",
      computeTime: 0,
      codeText: "",
      isAgree: true,
      time:0,
      isLogin:false
    };
  },
  methods: {
    // _jump(){
    //     this.$router.go(-1);
    // },
    handleInput(e) {
      this.phone = e.target.value.replace(/[^\d]/g, "");
    },
    _register() {
      // let vm = this;
      // let isPss = vm._phoneValidation();
      // if(!isPss) {return};
      // if (!vm.pwd) {
      //     return vm.$toast('密码不能为空');
      // }
      // if (!vm.codeText) {
      //     return vm.$toast('验证码不能为空');
      // }
      // if (!vm.isAgree) {
      //     return vm.$toast('请先同意用户服务协议!');
      // }else{
      //     this.$router.push({ path:'/setName'})
      // }
      let vm = this;
      let isPss = vm._phoneValidation();
      if (!isPss) {
        return;
      }
      if (!vm.pwd) {
        return vm.$toast("密码不能为空");
      }
      if (!vm.codeText) {
        return vm.$toast("验证码不能为空");
      }
      // if (vm.codeText != vm.code) {
      //     return vm.$toast('验证码不正确');
      // }
      if (!vm.isAgree) {
        return vm.$toast("请先同意用户服务协议!");
      }
      vm.isLogin = true;
      vm.$store.dispatch("register/register", {
        data: {
          username: vm.phone,
          password: vm.pwd,
          verification_code: vm.codeText
        },
        scCallback(res) {
          vm.isLogin = false;
          console.log(res);
          if (res.code == 1) {
            vm.$router.push("/");
            Toast("注册成功");
          } else if (res.code == 10001) {
            Toast("请您先登录");
          } else {
            Toast(res.msg);
          }
        },
        afterCallback(res) {
          vm.isLogin = false;
          //vm.$toast('登录失败,请重新登录');
        }
      });
    },
    _phoneValidation() {
      if (!this.phone) {
        this.$toast("手机号码不能为空");
        return false;
      }
      if (!/^[1][3,4,5,7,8][0-9]{9}$/.test(this.phone)) {
        this.$toast("请输入正确的手机号码");
        return false;
      }
      return true;
    },
    getCode() {
      // let vm = this;
      // let isPss = vm._phoneValidation();
      // if(!isPss) {
      //     return
      // }else{
      //     //如果当前没有计时
      //     if(!this.computeTime){
      //         //启动倒计时
      //         this.computeTime = 120
      //         this.intervalId = setInterval(()=>{
      //             this.computeTime--
      //             if(this.computeTime<=0){
      //                 //停止计时
      //                 clearInterval(this.intervalId)
      //             }
      //         },1000)
      //     }
      // }
      let vm = this;
      let isPss = vm._phoneValidation();
      if (!isPss) {
        return;
      }else{
        // vm.sendAuthCode = true;
          if(!vm.time){
            vm.time = 60;
            var auth_timetimer = setInterval(() => {
              vm.time--;
              if (vm.time <= 0) {
                // vm.sendAuthCode = false;
                clearInterval(auth_timetimer);
              }
            }, 1000);
            vm.$store.dispatch("register/getCodeMsg", {
            data: {
              phone: vm.phone
            },
            scCallback(res) {
              if (res.code == 1) {
                Toast(res.msg);
              } else if (res.code == 10001) {
                Toast("请先登录");
              } else {
                Toast(res.msg);
              }
            },
            afterCallback() {}
          });
          }
      }
    }
  }
};
</script>

<style lang="scss" scoped>
.register-container {
  .container {
    position: fixed;
    width: 80%;
    left: 10%;
    top: 12%;
    .header {
      height: auto;
      .icon-fanhui {
        font-size: 1.0625rem;
      }
      .icon-fanhui:before {
        margin-right: 0.625rem;
        font-size: 1rem;
      }
    }
  }
  width: 100%;
  height: 100%;
  .register-box {
    width: 100%;
    background: #fff;
    .pwdLoginUl {
      width: 100%;
      .title {
        color: #333333;
        font-size: 1.125rem;
        font-weight: Bold;
        margin: 0;
        margin: 0 0 2.4rem 0;
      }
      li:last-child{
        margin-bottom: 0;
      }
      li {
        display: flex;
        align-items: center;
        border-bottom: 1px solid #ebedf0;
        margin-bottom: 1.8rem;
        input {
          flex: 1;
          height: 2.375rem;
          border: none;
          font-size: 1rem;
          color: #333;
        }
        .iconquxiao:before {
          color: #d4d4d4;
        }
        input::-webkit-input-placeholder,
        input:-moz-placeholder,
        input::-moz-placeholder,
        input:-ms-input-placeholder {
          color: rgba(191, 191, 191, 1);
          font-size: 1rem;
          font-weight: 400;
        }
        ::-webkit-input-placeholder {
          /* WebKit, Blink, Edge */
          color: #bfbfbf;
        }
        :-moz-placeholder {
          /* Mozilla Firefox 4 to 18 */
          color: #bfbfbf;
        }
        ::-moz-placeholder {
          /* Mozilla Firefox 19+ */
          color: #bfbfbf;
        }
        :-ms-input-placeholder {
          /* Internet Explorer 10-11 */
          color: #bfbfbf;
        }
        .yanzheng {
          display: flex;
          justify-content: center;
          align-items: center;
          min-width: 4.8125rem;
          height: 1.75rem;
          color: #4492ff;
          font-size: 0.6875rem;
          border: 0.0625rem solid #4492ff;
          border-radius: 0.25rem;
          padding: 0rem 0.5rem;
        }
        .icon-quxiao {
          font-size: 1.2813rem;
          color: #d4d4d4;
        }
      }
      .code-p {
        color: #4492ff;;
        font-size: 0.6875rem;
        .icon-xuanze {
          font-size: 0.75rem;
          color: #4492ff;
          margin-right: 0.1875rem;
        }
      }
    }
    .btn-container {
      width: 100%;
      margin-top: 2.2rem;
      .btn {
        display: flex;
        justify-content: center;
        align-items: center;
        width: 100%;
        height: 2.8125rem;
        background: #a0c4fa;
        border-radius: 0.25rem;
        color: #fff;
        font-size: 1rem;
      }
      .btnColor {
        background: #4492ff;
      }
    }
    .xieyi {
      width: 100%;
      display: flex;
      font-size: 0.75rem;
      color: #666666;
      align-items: center;
      margin-top:0.3rem;
      line-height: 1.25rem;
      font-size: 0.875rem;
      .icon-ziyuan44 {
        font-size: 0.75rem;
        color: #999999;
        margin-right: 0.375rem;
      }
      .dui {
        color: #4492ff;
      }
      .icondui{
        padding-right: 0.5rem;
        font-size: 1.3rem;
      }
      .yonghu,
      .yinsi {
        color: #4492ff;
      }
    }
  }
}
</style>
<style>
body {
  background: #fff !important;
}
</style>
