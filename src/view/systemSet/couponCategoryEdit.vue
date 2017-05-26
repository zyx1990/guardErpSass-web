/**
 * 添加/修改券类型页面
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
                <Form-item label="使用时间限制" prop="timeLimit" class='radioModal'>
                    <Radio-group v-model="formValidate.timeLimit">
                        <Radio label="1">无限制</Radio>
                        <Radio label="2">指定日期之前</Radio>
                        <Date-picker :value='dateVal' type="date" placement="bottom-start" placeholder="选择日期" style="width: 300px" :options='options' @on-change='saveDate'></Date-picker>
                        <Radio label="3">生效之后N天</Radio>
                        <Input v-model="formValidate.days" placeholder="请输入天数"></Input>
                    </Radio-group>
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
                    hospitalIds: [],
                    status: '',
                    scopeLimit: '1',
                    chargeCategoryIds: [],
                    chargeIds: [],
                    timeLimit: '1',
                    endDate: '',
                    days: '',
                    remark: ''
                },
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
                dateVal: '',
                options: {
                    disabledDate (date) {
                        return date && date.valueOf() < Date.now() - 86400000;
                    }
                },
                ruleForm: {
                    name: [
                        { validator: validateName, trigger: 'blur' }
                    ],
                    hospitalIds: [
                        { validator: validateHosp, trigger: 'blur' }
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
        },
        methods: {
            getId () {
                var _vm = this;
                _vm.$http.get({
                    url: 'guard-webManager/couponCategory/get.jhtml',
                    data: {id: _vm.$route.query.id},
                    success: function(res){
                        if(res.status == 200 ){
                            console.log(res.data.content)
                            _vm.formValidate.id = res.data.content.id
                            _vm.formValidate.name = res.data.content.name
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
                            _vm.formValidate.timeLimit = res.data.content.timelimit
                            if(typeof res.data.content.enddate == 'string') {
                                _vm.formValidate.endDate = res.data.content.enddate.split(" ")[0] 
                                _vm.dateVal = res.data.content.enddate.split(" ")[0] 
                            } else {
                                _vm.formValidate.endDate = ''
                            }
                            _vm.formValidate.days = res.data.content.days
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
            //日期获取
            saveDate (date) {
                this.formValidate.endDate = date
            },
            save () {
                var _vm = this
                var url = ''
                _vm.$refs['formValidate'].validate((valid) => {
                    if(valid) {
                        if(_vm.key) {
                            url = 'guard-webManager/couponCategory/update.jhtml'
                        } else {
                            url = 'guard-webManager/couponCategory/add.jhtml'
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
                                            url: '/couponCategory',
                                            text: '代金券类型'
                                        }
                                    ];
                                    _vm.$store.dispatch('setBreadData', breadData);
                                    _vm.$router.push('/couponCategory')
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
                        url: '/couponCategory',
                        text: '代金券类型'
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

