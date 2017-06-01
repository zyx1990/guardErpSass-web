/**
 * 医院管理页面
 */

<template>
    <div class="container-box">
        <div class="container-header">
            <h2>医院管理</h2>
        </div>
        <div class="container-body">
            <Table stripe :columns="columns" :data="data"></Table>
            <Modal
                title="修改医院"
                v-model="modalEdit"
                :closable="false"
                @on-ok="ok"
                :loading="loading"
                class-name="vertical-center-modal">
                <Form ref="formValidate" :model="formValidate" :rules="ruleForm" :label-width="80" label-position="right">
                    <Form-item label="名称" prop="name" required>
                        <Input v-model="formValidate.name" placeholder="请输入名称"></Input>
                    </Form-item>
                    <Form-item label="全称" prop="fullName" required>
                        <Input v-model="formValidate.fullName" placeholder="请输入全称"></Input>
                    </Form-item>
                    <Form-item label="排序号" prop="sortNo" required>
                        <Input v-model="formValidate.sortNo" placeholder="请输入排序号"></Input>
                    </Form-item>
                    <Form-item label="城市" prop="cityId" required>
                        <Select v-model="provinceId" style="width:200px" @on-change='getCity'>
                            <Option v-for="item in provinceList" :value="item.id" :key="item">{{ item.name }}</Option>
                        </Select>
                        <Select v-model="formValidate.cityId" style="width:200px">
                            <Option v-for="item in cityList" :value="item.id" :key="item">{{ item.name }}</Option>
                        </Select>
                    </Form-item>
                    <Form-item label="地址" prop="address">
                        <Input v-model="formValidate.address" placeholder="请输入地址"></Input>
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
            const validatefullname = (rule, value, callback) => {
                if (value === '') {
                    callback(new Error('请输入全称'));
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
            const validateCity = (rule, value, callback) => {
                if (value === '') {
                    callback(new Error('选择城市'));
                } else {
                    callback();
                }
            };
            return {
                columns: [
                    {   
                        title: '名称',
                        key: 'name'
                    },
                    {
                        title: '全称',
                        key: 'fullname'
                    },
                    {
                        title: '排序号',
                        key: 'sortno'
                    },
                    {
                        title: '城市',
                        key: 'cityName'
                    },
                    {
                        title: '地址',
                        key: 'address'
                    },
                    {
                        title: '备注',
                        key: 'remark'
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
                                            type: 'primary',
                                            size: 'small',
                                            icon: 'edit'
                                        },
                                        on: {
                                            click: () => {
                                                this.edit(params.row)
                                            }
                                        }
                                    }, '编辑')
                                ])
                        }
                    }
                ],
                data: [],
                modalEdit: false,
                loading: true,
                formValidate: {
                    hospitalId: '',
                    name: '',
                    fullName: '',
                    sortNo: '',
                    cityId: '',
                    address: '',
                    remark: ''
                },
                ruleForm: {
                    name: [
                        { validator: validateName, trigger: 'blur' }
                    ],
                    fullName: [
                        { validator: validatefullname, trigger: 'blur' }
                    ],
                    sortNo: [
                        { validator: validateSort, trigger: 'blur' }
                    ],
                    cityId: [
                        { validator: validateCity, trigger: 'blur' }
                    ]
                },
                provinceList: [],
                provinceId: '',
                cityList: [],
            }
        },
        created () {
            this.getList()
        },
        mounted () {
            this.getProvince()
        },
        methods: {
            //获取列表
            getList () {
                var _vm = this;
                _vm.$http.get({
                    url: 'guard-webManager/hospital/list.jhtml',
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
            //获取省份
            getProvince () {
                var _vm = this;
                _vm.$http.get({
                    url: 'guard-webManager/select/provinceInfo.jhtml',
                    data: {name: null},
                    success: function(res){
                        if(res.status == 200 ){
                            _vm.provinceList = res.data.content
                        } else {
                            console.log(res.data.desc)
                        }
                    },
                    error: function(res){
                        console.log(res);
                    }
                });
            },
            //获取城市
            getCity (id) {
                var _vm = this;
                _vm.$http.get({
                    url: 'guard-webManager/select/cityList.jhtml',
                    data: {id: id},
                    success: function(res){
                        if(res.status == 200 ){
                            _vm.cityList = res.data.content
                        } else {
                            console.log(res.data.desc)
                        }
                    },
                    error: function(res){
                        console.log(res);
                    }
                });
            },
            //修改信息
            edit: function(data) {
                var _vm = this
                _vm.$refs['formValidate'].resetFields();
                _vm.formValidate.hospitalId = data.id
                _vm.formValidate.name = data.name
                _vm.formValidate.fullName = data.fullname
                _vm.formValidate.sortNo = data.sortno
                _vm.formValidate.cityId = data.cityid
                _vm.formValidate.address = data.address
                _vm.formValidate.remark = data.remark
                _vm.provinceId = data.provinceID
                _vm.modalEdit = true
            },
            //提交数据
            ok () {
                var _vm = this;
                _vm.$refs['formValidate'].validate((valid) => {
                    if (valid) {
                        _vm.$http.post({
                            url: 'guard-webManager/hospital/update.jhtml',
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
            }
        }
    }
</script>