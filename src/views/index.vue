<template>
    <div class="index-w">
        <search-page></search-page>
        <div class="w">
            <div class="article-item-w" v-for="(articleItem,index) in articleList" :key="index">
                <div class="art-top-w clearfix">
                    <div class="art-icon g-lf">
                        <img :src="articleItem.iconUrl" alt="">
                    </div>
                    <span class="art-author">{{articleItem.author}}</span>
                    <span class="art-time g-rt">{{articleItem.time}}</span>
                </div>
                <div class="art-bottom-w">
                    <p class="art-title">{{articleItem.title}}</p>
                    <p class="art-others">
                        <span class="art-classify">{{articleItem.classify}}</span>
                        <span class="art-comment">
                            <i class="icon ion-chatbox-working"></i>
                            {{articleItem.comment}}
                        </span>
                    </p>
                </div>
            </div>
        </div>
        <main-menu></main-menu>
    </div>
</template>

<script>
    //引入主菜单
    import MainMenu from '@/components/MainMenu'
    //引入搜索框
    import SearchPage from '@/components/SearchPage'

    export default {
        name: '',
        components: {MainMenu, SearchPage},
        props: [],
        data() {
            return {
                articleList: [{
                    iconUrl: require('../assets/image/1.jpg'),
                    author: 'Echo',
                    time: '2018/3/21',
                    title: '从ES6重新认识JavaScript设计模式(一): 单例模式',
                    classify: '前端',
                    comment: 2
                }, {
                    iconUrl: require('../assets/image/1.jpg'),
                    author: 'Echo',
                    time: '2018/3/21',
                    title: '从ES6重新认识JavaScript设计模式(一): 单例模式',
                    classify: '后端',
                    comment: 3
                }, {
                    iconUrl: require('../assets/image/1.jpg'),
                    author: 'Echo',
                    time: '2018/3/21',
                    title: '从ES6重新认识JavaScript设计模式(一): 单例模式',
                    classify: '服务器',
                    comment: 1
                }]
            }
        },
        methods: {}
    }
</script>
<style lang="less">
    .index-w {
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
                    width: 98%;
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
            .art-classify {
                display: inline-block;
                height: 1.8rem;
                line-height: 1.8rem;
                background-color: #69a1a6;
                padding: 0 0.6rem;
                border-radius: 1rem;
                color: #fff;
                margin-right: 1.5rem;
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

