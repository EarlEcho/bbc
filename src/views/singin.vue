<template>
    <div class="sing-up-w">
        <p class="sing-up-tile">注册</p>
        <group ref="signUpForm" :model="signUpForm" class="sign-up-form-w">
            <x-input is-type="china-mobile" v-model="signUpForm.mobile" type="number"
                     required placeholder="手机号"></x-input>
            <x-input placeholder="密码" v-model="signUpForm.pwd" type="password"
                     required></x-input>

            <submit-btn submit-url="/" submit-method="POST" :before-submit="beforeSubmit"
                        :submit-data="signUpForm"
                        :submit-handler="submitSuccess" submit-form-ref="signUpForm" btn-text="注册"
                        class="login-btn"></submit-btn>
        </group>
        <p class="sign-up-other-action">
            <router-link to="/sing-up">
                <span class="g-lf">立即登录</span>
            </router-link>
        </p>
    </div>
</template>

<script>
    import {Group, XInput} from 'vux'
    import SubmitBtn from '@/components/SubmitBtn'

    export default {
        name: '',
        components: {Group, XInput, SubmitBtn},
        props: [],
        data() {
            return {
                signUpForm: {
                    mobile: '',
                    pwd: ''
                }
            }
        },
        methods: {
            beforeSubmit() {

            },
            submitSuccess() {

            }
        }
    }
</script>
<style lang="less">
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
