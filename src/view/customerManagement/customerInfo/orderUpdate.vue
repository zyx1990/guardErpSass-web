/**
 * 客户添加订单
 */

<template>
    <div class="container-box">
        <div class="container-body" v-if='powerLoad > 0'>       
            <div class="container-header">
                <h2>添加项目单</h2>
            </div>
            <div class="container-body">
                <Alert type="success">
                    <p>该客户没有折扣权益</p>
                    <p>原价： {{allPrice}}  成交价：{{allDeal}} 整体折扣：{{allSell}}</p>
                </Alert>
                <Form ref="formEdit" :model='formEdit' :label-width="50" label-position="right" style='margin-top:10px;'>
                    <Form-item prop="editData">
                        <Table stripe :columns="editCol" :data="formEdit.editData"></Table>
                    </Form-item>
                    <Form-item label="备注" prop="remark">
                        <Input v-model="formEdit.remark" type="textarea" :autosize="{minRows: 2,maxRows: 5}" placeholder="请输入备注"></Input>
                    </Form-item>
                </Form>
                <div class="footer-btnGroup">
                    <Button type="primary" shape="circle" icon="checkmark" @click='save'>保存</Button>
                    <Button type="primary" shape="circle" icon="android-arrow-back" @click='back'>返回</Button>
                </div>
            </div>
            <div class="container-header">
                <h2>添加物品药品</h2>
            </div>
            <div class="container-body">
                <Tabs value="name1">
                    <Tab-pane label="添加项目" name="name1">
                        <Form :label-width="60" inline :model="formSearch1" ref='formSearch1'>
                            <Form-item label="名称" prop='name'>
                                <Input v-model="formSearch1.name" placeholder="请输入名称"></Input>
                            </Form-item>
                            <Form-item label="拼音码" prop='pinyin'>
                                <Input v-model="formSearch1.pinyin" placeholder="请输入拼音码"></Input>
                            </Form-item>
                            <Form-item label="类型" prop='categoryId'>
                                <Input v-model="categoryName" readonly icon="ios-search" placeholder="请选择类型" @on-focus='show' style="width:162px"></Input>
                            </Form-item>
                            <ul class="header-btn-group not-float">
                                <li class="header-item"  @click="getList1"><Icon type="search"></Icon>查询</li>
                                <li class="header-item" @click="handleReset('formSearch1')"><Icon type="refresh"></Icon>重置</li>
                            </ul>
                        </Form>
                        <Table height="420" :columns="cateCol" :data="cateData" @on-row-click='chooseCol' stripe></Table>
                    </Tab-pane>
                    <Tab-pane label="添加套餐" name="name2">
                        <Form :label-width="60" inline :model="formSearch2" ref='formSearch2'>
                            <Form-item label="名称" prop='name'>
                                <Input v-model="formSearch2.name" placeholder="请输入名称"></Input>
                            </Form-item>
                            <Form-item label="拼音码" prop='pinyin'>
                                <Input v-model="formSearch2.pinyin" placeholder="请输入拼音码"></Input>
                            </Form-item>
                            <ul class="header-btn-group not-float">
                                <li class="header-item"  @click="getList2"><Icon type="search"></Icon>查询</li>
                                <li class="header-item" @click="handleReset('formSearch2')"><Icon type="refresh"></Icon>重置</li>
                            </ul>
                        </Form>
                        <Table height="420" :columns="chargeCol" :data="chargeData" stripe @on-row-click='chooseCharge'></Table>
                    </Tab-pane>
                    <Tab-pane label="常用项目" name="name3">
                        <Table height="420" :columns="comCol" :data="comData" @on-row-click='chooseCol' stripe></Table>
                    </Tab-pane>
                    <Tab-pane label="最近使用" name="name4">
                        <Table height="420" :columns="lastCol" :data="lastData" @on-row-click='chooseCol' stripe></Table>
                    </Tab-pane>
                </Tabs>
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
                cusId: '',
                cusName: '',
                powerLoad: '-1',
                errorMsg: '',

                // 添加项目
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
                categoryName: '',
                formSearch1: {
                    name: '',
                    pinyin: '',
                    categoryId: '',
                },
                cateCol: [
                    {
                        title: '项目编号',
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
                        title: '单位',
                        key: 'unitName'
                    },
                    {
                        title: '分类',
                        key: 'categoryName'
                    },
                    {
                        title: '价格',
                        key: 'price',
                        render: (h, params) => {
                            return h('span', {
                                style: {
                                    color: 'orange'
                                }
                            }, '￥' + params.row.price)
                        }
                    },
                ],
                cateData: [],

                //添加套餐
                formSearch2: {
                    name: '',
                    pinyin: '',
                },
                chargeCol: [
                    {
                        title: '套餐名称',
                        key: 'name'
                    },
                    {
                        title: '套餐总价',
                        key: 'price'
                    },
                    {
                        title: '项目',
                        key: 'detailList',
                        render: (h, params) => {
                            return h('div', params.row.detailList.map(item => {
                                return h('div', {
                                    style: {
                                        height: '50px',
                                        display: "table"
                                    }
                                }, [
                                    h('p', {
                                        style: {
                                            display: "table-cell",
                                            verticalAlign: "middle"
                                        }
                                    }, item.chargeName)
                                ])
                            }))
                        }
                    },
                    {
                        title: '数量',
                        key: 'detailList',
                        render: (h, params) => {
                            return h('div', params.row.detailList.map(item => {
                                return h('div', {
                                    style: {
                                        height: '50px',
                                        display: "table"
                                    }
                                }, [
                                    h('p', {
                                        style: {
                                            display: "table-cell",
                                            verticalAlign: "middle"
                                        }
                                    }, item.num)
                                ])
                            }))
                        }
                    },
                    {
                        title: '金额',
                        key: 'detailList',
                        render: (h, params) => {
                            return h('div', params.row.detailList.map(item => {
                                return h('div', {
                                    style: {
                                        height: '50px',
                                        display: "table"
                                    }
                                }, [
                                    h('p', {
                                        style: {
                                            display: "table-cell",
                                            verticalAlign: "middle"
                                        }
                                    }, item.amount)
                                ])
                            }))
                        }
                    },
                ],
                chargeData: [],

                //常用项目
                comCol: [
                    {
                        title: '项目编号',
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
                        title: '单位',
                        key: 'unitName'
                    },
                    {
                        title: '分类',
                        key: 'categoryName'
                    },
                    {
                        title: '价格',
                        key: 'price',
                        render: (h, params) => {
                            return h('span', {
                                style: {
                                    color: 'orange'
                                }
                            }, '￥' + params.row.price)
                        }
                    },
                ],
                comData: [],

                //最近使用
                lastCol: [
                    {
                        title: '项目编号',
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
                        title: '单位',
                        key: 'unitName'
                    },
                    {
                        title: '分类',
                        key: 'categoryName'
                    },
                    {
                        title: '价格',
                        key: 'price',
                        render: (h, params) => {
                            return h('span', {
                                style: {
                                    color: 'orange'
                                }
                            }, '￥' + params.row.price)
                        }
                    },
                ],
                lastData: [],

                // 编辑表格
                doctorList: [],
                editCol: [
                    {
                        title: '项目',
                        key: 'name'
                    },
                    {
                        title: '数量',
                        key: 'num',
                        render: (h, params) => {
                            if(params.row.key) {
                                return h('Input-number', {
                                    props: {
                                        size: 'small',
                                        min: 1,
                                        value: params.row.num
                                    },
                                    on: {
                                        'on-change': (val) => {
                                            this.formEdit.editData[params.index].num = val
                                            this.formEdit.editData[params.index].price = this.formEdit.editData[params.index].realPrice * val
                                            this.formEdit.editData[params.index].finalPrice = this.formEdit.editData[params.index].realPrice * val
                                        }
                                    }
                                })
                            } else {
                                return h('span', params.row.num)
                            }
                        }
                    },
                    {
                        title: '金额',
                        key: 'price',
                        render: (h, params) => {
                            return h('span', params.row.price)
                        }
                    },
                    {
                        title: '成交金额',
                        key: 'finalPrice',
                        render: (h, params) => {
                            if(params.row.key) {
                                return h('Input-number', {
                                    props: {
                                        size: 'small',
                                        min: 1,
                                        value: params.row.finalPrice
                                    },
                                    on: {
                                        'on-change': (val) => {
                                            this.formEdit.editData[params.index].finalPrice = val
                                        }
                                    }
                                })
                            } else {
                                return h('span', params.row.finalPrice)
                            }
                        }
                    },
                    {
                        title: '折扣',
                        key: 'sell',
                        render: (h, params) => {
                            if(params.row.key) {
                                const _sell = (params.row.finalPrice / params.row.price * 100).toFixed(2)
                                return h('span', _sell)
                            }
                        }
                    },
                    {
                        title: '套餐',
                        key: 'setid',
                        render: (h, params) => {
                            if(!params.row.key) {
                                return h('span', params.row.setName)
                            }
                        }
                    },
                    {
                        title: '医生',
                        key: 'doctorUserId',
                        render: (h, params) => {
                            if(params.row.key) {
                                if(params.row.assigndoctor == 1) {
                                    return h('i-select', {
                                        props: {
                                            value: params.row.doctorUserId
                                        },
                                        on: {
                                            'on-change': (val) => {
                                                this.formEdit.editData[params.index].doctorUserId = val
                                            }
                                        }
                                    }, this.doctorList.map(item => {
                                        return h('i-option', {
                                            props: {
                                                value: item.value
                                            }
                                        },item.text)
                                    }))
                                }
                            }
                        }
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
                                                this.remove(params.row, params.index)
                                            }
                                        }
                                    }, '删除'),
                                ])
                        }
                    }
                ],
                formEdit: {
                    editData: [],
                    remark: ''
                },
            }
        },
        computed: {
            allPrice () {
                var _real = 0
                for(let item of this.formEdit.editData) {
                    _real += item.price
                }
                return _real
            },
            allDeal () {
                var _real = 0
                for(let item of this.formEdit.editData) {
                    _real += item.finalPrice
                }
                return _real
            },
            allSell () {
                var _real = 100.00
                if(this.formEdit.editData.length > 0) {
                    _real = (this.allDeal / this.allPrice * 100).toFixed(2)
                }
                return _real
            },
        },
        created () {
            if (window.sessionStorage) {
                var lg = window.sessionStorage;
                this.cusId = lg.cusId
                this.cusName = lg.cusName
            }
            this.getId(this.cusId)
        },
        mounted () {
            this.getObj()
        },
        methods: {
            // 获取资料
            getId (id) {
                var _vm = this;
                var _data = {};
                _vm.$http.get({
                    url: 'guard-webManager/customerRecord/orderUpdate.jhtml',
                    data: {id: _vm.$route.query.id},
                    success: function(res){
                        if(res.status == 200 ){
                            console.log(res)
                            if(res.data.code == 0) {
                                _vm.powerLoad = 1
                                _vm.formEdit.remark = res.data.content.Order.remark
                                _vm.comData = res.data.content.CommonList
                                _vm.lastData = res.data.content.LastList
                                _vm.doctorList = eval(res.data.content.Arr)
                                for(let item of res.data.content.Order.detailList) {
                                    if(typeof item.setid == 'object') {
                                        _data['key'] = true
                                    } else {
                                        _data['key'] = false
                                    }
                                    if(typeof item.doctoruserid == 'number') {
                                        _data['assigndoctor'] = 1
                                    } else {
                                        _data['assigndoctor'] = 0
                                    }
                                    _data['id'] = item['id']
                                    _data['name'] = item['chargeName']
                                    _data['num'] = item['num']
                                    _data['price'] = item['price']
                                    _data['finalPrice'] = item['finalprice']
                                    _data['realPrice'] = item['price']
                                    _data['setid'] = item['setid']
                                    _data['doctorUserId'] = item['doctoruserid']
                                    _vm.formEdit.editData.push(_data)
                                    _data = {}
                                }
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
            //获取项目类型
            getObj () {
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
            show () {
                this.modal1 = true
            },
            chooseObj (data) {
                this.categoryName = data.name
                this.formSearch1.categoryId = data.id
                this.modal1 = false
            },
            //获取添加项目列表
            getList1() {
                var _vm = this;
                _vm.$http.get({
                    url: 'guard-webManager/select/chargeList.jhtml',
                    data: _vm.formSearch1,
                    success: function(res){
                        if(res.status == 200 ){
                            console.log(res.data.content)
                            _vm.cateData = res.data.content
                        } else {
                            console.log(res.data.desc)
                        }
                    },
                    error: function(res){
                        console.log(res);
                    }
                });
            },
            //获取添加套餐列表
            getList2() {
                var _vm = this;
                _vm.$http.get({
                    url: 'guard-webManager/select/chargeSetList.jhtml',
                    data: _vm.formSearch2,
                    success: function(res){
                        if(res.status == 200 ){
                            console.log(res.data.content)
                            _vm.chargeData = res.data.content
                        } else {
                            console.log(res.data.desc)
                        }
                    },
                    error: function(res){
                        console.log(res);
                    }
                });
            },
            //选中项目
            chooseCol (data) {
                var _vm = this;
                var bool = true;
                var _data = {}
                for(let item of _vm.formEdit.editData) {
                    if(data.id == item.id) {
                        bool = false
                    }
                }
                if(bool) {
                    _vm.$http.get({
                        url: 'guard-webManager/select/chargeDetailList.jhtml',
                        data: {id: data.id},
                        success: function(res){
                            if(res.status == 200 ){
                                console.log(res.data.content)
                                _data = res.data.content
                                _data['num'] = 1
                                _data['realPrice'] = res.data.content['price']
                                _data['finalPrice'] = res.data.content['price']
                                _data['doctorUserId'] = ''
                                _data['setid'] = null
                                _data['key'] = true
                                _vm.formEdit.editData.push(_data)
                            } else {
                                console.log(res.data.desc)
                            }
                        },
                        error: function(res){
                            console.log(res);
                        }
                    });
                }
            },
            //选中套餐
            chooseCharge (data) {
                var _vm = this;
                var bool = true;
                var _data = {}
                for(let item of _vm.formEdit.editData) {
                    if(data.detailList[0].id == item.id) {
                        bool = false
                    }
                }
                if(bool) {
                    _vm.$http.get({
                        url: 'guard-webManager/select/chargeSetDetail.jhtml',
                        data: {id: data.id},
                        success: function(res){
                            if(res.status == 200 ){
                                for(let item of res.data.content.detailList) {
                                    item['key'] = false
                                    item['name'] = item['chargeName']
                                    item['finalPrice'] = item['amount']
                                    item['price'] = item['amount']
                                    item['setName'] = res.data.content.name
                                    _vm.formEdit.editData.push(item)
                                }
                            } else {
                                console.log(res.data.desc)
                            }
                        },
                        error: function(res){
                            console.log(res);
                        }
                    });
                }
            },
            //重置
            handleReset (name) {
                this.categoryName = '';
                this.$refs[name].resetFields();
            },
            remove (data, index) {
                if(typeof data.setid == 'object') {
                    this.formEdit.editData.splice(index, 1)
                } else {
                    for(var i = 0; i < this.formEdit.editData.length; i++) {
                        console.log(i)
                        if(data.setid == this.formEdit.editData[i].setid) {
                            this.formEdit.editData.splice(i, 1)
                            i--
                        }
                    }
                }
            },
            save () {
                var _vm = this
                var _box = [];
                var _obj = {};
                for(let item of _vm.formEdit.editData) {
                    _obj['ChargeID'] = item.id
                    _obj['ChargeName'] = item.name
                    _obj['Num'] = item.num
                    _obj['Price'] = item.price
                    _obj['FinalPrice'] = item.finalPrice
                    _obj['SetID'] = item.setid
                    _obj['DoctorUserID'] = item.doctorUserId
                    _box.push(_obj)
                    _obj = {}
                }
                _vm.$refs['formEdit'].validate((valid) => {
                    if(valid) {
                        _vm.$http.post({
                            url: 'guard-webManager/customerRecord/orderUpdateEdit.jhtml',
                            data: {
                                id: _vm.$route.query.id,
                                remark: _vm.formEdit.remark,
                                detailListStr: JSON.stringify(_box)
                            },
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
                                            url: '/indexOrder',
                                            text: _vm.cusName
                                        }
                                    ];
                                    _vm.$store.dispatch('setBreadData', breadData);
                                    _vm.$router.push('/indexOrder')
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
                        url: '/customerMsg',
                        text: this.cusName
                    }
                ];
                this.$store.dispatch('setBreadData', breadData);
                this.$router.back(-1)
            }
        }

    }
</script>   
