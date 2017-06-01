/**
 * 咨询医生设置
 */

<template>
    <div class="container-box">
        <div class="container-header">
            <h2>咨询医生设置管理</h2>
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
                    <Form-item label="医生" prop="userId" required v-if='!key'>
                        <Input v-model="objName" readonly icon="ios-search" placeholder="请选择医生" @on-focus='show'></Input>
                    </Form-item>
                    <Form-item label="医生" v-else>
                        <span>{{userName}}</span>
                    </Form-item>
                    <Form-item label="允许分诊">
                        <Radio-group v-model="formValidate.triageStatus">
                            <Radio label="1">是</Radio>
                            <Radio label="0">否</Radio>
                        </Radio-group>
                    </Form-item>
                    <Form-item label="允许预约">
                        <Radio-group v-model="formValidate.appointmentStatus">
                            <Radio label="1">是</Radio>
                            <Radio label="0">否</Radio>
                        </Radio-group>
                    </Form-item>
                    <Form-item label="关联排班">
                        <Radio-group v-model="formValidate.shiftType">
                            <Radio label="1">是</Radio>
                            <Radio label="0">否</Radio>
                        </Radio-group>
                    </Form-item>
                    <Form-item label="别名">
                        <Input v-model="formValidate.aliasName" placeholder="请输入别名"></Input>
                    </Form-item>
                </Form>
            </Modal>
            <Modal
                title="选择医生"
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
                        title: '医生',
                        key: 'userName'
                    },
                    {
                        title: '允许分诊',
                        key: 'triagestatus',
                        render: (h, params) => {
                            const color = params.row.triagestatus === 1 ? 'blue' : 'red';
                            const text = params.row.triagestatus === 1 ? '是' : '否';
                            return h('span', {
                                style: {
                                    color: color
                                }
                            },text)
                        }
                    },
                    {
                        title: '允许预约',
                        key: 'appointmentstatus',
                        render: (h, params) => {
                            const color = params.row.appointmentstatus === 1 ? 'blue' : 'red';
                            const text = params.row.appointmentstatus === 1 ? '是' : '否';
                            return h('span', {
                                style: {
                                    color: color
                                }
                            },text)
                        }
                    },
                    {
                        title: '排班关联',
                        key: 'shifttype',
                        render: (h, params) => {
                            const color = params.row.shifttype === 1 ? 'blue' : 'red';
                            const text = params.row.shifttype === 1 ? '是' : '否';
                            return h('span', {
                                style: {
                                    color: color
                                }
                            },text)
                        }
                    },
                    {
                        title: '别名',
                        key: 'aliasname'
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
                    userId: '',
                    triageStatus: '1',
                    appointmentStatus: '1',
                    aliasName: '',
                    shiftType: '1'
                },
                dateVal: [],
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
                    ]
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
                    url: 'guard-webManager/consultDoctor/list.jhtml',
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
            edit (data, index) {
                var _vm = this;
                _vm.modalTit = '修改设置'
                _vm.$refs['formValidate'].resetFields();
                _vm.userName = data.userName
                _vm.formValidate.id = data.id
                _vm.formValidate.triageStatus = data.triagestatus
                _vm.formValidate.appointmentStatus = data.appointmentstatus
                _vm.formValidate.shiftType = data.shifttype
                _vm.formValidate.aliasName = data.aliasname
                _vm.key = true
                _vm.modalEdit = true
                _vm.loading = true;
            },
            add () {
                var _vm = this;
                _vm.modalTit = '添加设置'
                _vm.$refs['formValidate'].resetFields();
                _vm.objName = ''
                _vm.key = false
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
            handleReset (name) {
                this.$refs[name].resetFields();
            },
            remove (data) {
                var _vm = this;
                _vm.$Modal.confirm({
                    title: '系统提示',
                    content: '确定删除'+ data.userName +'?',
                    onOk: () => {
                        _vm.$http.post({
                            url: 'guard-webManager/consultDoctor/del.jhtml',
                            data: {id: data.id},
                            success: function(res){
                                console.log(res)
                                if(res.status == 200 ){
                                    if(res.data.code == 0) {
                                        _vm.getList()
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
                        var url = '';
                        if(_vm.key) {
                            url = 'guard-webManager/consultDoctor/update.jhtml'
                        } else {
                            url = 'guard-webManager/consultDoctor/add.jhtml'
                        }
                        _vm.$http.post({
                            url: url,
                            data: _vm.formValidate,
                            success: function(res){
                                console.log(res)
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
            }, 
        }
            
    }
</script>