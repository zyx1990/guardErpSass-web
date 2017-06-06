/**
 * 客户预收款
 */

<template>
    <div class="container-box">
        <div class="container-body"  v-if='powerLoad > 0'>       
            <div class="container-header">
                <h2>添加预收款订单</h2>
            </div>
            <div class="container-body">
                <Alert type="success">
                    <p>总金额： {{allPrice}}</p>
                    <p>送券： 0</p>
                </Alert>
                <Form ref="formEdit" :model='formEdit' :label-width="50" label-position="right" style='margin-top:10px;'>   
                    <Form-item prop="editData"> 
                        <Table stripe :columns="editCol" :data="formEdit.editData"></Table>
                    </Form-item>
                    <Form-item label="备注" prop="remark">
                        <Input v-model="formEdit.remark" type="textarea" :autosize="{minRows: 2,maxRows: 5}" placeholder="请输入备注"></Input>
                    </Form-item>
                </Form>
                <div class="footer-btnGroup">
                    <Button type="primary" shape="circle" icon="checkmark"  @click='save'>保存</Button>
                    <Button type="primary" shape="circle" icon="android-arrow-back" @click='back'>返回</Button>
                </div>
            </div>
            <div class="container-header">
                <h2>添加预收款项目</h2>
            </div>
            <div class="container-body">
                <Table height="420" :columns="addCol" :data="addData" stripe @on-row-click='chooseCol'></Table>
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
                cusId: '',
                cusName: '',
                powerLoad: '-1',
                errorMsg: '',
                formEdit: {
                    editData: [],
                    remark: ''
                },
                editCol: [
                    {
                        title: '项目',
                        key: 'name'
                    },
                    {
                        title: '价格',
                        key: 'price'
                    },
                    {
                        title: '数量',
                        key: 'num',
                        render: (h, params) => {
                            return h('Input-number', {
                                props: {
                                    size: 'small',
                                    min: 1,
                                    value: params.row.num
                                },
                                on: {
                                    'on-change': (val) => {
                                        this.formEdit.editData[params.index].num = val
                                        this.formEdit.editData[params.index].sum = this.formEdit.editData[params.index].price * val
                                    }
                                }
                            })
                        }
                    },
                    {
                        title: '总额',
                        key: 'sum'
                    },
                    {
                        title: '操作',
                        key: 'action',
                        width: 100,
                        align: 'center',
                        render: (h, params) => {
                            return h('div', [
                                    h('Button', {
                                        props: {
                                            type: 'error',
                                            size: 'small',
                                            icon: 'ios-trash-outline'
                                        },
                                        on: {
                                            click: () => {
                                                this.remove(params.index)
                                            }
                                        }
                                    }, '删除'),
                                ])
                        }
                    }
                ],
                addCol: [
                    {
                        title: '名称',
                        key: 'name'
                    },
                    {
                        title: '价格',
                        key: 'price'
                    },
                    {
                        title: '使用范围',
                        key: 'scope'
                    },
                    {
                        title: '赠券',
                        key: 'coupon'
                    }
                ],
                addData:  [],
            }
        },
        computed: {
            allPrice () {
                var _real = 0
                for(let item of this.formEdit.editData) {
                    _real += item.sum
                }
                return _real
            },
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
                    url: 'guard-webManager/customerRecord/depositOrderAdd.jhtml',
                    data: {customerId: id},
                    success: function(res){
                        if(res.status == 200 ){
                            if(res.data.code == 0) {
                                _vm.powerLoad = 1
                                _vm.addData = res.data.content.DepositChargeList
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
            remove (index) {
                this.formEdit.editData.splice(index, 1)
            },
            chooseCol (data) {
                var _vm = this;
                var bool = true;
                var _data = {}
                for(let item of _vm.formEdit.editData) {
                    if(data.id == item.id) {
                        bool = false
                    }
                }
                if(bool) {
                    _vm.$http.get({
                        url: 'guard-webManager/select/depositCharge.jhtml',
                        data: {id: data.id},
                        success: function(res){
                            if(res.status == 200 ){
                                _data = res.data.content
                                _data['num'] = 1
                                _data['sum'] = res.data.content.price
                                _vm.formEdit.editData.push(_data)
                            } else {
                                console.log(res.data.desc)
                            }
                        },
                        error: function(res){
                            console.log(res);
                        }
                    });
                }
            },
            save () {
                var _vm = this
                var _box = [];
                var _obj = {};
                for(let item of _vm.formEdit.editData) {
                    _obj['ChargeID'] = item.id
                    _obj['Num'] = item.num
                    _box.push(_obj)
                    _obj = {}
                }
                _vm.$refs['formEdit'].validate((valid) => {
                    if(valid) {
                        _vm.$http.post({
                            url: 'guard-webManager/customerRecord/addDepositOrder.jhtml',
                            data: {
                                customerId: _vm.cusId,
                                remark: _vm.formEdit.remark,
                                detailListStr: JSON.stringify(_box)
                            },
                            success: function(res){
                                if(res.status == 200 ){
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
                                            text: _vm.cusName
                                        }
                                    ];
                                    _vm.$store.dispatch('setBreadData', breadData);
                                    _vm.$router.push('/indexOrder')
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
                        url: '/customerMsg',
                        text: this.cusName
                    }
                ];
                this.$store.dispatch('setBreadData', breadData);
                this.$router.back(-1)
            }
        }

    }
</script>   

<style>
   
</style>