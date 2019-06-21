<template>
  <div class="userInfo">
    <header-cc :title="title" left-text="返回"></header-cc>

    <div class="head-info">
      <div class="head-img">
        <!-- <van-uploader :after-read="onRead" accept="image/gif, image/jpeg, image/png" multiple>
          <img :src="userInfo.avatar" class="avatar">
        </van-uploader> -->
        <van-uploader :after-read="onRead1">
          <img  v-show="!userList.avatar" class="avatar" src="https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1560362023402&di=e2e7790926744f649e817b370e48111e&imgtype=0&src=http%3A%2F%2Fb-ssl.duitang.com%2Fuploads%2Fitem%2F201704%2F27%2F20170427155254_Kctx8.jpeg" ref="goodsImg"/>
          <img  class="avatar" v-if="userList.avatar" :src="userList.avatar" alt="" id="img">
        </van-uploader>
      </div>
    </div>

    <div class="user-info-box">
      <div class="user-info-item-left">昵称</div>
      <div class="user-info-item-right">
        <!-- <input @change="update" v-model="userInfo.user_nickname" maxlength="28"> -->
         <input @change="upLoad('nc')" v-model="userList.user_nickname" maxlength="28">
      </div>
    </div>
    <div class="user-info-box" @click="sexShow=!sexShow">
      <div class="user-info-item-left">性别</div>
      <!-- <div class="user-info-item-right">{{ sex[userInfo.sex] }}</div> -->
      <div class="user-info-item-right">{{ userList.sex == 1 ? '男' : userList.sex == 2 ? '女':'保密' }}</div>
    </div>
    <!-- <div class="user-info-box" @click="birthdayShow=!birthdayShow">
      <div class="user-info-item-left">生日</div>
      <div class="user-info-item-right">{{ format(userList.birthday) }}</div>
    </div> -->
		<div class="shengRi-container" @click="show=true">
			<span class="user-info-item-left">生日</span>
			<input type="text" v-model="shengRi">
		</div>
    <div class="user-info-box">
      <div class="user-info-item-left">身高 mm</div>
      <div class="user-info-item-right">
        <!-- <input @change="update" maxlength="4" v-model="userList.height"> -->
        <input @change="upLoad('sg')" v-model="userList.height" maxlength="28">
      </div>
    </div>
    <div class="user-info-box">
      <div class="user-info-item-left">体重 kg</div>
      <div class="user-info-item-right">
        <!-- <input @change="update" maxlength="6" v-model="userList.weight"> -->
         <input @change="upLoad('tz')" v-model="userList.weight" maxlength="28">
      </div>
    </div>

    <van-actionsheet v-model="sexShow" title="选择性别">
      <van-picker :columns="sex" :default-index="userInfo.sex" @change="sexUpdate"/>
       <!-- <van-picker :columns="sex" :default-index="userList.sex" @change="upLoad('xb')"/> -->
    </van-actionsheet>
		<van-popup v-model="show" position="bottom" :overlay="true">
			<van-datetime-picker
				v-model="currentDate2"
				type="date"
				@cancel="_cancel"
				 @confirm="_confirm"
			/>
		</van-popup>
  </div>
</template>

<script>
import Vue from "vue";
import { mapGetters, mapMutations, mapActions } from "vuex";
import {
  Cell,
  CellGroup,
  Notify,
  Uploader,
  Picker,
  Actionsheet,
  DatetimePicker,
	Popup 
} from "vant";
import storage from "@/utils/storage";
import { Toast} from 'vant';

Vue.use(Cell)
  .use(CellGroup)
  .use(Notify)
  .use(Uploader)
  .use(Picker)
  .use(Actionsheet)
  .use(DatetimePicker)
	.use(Popup );

