<template>
    <section class="expertVideoDetails-container">
        <HeaderTop>
            <div class="left-container" slot="left">
                <!-- <router-link to="/expertVideo"> -->
                <span @click="go">
                    <i class="iconfont icon-fanhui"></i>
                </span>
                <!-- </router-link> -->
            </div>
            <div class="search-container" slot="center">
                {{expertVideoDetailsData.post_title}}
            </div>
            <div class="right-container" slot="right">
            </div>
        </HeaderTop>
        <section class="expertVideoDetails-box">
            <section class="top-container">
                <p class="title">{{expertVideoDetailsData.post_title}}</p>
                <!-- <div class="video-container">
                    <iframe src="http://player.youku.com/embed/XMzcwNTY3NTM2MA" frameborder=0 allowfullscreen></iframe>
                </div>
                <div class="xinxi-container">
                    <div class="left-contaoner">
                        <i class="iconfont icon-ziyuan10"></i>
                        <div class="name-container">
                            <span class="name">孝乐万家</span>
                            <span class="tiem">2019-03-05 11:15:56</span>
                        </div>
                    </div>
                    <div class="right-contaoner">
                        <span>
                            <i class="iconfont icon-ziyuan55"></i>
                            100
                        </span>
                        <span>
                            <i class="iconfont icon-ziyuan38"></i>
                            100
                        </span>
                    </div>
                </div>
                <div class="zhu-container">
                    注：本文转账自健康卫视，转载目的在于传递更多信息，并不代表本网赞同其观点和对其真实性负责。如有侵权行为，请联系我们，我们会及时删除。
                </div> -->
                <DetailsList :item="expertVideoDetailsData" :types="'expert'"></DetailsList>
            </section>
            <!-- <Banner></Banner> -->
            <section class="bottom-contaoner">
                <p class="title">热门评价</p>
                <div v-if="commentList" class="pinjia-container" v-for="(item, index) in commentList" :key="index">
                    <div v-for="(itemes, index) in item" :key="index">
                        <div class="top-container">
                            <img v-if="itemes.user.avatar" :src="itemes.user.avatar" alt="">
                            <img v-if="!itemes.user.avatar" src="http://img.52z.com/upload/news/image/20180419/20180419051254_75804.jpg" alt="">
                            <span>{{itemes.full_name || '游客'}}</span>
                        </div>
                        <div class="center-container">{{itemes.content}}</div>
                        <p class="bottom-container">{{formatTimees(itemes.create_time)}}</p>
                    </div>
                </div>
                <div v-if="!commentList" style="padding:3.125rem;text-align:center">
                    <!-- 暂无评论 -->
                    <NoData :text="'暂无评论'"></NoData>
                </div>
            </section>
            <!-- <section class="edit-container">
                <div class="edit-input-box" >
                    <input type="text" placeholder="说说你的想法"  v-model="textareaText">
                </div>
                <span class="fabu" @click="addPinLuns">发布</span>
            </section> -->
            <!-- <van-popup v-model="show" position="bottom" :overlay="true" transition>
                <div class="input-container">
                    <textarea autofocus="autofocus" class="textarea-input" placeholder="说说你的想法" v-model="textareaText"></textarea>
                    <i class="iconfont icon-ziyuan33"></i>
                </div>
                <div class="btn-box">
                    <button :class="{btnColor:textareaText}"  @click="addPinLuns">发送</button>
                </div>
            </van-popup> -->
            <section class="edit-container">
                <div class="edit-input-box" >
                    <input type="text" placeholder="我来说两句" @click="open" v-model="textareaText">
                    <i class="iconfont icon-ziyuan33"></i>
                </div>
                <span class="span_1"  @click="jumpComments">
                    <i class="iconfont icon-ziyuan36"></i>
                    {{listLength||0}}
                </span>
                <span>
                    <i v-if="isShouchang" class="iconfont icon-ziyuan51" @click="cancelCollectiones"></i>
                    <i v-else class="iconfont icon-ziyuan40" @click="collection"></i>
                </span>
                <span>
                    <i class="iconfont icon-ziyuan39"></i>
                </span>
            </section>
            <section>
                <van-popup v-model="show" position="bottom" :overlay="true" transition>
                    <div class="input-container">
                        <textarea autofocus="autofocus" class="textarea-input" placeholder="我来说两句" v-model="textareaText"></textarea>
                        <i class="iconfont icon-ziyuan33"></i>
                    </div>
                    <div class="btn-box">
                        <button :class="{btnColor:textareaText}" @click="addPinLuns">发送</button>
                    </div>
                </van-popup>
            </section>
        </section>
    </section>
