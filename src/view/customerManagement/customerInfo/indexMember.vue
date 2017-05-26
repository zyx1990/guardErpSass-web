/**
 * 会员权益页面
 */

<template>
    <div class="customer-box">
        <Alert type="success">当前会员类型为：金卡；累计缴费金额为：￥0元；距离下一级会员 ￥1000.00元</Alert>
        <div class="customer-item">
            <div class="customer-item-title">
                <h3><Icon type="pricetag"></Icon>会员记录</h3>
            </div>
            <Table :columns="columns" :data="data"></Table>
        </div>
        <div class="customer-item">
            <div class="customer-item-title">
                <h3><Icon type="pricetag"></Icon>权益列表</h3>
            </div>
            <Table :columns="columns1" :data="data1"></Table>
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
                        title: '会员类型',
                        key: 'name'
                    },
                    {
                        title: '操作时间',
                        key: 'age'
                    },
                    {
                        title: '操作用户',
                        key: 'address'
                    },
                    {
                        title: '备注',
                        key: 'address'
                    }
                ],
                columns1: [
                    {   
                        title: '序号',
                        type: 'index',
                        width: 60
                    },
                    {
                        title: '权益名称',
                        key: 'name'
                    },
                    {
                        title: '内容',
                        key: 'age'
                    },
                    {
                        title: '操作时间',
                        key: 'address'
                    },
                    {
                        title: '操作用户',
                        key: 'age'
                    },
                    {
                        title: '备注',
                        key: 'address'
                    },
                ],
                data: [],
                data1: []
            }
        },
        methods: {
            
        }
    }
</script>





