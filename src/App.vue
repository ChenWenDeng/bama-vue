<template>
    <div id="app">
        <router-view v-if="isRouterAlive"/>
    </div>
</template>

<script>
export default {
    data(){
        return{
            isRouterAlive:true,
        }
    },
    provide(){
        return{
        reload: this.reload
        }
    },
    methods:{
        reload(){ 
        this.isRouterAlive = false
        this.$nextTick(function(){
            this.isRouterAlive = true
        })
        },
    },
}
</script>

<style>
html{
    width: 100%!important;
    height: 100%!important;
}
    body {
        font-size: 0.9rem;
        -webkit-font-smoothing: antialiased;
        font-family: Arial, Helvetica, 'STHeiti STXihei', 'Microsoft YaHei', Tohoma, sans-serif;
        background-color: #f3f3f3;
        position: relative;
    }

    ::-webkit-scrollbar {
        display: none
    }

    .box-cc{
        padding: 12px;
    }

    .container{
        background-color: #f3f3f3;
    }

    .m-top-cc{
        margin-top: 6px;
    }

    .m-bottom-cc{
        margin-bottom: 6px;
    }
</style>
