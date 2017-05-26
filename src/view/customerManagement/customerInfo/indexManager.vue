/**
 * 负责用户页面
 */

<template>
    <div class="customer-box">
        <div class="customer-item">
            <div class="customer-item-title">
                <h3><Icon type="pricetag"></Icon>开发人员</h3>
                <ul class="header-btn-group">
                    <li class="header-item"><Icon type="information"></Icon>详情</li>
                </ul>
            </div>
            <Table :columns="columns" :data="data"></Table>
        </div>
        <div class="customer-item">
            <div class="customer-item-title">
                <h3><Icon type="pricetag"></Icon>咨询人员</h3>
                <ul class="header-btn-group">
                    <li class="header-item"><Icon type="information"></Icon>详情</li>
                </ul>
            </div>
            <Table :columns="columns1" :data="data1"></Table>
        </div>
        <div class="customer-item">
            <div class="customer-item-title">
                <h3><Icon type="pricetag"></Icon>划扣执行医务人员</h3>
                <ul class="header-btn-group">
                    <li class="header-item"><Icon type="information"></Icon>详情</li>
                </ul>
            </div>
            <Table :columns="columns2" :data="data2"></Table>
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
                        title: '医院',
                        key: 'name'
                    },
                    {
                        title: '用户',
                        key: 'age'
                    },
                    {
                        title: '开始时间',
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
                        title: '医院',
                        key: 'name'
                    },
                    {
                        title: '用户',
                        key: 'age'
                    },
                    {
                        title: '开始时间',
                        key: 'address'
                    },
                    {
                        title: '备注',
                        key: 'address'
                    }
                ],
                columns2: [
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
                        title: '用户',
                        key: 'age'
                    },
                    {
                        title: '操作',
                        key: 'action',
                        width: 150,
                        align: 'center',
                        render (row, column, index) {
                            return `<i-button type="primary" size="small">
                                        <Icon type="ios-eye"></Icon>详细
                                    </i-button>`;
                        }
                    }
                ],
                data: [],
                data1: [],
                data2: [],
            }
        },
        methods: {
            
        }
    }
</script>





