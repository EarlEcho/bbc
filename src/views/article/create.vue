<template>
    <div class="article-create-w">
        <group label-width="3rem" label-margin-right="2rem" label-align="right" class="article-group">
            <x-input title="标题" v-model="articleForm.title" placeholder="请输入标题"></x-input>
            <x-textarea title="内容" v-model="articleForm.content" placeholder="请输入内容" :show-counter="true" :rows="12">
            </x-textarea>
            <cell title="类别" :value="articleForm.class" is-link @click.native="handleClass"></cell>
        </group>
        <div class="article-submit-w">
            <submit-btn submit-url="/" submit-method="POST" :before-submit="beforeSubmit"
                        :submit-data="articleForm"
                        :submit-handler="submitSuccess" submit-form-ref="signUpForm" btn-text="发表文章"
            ></submit-btn>
        </div>
        <popup v-model="showClassPopup" height="50%">
            <Tab v-model="tabIndex">
                <TabItem v-for="(item,index) in classifyList" @on-item-click="handlerTab(index)">
                    {{item.label}}
                </TabItem>
            </Tab>
            <div class="classify-item">
                <checker v-model="articleForm.class" default-item-class="class-item"
                         selected-item-class="class-item-selected">
                    <checker-item v-for="classfiy in classifyItems" :value="classfiy.id">{{classfiy.label}}
                    </checker-item>
                </checker>
            </div>
        </popup>
    </div>
</template>

<script>
    import SubmitBtn from '@/components/SubmitBtn'

    import functions from '@/functions/common'
    import {Group, XInput, XTextarea, Cell, Popup, Tab, TabItem, Checker, CheckerItem} from 'vux'

    export default {
        name: '',
        components: {SubmitBtn, Group, XInput, XTextarea, Cell, Popup, Tab, TabItem, Checker, CheckerItem},
        props: [],
        data() {
            return {

                articleForm: {
                    title: '',
                    content: '',
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
            },
            handleClass() {
                this.showClassPopup = true;
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
        }

        .article-submit-w {
            position: fixed;
            bottom: 2rem;
            left: 5%;
            width: 90%;
            margin: 0 auto;
        }
        .classify-item {
            margin: 1.2rem;
            border-radius: 0.8rem;
            padding: 1.4rem;
            background-color: white;
            .class-item {
                display: inline-block;
                padding: 0.8rem 1.2rem;
                margin: 0 1.5rem 1rem 0;
                border-radius: 0.7rem;
                font-size: 1.3rem;
                border: solid 2px lightblue;
            }

            .class-item-selected {
                background-color: lightblue;
                color: white;
            }

        }
    }
</style>
