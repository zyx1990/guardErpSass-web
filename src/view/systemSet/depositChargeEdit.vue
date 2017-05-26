/**
 * 添加/修改预收款项目页面
 */

<template>
    <div class="container-box depositChargeEdit">
        <div class="container-header">
            <h2>{{titMsg}}</h2>
        </div>
        <div class="container-body">
            <Form :label-width="100" ref="formValidate" :rules="ruleForm" :model="formValidate" label-position="right">
                <Form-item label="名称" prop="name" required style="width:400px">
                    <Input v-model="formValidate.name" placeholder="请输入名称"></Input>
                </Form-item>
                <Form-item label="价格" prop="price" required style="width:400px">
                    <Input v-model="formValidate.price" placeholder="请输入价格"></Input>
                </Form-item>
                <Form-item label="可使用医院" prop="hospitalIds" required>
                    <Select v-model="hospBox" style="width:300px" @on-change='hospTags' :clearable='true' ref='select' placeholder='请选择，可多选'>
                        <Option v-for="item in hospList" :value="item.id" :key="item">{{ item.name }}</Option>
                    </Select>
                    <div class="tagbox">
                        <Tag closable color="blue" type="border" v-for='(item, index) in tagBox' :key='item' :name='index' @on-close="tagClose">{{item.name}}</Tag>
                    </div>
                </Form-item>
                <Form-item label="状态" prop="status" v-if='key'>
                    <Radio-group v-model="formValidate.status">
                        <Radio label="1">启用</Radio>
                        <Radio label="0">禁用</Radio>
                    </Radio-group>
                </Form-item>
                <Form-item label="使用范围限制" prop="scopeLimit" class='radioModal'>
                    <Radio-group v-model="formValidate.scopeLimit">
                        <Radio label="1">无限制</Radio>
                        <Radio label="2">指定项目分类</Radio>
                        <div>
                            <Button type="primary" shape="circle" icon="plus-round" @click='addObjList'>增加</Button>
                        </div>
                        <div class="tagBox">
                            <Tag closable color="blue" type="border" v-for='(item, index) in objListTagBox' :key='item' :name='index' @on-close="objListClose">{{item.name}}</Tag>
                        </div>
                        <Radio label="3">指定项目</Radio>
                        <div>
                            <Button type="primary" shape="circle" icon="plus-round" @click='addObj'>增加</Button>
                        </div>
                        <div class="tagBox">
                            <Tag closable color="blue" type="border" v-for='(item, index) in objTagBox' :key='item' :name='index' @on-close="objClose">{{item.name}}</Tag>
                        </div>
                    </Radio-group>
                </Form-item>
                <Form-item label="赠送代金券" prop="hasCoupon">
                    <Checkbox v-model="single" @on-change='singleC'>开启</Checkbox>
                </Form-item>
                <Form-item label="券类型" prop="couponCategoryId">
                    <Input v-model="couponName" readonly icon="ios-search" placeholder="请选择券类型" style='width:300px;' @on-focus='add'></Input>
                </Form-item>
                <Form-item label="券金额" prop="couponAmount" style="width:400px">
                    <Input v-model="formValidate.couponAmount" placeholder="请输入券金额"></Input>
                </Form-item>
                <Form-item label="描述" prop="remark">
                    <Input v-model="formValidate.remark" type="textarea" :autosize="{minRows: 2,maxRows: 5}" placeholder="请输入描述"></Input>
                </Form-item>
            </Form>
            <div class="footer-btnGroup">
                <Button type="primary" shape="circle" icon="checkmark" @click='save'>保存</Button>
                <Button type="primary" shape="circle" icon="android-arrow-back" @click='back'>返回</Button>
            </div>
            <Modal
                title="选择项目类型"
                width='700'
                v-model="modal1"
                :closable="false"
                class-name="vertical-center-modal">
                <Table height="350" stripe :columns="col1" :data="objListData" @on-row-click='chooseObjList'></Table>
            </Modal>
            <Modal
                title="选择收费项目"
                width='700'
                v-model="modal2"
                :closable="false"
                class-name="vertical-center-modal">
                <Form  :label-width="50" inline ref='formSearch' :model='formSearch'>
                    <Form-item label="名称" prop='name'>
                        <Input v-model="formSearch.name" placeholder="请输入名称"></Input>
                    </Form-item>
                    <Form-item label="拼音码" prop='pinyin'>
                        <Input v-model="formSearch.pinyin" placeholder="请输入拼音码"></Input>
                    </Form-item>
                    <ul class="header-btn-group not-float">
                        <li class="header-item" @click="getObj(formSearch)"><Icon type="search"></Icon>查询</li>
                        <li class="header-item" @click="handleReset('formSearch')"><Icon type="refresh"></Icon>重置</li>
                    </ul>
                </Form>
                <Table height="350" stripe :columns="col2" :data="objData" @on-row-click='chooseObj'></Table>
            </Modal>
            <Modal
                title="选择券类型"
                width='700'
                v-model="modal3"
                :closable="false"
                class-name="vertical-center-modal">
                <Table height="350" stripe :columns="col3" :data="couData" @on-row-click='chooseCou'></Table>
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
            const validatePrice = (rule, value, callback) => {
                if (value === '') {
                    callback(new Error('请输入价格'));
                } else if (/^\+?[1-9][0-9]*$/.test(value)) {
                    callback();
                }  else  {
                    callback(new Error('请输入正整数'));
                }
            };
            const validateHosp = (rule, value, callback) => {
                if (value.length == 0) {
                    callback(new Error('请选择医院'));
                } else {
                    callback();
                }
            };
            return {
                key: true,
                titMsg: '',
                formValidate: {
                    id: '',
                    name: '',
                    price: '',
                    hospitalIds: [],
                    status: '',
                    scopeLimit: '1',
                    chargeCategoryIds: [],
                    chargeIds: [],
                    hasCoupon: '0',
                    couponCategoryId: '',
                    couponAmount: '',
                    remark: ''
                },
                single: false,
                hospBox: '',
                hospList: [],
                tagBox: [],
                modal1: false,
                col1: [
                    {
                        title: '名称',
                        key: 'name',
                        render: (h, params) => {
                            const level = params.row.level * 20 + 'px'
                            return h('span', {
                                style: {
                                    paddingLeft: level
                                }
                            }, params.row.name)
                        }
                    }
                ],
                objListData: [],
                objListTagBox: [],
                modal2: false,
                formSearch: {
                    name: '',
                    pinyin: '',
                    categoryId: ''
                },
                col2: [
                    {
                        title: '编号',
                        key: 'id'
                    },
                    {
                        title: '名称',
                        key: 'name'
                    },
                    {
                        title: '规格',
                        key: 'unitName'
                    },
                    {
                        title: '拼音码',
                        key: 'pinYin'
                    },
                    {
                        title: '类型',
                        key: 'categoryName'
                    }
                ],
                objData: [],
                objTagBox: [],
                modal3: false,
                couponName: '',
                col3: [
                    {
                        title: '编号',
                        width: '60',
                        key: 'id'
                    },
                    {
                        title: '名称',
                        key: 'name'
                    },
                    {
                        title: '可使用医院',
                        key: 'hospitalList',
                        render: (h, params) => {
                            return h('div', params.row.hospitalList.map(item => {
                                return h('span', item.name + '、')
                            }))
                        }
                    },
                    {
                        title: '备注',
                        key: 'remark'
                    }
                ],
                couData: [],
                ruleForm: {
                    name: [
                        { validator: validateName, trigger: 'blur' }
                    ],
                    price: [
                        { validator: validatePrice, trigger: 'blur' }
                    ],
                    hospitalIds: [
                        { validator: validateHosp, type: 'number', trigger: 'blur' }
                    ]
                }
            }
        },
        created () {
            if(this.$route.query.id != 'add') {
                this.titMsg = '修改预收款项目'
                this.getId()
            } else {
                this.titMsg = '添加预收款项目'
                this.key = false
            }
        },
        mounted () {
            this.getHops()
            this.getObjList()
            // this.getObj(this.formSearch)
            this.getCon()
        },
        methods: {
            getId () {
                var _vm = this;
                _vm.$http.get({
                    url: 'guard-webManager/depositCharge/get.jhtml',
                    data: {id: _vm.$route.query.id},
                    success: function(res){
                        if(res.status == 200 ){
                            _vm.formValidate.id = res.data.content.id
                            _vm.formValidate.name = res.data.content.name
                            _vm.formValidate.price = res.data.content.price
                            if(typeof res.data.content.hospitalids == 'string') {
                                _vm.formValidate.hospitalIds = res.data.content.hospitalids.split(",")
                            }
                            _vm.tagBox = res.data.content.hospitalList
                            _vm.formValidate.status = res.data.content.status
                            _vm.formValidate.scopeLimit = res.data.content.scopelimit
                            if(typeof res.data.content.chargecategoryids == 'string') {
                                _vm.formValidate.chargeCategoryIds = res.data.content.chargecategoryids.split(",")
                                _vm.objListTagBox = res.data.content.chargeCategoryList
                            } else {
                                _vm.formValidate.chargeCategoryIds = []
                                _vm.objListTagBox = []
                            }
                            if(typeof res.data.content.chargeids == 'string') {
                                _vm.formValidate.chargeIds = res.data.content.chargeids.split(",")
                                _vm.objTagBox = res.data.content.chargeList
                            } else {
                                _vm.formValidate.chargeIds = []
                                _vm.objTagBox = []
                            }
                            if(res.data.content.hascoupon == 1 ) {
                                _vm.single = true
                            } else {
                                _vm.single = false
                            }
                            _vm.formValidate.couponCategoryId = res.data.content.couponcategoryid
                            _vm.couponName = res.data.content.couponCategoryName
                            _vm.formValidate.couponAmount = res.data.content.couponamount
                            _vm.formValidate.remark = res.data.content.remark
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
            //医院多选标签
            hospTags (id) {
                var _vm = this;
                var bool = 0
                for(var index of _vm.formValidate.hospitalIds) {
                    if(id == index) {
                        bool = 1
                    }
                }
                if(bool == 0 && typeof id != 'string') {
                    for(let i in _vm.hospList) {
                        if(_vm.hospList[i].id == id) {
                            _vm.tagBox.push(_vm.hospList[i])
                        }
                    }
                    _vm.formValidate.hospitalIds.push(id)
                }
            },
            // 删除医院标签
            tagClose (event, name) {
                this.tagBox.splice(name, 1)
                this.formValidate.hospitalIds.splice(name, 1)
                this.$refs['select'].clearSingleSelect()
            },
            //获取项目分类列表
            getObjList () {
                var _vm = this;
                _vm.$http.get({
                    url: 'guard-webManager/select/chargeCategoryList.jhtml',
                    success: function(res){
                        if(res.status == 200 ){
                            _vm.objListData = res.data.content
                        } else {
                            console.log(res.data.desc)
                        }
                    },
                    error: function(res){
                        console.log(res);
                    }
                });
            },
            addObjList () {
                this.modal1 = true
            },
            chooseObjList (data) {
                var _vm = this;
                var bool = true;
                for(let id of _vm.formValidate.chargeCategoryIds) {
                    if (id == data.id) {
                        bool = false
                    }
                }
                console.log(_vm.objListTagBox)
                if(bool) {
                    _vm.objListTagBox.push(data)
                    _vm.formValidate.chargeCategoryIds.push(data.id)
                }
                _vm.modal1 = false
            },
            objListClose (event, name) {
                var _vm = this;
                _vm.formValidate.chargeCategoryIds.splice(name, 1)
                _vm.objListTagBox.splice(name, 1)
            },
            //获取项目列表
            getObj (form) {
                var _vm = this;
                _vm.$http.get({
                    url: 'guard-webManager/select/chargeList.jhtml',
                    data: form,
                    success: function(res){
                        if(res.status == 200 ){
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
            addObj () {
                this.modal2 = true
            },
            chooseObj (data) {
                var _vm = this;
                var bool = true;
                for(let id of _vm.formValidate.chargeIds) {
                    if (id == data.id) {
                        bool = false
                    }
                }
                if(bool) {
                    _vm.objTagBox.push(data)
                    _vm.formValidate.chargeIds.push(data.id)
                }
                _vm.modal2 = false
            },
            objClose (event, name) {
                var _vm = this;
                _vm.formValidate.chargeIds.splice(name, 1)
                _vm.objTagBox.splice(name, 1)
            },
            handleReset (name) {
                this.$refs[name].resetFields();
            },
            //获取券类型列表
            getCon () {
                var _vm = this;
                _vm.$http.get({
                    url: 'guard-webManager/select/couponCategoryList.jhtml',
                    success: function(res){
                        if(res.status == 200 ){
                            _vm.couData = res.data.content
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
                this.modal3 = true
            },
            chooseCou (data) {
                this.couponName = data.name;
                this.formValidate.couponCategoryId = data.id
                this.modal3 = false
            },
            singleC (bool) {
                if(bool) {
                    this.formValidate.hasCoupon = '1'
                } else {
                    this.formValidate.hasCoupon = '0'
                }
            },
            save () {
                var _vm = this
                var url = ''
                _vm.$refs['formValidate'].validate((valid) => {
                    if(valid) {
                        if(_vm.key) {
                            url = 'guard-webManager/depositCharge/update.jhtml'
                        } else {
                            url = 'guard-webManager/depositCharge/add.jhtml'
                        }
                        _vm.formValidate.hospitalIds = _vm.formValidate.hospitalIds.join(',')
                        _vm.formValidate.chargeCategoryIds = _vm.formValidate.chargeCategoryIds.join(',')
                        _vm.formValidate.chargeIds = _vm.formValidate.chargeIds.join(',')
                        _vm.$http.post({
                            url: url,
                            data: _vm.formValidate,
                            success: function(res){
                                if(res.status == 200 ){
                                    var breadData = [
                                        {
                                            url: '/desktop',
                                            text: '桌面'
                                        },
                                        {
                                            url: '/depositCharge',
                                            text: '预收款项目'
                                        }
                                    ];
                                    _vm.$store.dispatch('setBreadData', breadData);
                                    _vm.$router.push('/depositCharge')
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
                        url: '/depositCharge',
                        text: '预收款项目'
                    }
                ];
                this.$store.dispatch('setBreadData', breadData);
                this.$router.back(-1)
            }
                
        }
    }
</script>

<style>
    .depositChargeEdit .radioModal .ivu-radio-wrapper {
        display: block;
    }
</style>
