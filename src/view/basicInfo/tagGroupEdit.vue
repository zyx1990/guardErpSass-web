/**
 * 添加/修改标签组管理页面
 */

<template>
    <div class="container-box">
        <div class="container-header">
            <h2>{{titMsg}}</h2>
        </div>
        <div class="container-body">
            <Form :label-width="100" ref="formValidate" :model="formValidate" label-position="right" :rules="ruleForm">
                <Form-item label="名称" prop="name" required>
                    <Input v-model="formValidate.name" placeholder="请输入名称"></Input>
                </Form-item>
                <Form-item label="备注" prop="remark">
                    <Input v-model="formValidate.remark" type="textarea" :autosize="{minRows: 2,maxRows: 5}" placeholder="请输入描述"></Input>
                </Form-item>
                <Form-item label="列表" prop="list" required>
                    <Row>
                        <Col span="20">
                            <Table stripe :columns="columns" :data="formValidate.list"></Table>
                        </Col>
                        <Col span="3" offset="1" class='table-left-btn'>
                            <Button type="primary" shape="circle" icon="plus-round" @click='add'>增加</Button>
                            <Button type="primary" shape="circle" icon="refresh" @click='clean'>清空</Button>
                        </Col>
                    </Row>
                </Form-item>
            </Form>
            <div class="footer-btnGroup">
                <Button type="primary" shape="circle" icon="checkmark" @click='save'>保存</Button>
                <Button type="primary" shape="circle" icon="android-arrow-back" @click='back'>返回</Button>
            </div>
            <Modal
                title="选择标签"
                v-model="modalEdit"
                :closable="false"
                @on-ok="ok"
                :loading="loading"
                class-name="vertical-center-modal">
                <Form  :label-width="50" inline ref="formSearch" :model="formSearch">
                    <Form-item label="名称" prop="name">
                        <Input v-model="formSearch.name" placeholder="请输入名称"></Input>
                    </Form-item>
                    <ul class="header-btn-group not-float">
                        <li class="header-item" @click='getList(formSearch.name)'><Icon type="search"></Icon>查询</li>
                        <li class="header-item" @click="handleReset('formSearch')"><Icon type="refresh"></Icon>重置</li>
                    </ul>
                </Form>
                <Table height="350" stripe :columns="columns1" :data="data" @on-selection-change='change'></Table>
            </Modal>
        </div>
    </div>
</template>

<script>
    // import cache from 'utils/cache'
    export default {
        data () {
            const validateName = (rule, value, callback) => {
                if (value === '') {
                    callback(new Error('请输入名称'));
                } else {
                    callback();
                }
            };
            const validateList = (rule, value, callback) => {
                if (value.length === 0) {
                    callback(new Error('请选择标签'));
                } else {
                    callback();
                }
            };
            return {
                key: true,
                titMsg: '',
                columns: [
                    {
                        title: '名称',
                        key: 'tagName'
                    },
                    {
                        title: '操作',
                        key: 'action',
                        width: 100,
                        align: 'center',
                        render: (h, params) => {
                            return h('div', [
                                    h('Button', {
                                        props: {
                                            type: 'error',
                                            size: 'small',
                                            icon: 'ios-trash-outline'
                                        },
                                        on: {
                                            click: () => {
                                                this.remove(params.index)
                                            }
                                        }
                                    }, '删除'),
                                ])
                        }
                    }
                ],
                data: [],
                selectBox: [],
                columns1: [
                    {
                        type: 'selection',
                        width: 60,
                        align: 'center'
                    },
                    {
                        title: '标签',
                        key: 'name'
                    }
                ],
                modalEdit: false,
                loading: true,
                formValidate: {
                    name: '',
                    remark: '',
                    list: []
                },
                formSearch: {
                    name: ''
                },
                ruleForm: {
                    name: [
                        { validator: validateName, trigger: 'blur' }
                    ],
                    list: [
                        { validator: validateList, trigger: 'blur' }
                    ]
                },
            }
        },
        created () {
            if(this.$route.query.id != 'add') {
                this.titMsg = '修改标签组'
                this.getId()
            } else {
                this.titMsg = '添加标签组'
                this.key = false
            }
        },
        mounted () {
            this.getList(this.formSearch.name)
        },
        methods: {
            getId () {
                var _vm = this;
                _vm.$http.get({
                    url: 'guard-webManager/tagGroup/get.jhtml',
                    data: {id: _vm.$route.query.id},
                    success: function(res){
                        if(res.status == 200 ){
                            console.log(res.data.content.detailList)
                            _vm.formValidate.name = res.data.content.name
                            _vm.formValidate.remark = res.data.content.remark
                            _vm.formValidate.list = res.data.content.detailList
                        } else {
                            console.log(res.data.desc)
                        }
                    },
                    error: function(res){
                        console.log(res);
                    }
                });
            },
            getList (name) {
                var _vm = this;
                if(name.length == 0) {
                    name = null
                }
                _vm.$http.get({
                    url: 'guard-webManager/select/tagList.jhtml',
                    data: {name: name},
                    success: function(res){
                        if(res.status == 200 ){
                            console.log(res.data.content)
                            _vm.data = res.data.content.content
                        } else {
                            console.log(res.data.desc)
                        }
                    },
                    error: function(res){
                        console.log(res);
                    }
                });
            },
            add () {
                this.modalEdit = true
            },
            clean () {
                this.formValidate.list.splice(0)
            },
            remove (index) {
                this.formValidate.list.splice(index, 1)
            },
            change (data) {
                this.selectBox = data
            },
            ok () {
                var bool = true
                for(var n of this.selectBox) {
                    for(var m of this.formValidate.list) {
                        if(n.id == m.id) {
                            bool = false
                        }
                    }
                    if(bool) {
                        n['tagName'] = n.name
                        this.formValidate.list.push(n)
                    } else {
                        bool = true
                    }
                }
                this.modalEdit = false
            },
            handleReset (name) {
                this.$refs[name].resetFields();
            },
            save () {
                var _vm = this
                var url = ''
                var data = {}
                var idBox = []
                for(var id of _vm.formValidate.list) {
                    idBox.push(id.id)
                }
                _vm.$refs['formValidate'].validate((valid) => {
                    if(valid) {
                        if(_vm.key) {
                            url = 'guard-webManager/tagGroup/edit.jhtml'
                            data = {
                                id: _vm.$route.query.id,
                                name: _vm.formValidate.name,
                                remark: _vm.formValidate.remark,
                                tagIds: idBox
                            }
                        } else {
                            url = 'guard-webManager/tagGroup/add.jhtml'
                            data = {
                                name: _vm.formValidate.name,
                                remark: _vm.formValidate.remark,
                                tagIds: idBox
                            }
                        }
                        _vm.$http.ajax({
                            url: url,
                            data: data,
                            success: function(res){
                                if(res.code == 0 ){
                                    var breadData = [
                                        {
                                            url: '/desktop',
                                            text: '桌面'
                                        },
                                        {
                                            url: '/tagGroup',
                                            text: '标签组组管理'
                                        }
                                    ];
                                    _vm.$store.dispatch('setBreadData', breadData);
                                    _vm.$router.push('/tagGroup')
                                } else {
                                    console.log(res.desc)
                                }
                            },
                            error: function(res){
                                console.log(res);
                            }
                        });
                    }
                })
            },
            back () {
                var breadData = [
                    {
                        url: '/desktop',
                        text: '桌面'
                    },
                    {
                        url: '/tagGroup',
                        text: '标签组组管理'
                    }
                ];
                this.$store.dispatch('setBreadData', breadData);
                this.$router.back(-1)
            }
        }
    }
</script>
