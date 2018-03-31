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
        <div class="article-comment-w">
            <p class="comment-name">评论</p>
        </div>
    </div>
</template>

<script>
    import functions from '@/functions/common'

    export default {
        name: '',
        components: {},
        props: [],
        data() {
            return {
                articleDeatil: {}
            }
        },
        methods: {},
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
        .article-comment-w {
            border-top: solid 1px #f5f5f5;
            padding-top: 1rem;
            margin: 1rem 0;
            .comment-name {
                font-size: 1.6rem;
            }
        }
    }
</style>
