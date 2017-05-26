/**
 * 微信分销页面
 */

<template>
    <div class="customer-box">
        <div class="customer-item">
            <div class="customer-item-title">
                <h3><Icon type="pricetag"></Icon>推荐人信息</h3>
            </div>
        </div>
        <div class="customer-item">
            <div class="customer-item-title">
                <h3><Icon type="pricetag"></Icon>推荐客户列表</h3>
            </div>
            <Table :columns="col" :data="data"></Table>
        </div>
        <div class="customer-item">
            <div class="customer-item-title">
                <h3><Icon type="pricetag"></Icon>获取佣金记录</h3>
            </div>
            <Table :columns="col1" :data="data1"></Table>
        </div>
        <div class="customer-item">
            <div class="customer-item-title">
                <h3><Icon type="pricetag"></Icon>佣金结算记录</h3>
            </div>
            <Table :columns="col2" :data="data2"></Table>
        </div>
    </div>
</template>

<script>
    export default {
        data () {
            return {
                data: [],
                data: [],
                data2: [],
                col: [
                    {   
                        title: '序号',
                        type: 'index',
                        width: 60
                    },
                    {
                        title: '顾客姓名',
                        key: 'name'
                    },
                    {
                        title: '性别',
                        key: 'address'
                    },
                    {
                        title: '手机号',
                        key: 'address'
                    },
                    {
                        title: '提交时间',
                        key: 'address'
                    },
                    {
                        title: '状态',
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
                        title: '医院',
                        key: 'name'
                    },
                    {
                        title: '生成时间',
                        key: 'address'
                    },
                    {
                        title: '消费客户',
                        key: 'address'
                    },
                    {
                        title: '类型',
                        key: 'address'
                    },
                    {
                        title: '提成金额',
                        key: 'address'
                    },
                    {
                        title: '提成等级',
                        key: 'address'
                    },
                    {
                        title: '提成比例',
                        key: 'address'
                    },
                    {
                        title: '提成收益',
                        key: 'address'
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
                        key: 'name'
                    },
                    {
                        title: '操作时间',
                        key: 'address'
                    },
                    {
                        title: '操作用户',
                        key: 'address'
                    },
                    {
                        title: '金额',
                        key: 'address'
                    },
                    {
                        title: '备注',
                        key: 'address'
                    }
                ],
            }
        },
        methods: {
            
        }
    }
</script>





