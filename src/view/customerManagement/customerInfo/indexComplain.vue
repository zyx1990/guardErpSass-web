/**
 * 投诉反馈页面
 */

<template>
    <div class="customer-box">
        <div class="customer-item">
            <div class="customer-item-title">
                <h3><Icon type="pricetag"></Icon>投诉</h3>
            </div>
            <Table :columns="col" :data="data"></Table>
        </div>
        <div class="customer-item">
            <div class="customer-item-title">
                <h3><Icon type="pricetag"></Icon>黑名单</h3>
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
                        title: '提交时间',
                        key: 'name'
                    },
                    {
                        title: '提交用户',
                        key: 'address'
                    },
                    {
                        title: '投诉医院',
                        key: 'address'
                    },
                    {
                        title: '投诉医生',
                        key: 'address'
                    },
                    {
                        title: '投诉项目',
                        key: 'address'
                    },
                    {
                        title: '投诉内容',
                        key: 'address'
                    },
                    {
                        title: '状态',
                        key: 'address'
                    },
                    {
                        title: '处理用户',
                        key: 'address'
                    },
                    {
                        title: '处理时间',
                        key: 'address'
                    },
                    {
                        title: '处理措施',
                        key: 'address'
                    },
                    {
                        title: '客户反馈',
                        key: 'address'
                    }
                ],
                col1: [
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
                        key: 'address'
                    },
                    {
                        title: '提交用户',
                        key: 'address'
                    },
                    {
                        title: '原因',
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
            }
        },
        methods: {
            
        }
    }
</script>





