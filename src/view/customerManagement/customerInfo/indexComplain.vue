/**
 * 投诉反馈页面
 */

<template>
    <div class="customer-box">
        <div class="customer-item">
            <div class="customer-item-title">
                <h3><Icon type="pricetag"></Icon>投诉</h3>
            </div>
            <Table :columns="col" :data="data"></Table>
        </div>
        <div class="customer-item">
            <div class="customer-item-title">
                <h3><Icon type="pricetag"></Icon>黑名单</h3>
            </div>
            <Table :columns="col1" :data="data1"></Table>
        </div>
    </div>
</template>

<script>
    export default {
        data () {
            return {
                cusName: '',
                cusId: '',
                data: [],
                data1: [],
                col: [
                    {   
                        title: '序号',
                        type: 'index',
                        width: 60
                    },
                    {
                        title: '提交时间',
                        key: 'name'
                    },
                    {
                        title: '提交用户',
                        key: 'address'
                    },
                    {
                        title: '投诉医院',
                        key: 'address'
                    },
                    {
                        title: '投诉医生',
                        key: 'address'
                    },
                    {
                        title: '投诉项目',
                        key: 'address'
                    },
                    {
                        title: '投诉内容',
                        key: 'address'
                    },
                    {
                        title: '状态',
                        key: 'address'
                    },
                    {
                        title: '处理用户',
                        key: 'address'
                    },
                    {
                        title: '处理时间',
                        key: 'address'
                    },
                    {
                        title: '处理措施',
                        key: 'address'
                    },
                    {
                        title: '客户反馈',
                        key: 'address'
                    }
                ],
                col1: [
                    {   
                        title: '序号',
                        type: 'index',
                        width: 60
                    },
                    {
                        title: '提交时间',
                        key: 'createtime'
                    },
                    {
                        title: '提交医院',
                        key: 'hospitalName'
                    },
                    {
                        title: '提交用户',
                        key: 'createUserName'
                    },
                    {
                        title: '原因',
                        key: 'content'
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
            }
        },
        created () {
            if (window.sessionStorage) {
                var lg = window.sessionStorage;
                this.cusName = lg.cusName
                this.cusId = lg.cusId
            }
            this.getList(lg.cusId)
        },
        methods: {
            getList (id) {
                var _vm = this;
                _vm.$http.get({
                    url: 'guard-webManager/customerRecord/getComplain.jhtml',
                    data: {id: id},
                    success: function(res){
                        if(res.status == 200 ){
                            console.log(res)
                            _vm.data1 = res.data.content.blacklistOrderList
                        } else {
                            console.log(res.data.desc)
                        }
                    },
                    error: function(res){
                        console.log(res);
                    }
                });
            },
            remove (data, type) {
                var _vm = this;
                _vm.$Modal.confirm({
                    title: '系统提示',
                    content: '确定取消此预约？',
                    onOk: () => {
                        _vm.$http.post({
                            url: 'guard-webManager/customerRecord/blacklistDelete.jhtml',
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





