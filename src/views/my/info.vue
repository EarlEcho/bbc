<template>
    <div class="article-create-w">
        <x-header>个人信息</x-header>
        <group label-width="9rem" label-margin-right="2rem" label-align="right" class="article-group">

            <x-input title="用户名" v-model="userInfo.nickName" placeholder="请输入用户名"></x-input>
            <x-textarea :max="150" title="个人简介" v-model="userInfo.introduce" placeholder="请输入个人简介" :show-counter="true"
                        :rows="5">
            </x-textarea>
            <checker v-model="userInfo.gender" default-item-class="gender-item"
                     selected-item-class="gender-item-selected">
                <span class="weui-cell__hd">
                    <label style="display: inline-block;width: 6rem;margin-right: 2rem;text-align: right">性别</label>
                </span>
                <checker-item value=1 key=1>男</checker-item>
                <checker-item value=0 key=0>女</checker-item>
            </checker>
        </group>
        <group label-width="6rem" label-margin-right="2rem" label-align="right" class="article-group">
            <cell title="注册时间" :value="toTime(otherInfo.createTime)"></cell>
            <cell title="注册邮箱" :value="otherInfo.emailAddress"></cell>
        </group>
        <div class="article-submit-w">
            <submit-btn submit-url="/user/info/update" submit-method="POST" :before-submit="beforeSubmit"
                        :submit-data="userInfo"
                        :submit-handler="submitSuccess" submit-form-ref="signUpForm" btn-text="修改"
            ></submit-btn>
        </div>

    </div>
</template>

<script>


    import SubmitBtn from '@/components/SubmitBtn'

    import functions from '@/functions/common'
    import {Group, XInput, XTextarea, Cell, Checker, CheckerItem, XHeader} from 'vux'

    export default {
        name: '',
        components: {SubmitBtn, Group, XInput, XTextarea, Cell, Checker, CheckerItem, XHeader},
        props: [],
        data() {
            return {
                userInfo: {
                    id: '',
                    nickName: '',
                    introduce: '',
                    gender: '0'
                },
                otherInfo: {}
            }
        },
        mounted() {
            this.fetchInfo();
        },
        methods: {
            fetchInfo() {
                functions.getAjax('/user/info/getLoginUser', (res) => {
                    this.userInfo = {
                        id: res.id,
                        nickName: res.nickName,
                        introduce: res.introduce,
                        gender: String(res.gender)

                    };
                    this.otherInfo = {
                        createTime: res.createTime,
                        emailAddress: res.emailAddress
                    }
                });
            },
            beforeSubmit() {
                return true;
            },
            submitSuccess() {
                this.$vux.toast.text('修改个人信息成功');
                setTimeout(() => {
                    this.$router.replace('/my');
                }, 1500)
            },
            toTime(value) {
                return functions.timestampToshortText(value);
            }
        },
    }
</script>
<style lang="less">
    .article-create-w {
        position: absolute;
        width: 100%;
        height: 100%;
        box-sizing: border-box;
        background-color: #f5f5f5;

        .article-group {
            background-color: #f5f5f5 !important;
        }

        .weui-cells {
            background-color: #f5f5f5 !important;
        }
        .weui-cell {
            margin-bottom: 1rem;
            background-color: white;
            padding: 1rem 1.2rem;
        }

        .article-submit-w {
            position: fixed;
            bottom: 2rem;
            left: 5%;
            width: 90%;
            margin: 0 auto;
        }

        .vux-checker-box {
            background-color: white;
            padding: 1rem 1.2rem;
        }
        .gender-item {
            border: solid 1px #09bb07;
            padding: 0.5rem 1rem;
            border-radius: 0.4rem;
            margin-right: 1rem;
        }

        .gender-item-selected {
            background-color: #09bb07;
            color: white;
        }
    }
</style>
