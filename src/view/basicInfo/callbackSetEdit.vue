/**
 * 添加/修改回访组信息页面
 */

<template>
    <div class="container-box">
        <div class="container-header">
            <h2>{{titMsg}}</h2>
        </div>
        <div class="container-body">
            <Form :label-width="100" ref="formValidate" :model="formValidate" :rules="ruleForm" label-position="right">
                <Form-item label="名称" prop="name" required style='width:400px;'>
                    <Input v-model="formValidate.name" placeholder="请输入名称"></Input>
                </Form-item>
                <Form-item label="备注" prop="remark">
                    <Input v-model="formValidate.remark" type="textarea" :autosize="{minRows: 2,maxRows: 5}" placeholder="请输入描述"></Input>
                </Form-item>
                <Form-item label="详细" prop="more" required>
                    <Table stripe :columns="col" :data="formValidate.more"></Table>
                    <Button type="primary" shape="circle" icon="plus-round" @click='add' style='margin-top:10px;'>增加</Button>
                </Form-item>
            </Form>
            <div class="footer-btnGroup">
                <Button type="primary" shape="circle" icon="checkmark" @click='save'>保存</Button>
                <Button type="primary" shape="circle" icon="android-arrow-back" @click='back'>返回</Button>
            </div>
            <Modal
                title="增加回访信息"
                v-model="modalEdit"
                :closable="false"
                @on-ok='ok'
                :loading="loading"
                class-name="vertical-center-modal">
                <Form ref="formValidate1" :model="formValidate1" :rules="ruleForm1" :label-width="100" label-position="right">
                    <Form-item label="回访类型" prop="index" required>
                        <Select v-model="formValidate1.index" clearable style="width:162px">
                            <Option v-for="(item, index) in typeList" :value="index" :key="item">{{ item.name }}</Option>
                        </Select>
                    </Form-item>
                    <Form-item label="天数" prop="days" required>
                        <Input v-model="formValidate1.days" placeholder="请输入天数"></Input>
                    </Form-item>
                    <Form-item label="说明" prop="name">
                        <Input v-model="formValidate1.name" type="textarea" :autosize="{minRows: 2,maxRows: 5}" placeholder="请输入说明"></Input>
                    </Form-item>
                </Form>
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
            const validateMore = (rule, value, callback) => {
                if (value.length === 0) {
                    callback(new Error('请选择回访项目'));
                } else {
                    callback();
                }
            };
            const validateIndex = (rule, value, callback) => {
                if (value === '') {
                    callback(new Error('请选择回访类型'));
                } else {
                    callback();
                }
            };
            const validateDay = (rule, value, callback) => {
                if (value === '') {
                    callback(new Error('请输入天数'));
                } else if (/^\+?[1-9][0-9]*$/.test(value)) {
                    callback();
                }  else  {
                    callback(new Error('请输入正整数'));
                }
            };
            return {
                key: true,
                col: [
                    {
                        title: '回访类型',
                        key: 'categoryName'
                    },
                    {
                        title: '天数',
                        key: 'days'
                    },
                    {
                        title: '说明',
                        key: 'name'
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
                                            type: 'error',
                                            size: 'small',
                                            icon: 'ios-trash-outline'
                                        },
                                        on: {
                                            click: () => {
                                                this.remove(params.index)
                                            }
                                        }
                                    }, '删除')
                                ])
                        }
                    }
                ],
                titMsg: '',
                modalEdit: false,
                loading: true,
                formValidate: {
                    name: '',
                    remark: '',
                    more: []
                },
                formValidate1: {
                    index: '',
                    days: '',
                    name: ''
                },
                typeList: [],
                ruleForm: {
                    name: [
                        { validator: validateName, trigger: 'blur' }
                    ],
                    more: [
                        { validator: validateMore, trigger: 'blur' }
                    ]
                },
                ruleForm1: {
                    index: [
                        { validator: validateIndex, trigger: 'blur' }
                    ],
                    days: [
                        { validator: validateDay, trigger: 'blur' }
                    ],
                }              
            }
        },
        created () {
            if(this.$route.query.id != 'add') {
                this.titMsg = '修改回访组'
                this.getId()
            } else {
                this.titMsg = '添加回访组'
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
                    url: 'guard-webManager/callbackSet/get.jhtml',
                    data: {id: _vm.$route.query.id},
                    success: function(res){
                        if(res.status == 200 ){
                            console.log(res.data.content)
                            _vm.formValidate.name = res.data.content.name
                            _vm.formValidate.remark = res.data.content.remark
                            _vm.formValidate.more = res.data.content.detailList
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
                var _vm = this;
                _vm.$http.get({
                    url: 'guard-webManager/callbackSet/getCallbackCategoryInfoState.jhtml',
                    success: function(res){
                        if(res.status == 200 ){
                            console.log(res.data.content)
                            _vm.typeList = res.data.content
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
                this.$refs['formValidate1'].resetFields()
                this.modalEdit = true
                this.loading = true
            },
            ok () {
                var _vm = this
                _vm.$refs['formValidate1'].validate((valid) => {
                    if(valid) {
                        var box = {
                            categoryid: _vm.typeList[_vm.formValidate1.index].id,
                            categoryName: _vm.typeList[_vm.formValidate1.index].name,
                            days: _vm.formValidate1.days,
                            name: _vm.formValidate1.name
                        }
                        _vm.formValidate.more.push(box)
                        console.log(_vm.formValidate.more)
                        _vm.modalEdit = false
                    } else {
                        _vm.loading = false
                    }
                })
            },
            remove (index) {
                this.formValidate.more.splice(index, 1)
            },
            save () {
                var _vm = this
                var url = ''
                var data = {}
                var detailList = []
                for (var i = 0; i < _vm.formValidate.more.length; i++) {
                    var detailObj = {}
                    detailObj['categoryid'] = _vm.formValidate.more[i]['categoryid']
                    detailObj['days'] = _vm.formValidate.more[i]['days']
                    detailObj['name'] = _vm.formValidate.more[i]['name']
                    detailList.push(detailObj)
                }
                _vm.$refs['formValidate'].validate((valid) => {
                    if(valid) {
                        if(_vm.key) {
                            url = 'guard-webManager/callbackSet/edit.jhtml'
                            data.callbackSet = JSON.stringify({
                                    id: _vm.$route.query.id,
                                    name: _vm.formValidate.name,
                                    remark: _vm.formValidate.remark,
                                    detailList: detailList
                                })
                        } else {
                            url = 'guard-webManager/callbackSet/add.jhtml'
                            data.callbackSet = JSON.stringify({
                                    name: _vm.formValidate.name,
                                    remark: _vm.formValidate.remark,
                                    detailList: detailList
                                })
                        }
                        console.log(data)
                        _vm.$http.post({
                            url: url,
                            data: data,
                            success: function(res){
                                console.log(res)
                                if(res.status == 200 ){
                                    var breadData = [
                                        {
                                            url: '/desktop',
                                            text: '桌面'
                                        },
                                        {
                                            url: '/callbackSet',
                                            text: '回访组管理'
                                        }
                                    ];
                                    _vm.$store.dispatch('setBreadData', breadData);
                                    _vm.$router.push('/callbackSet')
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
                        url: '/callbackSet',
                        text: '回访组管理'
                    }
                ];
                this.$store.dispatch('setBreadData', breadData);
                this.$router.back(-1)
            }
        }
    }
</script>
