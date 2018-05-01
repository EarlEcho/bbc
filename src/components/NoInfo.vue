<template>
    <div class="no-info-w">
        <img src="static/image/noinfo.png" alt="">
        <p>暂无相关信息</p>
    </div>
</template>

<script>
    export default {
        name: '',
        components: {},
        props: [],
        data() {
            return {}
        },
        methods: {}
    }
</script>
<style lang="less">
    .no-info-w {
        text-align: center;
        img {
            position: relative;
            width: 100%;
        }
        p {
            position: absolute;
            top: 26.5%;
            left: 29%;
            font-size: 2.8rem;
            color: #9b9b9b;
        }
    }
</style>
