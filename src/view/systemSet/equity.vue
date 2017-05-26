/**
 * 权益管理
 */

<template>
    <div class="container-box" ref="containerBox">
        <div class="container-header">
            <h2>权益管理</h2>
        </div>
        <div class="container-body">
            <div class="equity-box">
                <h3><Icon type="pricetag"></Icon>折扣类权益</h3>
                <ul class="header-btn-group">
                    <li class="header-item" @click="add('dis')"><Icon type="plus-round"></Icon>增加</li>
                </ul>
            </div>
            <Table stripe :columns="col" :data="data"></Table>
            <Modal
                :title="modalTit"
                v-model="modalEdit"
                :closable="false"
                @on-ok="ok"
                :loading="loading"
                class-name="vertical-center-modal">
                <Form ref="formDis" :model="formDis" :rules="ruleDis" :label-width="100" label-position="right" v-show='key'>
                    <Form-item label="名称" prop="name">
                        <Input v-model="formDis.name" placeholder="请输入名称"></Input>
                    </Form-item>
                    <Form-item label="折扣(0-100)" prop="discount">
                        <Input v-model="formDis.discount" placeholder="请输入折扣"></Input>
                    </Form-item>
                    <Form-item label="内容" prop="content">
                        <Input v-model="formDis.content" type="textarea" :autosize="{minRows: 2,maxRows: 5}" placeholder="请输入内容"></Input>
                    </Form-item>
                </Form>
                <Form ref="formCus" :model="formCus" :rules="ruleCus" :label-width="100" label-position="right" v-show='!key'>
                    <Form-item label="名称" prop="name">
                        <Input v-model="formCus.name" placeholder="请输入名称"></Input>
                    </Form-item>
                    <Form-item label="内容" prop="content">
                        <Input v-model="formCus.content" type="textarea" :autosize="{minRows: 2,maxRows: 5}" placeholder="请输入内容"></Input>
                    </Form-item>
                </Form>
            </Modal>
            <div class="equity-box second">
                <h3><Icon type="pricetag"></Icon>自定义权益</h3>
                <ul class="header-btn-group">
                    <li class="header-item" @click="add('cus')"><Icon type="plus-round"></Icon>增加</li>
                </ul>
            </div>
            <Table stripe :columns="col1" :data="data1"></Table>
        </div>
    </div>
</template>

