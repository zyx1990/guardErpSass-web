/**
 * 订单情况页面
 */

<template>
    <div class="customer-box">
        <div class="customer-item">
            <div class="customer-item-title">
                <h3><Icon type="pricetag"></Icon>预收款订单</h3>
            </div>
            <Table :columns="col" :data="data"></Table>
        </div>
        <div class="customer-item">
            <div class="customer-item-title">
                <h3><Icon type="pricetag"></Icon>项目订单</h3>
            </div>
            <Table :columns="col1" :data="data1"></Table>
        </div>
        <div class="customer-item">
            <div class="customer-item-title">
                <h3><Icon type="pricetag"></Icon>还款单</h3>
            </div>
            <Table :columns="col2" :data="data2"></Table>
        </div>
        <div class="customer-item">
            <div class="customer-item-title">
                <h3><Icon type="pricetag"></Icon>退项目订单</h3>
            </div>
            <Table :columns="col3" :data="data3"></Table>
        </div>
        <div class="customer-item">
            <div class="customer-item-title">
                <h3><Icon type="pricetag"></Icon>退预收款单</h3>
            </div>
            <Table :columns="col4" :data="data4"></Table>       
        </div>
    </div>
</template>

<script>
    export default {
        data () {
            return {
                data: [],
                data1: [],
                data2: [],
                data3: [],
                data4: [],
                col: [
                    {   
                        title: '序号',
                        type: 'index',
                        width: 60
                    },
                    {
                        title: '提交医院',
                        key: 'age'
                    },
                    {
                        title: '订单号',
                        key: 'age'
                    },
                    {
                        title: '提交用户',
                        key: 'address'
                    },
                    {
                        title: '提交时间',
                        key: 'address'
                    },
                    {
                        title: '金额',
                        key: 'address'
                    },
                    {
                        title: '支付状态',
                        key: 'address'
                    },
                    {
                        title: '支付时间',
                        key: 'address'
                    },
                    {
                        title: '备注',
                        key: 'address'
                    },
                    {
                        title: '操作',
                        key: 'action',
                        width: 150,
                        align: 'center',
                        render (row, column, index) {
                            return `<i-button type="primary" size="small">
                                        <Icon type="ios-eye"></Icon>查看
                                    </i-button>
                                    </i-button> <i-button type="error" size="small">
                                        <Icon type="ios-trash-outline"></Icon>取消
                                    </i-button>`;
                        }
                    }
                ],
                col1: [
                    {   
                        title: '序号',
                        type: 'index',
                        width: 60
                    },
                    {
                        title: '提交医院',
                        key: 'age'
                    },
                    {
                        title: '订单号',
                        key: 'age'
                    },
                    {
                        title: '提交用户',
                        key: 'address'
                    },
                    {
                        title: '提交时间',
                        key: 'address'
                    },
                    {
                        title: '金额',
                        key: 'address'
                    },
                    {
                        title: '成交金额',
                        key: 'address'
                    },
                    {
                        title: '折扣(%)',
                        key: 'address'
                    },
                    {
                        title: '支付状态',
                        key: 'address'
                    },
                    {
                        title: '支付时间',
                        key: 'address'
                    },
                    {
                        title: '审核状态',
                        key: 'address'
                    },
                    {
                        title: '备注',
                        key: 'address'
                    },
                    {
                        title: '操作',
                        key: 'action',
                        width: 150,
                        align: 'center',
                        render (row, column, index) {
                            return `<i-button type="primary" size="small">
                                        <Icon type="ios-eye"></Icon>查看
                                    </i-button>
                                    <i-button type="primary" size="small">
                                        <Icon type="edit"></Icon>编辑
                                    </i-button> <i-button type="error" size="small">
                                        <Icon type="ios-trash-outline"></Icon>取消
                                    </i-button>`;
                        }
                    }
                ],
                col2: [
                    {   
                        title: '序号',
                        type: 'index',
                        width: 60
                    },
                    {
                        title: '操作医院',
                        key: 'age'
                    },
                    {
                        title: '欠款订单号',
                        key: 'age'
                    },
                    {
                        title: '操作用户',
                        key: 'address'
                    },
                    {
                        title: '操作时间',
                        key: 'address'
                    },
                    {
                        title: '应还金额',
                        key: 'address'
                    },
                    {
                        title: '还款金额',
                        key: 'address'
                    },
                    {
                        title: '剩余欠款',
                        key: 'address'
                    },
                    {
                        title: '备注',
                        key: 'address'
                    },
                    {
                        title: '操作',
                        key: 'action',
                        width: 150,
                        align: 'center',
                        render (row, column, index) {
                            return `<i-button type="primary" size="small">
                                        <Icon type="ios-eye"></Icon>查看
                                    </i-button>`;
                        }
                    }
                ],
                col3: [
                    {   
                        title: '序号',
                        type: 'index',
                        width: 60
                    },
                    {
                        title: '提交医院',
                        key: 'age'
                    },
                    {
                        title: '订单号',
                        key: 'age'
                    },
                    {
                        title: '提交用户',
                        key: 'address'
                    },
                    {
                        title: '提交时间',
                        key: 'address'
                    },
                    {
                        title: '金额',
                        key: 'address'
                    },
                    {
                        title: '支付状态',
                        key: 'address'
                    },
                    {
                        title: '支付时间',
                        key: 'address'
                    },
                    {
                        title: '审核状态',
                        key: 'address'
                    },
                    {
                        title: '备注',
                        key: 'address'
                    },
                    {
                        title: '操作',
                        key: 'action',
                        width: 150,
                        align: 'center',
                        render (row, column, index) {
                            return `<i-button type="primary" size="small">
                                        <Icon type="ios-eye"></Icon>查看
                                    </i-button>
                                    <i-button type="error" size="small">
                                        <Icon type="ios-trash-outline"></Icon>取消
                                    </i-button>`;
                        }
                    }
                ],
                col4: [
                    {   
                        title: '序号',
                        type: 'index',
                        width: 60
                    },
                    {
                        title: '提交医院',
                        key: 'age'
                    },
                    {
                        title: '订单号',
                        key: 'age'
                    },
                    {
                        title: '提交用户',
                        key: 'address'
                    },
                    {
                        title: '提交时间',
                        key: 'address'
                    },
                    {
                        title: '金额',
                        key: 'address'
                    },
                    {
                        title: '支付状态',
                        key: 'address'
                    },
                    {
                        title: '支付时间',
                        key: 'address'
                    },
                    {
                        title: '审核状态',
                        key: 'address'
                    },
                    {
                        title: '备注',
                        key: 'address'
                    },
                    {
                        title: '操作',
                        key: 'action',
                        width: 150,
                        align: 'center',
                        render (row, column, index) {
                            return `<i-button type="primary" size="small">
                                        <Icon type="ios-eye"></Icon>查看
                                    </i-button>
                                    <i-button type="error" size="small">
                                        <Icon type="ios-trash-outline"></Icon>取消
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





