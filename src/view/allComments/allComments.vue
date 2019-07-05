<template>
    <section class="allComments-container">
        <Header>
            <div class="left-container" slot="left">
                <span @click="fanhui">
                    <i class="iconfont icon-fanhui"></i>
                </span>
            </div>
            <div class="search-container" slot="center">
                评论
            </div>
            <div class="right-container" slot="right">
            </div>
        </Header>
        <section class="allComments-box">
            <div class="title-container">
                {{headerTitle}}
            </div>    
            <section class="allComments-text">
                <p>全部评论({{listLength || 0}})</p>
            </section>
            <section v-if="commentList.length!=0" class="commentsList"  v-for="(item,index) in commentList" :key="index" >
                <CommentsList v-for="(itemList,index) in item" :key="index" :item="itemList"></CommentsList>
            </section>
            <NoData v-if="commentList.length==0" :text="'暂无评论'"></NoData>
        </section>   
    </section>
</template>

<script>
import {mapGetters, mapActions} from 'Vuex'
import Header from '../../components/header/header'
import CommentsList from '../../components/commentsList'
import NoData from '../../components/noData'
export default {
    components:{
        Header,
        CommentsList,
        NoData
    },
    data(){
        return{
            detailsId:0,
            headerTitle:'',
            num:0
        }
    },
    computed:{
         ...mapGetters('common',[
            'commentList',
        ]),
        listLength(){
            for(var i=0;i<this.$store.state.common.commentList.length; i++){
                var num = this.$store.state.common.commentList[i].length
            }
            return num
        }
    },
    mounted(){
        this.detailsId = parseInt(this.$route.query.id)
        this.headerTitle = this.$route.query.headerTitle
        this.init()
    },
    methods:{
        //返回
        fanhui(){
            this.$router.go(-1)
        },
        init(){
            console.log(this.detailsId)
            let vm = this;
            vm.$store.dispatch('common/getAllPinLun', {
                data: {
                    id: vm.detailsId
                },
            })
        },
    }
}
</script>

<style lang="scss" scoped>
.allComments-container{
    width: 100%;
    background: #fff;
    padding-top: 2.75rem;
    .header-container{
        background: #fff !important;
        margin-bottom: 0.625rem;
        border-bottom: 0.0625rem solid #eee;
        .left-container{
            .iconfont{
                color: #333;
                width: 0.625rem;
                height: 1.0938rem;
            }
        }
        .search-container{
            color:#000 !important;
            font-weight: bold;
        }
    }
    .allComments-box{
        width: 100%;
        padding: 0rem 0.9375rem;
        .title-container{
            padding: 1.25rem 0rem 1.625rem 0rem;
            color: #333333;
            font-size: 1.125rem;
            line-height: 1.5625rem;
        }
        .allComments-text{
            p{
                font-size: 0.875rem;
                font-weight: bold;
                color: #333;
            }
        }
    }
    .commentsList{
        margin-top: 2.0625rem;
    }
}
</style>

