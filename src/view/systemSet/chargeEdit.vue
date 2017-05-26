/**
 * 添加/修改收费项目页面
 */

<template>
    <div class="container-box depositChargeEdit">
        <div class="container-header">
            <h2>{{titMsg}}</h2>
        </div>
        <div class="container-body">
            <Form ref="formValidate" :model="formValidate" :rules="ruleForm" :label-width="100" label-position="right">
                <Form-item label="名称" prop="name" required>
                    <Input v-model="formValidate.name" placeholder="请输入名称" style="width:300px"></Input>
                </Form-item>
                <Form-item label="打印名称" prop="printName">
                    <Input v-model="formValidate.printName" placeholder="请输入打印名称" style="width:300px"></Input>
                </Form-item>
                <Form-item label="拼音码" prop="pinyin" required>
                    <Input v-model="formValidate.pinyin" placeholder="请输入拼音码" style="width:300px"></Input>
                </Form-item>
                <Form-item label="状态" prop="status" v-if='seen'>
                    <Radio-group v-model="formValidate.status">
                        <Radio label="1">启用</Radio>
                        <Radio label="0">禁用</Radio>
                    </Radio-group>
                </Form-item>
                <Form-item label="价格" prop="price" required>
                    <Input v-model="formValidate.price" placeholder="请输入价格" style="width:300px"></Input>
                </Form-item>
                <Form-item label="规格" prop="size">
                    <Input v-model="formValidate.size" placeholder="请输入规格" style="width:300px"></Input>
                </Form-item>
                <Form-item label="代码" prop="code">
                    <Input v-model="formValidate.code" placeholder="请输入代码" style="width:300px"></Input>
                </Form-item>
                <Form-item label="类型" prop='categoryId' required>
                    <Input v-model="categoryName" readonly icon="ios-search" placeholder="请选择类型" @on-focus='addObj' style="width:300px"></Input>
                </Form-item>
                <Form-item label="单位" prop='unitId' required>
                    <Select v-model="formValidate.unitId" clearable style="width:300px">
                        <Option v-for="item in unitList" :value="item.id" :key="item">{{ item.name }}</Option>
                    </Select>
                </Form-item>
                <Form-item label="描述" prop="remark">
                    <Input v-model="formValidate.remark" type="textarea" :autosize="{minRows: 2,maxRows: 5}" placeholder="请输入描述"></Input>
                </Form-item>
                <Form-item label="指定医生" prop="assignDoctor">
                    <Radio-group v-model="formValidate.assignDoctor">
                        <Radio label="1">需要</Radio>
                        <Radio label="0">不需要</Radio>
                    </Radio-group>
                </Form-item>
                <Form-item label="计算成交" prop="isDeal">
                    <Radio-group v-model="formValidate.isDeal">
                        <Radio label="1">计算</Radio>
                        <Radio label="0">不计</Radio>
                    </Radio-group>
                </Form-item>
            </Form>
            <div class="footer-btnGroup">
                <Button type="primary" shape="circle" icon="checkmark" @click='save'>保存</Button>
                <Button type="primary" shape="circle" icon="android-arrow-back" @click='back'>返回</Button>
            </div>
            <Modal
                title="选择项目类型"
                width='700'
                v-model="modal1"
                :closable="false"
                class-name="vertical-center-modal">
                <Table height="350" stripe :columns="col1" :data="objData" @on-row-click='chooseObj'></Table>
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
            const validatePy = (rule, value, callback) => {
                if (value === '') {
                    callback(new Error('请输入拼音码'));
                } else {
                    callback();
                }
            };
            const validatePrice = (rule, value, callback) => {
                if (value === '') {
                    callback(new Error('请输入价格'));
                } else if (/^([1-9]\d*|0)(\.\d{1,2})?$/.test(value)) {
                    callback();
                }  else  {
                    callback(new Error('请输入正确价格'));
                }
            };
            const validateCid = (rule, value, callback) => {
                if (value === '') {
                    callback(new Error('请选择类型'));
                } else {
                    callback();
                }
            };
            const validateUid = (rule, value, callback) => {
                if (value === '') {
                    callback(new Error('请选择单位'));
                } else {
                    callback();
                }
            };
            return {
                seen: true,
                titMsg: '',
                categoryName: '',
                formValidate: {
                    id: '',
                    name: '',
                    printName: '',
                    pinyin: '',
                    status: '',
                    price: '',
                    size: '',
                    code: '',
                    categoryId: '',
                    unitId: '',
                    remark: '',
                    assignDoctor: '1',
                    isDeal: '1'
                },
                unitList: [],
                modal1: false,
                col1: [
                    {
                        title: '名称',
                        key: 'name',
                        render: (h, params) => {
                            const level = params.row.level * 20 + 'px'
                            return h('span', {
                                style: {
                                    paddingLeft: level
                                }
                            }, params.row.name)
                        }
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
                    price: [
                        { validator: validatePrice, trigger: 'blur' }
                    ],
                    categoryId: [
                        { validator: validateCid, trigger: 'change' }
                    ],
                    unitId: [
                        { validator: validateUid, trigger: 'change' }
                    ]
                }
            }
        },
        created () {
            if(this.$route.query.id != 'add') {
                this.titMsg = '修改收费项目'
                this.getId()
            } else {
                this.titMsg = '添加收费项目'
                this.seen = false
            }
        },
        mounted () {
            this.getObjList()
            this.getUnit()
        },
        methods: {
            getId () {
                var _vm = this;
                _vm.$http.get({
                    url: 'guard-webManager/charge/get.jhtml',
                    data: {id: _vm.$route.query.id},
                    success: function(res){
                        if(res.status == 200 ){
                            var dataMsg = res.data.content
                            _vm.formValidate.id = dataMsg.id
                            _vm.formValidate.name = dataMsg.name
                            _vm.formValidate.printName = dataMsg.printname
                            _vm.formValidate.pinyin = dataMsg.pinyin
                            _vm.formValidate.status = dataMsg.status
                            _vm.formValidate.price = dataMsg.price
                            _vm.formValidate.size = dataMsg.size
                            _vm.formValidate.code = dataMsg.code
                            _vm.formValidate.categoryId = dataMsg.categoryid
                            _vm.categoryName = dataMsg.categoryName
                            _vm.formValidate.unitId = dataMsg.unitid
                            _vm.formValidate.remark = dataMsg.remark
                            _vm.formValidate.assignDoctor = dataMsg.assigndoctor
                            _vm.formValidate.isDeal = dataMsg.isdeal
                        } else {
                            console.log(res.data.desc)
                        }
                    },
                    error: function(res){
                        console.log(res);
                    }
                });
            },
            //获取单位列表
            getUnit () {
                var _vm = this;
                _vm.$http.get({
                    url: 'guard-webManager/select/unitInfo.jhtml',
                    success: function(res){
                        if(res.status == 200 ){
                            _vm.unitList = res.data.content
                        } else {
                            console.log(res.data.desc)
                        }
                    },
                    error: function(res){
                        console.log(res);
                    }
                });
            },
            //获取项目分类列表
            getObjList () {
                var _vm = this;
                _vm.$http.get({
                    url: 'guard-webManager/select/chargeCategoryList.jhtml',
                    success: function(res){
                        if(res.status == 200 ){
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
            addObj () {
                this.modal1 = true
            },
            chooseObj (data) {
                this.formValidate.categoryId = data.id
                this.categoryName = data.name
                this.modal1 = false
            },
            save () {
                var _vm = this
                var url = ''
                _vm.$refs['formValidate'].validate((valid) => {
                    if(valid) {
                        if(_vm.seen) {
                            url = 'guard-webManager/charge/update.jhtml'
                        } else {
                            url = 'guard-webManager/charge/add.jhtml'
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
                                            url: '/charge',
                                            text: '收费项目'
                                        }
                                    ];
                                    _vm.$store.dispatch('setBreadData', breadData);
                                    _vm.$router.push('/charge')
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
                        url: '/charge',
                        text: '收费项目'
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

