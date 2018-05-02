<template>
    <div class="index-w">
        <search-page></search-page>
        <no-info v-show="articleList.length==0"></no-info>
        <div class="w">
            <div class="article-item-w" v-for="(articleItem,index) in articleList" :key="index">
                <div class="art-top-w clearfix">
                    <div class="art-icon g-lf" @click="viewUser(articleItem.userInfo.id)">
                        <img :src="articleItem.userInfo.photoPath===null?defaultIcon:articleItem.userInfo.photoPath">
                    </div>
                    <span class="art-author">{{articleItem.userInfo.nickName}}</span>
                    <span class="art-time g-rt">{{articleItem.createTime | toTime}}</span>
                </div>
                <div class="art-bottom-w" @click="toDetail(articleItem.id )">
                    <p class="art-title">{{articleItem.title}}</p>
                    <p class="art-others">
                        <span class="art-classify" v-for="item in articleItem.type">{{item}}</span>
                        <span class="art-comment">
                                <i class="icon ion-chatbox-working"></i>
                                {{articleItem.comments.length}}
                        </span>
                    </p>
                </div>
            </div>
        </div>
        <main-menu tabbarIndex="0"></main-menu>
    </div>
</template>

<script>

    import functions from '@/functions/common'
    //引入主菜单
    import MainMenu from '@/components/MainMenu'
    import NoInfo from '@/components/NoInfo'

    //引入搜索框
    import SearchPage from '@/components/SearchPage'

    export default {
        name: '',
        components: {NoInfo, MainMenu, SearchPage},
        data() {
            return {
                selectId: {},
                defaultIcon: 'static/image/default-icon.jpg',
                articleList: [],
                pager: {
                    page: 1
                }
            }
        },

        mounted() {
            functions.getAjax('/user/article/pageListArticle', (res) => {
                this.articleList = res.data.content;
                for (let i = 0; i < this.articleList.length; i++) {
                    this.articleList[i].type = this.articleList[i].type.split(',');
                }
            });
        },
        methods: {
            viewUser(id){
                this.$router.push({
                    path: '/users/'+ id,
                });
            },
            toDetail(id) {
                this.$router.push({
                    path: '/article-detail/' + id,
                });
            }
        },
        filters: {
            toTime(value) {
                return functions.timestampToshortText(value);
            }
        }
    }
</script>
<style lang="less">
    .index-w {
        position: absolute;
        width: 100%;
        min-height: 100%;
        background-color: #f5f5f5;
        .w {
            padding: 0.8rem;
            margin-bottom: 55px;
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

