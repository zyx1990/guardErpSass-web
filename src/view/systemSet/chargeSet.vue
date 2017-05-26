/**
 * 套餐管理
 */

<template>
    <div class="container-box" ref="containerBox">
        <div class="container-header">
            <h2>套餐管理</h2>
            <ul class="header-btn-group">
                <li class="header-item" @click="toEdit('add')"><Icon type="plus-round"></Icon>增加</li>
            </ul>
        </div>
        <div class="container-body">
            <Form :label-width="60" inline :model="formSearch" ref='formSearch'>
                <Form-item label="名称" prop='name'>
                    <Input v-model="formSearch.name" placeholder="请输入名称"></Input>
                </Form-item>
                <Form-item label="拼音码" prop='pinyin'>
                    <Input v-model="formSearch.pinyin" placeholder="请输入拼音码"></Input>
                </Form-item>
                <Form-item label="状态" prop='status'>
                    <Select v-model="formSearch.status" style="width:162px">
                        <Option value="1">启用</Option>
                        <Option value="0">停用</Option>
                    </Select>
                </Form-item>
                <ul class="header-btn-group not-float">
                    <li class="header-item"  @click="getList('1', '10', formSearch)"><Icon type="search"></Icon>查询</li>
                    <li class="header-item" @click="handleReset('formSearch')"><Icon type="refresh"></Icon>重置</li>
                </ul>
            </Form>
            <Table stripe :columns="columns" :data="data"></Table>
            <div class="table-page">
                <div class="table-info">当前第{{pageNumber}}页，共{{totalPages}}页，总共{{total}}条记录</div>
                <Page class="table-paginate" :total="totalNum" @on-change='changePage' :current='pageNum'></Page>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        data () {
            return {
                formSearch: {
                    name: '',
                    pinyin: '',
                    status: ''
                },
                columns: [
                    {   
                        title: '序号',
                        width: 70,
                        render: (h, params) => {
                            const _index = (this.pageNumber - 1) * 10
                            return h('span', params.index + 1 + _index)
                        }
                    },
                    {
                        title: '名称',
                        key: 'name'
                    },
                    {
                        title: '拼音码',
                        key: 'pinyin'
                    },
                    {
                        title: '价格',
                        key: 'price',
                        render: (h, params) => {
                            return h('span', {
                                style: {
                                    color: 'orange'
                                }
                            }, '￥' + (params.row.price).toFixed(2))
                        }
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
                                            marginRight: '2px'
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
                data: [],
                total: '',
                totalPages: '',
                pageNumber: '1',
            }
        },
        computed: {
            totalNum: function () {
                return this.total * 1
            },
            pageNum: function () {
                return this.pageNumber * 1
            },
        },
        created () {
            this.getList('1', '10', this.formSearch)
        },
        methods: {
            //获取分页
            getList(pageNumber, pageSize, form) {
                var _vm = this;
                form['pageNumber'] = pageNumber
                form['pageSize'] = pageSize
                _vm.$http.get({
                    url: 'guard-webManager/chargeSet/list.jhtml',
                    data: form,
                    success: function(res){
                        if(res.status == 200 ){
                            console.log(res.data.content)
                            _vm.total = res.data.content.total
                            _vm.pageNumber = res.data.content.pageNumber
                            _vm.totalPages = res.data.content.totalPages
                            _vm.data = res.data.content.content || []
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
                    breadText = '修改套餐'
                    id = data.id
                } else {
                    breadText = '添加套餐'
                    id = data
                }
                var breadData = [
                    {
                        url: '/desktop',
                        text: '桌面'
                    },
                    {
                        url: '/chargeSet',
                        text: '套餐'
                    },
                    {
                        url: '/chargeSetEdit',
                        text: breadText
                    }
                ];
                this.$store.dispatch('setBreadData', breadData);
                this.$router.push({
                    path: '/chargeSetEdit',
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
                            url: 'guard-webManager/chargeSet/delete.jhtml',
                            data: {id: data.id},
                            success: function(res){
                                if(res.status == 200 ){
                                    if(res.data.code == 0) {
                                        _vm.getList('1', '10', _vm.formSearch)
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
            //重置
            handleReset (name) {
                this.categoryName = '';
                this.$refs[name].resetFields();
            },
            //分页
            changePage (num) {
                this.getList(num, '10', this.formSearch)
            },
        }
    }
</script>