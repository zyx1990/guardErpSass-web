/**
 * 添加投诉页面
 */

<template>
    <div class="container-box userPower">
        <div v-if='powerLoad > 0'>
            <div class="container-header">
                <h2>添加投诉</h2>
            </div>
            <div class="container-body">
                <Form ref="formValidate" :model="formValidate" :label-width="100" label-position="right">
                    <Form-item label="选择医院" prop="hospitalId" required>
                        <Select v-model="formValidate.hospitalId" style="width:300px" :disabled='!key'>
                            <Option v-for="item in hospList" :value="item.id" :key="item">{{ item.name }}</Option>
                        </Select>
                    </Form-item>
                    <Form-item label="投诉类型" prop="categoryId" required>
                        <Select v-model="formValidate.categoryId" style="width:300px">
                            <Option v-for="item in typeList" :value="item.id" :key="item">{{ item.name }}</Option>
                        </Select>
                    </Form-item>
                    <Form-item label="投诉医生" prop="name" required>
                        <Select v-model="formValidate.name" style="width:300px">
                            <Option v-for="item in nameList" :value="item.id" :key="item" :label='item.name'>
                                <span>{{item.name}}</span>
                                <span style="float:right;color:#ccc">{{item.hosp}}</span>
                            </Option>
                        </Select>
                    </Form-item>
                    <Form-item label="治疗项目" prop="chargeId" required class='treatAddObj'>
                        <Input v-model="objName" readonly icon="ios-search" placeholder="请选择开发人员" @on-focus="showObj" style="width:300px"></Input>
                    </Form-item>
                    <Form-item label="投诉内容" prop="content" required>
                        <Input v-model="formValidate.content" type="textarea" :autosize="{minRows: 2,maxRows: 7}" placeholder="请输入投诉内容"></Input>
                    </Form-item>
                </Form>
                <div class="footer-btnGroup">
                    <Button type="primary" shape="circle" icon="checkmark" @click='rr'>保存</Button>
                    <Button type="primary" shape="circle" icon="android-arrow-back">返回</Button>
                </div>
                <Modal
                    title="选择治疗项目"
                    width='700'
                    v-model="modal"
                    :closable="false"
                    class-name="vertical-center-modal">
                    <Table height="350" stripe :columns="col" :data="data" @on-row-click='choose'></Table>
                </Modal>
            </div>
        </div>
        <Alert type="error" show-icon v-if='powerLoad == 0'>
            提示信息
            <div slot="desc">
                <p>{{errorMsg}}</p>
                <Button type="primary" shape="circle" icon="android-arrow-back" @click='back'>返回</Button>
            </div>
        </Alert>
        <Spin fix v-if='powerLoad < 0'>
            <Icon type="load-c" size=40 class="demo-spin-icon-load"></Icon>
            <div>Loading</div>
        </Spin>
    </div>
</template>

<script>
    export default {
        data () {
            return {
                cusName: '',
                powerLoad: '-1',
                errorMsg: '',

                key: true,
                formValidate: {
                    hospitalId: '',
                    customerId: '',
                    categoryId: '',
                    userId: '',
                    chargeId: '',
                    content: '',

                    
                    hospital: '',
                    type: '',
                    name: '',
                    remark: '',
                    objNum: '',
                },
                hospList: [],
                typeList: [],
                objName: '',

                nameList: [
                    {
                        id: '1',
                        name: '123',
                        hosp: '545'
                    }
                ],
                modal: false,
                col: [
                    {
                        title: '项目编号',
                        key: 'id'
                    },
                    {
                        title: '项目名称',
                        key: 'chargeName'
                    },
                    {
                        title: '分类',
                        key: 'chargeCategoryName'
                    }
                ],
                data: [],
                
            }
        },
        created () {
            if (window.sessionStorage) {
                var lg = window.sessionStorage;
                this.formValidate.customerId = lg.cusId
                this.cusName = lg.cusName
            }
            this.getId(this.formValidate.customerId)
        },
        methods: {
            // 获取资料
            getId (id) {
                var _vm = this;
                _vm.$http.get({
                    url: 'guard-webManager/customerRecord/complainAdd.jhtml',
                    data: {customerId: id},
                    success: function(res){
                        if(res.status == 200 ){
                            if(res.data.code == 0) {
                                _vm.powerLoad = 1
                                if(res.data.content.IsGroupHospital) {

                                } else {
                                    _vm.key = false
                                }
                                console.log(res)
                                _vm.data = res.data.content.ChargeList
                                _vm.hospList = res.data.content.Hospital
                                _vm.getType()
                            } else {
                                _vm.powerLoad = 0
                                _vm.errorMsg = res.data.desc
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
            //获取投诉类型
            getType () {
                var _vm = this;
                _vm.$http.get({
                    url: 'guard-webManager/select/complainCategoryInfo.jhtml',
                    success: function(res){
                        if(res.status == 200 ){
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
            showObj () {
                this.modal = true  
            },
            choose (data) {
                this.objName = data.chargeName
                this.formValidate.chargeId = data.chargeid
                this.modal = false
            },
            rr () {
                console.log(this.formValidate)
            },
        }
    }
</script>

<style>
   .treatAddObj button {
        margin: 0 10px;
   } 
</style>

