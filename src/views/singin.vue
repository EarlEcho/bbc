<template>
    <div class="sing-up-w">
        <p class="sing-up-tile">注册</p>
        <group ref="signUpForm" :model="signUpForm" class="sign-up-form-w">
            <x-input v-model="signUpForm.nickName"
                     required placeholder="用户名"></x-input>
            <x-input v-model="signUpForm.emailAddress" is-type="email"
                     required placeholder="邮箱"></x-input>
            <div class="valid-input">
                <x-input v-model="signUpForm.token"
                         required placeholder="验证码"></x-input>
                <x-button type="primary" :disabled="tokenDisabled" @click.native="handelToken">{{tokenText}}</x-button>
            </div>
            <x-input placeholder="密码" v-model="signUpForm.password" type="password"
                     required></x-input>

            <submit-btn submit-url="/auth/register" submit-method="POST" :before-submit="beforeSubmit"
                        :submit-data="signUpForm"
                        :submit-handler="submitSuccess" submit-form-ref="signUpForm" btn-text="注册"
            ></submit-btn>
        </group>
        <p class="sign-up-other-action">
            <router-link to="/sing-up">
                <span class="g-lf">立即登录</span>
            </router-link>
        </p>
    </div>
</template>

<script>
    import {Group, XInput, XButton, Toast} from 'vux'
    import SubmitBtn from '@/components/SubmitBtn'
    import functions from '@/functions/common'


    export default {
        name: '',
        components: {Group, XInput, SubmitBtn, XButton, Toast},
        props: [],
        data() {
            return {
                tokenDisabled: false,
                tokenText: '获取验证码',
                signUpForm: {
                    nickName: '',
                    emailAddress: '',
                    token: '',
                    password: ''
                }
            }
        },
        methods: {
            handelToken() {
                var reg = new RegExp("^[a-z0-9]+([._\\-]*[a-z0-9])*@([a-z0-9]+[-a-z0-9]*[a-z0-9]+.){1,63}[a-z0-9]+$");
                if (!reg.test(this.signUpForm.emailAddress)) {
                    alert('输入邮箱');
                    return
                }
                functions.postAjax('/auth/sendEmail', {address: this.signUpForm.emailAddress}, (data) => {
                    if (data.code == 200) {
                        alert('发送成功');
                        this.tokenDisabled = true;
                        this.tokenText = '60s';
                    }
                })
            },
            beforeSubmit() {
                const data = this.signUpForm;
                if (data.nickName) {

                } else if (data.emailAddress) {

                } else if (data.password) {

                } else if (data.token) {

                }

                return true;
            },
            submitSuccess() {
                alert('注册成功');
                this.$router.replace('/sing-up');
            }
        }
    }
</script>
<style lang="less">
    .valid-input {
        .vux-x-input {
            display: inline-block;
            width: 58%;
            margin-right: 1rem;
        }
        button.weui-btn {
            width: 30%;
            float: right;
            font-size: 1.6rem;
            vertical-align: middle;
        }
    }

    .sing-up-w {
        position: absolute;
        width: 100%;
        min-height: 100%;
        background-color: #f5f5f5;
        padding: 2.5rem 2rem;
        box-sizing: border-box;
        .sing-up-tile {
            font-size: 3rem;
            margin-bottom: 2rem;
        }
        .sign-up-form-w {
            margin: 0 auto;
            .vux-no-group-title {
                margin-top: 0;
                background-color: #f5f5f5;
            }
            .vux-x-input {
                margin-bottom: 2.3rem;
                background-color: white;
                border-radius: 10px;
            }
            .weui-cell:before {
                border-top: none;
            }
            .weui-cells:after {
                border-bottom: none;
            }
        }
        .sign-up-other-action {
            margin-top: 1.3rem;
            span {
                font-size: 1.4rem;

                color: #939393;
            }
        }
    }
</style>
