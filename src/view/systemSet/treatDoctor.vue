/**
 * 医生治疗预约设置
 */

<template>
    <div class="container-box treatDoctor">
        <div class="container-header">
            <h2>医生治疗预约设置</h2>
            <ul class="header-btn-group">
                <li class="header-item" @click='toEdit'><Icon type="plus-round"></Icon>批量增加</li>
                <li class="header-item" @click='add'><Icon type="plus-round"></Icon>增加</li>
            </ul>
        </div>
        <div class="container-body">
            <table class="treatDoctorTable">
                <thead>
                    <tr>
                        <th class="indexCol">序号</th>
                        <th>医生</th>
                        <th>时间段</th>
                        <th>人数限制</th>
                        <th class="childAct">操作</th>
                        <th class="parentAct">操作</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for='(item, index) in items'>
                        <td class="indexCol" :rowspan="item._span" :class="{hidden: item._dis}">{{item._ret}}</td>
                        <td :rowspan="item._span" :class="{hidden: item._dis}">{{item.userName}}</td>
                        <td>{{item.starttime}} - {{item.endtime}}</td>
                        <td>{{item.num}}</td>
                        <td class="childAct">
                            <i-button type="primary" size="small" @click='edit(item, index)'>
                                <Icon type="edit"></Icon>编辑
                            </i-button> 
                            <i-button type="error" size="small" @click="remove(item, 'del')">
                                <Icon type="ios-trash-outline"></Icon>删除
                            </i-button>
                        </td>
                        <td class="parentAct" :rowspan="item._span" :class="{hidden: item._dis}">
                            <i-button type="error" size="small" @click="remove(item, 'all')">
                                <Icon type="ios-trash-outline"></Icon>删除
                            </i-button>
                        </td>
                    </tr>
                </tbody>
            </table>
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
                    <Form-item label="医生" v-else>
                        <span>{{userName}}</span>
                    </Form-item>
                    <Form-item label="预约时间" required prop="startTime">
                         <Time-picker :value='dateVal' format="HH:mm" type="timerange" placement="bottom-start" placeholder="选择时间" @on-change='saveTime'></Time-picker>
                    </Form-item>
                    <Form-item label="人数" prop="num" required>
                        <Input v-model="formValidate.num" placeholder="请输入人数"></Input>
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
            return {
                items: [],
                modalTit: '',
                modalEdit: false,
                loading: true,
                key: true,
                userName: '',
                formValidate: {
                    id: '',
                    userId: '',
                    startTime: '',
                    endTime: '',
                    num: ''
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
                ruleForm: {}
            }
        },
        watch: {
            items (val) {
                this.items = this.combineCell('userid', this.items)
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
                    url: 'guard-webManager/treatDoctor/list.jhtml',
                    success: function(res){
                        if(res.status == 200 ){
                            console.log(res)
                            _vm.items = res.data.content.List
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
                _vm.dateVal = []
                _vm.$refs['formValidate'].resetFields();
                _vm.userName = data.userName
                _vm.formValidate.id = data.id
                _vm.formValidate.startTime = data.starttime
                _vm.formValidate.endTime = data.endtime
                _vm.dateVal.push(data.starttime)
                _vm.dateVal.push(data.endtime)
                _vm.formValidate.num = data.num
                _vm.key = true
                _vm.modalEdit = true
                _vm.loading = true;
            },
            toEdit () {
                var breadData = [
                    {
                        url: '/desktop',
                        text: '桌面'
                    },
                    {
                        url: '/treatDoctor',
                        text: '医生预约设置'
                    },
                    {
                        url: '/treatDoctorEdit',
                        text: '添加设置'
                    }
                ];
                this.$store.dispatch('setBreadData', breadData);
                this.$router.push('/treatDoctorEdit')
            },
            combineCell (key, list) {
                var k = 0;
                var resetIndex = 1;
                while (k < list.length) {
                    list[k]['_span'] = 1;
                    list[k]['_dis'] = false;
                    list[k]['_ret'] = resetIndex;
                    for (var i = k + 1; i <= list.length - 1; i++) {
                        if(list[k][key] == list[i][key]) {
                            list[k]['_span']++;
                            list[k]['_dis'] = false;
                            list[i]['_span'] = 1;
                            list[i]['_dis'] = true;
                        } else {
                            resetIndex++;
                            break;
                        }
                    }
                    k = i;
                }
                console.log(list[0])
                return list;
            },
            saveTime (time) {
                this.formValidate.startTime = time[0]
                this.formValidate.endTime = time[1]
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
            remove (data, type) {
                var _vm = this;
                var _data = {
                    id: '',
                    userId: '',
                }
                var _url = ''
                if(type == 'del') {
                    _data.id = data.id
                    _url = 'guard-webManager/treatDoctor/del.jhtml'
                } else {
                    _data.userId = data.userid
                    _url = 'guard-webManager/treatDoctor/delAll.jhtml'
                }
                _vm.$Modal.confirm({
                    title: '系统提示',
                    content: '确定删除'+ data.userName +'?',
                    onOk: () => {
                        _vm.$http.post({
                            url: _url,
                            data: _data,
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
                _vm.$refs['formValidate'].validate((valid) => {
                    console.log(132)
                    if (valid) {
                        var url = '';
                        if(_vm.key) {
                            url = 'guard-webManager/treatDoctor/update.jhtml'
                        } else {
                            url = 'guard-webManager/treatDoctor/add.jhtml'
                        }
                        _vm.$http.post({
                            url: url,
                            data: _vm.formValidate,
                            success: function(res){
                                if(res.status == 200 ){
                                    if(res.data.code == 0) {
                                        _vm.getList()
                                        _vm.$Notice.success({
                                            title: '系统提示！',
                                            desc: '保存成功！'
                                        });
                                    } else {
                                        _vm.$Notice.error({
                                            title: '系统提示！',
                                            desc: res.data.desc
                                        });
                                    }
                                    _vm.$refs['formValidate'].resetFields();
                                    _vm.modalEdit = false;
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

<style>
    .treatDoctor .treatDoctorTable {
        width: 100%;
        border-collapse:collapse;
        border-bottom: 1px solid #d7dde4;
        border-right: 1px solid #d7dde4;
    }
</style>

<style scoped>
    .treatDoctor .treatDoctorTable tr {
        border-top: 1px solid #d7dde4;
        border-left: 1px solid #d7dde4;
    }
    .treatDoctorTable td, 
    .treatDoctorTable th {
        height: 60px;
        padding: 0 18px;
        text-align: left;
    }
    .treatDoctor .treatDoctorTable tbody tr:nth-of-type(odd) {
        /*background: rgba(73,133,243,0.05);*/
    }
    .treatDoctorTable .indexCol {
        width: 80px;
    }
    .treatDoctorTable .childAct {
        width: 150px;
        text-align: center;
    }
    .treatDoctorTable .parentAct {
        width: 100px;
        text-align: center;
    }
    .hidden {
        display: none;
    }
</style>