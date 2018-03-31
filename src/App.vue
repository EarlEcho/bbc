<template>
    <div id="app">
        <router-view/>
    </div>
</template>

<script>
    export default {
        name: 'App'
    }
</script>

<style lang="less">
    @import 'assets/css/common.css';
    @import 'assets/css/ionicons.min.css';

    .art-classify {
        display: inline-block;
        height: 1.8rem;
        line-height: 1.8rem;
        background-color: #69a1a6;
        padding: 0 0.6rem;
        border-radius: 1rem;
        color: #fff;
        margin-right: 1.5rem;
    }
</style>
