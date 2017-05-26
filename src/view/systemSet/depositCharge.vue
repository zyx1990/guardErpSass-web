/**
 * 预收款项目管理
 */

<template>
    <div class="container-box">
        <div class="container-header">
            <h2>预收款项目管理</h2>
            <ul class="header-btn-group">
                <li class="header-item" @click="toEdit('add')"><Icon type="plus-round"></Icon>增加</li>
            </ul>
        </div>
        <div class="container-body">
            <Table stripe :columns="columns" :data="data"></Table>
        </div>
    </div>
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
                        title: '名称',
                        key: 'name'
                    },
                    {
                        title: '状态',
                        width: 70,
                        key: 'status',
                        render: (h, params) => {
                            const color = params.row.status === 1 ? 'blue' : 'red';
                            const text = params.row.status === 1 ? '启用' : '禁用';
                            return h('span', {
                                style: {
                                    color: color
                                }
                            },text)
                        }
                    },
                    {
                        title: '可用医院',
                        key: 'hospitalList',
                        render: (h, params) => {
                            return h('div', {
                                    style: {
                                        padding: '5px 0'
                                    }
                                }, params.row.hospitalList.map(item => {
                                    return h('span', item.name + '、')
                                }))
                        }
                    },
                    {
                        title: '价格',
                        key: 'price',
                        render: (h, params) => {
                            return h('span', {
                                    style: {
                                        color: 'orange'
                                    }
                                }, "￥" + params.row.price)
                        }
                    },
                    {
                        title: '使用范围',
                        key: 'scopelimit',
                        render: (h, params) => {
                            if(params.row.scopelimit == 1) {
                                return h('span', '无限制')
                            }
                            if(params.row.scopelimit == 2) {
                                return h('p', [
                                        h('span', '指定项目分类：'),
                                        params.row.chargeCategoryList.map(item => {
                                            return h('span', item.name + '、')
                                        })
                                    ])
                            }
                            if(params.row.scopelimit == 3) {
                                return h('p', [
                                        h('span', '指定项目：'),
                                        params.row.chargeList.map(item => {
                                            return h('span', item.name + '、')
                                        })
                                    ])
                            }
                        }
                    },
                    {
                        title: '描述',
                        key: 'remark'
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
            this.getList()
        },
        methods: {
            getList () {
                var _vm = this;
                _vm.$http.get({
                    url: 'guard-webManager/depositCharge/list.jhtml',
                    success: function(res){
                        if(res.status == 200 ){
                            console.log(res.data.content)
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
            toEdit (data) {
                var breadText = ''
                var id = ''
                if(typeof data == 'object') {
                    breadText = '修改预收款项目'
                    id = data.id
                } else {
                    breadText = '添加预收款项目'
                    id = data
                }
                var breadData = [
                    {
                        url: '/desktop',
                        text: '桌面'
                    },
                    {
                        url: '/depositCharge',
                        text: '预收款项目管理'
                    },
                    {
                        url: '/depositChargeEdit',
                        text: breadText
                    }
                ];
                this.$store.dispatch('setBreadData', breadData);
                this.$router.push({
                    path: '/depositChargeEdit',
                    query: {
                        id: id
                    }
                })
            },
            remove (data) {
                var _vm = this;
                _vm.$Modal.confirm({
                    title: '系统提示',
                    content: '确定删除'+ data.name +'?',
                    onOk: () => {
                        _vm.$http.post({
                            url: 'guard-webManager/depositCharge/del.jhtml',
                            data: {id: data.id},
                            success: function(res){
                                if(res.status == 200 ){
                                    _vm.getList()
                                    _vm.$Notice.success({
                                        title: '系统提示！',
                                        desc: '删除成功！'
                                    });
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