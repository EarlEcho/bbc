<template>
    <div class="classify-index-w">
        <div class="center">
            <!--垂直居中方案，使用Flex布局-->
        </div>
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
    .classify-index-w {
        height: 300px;
        display: flex;
        align-items: center;
        justify-content: center;
        background-color: lightblue;
        .center {
            width: 100px;
            height: 100px;
            background: pink;
        }

    }
</style>
