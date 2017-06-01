/**
 * 添加/修改套餐页面
 */

<template>
    <div class="container-box depositChargeEdit">
        <div class="container-header">
            <h2>{{titMsg}}</h2>
        </div>
        <div class="container-body">
            <Form :label-width="100" ref="formValidate" :rules="ruleForm" :model="formValidate" label-position="right">
                <Form-item label="名称" prop="name" required style="width:400px">
                    <Input v-model="formValidate.name" placeholder="请输入名称"></Input>
                </Form-item>
                <Form-item label="拼音码" prop="pinyin" required style="width:400px">
                    <Input v-model="formValidate.pinyin" placeholder="请输入拼音码"></Input>
                </Form-item>
                <Form-item label="状态" prop="status" v-if='key'>
                    <Radio-group v-model="formValidate.status">
                        <Radio label="1">启用</Radio>
                        <Radio label="0">禁用</Radio>
                    </Radio-group>
                </Form-item>
                <Form-item label="时间限制" prop="timeLimit">
                    <Checkbox v-model="single" @on-change='singleC'>时间限制</Checkbox>
                </Form-item>
                <Form-item label="天数" prop="days" style="width:400px">
                    <Input v-model="formValidate.days" placeholder="请输入天数"></Input>
                </Form-item>
                <Form-item label="起始时间" prop="timeStart">
                    <Radio-group v-model="formValidate.timeStart">
                        <Radio label="0">从购买时算</Radio>
                        <Radio label="1">从第一次消费时算</Radio>
                    </Radio-group>
                </Form-item>
                <Form-item label="备注" prop="remark">
                    <Input v-model="formValidate.remark" type="textarea" :autosize="{minRows: 2,maxRows: 5}" placeholder="请输入备注"></Input>
                </Form-item>
                <Form-item label="详细" prop="detailListStr" required>
                    <Table stripe :columns="col" :data="body"></Table>
                    <Button type="primary" shape="circle" icon="plus-round" style='margin-top:10px;' @click='add'>增加</Button>
                </Form-item>
            </Form>
            <div class="footer-btnGroup">
                <Button type="primary" shape="circle" icon="checkmark" @click='save'>保存</Button>
                <Button type="primary" shape="circle" icon="android-arrow-back" @click='back'>返回</Button>
            </div>
            <Modal
                title="增加项目信息"
                v-model="modal"
                :closable="false"
                @on-ok="ok"
                :loading="loading"
                class-name="vertical-center-modal">
                <Form ref="formAdd" :model="formAdd" :rules="ruleAdd" :label-width="100" label-position="right">
                    <Form-item label="项目" prop="chargeid" required>
                        <Input v-model="formAdd.chargeName" readonly icon="ios-search" placeholder="请选择项目" @on-focus='show'></Input>
                    </Form-item>
                    <Form-item label="数量" prop="num" required>
                        <Input v-model="formAdd.num" placeholder="请输入数量"></Input>
                    </Form-item>
                    <Form-item label="金额" prop="amount" required>
                        <Input v-model="formAdd.amount" placeholder="请输入金额"></Input>
                    </Form-item>
                </Form>
            </Modal>
            <Modal
                title="选择收费项目"
                width='700'
                v-model="modal2"
                :closable="false"
                class-name="vertical-center-modal">
                <Form  :label-width="50" inline ref='formSearch' :model='formSearch'>
                    <Form-item label="名称" prop='name'>
                        <Input v-model="formSearch.name" placeholder="请输入名称"></Input>
                    </Form-item>
                    <Form-item label="拼音码" prop='pinyin'>
                        <Input v-model="formSearch.pinyin" placeholder="请输入拼音码"></Input>
                    </Form-item>
                    <ul class="header-btn-group not-float">
                        <li class="header-item" @click="getObj(formSearch)"><Icon type="search"></Icon>查询</li>
                        <li class="header-item" @click="handleReset('formSearch')"><Icon type="refresh"></Icon>重置</li>
                    </ul>
                </Form>
                <Table height="350" stripe :columns="col2" :data="objData" @on-row-click='chooseObj'></Table>
            </Modal>
        </div>
    </div>
</template>

