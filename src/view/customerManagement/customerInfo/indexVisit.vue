/**
 * 上门情况页面
 */

<template>
    <div class="customer-box">
        <div class="customer-item">
            <div class="customer-item-title">
                <h3><Icon type="pricetag"></Icon>上门</h3>
            </div>
            <Table :columns="columns" :data="data"></Table>
        </div>
        <div class="customer-item">
            <div class="customer-item-title">
                <h3><Icon type="pricetag"></Icon>分诊</h3>
            </div>
            <Table :columns="columns1" :data="data1"></Table>
        </div>
        <div class="customer-item">
            <div class="customer-item-title">
                <h3><Icon type="pricetag"></Icon>部门接待</h3>
            </div>
            <Table :columns="columns3" :data="data3"></Table>
        </div>
        <div class="customer-item">
            <div class="customer-item-title">
                <h3><Icon type="pricetag"></Icon>住院记录</h3>
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
                        title: '上门时间',
                        key: 'name'
                    },
                    {
                        title: '医院',
                        key: 'age'
                    },
                    {
                        title: '接待人',
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
                        title: '分诊时间',
                        key: 'name'
                    },
                    {
                        title: '医院',
                        key: 'age'
                    },
                    {
                        title: '分诊用户',
                        key: 'address'
                    },
                    {
                        title: '接诊用户',
                        key: 'age'
                    },
                    {
                        title: '备注',
                        key: 'address'
                    },
                ],
                data: [],
                data1: [],
                data2: [],
                data3: [],
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
                        title: '操作用户',
                        key: 'age'
                    },
                    {
                        title: '状态',
                        key: 'address'
                    },
                    {
                        title: '住院时间',
                        key: 'age'
                    },
                    {
                        title: '床位',
                        key: 'address'
                    },
                    {
                        title: '出院时间',
                        key: 'address'
                    },
                    {
                        title: '备注',
                        key: 'address'
                    }
                ],
                columns3: [
                    {   
                        title: '序号',
                        type: 'index',
                        width: 60
                    },
                    {
                        title: '接待时间',
                        key: 'name'
                    },
                    {
                        title: '医院',
                        key: 'age'
                    },
                    {
                        title: '部门',
                        key: 'address'
                    },
                    {
                        title: '接待用户',
                        key: 'age'
                    }
                ]
            }
        },
        methods: {
            
        }
    }
</script>





