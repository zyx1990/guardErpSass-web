/**
 * 部门管理页面
 */

<template>
    <div class="container-box">
        <div class="container-header">
            <h2>部门管理</h2>
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
                    <Form-item label="选择医院" prop="hospitalId" required v-show='!seen'>
                        <Select v-model="formValidate.hospitalId">
                            <Option v-for="item in hospList" :value="item.id" :key="item">{{ item.name }}</Option>
                        </Select>
                    </Form-item>
                    <Form-item label="选择医院" v-if='seen'>
                        <span>{{editHosp}}</span>
                    </Form-item>
                    <Form-item label="名称" prop="name" required>
                        <Input v-model="formValidate.name" placeholder="请输入名称"></Input>
                    </Form-item>
                    <Form-item label="开放状态" prop="openStatus">
                        <Radio-group v-model="formValidate.openStatus">
                            <Radio label="1">开放</Radio>
                            <Radio label="0">不开放</Radio>
                        </Radio-group>
                    </Form-item>
                    <Form-item label="排序号" prop="sortNo" required>
                        <Input v-model="formValidate.sortNo" placeholder="请输入排序号"></Input>
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
                    callback(new Error('请输入姓名'));
                } else {
                    callback();
                }
            };
            const validateHosp = (rule, value, callback) => {
                if (value === '') {
                    callback(new Error('请选择医院'));
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
                seen: true,
                editHosp: '',
                columns: [
                    {   
                        title: '序号',
                        type: 'index',
                        width: 60
                    },
                    {
                        title: '医院',
                        key: 'hospitalName'
                    },
                    {
                        title: '名称',
                        key: 'name'
                    },
                    {
                        title: '开放',
                        width: 70,
                        key: 'openstatus',
                        render: (h, params) => {
                            const color = params.row.openstatus === 1 ? 'blue' : 'red';
                            const text = params.row.openstatus === 1 ? '是' : '否';
                            return h('span', {
                                style: {
                                    color: color
                                }
                            },text)
                        }
                    },
                    {
                        title: '排序号',
                        key: 'sortno'
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
                formValidate: {
                    id: '',
                    hospitalId: '',
                    name: '',
                    openStatus: '',
                    sortNo: '',
                    remark: ''
                },
                hospList: [],
                ruleForm: {
                    name: [
                        { validator: validateName, trigger: 'blur' }
                    ],
                    sortNo: [
                        { validator: validateSort, trigger: 'blur' }
                    ],
                    hospitalId: [
                        { validator: validateHosp, trigger: 'blur' }
                    ],
                }
            }
        },
        created () {
            this.getList()
        },
        mounted () {
            this.getHops()
        },
        methods: {
            //获取列表
            getList () {
                var _vm = this;
                _vm.$http.get({
                    url: 'guard-webManager/dept/list.jhtml',
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
            //获取医院下拉列表
            getHops () {
                var _vm = this;
                _vm.$http.get({
                    url: 'guard-webManager/select/hospitalList.jhtml',
                    success: function(res){
                        if(res.status == 200 ){
                            console.log(res.data.content)
                            _vm.hospList = res.data.content
                        } else {
                            console.log(res.data.desc)
                        }
                    },
                    error: function(res){
                        console.log(res);
                    }
                });
            },
            //添加
            add () {
                var _vm = this;
                _vm.modalTit = '添加部门'
                _vm.$refs['formValidate'].resetFields();
                _vm.formValidate.openStatus = 1
                _vm.seen = false
                _vm.modalEdit = true
                _vm.loading = true;
            },
            //编辑
            edit (data) {
                var _vm = this
                _vm.modalTit = '修改部门'
                _vm.$refs['formValidate'].resetFields();
                _vm.editHosp = data.hospitalName
                _vm.formValidate.hospitalId = 666
                _vm.formValidate.id = data.id
                _vm.formValidate.name = data.name
                _vm.formValidate.openStatus = data.openstatus
                _vm.formValidate.sortNo = data.sortno
                _vm.formValidate.remark = data.remark
                _vm.modalEdit = true
                _vm.seen = true
                _vm.loading = true;
            },
            //删除
            remove (data) {
                var _vm = this;
                _vm.$Modal.confirm({
                    title: '系统提示',
                    content: '确定删除'+ data.name +'?',
                    onOk: () => {
                        _vm.$http.post({
                            url: 'guard-webManager/dept/del.jhtml',
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
            //提交
            ok () {
                var _vm = this;
                _vm.$refs['formValidate'].validate((valid) => {
                    if (valid) {
                        var url = '';
                        var data = {};
                        if(_vm.seen) {
                            url = 'guard-webManager/dept/edit.jhtml'
                            data = {
                                id: _vm.formValidate.id,
                                name: _vm.formValidate.name,
                                sortNo: _vm.formValidate.sortNo,
                                openStatus: _vm.formValidate.openStatus,
                                remark: _vm.formValidate.remark
                            }
                        } else {
                            url = 'guard-webManager/dept/add.jhtml'
                            data = {
                                hospitalId: _vm.formValidate.hospitalId,
                                name: _vm.formValidate.name,
                                sortNo: _vm.formValidate.sortNo,
                                openStatus: _vm.formValidate.openStatus,
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