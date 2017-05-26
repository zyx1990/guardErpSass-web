/**
 * 报表中心页面
 */

<template>
    <div class="container-box">
        <div class="container-header">
            <h2>报表中心</h2>
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
                        title: '编号',
                        key: 'number'
                    },
                    {
                        title: '标签',
                        key: 'tag'
                    },
                    {
                        title: '描述',
                        key: 'remark'
                    }
                ],
                data: [
                    {
                        name: '锦医卫集团总部',
                        number: '13496',
                        tag: "1",
                        remark: '123'
                    },
                    {
                        name: '锦医卫集团总部',
                        number: '13496',
                        tag: "1",
                        remark: '123'
                    }
                ]
            }
        },
        methods: {
            edit: function(index) {

            }
        }
    }
</script>