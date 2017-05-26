/**
 * 回访情况页面
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
                        title: '回访提醒日期',
                        key: 'name'
                    },
                    {
                        title: '类型',
                        key: 'age'
                    },
                    {
                        title: '提醒内容',
                        key: 'address'
                    },
                    {
                        title: '提醒用户',
                        key: 'address'
                    },
                    {
                        title: '状态',
                        key: 'address'
                    },
                    {
                        title: '回访用户',
                        key: 'address'
                    },
                    {
                        title: '回访时间',
                        key: 'address'
                    },
                    {
                        title: '方式',
                        key: 'address'
                    },
                    {
                        title: '回访内容',
                        key: 'address'
                    },
                    {
                        title: '提醒创建用户',
                        key: 'address'
                    },
                    {
                        title: '提醒创建时间',
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





