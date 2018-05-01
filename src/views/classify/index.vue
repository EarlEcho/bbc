<template>
    <div class="classify-index-w">

        <Tab v-model="tabIndex">
            <TabItem v-for="(item,index) in classifyList" :key="index" @on-item-click="handlerTab(index)">
                {{item.label}}
            </TabItem>
        </Tab>
        <div class="classify-item">
            <span v-for="(classfiy,index) in classifyItems" :key="index">
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
                classifyItems: []
            }
        },
        methods: {
            fetchClass() {
                functions.getAjax('/datas/classify.json', (data) => {
                    this.classifyList = data.classfiyList;
                    this.classifyItems = this.classifyList[0].children;

                });
            },
            handlerTab(index) {
                this.classifyItems = this.classifyList[index].children;
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
                background-color: lightblue;
                margin: 0 1.5rem 1rem 0;
                border-radius: 0.7rem;
                font-size: 1.3rem;
                a{
                    color: #efeff4;
                }
            }

        }

    }
</style>
