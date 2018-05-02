<template>
    <div class="sing-up-w">
        <p class="sing-up-tile">登录</p>
        <group ref="signUpForm" :model="signUpForm" class="sign-up-form-w">
            <x-input is-type="email" v-model="signUpForm.emailAddress"
                     required placeholder="邮箱"></x-input>
            <x-input placeholder="密码" v-model="signUpForm.password" type="password"
                     required></x-input>
            <submit-btn submit-url="/auth/sidToken" submit-method="POST" :before-submit="beforeSubmit"
                        :submit-data="signUpForm"
                        :submit-handler="submitSuccess" submit-form-ref="signUpForm" btn-text="登录"
                        class="login-btn"></submit-btn>
        </group>
        <p class="sign-up-other-action">
            <router-link to="/sing-in">
                <span class="g-lf">立即注册</span>
            </router-link>
            <router-link to="/sing-in">
                <!--<span class="g-rt">忘记密码</span>-->
            </router-link>
        </p>
    </div>
</template>

<script>
    import {Group, XInput} from 'vux'
    import SubmitBtn from '@/components/SubmitBtn'
    import axios from '../../config/http'

    export default {
        name: '',
        components: {Group, XInput, SubmitBtn},
        props: [],
        data() {
            return {
                signUpForm: {
                    emailAddress: '',
                    password: ''
                }
            }
        },
        methods: {
            beforeSubmit() {
                var reg = new RegExp("^[a-z0-9]+([._\\-]*[a-z0-9])*@([a-z0-9]+[-a-z0-9]*[a-z0-9]+.){1,63}[a-z0-9]+$");
                if (!reg.test(this.signUpForm.emailAddress)) {
                    this.$vux.toast.text('邮箱格式错误');
                    return
                }else if (this.signUpForm.password.length < 6) {
                    this.$vux.toast.text('密码必须大于等于6位');
                } else {
                    return true;
                }
            },
            submitSuccess(res) {
                this.$vux.toast.text('登陆成功，即将跳转到首页');
                localStorage.setItem('sid', (res.data));
                axios.defaults.headers.sid = (localStorage.sid);
                setTimeout(() => {
                    this.$router.replace('/');
                }, 2000)
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
