/**
 * 消费项目页面
 */

<template>
    <div class="customer-box">
        <div class="customer-item">
            <div class="customer-item-title">
                <h3><Icon type="pricetag"></Icon>未完成项目</h3>
            </div>
            <Table :columns="col" :data="data"></Table>
        </div>
        <div class="customer-item">
            <div class="customer-item-title">
                <h3><Icon type="pricetag"></Icon>全部消费项目</h3>
            </div>
            <Alert type="success">
                <p>合计消费金额：￥4000.00</p>
                <p>其中现金刷卡收款：￥4000.00；预收款支付：￥0.00；券支付：￥0.00；欠款：￥0.00</p>
                <p>退项目金额：￥0</p>
            </Alert>
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
                        title: '购买医院',
                        key: 'name'
                    },
                    {
                        title: '购买日期',
                        key: 'age'
                    },
                    {
                        title: '订单号',
                        key: 'address'
                    },
                    {
                        title: '项目编号',
                        key: 'address'
                    },
                    {
                        title: '项目名称',
                        key: 'address'
                    },
                    {
                        title: '规格',
                        key: 'address'
                    },
                    {
                        title: '分类',
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
                        title: '划扣数量',
                        key: 'address'
                    },
                    {
                        title: '未完成数量',
                        key: 'address'
                    },
                    {
                        title: '指定医生',
                        key: 'address'
                    },
                    {
                        title: '下单用户',
                        key: 'address'
                    },
                    {
                        title: '成交金额',
                        key: 'address'
                    },
                    {
                        title: '现金',
                        key: 'address'
                    },
                    {
                        title: '刷卡',
                        key: 'address'
                    },
                    {
                        title: '预收款使用',
                        key: 'address'
                    },
                    {
                        title: '券使用',
                        key: 'address'
                    },
                    {
                        title: '欠款',
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
                        title: '购买医院',
                        key: 'name'
                    },
                    {
                        title: '购买日期',
                        key: 'age'
                    },
                    {
                        title: '订单号',
                        key: 'address'
                    },
                    {
                        title: '项目编号',
                        key: 'address'
                    },
                    {
                        title: '项目名称',
                        key: 'address'
                    },
                    {
                        title: '规格',
                        key: 'address'
                    },
                    {
                        title: '分类',
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
                        title: '划扣数量',
                        key: 'address'
                    },
                    {
                        title: '未完成数量',
                        key: 'address'
                    },
                    {
                        title: '指定医生',
                        key: 'address'
                    },
                    {
                        title: '下单用户',
                        key: 'address'
                    },
                    {
                        title: '成交金额',
                        key: 'address'
                    },
                    {
                        title: '现金',
                        key: 'address'
                    },
                    {
                        title: '刷卡',
                        key: 'address'
                    },
                    {
                        title: '预收款使用',
                        key: 'address'
                    },
                    {
                        title: '券使用',
                        key: 'address'
                    },
                    {
                        title: '欠款',
                        key: 'address'
                    },
                    {
                        title: '退数量',
                        key: 'address'
                    },
                    {
                        title: '退金额',
                        key: 'address'
                    }
                ]
            }
        },
        methods: {
            
        }
    }
</script>





