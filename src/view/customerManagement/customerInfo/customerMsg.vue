/**
 * 客户概况页面
 */

<template>
    <div class="customer-box">
        <div class="customer-item">
            <div class="customer-item-title">
                <h3><Icon type="pricetag"></Icon>客户概况</h3>
            </div>
            <Row :gutter="50">
                <Col span="12" class='person-pic'><img src="" alt="" /></Col>
                <Col span="12">
                    <div class="person-vip"><img src="" alt="" /></div>
                    <div>金卡</div>
                </Col>
            </Row>
        </div>
        <Row :gutter="50">
            <Col span="12">
                <div class="customer-item">
                    <div class="customer-item-title">
                        <h3><Icon type="pricetag"></Icon>客户特征</h3>
                    </div>
                    <div>
                        <Tag color="blue" v-if="typeof cusData.firstvisittime == 'string'">已上门客户</Tag>
                        <Tag color="blue" v-else>未上门客户</Tag>
                        <Tag color="blue" v-if="typeof cusData.firstdealtime == 'string'">已成交客户</Tag>
                        <Tag color="blue" v-else>未成交客户</Tag>
                        <Tag color="blue" v-if="cusData.complainNum > 0">有投诉记录</Tag>
                        <Tag color="blue" v-if="cusData.blackNum > 0">黑名单成员</Tag>
                        <Tag color="blue" v-if="cusData.wechat.length > 0">已绑定微信</Tag>
                    </div>
                </div>
            </Col>
            <Col span="12">
                <div class="customer-item">
                    <div class="customer-item-title">
                        <h3><Icon type="pricetag"></Icon>客户分组</h3>
                        <ul class="header-btn-group">
                            <li class="header-item"><Icon type="information"></Icon>详情</li>
                        </ul>
                    </div>
                    <div>
                        <Tag color="blue">标签一</Tag>
                        <Tag color="red">标签一</Tag>
                    </div>
                </div>
            </Col>
        </Row>
        <Row :gutter="50">
            <Col span="12">
                <div class="customer-item">
                    <div class="customer-item-title">
                        <h3><Icon type="pricetag"></Icon>咨询项目</h3>
                    </div>
                    <div>
                        <Tag color="blue">标签一</Tag>
                        <Tag color="red">标签一</Tag>
                    </div>
                </div>
            </Col>
            <Col span="12">
                <div class="customer-item">
                    <div class="customer-item-title">
                        <h3><Icon type="pricetag"></Icon>客户标签</h3>
                        <ul class="header-btn-group">
                            <li class="header-item"><Icon type="information"></Icon>详情</li>
                        </ul>
                    </div>
                    <div>
                        <Tag color="blue">标签一</Tag>
                        <Tag color="red">标签一</Tag>
                    </div>
                </div>
            </Col>
        </Row> 
        <div class="customer-item">
            <div class="customer-item-title">
                <h3><Icon type="pricetag"></Icon>客户信息</h3>
                <ul class="header-btn-group">
                    <li class="header-item" @click='editCus'><Icon type="edit"></Icon>编辑</li>
                </ul>
            </div>
            <table class="tableEdit">
                <tr>
                    <td class="tit">客户编号</td>
                    <td>{{ cusData.id }}</td>
                    <td class="tit">姓名</td>
                    <td>{{ cusData.name }}</td>
                </tr>
                <tr>
                    <td class="tit">登记人</td>
                    <td>【{{cusData.createUserHospitalName}}】【{{cusData.createUserDeptName}}】【{{cusData.createUserName}}】</td>
                    <td class="tit">登记时间</td>
                    <td>{{cusData.createtime}}</td>
                </tr>
                <tr>
                    <td class="tit">性别</td>
                    <td>{{genderName}}</td>
                    <td class="tit">渠道</td>
                    <td>{{cusData.channelName}}</td>
                </tr>
                <tr>
                    <td class="tit">联系方式</td>
                    <td>{{cusData.mobile}}</td>
                    <td class="tit">备用联系方式</td>
                    <td>
                        <p>{{cusData.mobile2}}</p>
                        <p>{{cusData.mobile3}}</p>
                        <p>{{cusData.mobile4}}</p>
                        <p>{{cusData.mobile5}}</p>
                    </td>
                </tr>
                <tr>
                    <td class="tit">咨询项目</td>
                    <td colspan="3">{{cusData.symptomName}}</td>
                </tr>
                <tr>
                    <td class="tit">开发人员</td>
                    <td>{{cusData.currentExploitUser}}</td>
                    <td class="tit">咨询人员</td>
                    <td>{{cusData.currentManagerUser}}</td>
                </tr>
                <tr>
                    <td class="tit">推荐店家</td>
                    <td>{{cusData.storeName}}</td>
                    <td class="tit">推荐人</td>
                    <td>{{cusData.promoterName}}</td>
                </tr>
                <tr>
                    <td class="tit">地区</td>
                    <td>{{cusData.provinceName}} {{cusData.cityName}} {{cusData.districtName}}</td>
                    <td class="tit">地址</td>
                    <td>{{cusData.address}}</td>
                </tr>
                <tr>
                    <td class="tit">咨询次数</td>
                    <td colspan="3">{{cusData.consultTimes}}</td>
                </tr>
                <tr>
                    <td class="tit">初次咨询时间</td>
                    <td>{{cusData.firstconsulttime}}</td>
                    <td class="tit">最后咨询时间</td>
                    <td>{{cusData.lastconsulttime}}</td>
                </tr>
                <tr>
                    <td class="tit">初诊医院</td>
                    <td>{{cusData.hospitalName}}</td>
                    <td class="tit">初诊日期</td>
                    <td>{{cusData.createtime}}</td>
                </tr>
                <tr>
                    <td class="tit">上门次数</td>
                    <td>{{cusData.visitTimes}}</td>
                    <td class="tit">最近到诊</td>
                    <td>{{cusData.lastvisittime}}</td>
                </tr>
                <tr>
                    <td class="tit">年龄</td>
                    <td>{{cusData.Age}}</td>
                    <td class="tit">生日</td>
                    <td>{{cusData.BirthDay}}</td>
                </tr>
                <tr>
                    <td class="tit">绑定微信</td>
                    <td>{{cusData.wechat}}</td>
                    <td class="tit">绑定时间</td>
                    <td>{{cusData.wechatbindtime}}</td>
                </tr>
                <tr>
                    <td class="tit">档案号</td>
                    <td colspan="3">{{cusData.fn}}</td>
                </tr>
                <tr>
                    <td class="tit">备注</td>
                    <td colspan="3">{{cusData.remark}}</td>
                </tr>
            </table>
        </div>
        <div class="customer-item">
            <div class="customer-item-title">
                <h3><Icon type="pricetag"></Icon>详细信息</h3>
                <ul class="header-btn-group">
                    <li class="header-item" @click='editCus2'><Icon type="edit"></Icon>编辑</li>
                </ul>
            </div>
            <table class="tableEdit">
                <tr>
                    <td class="tit">{{custom1}}</td>
                    <td>{{cusData.custom1}}</td>
                    <td class="tit">{{custom2}}</td>
                    <td>{{cusData.custom2}}</td>
                </tr>
                <tr>
                    <td class="tit">{{custom3}}</td>
                    <td>{{cusData.custom3}}</td>
                    <td class="tit">{{custom4}}</td>
                    <td>{{cusData.custom4}}</td>
                </tr>
                <tr>
                    <td class="tit">{{custom5}}</td>
                    <td>{{cusData.custom5}}</td>
                    <td class="tit">{{custom6}}</td>
                    <td>{{cusData.custom6}}</td>
                </tr>
                <tr>
                    <td class="tit">{{custom7}}</td>
                    <td>{{cusData.custom7}}</td>
                    <td class="tit">{{custom8}}</td>
                    <td>{{cusData.custom8}}</td>
                </tr>
                <tr>
                    <td class="tit">{{custom9}}</td>
                    <td>{{cusData.custom9}}</td>
                    <td class="tit">{{custom10}}</td>
                    <td>{{cusData.custom10}}</td>
                </tr>
            </table>
        </div>
        <Modal
            title="修改客户信息"
            v-model="modalCusEdit"
            :closable="false"
            @on-ok="okCus"
            :loading="loadingCus"
            class-name="vertical-center-modal">
            <Form ref="formCusEdit" :model="formCusEdit" :rules="ruleForm" :label-width="80" label-position="right">
                <Form-item label="姓名" prop="name" required>
                    <Input v-model="formCusEdit.name" placeholder="请输入姓名"></Input>
                </Form-item>
                <Form-item label="性别" prop='gender' required>
                    <Select v-model="formCusEdit.gender" style="width:162px">
                        <Option value="1">男</Option>
                        <Option value="2">女</Option>
                    </Select>
                </Form-item>
                <Form-item label="地区" prop="districtId" required>
                    <Select v-model="formCusEdit.provinceID" style="width:200px" @on-change='getCity'>
                        <Option v-for="item in provinceList" :value="item.id" :key="item">{{ item.name }}</Option>
                    </Select>
                    <Select v-model="formCusEdit.cityID" style="width:200px">
                        <Option v-for="item in cityList" :value="item.id" :key="item">{{ item.name }}</Option>
                    </Select>
                </Form-item>
                <Form-item label="地址" prop="address">
                    <Input v-model="formCusEdit.address" placeholder="请输入地址"></Input>
                </Form-item>
                <Form-item label="年龄" prop="age">
                    <Input v-model="formCusEdit.age" placeholder="请输入年龄"></Input>
                </Form-item>
                <Form-item label="生日" prop='birthday'>
                    <Date-picker :value="birthday" type="date" placement="bottom-start" format="MM-dd"placeholder="选择日期" style="width: 180px" @on-change='setBirthday'></Date-picker>
                </Form-item>
                <Form-item label="档案号" prop="fn">
                    <Input v-model="formCusEdit.fn" placeholder="请输入档案号"></Input>
                </Form-item>
                <Form-item label="备注" prop="remark">
                    <Input v-model="formCusEdit.remark" type="textarea" :autosize="{minRows: 2,maxRows: 5}" placeholder="请输入备注"></Input>
                </Form-item>
            </Form>
        </Modal>
        <Modal
            title="修改客户自定义信息"
            v-model="modalCusEdit2"
            :closable="false"
            @on-ok="okCus2"
            :loading="loadingCus2"
            class-name="vertical-center-modal">
            <Form ref="formCusEdit2" :model="formCusEdit2" :label-width="100" label-position="right">
                <Form-item :label="custom1">
                    <Input v-model="formCusEdit2.custom1"></Input>
                </Form-item>
                <Form-item :label="custom2">
                    <Input v-model="formCusEdit2.custom2"></Input>
                </Form-item>
                <Form-item :label="custom3">
                    <Input v-model="formCusEdit2.custom3"></Input>
                </Form-item>
                <Form-item :label="custom4">
                    <Input v-model="formCusEdit2.custom4"></Input>
                </Form-item>
                <Form-item :label="custom5">
                    <Input v-model="formCusEdit2.custom5"></Input>
                </Form-item>
                <Form-item :label="custom6">
                    <Input v-model="formCusEdit2.custom6"></Input>
                </Form-item>
                <Form-item :label="custom7">
                    <Input v-model="formCusEdit2.custom7"></Input>
                </Form-item>
                <Form-item :label="custom8">
                    <Input v-model="formCusEdit2.custom8"></Input>
                </Form-item>
                <Form-item :label="custom9">
                    <Input v-model="formCusEdit2.custom9"></Input>
                </Form-item>
                <Form-item :label="custom10">
                    <Input v-model="formCusEdit2.custom10"></Input>
                </Form-item>
            </Form>
        </Modal>
    </div>
