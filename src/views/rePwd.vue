<template>
    <div class="repwd-w">
        <p class="repwd-tile">忘记密码</p>
        <group ref="rePwdForm" :model="rePwdForm" class="sign-up-form-w">
            <x-input v-model="rePwdForm.emailAddress" is-type="email"
                     required placeholder="邮箱"></x-input>
            <div class="valid-input">
                <x-input v-model="rePwdForm.token"
                         required placeholder="验证码"></x-input>
                <x-button type="primary" :disabled="tokenDisabled" @click.native="handelToken">{{tokenText}}</x-button>
            </div>
            <x-input placeholder="密码" v-model="rePwdForm.password" type="password"
                     required></x-input>

            <submit-btn submit-url="/auth/updatePassword" submit-method="POST" :before-submit="beforeSubmit"
                        :submit-data="rePwdForm"
                        :submit-handler="submitSuccess" submit-form-ref="rePwdForm" btn-text="修改"
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
                countDownTimer: null,
                counter: 60,

                rePwdForm: {
                    emailAddress: '',
                    token: '',
                    password: ''
                }
            }
        },
        methods: {
            handelToken() {
                var reg = new RegExp("^[a-z0-9]+([._\\-]*[a-z0-9])*@([a-z0-9]+[-a-z0-9]*[a-z0-9]+.){1,63}[a-z0-9]+$");
                if (!reg.test(this.rePwdForm.emailAddress)) {
                    this.$vux.toast.text('邮箱格式错误');
                    return
                }
                this.tokenDisabled = true;
                this.tokenText = "60s";
                let _this = this;
                functions.postAjax('/auth/sendEmail', {address: this.rePwdForm.emailAddress}, (data) => {
                    if (data.code == 200) {
                        _this.$vux.toast.text('验证码发送成功');
                        console.log('111')
                    } else {
                        _this.$vux.toast.text(data.msg);
                        _this.reset();
                    }
                })
                _this.countDownTimer = setInterval(() => {
                    console.log(_this.counter);
                    _this.counter--;
                    _this.tokenText = _this.counter + "s";
                    console.log(_this.tokenText);
                    if (_this.counter <= 0) {
                        _this.reset();
                    }
                }, 1000);
            },
            reset: function () {
                this.tokenDisabled = false;
                this.tokenText = "获取验证码";
                clearInterval(this.countDownTimer);
            },
            beforeSubmit() {
                var reg = new RegExp("^[a-z0-9]+([._\\-]*[a-z0-9])*@([a-z0-9]+[-a-z0-9]*[a-z0-9]+.){1,63}[a-z0-9]+$");
                const data = this.rePwdForm;
                if (!reg.test(data.emailAddress)) {
                    this.$vux.toast.text('邮箱格式错误');
                    return
                } else if (data.token == '') {
                    this.$vux.toast.text('验证码不能为空');
                    return
                } else if (data.password.length < 6) {
                    this.$vux.toast.text('密码必须大于等于6位');
                    return
                } else return true;
            },
            submitSuccess(res) {
                console.log(res)
                if (res.code == 200) {
                    this.$vux.toast.text('修改密码成功，即将跳转到登录页');
                    clearInterval(this.countDownTimer);
                    setTimeout(() => {
                        this.$router.replace('/sing-up');
                    }, 2000)
                } else {
                    this.$vux.toast.text(res.msg);
                }

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

    .repwd-w {
        position: absolute;
        width: 100%;
        min-height: 100%;
        background-color: #f5f5f5;
        padding: 2.5rem 2rem;
        box-sizing: border-box;
        .repwd-tile {
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
