<template>
<div>
    <van-row>
        <van-col class="category-item-cc" v-for="(value, key) in data" :key="key" span="6">
            <van-icon :name="value.image" :info="value.info"  @click="categoryItemClick(value)"/>
            <span @click="categoryItemClick(value)">{{value.title}}</span>
        </van-col>
    </van-row>
    <!-- <ul>
        <li class="category-item-cc" v-for="(value, key) in data" :key="key">
            <img :src="value.image" alt="" @click="categoryItemClick(value)">
            <span @click="categoryItemClick(value)">{{value.title}}</span>
        </li>
    </ul> -->
</div>
</template>

<script>
    import {Row, Col, Icon} from 'vant';
    import 'vant/lib/icon/local.css';

    export default {
        props: ['data'],

        components: {
            [Row.name]: Row,
            [Col.name]: Col,
            [Icon.name]: Icon
        },

        data() {
            return {
            }
        },

        methods:{
            categoryItemClick: function(props){
                let bool = false;

                if (typeof this.$parent.categoryItemClick == 'function'){
                    bool = this.$parent.categoryItemClick(props);
                }

                if (!bool){
                    //console.log('请使用 categoryItemClick(props) 来回调！ 并且返回true');
                }
            }
        }
    }
</script>

<style type="text/css">
    .van-row{
        background: white;
        margin: 0 0.6rem;
    }

    .category-item-cc{
        text-align: center;
        padding: 6px 0;
    }

    .category-item-cc i{
        font-size: 2.6rem;
    }

    .category-item-cc span{
        display: block;
        padding: 0 5px;
        font-size: 12px;
        line-height: 14px;
        color: #666666;
    }
</style>