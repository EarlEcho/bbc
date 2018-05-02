<template>
    <transition name='fade'>
        <div v-show='visible' class='toast'>
            <span>{{message}}</span>
        </div>
    </transition>
</template>

<script>
    export default {
        data() {
            return {
                visible: true,
                message : ''
            };
        }
    }
</script>


<style lang="less">
    .toast {
        font-family: -apple-system-font, "Helvetica Neue", sans-serif;
        position: fixed;
        left:50%;
        transform:translate(-50%,-50%) scale(1);
        word-wrap:break-word;
        padding:10px;
        text-align: center;
        z-index:9999;
        max-width:90%;
        color: #fff;
        border-radius: 5px;
        background: rgba(0,0,0,.6);
        overflow: hidden;
        span {
            font-size: 1.5rem;
        }
    }
    .toast.middle{
        top:50%;
    }
    .toast.top{
        top:30%;
    }
    .toast.bottom{
        top:90%;
    }
    .fade-enter-active, .fade-leave-active {
        transition: transform .3s;
    }
    .fade-enter, .fade-leave-active {
        transform:translate(-50%,-50%) scale(0);
    }
</style>
