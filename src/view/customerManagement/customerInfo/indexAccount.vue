/**
 * 账户情况页面
 */

<template>
    <div class="customer-box">
        <div class="customer-item">
            <div class="customer-item-title">
                <h3><Icon type="pricetag"></Icon>账户情况</h3>
            </div>
            <table class="tableEdit">
                <tr>
                    <td class="tit">余额</td>
                    <td>{{depositRestTotal}}</td>
                    <td class="tit">券额</td>
                    <td>{{couponRestTotal}}</td>
                    <td class="tit">积分</td>
                    <td>{{pointTotal}}</td>
                </tr>
            </table>
        </div>
        <div class="customer-item">
            <div class="customer-item-title">
                <h3><Icon type="pricetag"></Icon>预收款</h3>
            </div>
            <Table :columns="col" :data="data"></Table>
        </div>
        <div class="customer-item">
            <div class="customer-item-title">
                <h3><Icon type="pricetag"></Icon>券</h3>
            </div>
            <Table :columns="col1" :data="data1"></Table>
            <p class="sumCount">合计：
                <span>金额：{{couAll}}</span>
                <span>剩余金额：{{couAllReal}}</span>
            </p> 
        </div>
        <div class="customer-item">
            <div class="customer-item-title">
                <h3><Icon type="pricetag"></Icon>积分</h3>
            </div>
            <Table :columns="col2" :data="data2"></Table>
            <p class="sumCount">合计：<span>数量：{{pointAll}}</span></p>   
        </div>
        <div class="customer-item">
            <div class="customer-item-title">
                <h3><Icon type="pricetag"></Icon>预收款变动</h3>
            </div>
            <Table :columns="col3" :data="data3"></Table>
        </div>
        <div class="customer-item">
            <div class="customer-item-title">
                <h3><Icon type="pricetag"></Icon>券变动</h3>
            </div>
            <Table :columns="col4" :data="data4"></Table>
            <p class="sumCount">合计：<span>金额：{{couAllChange}}</span></p> 
        </div>
    </div>
</template>

