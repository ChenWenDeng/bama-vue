<template>
    <div id="app">
        <router-view/>
    </div>
</template>

<style>
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
