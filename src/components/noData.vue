<template>
    <section class="no-data-box">
        <i class="iconfont icon-wushuju1"></i>
        <span>{{text||'暂无数据'}}</span>
    </section>
</template>

<script>
export default {
    props:['text']
}
</script>

<style lang="scss" scoped>
.no-data-box{
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 100%;
    // padding: 20% 0rem;
    i{
        font-size: 120px;
        color:#e0e0e0;
        margin-bottom: 0.625rem
    }
    span{
        color:#999;
    }
}
</style>

