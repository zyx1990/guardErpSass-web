/**
 * 标签组管理
 */

<template>
    <div class="container-box">
        <div class="container-header">
            <h2>标签组管理</h2>
            <ul class="header-btn-group">
                <li class="header-item"><Icon type="plus-round"></Icon>增加</li>
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
                columns: [
                    {   
                        title: '序号',
                        type: 'index',
                        width: 60
                    },
                    {
                        title: '名称',
                        key: 'name'
                    },
                    {
                        title: '描述',
                        key: 'description'
                    },
                    {
                        title: '标签',
                        key: 'tag',
                        render (row) {
                            return `<p v-for='item in data[0].tag'>{{item.msg}}</p>`;
                        }
                    },
                    {
                        title: '操作',
                        key: 'action',
                        width: 150,
                        align: 'center',
                        render (row, column, index) {
                            return `<i-button type="primary" size="small" @click="edit(${index})"><Icon type="edit"></Icon>编辑</i-button> <i-button type="error" size="small" @click="remove(${index})"><Icon type="ios-trash-outline"></Icon>删除</i-button>`;
                        }
                    }
                ],
                data: [
                    {
                        name: '价格贵',
                        description: '公交广告',
                        tag: [
                            {msg: '有钱人'},
                            {msg: '潜在'},
                            {msg: '白领'}
                        ]
                    },
                    {
                        name: '价格贵',
                        description: '公交广告',
                        tag: [
                            {msg: '有钱人'},
                            {msg: '潜在'},
                            {msg: '白领'}
                        ]
                    },{
                        name: '价格贵',
                        description: '公交广告',
                        tag: [
                            {msg: '有钱人'},
                            {msg: '潜在'},
                            {msg: '白领'}
                        ]
                    },{
                        name: '价格贵',
                        description: '公交广告',
                        tag: [
                            {msg: '有钱人'},
                            {msg: '潜在'},
                            {msg: '白领'}
                        ]
                    }
                ]
            }
        },
        methods: {
            edit: function(index) {
                
            },
            remove: function(index) {

                // this.data.splice(index, 1);
            }
        }
    }
</script>