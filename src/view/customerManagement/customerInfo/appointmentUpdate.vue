/**
 * 修改咨询预约页面
 */

<template>
    <div class="container-box userPower">
        <div v-if='powerLoad > 0'>
            <div class="container-header">
                <h2>修改咨询预约</h2>
            </div>
            <div class="container-body">
                <Form ref="formValidate" :model="formValidate" :rules="ruleForm" :label-width="100" label-position="right">
                    <Form-item label="提交时间">
                        <span>{{createtime}}</span>
                    </Form-item>
                    <Form-item label="提交用户">
                        <span>【{{createUserHospitalName}}】 【{{createUserDeptName}}】 【{{createUserName}}】</span>
                    </Form-item>
                    <Form-item label="预约医院">
                        <span>{{hospitalName}}</span>
                    </Form-item>
                    <Form-item label="预约日期" required prop="appointmentDate">
                        <Date-picker :value='timeDay' type="date" placement="bottom-start" placeholder="选择日期" style="width: 300px" :options='options' @on-change='saveDate'></Date-picker>
                    </Form-item>
                    <Form-item label="预约时间" required prop="startTime">
                         <Time-picker :value='timeBox' format="HH:mm" type="timerange" placement="bottom-start" placeholder="选择时间" style="width: 300px" @on-change='saveTime'></Time-picker>
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

                createtime: '',
                createUserName: '',
                createUserHospitalName: '',
                createUserDeptName: '',
                hospitalName: '',
                timeBox: [],
                timeDay: '',
                formValidate: {
                    id: '',
                    appointmentDate: '',
                    startTime: '',
                    endTime: '',
                    content: '',
                    userId: '',
                },
                nameList: [],
                options: {
                    disabledDate (date) {
                        return date && date.valueOf() < Date.now() - 86400000;
                    }
                },
                ruleForm: {
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
                this.cusName = lg.cusName
            }
            this.formValidate.id = this.$route.query.id
            this.getId(this.$route.query.id)
        },
        methods: {
            // 获取资料
            getId (id) {
                var _vm = this;
                _vm.$http.get({
                    url: 'guard-webManager/customerRecord/appointmentUpdate.jhtml',
                    data: {id: id},
                    success: function(res){
                        if(res.status == 200 ){
                            if(res.data.code == 0) {
                                _vm.powerLoad = 1
                                _vm.hospitalName = res.data.content.Appointment.hospitalName
                                _vm.createUserDeptName = res.data.content.Appointment.createUserDeptName
                                _vm.createUserHospitalName = res.data.content.Appointment.createUserHospitalName
                                _vm.createUserName = res.data.content.Appointment.createUserName
                                _vm.createtime = res.data.content.Appointment.createtime
                                _vm.nameList = res.data.content.AppointmentUserList
                                _vm.timeDay = res.data.content.Appointment.appointmentdate.split(' ')[0]
                                _vm.timeBox.push(res.data.content.Appointment.appointmentstarttime)
                                _vm.timeBox.push(res.data.content.Appointment.appointmentendtime)
                                _vm.formValidate.userId = res.data.content.Appointment.userid
                                _vm.formValidate.content = res.data.content.Appointment.content
                                _vm.formValidate.startTime = res.data.content.Appointment.appointmentstarttime
                                _vm.formValidate.endTime = res.data.content.Appointment.appointmentendtime
                                _vm.formValidate.appointmentDate = res.data.content.Appointment.appointmentdate.split(' ')[0]
                            } else {
                                _vm.powerLoad = 0
                                _vm.errorMsg = res.data.desc
                            }
                        } else {
                            console.log(res.data.desc)
                        }
                    },
                    error: function(res){
                        console.log(res)
                    }
                });
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
                        console.log(5555)
                        _vm.$http.post({
                            url: 'guard-webManager/customerRecord/appointmentUpdateEdit.jhtml',
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

