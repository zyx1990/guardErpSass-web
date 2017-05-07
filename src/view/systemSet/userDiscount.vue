/**
 * 用户折扣
 */

<template>
    <div class="container-box" ref="containerBox">
        <div class="container-header">
            <h2>用户折扣管理</h2>
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
                        title: '用户姓名',
                        key: 'name'
                    },
                    {
                        title: '折扣(%)',
                        key: 'sale'
                    },
                    {
                        title: '操作',
                        key: 'action',
                        width: 150,
                        align: 'center',
                        render (row, column, index) {
                            return `<i-button type="primary" size="small" @click="edit(${index})"><Icon type="edit"></Icon>编辑</i-button>
                                    <i-button type="error" size="small" @click="remove(${index})"><Icon type="ios-trash-outline"></Icon>删除</i-button>`;
                        }
                    }
                ],
                data: [
                    {
                        name: '124142',
                        sale: '90.00'
                    },
                    {
                        name: '124142',
                        sale: '90.00'
                    }
                ]
            }
        },
        methods: {
            edit: function(index) {

            },
            remove: function(index) {

            }
        }
    }
</script>