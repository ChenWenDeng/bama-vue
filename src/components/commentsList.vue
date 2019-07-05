<template>
    <section>
        <div class="popular-box">
            <div class="pinglun">
                <span>
                    <!-- <i class="iconfont icon-ziyuan10"></i> -->
                    <img v-if="item.user.avatar" :src="item.user.avatar" alt="">
                    <img v-if="!item.user.avatar" src="http://img.52z.com/upload/news/image/20180419/20180419051254_75804.jpg" alt="">
                    {{item.full_name || '游客'}}
                </span>
                <span class="time">{{getDateDiff(item.create_time)}}</span>
            </div>
            <div class="text-container">
                {{item.content}}
            </div>
        </div>
    </section>
</template>

<script>
import { getDateDiff } from '@/utils/date.js'
export default {
    props:['item'],
    methods: {
        getDateDiff(val) {
            return getDateDiff(val* 1000)
        }
    }
}
</script>

<style lang="scss" scoped>
.popular-box{
    width: 100%;
    // margin-bottom: 2.8125rem;
    .pinglun{
        display: flex;
        justify-content: space-between;
        align-items: center;
        span{
            display: flex;
            align-items: center;
            font-size: 0.875rem;
            color: #333;
        }
        img{
            width: 1.375rem;
            height: 1.375rem;
            border-radius: 50%;
            margin-right: 0.4375rem;
        }
    }
    .time{
        font-size: 0.8125rem;
        color: #666;
    }
    .text-container{
        width: 100%;
        padding: 0.4375rem 1.0625rem 0.9375rem 2.1875rem;
        font-size: 0.875rem;
        color:#333333;
        line-height: 23px;
    }
}
</style>
