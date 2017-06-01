/**
 * 客户管理
 */

<template>
    <div class="container-box" ref="containerBox">
        <div class="container-header">
            <h2>客户列表</h2>
        </div>
        <div class="container-body">
            <Form :label-width="100" inline :model="formSearch" ref='formSearch'>
                <Form-item label="编号" prop='id'>
                    <Input v-model="formSearch.id" placeholder="请输入编号"></Input>
                </Form-item>
                <Form-item label="姓名" prop='name'>
                    <Input v-model="formSearch.name" placeholder="请输入姓名"></Input>
                </Form-item>
                <Form-item label="手机/电话" prop='mobile'>
                    <Input v-model="formSearch.mobile" placeholder="请输入手机/电话"></Input>
                </Form-item>
                <Form-item label="档案号" prop='fn'> 
                    <Input v-model="formSearch.fn" placeholder="请输入档案号"></Input>
                </Form-item>
                <Form-item label="性别" prop='gender'>
                    <Select v-model="formSearch.gender" style="width:162px">
                        <Option value="1">男</Option>
                        <Option value="2">女</Option>
                    </Select>
                </Form-item>
                <Form-item label="上门状态" prop='visitStatus'>
                    <Select v-model="formSearch.visitStatus" style="width:162px">
                        <Option value="1">已上门</Option>
                        <Option value="0">未上门</Option>
                    </Select>
                </Form-item>
                <Form-item label="成交状态" prop='dealStatus'>
                    <Select v-model="formSearch.dealStatus" style="width:162px">
                        <Option value="1">已成交</Option>
                        <Option value="0">未成交</Option>
                    </Select>
                </Form-item>
                <Form-item label="微信状态" prop='wechatStatus'>
                    <Select v-model="formSearch.wechatStatus" style="width:162px">
                        <Option value="1">已绑定</Option>
                        <Option value="0">未绑定</Option>
                    </Select>
                </Form-item>
                <Form-item label="渠道" prop='channelId'>
                    <Select v-model="formSearch.channelId" clearable style="width:162px">
                        <Option v-for="item in channelList" :value="item.id" :key="item" :disabled="item.status == 0">{{ item.name }}</Option>
                    </Select>
                </Form-item>
                <Form-item label="主咨询项目" prop='mainSymptomId'>
                    <Select v-model="formSearch.mainSymptomId" clearable style="width:162px">
                        <Option v-for="item in mainSymptomList" :value="item.id" :key="item" :disabled="item.status == 0">{{ item.name }}</Option>
                    </Select>
                </Form-item>
                <Form-item label="咨询项目" prop='symptomId'>
                    <Select v-model="formSearch.symptomId" clearable style="width:162px">
                        <Option v-for="item in symptomList" :value="item.id" :key="item" :disabled="item.status == 0">{{ item.name }}</Option>
                    </Select>
                </Form-item>
                <Form-item label="会员类型" prop='memberCategoryId'>
                    <Select v-model="formSearch.memberCategoryId" clearable style="width:162px">
                        <Option v-for="item in menberList" :value="item.id" :key="item">{{ item.name }}</Option>
                    </Select>
                </Form-item>
                <Form-item label="客户组" prop='customerGroupId'>
                    <Select v-model="custGroupList" clearable style="width:162px">
                        <Option v-for="item in custGroupList" :value="item.id" :key="item">{{ item.name }}</Option>
                    </Select>
                </Form-item>
                <Form-item label="结果集" prop='customerFilterId'>
                    <Select v-model="custFilterList" clearable style="width:162px">
                        <Option v-for="item in custFilterList" :value="item.id" :key="item">{{ item.name }}</Option>
                    </Select>
                </Form-item>
                <Form-item label="到诊医院" prop='visitHospitalId'>
                    <Input type="text"></Input>
                </Form-item>
                <Form-item label="预约医院" prop='appointmentHospitalId'>
                    <Input type="text"></Input>
                </Form-item>
                <Form-item label="开发人员" prop='exploitUserId'>
                    <Input v-model="exploitUserName" readonly icon="ios-search" placeholder="请选择开发人员" @on-focus="showUser('exploit')" style="width:162px"></Input>
                </Form-item>
                <Form-item label="咨询人员" prop='managerUserId'>
                    <Input v-model="managerUserName" readonly icon="ios-search" placeholder="请选择咨询人员" @on-focus="showUser('manager')" style="width:162px"></Input>
                </Form-item>
                <Form-item label="标签" prop='tagId'>
                    <Input v-model="tagName" readonly icon="ios-search" placeholder="请选择标签" @on-focus="showTag" style="width:162px"></Input>
                </Form-item>
                <Form-item label="推荐店家" prop='storeId'>
                    <Input type="text"></Input>
                </Form-item>
                <Form-item label="初诊日期" prop='firstDate'>
                    <Date-picker type="daterange" placement="bottom-start" placeholder="选择日期" style="width: 180px" :options='options' @on-change='firstTime' ref='firstDate'></Date-picker>
                </Form-item>
                <Form-item label="最后光临" prop='lastDate'>
                    <Date-picker type="daterange" placement="bottom-start" placeholder="选择日期" style="width: 180px" :options='options' @on-change='lastTime' ref='lastDate'></Date-picker>
                </Form-item>
                <Form-item label="登记日期" prop='createDate'>
                    <Date-picker type="daterange" placement="bottom-start" placeholder="选择日期" style="width: 180px" :options='options' @on-change='createTime' ref='createDate'></Date-picker>
                </Form-item>
                <Form-item label="最后咨询" prop='consultDate'>
                    <Date-picker type="daterange" placement="bottom-start" placeholder="选择日期" style="width: 180px" :options='options' @on-change='consultTime' ref='consultDate'></Date-picker>
                </Form-item>
                <Form-item label="预约日期" prop='appointmentDate'>
                    <Date-picker type="daterange" placement="bottom-start" placeholder="选择日期" style="width: 180px" :options='options' @on-change='appointmentTime' ref='appointmentDate'></Date-picker>
                </Form-item>
                <Form-item label="净收总额(min)" prop='cashCardTotalStart'>
                    <Input v-model="formSearch.cashCardTotalStart" placeholder="请输入最小净收"></Input>
                </Form-item>
                <Form-item label="净收总额(max)" prop='cashCardTotalEnd'>
                    <Input v-model="formSearch.cashCardTotalEnd" placeholder="请输入最大净收"></Input>
                </Form-item>
                <Form-item label="自定义字段" prop='customType'>
                    <Input type="text"></Input>
                </Form-item>
                <Form-item label="输入内容" prop='customContent'>
                    <Input type="text"></Input>
                </Form-item>
                <ul class="header-btn-group not-float">
                    <li class="header-item" @click="getList('1', '10', formSearch)"><Icon type="search"></Icon>查询</li>
                    <li class="header-item" @click="handleReset('formSearch')"><Icon type="refresh"></Icon>重置</li>
                </ul>
                <Form-item label="自定义展示表格数据">
                    <Checkbox-group v-model="tableColChecked" @on-change="changeTableCol">
                        <Checkbox label="id">客户编号</Checkbox>
                        <Checkbox label="name">姓名</Checkbox>
                        <Checkbox label="gender">性别</Checkbox>
                        <Checkbox label="birthyear">年龄</Checkbox>
                        <Checkbox label="memberCategoryName">会员</Checkbox>
                        <Checkbox label="channelName">渠道</Checkbox>
                        <Checkbox label="symptomName">咨询项目</Checkbox>
                        <Checkbox label="exploitUserName">开发人员</Checkbox>
                        <Checkbox label="managerUserName">咨询人员</Checkbox>
                        <Checkbox label="firstvisittime">上门状态</Checkbox>
                        <Checkbox label="firstdealtime">成交状态</Checkbox>
                        <Checkbox label="firstDate">初诊日期</Checkbox>
                        <Checkbox label="hospital">初诊医院</Checkbox>
                        <Checkbox label="lastDate">最后光临</Checkbox>
                        <Checkbox label="orderDate">预约到诊日期</Checkbox>
                        <Checkbox label="orderHosp">预约医院</Checkbox>
                        <Checkbox label="registerDate">登记时间</Checkbox>
                        <Checkbox label="registerHosp">登记医院</Checkbox>
                        <Checkbox label="registerPeo">登记人员</Checkbox>
                        <Checkbox label="shop">推荐店家</Checkbox>
                    </Checkbox-group>
                </Form-item>
            </Form>
            <Table stripe :columns="columns" :data="data"></Table>
            <div class="table-page">
                <div class="table-info">当前第{{pageNumber}}页，共{{totalPages}}页，总共{{total}}条记录</div>
                <Page class="table-paginate" :total="totalNum" @on-change='changePage' :current='pageNum'></Page>
            </div>
            <Modal
                :title="titUser"
                width='700'
                v-model="modalUser"
                :closable="false"
                class-name="vertical-center-modal">
                <Form  :label-width="50" inline ref='formUser' :model='formUser'>
                    <Form-item label="部门" prop='deptId'>
                        <Select v-model="formUser.deptId" clearable style="width:162px">
                            <Option v-for="item in deptList" :value="item.id" :key="item">{{ item.name }}</Option>
                        </Select>
                    </Form-item>
                    <Form-item label="账号" prop='account'>
                        <Input v-model="formUser.account" placeholder="请输入账号"></Input>
                    </Form-item>
                    <Form-item label="姓名" prop='name'>
                        <Input v-model="formUser.name" placeholder="请输入姓名"></Input>
                    </Form-item>
                    <ul class="header-btn-group not-float">
                        <li class="header-item" @click="getUser(formUser)"><Icon type="search"></Icon>查询</li>
                        <li class="header-item" @click="handleReset('formUser')"><Icon type="refresh"></Icon>重置</li>
                    </ul>
                </Form>
                <Table height="350" stripe :columns="userCol" :data="userData" @on-row-click='chooseUser'></Table>
            </Modal>
            <Modal
                title="选择标签"
                width='700'
                v-model="modalTag"
                :closable="false"
                class-name="vertical-center-modal">
                <Form  :label-width="50" inline ref='formTag' :model='formTag'>
                    <Form-item label="名称" prop='name'>
                        <Input v-model="formTag.name" placeholder="请输入名称"></Input>
                    </Form-item>
                    <ul class="header-btn-group not-float">
                        <li class="header-item" @click="getTag(formTag)"><Icon type="search"></Icon>查询</li>
                        <li class="header-item" @click="handleReset('formTag')"><Icon type="refresh"></Icon>重置</li>
                    </ul>
                </Form>
                <Table height="350" stripe :columns="tagCol" :data="tagData" @on-row-click='chooseTag'></Table>
            </Modal>
        </div>
    </div>
