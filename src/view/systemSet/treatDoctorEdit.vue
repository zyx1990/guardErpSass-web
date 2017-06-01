/**
 * 批量添加设置页面
 */

<template>
    <div class="container-box">
        <div class="container-header">
            <h2>批量添加设置</h2>
        </div>
        <div class="container-body">
            <Form :label-width="100" ref="formValidate" :model="formValidate" label-position="right" :rules="ruleForm">
                <Form-item label="医生" prop="userIds" required>
                    <Row>
                        <Col span="20">
                            <Table stripe :columns="col" :data="formValidate.userIds"></Table>
                        </Col>
                        <Col span="3" offset="1" class='table-left-btn'>
                            <Button type="primary" shape="circle" icon="plus-round" @click='add'>增加</Button>
                            <Button type="primary" shape="circle" icon="refresh" @click='clean'>清空</Button>
                        </Col>
                    </Row>
                </Form-item>
                <Form-item label="预约时间" required prop="startTime" style='width:400px;'>
                    <Time-picker :value='dateVal' format="HH:mm" type="timerange" placement="bottom-start" placeholder="选择时间" @on-change='saveTime'></Time-picker>
                </Form-item>
                <Form-item label="人数" prop="num" required style='width:400px;'>
                    <Input v-model="formValidate.num" placeholder="请输入人数"></Input>
                </Form-item>
            </Form>
            <div class="footer-btnGroup">
                <Button type="primary" shape="circle" icon="checkmark" @click='save'>保存</Button>
                <Button type="primary" shape="circle" icon="android-arrow-back" @click='back'>返回</Button>
            </div>
            <Modal
                title="选择标签"
                v-model="modalEdit"
                width='700'
                :closable="false"
                @on-ok="ok"
                :loading="loading"
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
                <Table height="350" stripe :columns="col1" :data="data" @on-selection-change='change'></Table>
            </Modal>
        </div>
    </div>
</template>

<script>
    export default {
        data () {
            const validateSort = (rule, value, callback) => {
                if (value === '') {
                    callback(new Error('请输入人数'));
                } else if (/^\+?[1-9][0-9]*$/.test(value)) {
                    callback();
                }  else  {
                    callback(new Error('请输入正整数'));
                }
            };
            const validateList = (rule, value, callback) => {
                if (value.length === 0) {
                    callback(new Error('请选择标签'));
                } else {
                    callback();
                }
            };
            return {
                col: [
                    {
                        title: '用户账号',
                        key: 'account'
                    },
                    {
                        title: '用户姓名',
                        key: 'name'
                    },
                    {
                        title: '操作',
                        key: 'action',
                        width: 100,
                        align: 'center',
                        render: (h, params) => {
                            return h('div', [
                                    h('Button', {
                                        props: {
                                            type: 'error',
                                            size: 'small',
                                            icon: 'ios-trash-outline'
                                        },
                                        on: {
                                            click: () => {
                                                this.remove(params.index)
                                            }
                                        }
                                    }, '删除'),
                                ])
                        }
                    }
                ],
                data: [],
                selectBox: [],
                col1: [
                    {
                        type: 'selection',
                        width: 60,
                        align: 'center'
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
                        title: '部门',
                        key: 'deptName'
                    },
                    {
                        title: '性别',
                        key: 'gender'
                    }
                ],
                deptList: [],
                formSearch: {
                    hospitalId: '1',
                    account: '',
                    name: '',
                    deptId: ''
                },
                modalEdit: false,
                loading: true,
                dateVal: [],
                formValidate: {
                    num: '',
                    endTime: '',
                    startTime: '',
                    userIds: []
                },
                ruleForm: {
                    num: [
                        { validator: validateSort, trigger: 'blur' }
                    ],
                    userIds: [
                        { validator: validateList, trigger: 'blur' }
                    ]
                },
            }
        },
        mounted () {
            this.getDept('1')
        },
        methods: {
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
            //获取项目列表
            getObj (form) {
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
            add () {
                this.modalEdit = true
            },
            clean () {
                this.formValidate.userIds.splice(0)
            },
            remove (index) {
                this.formValidate.userIds.splice(index, 1)
            },
            change (data) {
                this.selectBox = data
            },
            saveTime (time) {
                this.formValidate.startTime = time[0]
                this.formValidate.endTime = time[1]
            },
            ok () {
                var bool = true
                for(var n of this.selectBox) {
                    for(var m of this.formValidate.userIds) {
                        if(n.id == m.id) {
                            bool = false
                        }
                    }
                    if(bool) {
                        this.formValidate.userIds.push(n)
                    } else {
                        bool = true
                    }
                }
                this.modalEdit = false
            },
            save () {
                var _vm = this
                var idBox = []
                for(var id of _vm.formValidate.userIds) {
                    idBox.push(id.id)
                }
                _vm.$refs['formValidate'].validate((valid) => {
                    if(valid) {
                        _vm.$http.ajax({
                            url: '/guard-webManager/treatDoctor/batchAdd.jhtml',
                            data: {
                                userIds: idBox,
                                startTime: _vm.formValidate.startTime,
                                endTime: _vm.formValidate.endTime,
                                num: _vm.formValidate.num
                            },
                            success: function(res){
                                if(res.code == 0 ){
                                    var breadData = [
                                        {
                                            url: '/desktop',
                                            text: '桌面'
                                        },
                                        {
                                            url: '/treatDoctor',
                                            text: '医生预约设置'
                                        }
                                    ];
                                    _vm.$store.dispatch('setBreadData', breadData);
                                    _vm.$router.push('/treatDoctor')
                                } else {
                                    console.log(res.desc)
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
                        url: '/treatDoctor',
                        text: '医生预约设置'
                    }
                ];
                this.$store.dispatch('setBreadData', breadData);
                this.$router.back(-1)
            }
        }
    }
</script>
