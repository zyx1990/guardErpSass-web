/**
 * 添加/修改渠道组页面
 */

<template>
    <div class="container-box">
        <div class="container-header">
            <h2>{{titMsg}}</h2>
        </div>
        <div class="container-body">
            <Form :label-width="100" ref="formValidate" :model="formValidate" label-position="right" :rules="ruleForm">
                <Form-item label="名称" prop="name" required style='width:400px;'>
                    <Input v-model="formValidate.name" placeholder="请输入名称"></Input>
                </Form-item>
                <Form-item label="排序号" prop="sortNo" required style='width:400px;'>
                    <Input v-model="formValidate.sortNo" placeholder="请输入排序号"></Input>
                </Form-item>
                <Form-item label="备注" prop="remark">
                    <Input v-model="formValidate.remark" type="textarea" :autosize="{minRows: 2,maxRows: 5}" placeholder="请输入描述"></Input>
                </Form-item>
                <Form-item label="渠道列表列表" prop="channels" required>
                    <Row>
                        <Col span="20">
                            <Table stripe :columns="col" :data="formValidate.channels"></Table>
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
                <Table height="350" stripe :columns="col1" :data="data" @on-selection-change='change'></Table>
            </Modal>
        </div>
    </div>
</template>

<script>
    export default {
        data () {
            const validateName = (rule, value, callback) => {
                if (value === '') {
                    callback(new Error('请输入名称'));
                } else {
                    callback();
                }
            };
            const validateSort = (rule, value, callback) => {
                if (value === '') {
                    callback(new Error('请输入排序号'));
                } else if (/^\+?[1-9][0-9]*$/.test(value)) {
                    callback();
                }  else  {
                    callback(new Error('请输入正整数'));
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
                col: [
                    {
                        title: '名称',
                        key: 'name'
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
                col1: [
                    {
                        type: 'selection',
                        width: 60,
                        align: 'center'
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
                ],
                modalEdit: false,
                loading: true,
                formValidate: {
                    id: '',
                    name: '',
                    sortNo: '',
                    remark: '',
                    channels: []
                },
                ruleForm: {
                    name: [
                        { validator: validateName, trigger: 'blur' }
                    ],
                    sortNo: [
                        { validator: validateSort, trigger: 'blur' }
                    ],
                    channels: [
                        { validator: validateList, trigger: 'blur' }
                    ]
                },
            }
        },
        created () {
            if(this.$route.query.id != 'add') {
                this.titMsg = '修改渠道组'
                this.getId()
            } else {
                this.titMsg = '添加渠道组'
                this.key = false
            }
        },
        mounted () {
            this.getList()
        },
        methods: {
            getId () {
                var _vm = this;
                _vm.$http.get({
                    url: 'guard-webManager/channelGroup/get.jhtml',
                    data: {id: '1'},
                    success: function(res){
                        if(res.status == 200 ){
                            console.log(res)
                            // _vm.formValidate.name = res.data.content.name
                            // _vm.formValidate.remark = res.data.content.remark
                            // _vm.formValidate.list = res.data.content.detailList
                        } else {
                            console.log(res.data.desc)
                        }
                    },
                    error: function(res){
                        console.log(res);
                    }
                });
            },
            getList () {
                var _vm = this
                _vm.$http.get({
                    url: 'guard-webManager/select/channelInfo.jhtml',
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
            add () {
                this.modalEdit = true
            },
            clean () {
                this.formValidate.channels.splice(0)
            },
            remove (index) {
                this.formValidate.channels.splice(index, 1)
            },
            change (data) {
                this.selectBox = data
            },
            ok () {
                var bool = true
                for(var n of this.selectBox) {
                    for(var m of this.formValidate.channels) {
                        if(n.id == m.id) {
                            bool = false
                        }
                    }
                    if(bool) {
                        this.formValidate.channels.push(n)
                    } else {
                        bool = true
                    }
                }
                this.modalEdit = false
            },
            save () {
                var _vm = this
                var url = ''
                var data = {}
                var idBox = []
                for(var id of _vm.formValidate.channels) {
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
                                tagIds: JSON.stringify(idBox)
                            }
                        } else {
                            url = 'guard-webManager/channelGroup/add.jhtml'
                            data = {
                                name: _vm.formValidate.name,
                                remark: _vm.formValidate.remark,
                                sortNo: _vm.formValidate.sortNo,
                                channels: idBox
                            }
                        }
                        console.log(idBox)
                        _vm.$http.ajax({
                            url: url,
                            data: data,
                            success: function(res){
                                if(res.status == 200 ){
                                    var breadData = [
                                        {
                                            url: '/desktop',
                                            text: '桌面'
                                        },
                                        {
                                            url: '/channelGroup',
                                            text: '渠道组'
                                        }
                                    ];
                                    _vm.$store.dispatch('setBreadData', breadData);
                                    _vm.$router.push('/channelGroup')
                                } else {
                                    console.log(res.data.desc)
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
                        url: '/channelGroup',
                        text: '渠道组'
                    }
                ];
                this.$store.dispatch('setBreadData', breadData);
                this.$router.back(-1)
            }
        }
    }
</script>
