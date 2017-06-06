/**
 * 修改咨询页面
 */

<template>
    <div class="container-box userPower">
        <div v-if='powerLoad > 0'>
            <div class="container-header">
                <h2>修改咨询</h2>
            </div>
            <div class="container-body">
                <Form ref="formValidate" :model="formValidate" :rules="ruleForm" :label-width="100" label-position="right">
                    <Form-item label="提交时间">
                        <span>{{createtime}}</span>
                    </Form-item>
                    <Form-item label="提交用户">
                        <span>【{{hospitalName}}】</span>
                        <span>【{{createUserDeptName}}】</span>
                        <span>【{{createUserName}}】</span>
                    </Form-item>
                    <Form-item label="方式" prop="tool" required>
                        <Select v-model="formValidate.tool" style="width:300px">
                            <Option v-for="item in toolList" :value="item.code" :key="item">{{ item.name }}</Option>
                        </Select>
                    </Form-item>
                    <Form-item label="咨询项目" prop="objName" required>
                        <Select v-model="objName" style="width:300px" @on-change='changeObj' :clearable='true' ref='select' placeholder='请选择，可多选，排序分先后'>
                            <Option v-for="(item, index) in objList" :value="index" :key="item" >{{ item.name }}</Option>
                        </Select>
                        <div class="tagbox">
                            <Tag closable color="blue" type="border" v-for='(item, index) in tagBox' :key='item' :name='index' @on-close="tagClose">{{item.name}}</Tag>
                        </div>
                    </Form-item>
                    <Form-item label="咨询内容" prop="content" required>
                        <Input v-model="formValidate.content" type="textarea" :autosize="{minRows: 2,maxRows: 7}" placeholder="请输入咨询内容"></Input>
                    </Form-item>
                </Form>
                <div class="footer-btnGroup">
                    <Button type="primary" shape="circle" icon="checkmark" @click='save'>保存</Button>
                    <Button type="primary" shape="circle" icon="android-arrow-back" @click='back'>返回</Button>
                </div>
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
            const validateTool = (rule, value, callback) => {
                if (value === '') {
                    callback(new Error('请选择方式'));
                } else {
                    callback();
                }
            };
            const validateObj = (rule, value, callback) => {
                if (value === '') {
                    callback(new Error('请选择咨询项目'));
                } else {
                    callback();
                }
            };
            const validateCon = (rule, value, callback) => {
                if (value === '') {
                    callback(new Error('请填写咨询内容'));
                } else {
                    callback();
                }
            };
            return {
                powerLoad: '-1',
                errorMsg: '',
                createtime: '',
                hospitalName: '',
                createUserDeptName: '',
                createUserName: '',
                customerName: '',
                objName: '',
                formValidate: {
                    id: '',
                    customerId: '',
                    tool: '',
                    content: '',
                    symptomId: '',
                    symptom2Id: '',
                    symptom3Id: '',
                    symptom4Id: '',
                    symptom5Id: '',
                },
                toolList: [],
                objList: [],
                tagBox: [],
                idBox: [],
                ruleForm: {
                    tool: [
                        { validator: validateTool, trigger: 'change' }
                    ],
                    symptomId: [
                        { validator: validateObj, trigger: 'change' }
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
                this.formValidate.customerId= lg.cusId
                this.customerName = lg.cusName
            }
            this.formValidate.id = this.$route.query.id
            this.getTool()
            this.getObj()
            this.getId(lg.cusId)
        },
        methods: {
            // 判断权限
            getId (id) {
                var _vm = this;
                _vm.$http.get({
                    url: 'guard-webManager/customerRecord/consultUpdate.jhtml',
                    data: {id: _vm.$route.query.id},
                    success: function(res){
                        if(res.status == 200 ){
                            console.log(res)
                            if(res.data.code == 0) {
                                _vm.powerLoad = 1
                                _vm.createtime = res.data.content.createtime
                                _vm.createUserDeptName = res.data.content.createUserDeptName
                                _vm.createUserName = res.data.content.createUserName
                                _vm.hospitalName = res.data.content.hospitalName
                                _vm.formValidate.tool = res.data.content.tool
                                _vm.formValidate.content = res.data.content.content
                                if(typeof res.data.content.symptomid == 'number') {
                                    _vm.formValidate.symptomId = res.data.content.symptomid
                                    _vm.idBox.push(res.data.content.symptomid)
                                    for(let item of _vm.objList) {
                                        if(item.id == res.data.content.symptomid) {
                                            _vm.tagBox.push(item)
                                        }
                                    }
                                }
                                if(typeof res.data.content.symptom2id == 'number') {
                                    _vm.formValidate.symptom2Id = res.data.content.symptom2id
                                    _vm.idBox.push(res.data.content.symptom2id)
                                    for(let item of _vm.objList) {
                                        if(item.id == res.data.content.symptom2id) {
                                            _vm.tagBox.push(item)
                                        }
                                    }
                                }
                                if(typeof res.data.content.symptom3id == 'number') {
                                    _vm.formValidate.symptom3Id = res.data.content.symptom3id
                                    _vm.idBox.push(res.data.content.symptom3id)
                                    for(let item of _vm.objList) {
                                        if(item.id == res.data.content.symptom3id) {
                                            _vm.tagBox.push(item)
                                        }
                                    }
                                }
                                if(typeof res.data.content.symptom4id == 'number') {
                                    _vm.formValidate.symptom4Id = res.data.content.symptom4id
                                    _vm.idBox.push(res.data.content.symptom4id)
                                    for(let item of _vm.objList) {
                                        if(item.id == res.data.content.symptom4id) {
                                            _vm.tagBox.push(item)
                                        }
                                    }
                                }
                                if(typeof res.data.content.symptom5id == 'number') {
                                    _vm.formValidate.symptom5Id = res.data.content.symptom5id
                                    _vm.idBox.push(res.data.content.symptom5id)
                                    for(let item of _vm.objList) {
                                        if(item.id == res.data.content.symptom5id) {
                                            _vm.tagBox.push(item)
                                        }
                                    }
                                }
                            } else {
                                _vm.powerLoad = 0
                                _vm.errorMsg = res.data.desc
                            }
                            console.log(res)
                        } else {
                            console.log(res.data.desc)
                        }
                    },
                    error: function(res){
                        console.log(res);
                    }
                });
            },
            //获取方式列表
            getTool () {
                var _vm = this;
                _vm.$http.get({
                    url: 'guard-webManager/select/toolInfo.jhtml',
                    success: function(res){
                        if(res.status == 200 ){
                            _vm.toolList = res.data.content
                        } else {
                            console.log(res.data.desc)
                        }
                    },
                    error: function(res){
                        console.log(res);
                    }
                });
            },
            //获取所有咨询项目选择列表
            getObj () {
                var _vm = this;
                _vm.$http.get({
                    url: 'guard-webManager/select/symptomInfo.jhtml',
                    success: function(res){
                        if(res.status == 200 ){
                            _vm.objList = res.data.content
                        } else {
                            console.log(res.data.desc)
                        }
                    },
                    error: function(res){
                        console.log(res);
                    }
                });
            },
            changeObj (aa) {
                var _vm = this;
                var bool = true
                if(typeof aa != 'string' && _vm.idBox.length < 5) {
                    for(let id of _vm.idBox) {
                        if(_vm.objList[aa].id == id) {
                            bool = false
                        }
                    }
                    if(bool) {
                        _vm.idBox.push(_vm.objList[aa].id)
                        _vm.tagBox.push(_vm.objList[aa])
                        _vm.setId()
                    }
                }
            },
            tagClose (event, name) {
                this.idBox.splice(name, 1)
                this.tagBox.splice(name, 1)
                this.$refs['select'].clearSingleSelect()
                this.setId()
            },
            setId () {
                var _vm = this;
                _vm.formValidate.symptomId = typeof _vm.idBox[0] == 'number' ? _vm.idBox[0] : null
                _vm.formValidate.symptom2Id = typeof _vm.idBox[1] == 'number' ? _vm.idBox[1] : null
                _vm.formValidate.symptom3Id = typeof _vm.idBox[2] == 'number' ? _vm.idBox[2] : null
                _vm.formValidate.symptom4Id = typeof _vm.idBox[3] == 'number' ? _vm.idBox[3] : null
                _vm.formValidate.symptom5Id = typeof _vm.idBox[4] == 'number' ? _vm.idBox[4] : null
            },
            save () {
                var _vm = this
                _vm.$refs['formValidate'].validate((valid) => {
                    if(valid) { 
                        _vm.$http.post({
                            url: 'guard-webManager/customerRecord/updateConsult.jhtml',
                            data: _vm.formValidate,
                            success: function(res){
                                if(res.status == 200 ){
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
                                            url: '/indexConsult',
                                            text: _vm.customerName
                                        }
                                    ];
                                    _vm.$store.dispatch('setBreadData', breadData);
                                    _vm.$router.push('/indexConsult')
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
                        url: '/customerIndex',
                        text: this.customerName
                    }
                ];
                this.$store.dispatch('setBreadData', breadData);
                this.$router.back(-1)
            }
        }
    }
</script>

