<template>
    <div class="my-index-w">
        <div class="user-not-login" v-if="!judgeLogin">
            <p>您还没有登录哦~</p>
            <x-button @click.native="$router.replace('/sing-up')">登录</x-button>
            <x-button @click.native="$router.replace('/sing-in')" type="primary">注册</x-button>
        </div>
        <div v-else>
            <div class="change-icon">
                <div class="upload">
                    修改头像
                    <input name="file" class="change" type="file" accept="image/png,image/jpeg" @change="update"/>
                </div>
            </div>
            <div class="my-base-infos-w">
                <div v-if="userInfo.photoPath==null">
                    <blur :blur-amount="12" :url="defaultIcon">
                        <p class="center"><img :src="defaultIcon"></p>
                        <p class="my-name">{{userInfo.nickName}}</p>
                    </blur>
                </div>
                <div v-else>
                    <blur :blur-amount="12" :url="userInfo.photoPath">
                        <p class="center"><img :src="userInfo.photoPath"></p>
                        <p class="my-name">{{userInfo.nickName}}</p>
                    </blur>
                </div>
            </div>


            <div class="my-actions-list">
                <group>
                    <cell is-link link="/my-info">
                    <span slot="title" class="action-title">
                        个人资料
                    </span>
                    </cell>
                    <cell is-link link="/article-add">
                    <span slot="title" class="action-title">
                        发布文章
                    </span>
                    </cell>
                    <cell is-link link="/my-list">
                    <span slot="title" class="action-title">
                        我的文章
                    </span>
                    </cell>
                </group>
                <group>
                    <cell>
                    <span slot="title" @click="exitLogin" class="action-title">
                        退出登录
                    </span>
                    </cell>
                </group>
            </div>
        </div>

        <main-menu tabbarIndex="2"></main-menu>
    </div>
</template>

<script>
    import Uploader from 'vux-uploader'

    import functions from '@/functions/common'
    import {Blur, Group, Cell, XButton} from 'vux'
    import MainMenu from '@/components/MainMenu'

    import axios from 'axios'


    export default {
        name: '',
        components: {XButton, Uploader, MainMenu, Blur, Group, Cell},
        data() {
            return {
                defaultIcon: 'static/image/default-icon.jpg',
                userInfo: {},
                iconUrl: [],
                judgeLogin: true,
            }
        },
        methods: {
            // 添加请求头
            update(e) {  // 上传照片
                var self = this
                let file = e.target.files[0]
                let param = new FormData() // 创建form对象
                param.append('file', file, file.name) // 通过append向form对象添加数据
                param.append('chunk', '0') // 添加form表单中其他数据
                let config = {
                    headers: {'Content-Type': 'multipart/form-data'}
                }
                // 添加请求头
                axios.post('http://10.10.20.158:8010/user/info/fileUpload', param, config).then(response => {
                    if (response.data.code === 200) {
                        self.userInfo.photoPath = response.data.data;
                    }
                })
            },
            exitLogin() {
                let _this = this;
                this.$vux.confirm.show({
                    title: '提示',
                    content: '确认退出登录吗？',
                    // 组件除show外的属性
                    onConfirm() {
                        functions.postAjax('/user/info/logout', {}, (res) => {
                            localStorage.setItem('sid', '');
                            if (res.code == 200) {
                                _this.$vux.toast.text('退出登陆成功');
                                setTimeout(() => {
                                    _this.$router.replace('/sing-up');
                                }, 1000)
                            }
                        });
                    }
                })

            }

        },
        mounted() {
            functions.getAjax('/user/info/getLoginUser', (res) => {
                this.userInfo = res;
                if (res.code == 403) {
                    this.judgeLogin = false;
                }
            });
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

