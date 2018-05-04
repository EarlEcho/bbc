<template>
    <div class="classify-index-w">

        <Tab v-model="tabIndex">
            <TabItem v-for="(item,index) in classifyList" :key="index" @on-item-click="handlerTab(index)">
                {{item.label}}
            </TabItem>
        </Tab>
        <div class="classify-item">
            <span v-for="(classfiy,index) in classifyItems" :key="index" @click="viewTypeArticle(classfiy.label)">
                <router-link to="/article-list">
                {{classfiy.label}}
                </router-link>
            </span>
        </div>

        <main-menu tabbarIndex="1"></main-menu>
    </div>

</template>

<script>
    import MainMenu from '@/components/MainMenu'
    import functions from '@/functions/common'
    import {Tab, TabItem} from 'vux'

    export default {
        name: '',
        components: {
            MainMenu, Tab, TabItem
        },
        data() {
            return {
                tabIndex: 0,
                classifyList: [],
                classifyItems: [],
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
        methods: {
            fetchClass() {
                this.classifyItems = this.classifyList[0].children;

            },
            handlerTab(index) {
                this.classifyItems = this.classifyList[index].children;
            },
            viewTypeArticle(type) {
                console.log(type);
                this.$router.push('/article-list?type=' + type);
            }
        },
        mounted() {
            this.fetchClass();
        }
    }
</script>
<style lang="less">
    .classify-index-w {
        background-color: #f5f5f5;
        position: absolute;
        width: 100%;
        min-height: 100%;
        box-sizing: border-box;

        .classify-item {
            margin: 1.2rem;
            border-radius: 0.8rem;
            padding: 1.4rem;
            background-color: white;
            span {
                display: inline-block;
                padding: 0.8rem 1.2rem;
                background-color: #09bb07;
                margin: 0 1.5rem 1rem 0;
                border-radius: 0.7rem;
                font-size: 1.3rem;
                a {
                    color: white;
                }
            }

        }

    }
</style>
