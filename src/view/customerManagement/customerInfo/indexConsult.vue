/**
 * 咨询情况页面
 */

<template>
    <Table :columns="columns" :data="data"></Table>
</template>

<script>
    export default {
        data () {
            return {
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
                            const _display = typeof params.row.createUserDeptName == 'string' ? 'inline-block' : 'none'
                            const _display2 = typeof params.row.createUserName == 'string' ? 'inline-block' : 'none'
                            return h('p', [
                                    h('span', {
                                        style: {
                                            display: _display
                                        }
                                    }, "【" + params.row.createUserDeptName + '】'),
                                    h('span', {
                                        style: {
                                            display: _display2
                                        }
                                    }, "【" + params.row.createUserName + '】'),
                                ])
                        }
                    },
                    {
                        title: '方式',
                        key: 'toolName'
                    },
                    {
                        title: '咨询项目',
                        key: 'symptomName',
                        render: (h, params) => {
                            const _display = typeof params.row.symptomName == 'string' ? 'inline-block' : 'none'
                            const _display2 = typeof params.row.symptom2Name == 'string' ? 'inline-block' : 'none'
                            const _display3 = typeof params.row.symptom3Name == 'string' ? 'inline-block' : 'none'
                            const _display4 = typeof params.row.symptom4Name == 'string' ? 'inline-block' : 'none'
                            return h('p', [
                                    h('span', {
                                        style: {
                                            display: _display
                                        }
                                    }, params.row.symptomName + '、'),
                                    h('span', {
                                        style: {
                                            display: _display2
                                        }
                                    }, params.row.symptom2Name + '、'),
                                    h('span', {
                                        style: {
                                            display: _display3
                                        }
                                    }, params.row.symptom3Name + '、'),
                                    h('span', {
                                        style: {
                                            display: _display4
                                        }
                                    }, params.row.symptom4Name + '、'),
                                    h('span', params.row.symptom5Name)
                                ])
                        }
                    },
                    {
                        title: '咨询内容',
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
            }
            this.getList(lg.cusId)
        },
        methods: {
            getList (id) {
                var _vm = this;
                _vm.$http.get({
                    url: 'guard-webManager/customerRecord/getConsults.jhtml',
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
                _vm.$Modal.confirm({
                    title: '系统提示',
                    content: '确定删除？',
                    onOk: () => {
                        _vm.$http.post({
                            url: 'guard-webManager/customerRecord/delConsult.jhtml',
                            data: {id: data.id},
                            success: function(res){
                                if(res.status == 200 ){
                                    if(res.data.code == 0) {
                                        _vm.getList()
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





