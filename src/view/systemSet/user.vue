/**
 * 用户管理
 */

<template>
    <div class="container-box user" ref="containerBox">
        <div class="container-header">
            <h2>用户管理</h2>
            <ul class="header-btn-group">
                <li class="header-item" @click="addSet"><Icon type="gear-b"></Icon>批量设置角色</li>
                <li class="header-item" @click="add"><Icon type="plus-round"></Icon>增加</li>
            </ul>
        </div>
        <div class="container-body">
            <Form  :label-width="60" inline ref="formSearch" :model="formSearch">
                <Form-item label="账号" prop='account'>
                    <Input v-model="formSearch.account" placeholder="请输入账号"></Input>
                </Form-item>
                <Form-item label="姓名" prop='name'>
                    <Input v-model="formSearch.name" placeholder="请输入姓名"></Input>
                </Form-item>
                <Form-item label="所属医院" prop="hospitalId">
                    <Select v-model="formSearch.hospitalId" clearable style="width:200px">
                        <Option v-for="item in hospList" :value="item.id" :key="item">{{ item.name }}</Option>
                    </Select>
                </Form-item>
                <Form-item label="部门" prop='deptId'>
                    <Select v-model="formSearch.deptId" clearable style="width:162px">
                        <Option v-for="item in deptList" :value="item.id" :key="item">{{ item.name }}</Option>
                    </Select>
                </Form-item>
                <Form-item label="角色" prop='roleId'>
                    <Select v-model="formSearch.roleId" clearable style="width:162px">
                        <Option v-for="item in roleList" :value="item.id" :key="item">{{ item.name }}</Option>
                    </Select>
                </Form-item>
                <Form-item label="状态" prop='status'>
                    <Select v-model="formSearch.status" clearable style="width:162px">
                        <Option value="1">启用</Option>
                        <Option value="0">禁用</Option>
                    </Select>
                </Form-item>
                <ul class="header-btn-group not-float">
                    <li class="header-item"  @click="getList('1', '10', formSearch)"><Icon type="search"></Icon>查询</li>
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
                width='600'
                v-model="modalEdit"
                :closable="false"
                @on-ok="ok"
                :loading="loading"
                class-name="vertical-center-modal">
                <Form ref="formValidate" :model="formValidate" :rules="ruleForm" :label-width="100" label-position="right">
                    <Form-item label="所属医院" prop="hospitalId" required v-if='!seen'>
                        <Select v-model="formValidate.hospitalId" clearable style="width:400px">
                            <Option v-for="item in hospList" :value="item.id" :key="item">{{ item.name }}</Option>
                        </Select>
                    </Form-item>
                    <Form-item label="医院" v-else>
                        <span>{{editHosp}}</span>
                    </Form-item>
                    <Form-item label="账户" prop="account" required>
                        <Input v-model="formValidate.account" placeholder="请输入账户" style="width:400px"></Input>
                    </Form-item>
                    <Form-item label="密码" prop="password" required>
                        <Input v-model="formValidate.password" placeholder="请输入密码" style="width:400px"></Input>
                    </Form-item>
                    <Form-item label="姓名" prop="name" required>
                        <Input v-model="formValidate.name" placeholder="请输入姓名" style="width:400px"></Input>
                    </Form-item>
                    <Form-item label="状态" prop="status" v-if="seen">
                        <Radio-group v-model="formValidate.status">
                            <Radio label="1">启用</Radio>
                            <Radio label="0">禁用</Radio>
                        </Radio-group>
                    </Form-item>
                    <Form-item label="性别" prop="gender" required>
                        <Select v-model="formValidate.gender" placeholder="请选择性别" style="width:400px">
                            <Option value="1">男</Option>
                            <Option value="2">女</Option>
                        </Select>
                    </Form-item>
                    <Form-item label="部门" prop='deptId' required>
                        <Select v-model="formValidate.deptId" clearable style="width:400px">
                            <Option v-for="item in deptList" :value="item.id" :key="item">{{ item.name }}</Option>
                        </Select>
                    </Form-item>
                    <Form-item label="电话" prop="phone">
                        <Input v-model="formValidate.phone" placeholder="请输入电话" style="width:400px"></Input>
                    </Form-item>
                    <Form-item label="手机" prop="mobile">
                        <Input v-model="formValidate.mobile" placeholder="请输入手机" style="width:400px"></Input>
                    </Form-item>
                    <Form-item label="角色" prop='roleId'>
                        <Select v-model="formValidate.roleId" clearable style="width:400px">
                            <Option v-for="item in roleList" :value="item.id" :key="item">{{ item.name }}</Option>
                        </Select>
                    </Form-item>
                    <Form-item label="备注" prop="remark" style="width:500px">
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
                        title: '编号',
                        key: 'id'
                    },
                    {
                        title: '账号',
                        key: 'account'
                    },
                    {
                        title: '姓名',
                        key: 'name'
                    },
                    {
                        title: '性别',
                        width: 70,
                        key: 'gender',
                        render: (h, params) => {
                            const text = params.row.gender === 1 ? '男' : '女';
                            return h('span',text)
                        }
                    },
                    {
                        title: '部门',
                        key: 'deptName'
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
                        title: '角色',
                        key: 'roleName'
                    },
                    {
                        title: '电话',
                        key: 'phone'
                    },
                    {
                        title: '手机',
                        key: 'mobile'
                    },
                    {
                        title: '操作',
                        key: 'action',
                        width: 420,
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
                                            marginRight: '2px'
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
                                            marginRight: '2px'
                                        },
                                        on: {
                                            click: () => {
                                                this.remove(params.row)
                                            }
                                        }
                                    }, '删除'),
                                    h('Button', {
                                        props: {
                                            type: 'warning',
                                            size: 'small',
                                            icon: 'document-text'
                                        },
                                        style: {
                                            marginRight: '2px'
                                        },
                                        on: {
                                            click: () => {
                                                this.check(params.row)
                                            }
                                        }
                                    }, '查看权限'),
                                    h('Button', {
                                        props: {
                                            type: 'info',
                                            size: 'small',
                                            icon: 'wrench'
                                        },
                                        style: {
                                            marginRight: '2px'
                                        },
                                        on: {
                                            click: () => {
                                                this.power(params.row)
                                            }
                                        }
                                    }, '客户权限'),
                                    h('Button', {
                                        props: {
                                            type: 'warning',
                                            size: 'small',
                                            icon: 'person'
                                        },
                                        on: {
                                            click: () => {
                                                this.power(params.row)
                                            }
                                        }
                                    }, '设置回访权限'),
                                ])
                        }
                    }
                ],
                data: [],
                formSearch: {
                    account: '',
                    name: '',
                    hospitalId: '',
                    deptId: '',
                    roleId: '',
                    status: ''
                },
                total: '',
                totalPages: '',
                pageNumber: '1',
                hospList: [],
                deptList: [],
                roleList: [],
                modalTit: '',
                modalEdit: false,
                loading: true,
                editHosp: '',
                formValidate: {
                    id: '',
                    hospitalId: '',
                    account: '',
                    password: '',
                    name: '',
                    status: '',
                    gender: '',
                    deptId: '',
                    phone: '',
                    mobile: '',
                    roleId: '',
                    remark: ''
                },
                seen: true,
                ruleForm: {}
            }
        },
        computed: {
            totalNum: function () {
                return this.total * 1
            },
            pageNum: function () {
                return this.pageNumber * 1
            },
        },
        created () {
            this.getList('1', '10', this.formSearch)
        },
        mounted () {
            this.getRole()
            this.getHops()
            this.getDept('1')
        },
        methods: {
            // 获取分页
            getList(pageNumber, pageSize, form) {
                var _vm = this
                form['pageNumber'] = pageNumber
                form['pageSize'] = pageSize
                console.log(form)
                 _vm.$http.get({
                    url: 'guard-webManager/user/page.jhtml',
                    data: form,
                    success: function(res){
                        if(res.status == 200 ){
                            console.log(res.data.content)
                            _vm.total = res.data.content.total
                            _vm.pageNumber = res.data.content.pageNumber
                            _vm.totalPages = res.data.content.totalPages
                            _vm.data = res.data.content.content
                        } else {
                            console.log(res.data.desc)
                        }
                    },
                    error: function(res){
                        console.log(res);
                    }
                });
            },
            //获取角色下拉
            getRole () {
                var _vm = this;
                _vm.$http.get({
                    url: 'guard-webManager/select/roleInfo.jhtml',
                    success: function(res){
                        if(res.status == 200 ){
                            _vm.roleList = res.data.content
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
            add () {
                var _vm = this;
                _vm.modalTit = '添加用户'
                _vm.$refs['formValidate'].resetFields();
                _vm.seen = false
                _vm.modalEdit = true
                _vm.loading = true;
            },
            edit (data) {
                console.log(data)
                var _vm = this;
                _vm.modalTit = '修改用户'
                _vm.$refs['formValidate'].resetFields();
                _vm.editHosp = data.hospitalName
                _vm.formValidate.id = data.id
                _vm.formValidate.account = data.account
                _vm.formValidate.password = data.password
                _vm.formValidate.name = data.name
                _vm.formValidate.status = data.status
                _vm.formValidate.gender = data.gender + ''
                _vm.formValidate.deptId = data.deptid
                _vm.formValidate.mobile = data.mobile
                _vm.formValidate.phone = data.phone
                _vm.formValidate.roleId = data.roleid
                _vm.formValidate.remark = data.remark
                _vm.seen = true
                _vm.modalEdit = true
                _vm.loading = true;
                console.log( _vm.formValidate.gender)
            },
            remove (data) {
                var _vm = this;
                _vm.$Modal.confirm({
                    title: '系统提示',
                    content: '确定删除'+ data.name +'?',
                    onOk: () => {
                        _vm.$http.post({
                            url: 'guard-webManager/user/del.jhtml',
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
            addSet () {
                var _vm = this;
                var breadData = [
                    {
                        url: '/desktop',
                        text: '桌面'
                    },
                    {
                        url: '/user',
                        text: '用户管理'
                    },
                    {
                        url: '/userSetting',
                        text: '批量添加角色'
                    },
                ];
                this.$store.dispatch('setBreadData', breadData);
                this.$router.push('/userSetting') 
            },
            check (index) {
                var _vm = this;
                var breadData = [
                    {
                        url: '/desktop',
                        text: '桌面'
                    },
                    {
                        url: '/user',
                        text: '用户管理'
                    }
                ];
                breadData.push({
                    url: '/userCheck' + index,
                    text: this.data[index].name
                });
                this.$store.dispatch('setBreadData', breadData);
                this.$router.push('/userCheck' + index)
            },
            power($event, index) {
                var _vm = this;
                var $this = $($event.currentTarget);
                var breadData = [
                    {
                        url: '/desktop',
                        text: '桌面'
                    },
                    {
                        url: '/user',
                        text: '用户管理'
                    }
                ];
                breadData.push({
                    url: $this.data('url') + index,
                    text: $this.data('name') || ''
                });
                this.$store.dispatch('setBreadData', breadData);
                this.$router.push($this.data('url') + index)
            },
            ok () {
                var _vm = this;
                _vm.$refs['formValidate'].validate((valid) => {
                    if (valid) {
                        var url = '';
                        if(_vm.seen) {
                            url = 'guard-webManager/user/update.jhtml'
                        } else {
                            url = 'guard-webManager/user/add.jhtml'
                        }
                        _vm.$http.post({
                            url: url,
                            data: _vm.formValidate,
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
                    } else {
                        _vm.loading = false;
                    }
                })
            },
            //重置
            handleReset (name) {
                this.categoryName = '';
                this.$refs[name].resetFields();
            },
            //分页
            changePage (num) {
                this.getList(num, '10', this.formSearch)
            },
        }

    }
</script>
