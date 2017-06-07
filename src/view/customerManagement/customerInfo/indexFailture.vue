/**
 * 未成交情况页面
 */

<template>
    <Table :columns="columns" :data="data"></Table>
</template>

<script>
    export default {
        data () {
            return {
                cusName: '',
                cusId: '',
                columns: [
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
                        key: 'createUserName',
                        render: (h, params) => {
                            return h('span', '【' + params.row.createUserDeptName + '】 【' + params.row.createUserName + '】')
                        }
                    },
                    {
                        title: '未成交类型',
                        key: 'categoryName'
                    },
                    {
                        title: '未成交原因',
                        key: 'content'
                    },
                    {
                        title: '操作',
                        key: 'action',
                        width: 180,
                        align: 'center',
                        render: (h, params) => {
                            return h('div', [
                                    h('Button', {
                                        props: {
                                            type: 'primary',
                                            size: 'small',
                                            icon: 'edit'
                                        },
                                        style: {
                                            marginRight: '5px'
                                        },
                                        on: {
                                            click: () => {
                                                this.toEdit(params.row)
                                            }
                                        }
                                    }, '编辑'),
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
                    url: 'guard-webManager/customerRecord/failtureList.jhtml',
                    data: {id: id},
                    success: function(res){
                        if(res.status == 200 ){
                            console.log(res)
                            _vm.data = res.data.content.FailtureList
                        } else {
                            console.log(res.data.desc)
                        }
                    },
                    error: function(res){
                        console.log(res);
                    }
                });
            },
            //修改
            toEdit (data) {
                var breadData = [
                    {
                        url: '/desktop',
                        text: '桌面'
                    },
                    {
                        url: '/customerMsg',
                        text: this.cusName
                    },
                    {
                        url: '/failtureUpdate',
                        text: '修改未成交'
                    }
                ];
                this.$store.dispatch('setBreadData', breadData);
                this.$router.push({
                    path: '/failtureUpdate',
                    query: {
                        id: data.id
                    }
                })
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





