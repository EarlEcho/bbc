<template>
    <div class="article-create-w">
        <group label-width="3rem" label-margin-right="2rem" label-align="right" class="article-group">
            <x-input title="标题" v-model="articleForm.title" placeholder="请输入标题"></x-input>
            <x-textarea title="内容" :max="5000" :autosize="true" v-model="articleForm.content" placeholder="请输入内容"
                        :show-counter="true" :rows="12">
            </x-textarea>
            <cell title="类别" :value="articleForm.type" is-link @click.native="handleClass"></cell>
        </group>
        <div class="article-submit-w">
            <submit-btn submit-url="/user/article/save" submit-method="POST" :before-submit="beforeSubmit"
                        :submit-data="articleForm"
                        :submit-handler="submitSuccess" submit-form-ref="signUpForm" btn-text="发表文章"
            ></submit-btn>
        </div>
        <popup v-model="showClassPopup" height="50%">
            <Tab v-model="tabIndex">
                <TabItem v-for="(item,index) in classifyList" :key="index" @on-item-click="handlerTab(index)">
                    {{item.label}}
                </TabItem>
            </Tab>
            <p style="margin: 1rem 1rem 0  1.2rem;color: #8a8a8a;font-size: 1.4rem">最多选择3个类别标签哦~</p>
            <div class="classify-item">
                <checker type="checkbox" :max="3" v-model="tempType" default-item-class="class-item"
                         selected-item-class="class-item-selected">
                    <checker-item v-for="(classfiy,index) in classifyItems" :key="classfiy.label"
                                  :value="classfiy.label">
                        {{classfiy.label}}
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
                tempType: [],

                articleForm: {
                    title: '',
                    content: '',
                    type: ''
                },
                //class选择器弹出框
                tabIndex: 0,
                classifyItems: [],
                classifyList: [],
                showClassPopup: false,
                classifyList: [
                    {
                        id: 1,
                        label: "前端",
                        children: [
                            {
                                id: 11,
                                label: "JavaScript"
                            },
                            {
                                id: 12,
                                label: "HTML"
                            },
                            {
                                id: 13,
                                label: "CSS"
                            },
                            {
                                id: 14,
                                label: "React"
                            },
                            {
                                id: 15,
                                label: "Vue"
                            }
                        ]
                    },
                    {
                        id: 2,
                        label: "后端",
                        children: [
                            {
                                id: 21,
                                label: "Java"
                            },
                            {
                                id: 22,
                                label: "Node.js"
                            },
                            {
                                id: 23,
                                label: "Python"
                            },
                            {
                                id: 24,
                                label: "PHP"
                            },
                            {
                                id: 25,
                                label: "Go"
                            }
                        ]
                    },
                    {
                        id: 3,
                        label: "服务器端",
                        children: [
                            {
                                id: 31,
                                label: "MySQL"
                            },
                            {
                                id: 32,
                                label: "Oracel"
                            },
                            {
                                id: 33,
                                label: "Redis"
                            }
                        ]
                    },
                    {
                        id: 4,
                        label: "其他",
                        children: [
                            {
                                id: 41,
                                label: "信息安全"
                            },
                            {
                                id: 42,
                                label: "通信工程"
                            },
                            {
                                id: 43,
                                label: "其他"
                            }
                        ]
                    }
                ]
            }
        },
        watch: {
            tempType(val) {
                console.log(val);
                this.articleForm.type = val.join(',')
            }
        },
        methods: {
            beforeSubmit() {
                console.log(this.articleForm);
                if (this.articleForm.title == '') {
                    this.$vux.toast.text('文章标题不可为空');
                    return
                } else if (this.articleForm.content == '') {
                    this.$vux.toast.text('文章内容不可为空');
                    return
                } else if (this.articleForm.type == '') {
                    this.$vux.toast.text('至少选择一个文章类别');
                    return
                } else {
                    return true;
                }

            },
            submitSuccess() {
                this.$vux.toast.text('发布文章成功，可跳转至我的文章查看');
                setTimeout(() => {
                    this.$router.replace('/my');
                }, 2000)
            },
            fetchClass() {
                this.classifyItems = this.classifyList[0].children;

            },
            handlerTab(index) {
                this.classifyItems = this.classifyList[index].children;
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
            bottom: 0;
            left: 0;
            width: 90%;
            margin: 0 auto;
            padding: 1rem 5%;
            background-color: white;
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
                border: solid 1px #09bb07;
            }

            .class-item-selected {
                background-color: #09bb07;
                color: white;
            }

        }
    }
</style>