export default {
  name: "UserInfo",
  computed: {
    ...mapGetters("user", ["token", "userInfo", "auth", "menu"]),
    title: () => {
      return document.title;
    }
  },

  created() {
  },
  mounted(){
    this.init()
  },
  data() {
    return {
      sex: ["保密", "男", "女"],
      sexShow: false,
      birthdayShow: false,
      userList:[],
      can:null,
			currentDate2: new Date(),
			show:false,
			shengRi:null
    };
  },
  methods: {
		//转日期
		formatTen(num) { 
			return num > 9 ? (num + "") : ("0" + num); 
		} ,
		//转日期
		formatDate(date) { 
			var year = date.getFullYear(); 
			var month = date.getMonth() + 1; 
			var day = date.getDate(); 
			var hour = date.getHours(); 
			var minute = date.getMinutes(); 
			var second = date.getSeconds(); 
			return year + "-" + this.formatTen(month) + "-" + this.formatTen(day); 
		},
		//取消按钮
    _cancel(){
    		this.show = false;
    },
		//确定按钮
		_confirm(value){
			this.shengRi = this.formatDate(value)
			this.upLoad('sr',this.formatDate(value))
			this.show = false
		},
    sexUpdate(picker, value, index) {
      this.userList.sex = index;
      console.log(value)
      if(value == '保密'){
        this.upLoad('xb',0)
      }else if(value == '男'){
        this.upLoad('xb',1)
      }else{
        this.upLoad('xb',2)
      }
      this.sexShow = !this.sexShow
    },
    update() {
      this.userInfoUpdate(this.userInfo);
    },
    ...mapMutations("user", ["userInfoUpdate"]),
    ...mapActions('common',[
            'loadType',
        ]),


    add0(m){return m<10?'0'+m:m },
    format(shijianchuo)
    {
    //shijianchuo是整数，否则要parseInt转换
    var time = new Date(shijianchuo);
    var y = time.getFullYear();
    var m = time.getMonth()+1;
    var d = time.getDate();
    return y+'-'+this.add0(m)+'-'+this.add0(d);
    },
    upLoad(type,value){
            let vm = this
            if(type == 'nc'){
              vm.loadType('nc')
              vm.can = vm.userList.user_nickname
            }else if(type == 'xb'){
              vm.loadType('xb')
              vm.can = value
            }else if(type == 'sr'){
              vm.loadType('sr')
              vm.can = value
            }else if(type == 'sg'){
              vm.loadType('sg')
              vm.can = vm.userList.height
            }else if(type == 'tz'){
              vm.loadType('tz')
              vm.can = vm.userList.weight
            }
            vm.$store.dispatch('common/xiuGaiName', {
                data: {
                    can: vm.can
                },
                scCallback(res) {
                    vm.isLogin = false
                    if(res.code == 1){
                        Toast(res.msg);
                    }else if(res.code == 10001){
                        Toast('请先登录');
                    }else{
                        Toast(res.msg);
                    }
                },
                afterCallback() {
                    vm.isLogin = true
                }
            })
            
        },
    init(){
      var token = storage.localGet("token");
      fetch("https://klzz.hualinginfo.com/api/user/profile/userInfo", {
          method: "get",
          headers: {
            "XX-Token": token,
            "XX-Device-Type": "wxapp"
          },
        })
      .then(response => response.json())
      .catch(error => console.error("Error:", error))
      .then(response => {
          this.userList = response.data
					this.shengRi = this.format(this.userList.birthday)
      });
    },
    // 选择图片后执行
    onRead1(file) {
      var vm = this
      //将原图片显示为选择的图片
      vm.$refs.goodsImg.src = file.content;
      vm.isShow = true;

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
          vm.imgUrl = response.data.url;

          vm.loadType('tx')
                    vm.$store.dispatch('common/xiuGaiName', {
                        data: {
                            can: vm.imgUrl
                        },
                        scCallback(res) {
                            if(res.code == 1){
                                vm.userList.avatar = vm.imgUrl
                                Toast(res.msg);
                            }else if(res.code == 10001){
                                Toast('请先登录');
                            }else{
                                Toast(res.msg);
                            }
                        },
                        afterCallback() {
                        }
                    })
        });
    },
  }
};
</script>

<style type="text/css" lang="scss">
.userInfo .van-cell-group .van-cell,
.user-box .van-cell-group .van-icon {
  font-size: 1rem;
}

.userInfo .van-cell-group .van-cell {
  padding-top: 15px;
  padding-bottom: 15px;
}

.userInfo .head-info {
  overflow: hidden;
  padding: 48px 30px;
  margin-bottom: 18px;
  background: #398bff;
  position: relative;
  text-align: center;
}

.userInfo .head-user-info {
  float: left;
  color: white;
  font-size: 1.3rem;
  padding-top: 8px;
}

.userInfo .avatar {
  width: 70px;
  height: 70px;
  display: block;
  border-radius: 50%;
  border: 1px solid #fff;
}

.userInfo .head-user-info .user-level {
  font-size: 0.8rem;
}
.shengRi-container{
	display: flex;
	width: 100%;
	height: 50px;
	background: #fff;
	align-items: center;
	border-top:1px solid #eeeeee;
	span{
		width: 88px;
		margin-left: 24px;
		color:#5f5f5f;
		font-size: 1rem;
		color:#5f5f5f;
	}
	input{
		display: flex;
		align-items: center;
		width: 100%;
		height: 45px;
		border:none;
		padding-left: 30px;
	}
}

.userInfo .user-info-box {
  padding-top: 15px;
  padding-bottom: 15px;
  font-size: 1rem;
  color: #5f5f5f;
  background: white;
  border-top: 1px solid #eeeeee;
}

.userInfo .user-info-box:last-child {
  border-bottom: 1px solid #eeeeee;
}

.userInfo .user-info-box input {
  border: 0;
  margin: 0;
  padding: 0;
  width: 90%;
}

.userInfo .user-info-box .user-info-item-left {
  float: left;
  margin-left: 24px;
  width: 88px;
}

.userInfo .user-info-box .user-info-item-right {
  overflow: hidden;
}
</style>