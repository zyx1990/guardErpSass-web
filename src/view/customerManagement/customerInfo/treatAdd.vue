/**
 * 添加治疗预约信息页面
 */

<template>
    <div class="container-box userPower">
        <div v-if='powerLoad > 0'>
            <div class="container-header">
                <h2>治疗预约信息</h2>
            </div>
            <div class="container-body">
                <Form ref="formValidate" :model="formValidate" :rules="ruleForm" :label-width="100" label-position="right">
                    <Form-item label="选择医院" prop="hospitalId" required>
                        <Select v-model="formValidate.hospitalId" style="width:300px" :disabled='!key' @on-change='changeHosp'>
                            <Option v-for="item in hospList" :value="item.id" :key="item">{{ item.name }}</Option>
                        </Select>
                    </Form-item>
                    <Form-item label="预约日期" required prop="appointmentDate">
                        <Date-picker type="date" placement="bottom-start" placeholder="选择日期" style="width: 300px" :options='options' @on-change='saveDate'></Date-picker>
                    </Form-item>
                    <Form-item label="预约时间" required prop="startTime">
                         <Time-picker format="HH:mm" type="timerange" placement="bottom-start" placeholder="选择时间" style="width: 300px" @on-change='saveTime'></Time-picker>
                    </Form-item>
                    <Form-item label="预约医生" prop="userId">
                        <Select v-model="formValidate.userId" style="width:300px">
                            <Option v-for="item in nameList" :value="item.id" :key="item" :label='item.name'>
                                <span>{{item.name}}</span>
                                <span style="float:right;color:#ccc">{{item.deptName}}</span>
                            </Option>
                        </Select>
                    </Form-item>
                    <Form-item label="预约项目" prop="chargeId" required class='treatAddObj'>
                        <Input v-model="objName" placeholder="请选择预约项目" style='float:left;width:300px;margin-right:10px;'></Input>
                        <Button type="primary" shape="circle" icon="ios-search-strong" @click='showBuy'>选择已购项目</Button>
                        <Button type="primary" shape="circle" icon="ios-search-strong" @click='showAll'>选择所有项目</Button>
                    </Form-item>
                    <Form-item label="备注" prop="remark">
                        <Input v-model="formValidate.remark" type="textarea" :autosize="{minRows: 2,maxRows: 7}" placeholder="请输入备注"></Input>
                    </Form-item>
                </Form>
                <div class="footer-btnGroup">
                    <Button type="primary" shape="circle" icon="checkmark" @click='save'>保存</Button>
                    <Button type="primary" shape="circle" icon="android-arrow-back" @click='back'>返回</Button>
                </div>
                <Modal
                    title="选择已购项目"
                    width='700'
                    v-model="modalbuy"
                    :closable="false"
                    class-name="vertical-center-modal">
                    <Table height="350" stripe :columns="colBuy" :data="dataBuy" @on-row-click='chooseBuy'></Table>
                </Modal>
                <Modal
                    title="选择收费项目"
                    width='700'
                    v-model="modalall"
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
                    <Table height="350" stripe :columns="colAll" :data="dataAll" @on-row-click='chooseAll'></Table>
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
            const validateHosp = (rule, value, callback) => {
                if (value === '') {
                    callback(new Error('请选择医院'));
                } else {
                    callback();
                }
            };
            const validateDay = (rule, value, callback) => {
                if (value === '') {
                    callback(new Error('请选择预约日期'));
                } else {
                    callback();
                }
            };
            const validateTime = (rule, value, callback) => {
                if (value === '') {
                    callback(new Error('请选择预约时间'));
                } else {
                    callback();
                }
            };
            const validateObj = (rule, value, callback) => {
                if (value === '') {
                    callback(new Error('请选择预约项目'));
                } else {
                    callback();
                }
            };
            return {
                cusName: '',
                powerLoad: '-1',
                errorMsg: '',
                key: true,


                formValidate: {
                    customerId: '',
                    hospitalId: '',
                    appointmentDate: '',
                    startTime: '',
                    endTime: '',
                    remark: '',
                    userId: '',
                    chargeId: '',
                },
                formSearch: {
                    name: '',
                    pinyin: '',
                    categoryId: ''
                },
                objName: '',
                nameList: [],
                hospList: [],
                options: {
                    disabledDate (date) {
                        return date && date.valueOf() < Date.now() - 86400000;
                    }
                },
                modalbuy: false,
                colBuy: [
                    {
                        title: '订购日期',
                        key: 'orderPaidTime',
                        render: (h, params) => {
                            const _time = params.row.orderPaidTime.split(' ')[0]
                            return h('span', _time)
                        }
                    },
                    {
                        title: '项目名称',
                        key: 'chargeName'
                    },
                    {
                        title: '分类',
                        key: 'chargeCategoryName'
                    },
                    {
                        title: '数量',
                        key: 'num'
                    },
                    {
                        title: '下单用户',
                        key: 'orderCreateUserName'
                    },
                    {
                        title: '指定医生',
                        key: 'doctorUserName'
                    }
                ],
                dataBuy: [],
                modalall: false,
                colAll: [
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
                        key: 'size'
                    },
                    {
                        title: '拼音码',
                        key: 'pinYin'
                    },
                    {
                        title: '类型',
                        key: 'categoryName'
                    },
                    {
                        title: '价格',
                        key: 'price'
                    },
                    {
                        title: '操作部门',
                        key: 'deptName'
                    }
                ],
                dataAll: [],
                ruleForm: {
                    hospitalId: [
                        { validator: validateHosp, trigger: 'change' }
                    ],
                    appointmentDate: [
                        { validator: validateDay, trigger: 'change' }
                    ],
                    startTime: [
                        { validator: validateTime, trigger: 'change' }
                    ],
                    categoryId: [
                        { validator: validateObj, trigger: 'blur' }
                    ],
                }
            }
        },
        created () {
            if (window.sessionStorage) {
                var lg = window.sessionStorage;
                this.formValidate.customerId = lg.cusId
                this.cusName = lg.cusName
            }
            this.getId(this.formValidate.customerId)
        },
        methods: {
            // 获取资料
            getId (id) {
                var _vm = this;
                _vm.$http.get({
                    url: 'guard-webManager/customerRecord/treatAdd.jhtml',
                    data: {customerId: id},
                    success: function(res){
                        if(res.status == 200 ){
                            if(res.data.code == 0) {
                                _vm.powerLoad = 1
                                _vm.hospList = res.data.content.Hospital
                                _vm.dataBuy = res.data.content.DetailList
                                if(res.data.content.IsGroupHospital) {

                                } else {
                                    _vm.formValidate.hospitalId = res.data.content.LoginHospitalId
                                    _vm.key = false
                                    _vm.getList(res.data.content.LoginHospitalId)
                                }
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
            //获取人员列表
            getList (id) {
                var _vm = this;
                _vm.$http.get({
                    url: 'guard-webManager/customerRecord/treatmentUserList.jhtml',
                    data: {hospitalId: id},
                    success: function(res){
                        if(res.status == 200 ){
                            _vm.nameList = res.data.content   
                        } else {
                            console.log(res.data.desc)
                        }
                    },
                    error: function(res){
                        console.log(res);
                    }
                });
            },
            //获取所有项目
            getObj (form) {
                var _vm = this;
                _vm.$http.get({
                    url: 'guard-webManager/select/chargeList.jhtml',
                    data: form,
                    success: function(res){
                        if(res.status == 200 ){
                            _vm.dataAll = res.data.content
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
            changeHosp (id) {
                this.getList(id)
            },
            saveDate (date) {
                this.formValidate.appointmentDate = date
            },
            saveTime (time) {
                this.formValidate.startTime = time[0]
                this.formValidate.endTime = time[1]
            },
            showBuy () {
                this.modalbuy = true
            },
            showAll () {
                this.modalall = true
            },
            chooseBuy (data) {
                this.formValidate.chargeId = data.chargeid
                this.objName = data.chargeName
                this.modalbuy = false
            },
            chooseAll (data) {
                this.formValidate.chargeId = data.id
                this.objName = data.name
                this.modalall = false
            },
            handleReset (name) {
                this.$refs[name].resetFields();
            },
            save () {
                var _vm = this
                _vm.$refs['formValidate'].validate((valid) => {
                    if(valid) { 
                        _vm.$http.post({
                            url: 'guard-webManager/customerRecord/addTreat.jhtml',
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
                                                url: '/indexAppointment',
                                                text: _vm.cusName
                                            }
                                        ];
                                        _vm.$store.dispatch('setBreadData', breadData);
                                        _vm.$router.push('/indexAppointment')
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
                        url: '/indexAppointment',
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
   .treatAddObj button {
        margin: 0 10px;
   } 
</style>

