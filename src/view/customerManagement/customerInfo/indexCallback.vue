/**
 * 回访情况页面
 */

<template>
    <Table :columns="columns" :data="data"></Table>
</template>

<script>
    export default {
        data () {
            return {
                cusId: '',
                cusName: '',
                columns: [
                    {   
                        title: '序号',
                        type: 'index',
                        width: 60
                    },
                    {
                        title: '回访提醒日期',
                        key: 'tasktime'
                    },
                    {
                        title: '类型',
                        key: 'categoryName'
                    },
                    {
                        title: '提醒内容',
                        key: 'name'
                    },
                    {
                        title: '提醒用户',
                        key: 'userName',
                        return: (h, params) => {
                            return h('span', '【' + userHospitalName + '】 【' + userDeptName + '】 【' + userName + '】')
                        }
                    },
                    {
                        title: '状态',
                        width: 70,
                        key: 'status',
                        render: (h, params) => {
                            const color = params.row.status === 1 ? 'blue' : 'red';
                            const text = params.row.status === 1 ? '已上门' : '未上门';
                            return h('span', {
                                style: {
                                    color: color
                                }
                            },text)
                        }
                    },
                    {
                        title: '回访用户',
                        key: 'createUserName',
                        return: (h, params) => {
                            return h('span', '【' + createUserHospitalName + '】 【' + createUserDeptName + '】 【' + createUserName + '】')
                        }
                    },
                    {
                        title: '回访时间',
                        key: 'createtime'
                    },
                    {
                        title: '方式',
                        key: 'toolName'
                    },
                    {
                        title: '回访内容',
                        key: 'content'
                    },
                    {
                        title: '提醒创建用户',
                        key: 'taskCreateUserName'
                    },
                    {
                        title: '提醒创建时间',
                        key: 'taskcreatetime'
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
                    url: 'guard-webManager/customerRecord/getCallback.jhtml',
                    data: {id: id},
                    success: function(res){
                        if(res.status == 200 ){
                            console.log(res)
                            _vm.data = res.data.content
                        } else {
                            console.log(res.data.desc)
                        }
                    },
                    error: function(res){
                        console.log(res);
                    }
                });
            },
            remove (data) {
                var _vm = this;
                var _url = ''
                if(data.status == 1) {
                    _url = 'guard-webManager/customerRecord/delCallback.jhtml'
                } else {
                    _url = 'guard-webManager/customerRecord/callbackTaskDelete.jhtml'
                }
                _vm.$Modal.confirm({
                    title: '系统提示',
                    content: '确认删除回访',
                    onOk: () => {
                        _vm.$http.post({
                            url: _url,
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
            toEdit (data) {
                var _url = ''
                var _text = ''
                if(data.status == 1) {
                    _url = '/callbackUpdate'
                    _text = '修改回访信息'
                } else {
                    _url = '/callbackTaskUpdate'
                    _text = '修改回访提醒信息'
                }
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
                        url: _url,
                        text: _text
                    }
                ];
                this.$store.dispatch('setBreadData', breadData);
                this.$router.push({
                    path: _url,
                    query: {
                        id: data.id
                    }
                })
            },
        }
    }
</script>





