/**
 * 照片管理页面
 */

<template>
    <Table :columns="columns" :data="data"></Table>
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
                        title: '提交时间',
                        key: 'name'
                    },
                    {
                        title: '提交医院',
                        key: 'age'
                    },
                    {
                        title: '提交用户',
                        key: 'address'
                    },
                    {
                        title: '方式',
                        key: 'address'
                    },
                    {
                        title: '咨询项目',
                        key: 'address'
                    },
                    {
                        title: '咨询内容',
                        key: 'address'
                    },
                    {
                        title: '操作',
                        key: 'action',
                        width: 150,
                        align: 'center',
                        render (row, column, index) {
                            return `<i-button type="primary" size="small">
                                        <Icon type="edit"></Icon>编辑
                                    </i-button> <i-button type="error" size="small">
                                        <Icon type="ios-trash-outline"></Icon>删除
                                    </i-button>`;
                        }
                    }
                ],
                data: []
            }
        },
        methods: {
            
        }
    }
</script>





