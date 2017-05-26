/**
 * 药物品类型管理
 */

<template>
    <div class="container-box">
        <div class="container-header">
            <h2>物品药品类型</h2>
            <ul class="header-btn-group">
                <li class="header-item" @click='add'><Icon type="plus-round"></Icon>增加</li>
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
                    <Form-item label="上级" prop="parentId" required>
                        <Input v-model="objName" readonly icon="ios-search" placeholder="请选择上级" @on-focus='addObj'></Input>
                    </Form-item>
                    <Form-item label="排序号" prop="sortNo" required>
                        <Input v-model="formValidate.sortNo" placeholder="请输入排序号"></Input>
                    </Form-item>
                    <Form-item label="描述" prop="remark">
                        <Input v-model="formValidate.remark" type="textarea" :autosize="{minRows: 2,maxRows: 5}" placeholder="请输入描述"></Input>
                    </Form-item>
                </Form>
            </Modal>
            <Modal
                title="选择物品药品类型"
                width='700'
                v-model="modal1"
                :closable="false"
                class-name="vertical-center-modal">
                <Table height="350" stripe :columns="col1" :data="objData" @on-row-click='chooseObj'></Table>
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
            const validateId = (rule, value, callback) => {
                if (value === '') {
                    callback(new Error('请选择上级'));
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
                        title: '名称',
                        key: 'name',
                        render: (h, params) => {
                            const level = params.row.level * 20 + 'px'
                            return h('span', {
                                style: {
                                    paddingLeft: level
                                }
                            }, params.row.name)
                        }
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
                    parentId: '',
                    sortNo: '',
                    remark: ''
                },
                ruleForm: {
                    name: [
                        { validator: validateName, trigger: 'blur' }
                    ],
                    parentId: [
                        { validator: validateId, trigger: 'change' }
                    ],
                    sortNo: [
                        { validator: validateSort, trigger: 'blur' }
                    ]
                },
                objName: '',
                modal1: false,
                col1: [
                    {
                        title: '名称',
                        key: 'name',
                        render: (h, params) => {
                            const level = params.row.level * 20 + 'px'
                            return h('span', {
                                style: {
                                    paddingLeft: level
                                }
                            }, params.row.name)
                        }
                    }
                ],
                objData: [],
            }
        },
        created () {
            this.getList()
        },
        methods: {
            getList () {
                var _vm = this;
                _vm.$http.get({
                    url: 'guard-webManager/productCategory/list.jhtml',
                    success: function(res){
                        if(res.status == 200 ){
                            _vm.data = res.data.content
                            _vm.objData = res.data.content
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
                _vm.modalTit = '添加药物品类型'
                _vm.$refs['formValidate'].resetFields();
                _vm.objName = ''
                _vm.seen = false
                _vm.modalEdit = true
                _vm.loading = true;
            },
            edit (data) {
                var _vm = this;
                _vm.modalTit = '修改药物品类型'
                _vm.$refs['formValidate'].resetFields();
                _vm.objName = data.parentName
                _vm.formValidate.id = data.id
                _vm.formValidate.name = data.name
                _vm.formValidate.parentId = data.parentid
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
                            url: 'guard-webManager/productCategory/del.jhtml',
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
                        if(_vm.seen) {
                            url = 'guard-webManager/productCategory/update.jhtml'
                        } else {
                            url = 'guard-webManager/productCategory/add.jhtml'
                        }
                        _vm.$http.post({
                            url: url,
                            data: _vm.formValidate,
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
            },
            addObj () {
                this.modal1 = true
            },
            chooseObj (data) {
                this.objName = data.name
                this.formValidate.parentId = data.id
                this.modal1 = false
            }
        }
    }
</script>