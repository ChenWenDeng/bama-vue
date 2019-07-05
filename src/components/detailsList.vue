<template>
    <section>
        <section class="video-box">
            <section class="video-div">
                <video v-if="item.more ? item.more.video : ''" :src="item.more ? item.more.video : ''" controls x5-video-player-type="h5">您的浏览器不支持播放该视频！</video>
            </section>
            <!-- 健康资讯 -->
            <section v-if="types == 'videos'">
                <div class="follow-container" >
                    <div class="icon-box">
                        <!-- <span class="iconfont icon-ziyuan10"></span> -->
                        <img :src="item.more ? item.more.thumbnail : ''" alt="">
                        <span class="name">孝乐万家</span>
                    </div>
                    <button>
                        <i class="iconfont iconjia"></i>
                        关注
                    </button>
                </div>
                <div class="text-container" v-html="item.post_content||item.post_excerpt"></div>
                <div class="bottom-container">
                    <p>
                        <span>{{item.post_hits}}次播放</span>
                        <span>{{item.comment_count}}条评论</span>
                    </p>
                    <span>
                        分享
                        <span class="iconfont icon-weixin"></span>
                    </span>
                </div>
            </section>
            <!-- 专家卫士 -->
            <section v-if="types == 'expert'">
                <div class="xinxi-container">
                    <div class="left-contaoner">
											<div class="img-box">
                       <img  :src="item.more ? item.more.thumbnail : ''" alt="">
											</div>
                        <div class="name-container">
                            <span class="name">孝乐万家</span>
                            <span class="tiem">{{formatTime(item.create_time)}}</span>
                        </div>
                    </div>
                    <div class="right-contaoner">
                        <span>
                            <i class="iconfont icon-ziyuan55" @click="save(item.id)"></i>
                            {{item.post_like}}
                        </span>
                        <span>
                            <i class="iconfont icon-ziyuan38"></i>
                             {{item.post_hits}}
                        </span>
                    </div>
                </div>
                <div class="neirong" v-html="item.post_content"></div>
                <div class="zhu-container">
                    注：本文转账自健康卫视，转载目的在于传递更多信息，并不代表本网赞同其观点和对其真实性负责。如有侵权行为，请联系我们，我们会及时删除。
                </div>
            </section>
        </section>
    </section>
</template>

<script>
import {mapGetters, mapActions} from 'Vuex'
import { formatTime } from '@/utils/facility.js'
import { Toast} from 'vant';

export default {
    inject:['reload'],
    props:['item','types'],
    methods: {
        ...mapActions('expertVideoDetails',[
            'getExpertVideoDetails'
        ]),
        formatTime(val) {
            return formatTime(val* 1000)
        },
        //点赞
        save(userId){
            console.log(userId)
            let vm = this;
            vm.$store.dispatch('common/fabulous', {
                id:userId,
                scCallback(res) {
                    if(res.code == 1){
                        Toast(res.msg);
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
    },
}
</script>

<style lang="scss" scoped>
.video-box{
        width: 100%;
        background: #fff;
        margin-bottom: 0.625rem;
        .video-div{
            width: 100%;
            video{
                width: 100%;
                height: 13.125rem;
            }
        } 
        .neirong{
            width: 100%;
            padding: 0rem 0.9375rem;
        }
        //健康资讯
        .follow-container{
            width: 100%;
            display: flex;
            justify-content: space-between;
            align-items: center;
            padding: 1.125rem 0.9375rem;
            .icon-box{
                display: flex;
                align-items: center;
                img{
                    width: 2.1875rem;
                    height: 2.1875rem;
                    border-radius: 50%;
                    margin-right: 0.9375rem;
                    color: #ccc;
                }
                .name{
                    font-size: 1rem;
                    color: #666;
                }

            }
            button{
                width: 4.6875rem;
                height: 1.625rem;
                background: #00A3AF;
                border: none;
                border-radius: 0.8125rem;
                color: #fff;
                display: flex;
                align-items: center;
                justify-content: center;
                padding-bottom: 0.0625rem;
                .iconfont{
                    font-size: 0.6875rem;
                    margin-top: 0.0625rem;
                    margin-right: 5px;
                }
            }
        }
        .text-container{
            width: 100%;
            padding: 0rem 2.1875rem 0rem 0.9375rem;
            font-size: 1rem;
            color: #333; 
        }
        .bottom-container{
            width: 100%;
            display: flex;
            justify-content: space-between;
            font-size: 0.8125rem;
            color: #999;
            padding: 1.125rem 0.9375rem;
            p{
                span{
                   margin-right:  1.3125rem;
                }

            }
            .iconfont{
                color: green;
            }
        }
        //专家卫士
        .xinxi-container{
                display: flex;
                justify-content: space-between;
                align-items: center;
                padding: 1.125rem 0.9375rem;
                .left-contaoner{
                    display: flex;
                    align-items: center;
										.img-box{
											width: 2.1875rem;
											height: 2.1875rem;
											margin-right: 0.9375rem;
										}
                    img{
                        width: 2.1875rem;
                        height: 2.1875rem;
                        border-radius: 50%;
                        margin-right: 0.9375rem;
                        color: #ccc;
                    }
                    .name-container{
                        display: flex;
                        flex-direction: column;
                        line-height: 1.25rem;
                        .name{
                            color: #333;
                            font-size: 0.875rem;
                        }
                        .tiem{
                            font-size: 0.6875rem;
                            color: #666;
                        }
                    }
                }
                .right-contaoner{
                    span{
                        font-size: 0.6875rem;
                        color: #666;
                        margin-right: 0.6875rem;
                        .icon-ziyuan55{
                            font-size: 0.8125rem;
                        }
                        .icon-ziyuan38{
                            font-size: 0.5rem;
                        }
                    }
                }
            }
            .zhu-container{
                color: #666;
                font-size: 0.75rem;
                margin: 0rem 0.9375rem;
                background: #F3F3F3;
                padding: 0.625rem;
                line-height: 1.25rem;
                border-radius: 0.25rem;
            }
    }
</style>
