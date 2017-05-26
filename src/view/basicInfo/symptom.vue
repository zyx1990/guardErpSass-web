/**
 * 症状管理页面
 */

<template>
    <div class="container-box">
        <div class="container-header">
            <h2>症状管理</h2>
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
                    <Form-item label="名称" prop="name" required>
                        <Input v-model="formValidate.name" placeholder="请输入名称"></Input>
                    </Form-item>
                    <Form-item label="状态" prop="status" v-if='seen'>
                        <Radio-group v-model="formValidate.status">
                            <Radio label="1">启用</Radio>
                            <Radio label="0">禁用</Radio>
                        </Radio-group>
                    </Form-item>
                    <Form-item label="排序号" prop="sortNo" required>
                        <Input v-model="formValidate.sortNo" placeholder="请输入排序号"></Input>
                    </Form-item>
                    <Form-item label="描述" prop="remark">
                        <Input v-model="formValidate.remark" type="textarea" :autosize="{minRows: 2,maxRows: 5}" placeholder="请输入描述"></Input>
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
                    callback(new Error('请输入姓名'));
                } else {
                    callback();
                }
            };
            const validateSort = (rule, value, callback) => {
                if (value === '') {
                    callback(new Error('请输入排序号'));
                } else if (/^\+?[1-9][0-9]*$/.test(value)) {
                    callback();
                }  else  {
                    callback(new Error('请输入正整数'));
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
                        title: '名称',
                        key: 'name'
                    },
                    {
                        title: '排序号',
                        key: 'sortno'
                    },
                    {
                        title: '状态',
                        key: 'status',
                        width: 70,
                        render: (h, params) => {
                            const color = params.row.status == 1 ? 'blue' : 'red';
                            const text = params.row.status === 1 ? '启用' : '禁用';
                            return h('span', {
                                style: {
                                    color: color
                                }
                            }, text)
                        }
                    },
                    {
                        title: '描述',
                        key: 'remark'
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
                                        style: {
                                            marginRight: '5px'
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
                modalTit: '',
                modalEdit: false,
                loading: true,
                seen: true,
                formValidate: {
                    id: '',
                    name: '',
                    status: '',
                    sortNo: '',
                    remark: ''
                },
                ruleForm: {
                    name: [
                        { validator: validateName, trigger: 'blur' }
                    ],
                    sortNo: [
                        { validator: validateSort, trigger: 'blur' }
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
                    url: 'guard-webManager/symptom/list.jhtml',
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
            add () {
                var _vm = this;
                _vm.modalTit = '添加症状'
                _vm.$refs['formValidate'].resetFields();
                _vm.seen = false
                _vm.modalEdit = true
                _vm.loading = true
            },
            edit (data) {
                var _vm = this;
                _vm.modalTit = '修改症状'
                _vm.$refs['formValidate'].resetFields();
                _vm.formValidate.id = data.id
                _vm.formValidate.name = data.name
                _vm.formValidate.status = data.status
                _vm.formValidate.sortNo = data.sortno
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
                            url: 'guard-webManager/symptom/del.jhtml',
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
                            url = 'guard-webManager/symptom/edit.jhtml'
                            data = _vm.formValidate
                        } else {
                            url = 'guard-webManager/symptom/add.jhtml'
                            data = {
                                    name: _vm.formValidate.name,
                                    sortNo: _vm.formValidate.sortNo,
                                    remark: _vm.formValidate.remark
                                }
                        }
                        _vm.$http.post({
                            url: url,
                            data: data,
                            success: function(res){
                                if(res.status == 200 ){
                                    _vm.getList()
                                    _vm.$refs['formValidate'].resetFields();
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