</template>

<script>
import {mapGetters, mapActions} from 'Vuex'
import HeaderTop from "../../components/headerTop";
import DetailsList from '../../components/detailsList'
// import Banner from '../../components/banner/banner'
import NoData from '../../components/noData'
import { formatTime } from '@/utils/facility.js'
import { Toast} from 'vant';
export default {
    inject:['reload'],
    components:{
        HeaderTop,
        DetailsList,
        // Banner,
        NoData
    },
    data(){
        return{
            show: false,
            textareaText: '',
            isShouchang:false
        }
    },
    computed: {
        ...mapGetters('expertVideoDetails',[
            'expertVideoDetailsData',
        ]),
        ...mapGetters('common',[
            'commentList',
        ]),
        listLength(){
            for(var i=0;i<this.$store.state.common.commentList.length; i++){
                var num = this.$store.state.common.commentList[i].length
            }
            return num
        },
    },
    mounted(){
        this.indexs = this.$route.query.id
        this.init()
        this.getAllPinLunes()
        this.isCollectiones()
    },
	beforeUpdate(){
        this.setImg()
    },
    beforeDestroy(){
        this.setImg()
    },
    methods:{
        setImg(){
            var pes =document.getElementsByTagName('p')
            console.log(pes)
            for(var k=0; k<pes.length; k++){
                var img = pes[k].getElementsByTagName('img')
                for(var i=0; i<img.length;i++){
                img[i].style.width = 100+'%'
                img[i].style.height = 100+'%'
                img[i].style.display = 'flex'
                }
            }
        },
        formatTimees(val) {
            return formatTime(val* 1000)
        },
        open(){
            this.show = true;
        },
        go(){
            this.$router.go(-1);
        },
        init(){
            let vm = this;
            vm.$store.dispatch('expertVideoDetails/getExpertVideoDetails', {
                data: {
                    id:  vm.indexs
                },
            })
        },
        //评论
        addPinLuns(){
            let val = this.expertVideoDetailsData;
            let vm = this;
            if (!val.pid) val.pid = 0;
            if (!val.to_user_id) val.to_user_id = "";
            vm.$store.dispatch('common/loadPinLun', {
                object_id:  val.id,
                category_id: val.categories[0].id,
                pid: val.pid,
                content: vm.textareaText,
                to_user_id : val.to_user_id,
                scCallback(res) {
                    if(res.code == 1){
                        Toast(res.msg);
                        vm.textareaText = '';
                        vm.show = false;
                        vm.reload() 
                    }else if(res.code == 10001){
                        Toast('请先登录');
                    }else{
                        Toast(res.msg);
                    }
                },
                afterCallback() {
                }
            })
        },
        //全部评论
        getAllPinLunes(){
            let vm = this;
            console.log(this.indexs)
            vm.$store.dispatch('common/getAllPinLun', {
                data: {
                    id: this.indexs
                },
            })
        },
        //是否收藏
        isCollectiones(){
            let vm = this;
            vm.$store.dispatch('common/isCollection', {
                data: {
                    id: this.indexs,
                },
                scCallback(res) {
                    if(res.code == 1){
                        vm.isShouchang = true
                    }else if(res.code == 10001){
                        Toast('请先登录');
                    }else{
                        vm.isShouchang = false
                    }
                },
                afterCallback() {
                }
            })
        },
        //收藏
        collection(){
            let vm = this;
            vm.$store.dispatch('common/collectArticles', {
                // data: {
                    id: this.indexs,
                // },
                scCallback(res) {
                    if(res.code == 1){
                        Toast(res.msg);
                        vm.isShouchang = true
                    }else if(res.code == 10001){
                        Toast('请先登录');
                    }else{
                        Toast(res.msg);
                    }
                },
                afterCallback() {
                }
            })
        },

        //取消收藏
        cancelCollectiones(){
            let vm = this;
            vm.$store.dispatch('common/cancelArticles', {
                    id: this.indexs,
                scCallback(res) {
                    if(res.code == 1){
                        Toast('已取消收藏');
                        vm.isShouchang = false
                    }else if(res.code == 10001){
                        Toast('请先登录');
                    }else{
                    }
                },
                afterCallback() {
                }
            })
        },

        //全都评论
        jumpComments(){
            var detailsId = this.expertVideoDetailsData.id
            var headerTitle = this.expertVideoDetailsData.post_title
            this.$router.push({
                path: '/allComments',
				query: {
                    id: detailsId,
                    headerTitle: headerTitle
				}
            })
            console.log(headerTitle)
        },
    }
}
</script>