</template>

<script>
    export default {
        data () {
            return {
                tableColChecked: ['id', 'name', 'gender', 'birthyear', 'memberCategoryName', 'channelName', 'symptomName', 'exploitUserName', 'managerUserName', 'firstvisittime', 'firstdealtime', 'firstDate', 'hospital', 'lastDate', 'orderDate', 'orderHosp', 'registerDate', 'registerHosp', 'registerPeo', 'shop' ],
                columns: [],
                data: [],
                total: '',
                totalPages: '',
                pageNumber: '1',
                formSearch: {
                    id: '',
                    name: '',
                    mobile: '',
                    fn: '',
                    gender: '',
                    channelId: '',
                    mainSymptomId: '',
                    symptomId: '',
                    memberCategoryId: '',
                    exploitUserId: '',
                    managerUserId: '',
                    firstVisitStart: '',
                    firstVisitEnd: '',
                    lastVisitStart: '',
                    lastVisitEnd: '',
                    createStart: '',
                    createEnd: '',
                    lastConsultStart: '',
                    lastConsultEnd: '',
                    visitStatus: '',
                    dealStatus: '',
                    wechatStatus: '',
                    cashCardTotalStart: '',
                    cashCardTotalEnd: '',
                    customerGroupId: '',
                    customerFilterId: '',
                    tagId: '',
                    storeId: '',
                    appointmentStart: '',
                    appointmentEnd: '',
                    appointmentHospitalId: '',
                    visitHospitalId: '',
                    customType: '',
                    customContent: ''
                },
                channelList: [],
                mainSymptomList: [],
                symptomList: [],
                menberList: [],
                custGroupList: [],
                custFilterList: [],
                exploitUserName: '',
                managerUserName: '',
                modalUser: false,
                titUser: '',
                deptList: [],
                formUser: {
                    hospitalId: '1',
                    account: '',
                    name: '',
                    deptId: ''
                },
                userKey: true,
                userCol: [
                    {
                        title: '账号',
                        key: 'account'
                    },
                    {
                        title: '姓名',
                        key: 'name'
                    },
                    {
                        title: '部门',
                        key: 'deptName'
                    },
                    {
                        title: '性别',
                        key: 'gender'
                    }
                ],
                userData: [],
                tagName: '',
                modalTag: false,
                formTag: {
                    name: ''
                },
                tagCol: [
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
                tagData: [],
                options: {
                    disabledDate (date) {
                        return date && date.valueOf() > Date.now();
                    }
                },
                firstDate: [],
                lastDate: [],
                createDate: [],
                consultDate: [],
                appointmentDate: [],
            }
        },
        computed: {
            totalNum: function () {
                return this.total * 1
            },
            pageNum: function () {
                return this.pageNumber * 1
            },
        },
        created () {
            this.getList('1', '10', this.formSearch)
        },
        mounted () {
            this.changeTableCol();
            this.getChannelList()
            this.getSymptomList()
            this.getMenberList()
            this.getDept('1')
            this.getCustGroupList('1')
            this.getCustFilterList('1')
        },
        methods: {
            //获取分页
            getList(pageNumber, pageSize, form) {
                var _vm = this;
                form['pageNumber'] = pageNumber
                form['pageSize'] = pageSize
                _vm.$http.get({
                    url: 'guard-webManager/customer/list.jhtml',
                    data: form,
                    success: function(res){
                        if(res.status == 200 ){
                            console.log(res.data.content.content)
                            _vm.total = res.data.content.total
                            _vm.pageNumber = res.data.content.pageNumber
                            _vm.totalPages = res.data.content.totalPages
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
            //获取渠道下拉
            getChannelList () {
                var _vm = this;
                _vm.$http.get({
                    url: 'guard-webManager/select/channelInfo.jhtml',
                    success: function(res){
                        if(res.status == 200 ){
                            _vm.channelList = res.data.content
                        } else {
                            console.log(res.data.desc)
                        }
                    },
                    error: function(res){
                        console.log(res);
                    }
                });
            },
            //获取咨询项目下拉
            getSymptomList () {
                var _vm = this;
                _vm.$http.get({
                    url: 'guard-webManager/select/symptomInfo.jhtml',
                    success: function(res){
                        if(res.status == 200 ){
                            _vm.symptomList = res.data.content
                            _vm.mainSymptomList = res.data.content
                        } else {
                            console.log(res.data.desc)
                        }
                    },
                    error: function(res){
                        console.log(res);
                    }
                });
            },
            //获取会员下拉
            getMenberList () {
                var _vm = this;
                _vm.$http.get({
                    url: 'guard-webManager/select/memberCategoryInfo.jhtml',
                    success: function(res){
                        if(res.status == 200 ){
                            _vm.menberList = res.data.content
                        } else {
                            console.log(res.data.desc)
                        }
                    },
                    error: function(res){
                        console.log(res);
                    }
                });
            },
            //获取客户组下拉列表
            getCustGroupList (id) {
                var _vm = this;
                _vm.$http.get({
                    url: 'guard-webManager/select/userCustomerGroupInfo.jhtml',
                    data: {userId: id},
                    success: function(res){
                        if(res.status == 200 ){
                            _vm.custGroupList = res.data.content
                        } else {
                            console.log(res.data.desc)
                        }
                    },
                    error: function(res){
                        console.log(res);
                    }
                });
            },
            //获取结果集下拉列表
            getCustFilterList (id) {
                var _vm = this;
                _vm.$http.get({
                    url: 'guard-webManager/select/userCustomerFilterInfo.jhtml',
                    data: {userId: id},
                    success: function(res){
                        if(res.status == 200 ){
                            _vm.custFilterList = res.data.content
                        } else {
                            console.log(res.data.desc)
                        }
                    },
                    error: function(res){
                        console.log(res);
                    }
                });
            },
            //获取部门下拉列表
            getDept (id) {
                var _vm = this;
                _vm.$http.get({
                    url: 'guard-webManager/select/hospitalDeptInfo.jhtml',
                    data: {hospitalId: id},
                    success: function(res){
                        if(res.status == 200 ){
                            _vm.deptList = res.data.content
                        } else {
                            console.log(res.data.desc)
                        }
                    },
                    error: function(res){
                        console.log(res);
                    }
                });
            },
            //获取弹窗用户选择列表
            getUser (form) {
                var _vm = this;
                _vm.$http.get({
                    url: 'guard-webManager/select/hospitalUserList.jhtml',
                    data: form,
                    success: function(res){
                        if(res.status == 200 ){
                            _vm.userData = res.data.content
                        } else {
                            console.log(res.data.desc)
                        }
                    },
                    error: function(res){
                        console.log(res);
                    }
                });
            },
            showUser (type) {
                if(type == 'exploit') {
                    this.userKey = true
                    this.titUser = '选择开发人员'
                } else {
                    this.userKey = false
                    this.titUser = '选择咨询人员'
                }
                this.modalUser = true
            },
            chooseUser (data) {
                if(this.userKey) {
                    this.formSearch.exploitUserId = data.id
                    this.exploitUserName = data.name
                } else {
                    this.formSearch.managerUserId = data.id
                    this.managerUserName = data.name
                }
                this.modalUser = false
            },
            //获取弹窗标签选择列表
            getTag (form) {
                var _vm = this;
                _vm.$http.get({
                    url: 'guard-webManager/select/tagList.jhtml',
                    data: form,
                    success: function(res){
                        if(res.status == 200 ){
                            _vm.tagData = res.data.content.content
                        } else {
                            console.log(res.data.desc)
                        }
                    },
                    error: function(res){
                        console.log(res);
                    }
                });
            },
            showTag () {
                this.modalTag = true
            },
            chooseTag (data) {
                this.formSearch.tagId = data.id
                this.tagName = data.name
                this.modalTag = false
            },
            //初诊日期获取
            firstTime (date) {
                this.formSearch.firstVisitStart = date[0]
                this.formSearch.firstVisitEnd = date[1]
            },
            //最后光临日期获取
            lastTime (date) {
                this.formSearch.lastVisitStart = date[0]
                this.formSearch.lastVisitEnd = date[1]
            },
            //登记日期获取
            createTime (date) {
                this.formSearch.createStart = date[0]
                this.formSearch.createEnd = date[1]
            },
            //最后咨询日期获取
            consultTime (date) {
                this.formSearch.lastConsultStart = date[0]
                this.formSearch.lastConsultEnd = date[1]
            },
            //预约日期获取
            appointmentTime (date) {
                this.formSearch.appointmentStart = date[0]
                this.formSearch.appointmentEnd = date[1]
            },
            //分页
            changePage (num) {
                this.getList(num, '10', this.formSearch)
            },
            //重置
            handleReset (name) {
                var _vm = this
                if(name == 'formSearch') {
                    _vm.exploitUserName = ''
                    _vm.managerUserName = ''
                    _vm.tagName = ''
                    _vm.$refs['firstDate'].handleClear();
                    _vm.$refs['lastDate'].handleClear();
                    _vm.$refs['createDate'].handleClear();
                    _vm.$refs['consultDate'].handleClear();
                    _vm.$refs['appointmentDate'].handleClear();
                }
                _vm.$refs[name].resetFields();
            },
            toCusIndex (data) {
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
                        text: data.name
                    }
                ];
                this.$store.dispatch('setBreadData', breadData);
                this.$router.push({
                    path: '/customerIndex',
                    query: {
                        id: data.id
                    }
                })
                if (window.sessionStorage) {
                    var lg = window.sessionStorage;
                    lg.setItem("cusName", data.name);
                    lg.setItem("cusId", data.id);
                }
            },






            getTableCol () {
                const tableColList = {
                    index: {   
                        title: '序号',
                        width: 70,
                        render: (h, params) => {
                            const _index = (this.pageNumber - 1) * 10
                            return h('span', params.index + 1 + _index)
                        }
                    },
                    id: {
                        title: '客户编号',
                        key: 'id'
                    },
                    name: {
                        title: '姓名',
                        key: 'name',
                        render: (h, params) => {
                            return h('p', {
                                on: {
                                    click: () => {
                                        this.toCusIndex(params.row)
                                    }
                                },
                                style: {
                                    cursor: 'pointer',
                                    color: 'orange'
                                }
                            }, [
                                h('Icon', {
                                    props: {
                                        type: "person"
                                    }
                                }),
                                h('span', params.row.name)
                            ])
                        }
                    },
                    gender: {
                        title: '性别',
                        key: 'gender',
                        render: (h, params) => {
                            const text = params.row.gender === 1 ? '男' : '女';
                            return h('span', text)
                        }
                    },
                    birthyear: {
                        title: '年龄',
                        key: 'birthyear',
                        render: (h, params) => {
                            if(params.row.birthyear != 0) {
                                const date = new Date();
                                const year = date.getFullYear()
                                return h('span', year - params.row.birthyear)
                            }
                        }
                    },
                    memberCategoryName: {
                        title: '会员',
                        key: 'memberCategoryName'
                    },
                    channelName: {
                        title: '渠道',
                        key: 'channelName'
                    },
                    symptomName: {
                        title: '咨询项目',
                        key: 'symptomName'
                    },
                    exploitUserName: {
                        title: '开发人员',
                        key: 'exploitUserName'
                    },
                    managerUserName: {
                        title: '咨询人员',
                        key: 'managerUserName'
                    },
                    firstvisittime: {
                        title: '上门状态',
                        key: 'firstvisittime',
                        render: (h, params) => {
                            const color = typeof params.row.firstvisittime == 'string' ? 'blue' : 'red'
                            const text = typeof params.row.firstvisittime == 'string' ? '已上门' : '未上门'
                            return h('span', {
                                style: {
                                    color: color
                                }
                            }, text)
                        }
                    },
                    firstdealtime: {
                        title: '成交状态',
                        key: 'firstdealtime',
                        render: (h, params) => {
                            const color = typeof params.row.firstdealtime == 'string' ? 'blue' : 'red'
                            const text = typeof params.row.firstdealtime == 'string' ? '已成交' : '未成交'
                            return h('span', {
                                style: {
                                    color: color
                                }
                            }, text)
                        }
                    },
                    firstDate: {
                        title: '初诊日期',
                        key: 'firstvisittime',
                        render: (h, params) => {
                            if(typeof params.row.firstvisittime == 'string') {
                                return h('span', params.row.firstvisittime.split(' ')[0])
                            }
                        }
                    },
                    hospital: {
                        title: '初诊医院',
                        key: 'firstVisitHospitalName'
                    },
                    lastDate: {
                        title: '最后光临',
                        key: 'lastvisittime',
                        render: (h, params) => {
                            if(typeof params.row.lastvisittime == 'string') {
                                return h('span', params.row.lastvisittime.split(' ')[0])
                            }
                        }
                    },
                    orderDate: {
                        title: '预约到诊日期',
                        key: 'appointmentDate',
                        render: (h, params) => {
                            if(typeof params.row.appointmentDate == 'string') {
                                return h('span', params.row.appointmentDate.split(' ')[0])
                            }
                        }
                    },
                    orderHosp: {
                        title: '预约医院',
                        key: 'appointmentHospitalName'
                    },
                    registerDate: {
                        title: '登记时间',
                        key: 'createtime'
                    },
                    registerHosp: {
                        title: '登记医院',
                        key: 'createUserHospitalName'
                    },
                    registerPeo: {
                        title: '登记人员',
                        key: 'createUserName'
                    },
                    shop: {
                        title: '推荐店家',
                        key: 'storeName'
                    }
                };

                let data = [tableColList.index];
                for(var col of this.tableColChecked) {
                    data.push(tableColList[col])
                }
                return data;
            },
            changeTableCol () {
                this.columns = this.getTableCol();
            }
        }
    }
</script>



