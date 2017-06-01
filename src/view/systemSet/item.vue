/**
 * 报表项目管理页面
 */

<template>
    <div class="container-box">
        <div class="container-header">
            <h2>报表项目管理</h2>
            <ul class="header-btn-group">
                <li class="header-item" @click="toCheck('Symptom')"><Icon type="settings"></Icon>检测症状</li> 
                <li class="header-item" @click="toCheck('Charge')"><Icon type="settings"></Icon>检测收费项目</li>  
                <li class="header-item"><Icon type="plus-round"></Icon>增加</li>            
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
                        title: '组名称',
                        key: 'groupName'
                    },
                    {
                        title: '排序号',
                        key: 'sortno'
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
                data: [
                    {
                        name: '鼻部整形',
                        group: '111',
                        sort: 1,
                        description: '公交广告'
                    },
                    {
                        name: '眼部整形',
                        sort: 2,
                        group: '22',
                        description: '222'
                    }
                ]
            }
        },
        created () {
            this.getList()
        },
        methods: {
            getList () {
                var _vm = this;
                _vm.$http.get({
                    url: 'guard-webManager/item/list.jhtml',
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
            toCheck (type) {
                var _url = ''
                var _text = ''
                if(type == 'Symptom') {
                    _url = '/itemCheckSymptom'
                    _text = '检测症状匹配'
                } else {
                    _url = '/itemCheckCharge'
                    _text = '检测收费项目匹配'
                }
                var breadData = [
                    {
                        url: '/desktop',
                        text: '桌面'
                    },
                    {
                        url: '/item',
                        text: '报表项目'
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
                        id: '1'
                    }
                })
            }
        }
    }
</script>



