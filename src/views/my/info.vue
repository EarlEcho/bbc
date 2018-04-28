<template>
    <div class="article-create-w">
        <group label-width="6rem" label-margin-right="2rem" label-align="right" class="article-group">
            <x-input title="用户名" v-model="infoForm.title" placeholder="请输入用户名"></x-input>
            <x-textarea title="个人简介" v-model="infoForm.content" placeholder="请输入个人简介" :show-counter="true" :rows="5">
            </x-textarea>
            <checker v-model="infoForm.sex" default-item-class="sex-item" selected-item-class="sex-item-selected">
                <span class="weui-cell__hd">
                    <label style="display: inline-block;width: 6rem;margin-right: 2rem;text-align: right">性别</label>
                </span>
                <checker-item value="1">男</checker-item>
                <checker-item value="2">女</checker-item>
                <checker-item value="3">保密</checker-item>
            </checker>
        </group>
        <div class="article-submit-w">
            <submit-btn submit-url="/" submit-method="POST" :before-submit="beforeSubmit"
                        :submit-data="infoForm"
                        :submit-handler="submitSuccess" submit-form-ref="signUpForm" btn-text="修改"
            ></submit-btn>
        </div>

    </div>
</template>

<script>
    import SubmitBtn from '@/components/SubmitBtn'

    import functions from '@/functions/common'
    import {Group, XInput, XTextarea, Cell, Checker, CheckerItem} from 'vux'

    export default {
        name: '',
        components: {SubmitBtn, Group, XInput, XTextarea, Cell, Checker, CheckerItem},
        props: [],
        data() {
            return {
                infoForm: {
                    title: '',
                    content: '',
                    sex: '',
                    class: ''
                },
                //class选择器弹出框
                tabIndex: 0,
                classifyItems: [],
                classifyList: [],
                showClassPopup: false,
            }
        },
        methods: {
            beforeSubmit() {

            },
            submitSuccess() {

            },
            fetchClass() {
                functions.getAjax('/datas/classify.json', (data) => {
                    this.classifyList = data.classfiyList;
                    this.classifyItems = this.classifyList[0].children;

                });
            },
            handlerTab(index) {
                this.classifyItems = this.classifyList[index].children;
                console.log(this.classifyItems);
            }
        },
        mounted() {
            this.fetchClass();
        }
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
        .sex-item {
            border: solid 1px lightblue;
            padding: 0.5rem 1rem;
            border-radius: 0.4rem;
            margin-right: 1rem;
        }

        .sex-item-selected {
            background-color: lightblue;
            color: white;
        }
    }
</style>
