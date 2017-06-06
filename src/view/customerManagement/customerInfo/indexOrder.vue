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
                        key: 'hospitalName'
                    },
                    {
                        title: '订单号',
                        key: 'id'
                    },
                    {
                        title: '提交用户',
                        key: 'createUserName'
                    },
                    {
                        title: '提交时间',
                        key: 'createtime'
                    },
                    {
                        title: '金额',
                        key: 'amount'
                    },
                    {
                        title: '支付状态',
                        key: 'paidstatus',
                        render: (h, params) => {
                            const _text = params.row.paidstatus == 1 ? '未付款' : params.row.paidstatus == 2 ? '已付款' : '欠款'
                            const _color = params.row.paidstatus == 1 ? 'red' : params.row.paidstatus == 2 ? 'blue' : 'orange'
                            return h('span', {
                                style: {
                                    color: _color
                                }
                            }, _text)
                        }
                    },
                    {
                        title: '支付时间',
                        key: 'paidtime'
                    },
                    {
                        title: '备注',
                        key: 'remark'
                    },
                    {
                        title: '操作',
                        key: 'action',
                        width: 150,
                        align: 'center',
                        render: (h, params) => {
                            const _display = params.row.paidstatus == 2 ? 'none': 'inline-block'
                            return h('div', [
                                    h('Button', {
                                        props: {
                                            type: 'primary',
                                            size: 'small',
                                            icon: 'ios-eye'
                                        },
                                        style: {
                                            marginRight: '2px'
                                        },
                                        on: {
                                            click: () => {
                                                this.toView(params.row, '1')
                                            }
                                        }
                                    }, '查看'),
                                    h('Button', {
                                        props: {
                                            type: 'error',
                                            size: 'small',
                                            icon: 'ios-trash-outline'
                                        },
                                        style: {
                                            display: _display
                                        },
                                        on: {
                                            click: () => {
                                                this.remove(params.row, '1')
                                            }
                                        }
                                    }, '取消'),
                                ])
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
                        key: 'hospitalName'
                    },
                    {
                        title: '订单号',
                        key: 'id'
                    },
                    {
                        title: '提交用户',
                        key: 'createUserName'
                    },
                    {
                        title: '提交时间',
                        key: 'createtime'
                    },
                    {
                        title: '金额',
                        key: 'totalprice'
                    },
                    {
                        title: '成交金额',
                        key: 'finalprice'
                    },
                    {
                        title: '折扣(%)',
                        key: 'totalprice',
                        render: (h, params) => {
                            const _text = params.row.totalprice == 0 ? 0 : (params.row.finalprice / params.row.totalprice * 100).toFixed(2)
                            return h('span', _text)
                        }
                    },
                    {
                        title: '支付状态',
                        key: 'paidstatus',
                        render: (h, params) => {
                            const _text = params.row.paidstatus == 1 ? '未付款' : params.row.paidstatus == 2 ? '已付款' : '欠款'
                            const _color = params.row.paidstatus == 1 ? 'red' : params.row.paidstatus == 2 ? 'blue' : 'orange'
                            return h('span', {
                                style: {
                                    color: _color
                                }
                            }, _text)
                        }
                    },
                    {
                        title: '支付时间',
                        key: 'paidtime',
                    },
                    {
                        title: '审核状态',
                        key: 'auditstatus',
                        render: (h, params) => {
                            const _text = params.row.auditstatus == 1 ? '待审核' : params.row.auditstatus == 3 ? '审核不通过' : '审核通过'
                            const _color = params.row.auditstatus == 1 ? 'orange' : params.row.auditstatus == 3 ? 'red' : 'blue'
                            return h('span', {
                                style: {
                                    color: _color
                                }
                            }, _text)
                        }
                    },
                    {
                        title: '备注',
                        key: 'remark'
                    },
                    {
                        title: '操作',
                        key: 'action',
                        width: 220,
                        align: 'center',
                        render: (h, params) => {
                            const _display = params.row.paidstatus == 1 ? 'inline-block': 'none'
                            return h('div', [
                                    h('Button', {
                                        props: {
                                            type: 'primary',
                                            size: 'small',
                                            icon: 'ios-eye'
                                        },
                                        style: {
                                            marginRight: '2px'
                                        },
                                        on: {
                                            click: () => {
                                                this.toView(params.row, '2')
                                            }
                                        }
                                    }, '查看'),
                                    h('Button', {
                                        props: {
                                            type: 'info',
                                            size: 'small',
                                            icon: 'edit'
                                        },
                                        style: {
                                            display: _display,
                                            marginRight: '2px'
                                        },
                                        on: {
                                            click: () => {
                                                this.toEdit(params.row)
                                            }
                                        }
                                    }, '修改'),
                                    h('Button', {
                                        props: {
                                            type: 'error',
                                            size: 'small',
                                            icon: 'ios-trash-outline'
                                        },
                                        style: {
                                            display: _display
                                        },
                                        on: {
                                            click: () => {
                                                this.remove(params.row, '2')
                                            }
                                        }
                                    }, '取消'),
                                ])
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
                cusId: '',
                cusName: '',
            }
        },
        created () {
            if (window.sessionStorage) {
                var lg = window.sessionStorage;
                this.cusId = lg.cusId
                this.cusName = lg.cusName
            }
            this.getId(this.cusId)
        },
        methods: {
            // 获取资料
            getId (id) {
                var _vm = this;
                _vm.$http.get({
                    url: 'guard-webManager/customerRecord/getOrder.jhtml',
                    data: {id: id},
                    success: function(res){
                        console.log(res)
                        _vm.data = res.data.content.depositOrderList
                        _vm.data1 = res.data.content.orderList
                    },
                    error: function(res){
                        console.log(res);
                    }
                });
            },
            //取消订单
            remove (data, type) {
                var _vm = this;
                var _url = ''
                switch (type) {
                    case '1':
                        _url = 'guard-webManager/customerRecord/deleteDepositOrder.jhtml'
                        break;
                    case '2':
                        _url = 'guard-webManager/customerRecord/orderDelete.jhtml'
                        break;
                }
                _vm.$Modal.confirm({
                    title: '系统提示',
                    content: '确定取消此订单？',
                    onOk: () => {
                        _vm.$http.post({
                            url: _url,
                            data: {id: data.id},
                            success: function(res){
                                if(res.status == 200 ){
                                    if(res.data.code == 0) {
                                        _vm.getId(_vm.cusId)
                                        _vm.$Notice.success({
                                            title: '系统提示！',
                                            desc: '删除成功！'
                                        });
                                    } else {
                                        _vm.$Notice.error({
                                            title: '系统提示！',
                                            desc: res.data.desc
                                        });
                                    }
                                } else {
                                    console.log(res.data.desc)
                                }
                            },
                            error: function(res){
                                console.log(res);
                            }
                        });
                    },
                    onCancel: () => {
                        
                    }
                });
            },
            //查看订单
            toView (data, type) {
                var _text = ''
                var _url = ''
                switch (type) {
                    case '1':
                        _url = '/depositOrderView'
                        _text = '查看预收款订单'
                        break;
                    case '2':
                        _url = '/orderView'
                        _text = '查看项目订单'
                        break;
                }
                var breadData = [
                    {
                        url: '/desktop',
                        text: '桌面'
                    },
                    {
                        url: '/customerMsg',
                        text: this.cusName
                    },
                    {
                        url: _url,
                        text: _text
                    }
                ];
                this.$store.dispatch('setBreadData', breadData);
                this.$router.push({
                    path: _url,
                    query: {
                        id: data.id
                    }
                })
            },
            //修改项目订单
            toEdit (data) {
                var breadData = [
                    {
                        url: '/desktop',
                        text: '桌面'
                    },
                    {
                        url: '/customerMsg',
                        text: this.cusName
                    },
                    {
                        url: '/orderUpdate',
                        text: '修改项目订单'
                    }
                ];
                this.$store.dispatch('setBreadData', breadData);
                this.$router.push({
                    path: 'orderUpdate',
                    query: {
                        id: data.id
                    }
                })
            }
        }
    }
</script>





