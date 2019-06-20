<template>
  <div class="registration">
    <HeaderTop>
      <div class="left-container" slot="left">
        <router-link tag="i" to="/doctorTeam" class="iconfont iconzuojiantou"></router-link>
        <!-- <i @click="_jump" class="iconfont icon-fanhui"></i> -->
      </div>
      <div class="center-container" slot="center">预约</div>
      <div class="right-container" slot="right"></div>
    </HeaderTop>
    <p>预约信息</p>
    <div class="bottom">
      <van-cell-group>
        <van-field v-model="doctor" clearable label="预约医生" placeholder="请选择" @click="regist"/>
        <van-field clearable label="患者姓名" placeholder="请输入您的姓名" v-model="name"/>
        <van-field v-model="phone" clearable label="患者联系方式" placeholder="请输入您的手机号码"/>
        <van-field center clearable label="验证码" class="iconfont iconziyuan42">
          <van-button
            class="button1"
            slot="button"
            size="small"
            type="primary"
            @click="clickBtn"
          >{{codeText}}</van-button>
        </van-field>
      </van-cell-group>
    </div>
    <div class="btna">
      <van-button type="default" @click="commit">提交</van-button>
    </div>
    <van-popup v-model="show" position="bottom">
      <van-picker
        show-toolbar
        title="选择医生"
        :columns="columns"
        @cancel="_Cancel"
        @confirm="_Confirm"
      />
    </van-popup>
  </div>
</template>
<script>
import Vue from "vue";
import HeaderTop from "../../components/headerTop";
import { Field, Button, Picker, Popup, Toast } from "vant";
Vue.use(Field)
  .use(Button)
  .use(Picker)
  .use(Popup)
  .use(Toast);
export default {
  components: {
    HeaderTop
  },
  data() {
    return {
      phone: "",
      show: false,
      doctor: "",
      columns: [
        "李泽焰",
        "刘广伟",
        "张全",
        "颜智静",
        "项金明",
        "尚栋梁",
        "赵珍",
        "葛灏",
        "王甫",
        "樊晨光",
        "张景福",
        "李勋"
      ],
      time: 60,
      codeText: "获取验证码",
      name: ""
    };
  },
  methods: {
    regist() {
      this.show = !this.show;
    },
    _Cancel() {
      this.show = false;
    },
    //选择医生
    _Confirm(value) {
      this.doctor = value;
      this.show = false;
    },
    //发送验证码
    clickBtn() {
      let that = this;
      let isPss = that.phoneValidation();
      if (!isPss) {
        return;
      }
      that.$store.dispatch("registration/getCode", {
        data: {
          phone: that.phone
        }
      });
      that.sendCode = true;
      that.time = 60;
      var myTimer = setInterval(() => {
        that.time--;
        that.codeText = that.time + "s";
        if (that.time <= 0) {
          that.sendAuthCode = false;
          that.codeText = "获取验证码";
          clearInterval(myTimer);
        }
      }, 1000);
    },
    //手机验证
    phoneValidation() {
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

    //提交
    commit() {
      let vm = this;
      if (!vm.name) {
        return Toast("姓名不能为空");
      }
      let isPass = vm.phoneValidation();
      if (!isPass) {
        return;
      }

      vm.$store.dispatch("common/registration", {
        name: this.name,
        mobile: this.phone,
        scCallback(res) {
          if (res.code == 1) {
            Toast(res.msg);
          } else {
            Toast(res.msg);
          }
        },
        afterCallback() {}
      });
    }
  }
};
</script>
<style lang="scss" scoped>
.registration {
  /deep/ .header-container {
    background: #fff;
    .center-container {
      color: rgba(51, 51, 51, 1);
    }
    .iconzuojiantou:before {
      color: #666666;
    }
  }
  .bottom {
    padding: 0 15px;
    /deep/ .van-cell .van-field__control {
      text-align: right;
    }
    /deep/ .van-cell:not(:last-child)::after {
      display: none;
    }
    /deep/ .van-cell {
      border-bottom: 1px solid #ebedf0;
    }
    /deep/ .van-button--primary {
      background: #fff;
      border: none;
      color: rgba(255, 156, 0, 1);
      font-weight: 400;
    }
    /deep/ .van-button--primary::before {
      background: #fff;
    }
  }
  .btna {
    text-align: center;
    /deep/ .van-button {
      background: #ff9c00;
      border-radius: 44px;
      height: 2.75rem;
      color: #fff;
      width: 80%;
      font-size: 1rem;
      margin-top: 5rem;
    }
  }
  p {
    font-size: 0.875rem;
    background: #f3f3f3;
    height: 2.75rem;
    line-height: 2.75rem;
    padding-left: 30px;
    color: #666666;
    margin: 0;
  }
  /deep/ .van-picker-column {
    z-index: 1;
    .van-picker-column__item--selected {
      color: #fff;
    }
  }
  /deep/ .van-picker__frame {
    background: #ff9c00;
    color: #fff;
    z-index: 0;
  }
  /deep/ .van-picker__cancel {
    color: #666666;
  }
  /deep/ .van-picker__confirm {
    background: #ffae00;
    border-radius: 24px;
    height: 1.6rem;
    line-height: 30px;
    color: #fff;
  }
  /deep/ .van-picker__toolbar {
    align-items: center;
    padding: 0 2%;
  }
}
</style>
<style>
body {
  background: #fff;
}
</style>

