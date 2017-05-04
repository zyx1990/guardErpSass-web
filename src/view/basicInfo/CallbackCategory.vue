/**
 * 回访类型管理
 */

<template>
    <div class="container-box" ref="containerBox">
        <div class="container-header">
            <h2>回访类型管理</h2>
            <ul class="header-btn-group">
                <li class="header-item"><Icon type="plus-round"></Icon>增加</li>
            </ul>
        </div>
        <div class="container-body">
            <Table stripe :columns="columns" :data="data" ref="table"></Table>
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
                        title: '状态',
                        key: 'states'
                    },
                    {
                        title: '描述',
                        key: 'description'
                    },
                    {
                        title: '操作',
                        key: 'action',
                        width: 150,
                        align: 'center',
                        render (row, column, index) {
                            return `<i-button type="primary" size="small" @click="show(${index})"><Icon type="edit"></Icon>编辑</i-button> <i-button type="error" size="small" @click="remove(${index})"><Icon type="ios-trash-outline"></Icon>删除</i-button>`;
                        }
                    }
                ],
                data: [
                    {
                        name: '玻尿酸',
                        states: '启用',
                        description: '公交广告'
                    },
                    {
                        name: '肉毒素',
                        states: '启用',
                        description: '222'
                    },
                    {
                        name: '开发角',
                        states: '启用',
                        description: '333'
                    },
                    {
                        name: '术后回访',
                        states: '禁用',
                        description: '654654'
                    },
                    {
                        name: '吸脂术后回访',
                        states: '启用',
                        description: '6666'
                    }
                ]
            }
        },
        methods: {
            show (index) {
                
            },
            remove (index) {
                
            }
        },
        mounted: function(){

        }
    }
</script>