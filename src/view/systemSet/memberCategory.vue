/**
 * 会员类型管理
 */

<template>
    <div class="container-box" ref="containerBox">
        <div class="container-header">
            <h2>会员类型管理</h2>
            <ul class="header-btn-group">
                <li class="header-item" @click='reset'><Icon type="gear-b"></Icon>重置会员</li>
            </ul>
        </div>
        <div class="container-body">
            <Table stripe :columns="columns" :data="data"></Table>
            <Modal
                title="修改会员类型"
                v-model="modalEdit"
                :closable="false"
                @on-ok="ok"
                :loading="loading"
                class-name="vertical-center-modal">
                <Form ref="formValidate" :model="formValidate" :rules="ruleForm" :label-width="100" label-position="right" v-show='key'>
                    <Form-item label="名称" prop="name" required>
                        <Input v-model="formValidate.name" placeholder="请输入名称"></Input>
                    </Form-item>
                    <Form-item label="备注" prop="remark">
                        <Input v-model="formValidate.remark" type="textarea" :autosize="{minRows: 2,maxRows: 5}" placeholder="请输入备注"></Input>
                    </Form-item>
                </Form>
                <Form ref="formMoney" :model="formMoney" :rules="ruleMoney" :label-width="100" label-position="right" v-show='!key'>
                    <Form-item label="名称" prop="name">
                        <span>{{ formMoney.name }}</span>
                    </Form-item>
                    <Form-item label="金额" prop="amount" required>
                        <Input v-model="formMoney.amount" placeholder="请输入金额"></Input>
                    </Form-item>
                </Form>
            </Modal>
        </div>
    </div>
</template>

