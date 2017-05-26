/**
 * 店家页面
 */

<template>
    <div class="customer-box">
        <div class="customer-item">
            <div class="customer-item-title">
                <h3><Icon type="pricetag"></Icon>店家信息</h3>
            </div>
        </div>
        <div class="customer-item">
            <div class="customer-item-title">
                <h3><Icon type="pricetag"></Icon>店家佣金</h3>
            </div>
            <Table :columns="columns" :data="data"></Table>
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
                        title: '提交时间',
                        key: 'name'
                    },
                    {
                        title: '提交用户',
                        key: 'address'
                    },
                    {
                        title: '医院',
                        key: 'address'
                    },
                    {
                        title: '店家',
                        key: 'address'
                    },
                    {
                        title: '金额',
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
                            return `<i-button type="error" size="small">
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





