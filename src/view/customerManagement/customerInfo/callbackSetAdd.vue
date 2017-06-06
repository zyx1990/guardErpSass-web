/**
 * 添加回访计划页面
 */

<template>
    <div class="container-box userPower">
        <div v-if='powerLoad > 0'>
            <div class="container-header">
                <h2>添加回访计划</h2>
            </div>
            <div class="container-body">
                <Form ref="formValidate" :model="formValidate" :rules="ruleForm" :label-width="100" label-position="right">
                    <Form-item label="起始日期" required prop="startTime">
                        <Date-picker type="date" placement="bottom-start" placeholder="选择日期" style="width: 300px" :options='options' @on-change='saveDate'></Date-picker>
                    </Form-item>
                    <Form-item label="回访计划" prop="setId" required class='callbackSetAddObj'>
                        <Table stripe :columns="col1" :data="setData"></Table>
                        <Button type="primary" shape="circle" icon="ios-search-strong" @click='showPlan'>选择回访计划</Button>
                    </Form-item>
                    <Form-item label="回访人员" prop="userId" required class='treatAddObj'>
                        <Input v-model="userName" readonly icon="ios-search" placeholder="请选择开发人员" @on-focus="showUser" style="width:300px"></Input>
                    </Form-item>
                </Form>
                <div class="footer-btnGroup">
                    <Button type="primary" shape="circle" icon="checkmark" @click='save'>保存</Button>
                    <Button type="primary" shape="circle" icon="android-arrow-back" @click='back'>返回</Button>
                </div>
                <Modal
                    title="选择回访人员"
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
                <Modal
                    title="选择回访计划"
                    width='700'
                    v-model="modalPlan"
                    :closable="false"
                    class-name="vertical-center-modal">
                    <Table height="350" stripe :columns="colP" :data="dataP" @on-row-click='chooseRow'></Table>
                    <Table stripe :columns="colC" :data="dataC"></Table>
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
            const validateDay = (rule, value, callback) => {
                if (value === '') {
                    callback(new Error('请选择回访日期'));
                } else {
                    callback();
                }
            };
            const validatePlan = (rule, value, callback) => {
                if (value === '') {
                    callback(new Error('请选择回访计划'));
                } else {
                    callback();
                }
            };
            const validateUser = (rule, value, callback) => {
                if (value === '') {
                    callback(new Error('请选择回访人员'));
                } else {
                    callback();
                }
            };
            return {
                cusName: '',
                powerLoad: '-1',
                errorMsg: '',

                formValidate: {
                    customerId: '',
                    startTime: '',
                    userId: '',
                    setId: '',
                },
                setData: [],
                formUser: {
                    hospitalId: '',
                    account: '',
                    name: '',
                    deptId: ''
                },
                typeList: [],
                userName: '',
                deptList: [],
                options: {
                    disabledDate (date) {
                        return date && date.valueOf() < Date.now() - 86400000;
                    }
                },
                modal: false,
                modalPlan: false,
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
                col1: [
                    {
                        title: '天数',
                        key: 'days'
                    },
                    {
                        title: '回访日期',
                        key: 'days',
                        render: (h, params) => {
                            const _year = (new Date(Date.now() + params.row.days * 24 * 60 * 60 * 1000)).getFullYear()
                            const _month = (new Date(Date.now() + params.row.days * 24 * 60 * 60 * 1000)).getMonth() + 1
                            const _day = (new Date(Date.now() + params.row.days * 24 * 60 * 60 * 1000)).getDate()
                            return h('span', _year + '-' + _month + '-' + _day)
                        }
                    },
                    {
                        title: '回访类型',
                        key: 'categoryName'
                    },
                    {
                        title: '说明',
                        key: 'name'
                    }
                ],
                colP: [
                    {   
                        title: '编号',
                        key: 'id'
                    },
                    {
                        title: '名称',
                        key: 'name'
                    },
                    {
                        title: '描述',
                        key: 'remark'
                    },
                    {
                        title: '选择',
                        key: 'action',
                        width: 100,
                        align: 'center',
                        render: (h, params) => {
                            return h('div', [
                                    h('Button', {
                                        props: {
                                            type: 'primary',
                                            size: 'small',
                                            icon: 'checkmark'
                                        },
                                        on: {
                                            click: () => {
                                                this.choosePlan(params.row)
                                            }
                                        }
                                    }, '选中'),
                                ])
                        }
                    }
                ],
                dataP: [],
                colC: [
                    {
                        title: '天数',
                        key: 'days'
                    },
                    {
                        title: '回访类型',
                        key: 'categoryName'
                    },
                    {
                        title: '说明',
                        key: 'name'
                    }
                ], 
                dataC: [],
                ruleForm: {
                    startTime: [
                        { validator: validateDay, trigger: 'change' }
                    ],
                    setId: [
                        { validator: validatePlan, trigger: 'blur' }
                    ],
                    userId: [
                        { validator: validateUser, trigger: 'blur' }
                    ]
                }
            }
        },
        created () {
            if (window.sessionStorage) {
                var lg = window.sessionStorage;
                this.formValidate.customerId = lg.cusId
                this.formUser.hospitalId = lg.hospId
                this.cusName = lg.cusName
            }
            this.getId(this.formValidate.customerId)
            this.getDept(this.formUser.hospitalId)
        },
        methods: {
            // 获取资料
            getId (id) {
                var _vm = this;
                _vm.$http.get({
                    url: 'guard-webManager/customerRecord/callbackSetAdd.jhtml',
                    data: {customerId: id},
                    success: function(res){
                        if(res.status == 200 ){
                            if(res.data.code == 0) {
                                _vm.powerLoad = 1
                                console.log(res)
                                _vm.getList()
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
            // 获取组列表
            getList () {
                var _vm = this;
                _vm.$http.get({
                    url: 'guard-webManager/select/callbackSetList.jhtml',
                    success: function(res){
                        if(res.status == 200 ){
                            if(res.data.code == 0) {
                                console.log(res)
                                _vm.dataP = res.data.content
                            } else {
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
            saveDate (date) {
                this.formValidate.startTime = date
            },
            showUser () {
                this.modal = true
            },
            choose (data) {
                this.formValidate.userId = data.id
                this.userName = data.name
                this.modal = false
            },
            handleReset (name) {
                var _vm = this
                _vm.$refs[name].resetFields();
            },
            showPlan () {
                this.modalPlan = true
            },
            chooseRow (data) {
                this.dataC = data.detailList
            },
            choosePlan (data) {
                this.setData = data.detailList
                this.formValidate.setId = data.id
                this.modalPlan = false
            },
            save () {
                var _vm = this
                _vm.$refs['formValidate'].validate((valid) => {
                    if(valid) { 
                        _vm.$http.post({
                            url: 'guard-webManager/customerRecord/addCallbackSet.jhtml',
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
                                                url: '/indexCallback',
                                                text: _vm.cusName
                                            }
                                        ];
                                        _vm.$store.dispatch('setBreadData', breadData);
                                        _vm.$router.push('/indexCallback')
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
                        url: '/indexCallback',
                        text: this.cusName
                    }
                ];
                this.$store.dispatch('setBreadData', breadData);
                this.$router.back(-1)
            }
        }
    }
</script>

<style>
    .callbackSetAddObj button {
        margin-top: 10px;
    }
</style>