</template>

<script>
    export default {
        data () {
            return {
                //客户信息
                cusData: {
                    id: '',
                    name: '',
                    createUserHospitalName: '',
                    createUserDeptName: '',
                    createUserName: '',
                    createtime: '',
                    gender: '',
                    channelName: '',
                    mobile: '',
                    mobile2: '',
                    mobile3: '',
                    mobile4: '',
                    mobile5: '',
                    symptomName: '',
                    currentExploitUser: '',
                    currentManagerUser: '',
                    storeName: '',
                    promoterName: '',
                    provinceName: '',
                    provinceID: '',
                    cityName: '',
                    cityID: '',
                    districtName: '',
                    districtid: '',
                    address: '',
                    consultTimes: '',
                    firstconsulttime: '',
                    lastconsulttime: '',
                    hospitalName: '',
                    createtime: '',
                    visitTimes: '',
                    lastvisittime: '',
                    Age: '',
                    BirthDay: '',
                    wechat: '',
                    wechatbindtime: '',
                    fn: '',
                    remark: '',
                    custom1: '',
                    custom2: '',
                    custom3: '',
                    custom4: '',
                    custom5: '',
                    custom6: '',
                    custom7: '',
                    custom8: '',
                    custom9: '',
                    custom10: '',
                    firstvisittime: '',
                    firstdealtime: '',
                    complainNum: '',
                    blackNum: '',
                },
                formCusEdit: {
                    id: '',
                    name: '',
                    gender: '',
                    provinceID: '',
                    cityID: '',
                    districtId: '',
                    age: '',
                    birthday: '',
                    fn: '',
                    address: '',
                    remark: '',
                },
                birthday: '',
                modalCusEdit: false,
                loadingCus: true,
                provinceList: [],
                cityList: [],
                //客户自定义信息
                custom1: '',
                custom2: '',
                custom3: '',
                custom4: '',
                custom5: '',
                custom6: '',
                custom7: '',
                custom8: '',
                custom9: '',
                custom10: '',
                modalCusEdit2: false,
                loadingCus2: true,
                formCusEdit2: {
                    custom1: '',
                    custom2: '',
                    custom3: '',
                    custom4: '',
                    custom5: '',
                    custom6: '',
                    custom7: '',
                    custom8: '',
                    custom9: '',
                    custom10: '',
                },
                ruleForm: {}
            }
        },
        computed: {
            genderName () {
                if(this.cusData.gender == '1') {
                    return '男'
                } else if (this.cusData.gender == '2') {
                    return '女'
                }
            }
        },
        methods: {
            
        },
        created () {
            if (window.sessionStorage) {
                var lg = window.sessionStorage;
            }
            this.getId(lg.cusId)
        },
        mounted () {
            this.getProvince()
        },
        methods: {
            getId (id) {
                var _vm = this;
                _vm.$http.get({
                    url: 'guard-webManager/customerRecord/customerInfo.jhtml',
                    data: {id: id},
                    success: function(res){
                        if(res.status == 200 ){
                            console.log(res.data.content)
                            // 基本客户信息
                            _vm.cusData = res.data.content.Customer
                            _vm.cusData.currentExploitUser = res.data.content.currentExploitUser
                            _vm.cusData.currentManagerUser = res.data.content.currentManagerUser
                            _vm.cusData.hospitalName = res.data.content.firstVisit.hospitalName
                            _vm.cusData.createtime = res.data.content.firstVisit.createtime
                            _vm.cusData.visitTimes = res.data.content.visitTimes
                            _vm.cusData.Age = res.data.content.Age
                            _vm.cusData.BirthDay = res.data.content.BirthDay
                            //客户自定义信息
                            _vm.custom1 = res.data.content.custom1
                            _vm.custom2 = res.data.content.custom2
                            _vm.custom3 = res.data.content.custom3
                            _vm.custom4 = res.data.content.custom4
                            _vm.custom5 = res.data.content.custom5
                            _vm.custom6 = res.data.content.custom6
                            _vm.custom7 = res.data.content.custom7
                            _vm.custom8 = res.data.content.custom8
                            _vm.custom9 = res.data.content.custom9
                            _vm.custom10 = res.data.content.custom10
                        } else {
                            console.log(res.data.desc)
                        }
                    },
                    error: function(res){
                        console.log(res);
                    }
                });
            },
            //获取省份
            getProvince () {
                var _vm = this;
                _vm.$http.get({
                    url: 'guard-webManager/select/provinceInfo.jhtml',
                    data: {name: null},
                    success: function(res){
                        if(res.status == 200 ){
                            _vm.provinceList = res.data.content
                        } else {
                            console.log(res.data.desc)
                        }
                    },
                    error: function(res){
                        console.log(res);
                    }
                });
            },
            //获取城市
            getCity (id) {
                var _vm = this;
                _vm.$http.get({
                    url: 'guard-webManager/select/cityList.jhtml',
                    data: {id: id},
                    success: function(res){
                        if(res.status == 200 ){
                            _vm.cityList = res.data.content
                        } else {
                            console.log(res.data.desc)
                        }
                    },
                    error: function(res){
                        console.log(res);
                    }
                });
            },
            //设置生日
            setBirthday (date) {
                this.formCusEdit.birthday = date
            },
            editCus () {
                var _vm = this;
                _vm.$refs['formCusEdit'].resetFields();
                for (let n in _vm.formCusEdit) {
                    _vm.formCusEdit[n] = _vm.cusData[n]
                }
                _vm.formCusEdit.gender = _vm.cusData.gender + ''
                _vm.formCusEdit.districtId = _vm.cusData.districtid
                _vm.formCusEdit.birthday = _vm.cusData.districtid.BirthDay
                _vm.birthday = _vm.cusData.districtid.BirthDay
                _vm.modalCusEdit = true
            },
            editCus2 () {
                var _vm = this;
                for (let n in _vm.formCusEdit2) {
                    _vm.formCusEdit2[n] = _vm.cusData[n]
                }
                _vm.modalCusEdit2 = true
            },
            okCus () {},
            okCus2 () {},
        }
    }
</script>

<style scoped>
    .customer-item .person-pic img {
        display: block;
        width: 120px;
        height: 120px;
    }
    .customer-item .person-vip img {
        display: block;
        width: 64px;
        height: 64px;
    }
</style>




