/**
 * 添加咨询人员变更申请页面
 */

<template>
    <div class="container-box userPower">
        <div v-if='powerLoad > 0'>
            <div class="container-header">
                <h2>添加咨询人员变更申请</h2>
            </div>
            <div class="container-body">
                <Form ref="formValidate" :model="formValidate" :rules="ruleForm" :label-width="100" label-position="right">
                    <Form-item label="变更类型">
                        <span>咨询人员</span>
                    </Form-item>
                    <Form-item label="当前咨询人员">
                        <span>{{ManagerUserName}}</span>
                    </Form-item>
                    <Form-item label="新咨询人员" prop="userName" required class='treatAddObj'>
                        <Input v-model="formValidate.userName" readonly icon="ios-search" placeholder="请选择开发人员" @on-focus="showUser" style="width:300px"></Input>
                    </Form-item>
                    <Form-item label="变更原因" prop="content" required>
                        <Input v-model="formValidate.content" type="textarea" :autosize="{minRows: 2,maxRows: 7}" placeholder="请输入变更原因"></Input>
                    </Form-item>
                </Form>
                <div class="footer-btnGroup">
                    <Button type="primary" shape="circle" icon="checkmark" @click='save'>保存</Button>
                    <Button type="primary" shape="circle" icon="android-arrow-back" @click='back'>返回</Button>
                </div>
                <Modal
                    title="选择新咨询人员"
                    width='700'
                    v-model="modal"
                    :closable="false"
                    class-name="vertical-center-modal">
                    <Form  :label-width="50" inline ref='formUser' :model='formUser'>
                        <Form-item label="部门" prop='deptId'>
                            <Select v-model="formUser.deptId" clearable style="width:162px">
                                <Option v-for="item in deptList" :value="item.id" :key="item">{{ item.name }}</Option>
                            </Select>
                        </Form-item>
                        <Form-item label="账号" prop='account'>
                            <Input v-model="formUser.account" placeholder="请输入账号"></Input>
                        </Form-item>
                        <Form-item label="姓名" prop='name'>
                            <Input v-model="formUser.name" placeholder="请输入姓名"></Input>
                        </Form-item>
                        <ul class="header-btn-group not-float">
                            <li class="header-item" @click="getUser(formUser)"><Icon type="search"></Icon>查询</li>
                            <li class="header-item" @click="handleReset('formUser')"><Icon type="refresh"></Icon>重置</li>
                        </ul>
                    </Form>
                    <Table height="350" stripe :columns="col" :data="data" @on-row-click='choose'></Table>
                </Modal>
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
            const validateCon = (rule, value, callback) => {
                if (value === '') {
                    callback(new Error('请填写变更原因'));
                } else {
                    callback();
                }
            };
            const validateUser = (rule, value, callback) => {
                if (value === '') {
                    callback(new Error('请选择新开发人员'));
                } else {
                    callback();
                }
            };
            return {
                cusName: '',
                powerLoad: '-1',
                errorMsg: '',
                ManagerUserName: '',
                formValidate: {
                    customerId: '',
                    userId: '',
                    userName: '',
                    content: ''
                },
                formUser: {
                    hospitalId: '',
                    account: '',
                    name: '',
                    deptId: ''
                },
                deptList: [],
                modal: false,
                col: [
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
                data: [],
                ruleForm: {
                    userName: [
                        { validator: validateUser, trigger: 'change' }
                    ],
                    content: [
                        { validator: validateCon, trigger: 'blur' }
                    ]
                }
            }
        },
        created () {
            if (window.sessionStorage) {
                var lg = window.sessionStorage;
                this.formValidate.customerId = lg.cusId
                this.cusName = lg.cusName
                this.formUser.hospitalId = lg.hospId
            }
            this.getId(this.formValidate.customerId)
            this.getDept(this.formUser.hospitalId)
        },
        methods: {
            // 获取资料
            getId (id) {
                var _vm = this;
                _vm.$http.get({
                    url: 'guard-webManager/customerRecord/managerChangeInfo.jhtml',
                    data: {customerId: id},
                    success: function(res){
                        if(res.status == 200 ){
                            if(res.data.code == 0) {
                                _vm.powerLoad = 1
                                console.log(res)
                                _vm.ManagerUserName = res.data.content.ManagerUserName
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
            //获取弹窗用户选择列表
            getUser (form) {
                var _vm = this;
                _vm.$http.get({
                    url: 'guard-webManager/select/hospitalUserList.jhtml',
                    data: form,
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
            showUser () {
                this.modal = true
            },
            choose (data) {
                this.formValidate.userId = data.id
                this.formValidate.userName = data.name
                this.modal = false
            },
            handleReset (name) {
                var _vm = this
                _vm.$refs[name].resetFields();
            },
            save () {
                var _vm = this
                _vm.$refs['formValidate'].validate((valid) => {
                    if(valid) { 
                        _vm.$http.post({
                            url: 'guard-webManager/customerRecord/editManagerChange.jhtml',
                            data: _vm.formValidate,
                            success: function(res){
                                if(res.status == 200 ){
                                    console.log(res)
                                    if(res.data.code == 0) {
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
                                                text: _vm.cusName
                                            }
                                        ];
                                        _vm.$store.dispatch('setBreadData', breadData);
                                        _vm.$router.push('/customerMsg')
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


