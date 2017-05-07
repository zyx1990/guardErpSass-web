/**
 * 收费项目类型管理
 */

<template>
    <div class="container-box">
        <div class="container-header">
            <h2>收费项目类型管理</h2>
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
                        title: '名称',
                        key: 'name'
                    },
                    {
                        title: '操作',
                        key: 'action',
                        width: 150,
                        align: 'center',
                        render (row, column, index) {
                            return `<i-button type="primary" size="small"><Icon type="edit"></Icon>编辑</i-button> <i-button type="error" size="small"><Icon type="ios-trash-outline"></Icon>删除</i-button>`;
                        }
                    }
                ],
                data: [
                    {
                        name: '价格通用预收款贵1'
                    },
                    {
                        name: '价格通用预收款贵2'
                    },
                    {
                        name: '价格通用预收款贵3'
                    }
                ]
            }
        },
        methods: {
            
        }
    }
</script>