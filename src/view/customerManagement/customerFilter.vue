/**
 * 客户选择器
 */

<template>
    <div class="container-box" ref="containerBox">
        <div class="container-header">
            <h2>客户结果集</h2>
            <ul class="header-btn-group">
                <li class="header-item" @click="add"><Icon type="plus-round"></Icon>增加</li>
                <li class="header-item" @click="merge"><Icon type="social-buffer"></Icon></Icon>合并</li>
                <li class="header-item">
                    <Dropdown style="margin-left: 20px">
                        <a href="javascript:void(0)" class="header-item-drow">
                            添加查询
                            <Icon type="arrow-down-b"></Icon>
                        </a>
                        <Dropdown-menu slot="list">
                            <Dropdown-item>驴打滚</Dropdown-item>
                            <Dropdown-item>炸酱面</Dropdown-item>
                            <Dropdown-item>豆汁儿</Dropdown-item>
                            <Dropdown-item>冰糖葫芦</Dropdown-item>
                            <Dropdown-item>北京烤鸭</Dropdown-item>
                        </Dropdown-menu>
                    </Dropdown>
                </li>
            </ul>
        </div>
        <div class="container-body">
            <Table stripe :columns="columns" :data="data"></Table>
            <!--增加 编辑模态框-->
            <Modal
                :title="modalReviseTitle"
                v-model="modalRevise"
                :closable="false"
                @on-ok="modalReviseOk"
                :loading="loading"
                class-name="vertical-center-modal">
                <Form :model="modalReviseForm" :rules="modalReviseRules" :label-width="100" label-position="right">
                    <Form-item label="名称" prop="name">
                        <Input v-model="modalReviseForm.name" placeholder="请输入名称"></Input>
                    </Form-item>
                    <Form-item label="备注" prop="description">
                        <Input v-model="modalReviseForm.remark" type="textarea" :autosize="{minRows: 2,maxRows: 5}" placeholder="请输入备注"></Input>
                    </Form-item>
                </Form>
            </Modal>

            <!-- 合并模态框 -->
            <Modal
                title="合并"
                v-model="modalMerge"
                :closable="false"
                @on-ok="modalMergeOk"
                :loading="loading"
                class-name="vertical-center-modal">
                <Form :label-width="100" label-position="right">
                    <Form-item label="名称" prop="name">
                        <Input  placeholder="请输入名称"></Input>
                    </Form-item>
                    <Form-item label="备注" prop="description">
                        <Input placeholder="请输入备注"></Input>
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
                        title: '创建用户',
                        key: 'createUserName'
                    },
                    {
                        title: '备注',
                        key: 'remark'
                    },
                    {
                        title: '操作',
                        key: 'action',
                        width: 300,
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
                                        style: {
                                            marginRight: '5px'
                                        },
                                        on: {
                                            click: () => {
                                                this.detailed(params.row)
                                            }
                                        }
                                    }, '详细'),
                                    h('Button', {
                                        props: {
                                            type: 'info',
                                            size: 'small',
                                            icon: 'ios-people'
                                        },
                                        on: {
                                            click: () => {
                                                this.jurisdiction(params.row)
                                            }
                                        }
                                    }, '权限')
                                ])
                        }
                    }
                ],
                data: [],
                modalRevise: false,
                modalReviseTitle: '修改',
                modalReviseType: 'edit',

                modalMerge: false,


                loading: true,
                modalReviseForm: {
                    name: '',
                    remark: ''
                },
                modalReviseRules: {
                    name: [
                        { required: true, message: '姓名不能为空', trigger: 'blur' }
                    ]
                },
                hideInputId: ''
            }
        },
        mounted () {
            this.getList();
        },
        methods: {
            getList: function(){
                var _vm = this;
                _vm.$http.get({
                    url: 'guard-webManager/customerFilter/list.jhtml',
                    success: function(data){
                        var data = data.data || {};
                        if(data.code == 0){
                           _vm.data = data.content || [];
                        }else{
                            _vm.data = [];
                        }
                    }
                });
            },
            add: function() {
                this.modalReviseForm.name = ''
                this.modalReviseForm.remark = ''
                this.modalRevise = true;
                this.modalReviseType = 'add';

            },
            edit: function(row) {
                this.modalReviseForm.name = row.name;
                this.modalReviseForm.remark = row.description;
                this.hideInputId = row.id;
                this.modalRevise = true;
                this.modalReviseType = 'edit';
            },
            merge: function(){
                this.modalMerge = true;
            },
            build: function(index) {

            },
            stamp: function(index) {

            },
            remove: function(row) {
                var _vm = this;
                _vm.$Modal.confirm({
                    title: '系统提示',
                    content: '确定删除'+ row.name +'?',
                    onOk: () => {
                        _vm.$http.post({
                            url: 'guard-webManager/customerFilter/delete.jhtml',
                            data: {id:row.id },
                            success: function(data){
                                var data = data.data || {};
                            }
                        });
                    }
                });
            },
            modalReviseOk: function () {
                var _vm = this,
                    data = {},
                    url = '';
                if(_vm.modalReviseType == 'add'){
                    url = 'guard-webManager/customerFilter/add.jhtml';
                    data = {
                        name: _vm.modalReviseForm.name,
                        remark: _vm.modalReviseForm.remark
                    };
                }else{
                    url = 'guard-webManager/customerFilter/update.jhtml';
                    data = {
                        id: _vm.hideInputId,
                        name: _vm.modalReviseForm.name,
                        remark: _vm.modalReviseForm.remark
                    };
                }
                _vm.$http.post({
                    url: url,
                    data: data,
                    success: function(res){
                        var resData = res.data || {};
                        if(resData.code == 0){

                        }
                        console.log(res);
                    }
                });
                
            },
            modalMergeOk: function(){

            }
        }
    }
</script>

<style scoped>
    .header-item-drow {
        color: #fff;
    }
</style>



