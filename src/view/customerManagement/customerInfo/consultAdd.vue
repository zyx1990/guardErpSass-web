/**
 * 添加咨询页面
 */

<template>
    <div class="container-box userPower">
        <div class="container-header">
            <h2>添加咨询</h2>
        </div>
        <div class="container-body">
            <Form ref="formValidate" :model="formValidate" :label-width="100" label-position="right">
                <Form-item label="方式" prop="tool" required>
                    <Select v-model="formValidate.tool" style="width:300px">
                        <Option v-for="item in toolList" :value="item.id" :key="item">{{ item.name }}</Option>
                    </Select>
                </Form-item>
                <Form-item label="咨询项目" prop="objName" required>
                    <Select v-model="formValidate.objName" style="width:300px" @on-change='rr' :clearable='true' ref='select' placeholder='请选择，可多选，排序分先后'>
                        <Option v-for="(item, index) in objList" :value="index" :key="item" >{{ item.value }}</Option>
                    </Select>
                    <div class="tagbox">
                        <Tag closable color="blue" type="border" v-for='(item, index) in tagBox' :key='item' :name='index' @on-close="tagClose">{{item.value}}</Tag>
                    </div>
                </Form-item>
                <Form-item label="咨询内容" prop="content" required>
                    <Input v-model="formValidate.content" type="textarea" :autosize="{minRows: 2,maxRows: 7}" placeholder="请输入咨询内容"></Input>
                </Form-item>
            </Form>
            <div class="footer-btnGroup">
                <Button type="primary" shape="circle" icon="checkmark">保存</Button>
                <Button type="primary" shape="circle" icon="android-arrow-back" @click='back'>返回</Button>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        data () {
            return {
                customerName: '',
                formValidate: {
                    customerId: '',
                    tool: '',
                    content: '',
                    symptomId: '',
                    symptom2Id: '',
                    symptom3Id: '',
                    symptom4Id: '',
                    symptom5Id: '',
                    type: '',
                    objName: '',
                    remark: ''
                },
                toolList: [],
                objList: [
                    {
                        id: '1',
                        value: '6666'
                    },
                    {
                        id: '2',
                        value: '6123126'
                    },
                    {
                        id: '3',
                        value: '65556'
                    }
                ],
                tagBox: [],
                tagIndex: []
            }
        },
        created () {
            if (window.sessionStorage) {
                var lg = window.sessionStorage;
                this.formValidate.customerId= lg.cusId
                this.customerName = lg.cusName
            }
            this.getTool()
        },
        methods: {
            getTool () {
                var _vm = this;
                _vm.$http.get({
                    url: 'guard-webManager/select/toolInfo.jhtml',
                    success: function(res){
                        if(res.status == 200 ){
                            _vm.toolList = res.data.content
                        } else {
                            console.log(res.data.desc)
                        }
                    },
                    error: function(res){
                        console.log(res);
                    }
                });
            },
            rr (aa) {
                var bool = 0
                for(var index of this.tagIndex) {
                    if(aa == index) {
                        bool = 1
                    }
                }
                if(bool == 0 && typeof aa != 'string') {
                    this.tagIndex.push(aa)
                    this.tagBox.push(this.objList[aa])
                }
            },
            tagClose (event, name) {
                this.tagIndex.splice(name, 1)
                this.tagBox.splice(name, 1)
                this.$refs['select'].clearSingleSelect()
            },
            save () {
                var _vm = this
                _vm.$refs['formValidate'].validate((valid) => {
                    if(valid) { 
                        _vm.$http.post({
                            url: 'guard-webManager/customerRecord/addConsult.jhtml',
                            data: _vm.formValidate,
                            success: function(res){
                                if(res.status == 200 ){
                                    var breadData = [
                                        {
                                            url: '/desktop',
                                            text: '桌面'
                                        },
                                        {
                                            url: '/customer',
                                            text: '客户管理'
                                        },
                                        {
                                            url: '/indexConsult',
                                            text: this.customerName
                                        }
                                    ];
                                    _vm.$store.dispatch('setBreadData', breadData);
                                    _vm.$router.push('/indexConsult')
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
                        url: '/customer',
                        text: '客户管理'
                    },
                    {
                        url: '/customerIndex',
                        text: this.customerName
                    }
                ];
                this.$store.dispatch('setBreadData', breadData);
                this.$router.back(-1)
            }
        }
    }
</script>

