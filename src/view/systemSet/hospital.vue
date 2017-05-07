/**
 * 医院管理页面
 */

<template>
    <div class="container-box">
        <div class="container-header">
            <h2>医院管理</h2>
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
                        title: '全称',
                        key: 'fullName'
                    },
                    {
                        title: '排序号',
                        key: 'sort'
                    },
                    {
                        title: '城市',
                        key: 'city'
                    },
                    {
                        title: '地址',
                        key: 'address'
                    },
                    {
                        title: '备注',
                        key: 'remark'
                    },
                    {
                        title: '操作',
                        key: 'action',
                        width: 150,
                        align: 'center',
                        render (row, column, index) {
                            return `<i-button type="primary" size="small" @click="edit(${index})"><Icon type="edit"></Icon>编辑</i-button>`;
                        }
                    }
                ],
                data: [
                    {
                        name: '锦医卫集团总部',
                        fullName: '锦医卫集团总部1',
                        sort: "1",
                        city: '123',
                        address: '312',
                        remark: '221'
                    },
                    {
                        name: '锦医卫集团总部',
                        fullName: '锦医卫集团总部',
                        sort: "1",
                        city: '123',
                        address: '312',
                        remark: '221'
                    },
                    {
                        name: '锦医卫集团总部',
                        fullName: '锦医卫集团总部',
                        sort: "1",
                        city: '123',
                        address: '312',
                        remark: '221'
                    },
                    {
                        name: '锦医卫集团总部',
                        fullName: '锦医卫集团总部',
                        sort: "1",
                        city: '123',
                        address: '312',
                        remark: '221'
                    },
                    {
                        name: '锦医卫集团总部',
                        fullName: '锦医卫集团总部',
                        sort: "1",
                        city: '123',
                        address: '312',
                        remark: '221'
                    },
                ]
            }
        },
        methods: {
            edit: function(index) {

            }
        }
    }
</script>