<script>
    export default {
        data () {
            const validateName = (rule, value, callback) => {
                if (value === '') {
                    callback(new Error('请输入姓名'));
                } else {
                    callback();
                }
            };
            const validatePy= (rule, value, callback) => {
                if (value === '') {
                    callback(new Error('请输入拼音码'));
                } else {
                    callback();
                }
            };
            const validateBody= (rule, value, callback) => {
                if (value == '') {
                    callback(new Error('请选择项目'));
                } else {
                    callback();
                }
            };
            const validatePrice = (rule, value, callback) => {
                if (value === '') {
                    callback(new Error('请输入价格'));
                } else if (/^\+?[1-9][0-9]*$/.test(value)) {
                    callback();
                }  else  {
                    callback(new Error('请输入正整数'));
                }
            };
            const validateNUm = (rule, value, callback) => {
                if (value === '') {
                    callback(new Error('请输入数量'));
                } else if (/^\+?[1-9][0-9]*$/.test(value)) {
                    callback();
                }  else  {
                    callback(new Error('请输入正整数'));
                }
            };
            return {
                key: true,
                titMsg: '',
                single: false,
                formValidate: {
                    id: '',
                    name: '',
                    pinyin: '',
                    status: '',
                    timeLimit: '0',
                    days: '',
                    timeStart: '0',
                    remark: '',
                    detailListStr: ''
                },
                body: [],
                col: [
                    {
                        title: '项目编号',
                        key: 'chargeid'
                    },
                    {
                        title: '项目名称',
                        key: 'chargeName'
                    },
                    {
                        title: '规格',
                        key: 'chargeSize'
                    },
                    {
                        title: '数量',
                        key: 'num'
                    },
                    {
                        title: '金额',
                        key: 'amount'
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
                modal: false,
                loading: true,
                formAdd: {
                    chargeName: '',
                    chargeid: '',
                    chargeSize: '',
                    num: '',
                    amount: ''
                },
                modal2: false,
                formSearch: {
                    name: '',
                    pinyin: '',
                    categoryId: ''
                },
                col2: [
                    {
                        title: '编号',
                        key: 'id'
                    },
                    {
                        title: '名称',
                        key: 'name'
                    },
                    {
                        title: '规格',
                        key: 'size'
                    },
                    {
                        title: '拼音码',
                        key: 'pinYin'
                    },
                    {
                        title: '类型',
                        key: 'categoryName'
                    },
                    {
                        title: '价格',
                        key: 'price'
                    },
                    {
                        title: '操作部门',
                        key: 'deptName'
                    }
                ],
                objData: [],
                ruleForm: {
                    name: [
                        { validator: validateName, trigger: 'blur' }
                    ],
                    pinyin: [
                        { validator: validatePy, trigger: 'blur' }
                    ],
                    detailListStr: [
                        { validator: validateBody, trigger: 'change' }
                    ]
                },
                ruleAdd: {
                    chargeid: [
                        { validator: validateBody, type: 'number', trigger: 'change' }
                    ],
                    num: [
                        { validator: validateNUm, trigger: 'blur' }
                    ],
                    amount: [
                        { validator: validatePrice, trigger: 'blur' }
                    ]
                },
            }
        },
        watch: {
            body (val) {
                this.formValidate.detailListStr = JSON.stringify(val)
            }
        },
        created () {
            if(this.$route.query.id != 'add') {
                this.titMsg = '修改套餐'
                this.getId()
            } else {
                this.titMsg = '添加套餐'
                this.key = false
            }
        },
        mounted () {
        },
        methods: {
            //获取id
            getId () {
                var _vm = this;
                _vm.$http.get({
                    url: 'guard-webManager/chargeSet/detailList.jhtml',
                    data: {id: _vm.$route.query.id},
                    success: function(res){
                        if(res.status == 200 ){
                            console.log(res.data.content)
                            _vm.formValidate.id = res.data.content.id
                            _vm.formValidate.name = res.data.content.name
                            _vm.formValidate.pinyin = res.data.content.pinyin
                            _vm.formValidate.status = res.data.content.status
                            _vm.formValidate.timeLimit = res.data.content.timelimit
                            if(res.data.content.timelimit == 0) {
                                _vm.single = false
                            } else {
                                _vm.single = true
                            }
                            _vm.formValidate.days = res.data.content.days
                            _vm.formValidate.timeStart = res.data.content.timestart
                            _vm.formValidate.remark = res.data.content.remark
                            _vm.body = res.data.content.detailList
                        } else {
                            console.log(res.data.desc)
                        }
                    },
                    error: function(res){
                        console.log(res);
                    }
                });
            },
            singleC (bool) {
                if(bool) {
                    this.formValidate.timeLimit = '1'
                } else {
                    this.formValidate.timeLimit = '0'
                }
            },
            //获取项目列表
            getObj (form) {
                var _vm = this;
                _vm.$http.get({
                    url: 'guard-webManager/select/chargeList.jhtml',
                    data: form,
                    success: function(res){
                        if(res.status == 200 ){
                            console.log(res.data.content)
                            _vm.objData = res.data.content
                        } else {
                            console.log(res.data.desc)
                        }
                    },
                    error: function(res){
                        console.log(res);
                    }
                });
            },
            //添加项目
            add () {
                this.formAdd.chargeName = ''
                this.$refs['formAdd'].resetFields();
                this.modal = true
            },
            //查询项目
            show () {
                this.modal2 = true
            },
            handleReset (name) {
                this.$refs[name].resetFields();
            },
            //选择项目
            chooseObj (data) {
                this.formAdd.chargeName = data.categoryName
                this.formAdd.chargeid = data.id
                this.formAdd.chargeSize = data.size
                this.modal2 = false
            },
            //确定增加项目
            ok () {
                var _vm = this;
                _vm.$refs['formAdd'].validate((valid) => {
                    if(valid) {
                        _vm.body.push(JSON.parse(JSON.stringify(_vm.formAdd)))
                        _vm.modal = false
                    }
                })
                console.log(_vm.body)
            },
            remove (index) {
                this.body.splice(index, 1)
            },
            save () {
                var _vm = this
                var url = ''
                _vm.$refs['formValidate'].validate((valid) => {
                    if(valid) {
                        if(_vm.key) {
                            url = 'guard-webManager/chargeSet/update.jhtml'
                        } else {
                            url = 'guard-webManager/chargeSet/add.jhtml'
                        }
                        _vm.$http.post({
                            url: url,
                            data: _vm.formValidate,
                            success: function(res){
                                if(res.status == 200 ){
                                    var breadData = [
                                        {
                                            url: '/desktop',
                                            text: '桌面'
                                        },
                                        {
                                            url: '/chargeSet',
                                            text: '套餐'
                                        }
                                    ];
                                    _vm.$store.dispatch('setBreadData', breadData);
                                    _vm.$router.push('/chargeSet')
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
                        url: '/chargeSet',
                        text: '套餐'
                    }
                ];
                this.$store.dispatch('setBreadData', breadData);
                this.$router.back(-1)
            }
                
        }
    }
</script>

<style>
    .depositChargeEdit .radioModal .ivu-radio-wrapper {
        display: block;
    }
</style>
