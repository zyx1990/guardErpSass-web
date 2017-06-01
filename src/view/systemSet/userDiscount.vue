/**
 * 用户折扣
 */

<template>
    <div class="container-box" ref="containerBox">
        <div class="container-header">
            <h2>用户折扣管理</h2>
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
                    <Form-item label="收费项目" prop="userId" required v-if='!key'>
                        <Input v-model="objName" readonly icon="ios-search" placeholder="请选择收费项目" @on-focus='show'></Input>
                    </Form-item>
                    <Form-item label="用户" v-else>
                        <span>{{userName}}</span>
                    </Form-item>
                    <Form-item label="折扣" prop="discount" required>
                        <Input v-model="formValidate.discount" placeholder="请输入折扣"></Input>
                    </Form-item>
                </Form>
            </Modal>
            <Modal
                title="选择用户"
                width='700'
                v-model="modal2"
                :closable="false"
                class-name="vertical-center-modal">
                <Form  :label-width="50" inline ref='formSearch' :model='formSearch'>
                    <Form-item label="部门" prop='deptId'>
                        <Select v-model="formSearch.deptId" clearable style="width:162px">
                            <Option v-for="item in deptList" :value="item.id" :key="item">{{ item.name }}</Option>
                        </Select>
                    </Form-item>
                    <Form-item label="账号" prop='account'>
                        <Input v-model="formSearch.account" placeholder="请输入账号"></Input>
                    </Form-item>
                    <Form-item label="姓名" prop='name'>
                        <Input v-model="formSearch.name" placeholder="请输入姓名"></Input>
                    </Form-item>
                    <ul class="header-btn-group not-float">
                        <li class="header-item" @click="getObj(formSearch)"><Icon type="search"></Icon>查询</li>
                        <li class="header-item" @click="handleReset('formSearch')"><Icon type="refresh"></Icon>重置</li>
                    </ul>
                </Form>
                <Table height="350" stripe :columns="col2" :data="objData" @on-row-click='chooseObj'></Table>
            </Modal>
        </div>
    </div>
</template>

<script>
    export default {
        data () {
            const validateDis = (rule, value, callback) => {
                if (value === '') {
                    callback(new Error('请输入折扣'));
                } else if (/^\+?[0-9]*$/.test(value)) {
                    if (value >= 0 && value <= 100) {
                        callback();
                    } else {
                        callback(new Error('请输入1-100'));
                    }
                }  else  {
                    callback(new Error('请输入正整数'));
                }
            };
            const validateCid = (rule, value, callback) => {
                if (value === '') {
                    callback(new Error('请选择类型'));
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
                        title: '用户姓名',
                        key: 'userName'
                    },
                    {
                        title: '折扣(%)',
                        key: 'discount',
                        render: (h, params) => {
                            return h('span', (params.row.discount * 100).toFixed(2))
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
                key: true,
                userName: '',
                formValidate: {
                    id: '',
                    discount: '',
                    userId: ''
                },
                objName: '',
                modal2: false,
                deptList: [],
                formSearch: {
                    hospitalId: '1',
                    account: '',
                    name: '',
                    deptId: ''
                },
                col2: [
                    {
                        title: '账号',
                        key: 'account'
                    },
                    {
                        title: '姓名',
                        key: 'name'
                    },
                    {
                        title: '部门',
                        key: 'deptName'
                    },
                    {
                        title: '性别',
                        key: 'gender'
                    }
                ],
                objData: [],
                ruleForm: {
                    userId: [
                        { validator: validateCid, trigger: 'change' }
                    ],
                    discount: [
                        { validator: validateDis, trigger: 'blur' }
                    ],
                }
            }
        },
        created () {
            this.getList()
        },
        mounted () {
            this.getDept('1')
        },
        methods: {
            getList () {
                var _vm = this;
                _vm.$http.get({
                    url: 'guard-webManager/userDiscount/list.jhtml',
                    success: function(res){
                        if(res.status == 200 ){
                            console.log(res)
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
            //获取项目列表
            getObj (form) {
                var _vm = this;
                _vm.$http.get({
                    url: 'guard-webManager/select/hospitalUserList.jhtml',
                    data: form,
                    success: function(res){
                        if(res.status == 200 ){
                            console.log(res.data.content)
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
            //获取部门下拉列表
            getDept (id) {
                var _vm = this;
                _vm.$http.get({
                    url: 'guard-webManager/select/hospitalDeptInfo.jhtml',
                    data: {hospitalId: id},
                    success: function(res){
                        if(res.status == 200 ){
                            _vm.deptList = res.data.content
                        } else {
                            console.log(res.data.desc)
                        }
                    },
                    error: function(res){
                        console.log(res);
                    }
                });
            },
            handleReset (name) {
                this.$refs[name].resetFields();
            },
            add () {
                var _vm = this;
                _vm.modalTit = '添加用户折扣'
                _vm.$refs['formValidate'].resetFields();
                _vm.objName = ''
                _vm.key = false
                _vm.modalEdit = true
                _vm.loading = true;
            },
            edit (data) {
                var _vm = this;
                _vm.modalTit = '修改用户折扣'
                _vm.$refs['formValidate'].resetFields();
                console.log(data)
                _vm.userName = data.userName
                _vm.formValidate.id = data.id
                _vm.formValidate.discount = (data.discount * 100).toFixed(0) 
                _vm.key = true
                _vm.modalEdit = true
                _vm.loading = true;
            },
            show () {
                this.modal2 = true
            },
            chooseObj (data) {
                this.formValidate.userId = data.id
                this.objName = data.name
                this.modal2 = false
            },
            remove (data) {
                var _vm = this;
                _vm.$Modal.confirm({
                    title: '系统提示',
                    content: '确定删除'+ data.userName +'?',
                    onOk: () => {
                        _vm.$http.post({
                            url: 'guard-webManager/userDiscount/del.jhtml',
                            data: {id: data.id},
                            success: function(res){
                                console.log(res)
                                if(res.status == 200 ){
                                    if(res.data.code == 0) {
                                        _vm.getList('1', '10', _vm.formSearch)
                                        _vm.$Notice.success({
                                            title: '系统提示！',
                                            desc: '删除成功！'
                                        });
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
                        if(_vm.key) {
                            url = 'guard-webManager/userDiscount/update.jhtml'
                        } else {
                            url = 'guard-webManager/userDiscount/add.jhtml'
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
        }
    }
</script>