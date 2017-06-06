/**
 * 客户归属权变更
 */
<template>
    <div class="container-box" ref="containerBox">
        <div class="container-header">
            <h2>归属权管理</h2>
            <ul class="header-btn-group">
                <li class="header-item" @click="batchSetDev"><Icon type="gear-b"></Icon>批量设置开发人员</li>
                <li class="header-item" @click="batchSetCon"><Icon type="gear-b"></Icon>批量设置咨询人员</li>
            </ul>
        </div>
        <div class="container-body">
            <Table stripe :columns="columns" :data="newArrList"></Table>
        </div>
        <Modal
            :title="batchSetTitle"
            v-model="batchSetModal"
            :mask-closable="closable"
            :loading="loading"
            @on-ok="batchSetOk"
            class-name="vertical-center-modal">
            <Form ref="formValidate" :model="formValidate" :rules="ruleValidate" :label-width="100" label-position="right">
                <Form-item label="客户列表">
                    <Input v-model="formValidate.ids" type="textarea" :rows='rows'
                    placeholder="请输入客户编号，一行一个"></Input>
                </Form-item>
                <Form-item :label="batchSetLable" required>
                    <Input readonly icon="ios-search"  v-model="formValidate.newUser" @on-focus='addObj'></Input>
                </Form-item>
            </Form>
        </Modal>

        <Modal
            title="归属权调拨"
            v-model="modalEdit"
            :mask-closable="closable"
            @on-ok="ok"
            :loading="loading"
            class-name="vertical-center-modal">
            <Form ref="formValidate1" :model="formValidate" :rules="ruleValidate" :label-width="100" label-position="right">
                <Form-item label="用户">
                    <p>{{formValidate.name}}</p>
                </Form-item>
                <Form-item label="类型">
                    <p>{{formValidate.name}}</p>
                </Form-item>
                <Form-item label="调拨给新用户" required>
                    <Input readonly icon="ios-search" v-model="formValidate.newUser"  @on-focus='addObj'></Input>
                </Form-item>
            </Form>
        </Modal>
        <Modal
            title="选择用户"
            v-model="selectUserModal"
            :mask-closable="closable"
            :loading="loading"
            width="850"
            class-name="vertical-center-modal">
            <Form :label-width="60" inline :model="selectUserModalData">
                <Form-item label="部门">
                    <Select style="width:162px" v-model="selectUserModalData.deptId">
                        <Option v-for="dept in deptData" :key="dept.deptID" :value="dept.deptID || 1">{{dept.deptName}}</Option>
                    </Select>
                </Form-item>
                <Form-item label="账号">
                    <Input placeholder="输入账号"  v-model="selectUserModalData.account"></Input>
                </Form-item>
                <Form-item label="姓名">
                    <Input placeholder="输入姓名"  v-model="selectUserModalData.name"></Input>
                </Form-item>
                <ul class="header-btn-group not-float">
                    <li class="header-item" @click="searchUser"><Icon type="search"></Icon>查询</li>
                    <li class="header-item" @click="restUser"><Icon type="refresh"></Icon>重置</li>
                </ul>
            </Form>
             <Table stripe :columns="columnsUser" :data="dataUser" height="500"></Table>
        </Modal>
    </div>
</template>

