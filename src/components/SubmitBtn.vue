<template>

    <!--等待提交组件-->
    <div class="submit-btn-w">
        <x-button type="primary" @click.native="beginSubmit" :loading="loading" :disabled="disable">{{buttonText}}
        </x-button>
    </div>
</template>

<script>
    import {XButton, Toast} from 'vux'
    import functions from '@/functions/common'
    import axios from '../../config/http'

    export default {
        components: {
            XButton,
            Toast
        },
        name: 'functions-submit-btn',
        data() {
            return {
                loading: false,
                buttonText: '提交',
                disable: false
            }
        },
        props: ['submitUrl', 'submitMethod', 'submitData', 'submitHandler', 'submitFormRef', 'btnText', 'beforeSubmit'],
        mounted: function () {
            this.buttonText = this.btnText || this.buttonText;
            this.loadingText = "正在" + this.buttonText;
        },
        methods: {
            beginSubmit: function () {
                if (this.beforeSubmit) {
                    if (this.beforeSubmit() != true) {
                        return
                    }
                }
                this.loading = true;
                this.buttonText = "正在" + this.buttonText;
                this.disable = true;
                if (this.submitMethod == 'GET') {
                    axios({
                        method: 'get',
                        url: this.submitUrl,
                        data: this.submitData
                    }).then((response) => {
                        this.afterSubmit(response);

                    }).catch((response) => {
                        console.log(response)
                    })


                } else {
                    axios({
                        method: 'post',
                        url: this.submitUrl,
                        data: this.submitData
                    }).then((response) => {
                        this.afterSubmit(response);

                    }).catch((response) => {
                        console.log(response)
                    })
                }

            },
            afterSubmit: function (response) {
                //恢复提交按钮UI
                this.loading = false;
                this.buttonText = this.btnText || '提交';
                this.disable = false;
                //多条form相关的错误信息，增加rules, 且显示一次后不再有效
                var triggerCountFromServer = 0;
                //处理返回结果
                var result = response.data;
                console.log(result);
                if (result.code == 200) {
                    this.submitHandler(result);
                } else {
                    this.$vux.toast.text(result.msg);
                    return;
                }

            }
        }
    }
</script>
<style lang="less">
    .submit-btn-w {
        button {
            width: 100%;
        }
    }

</style>
