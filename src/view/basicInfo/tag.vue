/**
 * 标签管理
 */

<template>
    <div class="container-box">
        <div class="container-header">
            <h2>标签管理</h2>
            <ul class="header-btn-group">
                <li class="header-item" @click="add"><Icon type="plus-round"></Icon>增加</li>
            </ul>
        </div>
        <div class="container-body">
            <Form :label-width="50" inline ref='formSearch' :model='formSearch'>
                <Form-item label="名称" prop='name'>
                    <Input v-model="formSearch.name" placeholder="请输入名称"></Input>
                </Form-item>
                <ul class="header-btn-group not-float">
                    <li class="header-item" @click="getList('1', '10', formSearch.name)"><Icon type="search"></Icon>查询</li>
                    <li class="header-item" @click="handleReset('formSearch')"><Icon type="refresh"></Icon>重置</li>
                </ul>
            </Form>
            <Table stripe :columns="columns" :data="data"></Table>
            <div class="table-page">
                <div class="table-info">当前第{{pageNumber}}页，共{{totalPages}}页，总共{{total}}条记录</div>
                <Page class="table-paginate" :total="totalNum" @on-change='changePage' :current='pageNum'></Page>
            </div>
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
                        width: 70,
                        render: (h, params) => {
                            const _index = (this.pageNumber - 1) * 10
                            return h('span', params.index + 1 + _index)
                        }
                    },
                    {
                        title: '名称',
                        key: 'name'
                    },
                    {
                        title: '状态',
                        width: 70,
                        key: 'status',
                        render: (h, params) => {
                            const color = params.row.status === 1 ? 'blue' : 'red';
                            const text = params.row.status === 1 ? '启用' : '禁用';
                            return h('span', {
                                style: {
                                    color: color
                                }
                            },text)
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
                total: '',
                totalPages: '',
                pageNumber: '1',
                modalTit: '',
                modalEdit: false,
                loading: true,
                seen: true,
                formSearch: {
                    name: ''
                },
                formValidate: {
                    id: '',
                    name: '',
                    status: ''
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
        computed: {
            totalNum: function () {
                return this.total * 1
            },
            pageNum: function () {
                return this.pageNumber * 1
            }
        },
        created () {
            this.getList('1', '10', this.formSearch.name)
        },
        methods: {
            getList (pageNumber, pageSize, name) {
                var _vm = this;
                if(name.length == 0) {
                    name = null
                }
                _vm.$http.get({
                    url: 'guard-webManager/tag/page.jhtml',
                    data: {
                        pageNumber: pageNumber,
                        pageSize: pageSize,
                        name: name
                    },
                    success: function(res){
                        if(res.status == 200 ){
                            _vm.data = res.data.content.content
                            _vm.total = res.data.content.total
                            _vm.pageNumber = res.data.content.pageNumber
                            _vm.totalPages = res.data.content.totalPages
                            console.log(res)
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
                _vm.modalTit = '添加标签'
                _vm.$refs['formValidate'].resetFields();
                _vm.seen = false
                _vm.modalEdit = true
                _vm.loading = true;
            },
            edit (data) {
                var _vm = this;
                _vm.modalTit = '修改标签'
                _vm.$refs['formValidate'].resetFields();
                _vm.formValidate.id = data.id
                _vm.formValidate.name = data.name
                _vm.formValidate.status = data.status
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
                            url: 'guard-webManager/tag/del.jhtml',
                            data: {id: data.id},
                            success: function(res){
                                if(res.status == 200 ){
                                    _vm.getList('1', '10', _vm.formSearch.name)
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
                            url = 'guard-webManager/tag/edit.jhtml'
                            data = _vm.formValidate
                        } else {
                            url = 'guard-webManager/tag/add.jhtml'
                            data = {
                                    name: _vm.formValidate.name
                                }
                        }
                        _vm.$http.post({
                            url: url,
                            data: data,
                            success: function(res){
                                if(res.status == 200 ){
                                    _vm.getList('1', '10', _vm.formSearch.name)
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
            changePage (num) {
                this.getList(num, '10', this.formSearch.name)
            },
            handleReset (name) {
                this.$refs[name].resetFields();
            }
        }
    }
</script>