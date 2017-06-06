/**
 * 修改回访信息页面
 */

<template>
    <div class="container-box userPower">
        <div v-if='powerLoad > 0'>
            <div class="container-header">
                <h2>修改回访信息</h2>
            </div>
            <div class="container-body">
                <Form ref="formValidate" :model="formValidate" :rules="ruleForm" :label-width="100" label-position="right">
                    <Form-item label="提交时间">
                        <span>{{createtime}}</span>
                    </Form-item>
                    <Form-item label="提交用户">
                        <span>【{{createUserHospitalName}}】 【{{createUserDeptName}}】 【{{createUserName}}】</span>
                    </Form-item>
                    <Form-item label="回访类型">
                        <span>{{categoryName}}</span>
                    </Form-item>
                    <Form-item label="回访方式" prop="tool" required>
                        <Select v-model="formValidate.tool" style="width:300px">
                            <Option v-for="item in wayList" :value="item.code" :key="item">{{ item.name }}</Option>
                        </Select>
                    </Form-item>
                    <Form-item label="备注" prop="content" required>
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
            const validateWay = (rule, value, callback) => {
                if (value === '') {
                    callback(new Error('请选择回访方式'));
                } else {
                    callback();
                }
            };
            const validateCon = (rule, value, callback) => {
                if (value === '') {
                    callback(new Error('请填写回访内容'));
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
                categoryName: '',
                formValidate: {
                    id: '',
                    tool: '',
                    content: ''
                },
                wayList: [],
                ruleForm: {
                    tool: [
                        { validator: validateWay, trigger: 'change' }
                    ],
                    content: [
                        { validator: validateCon, trigger: 'blur' }
                    ],
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
                    url: 'guard-webManager/customerRecord/callbackUpdate.jhtml',
                    data: {id: id},
                    success: function(res){
                        if(res.status == 200 ){
                            if(res.data.code == 0) {
                                _vm.powerLoad = 1
                                console.log(res)
                                _vm.categoryName = res.data.content.Callback.categoryName
                                _vm.createUserDeptName = res.data.content.Callback.createUserDeptName
                                _vm.createUserHospitalName = res.data.content.Callback.createUserHospitalName
                                _vm.createUserName = res.data.content.Callback.createUserName
                                _vm.createtime = res.data.content.Callback.createtime
                                _vm.formValidate.tool = res.data.content.Callback.tool
                                _vm.formValidate.content = res.data.content.Callback.content
                                _vm.getTool()
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
            //获取回访方式
            getTool () {
                var _vm = this;
                _vm.$http.get({
                    url: 'guard-webManager/select/toolInfo.jhtml',
                    success: function(res){
                        if(res.status == 200 ){
                            if(res.data.code == 0) {
                                _vm.wayList = res.data.content
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
            save () {
                var _vm = this
                _vm.$refs['formValidate'].validate((valid) => {
                    if(valid) { 
                        _vm.$http.post({
                            url: 'guard-webManager/customerRecord/updateCallback.jhtml',
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
                                                url: '/indexCallback',
                                                text: _vm.cusName
                                            }
                                        ];
                                        _vm.$store.dispatch('setBreadData', breadData);
                                        _vm.$router.push('/indexCallback')
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
                        url: '/indexCallback',
                        text: this.cusName
                    }
                ];
                this.$store.dispatch('setBreadData', breadData);
                this.$router.back(-1)
            }
        }
    }
</script>


