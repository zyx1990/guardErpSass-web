/**
 * 工具管理
 */

<template>
    <div class="container-box" ref="containerBox">
        <div class="container-header">
            <h2>工具类型管理</h2>
            <ul class="header-btn-group">
                <li class="header-item" @click="add"><Icon type="plus-round"></Icon>增加</li>
            </ul>
        </div>
        <div class="container-body">
            <Table stripe :columns="columns" :data="data"></Table>
            <Modal
                :title="modalTit"
                v-model="modalEdit"
                :closable="false"
                @on-ok="ok"
                :loading="loading"
                class-name="vertical-center-modal">
                <Form ref="formValidate" :model="formValidate" :rules="ruleForm" :label-width="100" label-position="right">
                    <Form-item label="代码" prop="code" required v-if='!seen'>
                        <Input v-model="formValidate.code" placeholder="请输入代码"></Input>
                    </Form-item>
                    <div class="showCode" v-if='seen'>
                        <h3 v-model="formValidate.code">{{formValidate.code}}</h3>
                        <span>代码</span>
                    </div>
                    <Form-item label="名称" prop="name" required>
                        <Input v-model="formValidate.name" placeholder="请输入名称"></Input>
                    </Form-item>
                    <Form-item label="备注" prop="remark">
                        <Input v-model="formValidate.remark" type="textarea" :autosize="{minRows: 2,maxRows: 5}" placeholder="请输入备注"></Input>
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
            const validateCode = (rule, value, callback) => {
                if (value === '') {
                    callback(new Error('请输入代码'));
                } else {
                    callback();
                }
            };
            return {
                columns: [
                    {   
                        title: '序号',
                        type: 'index',
                        width: 60
                    },
                    {
                        title: '代码',
                        key: 'code'
                    },
                    {
                        title: '名称',
                        key: 'name'
                    },
                    {
                        title: '备注',
                        key: 'remark'
                    },
                    {
                        title: '操作',
                        key: 'action',
                        width: 180,
                        align: 'center',
                        render: (h, params) => {
                            if(params.index > 4) {
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
                                                    this.edit(params.row)
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
                    }
                ],
                data: [],
                modalTit: '',
                modalEdit: false,
                loading: true,
                seen: true,
                formValidate: {
                    id: '',
                    code: '',
                    name: '',
                    remark: ''
                },
                ruleForm: {
                    name: [
                        { validator: validateName, trigger: 'blur' }
                    ],
                    code: [
                        { validator: validateCode, trigger: 'blur' }
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
                    url: 'guard-webManager/tool/list.jhtml',
                    success: function(res){
                        if(res.status == 200 ){
                            _vm.data = res.data.content
                            console.log(res.data.content)
                        } else {
                            console.log(res.data.desc)
                        }
                    },
                    error: function(res){
                        console.log(res);
                    }
                });
            },
            add () {
                var _vm = this;
                _vm.modalTit = '添加工具'
                _vm.$refs['formValidate'].resetFields();
                _vm.formValidate.code = ''
                _vm.seen = false
                _vm.modalEdit = true
                _vm.loading = true;
            },
            edit (data) {
                var _vm = this;
                _vm.modalTit = '修改工具'
                _vm.$refs['formValidate'].resetFields();
                _vm.formValidate.id = data.id
                _vm.formValidate.name = data.name
                _vm.formValidate.code = data.code
                _vm.formValidate.remark = data.remark
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
                            url: 'guard-webManager/tool/del.jhtml',
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
                _vm.$refs['formValidate'].validate((valid) => {
                    if (valid) {
                        var url = '';
                        var data = {};
                        if(_vm.seen) {
                            url = 'guard-webManager/tool/update.jhtml'
                            data = {
                                    id: _vm.formValidate.id,
                                    name: _vm.formValidate.name,
                                    remark: _vm.formValidate.remark
                                }
                        } else {
                            url = 'guard-webManager/tool/add.jhtml'
                            data = {
                                    name: _vm.formValidate.name,
                                    code: _vm.formValidate.code,
                                    remark: _vm.formValidate.remark
                                }
                        }
                        _vm.$http.post({
                            url: url,
                            data: data,
                            success: function(res){
                                if(res.status == 200 ){
                                    if(res.data.code == 0) {
                                        _vm.getList()
                                        _vm.$refs['formValidate'].resetFields();
                                        _vm.modalEdit = false;
                                        _vm.$Notice.success({
                                            title: '系统提示！',
                                            desc: '保存成功！'
                                        });
                                    } else {
                                        _vm.$refs['formValidate'].resetFields();
                                        _vm.modalEdit = false;
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
                    } else {
                        _vm.loading = false;
                    }
                })
            }
        }
    }
</script>

<style scoped>
    .vertical-center-modal .showCode {
        overflow: hidden;
        height: 33px;
        margin-bottom: 24px;
    }
    .vertical-center-modal .showCode span {
        float: left;
        width: 100px;
        padding-right: 12px;
        margin-left: -100%;
        line-height: 33px;
        text-align: right;
    }
    .vertical-center-modal .showCode h3 {
        float: left;
        width: 100%;
        padding-left: 108px;
        line-height: 33px;
        font-weight: normal;
    }
</style>