<style lang="scss" scoped>
@import '@/assets/styles/mixin.scss';
.icon-ziyuan51{
            color: #FF8810;
        }
.expertVideoDetails-container{
    width: 100%;
    background: #fff;
    padding-top: 2.75rem;
    .header-container{
        background: #fff !important;
        border-bottom: 0.0625rem solid #ddd;
        .left-container{
            .iconfont{
                color: #fff;
                width: 0.625rem;
                height: 1.0938rem;
            }
        }
        .search-container{
            color:#fff !important;
             width: 100%;
             font-weight: bold;
            // height: 20px;
            // white-space:initial;
            // overflow : hidden;
            // text-overflow: ellipsis;
            // display: -webkit-box;
            // -webkit-line-clamp: 1;
            // -webkit-box-orient: vertical;
            // font-size: 18px;
            // color:#333333;
            // text-align: center;
            // padding:3px 0.625rem;
            // line-height: 17px;
        }
    }
    .expertVideoDetails-box{
        background: #F4F4F4;
        margin-bottom: 1.25rem;
        .top-container{
            background:#fff;
            padding-bottom: 1.5rem;
            // .iconfont{
            //     color: #ccc;
            // }
            img{
                width: 2.3125rem;
                height: 2.3125rem;
                border-radius: 50%;
            }
            .title{
                padding: 1.25rem 0.9375rem;
                font-size: 1.4375rem;
                color: #333;
                font-weight: bold;
                width: 100%;
                height: 100px;
                white-space:initial;
                overflow : hidden;
                text-overflow: ellipsis;
                display: -webkit-box;
                -webkit-line-clamp: 2;
                -webkit-box-orient: vertical;
                color:#333333;
                line-height: 30px;
            }
            .video-container{
                iframe{
                    width: 100%;
                    height: 13.125rem;
                }
            }
        }
        .bottom-contaoner{
            width: 100%;
            // margin-top: 0.625rem;
            background: #fff;
            padding: 1.4375rem 0rem;
            .title{
                padding: 0rem 0.9375rem;
                color:#333333;
                font-size: 0.9375rem;
            }
            .pinjia-container{
                padding: 0rem 0.9375rem 0.9375rem 0.9375rem;
                border-bottom: 0.0625rem solid #ddd;
                .top-container{
                    display: flex;
                    align-items: center;
                    padding: 1.375rem 0rem 15px 0rem;
                    i{
                        font-size: 2.3125rem;
                    }
                    span{
                        color: #333333;
                        font-size: 0.9375rem;
                        margin-left: 0.75rem;
                    }
                }
                .center-container{
                    font-size: 0.9375rem;
                    color: #666666;
                    line-height: 1.25rem;
                    padding-bottom: 1.4375rem
                }
                .bottom-container{
                    font-size: 0.75rem;
                    color: #999999;
                }
            }
            
        }
        // .edit-container{
        //     position: fixed;
        //     left: 0px;
        //     right: 0px;
        //     bottom: 0px;
        //     width: 100%;
        //     height: 2.8125rem;
        //     display: flex;
        //     align-items: center;
        //     padding: 0rem 0.9375rem;
        //     background: #fff;
        //     border-top: 1px solid #ddd;
        //     .edit-input-box{
        //         width: 80%;
        //         display: flex;
        //         align-items: center;
        //         input{
        //             width: 100%;
        //             height: 2.0625rem;
        //             background: #eee;
        //             border-radius: 1.0625rem;
        //             padding:0rem  1.5625rem;
        //         }
        //     }
        //     .fabu{
        //         flex: 1;
        //         display: flex;
        //         justify-content: center;
        //         align-items: center;
        //         height: 100%;
        //         font-size: 0.9375rem;
        //         color:#666666;
        //     }
        // }
        // .van-popup{
        //     width: 100%;
        //     height: 10.5938rem;
        //     padding: 0.9375rem 0.9375rem 4rem 0.9375rem;
        //     .input-container{
        //         width: 100%;
        //         position: relative;
        //         display: flex;
        //         justify-content: center;
        //         .textarea-input{
        //             width: 91%;
        //             height: 4.375rem;
        //             border: none;
        //             background: #F3F3F3;
        //             border-radius: 0.25rem;
        //             padding-left: 1.875rem;
        //             padding-top: 0.625rem;
        //         }
        //         i{
        //             position: absolute;
        //             top: 0.6875rem;
        //             left: 0.625rem;
        //         }
        //     }
        //     .btn-box{
        //         width: 100%;
        //         display: flex;
        //         justify-content: flex-end;
        //         padding-top: 0.9375rem;
        //         button{
        //             display: flex;
        //             align-items: center;
        //             padding: 7px 1.6875rem 0.375rem 1.6875rem;
        //             font-size: 0.875rem;
        //             color: #fff;
        //             background: #CCC;
        //             border-radius: 0.8125rem;
        //             border: none;
        //             font-size: 0.875rem;
        //         }
        //         .btnColor{
        //             background: #00A3AF
        //         }
        //     }
        // }
        .edit-container{
        position: fixed;
        left: 0px;
        right: 0px;
        bottom: 0px;
        width: 100%;
        height: 2.8125rem;
        display: flex;
        align-items: center;
        padding: 0rem 0.9375rem;
        background: #fff;
        border-top: 1px solid #ccc;
        .edit-input-box{
            position: relative;
            flex: 1;
            display: flex;
            align-items: center;
            i{
                position: absolute;
                top: 0.5625rem;
                left: 0.4375rem;
                font-size: 1.0625rem;
            }
            input{
                height: 2.0625rem;
                background: #eee;
                border-radius: 1.0625rem;
                padding-left: 1.5625rem;
            }
        }
        span{
            flex: 1;
            display: flex;
            justify-content: flex-end;
            align-items: center;
        }
        .span_1{
            margin-top: 3px;
            margin-left: 0.625rem;
            font-size: 0.875rem;
            color: #333333;
            i{
                font-size: 15px;
                color: $themeColor;
                margin-right: 0.1875rem;
            }
        }
    }
    .van-popup{
        width: 100%;
        height: 10.5938rem;
        padding: 0.9375rem 0.9375rem 4rem 0.9375rem;
        .input-container{
            width: 100%;
            position: relative;
            display: flex;
            justify-content: center;
            .textarea-input{
                width: 91%;
                height: 4.375rem;
                border: none;
                background: #F3F3F3;
                border-radius: 0.25rem;
                padding-left: 1.875rem;
                padding-top: 0.625rem;
            }
            i{
                position: absolute;
                top: 0.6875rem;
                left: 0.625rem;
            }
        }
        .btn-box{
            width: 100%;
            display: flex;
            justify-content: flex-end;
            padding-top: 0.9375rem;
            button{
                display: flex;
                align-items: center;
                padding: 7px 1.6875rem 0.375rem 1.6875rem;
                font-size: 0.875rem;
                color: #fff;
                background: #CCC;
                border-radius: 0.8125rem;
                border: none;
                font-size: 0.875rem;
            }
            .btnColor{
                background: $themeColor
            }
        }
    }
    }
}
</style>
