<template>
    <div class="article-detail-w">
        <div class="detail-header-w">
            <div>
                <img :src="articleDeatil.icon" alt="">
                <span>{{articleDeatil.author}}</span>
                <span class="g-rt">{{articleDeatil.time}}</span>
            </div>

        </div>
        <div class="detail-content-w">
            <p class="article-title-w">{{articleDeatil.title}}</p>
            <p class="art-content" v-html="articleDeatil.content">
            </p>
            <p>标签：<span class="art-classify">{{articleDeatil.classify}}</span></p>
        </div>

        <!--文章评论-->
        <div class="article-comment-w">
            <p class="write-comment" @click="showWritePopup=true">写评论</p>
            <p class="comment-name">评论区</p>
            <div class="comment-item" v-for="commentItem in commentList" @click="commentDetail(commentItem.id)">
                <div class="comment-header clearfix">
                    <div class="c-left g-lf">
                        <img :src="commentItem.icon" alt="">
                    </div>
                    <div class="c-right g-lf">
                        <p>{{commentItem.name}}</p>
                        <p>{{commentItem.time}}</p>
                    </div>
                </div>
                <p class="comment-info">{{commentItem.content}}</p>

                <!--某个评论的子评论-->
                <div class="inner-comment" v-show="commentItem.childComment">
                    <p v-for="inner in commentItem.childComment">
                        <span>{{inner.name}}：</span>{{inner.content}}
                    </p>
                    <span v-show="commentItem.commentNum>1">查看其他{{commentItem.commentNum}}条评论</span>
                </div>
            </div>
        </div>
        <!--评论弹窗-->
        <popup v-model="showWritePopup" height="30%" class="article-comment-input">
            <group>
                <x-textarea v-model="commentText" placeholder="请输入评论" :show-counter="true" :rows="4">
                </x-textarea>
            </group>

            <submit-btn submit-url="/" submit-method="POST" :before-submit="beforeSubmitComment"
                        :submit-data="commentText"
                        :submit-handler="submitSuccess" submit-form-ref="signUpForm" btn-text="发送评论"
            ></submit-btn>
        </popup>

        <!--评论详情弹窗-->
        <popup v-model="showCommentPopup" height="100%">
            <p class="close-popup" @click="showCommentPopup=false">
                <i class="icon ion-chevron-left"></i>返回
            </p>
            <div class="comment-inener-detail">
                <div class="main-comment">
                    <div class="parent-comment clearfix">
                        <div class="c-left g-lf">
                            <img :src="commentDetailList.icon" alt="">
                        </div>
                        <div class="c-right g-lf">
                            <p>{{commentDetailList.name}}</p>
                            <p>{{commentDetailList.time}}</p>
                        </div>
                    </div>
                    <p class="parent-comment-info">{{commentDetailList.content}}</p>
                    <!--某个评论的子评论-->
                </div>
                <div class="comment-for-this" v-for="inner in commentDetailList.childComment">
                    <div class="comment-header clearfix">
                        <div class="c-left g-lf">
                            <img :src="inner.icon" alt="">
                        </div>
                        <div class="c-right g-lf">
                            <p>{{inner.name}}</p>
                            <p>{{inner.time}}</p>
                        </div>
                    </div>
                    <p class="comment-info">{{inner.content}}</p>
                </div>
            </div>
        </popup>
    </div>
</template>

<script>
    import functions from '@/functions/common'
    import {Popup, XTextarea, Group} from 'vux'
    import SubmitBtn from '@/components/SubmitBtn'

    export default {
        name: '',
        components: {Popup, XTextarea, Group,SubmitBtn},
        props: [],
        data() {
            return {
                articleDeatil: {},
                showWritePopup: false,
                commentText: '',
                showCommentPopup: false,
                commentList: [{
                    id: 1,
                    name: 'Echo',
                    icon: 'static/image/2.jpg',
                    time: '2018-4-01',
                    content: 'Checker 是比Radio或者Checklist更加灵活的选择组件，可以自定义需要的布局样式！',
                    commentNum: 3,
                    childComment: [{
                        name: 'jose',
                        content: 'hello'
                    }]
                }, {
                    id: 2,
                    name: 'JOSE',
                    icon: 'static/image/1.jpg',
                    time: '2018-4-12',
                    content: 'VUX 并不是一个能解决所有场景的完美解决方案'
                }],
                commentDetailList: {
                    id: 1,
                    name: 'Echo',
                    icon: 'static/image/2.jpg',
                    time: '2018-4-01',
                    content: 'Checker 是比Radio或者Checklist更加灵活的选择组件，可以自定义需要的布局样式！',
                    childComment: [{
                        name: 'Jose',
                        icon: 'static/image/1.jpg',
                        time: '2018-4-01',
                        content: 'hello',
                    }, {
                        name: '嘤嘤嘤',
                        icon: 'static/image/4.jpeg',
                        time: '2018-4-11',
                        content: '并不推荐禁用eslint',
                    }, {
                        name: '小猫咪',
                        icon: 'static/image/3.jpeg',
                        time: '2018-4-02',
                        content: '插件为一个数组列表，根据需要可以添加你需要的插件，插件名为必须，有些组件不需要额外配置选项。',
                    }]
                }

            }
        },
        methods: {

            beforeSubmitComment() {

            },
            submitSuccess() {

            },
            //查看评论详情
            commentDetail(id) {
                this.showCommentPopup = true;
            }
        },
        mounted() {
            functions.getAjax('/datas/article-detail.json', (data) => {
                this.articleDeatil = data.content.articleDeatil;
            });
        }
    }
</script>
<style lang="less">

    .article-detail-w {
        position: absolute;
        width: 100%;
        min-height: 100%;
        padding: 1rem;
        box-sizing: border-box;
        .detail-header-w {
            div:first-child {
                border-bottom: solid 1px #f5f5f5;
                padding-bottom: 1rem;
                margin-bottom: 1rem;
                img {
                    display: inline-block;
                    width: 3.5rem;
                    height: 3.5rem;
                    border-radius: 50%;
                    vertical-align: middle;
                }
                span {
                    margin-left: .7rem;
                    vertical-align: middle;
                    font-size: 1.6rem;
                    color: #787878;
                    line-height: 3.5rem;
                }

            }

        }
        .detail-content-w {
            .article-title-w {
                font-size: 2rem;
                margin: 1rem 0;
                font-weight: bold;
            }
            .art-content {
                font-size: 1.6rem;
                margin: 1rem 0;
                line-height: 2.6rem;
            }
        }

    }
</style>
