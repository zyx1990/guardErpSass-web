/**
 * 添加咨询预约页面
 */

<template>
    <div class="container-box userPower">
        <div v-if='powerLoad > 0'>
            <div class="container-header">
                <h2>添加咨询预约</h2>
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
                    <Form-item label="预约咨询人员" prop="userId">
                        <Select v-model="formValidate.userId" style="width:300px">
                            <Option v-for="item in nameList" :value="item.userid" :key="item" :label='item.userName'>
                                <span>{{item.userName}}</span>
                                <span style="float:right;color:#ccc">{{item.deptName}}</span>
                            </Option>
                        </Select>
                    </Form-item>
                    <Form-item label="备注" prop="content">
                        <Input v-model="formValidate.content" type="textarea" :autosize="{minRows: 2,maxRows: 7}" placeholder="请输入备注"></Input>
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
                    content: '',
                    userId: '',
                },
                nameList: [],
                hospList: [],
                options: {
                    disabledDate (date) {
                        return date && date.valueOf() < Date.now() - 86400000;
                    }
                },
                ruleForm: {
                    hospitalId: [
                        { validator: validateHosp, trigger: 'change' }
                    ],
                    appointmentDate: [
                        { validator: validateDay, trigger: 'change' }
                    ],
                    startTime: [
                        { validator: validateTime, trigger: 'change' }
                    ]
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
                    url: 'guard-webManager/customerRecord/appointmentAdd.jhtml',
                    data: {customerId: id},
                    success: function(res){
                        if(res.status == 200 ){
                            if(res.data.code == 0) {
                                _vm.powerLoad = 1
                                _vm.hospList = res.data.content.Hospital
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
                    url: 'guard-webManager/customerRecord/appointmentUserList.jhtml',
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
            save () {
                var _vm = this
                _vm.$refs['formValidate'].validate((valid) => {
                    if(valid) { 
                        _vm.$http.post({
                            url: 'guard-webManager/customerRecord/addGroupAppointment.jhtml',
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
                                            url: '/indexAppointment',
                                            text: _vm.cusName
                                        }
                                    ];
                                    _vm.$store.dispatch('setBreadData', breadData);
                                    _vm.$router.push('/indexAppointment')
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

