/**
 * 预约情况页面
 */

<template>
    <div class="customer-box">
        <div class="customer-item">
            <div class="customer-item-title">
                <h3><Icon type="pricetag"></Icon>咨询预约</h3>
            </div>
            <Table :columns="col" :data="data"></Table>
        </div>
        <div class="customer-item">
            <div class="customer-item-title">
                <h3><Icon type="pricetag"></Icon>治疗预约</h3>
            </div>
            <Table :columns="col1" :data="data1"></Table>
        </div>
        <div class="customer-item">
            <div class="customer-item-title">
                <h3><Icon type="pricetag"></Icon>手术预约</h3>
            </div>
            <Table :columns="col2" :data="data2"></Table>
        </div>
    </div>
</template>

<script>
    export default {
        data () {
            return {
                col: [
                    {   
                        title: '序号',
                        type: 'index',
                        width: 60
                    },
                    {
                        title: '预约医院',
                        key: 'name'
                    },
                    {
                        title: '预约日期',
                        key: 'age'
                    },
                    {
                        title: '预约时间',
                        key: 'address'
                    },
                    {
                        title: '预约咨询人员',
                        key: 'address'
                    },
                    {
                        title: '预约码',
                        key: 'address'
                    },
                    {
                        title: '状态',
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
                                        <Icon type="edit"></Icon>编辑
                                    </i-button> <i-button type="error" size="small">
                                        <Icon type="ios-trash-outline"></Icon>删除
                                    </i-button>`;
                        }
                    }
                ],
                data: [],
                data1: [],
                data2: [],
                col1: [
                    {   
                        title: '序号',
                        type: 'index',
                        width: 60
                    },
                    {
                        title: '预约日期',
                        key: 'age'
                    },
                    {
                        title: '预约时间',
                        key: 'address'
                    },
                    {
                        title: '状态',
                        key: 'address'
                    },
                    {
                        title: '预约医院',
                        key: 'name'
                    },
                    {
                        title: '预约医生',
                        key: 'address'
                    },
                    {
                        title: '预约项目',
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
                                        <Icon type="edit"></Icon>编辑
                                    </i-button> <i-button type="error" size="small">
                                        <Icon type="ios-trash-outline"></Icon>删除
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
                        title: '预约医院',
                        key: 'name'
                    },
                    {
                        title: '预约日期',
                        key: 'age'
                    },
                    {
                        title: '预约时间',
                        key: 'address'
                    },
                    {
                        title: '医生',
                        key: 'address'
                    },
                    {
                        title: '麻醉项目',
                        key: 'address'
                    },
                    {
                        title: '项目',
                        key: 'address'
                    },
                    {
                        title: '备注',
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
                        title: '状态',
                        key: 'address'
                    },
                    {
                        title: '开始时间',
                        key: 'address'
                    },
                    {
                        title: '结束时间',
                        key: 'address'
                    },
                    {
                        title: '操作',
                        key: 'action',
                        width: 150,
                        align: 'center',
                        render (row, column, index) {
                            return `<i-button type="primary" size="small">
                                        <Icon type="edit"></Icon>编辑
                                    </i-button> <i-button type="error" size="small">
                                        <Icon type="ios-trash-outline"></Icon>删除
                                    </i-button>
                                    <i-button type="warning" size="small">
                                        <Icon type="printer"></Icon>打印
                                    </i-button>`;
                        }
                    }
                ]
            }
        },
        created () {
            this.getList()
        },
        methods: {
            getList () {
                var _vm = this;
                _vm.$http.get({
                    url: 'guard-webManager/customerRecord/getAppointments.jhtml',
                    data: {id: _vm.$route.query.id},
                    success: function(res){
                        if(res.status == 200 ){
                            console.log(res)
                            // _vm.data = res.data.content
                        } else {
                            console.log(res.data.desc)
                        }
                    },
                    error: function(res){
                        console.log(res);
                    }
                });
            },
        }
    }
</script>





