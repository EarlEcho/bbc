<template>
    <div class="my-index-w">
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
        <main-menu tabbarIndex="2"></main-menu>
    </div>
</template>

<script>
    import Uploader from 'vux-uploader'

    import functions from '@/functions/common'
    import {Blur, Group, Cell} from 'vux'
    import MainMenu from '@/components/MainMenu'

    import axios from 'axios'


    export default {
        name: '',
        components: {Uploader, MainMenu, Blur, Group, Cell},
        data() {
            return {
                defaultIcon: 'static/image/default-icon.jpg',
                userInfo: {},
                iconUrl: []
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
                alert('1111');
                functions.postAjax('/user/info/logout', {}, (res) => {
                    localStorage.setItem('sid', '');
                    if (res.code == 200) {
                        alert('退出登陆成功');
                        this.$router.replace('/sing-up');
                    }
                });
            }

        },
        mounted() {
            functions.getAjax('/user/info/getLoginUser', (res) => {
                this.userInfo = res;
            });
        }
    }
</script>
<style lang="less">
    .change-icon {
        position: absolute;
        right: 1rem;
        top: 1rem;
        z-index: 5;
    }

    .upload {
        padding: 0.6rem 1.2rem;
        position: relative;
        border: 1px solid #f5f5f5;
        border-radius: 0.8rem;
        color: #f5f5f5;
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

