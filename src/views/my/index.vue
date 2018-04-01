<template>
    <div class="my-index-w">
        <div class="my-base-infos-w">
            <blur :blur-amount="15" :url="userInfo.icon">
                <p class="center"><img :src="userInfo.icon"></p>
                <p class="my-name">{{userInfo.name}}</p>
            </blur>
        </div>
        <div class="my-actions-list">
            <group>
                <cell is-link>
                    <span slot="title" class="action-title">
                        个人资料
                    </span>
                </cell>
                <cell is-link>
                    <span slot="title" class="action-title">
                        发布文章
                    </span>
                </cell>
                <cell is-link>
                    <span slot="title" class="action-title">
                        我的文章
                    </span>
                </cell>
            </group>
            <group>
                <cell>
                    <span slot="title" class="action-title">
                        退出登录
                    </span>
                </cell>
            </group>
        </div>
        <main-menu tabbarIndex="2"></main-menu>
    </div>
</template>

<script>
    import functions from '@/functions/common'


    //接口数据

    import {Blur, Group, Cell} from 'vux'
    //引入主菜单
    import MainMenu from '@/components/MainMenu'

    export default {
        name: '',
        components: {MainMenu, Blur, Group, Cell},
        props: [],
        data() {
            return {
                userInfo: {}
            }
        },
        methods: {},
        mounted() {
            functions.getAjax('/datas/user-info.json', (data) => {
                this.userInfo = data.content.userInfo;
                console.log(typeof this.userInfo.icon)
            });
        }
    }
</script>
<style lang="less">
    .my-index-w {
        position: absolute;
        width: 100%;
        min-height: 100%;
        background-color: #f5f5f5;
        z-index: -1;
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
            .weui-cells {
                margin-top: 0;
                margin-bottom: 1.4rem;
            }
            .weui-cell {
                padding: 1.2rem 1.5rem;

            }
            .action-title {
                color: #8a8a8a;
                font-size: 1.6rem;
            }
        }
    }


</style>

