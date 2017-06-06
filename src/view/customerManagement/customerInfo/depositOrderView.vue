/**
 * 查看预收款订单页面
 */

<template>
    <div class="container-box userPower">
        <div v-if='powerLoad > 0'>
            <div class="container-header">
                <h2>预收款订单</h2>
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
                        <span>{{formValidate.amount}}</span>
                    </Form-item>
                    <Form-item label="支付状态">
                        <span :style="{color: payColor}">{{payName}}</span>
                    </Form-item>
                    <Form-item label="支付时间">
                        <span>{{formValidate.paidtime}}</span>
                    </Form-item>
                    <Form-item label="备注">
                        <span>{{formValidate.remark}}</span>
                    </Form-item>
                    <Form-item label="详细">
                        <Table :columns="col" :data="formValidate.detailList"></Table>
                        <p>合计：{{formValidate.amount}}</p>
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
                        title: '项目',
                        key: 'chargeName'
                    },
                    {
                        title: '价格',
                        key: 'price'
                    },
                    {
                        title: '数量',
                        key: 'num'
                    },
                    {
                        title: '金额',
                        key: 'total'
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
                    url: 'guard-webManager/customerRecord/depositOrder.jhtml',
                    data: {id: _vm.$route.query.id},
                    success: function(res){
                        if(res.status == 200 ){
                            if(res.data.code == 0) {
                                _vm.powerLoad = 1
                                _vm.formValidate = res.data.content
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

