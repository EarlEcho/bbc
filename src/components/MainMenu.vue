<template>
    <!--注册-->
    <div class="main-menu-w">
        <tabbar>
            <tabbar-item selected  link="/">
                <i slot="icon" class="icon ion-planet"></i>
                <span slot="label">首页</span>
            </tabbar-item>
            <tabbar-item>
                <i slot="icon" class="icon ion-ios-keypad"></i>
                <span slot="label">分类</span>
            </tabbar-item>
            <tabbar-item>
                <i slot="icon" class="icon ion-android-person"></i>
                <span slot="label">我的</span>
            </tabbar-item>
        </tabbar>
    </div>
</template>

<script>
    import {Tabbar, TabbarItem, Group, Cell} from 'vux'

    export default {
        components: {
            Tabbar,
            TabbarItem,
            Group,
            Cell
        }
    }
</script>
<style lang="less">

</style>
