<template>
    <div class="userInfo">
        <header-cc :title="title" left-text="返回"></header-cc>

        <div class="head-info">
            <div class="head-img">
                <van-uploader :after-read="onRead" accept="image/gif, image/jpeg, image/png" multiple>
                    <img :src="userInfo.avatar" class="avatar"/>
                </van-uploader>
            </div>
        </div>

        <div class="user-info-box">
            <div class="user-info-item-left">
                昵称
            </div>
            <div class="user-info-item-right">
                <input @change="update" v-model="userInfo.user_nickname" maxlength="28"/>
            </div>
        </div>
        <div class="user-info-box" @click="sexShow=!sexShow">
            <div class="user-info-item-left">
                性别
            </div>
            <div class="user-info-item-right">
                {{ sex[userInfo.sex] }}
            </div>
        </div>
        <div class="user-info-box" @click="birthdayShow=!birthdayShow">
            <div class="user-info-item-left">
                生日
            </div>
            <div class="user-info-item-right">
                {{ userInfo.birthday }}
            </div>
        </div>
        <div class="user-info-box">
            <div class="user-info-item-left">
                身高 mm
            </div>
            <div class="user-info-item-right">
                <input @change="update" maxlength="4" v-model="userInfo.height"/>
            </div>
        </div>
        <div class="user-info-box">
            <div class="user-info-item-left">
                体重 kg
            </div>
            <div class="user-info-item-right">
                <input @change="update" maxlength="6" v-model="userInfo.weight"/>
            </div>
        </div>

        <van-actionsheet v-model="sexShow" title="选择性别">
            <van-picker :columns="sex" :default-index="userInfo.sex" @change="sexUpdate" />
        </van-actionsheet>

        <van-actionsheet v-model="birthdayShow" title="选择生日">
            <van-datetime-picker @confirm="birthdayUpdate" v-model="currentDate" type="date" :min-date="minDate" :max-date="maxDate"/>
        </van-actionsheet>
    </div>
</template>

<script>
    import Vue from 'vue';
    import {mapGetters, mapMutations, mapActions} from 'vuex'
    import {Cell, CellGroup, Notify, Uploader, Picker, Actionsheet, DatetimePicker} from 'vant';

    Vue.use(Cell).use(CellGroup).use(Notify).use(Uploader).use(Picker).use(Actionsheet).use(DatetimePicker);

    export default {
        name: "UserInfo",

        computed: {
            ...mapGetters('user', [
                'token',
                'userInfo',
                'auth',
                'menu'
            ]),
            title: () => {
                return document.title;
            },
        },


        created() {
            this.currentDate = new Date(this.userInfo.birthday);
        },

        data() {
            return {
                sex: [
                    '保密',
                    '男',
                    '女'
                ],
                sexShow: false,
                birthdayShow: false,
                minDate: new Date(1920, 1, 1),
                maxDate: new Date(),
                currentDate: null
            }
        },

        methods: {
            onRead() {

            },
            birthdayUpdate(){
                this.birthdayShow=!this.birthdayShow;
                this.userInfo.birthday = this.currentDate.format("yyyy-MM-dd");
            },
            sexUpdate(picker, value, index){
                this.userInfo.sex = index;
            },
            update() {
                this.userInfoUpdate(this.userInfo);
            },
            ...mapMutations('user', ['userInfoUpdate'])
        }
    }
</script>

<style type="text/css">
    .userInfo .van-cell-group .van-cell, .user-box .van-cell-group .van-icon {
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
        border-radius: 50%;
    }

    .userInfo .head-user-info .user-level {
        font-size: 0.8rem;
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