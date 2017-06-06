/**
 * 添加顾客分组页面
 */

<template>
    <div class="container-box userPower">
        <div v-if='powerLoad > 0'>
            <div class="container-header">
                <h2>添加顾客分组</h2>
            </div>
            <div class="container-body">
                <Table stripe :columns="col" :data="data"></Table>
                <div class="footer-btnGroup">
                    <Button type="primary" shape="circle" icon="checkmark">保存</Button>
                    <Button type="primary" shape="circle" icon="android-arrow-back">返回</Button>
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
            return {
                cusName: '',
                powerLoad: '-1',
                errorMsg: '',
                formValidate: {
                    customerId: '',
                    groupList: [],
                },
                col: [
                    {   
                        title: '序号',
                        type: 'index',
                        width: 60
                    },
                    {
                        title: '客户组名称',
                        key: 'age'
                    },
                    {
                        title: '备注',
                        key: 'address'
                    },
                    {
                        title: '选择',
                        type: 'selection',
                        width: 60,
                        align: 'center'
                    }
                ],
                data: [
                    {
                        age: 18,
                        address: '北京市朝阳区芍药居'
                    },
                    {
                        age: 25,
                        address: '北京市海淀区西二旗'
                    }
                ]
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
                    url: 'guard-webManager/customerRecord/groupAdd.jhtml',
                    data: {customerId: id},
                    success: function(res){
                        if(res.status == 200 ){
                            if(res.data.code == 0) {
                                _vm.powerLoad = 1
                                console.log(res)
                                _vm.getList(id)
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
            //获取信息
            getList (id) {
                var _vm = this;
                _vm.$http.get({
                    url: 'guard-webManager/customerRecord/groupInfo.jhtml',
                    data: {customerId: id},
                    success: function(res){
                        if(res.status == 200 ){
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
        }
    }
</script>


