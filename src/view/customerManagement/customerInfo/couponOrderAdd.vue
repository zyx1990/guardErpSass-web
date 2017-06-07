/**
 * 送券单页面
 */

<template>
    <div class="container-box userPower">
        <div v-if='powerLoad > 0'>
            <div class="container-header">
                <h2>送券单</h2>
            </div>
            <div class="container-body">
                <Form ref="formValidate" :model="formValidate" :rules="ruleForm" :label-width="100" label-position="right">
                    <Form-item label="券类型" prop="CategoryName" required class='treatAddObj'>
                        <Input v-model="formValidate.CategoryName" readonly icon="ios-search" placeholder="请选择券类型" @on-focus="show" style="width:300px"></Input>
                    </Form-item>
                    <Form-item label="金额" prop="amount" required>
                        <Input v-model="formValidate.amount" style='width:300px;' placeholder="请输入金额"></Input>
                    </Form-item>
                    <Form-item label="备注" prop="content">
                        <Input v-model="formValidate.content" type="textarea" :autosize="{minRows: 2,maxRows: 7}" placeholder="请输入备注"></Input>
                    </Form-item>
                </Form>
                <div class="footer-btnGroup">
                    <Button type="primary" shape="circle" icon="checkmark" @click='save'>保存</Button>
                    <Button type="primary" shape="circle" icon="android-arrow-back" @click='back'>返回</Button>
                </div>
                <Modal
                    title="选择券类型"
                    width='700'
                    v-model="modal"
                    :closable="false"
                    class-name="vertical-center-modal">
                    <Table height="350" stripe :columns="col" :data="data" @on-row-click='choose'></Table>
                </Modal>
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
            const validatePoint = (rule, value, callback) => {
                if (value === '') {
                    callback(new Error('请输入金额'));
                } else if (/^\+?[1-9][0-9]*$/.test(value)) {
                    callback();
                }  else  {
                    callback(new Error('请输入正整数'));
                }
            };
            const validateCou = (rule, value, callback) => {
                if (value === '') {
                    callback(new Error('请选择兑换券'));
                } else  {
                    callback();
                }
            };
            return {
                cusName: '',
                powerLoad: '-1',
                errorMsg: '',
                formValidate: {
                    customerId: '',
                    categoryId: '',
                    CategoryName: '',
                    amount: '',
                    content: '',
                },
                modal: false,
                col: [
                    {
                        title: '编号',
                        key: 'id'
                    },
                    {
                        title: '名称',
                        key: 'name'
                    },
                    {
                        title: '可使用医院',
                        key: 'hospitalList',
                        render: (h, params) => {
                            return h('div', params.row.hospitalList.map(item => {
                                return h('span', item.name + '、')
                            }))
                        }
                    },
                    {
                        title: '备注',
                        key: 'remark'
                    }
                ],
                data: [],
                ruleForm: {
                    amount: [
                        { validator: validatePoint, trigger: 'blur' }
                    ],
                    CategoryName: [
                        { validator: validateCou, trigger: 'change' }
                    ],
                }
            }
        },
        created () {
            if (window.sessionStorage) {
                var lg = window.sessionStorage;
                this.formValidate.customerId = lg.cusId
                this.cusName = lg.cusName
            }
            this.getId(this.formValidate.customerId)
        },
        methods: {
            // 获取资料
            getId (id) {
                var _vm = this;
                _vm.$http.get({
                    url: 'guard-webManager/customerRecord/couponOrderAdd.jhtml',
                    data: {customerId: id},
                    success: function(res){
                        if(res.status == 200 ){
                            if(res.data.code == 0) {
                                _vm.powerLoad = 1
                                console.log(res)
                                _vm.getList()
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
            //获取券列表
            getList () {
                var _vm = this;
                _vm.$http.get({
                    url: 'guard-webManager/select/couponCategoryList.jhtml',
                    success: function(res){
                        if(res.status == 200 ){
                            _vm.data = res.data.content
                        } else {
                            console.log(res.data.desc)
                        }
                    },
                    error: function(res){
                        console.log(res);
                    }
                });
            },
            show () {
                this.modal = true
            },
            choose (data) {
                this.formValidate.categoryId = data.id
                this.formValidate.CategoryName = data.name
                this.modal = false 
            },
            save () {
                var _vm = this
                _vm.$refs['formValidate'].validate((valid) => {
                    if(valid) { 
                        _vm.$http.post({
                            url: 'guard-webManager/customerRecord/addCouponOrder.jhtml',
                            data: _vm.formValidate,
                            success: function(res){
                                if(res.status == 200 ){
                                    console.log(res)
                                    if(res.data.code == 0) {
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
                                                url: '/indexAccount',
                                                text: _vm.cusName
                                            }
                                        ];
                                        _vm.$store.dispatch('setBreadData', breadData);
                                        _vm.$router.push('/indexAccount')
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
                    }
                })
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
                        url: '/indexAccount',
                        text: this.cusName
                    }
                ];
                this.$store.dispatch('setBreadData', breadData);
                this.$router.back(-1)
            }
        }
    }
</script>


