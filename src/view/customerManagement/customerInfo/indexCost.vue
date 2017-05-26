/**
 * 耗材成本页面
 */

<template>
    <div class="customer-box">
        <div class="customer-item">
            <div class="customer-item-title">
                <h3><Icon type="pricetag"></Icon>耗材</h3>
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
                        title: '消耗日期',
                        key: 'name'
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
                        title: '医院',
                        key: 'address'
                    },
                    {
                        title: '仓库',
                        key: 'address'
                    },
                    {
                        title: '物品编号',
                        key: 'address'
                    },
                    {
                        title: '物品名称',
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
                        title: '单价',
                        key: 'address'
                    },
                    {
                        title: '金额',
                        key: 'address'
                    },
                    {
                        title: '操作用户',
                        key: 'address'
                    },
                    {
                        title: '操作时间',
                        key: 'address'
                    }
                ],
                data: []
            }
        },
        methods: {
            
        }
    }
</script>