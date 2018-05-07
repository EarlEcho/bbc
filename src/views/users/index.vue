<template>
    <div class="users-w">
        <x-header>用户信息</x-header>
        <div>
            <div class="user-base-info-w">
                <div v-if="userInfo.photoPath==null">
                    <blur :blur-amount="12" :url="defaultIcon">
                        <p class="center"><img :src="defaultIcon"></p>
                        <p class="user-name">{{userInfo.nickName}}</p>
                    </blur>
                </div>
                <div v-else>
                    <blur :blur-amount="12" :url="userInfo.photoPath">
                        <p class="center"><img :src="userInfo.photoPath"></p>
                        <p class="user-name">{{userInfo.nickName}}</p>
                    </blur>
                </div>
            </div>
            <div class="user-info-list">
                <p class="info-title">邮箱地址</p>
                <p class="info-content">{{userInfo.emailAddress}}</p>

                <p class="info-title">个人简介</p>
                <p class="info-content">{{userInfo.introduce}}</p>

                <p class="info-title">性别</p>
                <p class="info-content">{{userInfo.gender==0?'女':'男'}}</p>

                <p class="info-title">加入时间</p>
                <p class="info-content">{{userInfo.createTime | toTime}}</p>
            </div>
        </div>
    </div>
</template>

<script>
    import Uploader from 'vux-uploader'

    import functions from '@/functions/common'
    import {Blur, Group, Cell, XButton, XHeader} from 'vux'
    import MainMenu from '@/components/MainMenu'

    import axios from 'axios'


    export default {
        name: '',
        components: {XButton, Uploader, MainMenu, Blur, Group, Cell, XHeader},
        data() {
            return {
                defaultIcon: 'static/image/default-icon.jpg',
                userInfo: {},
                iconUrl: [],
            }
        },
        methods: {},
        mounted() {
            let id = this.$route.params.id;
            functions.getAjax('/user/info/getOne?id=' + id, (res) => {

                if (res.code == 403) {
                    this.$vux.toast.text('您还未登录，没有权限查看其他用户的信息哦！');
                    return;
                } else {
                    this.userInfo = res.data;

                }
            });
        },
        filters: {
            toTime(value) {
                return functions.timestampToshortText(value);
            }
        }
    }
</script>
<style lang="less">
    .user-not-login {
        width: 85%;
        margin: 0 auto;
        text-align: center;
        padding-top: 10rem;
        p {
            font-size: 1.8rem;
            line-height: 6rem;
            color: #09bb07;
        }
    }

    .change-icon {
        position: absolute;
        right: 1rem;
        top: 1rem;
        z-index: 5;
    }

    .upload {
        padding: 0.6rem 1.2rem;
        position: relative;
        border: 1px solid #353535;
        border-radius: 0.8rem;
        color: #353535;
    }

    .change {
        position: absolute;
        overflow: hidden;
        right: 0;
        top: 0;
        opacity: 0;
    }

    .users-w {
        position: absolute;
        width: 100%;
        min-height: 100%;
        background-color: #f5f5f5;
        z-index: -1;
        .user-base-info-w {
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
            .user-name {
                text-align: center;
                font-size: 2.2rem;
                color: white;
                line-height: 3.4rem;
            }
        }
        .user-info-list {
            .info-title {
                font-size: 1.4rem;
                color: #8a8a8a;
                padding: 1rem 1.5rem;
            }
            .info-content {
                line-height: 3.5rem;
                background-color: white;
                padding: 0 1.5rem;
                color: #555;
                font-size: 1.6rem;
                margin-bottom: 1rem;
            }
        }
    }


</style>

