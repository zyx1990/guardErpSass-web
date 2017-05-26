/**
 * 问卷模板设计页面
 */

<template>
    <div class="container-box">
        <div class="container-header">
            <h2>问卷模板——{{titMsg}}</h2>
            <ul class="header-btn-group">
                <li class="header-item" @click="rtfChoice"><Icon type="plus-round"></Icon>添加选择题</li>
                <li class="header-item" @click="rtfFill"><Icon type="plus-round"></Icon>添加填空题</li>
            </ul>
        </div>
        <div class="container-body">
            <Table stripe :columns="columns" :data="data"></Table>
        </div>
    </div>
</template>

<script>
    export default {
        data () {
            return {
                titMsg: '',
                columns: [
                    {   
                        title: '序号',
                        type: 'index',
                        width: 60
                    },
                    {
                        title: '题型',
                        key: 'type'
                    },
                    {
                        title: '题目',
                        key: 'title'
                    },
                    {
                        title: '调整顺序',
                        key: 'action',
                        width: 200,
                        align: 'center',
                        render (row, column, index) {
                            return `<i-button type="primary" size="small" @click="up(${index})">
                                        <Icon type="arrow-up-c"></Icon>
                                    </i-button> 
                                    <i-button type="error" size="small" @click="down(${index})">
                                        <Icon type="arrow-down-c"></Icon>
                                    </i-button>`;
                        }
                    },
                    {
                        title: '操作',
                        key: 'action',
                        width: 250,
                        align: 'center',
                        render (row, column, index) {
                            return `<i-button type="primary" size="small" @click="edit(${index})">
                                        <Icon type="edit"></Icon>编辑
                                    </i-button> 
                                    <i-button type="error" size="small" @click="remove(${index})">
                                        <Icon type="ios-trash-outline"></Icon>删除
                                    </i-button>`;
                        }
                    }
                ],
                data: [
                    {
                        type: '填空题',
                        title: '1'
                    },
                    {
                        type: '单选题',
                        title: '2'
                    },
                    {
                        type: '填空题',
                        title: '3'
                    }
                ]
            }
        },
        created () {
            this.titMsg = this.$route.query.name
            this.getList()
        },
        methods: {
            getList () {
                var _vm = this;
                _vm.$http.get({
                    url: 'guard-webManager/survey/getTemplate.jhtml',
                    data: {id: _vm.$route.query.id},
                    success: function(res){
                        if(res.status == 200 ){
                            console.log(res)
                            // _vm.data = res.data.content
                        } else {
                            console.log(res.data.desc)
                        }
                    },
                    error: function(res){
                        console.log(res);
                    }
                });
            },
            up (index) {
                var temp;
                if(index != 0) {
                    temp = this.data[index]
                    this.$set(this.data, index, this.data[index - 1])
                    this.$set(this.data, index - 1, temp)
                }
            },
            down (index) {
                var temp;
                if(index != this.data.length - 1) {
                    temp = this.data[index]
                    this.$set(this.data, index, this.data[index + 1])
                    this.$set(this.data, index + 1, temp)
                }
            },
            edit () {

            },
            remove () {

            },
            rtfFill () {
                this.$router.push('/surveyRtfFill0')
            },
            rtfChoice () {
                this.$router.push('/surveyRtfChoice0')
            }
        }
    }
</script>