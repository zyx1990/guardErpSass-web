/**
 * 标签组管理
 */

<template>
    <div class="container-box">
        <div class="container-header">
            <h2>标签组管理</h2>
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
                        title: '描述',
                        key: 'remark'
                    },
                    {
                        title: '标签',
                        key: 'detailList',
                        render: (h,params) => {
                            return h('div', {
                                style: {
                                    padding: '4px 0'
                                }
                            }, params.row.detailList.map(item => {
                                return h('p', {
                                    style: {
                                        padding: "2px 0"
                                    }
                                },item.tagName)
                            }))
                        }
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
                    url: 'guard-webManager/tagGroup/list.jhtml',
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
                    breadText = '修改标签组信息'
                    id = data.id
                } else {
                    breadText = '添加标签组信息'
                    id = data
                }
                var breadData = [
                    {
                        url: '/desktop',
                        text: '桌面'
                    },
                    {
                        url: '/tagGroup',
                        text: '标签组组管理'
                    },
                    {
                        url: '/tagGroupEdit',
                        text: breadText
                    }
                ];
                this.$store.dispatch('setBreadData', breadData);
                this.$router.push({
                    path: '/tagGroupEdit',
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
                            url: 'guard-webManager/tagGroup/del.jhtml',
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