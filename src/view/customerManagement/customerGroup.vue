/**
 * 客户组管理
 */
<template>
    <div class="container-box" ref="containerBox">
        <div class="container-header">
            <h2>客户组管理</h2>
            <ul class="header-btn-group">
                <li class="header-item" @click="add"><Icon type="plus-round"></Icon>增加</li>
            </ul>
        </div>
        <div class="container-body">
            <Form  :label-width="50" inline>
                <Form-item label="名称">
                    <Input type="text" placeholder="请输入名称" v-model="keyName"></Input>
                </Form-item>
                <ul class="header-btn-group not-float">
                    <li class="header-item" @click="search"><Icon type="search"></Icon>查询</li>
                    <li class="header-item" @click="reset"><Icon type="refresh"></Icon>重置</li>
                </ul>
            </Form>
            <Table stripe :columns="columns" :data="data"></Table>
            <Modal
                title="修改客户组"
                v-model="modalEdit"
                :closable="false"
                @on-ok="ok"
                :loading="loading"
                class-name="vertical-center-modal">
                <Form ref="formValidate" :model="formValidate" :rules="ruleValidate" :label-width="100" label-position="right">
                    <Form-item label="名称" prop="name">
                        <Input v-model="formValidate.name" placeholder="请输入名称"></Input>
                    </Form-item>
                    <Form-item label="描述" prop="description">
                        <Input v-model="formValidate.remark" type="textarea" :autosize="{minRows: 2,maxRows: 5}" placeholder="请输入描述"></Input>
                    </Form-item>
                </Form>
            </Modal>
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
                        title: '说明',
                        key: 'remark'
                    },
                    {
                        title: '操作',
                        key: 'action',
                        width: 250,
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
                                                this.edit(params.row)
                                            }
                                        }
                                    }, '编辑'),
                                    h('Button', {
                                        props: {
                                            type: 'error',
                                            size: 'small',
                                            icon: 'ios-trash-outline'
                                        },
                                        style: {
                                            marginRight: '5px'
                                        },
                                        on: {
                                            click: () => {
                                                this.remove(params.row)
                                            }
                                        }
                                    }, '删除'),
                                    h('Button', {
                                        props: {
                                            type: 'info',
                                            size: 'small',
                                            icon: 'ios-people'
                                        },
                                        on: {
                                            click: () => {
                                                this.groupManagement(params.row)
                                            }
                                        }
                                    }, '分组管理'),
                                ])
                        }
                    }
                ],
                data: [],
                modalEdit: false,
                loading: true,
                editType: 'add',
                keyName: '',
                formValidate: {
                    name: '',
                    remark: ''
                },
                hideInptId: '',
                ruleValidate: {
                    name: [
                        { required: true, message: '姓名不能为空', trigger: 'blur' }
                    ]
                }
            }
        },
        mounted: function(){
            this.getList();
        },
        methods: {
            getList: function(){
                var _vm = this;
                _vm.$http.get({
                    url: 'guard-webManager/customerGroup/list.jhtml',
                    data: {
                        name: _vm.keyName || ''
                    },
                    success: function(data){
                        var data = data.data || {};
                        try {
                            _vm.data = data.content || [];
                        } catch (error) {
                            _vm.data = [];
                        }
                        console.log(data);
                    }
                });
            },
            search: function(){
                this.getList();
            },
            reset: function(){
                this.keyName = '';
                this.getList();
            },
            add: function() {
                this.formValidate.name = ''
                this.formValidate.remark = ''
                this.modalEdit = true;
                this.editType = 'add';
                
            },
            edit: function(row) {
                this.formValidate.name = row.name;
                this.formValidate.remark = row.remark;
                this.modalEdit = true;
                this.hideInptId = row.id;
                this.editType = 'update';

            },
            groupManagement: function(row){
                 var breadData = [
                    {
                        url: '/desktop',
                        text: '桌面'
                    },
                    {
                        url: '/customerGroup',
                        text: '客户管理'
                    },
                    {
                        url: '/customerGroupManagement',
                        text: row.name
                    },
                ];
                this.$store.dispatch('setBreadData', breadData);
                this.$router.push({path: 'customerGroupManagement',query:{id: row.id}})
            },
            build: function(index) {
                
            },
            remove: function(row) {
                this.$Modal.confirm({
                    title: '系统提示',
                    content: '确定删除'+ row.name +'?',
                    onOk: () => {
                        this.$http.post({
                            url: 'guard-webManager/customerGroup/del.jhtml',
                            data: {
                                id: row.id
                            },
                            success: function(data){
                                var data = data.data || {};
                                if(data.code == 0){
                                    this.$Notice.success({
                                        title: '系统提示！',
                                        desc: '删除成功！'
                                    });
                                    this.getList();
                                }
                                
                            }

                        });
                        
                    },
                    onCancel: () => {
                        
                    }
                });
            },
            ok () {
                var _vm = this,
                    url = '',
                    data = {
                        name: _vm.formValidate.name,
                        remark: _vm.formValidate.remark
                    };
                    
                if(_vm.editType == 'add'){
                    url = 'guard-webManager/customerGroup/add.jhtml';
                }else{
                    url = 'guard-webManager/customerGroup/update.jhtml';
                    data.id = _vm.hideInptId;
                }
                console.log(data);
                _vm.$http.post({
                    url: url,
                    data: data,
                    success: function(res){
                        var data = res.data || {};
                        _vm.loading = false;
                        _vm.modalEdit = false;
                        try {
                            console.log(data);
                        } catch (error) {
                            
                        }
                        _vm.getList();
                    }
                });
            }
        }
    }
</script>



