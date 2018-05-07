<template>
    <div class="article-list-w">
        <x-header>我的文章列表</x-header>
        <no-info v-show="articleList.length==0"></no-info>
        <div class="w">
            <div class="article-item-w" v-for="(articleItem,index) in articleList" :key="index">
                <div class="art-top-w clearfix">
                    <div class="art-icon g-lf" @click="viewUser(articleItem.userInfo.id)">
                        <img :src="articleItem.userInfo.photoPath==null?defaultIcon:articleItem.userInfo.photoPath">
                    </div>
                    <span class="art-author">{{articleItem.userInfo.nickName}}</span>
                    <span class="art-time g-rt">{{articleItem.createTime | toTime}}</span>
                </div>
                <div class="art-bottom-w">
                    <p class="art-title" @click="toDetail(articleItem.id )">{{articleItem.title}}</p>
                    <p class="art-others clearfix">
                        <span class="art-classify" v-for="item in articleItem.type">{{item}}</span>
                        <span class="art-comment">
                                <i class="icon ion-chatbox-working"></i>
                                {{articleItem.comments.length}}
                        </span>
                        <x-button mini plain @click.native="removeArticle(articleItem.id)">删除</x-button>
                    </p>
                </div>
            </div>
        </div>

    </div>
</template>

<script>
    import {XHeader, XButton} from 'vux'
    import functions from '@/functions/common'
    import NoInfo from '@/components/NoInfo'

    export default {
        name: '',
        components: {NoInfo, XHeader, XButton},
        props: [],
        data() {
            return {
                defaultIcon: 'static/image/default-icon.jpg',
                articleList: []
            }
        },
        methods: {
            toDetail(id) {
                this.$router.push({
                    path: '/article-detail/' + id,
                });
            },
            //删除文章
            removeArticle(id) {
                console.log('删除文章', id);
                let _this = this;
                _this.$vux.confirm.show({
                    title: '提示',
                    content: '确认删除该文章吗？',
                    // 组件除show外的属性
                    onConfirm() {
                        functions.postAjax('/user/article/delete', {id: id}, (res) => {
                            console.log(res)
                            if (res.code == 200) {
                                _this.$vux.toast.text('删除文章成功！');
                                setTimeout(() => {
                                    this.$router.go(0);
                                }, 1000)
                                _this.fetchData();
                            } else {
                                _this.$vux.toast.text(res.msg);
                            }
                        });
                    }
                })


            },
            viewUser(id) {
                this.$router.push({
                    path: '/users/' + id,
                });
            },
            fetchData() {
                functions.getAjax('/user/info/listPersonArticle', (res) => {
                    this.articleList = res.data.content;
                    for (let i = 0; i < this.articleList.length; i++) {
                        this.articleList[i].type = this.articleList[i].type.split(',');
                    }
                });
            }
        },
        mounted() {
            this.fetchData();
        },
        filters: {
            toTime(value) {
                return functions.timestampToshortText(value);
            }
        }
    }
</script>
<style lang="less">
    .article-list-w {
        position: absolute;
        width: 100%;
        min-height: 100%;
        background-color: #f1f1f1;
        .w {
            padding: 0.8rem;
        }
    }

    .article-item-w {
        padding: 0.8rem;
        margin-bottom: 1rem;
        background: white;
        border-radius: 0.5rem;
        div {
            box-sizing: border-box;
        }
        .art-top-w {
            .art-icon {
                width: 3.2rem;
                height: 3.2rem;
                overflow: hidden;
                border-radius: 50%;
                margin-right: 0.8rem;
                img {
                    width: 100%;
                }
            }
            .art-author, .art-time {
                line-height: 3.2rem;
                color: #a1a1a1;
                font-size: 1.4rem;
            }

        }
        .art-bottom-w {
            display: inline-block;
            width: 100%;
            vertical-align: top;
            padding-left: .5rem;
            margin-top: .5rem;
            .art-title {
                font-size: 1.6rem;
                font-weight: bold;
                line-height: 2.1rem;
                color: #333333;
            }
            .art-others {
                margin-top: .8rem;
                position: relative;
                button {
                    position: absolute;
                    bottom: 0.1rem;
                    right: 0.5rem;
                }
            }

            .art-comment {
                vertical-align: middle;
                color: #b2b2b2;
                font-size: 1.5rem;
                line-height: 1.8rem;
                i {
                    font-size: 1.8rem;
                    vertical-align: middle;
                }
            }
        }
    }
</style>