<script>
    export default {
        data () {
            const validateName = (rule, value, callback) => {
                if (value === '') {
                    callback(new Error('请输入名称'));
                } else {
                    callback();
                }
            };
            const validateMoney = (rule, value, callback) => {
                if (value === '') {
                    callback(new Error('请输入金额'));
                } else if (/^\+?[0-9][0-9]*$/.test(value)) {
                    callback();
                }  else  {
                    callback(new Error('请输入自然数'));
                }
            };
            return {
                columns: [
                    {
                        title: '等级',
                        key: 'level',
                        width: 60
                    },
                    {
                        title: '名称',
                        key: 'name'
                    },
                    {
                        title: '图标',
                        key: 'imageurl'
                    },
                    {
                        title: '金额限制',
                        key: 'amount'
                    },
                    {
                        title: '备注',
                        key: 'remark'
                    },
                    {
                        title: '权益列表',
                        key: 'equityList',
                        render: (h, params) => {
                            return h('ul', params.row.equityList.map(item => {
                                return h('li', item.equityName)
                            }))
                            
                        }
                    },
                    {
                        title: '操作',
                        key: 'action',
                        width: 430,
                        align: 'center',
                        render: (h, params) => {
                            const _display = params.row.amount == 0 ? 'none' : 'inline-block'
                            return h('div', [
                                    h('Button', {
                                        props: {
                                            type: 'primary',
                                            size: 'small',
                                            icon: 'edit'
                                        },
                                        style: {
                                            marginRight: '2px'
                                        },
                                        on: {
                                            click: () => {
                                                this.edit('info', params.row)
                                            }
                                        }
                                    }, '编辑'),
                                    h('Button', {
                                        props: {
                                            type: 'error',
                                            size: 'small',
                                            icon: 'edit'
                                        },
                                        style: {
                                            marginRight: '2px'
                                        },
                                        on: {
                                            click: () => {
                                                this.remove(params.row)
                                            }
                                        }
                                    }, '修改图标'),
                                    h('Button', {
                                        props: {
                                            type: 'info',
                                            size: 'small',
                                            icon: 'gear-b'
                                        },
                                        style: {
                                            marginRight: '2px'
                                        },
                                        on: {
                                            click: () => {
                                                this.reset(params.row)
                                            }
                                        }
                                    }, '默认图标'),
                                    h('Button', {
                                        props: {
                                            type: 'warning',
                                            size: 'small',
                                            icon: 'edit'
                                        },
                                        style: {
                                            marginRight: '2px',
                                            display: _display
                                        },
                                        on: {
                                            click: () => {
                                                this.edit('money', params.row)
                                            }
                                        }
                                    }, '修改金额'),
                                    h('Button', {
                                        props: {
                                            type: 'primary',
                                            size: 'small',
                                            icon: 'wrench'
                                        },
                                        on: {
                                            click: () => {
                                                this.edit(params.row)
                                            }
                                        }
                                    }, '配置权益'),
                                ])
                        }
                    }
                ],
                data: [],
                key: true,
                modalEdit: false,
                loading: true,
                formValidate: {
                    id: '',
                    name: '',
                    remark: ''
                },
                formMoney: {
                    id: '',
                    name: '',
                    amount: ''
                },
                ruleForm: {
                    name: [
                        { validator: validateName, trigger: 'blur' }
                    ]
                },
                ruleMoney: {
                    amount: [
                        { validator: validateMoney, trigger: 'blur' }
                    ]
                },
            }
        },
        created () {
            this.getList()
        },
        methods: {
            getList () {
                var _vm = this;
                _vm.$http.get({
                    url: 'guard-webManager/memberCategory/list.jhtml',
                    success: function(res){
                        if(res.status == 200 ){
                            console.log(res.data.content)
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
            edit (type, data) {
                var _vm = this;
                _vm.$refs['formValidate'].resetFields();
                _vm.$refs['formMoney'].resetFields();
                if(type === 'info') {
                    _vm.key = true
                    _vm.formValidate.id = data.id
                    _vm.formValidate.name = data.name
                    _vm.formValidate.remark = data.remark
                } else {
                    _vm.key = false
                    _vm.formMoney.id = data.id
                    _vm.formMoney.name = data.name
                    _vm.formMoney.amount = data.amount
                }
                _vm.modalEdit = true
                _vm.loading = true;
            },
            ok () {
                var _vm = this;
                var _data = {}
                var _url = ''
                var _name = ''
                if(_vm.key) {
                    _name = 'formValidate'
                    _data = _vm.formValidate
                    _url = 'guard-webManager/memberCategory/update.jhtml'
                } else {
                    _name = 'formMoney'
                    _data = _vm.formMoney
                    _url = 'guard-webManager/memberCategory/updateAmount.jhtml'
                }
                _vm.$refs[_name].validate((valid) => {
                    if (valid) {
                        _vm.$http.post({
                            url: _url,
                            data: _data,
                            success: function(res){
                                console.log(res)
                                if(res.status == 200 ){
                                    if(res.data.code == 0) {
                                        _vm.getList()
                                        _vm.$refs['formValidate'].resetFields();
                                        _vm.$refs['formMoney'].resetFields();
                                        _vm.$Notice.success({
                                            title: '系统提示！',
                                            desc: '保存成功！'
                                        });
                                    } else {
                                        _vm.$Notice.error({
                                            title: '系统提示！',
                                            desc: res.data.desc
                                        });
                                    }
                                    _vm.modalEdit = false;
                                } else {
                                    console.log(res.data.desc)
                                }
                            },
                            error: function(res){
                                console.log(res);
                            }
                        });
                    } else {
                        _vm.loading = false;
                    }
                })
            },
            reset () {
                var _vm = this;
                _vm.$Modal.confirm({
                    title: '系统提示',
                    content: '是否重置会员信息',
                    onOk: () => {
                        _vm.$http.post({
                            url: 'guard-webManager/memberCategory/reset.jhtml',
                            success: function(res){
                                // if(res.status == 200 ){
                                //     _vm.getList()
                                //     _vm.$Notice.success({
                                //         title: '系统提示！',
                                //         desc: '还原成功！'
                                //     });
                                // } else {
                                //     console.log(res.data.desc)
                                // }
                                console.log(res)
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
            remove: function(index) {

            },
            set: function(index) {

            },
            cusStamp: function(index) {

            },
            backStamp: function(index) {

            }
        }
    }
</script>