<script>
    export default {
        data () {
            const validateName = (rule, value, callback) => {
                if (value === '') {
                    callback(new Error('请输入姓名'));
                } else {
                    callback();
                }
            };
            const validateDis = (rule, value, callback) => {
                if (value === '') {
                    callback(new Error('请输入折扣'));
                } else if (/^\+?[1-9][0-9]*$/.test(value)) {
                    if(value < 0 || value > 100) {
                        callback(new Error('请输入正确折扣'));
                    } else {
                        callback();
                    }
                }  else  {
                    callback(new Error('请输入正整数'));
                }
            };
            return {
                col: [
                    {   
                        title: '序号',
                        type: 'index',
                        width: 60
                    },
                    {
                        title: '名称',
                        key: 'name'
                    },
                    {
                        title: '折扣(%)',
                        key: 'discount',
                        render: (h, params) => {
                            const text = (params.row.discount * 100).toFixed(2)
                            return h('span', text)
                        }
                    },
                    {
                        title: '内容',
                        key: 'content'
                    },
                    {
                        title: '操作',
                        key: 'action',
                        width: 180,
                        align: 'center',
                        render: (h, params) => {
                            return h('div', [
                                    h('Button', {
                                        props: {
                                            type: 'primary',
                                            size: 'small',
                                            icon: 'edit'
                                        },
                                        style: {
                                            marginRight: '5px'
                                        },
                                        on: {
                                            click: () => {
                                                this.edit('dis', params.row)
                                            }
                                        }
                                    }, '编辑'),
                                    h('Button', {
                                        props: {
                                            type: 'error',
                                            size: 'small',
                                            icon: 'ios-trash-outline'
                                        },
                                        on: {
                                            click: () => {
                                                this.remove(params.row)
                                            }
                                        }
                                    }, '删除'),
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
                        title: '名称',
                        key: 'name'
                    },
                    {
                        title: '内容',
                        key: 'content'
                    },
                    {
                        title: '操作',
                        key: 'action',
                        width: 180,
                        align: 'center',
                        render: (h, params) => {
                            return h('div', [
                                    h('Button', {
                                        props: {
                                            type: 'primary',
                                            size: 'small',
                                            icon: 'edit'
                                        },
                                        style: {
                                            marginRight: '5px'
                                        },
                                        on: {
                                            click: () => {
                                                this.edit('cus', params.row)
                                            }
                                        }
                                    }, '编辑'),
                                    h('Button', {
                                        props: {
                                            type: 'error',
                                            size: 'small',
                                            icon: 'ios-trash-outline'
                                        },
                                        on: {
                                            click: () => {
                                                this.remove(params.row)
                                            }
                                        }
                                    }, '删除'),
                                ])
                        }
                    } 
                ],
                data: [],
                data1: [],
                key: true,
                seen: true,
                modalTit: '',
                modalEdit: false,
                loading: true,
                formDis: {
                    id: '',
                    discount: '',
                    name: '',
                    content: ''
                },
                formCus: {
                    id: '',
                    name: '',
                    content: ''
                },
                ruleDis: {
                    name: [
                        { validator: validateName, trigger: 'blur' }
                    ],
                    discount: [
                        { validator: validateDis, trigger: 'blur' }
                    ]
                },
                ruleCus: {
                    name: [
                        { validator: validateName, trigger: 'blur' }
                    ]
                }
            }
        },
        created () {
            this.getList()
        },
        methods: {
            getList () {
                var _vm = this;
                _vm.$http.get({
                    url: 'guard-webManager/equity/list.jhtml',
                    success: function(res){
                        if(res.status == 200 ){
                            _vm.data = res.data.content.DiscountList
                            _vm.data1 = res.data.content.CustomList
                        } else {
                            console.log(res.data.desc)
                        }
                    },
                    error: function(res){
                        console.log(res);
                    }
                });
            },
            add (type) {
                var _vm = this;
                _vm.$refs['formDis'].resetFields();
                _vm.$refs['formCus'].resetFields();
                if(type === 'dis') {
                    _vm.modalTit = '添加折扣类权益'
                    _vm.key = true
                } else {
                    _vm.modalTit = '添加自定义权益'
                    _vm.key = false
                }
                _vm.seen = false
                _vm.modalEdit = true
                _vm.loading = true;
            },
            edit (type, data) {
                var _vm = this;
                _vm.$refs['formDis'].resetFields();
                _vm.$refs['formCus'].resetFields();
                if(type === 'dis') {
                    _vm.modalTit = '修改折扣类权益'
                    _vm.key = true
                    _vm.formDis.id = data.id
                    _vm.formDis.name = data.name
                    _vm.formDis.discount = (data.discount * 100).toFixed(0)
                    _vm.formDis.content = data.content
                } else {
                    _vm.modalTit = '修改自定义权益'
                    _vm.key = false
                    _vm.formCus.id = data.id
                    _vm.formCus.name = data.name
                    _vm.formCus.content = data.content
                }
                _vm.seen = true
                _vm.modalEdit = true
                _vm.loading = true;
            },
            remove (data) {
                var _vm = this;
                _vm.$Modal.confirm({
                    title: '系统提示',
                    content: '确定删除'+ data.name +'?',
                    onOk: () => {
                        _vm.$http.post({
                            url: 'guard-webManager/equity/del.jhtml',
                            data: {id: data.id},
                            success: function(res){
                                if(res.status == 200 ){
                                    _vm.getList()
                                    _vm.$Notice.success({
                                        title: '系统提示！',
                                        desc: '删除成功！'
                                    });
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
            ok () {
                var _vm = this;
                var _name = ''
                var urlBox = {}
                var _url = ''
                var data = {}
                if(_vm.key) {
                    _name = 'formDis'
                    urlBox = {
                        add: 'guard-webManager/equity/addDiscount.jhtml',
                        update: 'guard-webManager/equity/updateDiscount.jhtml'
                    }
                    data = _vm.formDis
                } else {
                    _name = 'formCus'
                    urlBox = {
                        add: 'guard-webManager/equity/addCustom.jhtml',
                        update: 'guard-webManager/equity/updateCustom.jhtml'
                    }
                    data = _vm.formCus
                }
                _vm.$refs[_name].validate((valid) => {
                    if (valid) {
                        if(_vm.seen) {
                            _url = urlBox.update
                        } else {
                            _url = urlBox.add
                        }
                        console.log(data)
                        console.log(_url)
                        _vm.$http.post({
                            url: _url,
                            data: data,
                            success: function(res){
                                if(res.status == 200 ){
                                    _vm.getList()
                                    _vm.$refs['formDis'].resetFields();
                                    _vm.$refs['formCus'].resetFields();
                                    _vm.modalEdit = false;
                                    _vm.$Notice.success({
                                        title: '系统提示！',
                                        desc: '保存成功！'
                                    });
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
            }
        }
    }
</script>

<style scoped>
    .equity-box {
        overflow: hidden;
        padding-bottom: 15px;
    }
    .equity-box.second {
        padding-top: 15px;
    }
    .equity-box h3 {
        float: left;
        line-height: 29px;
        font-weight: normal;
    }
</style>
<style>
    .equity-box h3 i {
        margin-right: 10px;
    }
</style>



