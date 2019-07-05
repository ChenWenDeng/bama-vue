<template>
    <section class="expert-container">
        <!-- 专家卫士页 -->
        <HeaderTop>
            <div class="left-container" slot="left">
                <router-link tag="i" to="/index" class="iconfont icon-fanhui"></router-link>
            </div>
            <div class="search-container" slot="center">
                专家卫视
            </div>
            <div class="right-container" slot="right">
            </div>
        </HeaderTop>
        <section class="expert-box">
            <ul>
                <li to="/expertVideo" @click="jumpDeatils(item)" v-for="(item,index) in informationList" :key="index">
                    <img v-if="item.more.thumbnail" :src="item.more.thumbnail" alt="">
                    <img v-if="!item.more.thumbnail" src="https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1557034908102&di=44714b9b2335a09e0655e5bf217966c8&imgtype=0&src=http%3A%2F%2Fbpic.588ku.com%2Felement_origin_min_pic%2F17%2F09%2F19%2F179166e2c7692426a53ef39b4dd1cd8f.jpg%2521%2Ffwfh%2F804x804%2Fquality%2F90%2Funsharp%2Ftrue%2Fcompress%2Ftrue" alt="">
                    <p>{{item.name}}</p>
                </li>
            </ul>
        </section>
    </section>
</template>

<script>
import {mapGetters, mapActions} from 'Vuex'
import HeaderTop from "../../components/headerTop";
export default {
    name:'expert',
    components:{
        HeaderTop
    },
    computed: {
        ...mapGetters('expert',[
            'informationList'
        ]),
    },
    mounted(){
        this.getInformation()
    },
    methods:{
        ...mapActions('expert',[
            'getInformation',
        ]),
        jumpDeatils(val){
            let id = val.id;
            this.$router.push({
                path: '/expertVideo',
				query: {
					id: id
				}
            })
        },
    }
}
</script>

<style lang="scss" scoped>
.expert-container{
    width: 100%;
    background: #f4f4f4;
    .header-container{
        background: #f4f4f4 !important;
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
            font-weight: bold;
        }
    }
    .expert-box{
        width: 100%;
        margin: 2.75rem 0rem 3.375rem 0rem; 
        ul{
            width: 100%;
            display: flex;
            flex-wrap: wrap;
            justify-content: flex-start;
            padding: 0rem 0.3125rem;
            li{
                display: flex;
                flex-direction: column;
                justify-content: space-between;
                align-items:center;
                width: 22%;
                height: 6.875rem;
                background: #fff;
                margin: 1.5% 1.5%;
                padding: 0.4375rem 0rem;
                img{
                    width: 60px;
                    height: 60px;
                }
                p{
                    width: 100%;
                    height: 3.0625rem;
                    white-space:initial;
                    overflow : hidden;
                    text-overflow: ellipsis;
                    display: -webkit-box;
                    -webkit-line-clamp: 2;
                    -webkit-box-orient: vertical;
                    font-size: 0.75rem;
                    color:#333333;
                    text-align: center;
                    padding:0px 0.625rem;
                    line-height: 19px;
                    margin-top: 0.1875rem;
                    justify-content: center;
                }
            }
        }
    }
}
</style>

