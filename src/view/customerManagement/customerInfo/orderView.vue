/**
 * 查看项目订单页面
 */

<template>
    <div class="container-box userPower">
        <div v-if='powerLoad > 0'>
            <div class="container-header">
                <h2>项目订单</h2>
            </div>
            <div class="container-body">
                <Form ref="formValidate" :model="formValidate" :label-width="100" label-position="right">
                    <Form-item label="提交医院">
                        <span>{{formValidate.hospitalName}}</span>
                    </Form-item>
                    <Form-item label="提交时间">
                        <span>{{formValidate.createtime}}</span>
                    </Form-item>
                    <Form-item label="提交用户">
                        <span>{{formValidate.createUserName}}</span>
                    </Form-item>
                    <Form-item label="金额">
                        <span>{{formValidate.finalprice}}</span>
                    </Form-item>
                    <Form-item label="支付状态">
                        <span :style="{color: payColor}">{{payName}}</span>
                    </Form-item>
                    <Form-item label="支付时间">
                        <span>{{formValidate.paidtime}}</span>
                    </Form-item>
                    <Form-item label="审核状态">
                        <span :style="{color: auditColor}">{{auditName}}</span>
                    </Form-item>
                    <Form-item label="审核信息">
                        <span v-if="formValidate.autoapprove == 1">自动审核</span>
                    </Form-item>
                    <Form-item label="备注">
                        <span>{{formValidate.remark}}</span>
                    </Form-item>
                    <Form-item label="详细">
                        <Table :columns="col" :data="formValidate.detailList"></Table>
                    </Form-item>
                    <Form-item label="合计">
                        <span style='margin-right:20px;'>金额：{{formValidate.totalprice}}</span>
                        <span style='margin-right:20px;'>成交金额：{{formValidate.finalprice}}</span>
                        <span>折扣：{{allSell}}</span>
                    </Form-item>
                </Form>
                <div class="footer-btnGroup">
                    <Button type="primary" shape="circle" icon="android-arrow-back" @click='back'>返回</Button>
                </div>
            </div>
        </div>
        <Alert type="error" show-icon v-if='powerLoad == 0'>
            提示信息
            <div slot="desc">
                <p>{{errorMsg}}</p>
                <Button type="primary" shape="circle" icon="android-arrow-back" @click='back'>返回</Button>
            </div>
        </Alert>
        <Spin fix v-if='powerLoad < 0'>
            <Icon type="load-c" size=40 class="demo-spin-icon-load"></Icon>
            <div>Loading</div>
        </Spin>
    </div>
</template>

<script>
    export default {
        data () {
            return {
                powerLoad: '-1',
                errorMsg: '',
                customerName: '',
                customerId: '',
                formValidate: {},
                col: [
                    {
                        title: '项目编号',
                        key: 'id'
                    },
                    {
                        title: '项目名称',
                        key: 'chargeName'
                    },
                    {
                        title: '规格',
                        key: 'chargeSize'
                    },
                    {
                        title: '数量',
                        key: 'num'
                    },
                    {
                        title: '金额',
                        key: 'price'
                    },
                    {
                        title: '成交金额',
                        key: 'finalprice'
                    },
                    {
                        title: '折扣(%)',
                        key: 'price',
                        render: (h, params) => {
                            if(params.row.price != 0) {
                                const _real = (params.row.finalprice / params.row.price * 100).toFixed(2)
                                return h('span', _real)
                            } else {
                                return h('span', 0)
                            }
                        }
                    },
                    {
                        title: '套餐',
                        key: 'setName'
                    },
                    {
                        title: '指定医生',
                        key: 'doctorUserName'
                    }
                ]
            }
        },
        computed: {
            payName () {
                const _text = this.formValidate.paidstatus == 1 ? '未付款' : this.formValidate.paidstatus == 2 ? '已付款' : '欠款'
                return _text
            },
            payColor () {
                const _color = this.formValidate.paidstatus == 1 ? 'red' : this.formValidate.paidstatus == 2 ? 'blue' : 'orange'
                return _color
            },
            auditName () {
                const _text = this.formValidate.auditstatus == 1 ? '待审核' : this.formValidate.auditstatus == 3 ? '审核不通过' : '审核通过'
                return _text
            },
            auditColor () {
                const _color = this.formValidate.auditstatus == 1 ? 'orange' : this.formValidate.auditstatus == 3 ? 'red' : 'blue'
                return _color
            },
            allSell () {
                var _real = 0
                if(this.formValidate.totalprice == 0) {
                    return _real
                } else {
                     _real = (this.formValidate.finalprice / this.formValidate.totalprice * 100).toFixed(2)
                     return _real
                }
            },
        },
        created () {
            if (window.sessionStorage) {
                var lg = window.sessionStorage;
                this.customerId= lg.cusId
                this.customerName = lg.cusName
            }
            this.getId()
        },
        methods: {
            // 判断权限
            getId () {
                var _vm = this;
                _vm.$http.get({
                    url: 'guard-webManager/customerRecord/orderView.jhtml',
                    data: {id: _vm.$route.query.id},
                    success: function(res){
                        if(res.status == 200 ){
                            console.log(res)
                            if(res.data.code == 0) {
                                _vm.powerLoad = 1
                                _vm.formValidate = res.data.content.Order
                            } else {
                                _vm.powerLoad = 0
                                _vm.errorMsg = res.data.desc
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
            back () {
                var breadData = [
                    {
                        url: '/desktop',
                        text: '桌面'
                    },
                    {
                        url: '/customer',
                        text: '客户管理'
                    },
                    {
                        url: '/indexOrder',
                        text: this.customerName
                    }
                ];
                this.$store.dispatch('setBreadData', breadData);
                this.$router.back(-1)
            }
        }
    }
</script>

