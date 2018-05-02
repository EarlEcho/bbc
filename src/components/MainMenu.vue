<template>
    <!--注册-->
    <div class="main-menu-w">
        <tabbar @on-index-change="mainSwitchEvent" v-model="tabIndex">
            <tabbar-item link="/">
                <i slot="icon" class="icon ion-planet"></i>
                <span slot="label">首页</span>
            </tabbar-item>
            <tabbar-item link="/classify">
                <i slot="icon" class="icon ion-ios-keypad"></i>
                <span slot="label">分类</span>
            </tabbar-item>
            <tabbar-item link="/my">
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
        },
        data() {
            return {
                tabIndex: 0
            }
        },
        props: ['tabbarIndex'],
        created: function () {
            this.tabIndex = parseInt(this.tabbarIndex);
        },
        methods: {
            mainSwitchEvent() {

                this.tabIndex =  parseInt(this.tabbarIndex);
            }
        }
    }
</script>
<style lang="less">
    .main-menu-w {
        position: fixed;
        bottom: 0;
        left: 0;
        width: 100%;
    }
</style>
