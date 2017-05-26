/**
 * 客户间关系页面
 */

<template>
    <div class="customer-box">
        <div class="customer-item">
            <div class="customer-item-title">
                <h3><Icon type="pricetag"></Icon>客户间关系</h3>
            </div>
            <Table :columns="col" :data="data"></Table>
        </div>
        <div class="customer-item">
            <div class="customer-item-title">
                <h3><Icon type="pricetag"></Icon>推荐人</h3>
            </div>
            <Table :columns="col1" :data="data1"></Table>
        </div>
    </div>
</template>

<script>
    export default {
        data () {
            return {
                data: [],
                data1: [],
                col: [
                    {   
                        title: '序号',
                        type: 'index',
                        width: 60
                    },
                    {
                        title: '关系',
                        key: 'name'
                    },
                    {
                        title: '客户',
                        key: 'address'
                    },
                    {
                        title: '提交时间',
                        key: 'address'
                    },
                    {
                        title: '提交用户',
                        key: 'address'
                    },
                    {
                        title: '操作',
                        key: 'action',
                        width: 150,
                        align: 'center',
                        render (row, column, index) {
                            return `<i-button type="error" size="small">
                                        <Icon type="ios-trash-outline"></Icon>删除
                                    </i-button>`;
                        }
                    }
                ],
                col1: [
                    {
                        title: '推荐人编号',
                        key: 'name'
                    },
                    {
                        title: '姓名',
                        key: 'address'
                    },
                    {
                        title: '客户编号',
                        key: 'address'
                    },
                    {
                        title: '客户姓名',
                        key: 'address'
                    }
                ],
            }
        },
        methods: {
            
        }
    }
</script>





