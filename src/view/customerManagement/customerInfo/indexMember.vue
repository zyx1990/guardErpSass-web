/**
 * 会员权益页面
 */

<template>
    <div class="customer-box">
        <Alert type="success" style='marginTop: 10px;'>{{memberStr}}</Alert>
        <div class="customer-item">
            <div class="customer-item-title">
                <h3><Icon type="pricetag"></Icon>会员记录</h3>
            </div>
            <Table :columns="columns" :data="data"></Table>
        </div>
        <div class="customer-item">
            <div class="customer-item-title">
                <h3><Icon type="pricetag"></Icon>权益列表</h3>
            </div>
            <Table :columns="columns1" :data="data1"></Table>
        </div>
    </div>
</template>

<script>
    export default {
        data () {
            return {
                cusName: '',
                cusId: '',
                memberStr: '',
                columns: [
                    {   
                        title: '序号',
                        type: 'index',
                        width: 60
                    },
                    {
                        title: '会员类型',
                        key: 'categoryName'
                    },
                    {
                        title: '操作时间',
                        key: 'createtime'
                    },
                    {
                        title: '操作用户',
                        key: 'createUserName',
                        render: (h, params) => {
                            if(typeof params.row.createUserName == 'string') {
                                return h('span', '【' + params.row.createUserHospitalName + '】 【' + params.row.createUserDeptName + '】 【' + params.row.createUserName + '】')
                            }
                        }
                    },
                    {
                        title: '备注',
                        key: 'remark'
                    }
                ],
                columns1: [
                    {   
                        title: '序号',
                        type: 'index',
                        width: 60
                    },
                    {
                        title: '权益名称',
                        key: 'equityName'
                    },
                    {
                        title: '内容',
                        key: 'equityContent'
                    },
                    {
                        title: '操作时间',
                        key: 'createtime'
                    },
                    {
                        title: '操作用户',
                        key: 'createUserName',
                        render: (h, params) => {
                            if(typeof params.row.createUserName == 'string') {
                                return h('span', '【' + params.row.createUserHospitalName + '】 【' + params.row.createUserName + '】')
                            }
                        }
                    },
                    {
                        title: '备注',
                        key: 'remark'
                    },
                ],
                data: [],
                data1: []
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
                    url: 'guard-webManager/customerRecord/getMember.jhtml',
                    data: {id: id},
                    success: function(res){
                        if(res.status == 200 ){
                            console.log(res)
                            _vm.memberStr = res.data.content.memberStr
                            _vm.data = res.data.content.memberList
                            _vm.data1 = res.data.content.equityList
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





