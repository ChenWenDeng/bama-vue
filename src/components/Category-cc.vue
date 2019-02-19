<template>
    <van-row>
        <van-col class="category-item-cc" v-for="(value, key) in data" :key="key" span="6">
            <van-icon :name="value.image" :info="value.info"/>
            <span>{{value.title}}</span>
        </van-col>
    </van-row>
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
        }
    }
</script>

<style type="less">
    .category-item-cc{
        text-align: center;
        margin: 6px 0;
    }

    .category-item-cc i{
        font-size: 2.6rem;
    }

    .category-item-cc span{
        display: block;
        padding: 0 5px;
        font-size: 16px;
        line-height: 16px;
    }

</style>