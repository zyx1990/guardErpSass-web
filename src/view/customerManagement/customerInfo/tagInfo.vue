/**
 * 标签详细页面
 */

<template>
    <div class="container-box userPower">
        <div v-if='powerLoad > 0'>
            <div class="container-header">
                <h2>客户标签管理</h2>
            </div>
            <div class="container-body">
                <Table :columns="columns" :data="data"></Table>
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
                cusId: '',
                cusName: '',
                powerLoad: '-1',
                errorMsg: '',
                columns: [
                    {   
                        title: '序号',
                        type: 'index',
                        width: 60
                    },
                    {
                        title: '标签',
                        key: 'tagName'
                    },
                    {
                        title: '添加用户',
                        key: 'createUserName',
                        render: (h, params) => {
                            return h('span', '【' + params.row.createUserHospitalName + '】 【' + params.row.createUserDeptName + '】【' + params.row.createUserName + '】')
                        }
                    },
                    {
                        title: '添加时间',
                        key: 'createtime'
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
                                            type: 'error',
                                            size: 'small',
                                            icon: 'ios-trash-outline'
                                        },
                                        on: {
                                            click: () => {
                                                this.remove(params.row)
                                            }
                                        }
                                    }, '删除'),
                                ])
                        }
                    }
                ],
                data: []
            }
        },
        created () {
            if (window.sessionStorage) {
                var lg = window.sessionStorage;
                this.cusId = lg.cusId
                this.cusName = lg.cusName
            }
            this.getList(this.cusId)
        },
        methods: {
            getList (id) {
                var _vm = this;
                _vm.$http.get({
                    url: 'guard-webManager/customerRecord/tagInfo.jhtml',
                    data: {customerId: id},
                    success: function(res){
                        if(res.status == 200 ){
                             if(res.data.code == 0) {
                                console.log(res)
                                _vm.powerLoad = 1
                                _vm.data = res.data.content.TagList
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
            //取消
            remove (data) {
                var _vm = this;
                _vm.$Modal.confirm({
                    title: '系统提示',
                    content: '确定取消未成交？',
                    onOk: () => {
                        _vm.$http.post({
                            url: 'guard-webManager/customerRecord/failtureDelete.jhtml',
                            data: {id: data.id},
                            success: function(res){
                                if(res.status == 200 ){
                                    if(res.data.code == 0) {
                                        _vm.getList(_vm.cusId)
                                        _vm.$Notice.success({
                                            title: '系统提示！',
                                            desc: '删除成功！'
                                        });
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
                    },
                    onCancel: () => {
                        
                    }
                });
            },
        }
    }
</script>





