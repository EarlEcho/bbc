<template>
    <div class="search-input-w">
        <search @result-click="resultClick" @on-change="getResult" :results="results"
                v-model="value" position="static" top="0px" @on-focus="onFocus"
                @on-cancel="onCancel" @on-submit="onSubmit" ref="search"></search>
    </div>
</template>

<script>
    import {Search, Group, Cell, XButton} from 'vux'

    export default {
        name: '',
        components: {Search, Group, Cell, XButton},
        props: [],
        data() {
            return {
                results: [],
                value: ''
            }
        },
        methods: {
            setFocus() {
                this.$refs.search.setFocus()
            },
            resultClick(item) {
                window.alert('you click the result item: ' + JSON.stringify(item))
            },
            getResult(val) {
                this.results = val ? getResult(this.value) : []
            },
            onSubmit() {
                this.$refs.search.setBlur()
                this.$vux.toast.show({
                    type: 'text',
                    position: 'top',
                    text: 'on submit'
                })
            },
            onFocus() {
            },
            onCancel() {
            }
        }
    }

    function getResult(val) {
        let rs = []
        for (let i = 0; i < 20; i++) {
            rs.push({
                title: `${val} result: ${i + 1} `,
                other: i
            })
        }
        return rs
    }
</script>
<style lang="less">
    .search-input-w {

    }
</style>