<script>
    export default {
        data () {
            return {
                cusName: '',
                cusId: '',
                pointTotal: '',
                depositRestTotal: '',
                couponRestTotal: '',
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
                        title: '时间',
                        key: 'name'
                    },
                    {
                        title: '类型',
                        key: 'address'
                    },
                    {
                        title: '所属医院',
                        key: 'address'
                    },
                    {
                        title: '获取方式',
                        key: 'address'
                    },
                    {
                        title: '预收款编号',
                        key: 'address'
                    },
                    {
                        title: '金额',
                        key: 'address'
                    },
                    {
                        title: '剩余金额',
                        key: 'address'
                    },
                    {
                        title: '操作员',
                        key: 'address'
                    },
                    {
                        title: '备注',
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
                        title: '时间',
                        key: 'createtime'
                    },
                    {
                        title: '类型',
                        key: 'categoryName'
                    },
                    {
                        title: '所属医院',
                        key: 'hospitalName'
                    },
                    {
                        title: '获取方式',
                        key: 'access',
                        render: (h, params) => {
                            return h('span', this.couType(params.row.access))
                        }
                    },
                    {
                        title: '券编号',
                        key: 'id'
                    },
                    {
                        title: '金额',
                        key: 'amount',
                        render: (h, params) => {
                            return h('span', {
                                style: {
                                    color: 'orange'
                                }
                            }, params.row.amount.toFixed(2))
                        }
                    },
                    {
                        title: '剩余金额',
                        key: 'rest',
                        render: (h, params) => {
                            return h('span', {
                                style: {
                                    color: 'orange'
                                }
                            }, params.row.rest.toFixed(2))
                        }
                    },
                    {
                        title: '操作员',
                        key: 'createUserName',
                        render: (h, params) => {
                            return h('p', '【' + params.row.createUserDeptName + '】 【' + params.row.createUserName + '】')
                        }
                    },
                    {
                        title: '过期时间',
                        key: 'expiration'
                    },
                    {
                        title: '状态',
                        width: 70,
                        key: 'status',
                        render: (h, params) => {
                            const color = params.row.status === 1 ? 'blue' : 'red';
                            const text = params.row.status === 1 ? '有效' : '已过期';
                            return h('span', {
                                style: {
                                    color: color
                                }
                            },text)
                        }
                    },
                    {
                        title: '备注',
                        key: 'remark'
                    }
                ],
                col2: [
                    {   
                        title: '序号',
                        type: 'index',
                        width: 60
                    },
                    {
                        title: '时间',
                        key: 'createtime'
                    },
                    {
                        title: '类型',
                        key: 'type',
                        render: (h, params) => {
                            return h('span', this.pointType(params.row.type))
                        }
                    },
                    {
                        title: '操作医院',
                        key: 'hospitalName'
                    },
                    {
                        title: '数量',
                        key: 'amount',
                        render: (h, params) => {
                            return h('span', {
                                style: {
                                    color: 'orange'
                                }
                            }, params.row.amount.toFixed(2))
                        }
                    },
                    {
                        title: '操作员',
                        key: 'createUserName',
                        render: (h, params) => {
                            return h('p', '【' + params.row.createUserDeptName + '】 【' + params.row.createUserName + '】')
                        }
                    },
                    {
                        title: '备注',
                        key: 'remark'
                    }
                ],
                col3: [
                    {   
                        title: '序号',
                        type: 'index',
                        width: 60
                    },
                    {
                        title: '时间',
                        key: 'name'
                    },
                    {
                        title: '变动类型',
                        key: 'address'
                    },
                    {
                        title: '预收款类型',
                        key: 'address'
                    },
                    {
                        title: '预收款编号',
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
                col4: [
                    {   
                        title: '序号',
                        type: 'index',
                        width: 60
                    },
                    {
                        title: '时间',
                        key: 'createTime'
                    },
                    {
                        title: '变动类型',
                        key: 'changeType'
                    },
                    {
                        title: '券类型',
                        key: 'type'
                    },
                    {
                        title: '券编号',
                        key: 'id'
                    },
                    {
                        title: '金额',
                        key: 'amount',
                        render: (h, params) => {
                            return h('span', {
                                style: {
                                    color: 'orange'
                                }
                            }, params.row.amount.toFixed(2))
                        }
                    },
                    {
                        title: '备注',
                        key: 'remark'
                    }
                ],
            }
        },
        computed: {
            pointAll () {
                var _sum = 0
                for(let item of this.data2) {
                    _sum += item.amount
                }
                _sum = _sum.toFixed(2)
                return _sum
            },
            couAll () {
                var _sum = 0
                for(let item of this.data1) {
                    _sum += item.amount
                }
                _sum = _sum.toFixed(2)
                return _sum
            },
            couAllReal () {
                var _sum = 0
                for(let item of this.data1) {
                    _sum += item.rest
                }
                _sum = _sum.toFixed(2)
                return _sum
            },
            couAllChange () {
                var _sum = 0
                for(let item of this.data4) {
                    _sum += item.amount
                }
                _sum = _sum.toFixed(2)
                return _sum
            },
        },
        created () {
            if (window.sessionStorage) {
                var lg = window.sessionStorage;
                this.cusId = lg.cusId
                this.cusName = lg.cusName
            }
            this.getList(this.cusId)
        },
        methods: {
            getList (id) {
                var _vm = this;
                _vm.$http.get({
                    url: 'guard-webManager/customerRecord/getAccount.jhtml',
                    data: {id: id},
                    success: function(res){
                        if(res.status == 200 ){
                            console.log(res)
                            _vm.pointTotal = res.data.content.pointTotal
                            _vm.depositRestTotal = res.data.content.depositRestTotal
                            _vm.couponRestTotal = res.data.content.couponRestTotal
                            _vm.data2 = res.data.content.pointList
                            _vm.data1 = res.data.content.couponList
                            _vm.data4 = res.data.content.couponChangeList
                        } else {
                            console.log(res.data.desc)
                        }
                    },
                    error: function(res){
                        console.log(res);
                    }
                });
            },
            pointType (id) {
                var _text = ''
                switch (id) {
                    case 11:
                        _text = '手工赠送'
                        break;
                    case 12:
                        _text = '消费赠送'
                        break;
                    case 21:
                        _text = '手工扣减'
                        break;
                    case 22:
                        _text = '兑换券'
                        break;
                    case 23:
                        _text = '兑换产品'
                        break;
                    case 24:
                        _text = '退款扣减'
                        break;
                    case 25:
                        _text = '退单扣减'
                        break;
                }
                return _text
            },
            couType (id) {
                var _text = ''
                switch (id) {
                    case 1:
                        _text = '预收款赠送'
                        break;
                    case 2:
                        _text = '手工赠送'
                        break;
                    case 3:
                        _text = '积分兑换'
                        break;
                    case 4:
                        _text = '激活券'
                        break;
                }
                return _text
            },
        }
    }
</script>

<style scoped>
    .sumCount {
        padding: 15px 0;
    }
    .sumCount span {
        margin: 0px 15px;
    }
</style>




