/**
 * 项目折扣
 */

<template>
    <div class="container-box" ref="containerBox">
        <div class="container-header">
            <h2>收费项目折扣限制</h2>
            <ul class="header-btn-group">
                <li class="header-item"><Icon type="plus-round"></Icon>增加</li>
            </ul>
        </div>
        <div class="container-body">
            <Form  :label-width="60" inline>
                <Form-item label="名称">
                    <Input type="text" placeholder="请输入名称"></Input>
                </Form-item>
                <ul class="header-btn-group not-float">
                    <li class="header-item"><Icon type="search"></Icon>查询</li>
                    <li class="header-item"><Icon type="refresh"></Icon>重置</li>
                </ul>
            </Form>
            <Table stripe :columns="columns" :data="data"></Table>
            <div class="table-page">
                <div class="table-info">当前第1页，共1页，总共5条记录</div>
                <Page class="table-paginate"></Page>
            </div>
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
                        title: '项目编号',
                        key: 'number'
                    },
                    {
                        title: '项目名称',
                        key: 'name'
                    },
                    {
                        title: '类型',
                        key: 'type'
                    },
                    {
                        title: '价格',
                        key: 'price',
                        render (row) {
                            return `<span style='color: orange;'>${row.price}</span>`;
                        }
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
                        number: '123',
                        name: '124142',
                        type: '玻尿酸',
                        price: '1.00',
                        sale: '90.00'
                    },
                    {
                        number: '123',
                        name: '124142',
                        type: '玻尿酸',
                        price: '1.00',
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