<template>
    <div class="my-index-w">
        <div class="my-base-infos-w">
            <blur :blur-amount=15 :url="userInfo.url">
                <p class="center"><img :src="userInfo.url"></p>
                <p class="my-name">{{userInfo.name}}</p>
            </blur>
        </div>
        <div class="my-actions-list">

        </div>
        <main-menu></main-menu>
    </div>
</template>

<script>
    import functions from '@/functions/common'


    //接口数据

    import {Blur} from 'vux'
    //引入主菜单
    import MainMenu from '@/components/MainMenu'

    export default {
        name: '',
        components: {MainMenu, Blur},
        props: [],
        data() {
            return {
                userInfo: {
                    url: require('../../assets/image/3.jpg'),
                    name: 'Echo'
                }
            }
        },
        methods: {},
        mounted() {
            functions.getAjax('/datas/data.json', (data) => {

            });
        }
    }
</script>
<style lang="less">
    .my-index-w {
        position: absolute;
        width: 100%;
        min-height: 100%;
        .my-base-infos-w {
            .center {
                text-align: center;
                padding-top: 20px;
                color: #fff;
                font-size: 18px;
            }

            .center img {
                width: 100px;
                height: 100px;
                border-radius: 50%;
                border: 4px solid #ececec;
            }
            .my-name {
                text-align: center;
                font-size: 2.2rem;
                color: white;
                line-height: 3.4rem;
            }
        }
        .my-actions-list {

        }
    }


</style>

