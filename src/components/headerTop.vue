<template>
    <section class="header">
    <section  class="header-container">
        <slot name="left" ></slot>
        <slot name="center"></slot>
        <slot name="right"></slot>
    </section>
    </section>
</template>

<script>
export default {
    
}
</script>

<style lang="scss" scoped>
.header{
    width: 100%;
    height: 2.75rem;
}
.header-container{
    z-index: 99999;
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 100%;
    height: 2.75rem;
    background: #4492FF;
    .left-container{
        display: flex;
        align-items: center;
        padding-left: 0.9375rem;
        color: #fff;
        width: 6.25rem;
        height: 2.75rem;
    }
    .center-container{
        display: flex;
        align-items: center;
        justify-content: center;
        flex: 1;
        height: 2.75rem;
        color: #fff;
        font-size: 1.0625rem;
        font-weight: bold;
    }
    .right-container{
        display: flex;
        align-items: center;
        padding-right: 0.9375rem;
        justify-content: flex-end;
        color: #fff;
        width: 6.25rem;
        height: 2.75rem;
        font-size: 0.3125rem;
    }
}
</style>
