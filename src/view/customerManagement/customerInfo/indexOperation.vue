/**
 * 划扣记录页面
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
                        title: '操作时间',
                        key: 'name'
                    },
                    {
                        title: '操作医院',
                        key: 'age'
                    },
                    {
                        title: '操作用户',
                        key: 'address'
                    },
                    {
                        title: '项目名称',
                        key: 'address'
                    },
                    {
                        title: '订购日期',
                        key: 'address'
                    },
                    {
                        title: '单位',
                        key: 'address'
                    },
                    {
                        title: '数量',
                        key: 'address'
                    },
                    {
                        title: '备注',
                        key: 'address'
                    },
                    {
                        title: '医生',
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
                                    </i-button>
                                    <i-button type="warning" size="small">
                                        <Icon type="printer"></Icon>打印
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