<script>
    export default {
        data () {
            return {
                columns: [
                    {   
                        title: '序号',
                        type: 'index',
                        width: 60
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
                        title: '状态',
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
                        title: '开发人员归属',
                        key: 'devatt',
                        render: (h, params) => {
                            var num = 0;
                            if(!_.isEmpty(params.row.devatt)){
                                num = params.row.devatt.num
                            }
                            return h('span', num)
                        }
                    },
                    {
                        title: '咨询人员归属',
                        key: 'conatt',
                        render: (h, params) => {
                            var num = 0;
                            if(!_.isEmpty(params.row.conatt)){
                                num = params.row.conatt.num
                            }
                            return h('span', num)
                        }
                    },
                    {
                        title: '操作',
                        key: 'action',
                        width: 100,
                        align: 'center',
                        render: (h, params) => {
                            var devatt = params.row.devatt;
                            if(!_.isEmpty(devatt)){
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
                                                this.edit(params.row, 1)
                                            }
                                        }
                                    }, '变更')
                                        
                                ])
                            }
                        }
                    },
                    {
                        title: '操作',
                        key: 'action',
                        width: 100,
                        align: 'center',
                        render: (h, params) => {
                            var conatt = params.row.conatt;
                            if(!_.isEmpty(conatt)){
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
                                                this.edit(params.row, 2)
                                            }
                                        }
                                    }, '变更')    
                                ])
                            }
                        }
                    }
                ],
                columnsUser: [
                    {   
                        title: '账号',
                        key: 'account',
                        width: 170

                    },
                    {   
                        title: '姓名',
                        key: 'name',
                        width: 170
                    },
                    {   
                        title: '部门',
                        key: 'deptName',
                        width: 170
                    },
                    {   
                        title: '性别',
                        key: 'gender',
                        width: 170
                    },
                    {   
                        title: '选择',
                        key: 'action',
                        width: 170,
                        render: (h, params) => {
                            return h('div', [
                                h('Button', {
                                    props: {
                                        type: 'primary',
                                        size: 'small',
                                        icon: 'checkmark'
                                    },
                                    style: {
                                        marginRight: '5px'
                                    },
                                    on: {
                                        click: () => {
                                            this.select(params.row)
                                        }
                                    }
                                }, '选中')
                                    
                            ])

                        }
                    },
                ],
                dataUser: [],
                newUserList: [],
                list1: [],
                list2 : [],
                newArrList: [],
                rows: 5,
                formValidate: {
                    newUser: '',
                    ids: ''
                },
                ruleValidate: {
                    name: [
                        { required: true, message: '必填项不能为空', trigger: 'blur'}
                    ],
                    newUser: [
                        { required: true, message: '必填项不能为空', trigger: 'blur'}
                    ],
                    ids: [
                        { required: true, message: '必填项不能为空', trigger: 'blur'}
                    ]
                },
                loading: true,
                modalEdit: false,
                closable: false,
                selectUserModal: false,
                selectUserModalData: {
                    account: '',
                    name: '',
                    deptId: ''
                },
                batchSetModal: false,
                batchSetTitle: '',
                batchSetType : 1, //默认1 批量设置开发人员
                batchSetLable: '开发人员',
                deptData: [],
                hideInputID: '', //这个数据是给
                userId: '',
                type: '',
            }
        },
        mounted () {
            this.init();
        },
        methods: {
            init: function(){
                var _vm = this;
                _vm.$http.get({
                    url: 'guard-webManager/ownerShip/list.jhtml',
                    success: function(data){
                        var data = data.data || {};
                        if(data.code == 0){
                            var newUserList = [],
                            list1 = [],
                            list2 = [],
                            newArrList = [];
                            try {
                                var content = data.content;
                                newUserList = content.newUserList || [];
                                list1 = content.list1 || [];
                                list2 = content.list2 || [];
                                newArrList = _.map(newUserList, function(data){
                                    var devatt = _.find(list1, function(d){ return d.userid == data.id}) || {};
                                    var conatt = _.find(list2, function(d){ return d.userid == data.id}) || {};
                                    return {
                                        id: data.id,
                                        name: data.name,
                                        status: data.status,
                                        deptName: data.deptName,
                                        devatt: devatt,
                                        conatt: conatt
                                    }
                                });

                            } catch (error) {
                                newUserList = [];
                                list1 = [];
                                list2 = [];
                                newArrList = [];
                            }
                           _vm.newUserList = newUserList;
                           _vm.list1 = list1;
                           _vm.list2 = list2;
                           _vm.newArrList = newArrList;

                        }
                       
                    }
                })
            },
            getHospitalUserList: function(setting){
                var setting = setting || {};
                var _vm = this;
                _vm.$http.get({
                    url: 'guard-webManager/select/hospitalUserList.jhtml',
                    data: {
                        hospitalId: setting.hospitalId || 1,
                        account: setting.account,
                        name: setting.name,
                        deptId: setting.deptId
                    },
                    success: function(data){
                        var data = data.data || {},
                        dataUser = [];
                        try {
                           dataUser = data.content; 
                        } catch (error) {
                            dataUser = [];
                        }
                        _vm.deptData = _.keyBy(_.map(dataUser, function(d){
                            return {
                                deptID: d.deptID,
                                deptName: d.deptName
                            }
                        }),'deptName');
                       _vm.dataUser = dataUser;
                       
                    }
                });

            },
            edit: function(row, type) {
                this.modalEdit = true;
                this.formValidate.name = row.name;
                this.userId = row.id;
                this.hideInputID = '';
                this.type = type;
            },
            ok: function(){
                var _vm = this;
                _vm.$http.post({
                    url: 'guard-webManager/ownerShip/changeUserAdd.jhtml',
                    data: {
                        type: _vm.type,
                        userId: _vm.userId,
                        id: _vm.hideInputID
                    },
                    success: function(data){
                        var data = data.data || {}; 
                        if(data.code == 0){
                            _vm.loading = false;
                            _vm.modalEdit = false;
                        }
                    }
                });

            },
            addObj: function(){
                this.selectUserModal = true;
                this.getHospitalUserList();
            },
            batchSetDev: function(){
                this.batchSetTitle = '批量设置开发人员';
                this.batchSetLable = '开发人员';
                this.batchSetModal = true;
                this.hideInputID = '';
                this.batchSetType = 1;
            },
            batchSetCon: function(){
                this.batchSetTitle = '批量设置咨询人员';
                this.batchSetLable = '咨询人员';
                this.batchSetModal = true;
                this.hideInputID = '';
                this.batchSetType = 2;
            },
            batchSetOk: function(){
                var _vm = this,
                    url = '';

                    if(_vm.batchSetType == 1){ //批量设置开发人员
                        url = 'guard-webManager/ownerShip/exploitUserBatchAdd.jhtml';
                    }else{
                        url = 'guard-webManager/ownerShip/managerUserBatchAdd.jhtml';
                    }
                    var ids = (_vm.formValidate.ids || ' ').replace(/[\r\n]/g, ",");
                    _vm.$http.post({
                        url: url,
                        data: {
                            userId: _vm.hideInputID,
                            ids: ids
                        },
                        success: function(data){
                            var data = data.data || {}; 
                            if(data.code == 0){
                                _vm.loading = false;
                                _vm.batchSetModal = false;
                            }
                        }
                    });
            },

            //选择用户模态框action
            select: function(row){
                var _vm = this;
                _vm.hideInputID = row.id;
                _vm.formValidate.newUser = row.name;
                _vm.selectUserModal = false;
            },
            searchUser: function(){
                var _vm = this;
                var setting = {
                    hospitalId: 1,
                    account: _vm.selectUserModalData.account,
                    name: _vm.selectUserModalData.name,
                    deptId: _vm.selectUserModalData.deptId
                }
                _vm.getHospitalUserList(setting);
            },
            restUser: function(){
                var _vm = this;
                _vm.selectUserModalData.account = '';
                _vm.selectUserModalData.name = '';
                _vm.selectUserModalData.deptId = '';
            }
        }
    }
</script>