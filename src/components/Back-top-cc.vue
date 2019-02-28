<template>
    <div class="back-top-cc" @click="smoothscroll"><span>回到<br>顶部</span></div>
</template>

<script>
    export default {
        name: "Back-top-cc",

        methods:{
            smoothscroll: function () {
                let currentScroll = document.documentElement.scrollTop || document.body.scrollTop;
                if (currentScroll > 0) {
                    window.requestAnimationFrame(this.smoothscroll);
                    window.scrollTo(0, currentScroll - (currentScroll / 5));
                }
            }
        }
    }
</script>

<style scoped>
    .back-top-cc {
        height: 34px;
        width: 34px;
        line-height: 10px;
        position: fixed;
        color: rgb(233, 233, 233);
        font-size: 0.6rem;
        background: rgba(0, 0, 0, 0.5);
        right: 16px;
        bottom: 60px;
        z-index: 120;
        border-radius: 50%;
        display: flex;
        align-items: center;
        font-weight: 700;
    }

    .back-top-cc span {
        padding-top: 2px;
        margin: 0 auto;
    }
</style>