/**
 * 修改未成交页面
 */

<template>
    <div class="container-box userPower">
        <div v-if='powerLoad > 0'>
            <div class="container-header">
                <h2>修改未成交</h2>
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
                    <Form-item label="未成交类型" prop="categoryId" required>
                        <Select v-model="formValidate.categoryId" style="width:300px">
                            <Option v-for="item in typeList" :value="item.id" :key="item">{{ item.name }}</Option>
                        </Select>
                    </Form-item>
                    <Form-item label="未成交原因" prop="content" required>
                        <Input v-model="formValidate.content" type="textarea" :autosize="{minRows: 2,maxRows: 7}" placeholder="请输入原因"></Input>
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
            const validateType = (rule, value, callback) => {
                if (value === '') {
                    callback(new Error('请选择回访类型'));
                } else {
                    callback();
                }
            };
            const validateCon = (rule, value, callback) => {
                if (value === '') {
                    callback(new Error('请填写未成交原因'));
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
                createUserDeptName: '',
                hospitalName: '',
                formValidate: {
                    id: '',
                    categoryId: '',
                    content: ''
                },
                typeList: [],
                ruleForm: {
                    categoryId: [
                        { validator: validateType, trigger: 'change' }
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
                this.cusName = lg.cusName
            }
            this.formValidate.id = this.$route.query.id
            this.getId(this.formValidate.id)
            this.getList()
        },
        methods: {
            // 获取资料
            getId (id) {
                var _vm = this;
                _vm.$http.get({
                    url: 'guard-webManager/customerRecord/failtureUpdate.jhtml',
                    data: {id: id},
                    success: function(res){
                        if(res.status == 200 ){
                            if(res.data.code == 0) {
                                _vm.powerLoad = 1
                                console.log(res)
                                _vm.hospitalName = res.data.content.Failture.hospitalName
                                _vm.createUserName = res.data.content.Failture.createUserName
                                _vm.createtime = res.data.content.Failture.createtime
                                _vm.createUserDeptName = res.data.content.Failture.createUserDeptName
                                _vm.formValidate.categoryId = res.data.content.Failture.categoryid
                                _vm.formValidate.content = res.data.content.Failture.content
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
            //获取未成交类型
            getList () {
               var _vm = this;
                _vm.$http.get({
                    url: 'guard-webManager/select/failtureCategoryInfo.jhtml',
                    success: function(res){
                        if(res.status == 200 ){
                            _vm.typeList = res.data.content
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
                            url: 'guard-webManager/customerRecord/updateFailture.jhtml',
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
                                                url: '/indexFailture',
                                                text: _vm.cusName
                                            }
                                        ];
                                        _vm.$store.dispatch('setBreadData', breadData);
                                        _vm.$router.push('/indexFailture')
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
                        url: '/indexFailture',
                        text: this.cusName
                    }
                ];
                this.$store.dispatch('setBreadData', breadData);
                this.$router.back(-1)
            }
        }
    }
</script>


