/**
 * 系统设置
 */

<template>
    <div class="container-box option">
        <div class="container-header">
            <h2>系统设置</h2>
        </div>
        <div class="container-body">
            <table class="tableEdit">
                <tbody>
                    <tr class="table-item">
                        <td>系统名称</td>
                        <td>{{data.SystemTitle}}</td>
                        <td class="action">
                            <i-button type="primary" size="small" @click="edit('0')">
                                <Icon type="edit"></Icon>编辑
                            </i-button>
                        </td>
                    </tr>
                    <tr class="table-item">
                        <td>客户自定义字段</td>
                        <td>
                            <table class="tableEdit">
                                <tbody>
                                    <tr>
                                        <td>自定义1</td>
                                        <td>{{data.Custom1}}</td>
                                    </tr>
                                    <tr>
                                        <td>自定义2</td>
                                        <td>{{data.Custom2}}</td>
                                    </tr>
                                    <tr>
                                        <td>自定义3</td>
                                        <td>{{data.Custom3}}</td>
                                    </tr>
                                    <tr>
                                        <td>自定义4</td>
                                        <td>{{data.Custom4}}</td>
                                    </tr>
                                    <tr>
                                        <td>自定义5</td>
                                        <td>{{data.Custom5}}</td>
                                    </tr>
                                    <tr>
                                        <td>自定义6</td>
                                        <td>{{data.Custom6}}</td>
                                    </tr>
                                    <tr>
                                        <td>自定义7</td>
                                        <td>{{data.Custom7}}</td>
                                    </tr>
                                    <tr>
                                        <td>自定义8</td>
                                        <td>{{data.Custom8}}</td>
                                    </tr>
                                    <tr>
                                        <td>自定义9</td>
                                        <td>{{data.Custom9}}</td>
                                    </tr>
                                    <tr>
                                        <td>自定义10</td>
                                        <td>{{data.Custom10}}</td>
                                    </tr>
                                </tbody>
                            </table>
                        </td>
                        <td class="action">
                            <i-button type="primary" size="small" @click="edit('1')">
                                <Icon type="edit"></Icon>编辑
                            </i-button>
                        </td>
                    </tr>
                    <tr class="table-item">
                        <td>默认咨询模板</td>
                        <td>{{data.ConsultContentTemplate}}</td>
                        <td class="action">
                            <i-button type="primary" size="small" @click="edit('2')">
                                <Icon type="edit"></Icon>编辑
                            </i-button>
                        </td>
                    </tr>
                    <tr class="table-item">
                        <td>预收款成交设置</td>
                        <td>{{dealType}}</td>
                        <td class="action">
                            <i-button type="primary" size="small" @click="edit('3')">
                                <Icon type="edit"></Icon>编辑
                            </i-button>
                        </td>
                    </tr>
                    <tr class="table-item">
                        <td>预约设置</td>
                        <td>
                            <p>开始时间：{{appStart}}</p>
                            <p>结束时间：{{appEnd}}</p>
                            <p>时间间隔：{{data.AppointmentInterval}}分钟</p>
                        </td>
                        <td class="action">
                            <i-button type="primary" size="small" @click="edit('4')">
                                <Icon type="edit"></Icon>编辑
                            </i-button>
                        </td>
                    </tr>
                    <tr class="table-item">
                        <td>允许欠款</td>
                        <td>{{allowDebtType}}</td>
                        <td class="action">
                            <i-button type="primary" size="small" @click="edit('5')">
                                <Icon type="edit"></Icon>编辑
                            </i-button>
                        </td>
                    </tr>
                    <tr class="table-item">
                        <td>积分比例</td>
                        <td>{{data.PointPerYuan}}</td>
                        <td class="action">
                            <i-button type="primary" size="small" @click="edit('6')">
                                <Icon type="edit"></Icon>编辑
                            </i-button>
                        </td>
                    </tr>
                    <tr class="table-item">
                        <td>隐私保护</td>
                        <td>{{contactPrivacyType}}</td>
                        <td class="action">
                            <i-button type="primary" size="small" @click="edit('7')">
                                <Icon type="edit"></Icon>编辑
                            </i-button>
                        </td>
                    </tr>
                    <tr class="table-item">
                        <td>挂号</td>
                        <td>挂号状态：{{registerEnableType}}</td>
                        <td class="action">
                            <i-button type="primary" size="small" @click="edit2">
                                <Icon type="edit"></Icon>编辑
                            </i-button>
                        </td>
                    </tr>
                    <tr class="table-item">
                        <td>候诊</td>
                        <td>候诊状态：{{waitModeType}}</td>
                        <td class="action">
                            <i-button type="primary" size="small" @click="edit('8')">
                                <Icon type="edit"></Icon>编辑
                            </i-button>
                        </td>
                    </tr>
                    <tr class="table-item">
                        <td>推荐人注册</td>
                        <td>
                            <p>注册推荐人：{{promoterStatusType}}</p>
                            <p>非登记客户注册：{{promoterNotCustomerType}}</p>
                        </td>
                        <td class="action">
                            <i-button type="primary" size="small" @click="edit('9')">
                                <Icon type="edit"></Icon>编辑
                            </i-button>
                        </td>
                    </tr>
                    <tr class="table-item">
                        <td>被推荐用户送券</td>
                        <td>
                            <p v-if="data.PromoteCouponStatus == 0">
                                推荐用户送券：关闭
                            </p>
                            <div v-else>
                                <p>券类型：{{data.PromoteCouponCategory}}</p>
                                <p>券金额：{{data.PromoteCouponAmount}}</p>
                            </div>
                        </td>
                        <td class="action">
                            <i-button type="primary" size="small" @click="edit3">
                                <Icon type="edit"></Icon>编辑
                            </i-button>
                        </td>
                    </tr>
                    <tr class="table-item">
                        <td>推荐时限</td>
                        <td>{{data.ValidDays}}</td>
                        <td class="action">
                            <i-button type="primary" size="small" @click="edit('10')">
                                <Icon type="edit"></Icon>编辑
                            </i-button>
                        </td>
                    </tr>
                    <tr class="table-item">
                        <td>不提点折扣小于</td>
                        <td>{{data.PromoteDiscount}}</td>
                        <td class="action">
                            <i-button type="primary" size="small" @click="edit('11')">
                                <Icon type="edit"></Icon>编辑
                            </i-button>
                        </td>
                    </tr>
                    <tr class="table-item">
                        <td>级别提点</td>
                        <td>
                            <table class="tableEdit">
                                <thead>
                                    <tr>
                                        <th>级别</th>
                                        <th>提点(%)</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr v-for='item in data.PromoteLevelList'>
                                        <td>{{item.level}}</td>
                                        <td>{{item.rate * 100}}</td>
                                    </tr>
                                </tbody>
                            </table>
                        </td>
                        <td class="action">
                            <i-button type="primary" size="small" @click="edit4">
                                <Icon type="edit"></Icon>编辑
                            </i-button>
                        </td>
                    </tr>
                    <tr class="table-item">
                        <td>超出最大级别统一提点</td>
                        <td>{{data.OverMaxRate}}</td>
                        <td class="action">
                            <i-button type="primary" size="small" @click="edit('12')">
                                <Icon type="edit"></Icon>编辑
                            </i-button>
                        </td>
                    </tr>
                </tbody>
            </table>
            <Modal
                title="修改设置"
                v-model="modalEdit"
                :closable="false"
                @on-ok="ok"
                :loading="loading"
                class-name="vertical-center-modal">
                <Form ref="formValidate" :model="formValidate" :label-width="120" label-position="right">
                    <Form-item label="系统名称" required v-if="key == '0'">
                        <Input v-model="formValidate.SystemTitle" placeholder="请输入名称"></Input>
                    </Form-item>
                    <Form-item label="自定义1" required v-if="key == '1'">
                        <Input v-model="formValidate.Custom1"></Input>
                    </Form-item>
                    <Form-item label="自定义2" required v-if="key == '1'">
                        <Input v-model="formValidate.Custom2"></Input>
                    </Form-item>
                    <Form-item label="自定义3" required v-if="key == '1'">
                        <Input v-model="formValidate.Custom3"></Input>
                    </Form-item>
                    <Form-item label="自定义4" required v-if="key == '1'">
                        <Input v-model="formValidate.Custom4"></Input>
                    </Form-item>
                    <Form-item label="自定义5" required v-if="key == '1'">
                        <Input v-model="formValidate.Custom5"></Input>
                    </Form-item>
                    <Form-item label="自定义6" required v-if="key == '1'">
                        <Input v-model="formValidate.Custom6"></Input>
                    </Form-item>
                    <Form-item label="自定义7" required v-if="key == '1'">
                        <Input v-model="formValidate.Custom7"></Input>
                    </Form-item>
                    <Form-item label="自定义8" required v-if="key == '1'">
                        <Input v-model="formValidate.Custom8"></Input>
                    </Form-item>
                    <Form-item label="自定义9" required v-if="key == '1'">
                        <Input v-model="formValidate.Custom9"></Input>
                    </Form-item>
                    <Form-item label="自定义10" required v-if="key == '1'">
                        <Input v-model="formValidate.Custom10"></Input>
                    </Form-item>
                    <Form-item label="默认咨询模板" required v-if="key == '2'">
                        <Input v-model="formValidate.ConsultContentTemplate" type="textarea" :autosize="{minRows: 6}"></Input>
                    </Form-item>
                    <Form-item label="预收款成交设置" required v-if="key == '3'">
                        <Radio-group v-model="formValidate.DealDepositType">
                            <Radio label="1">购买时</Radio>
                            <Radio label="2">使用时</Radio>
                        </Radio-group>
                    </Form-item>
                    <Form-item label="预约时间" required v-if="key == '4'">
                        <Time-picker :value='appTime' format="HH:mm" type="timerange" placement="bottom-end" placeholder="选择时间" @on-change='setTime'></Time-picker>
                    </Form-item>
                    <Form-item label="间隔(分钟)" required v-if="key == '4'">
                        <Input v-model="formValidate.AppointmentInterval"></Input>
                    </Form-item>
                    <Form-item label="允许欠款" required v-if="key == '5'">
                        <Radio-group v-model="formValidate.AllowDebt">
                            <Radio label="1">是</Radio>
                            <Radio label="0">否</Radio>
                        </Radio-group>
                    </Form-item>
                    <Form-item label="消费1元获取积分数量" required v-if="key == '6'">
                        <Input v-model="formValidate.PointPerYuan"></Input>
                    </Form-item>
                    <Form-item label="号码隐藏" required v-if="key == '7'">
                        <Radio-group v-model="formValidate.ContactPrivacy">
                            <Radio label="1">全部隐藏</Radio>
                            <Radio label="0">部分隐藏</Radio>
                        </Radio-group>
                    </Form-item>
                    <Form-item label="候诊模式" required v-if="key == '8'">
                        <Radio-group v-model="formValidate.WaitMode">
                            <Radio label="1">开启</Radio>
                            <Radio label="0">关闭</Radio>
                        </Radio-group>
                    </Form-item>
                    <Form-item label="推荐人注册" required v-if="key == '9'">
                        <Radio-group v-model="formValidate.PromoterStatus">
                            <Radio label="1">开启</Radio>
                            <Radio label="0">关闭</Radio>
                        </Radio-group>
                    </Form-item>
                    <Form-item label="非登记客户推荐人注册" required v-if="key == '9'">
                        <Radio-group v-model="formValidate.PromoterNotCustomer">
                            <Radio label="1">开启</Radio>
                            <Radio label="0">关闭</Radio>
                        </Radio-group>
                    </Form-item>
                    <Form-item label="天数" required v-if="key == '10'">
                        <Input v-model="formValidate.ValidDays"></Input>
                    </Form-item>
                    <Form-item label="折扣" required v-if="key == '11'">
                        <Input v-model="formValidate.PromoteDiscount"></Input>
                    </Form-item>
                    <Form-item label="佣金比例" required v-if="key == '12'">
                        <Input v-model="formValidate.OverMaxRate"></Input>
                    </Form-item>
                </Form>
            </Modal>
            <Modal
                title="修改挂号设置"
                v-model="modal1"
                :closable="false"
                @on-ok="ok1"
                :loading="loading1"
                class-name="vertical-center-modal">
                <Form ref="registerForm" :model="registerForm" :label-width="100" label-position="right">
                    <Form-item label="挂号" required>
                        <Radio-group v-model="registerForm.status">
                            <Radio label="1">开启</Radio>
                            <Radio label="0">关闭</Radio>
                        </Radio-group>
                    </Form-item>
                    <Form-item label="挂号收费项目" required>
                        <Input v-model="objName" readonly icon="ios-search" placeholder="请选择收费项目" @on-focus='show'></Input>
                    </Form-item>
                </Form>
            </Modal>
            <Modal
                title="选择收费项目"
                width='700'
                v-model="modal2"
                :closable="false"
                class-name="vertical-center-modal">
                <Form  :label-width="50" inline ref='formSearch2' :model='formSearch2'>
                    <Form-item label="名称" prop='name'>
                        <Input v-model="formSearch2.name" placeholder="请输入名称"></Input>
                    </Form-item>
                    <Form-item label="拼音码" prop='pinyin'>
                        <Input v-model="formSearch2.pinyin" placeholder="请输入拼音码"></Input>
                    </Form-item>
                    <ul class="header-btn-group not-float">
                        <li class="header-item" @click="getObj(formSearch2)"><Icon type="search"></Icon>查询</li>
                        <li class="header-item" @click="handleReset('formSearch2')"><Icon type="refresh"></Icon>重置</li>
                    </ul>
                </Form>
                <Table height="350" stripe :columns="col2" :data="objData" @on-row-click='chooseObj'></Table>
            </Modal>
            <Modal
                title="修改被推荐用户送券设置"
                v-model="modal3"
                :closable="false"
                @on-ok="ok2"
                :loading="loading2"
                class-name="vertical-center-modal">
                <Form ref="promoteForm" :model="promoteForm" :label-width="100" label-position="right">
                    <Form-item label="被推荐人送券" required>
                        <Radio-group v-model="promoteForm.promoteGiveCoupon">
                            <Radio label="1">开启</Radio>
                            <Radio label="0">关闭</Radio>
                        </Radio-group>
                    </Form-item>
                    <Form-item label="券类型" required>
                        <Input v-model="objName1" readonly icon="ios-search" placeholder="请选择收费项目" @on-focus='show1'></Input>
                    </Form-item>
                    <Form-item label="券金额" required>
                        <Input v-model="promoteForm.amount"></Input>
                    </Form-item>
                </Form>
            </Modal>
            <Modal
                title="选择券类型"
                width='700'
                v-model="modal4"
                :closable="false"
                class-name="vertical-center-modal">
                <Table height="350" stripe :columns="col3" :data="objData1" @on-row-click='chooseObj1'></Table>
            </Modal>
            <Modal
                title="修改级别提点设置"
                width='700'
                v-model="modal5"
                :closable="false"
                @on-ok="ok3"
                :loading="loading3"
                class-name="vertical-center-modal">
                <Table stripe :columns="col4" :data="levelData"></Table>
                <Button type="primary" shape="circle" icon="plus-round" style='margin-top:10px;' @click='add1'>增加</Button>
            </Modal>
            <Modal
                title="级别提点信息"
                v-model="modal6"
                :closable="false"
                @on-ok="ok4"
                class-name="vertical-center-modal">
                <Form ref="levelForm" :model="levelForm" :label-width="100" label-position="right">
                    <Form-item label="级别" required prop='level'>
                        <Input v-model="levelForm.level"></Input>
                    </Form-item>
                    <Form-item label="提点（%）" required prop='rate'>
                        <Input v-model="levelForm.rate"></Input>
                    </Form-item>
                </Form>
            </Modal>
        </div>
    </div>
</template>

<script>
    export default {
        data () {
            return {
                key: '',
                data: {},
                modalEdit: false,
                loading: true,
                formValidate: {},
                appTime: [],
                appUpdateTime: {
                    hour: '',
                    minute: '',
                    hour2: '',
                    minute2: ''
                },
                modal1: false,
                loading1: true,
                registerForm: {
                    status: '',
                    chargeId: '',
                    chargeName: '',
                },
                objName: '',
                modal2: false,
                formSearch2: {
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
                modal3: false,
                loading2: true,
                promoteForm: {
                    promoteGiveCoupon: '',
                    couponCategoryId: '',
                    amount: '',
                },
                objName1: '',
                modal4: false,
                col3: [
                    {
                        title: '编号',
                        width: '60',
                        key: 'id'
                    },
                    {
                        title: '名称',
                        key: 'name'
                    },
                    {
                        title: '可使用医院',
                        key: 'hospitalList',
                        render: (h, params) => {
                            return h('div', params.row.hospitalList.map(item => {
                                return h('span', item.name + '、')
                            }))
                        }
                    },
                    {
                        title: '备注',
                        key: 'remark'
                    }
                ],
                objData1: [],
                modal5: false,
                loading3: true,
                col4: [
                    {
                        title: '级别',
                        key: 'level'
                    },
                    {
                        title: '提点(%)',
                        key: 'rate'
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
                levelData: [],
                modal6: false,
                levelForm: {
                    level: '',
                    rate: '',
                },
                urlBox: [
                    'guard-webManager/option/updateSystemTitle.jhtml', 
                    'guard-webManager/option/updateCustom.jhtml',
                    'guard-webManager/option/updateConsultContentTemplate.jhtml',
                    'guard-webManager/option/updateDealEdit.jhtml',
                    'guard-webManager/option/updateAppointmentTimeEdit.jhtml',
                    'guard-webManager/option/updateAllowDebt.jhtml',
                    'guard-webManager/option/updatePoint.jhtml',
                    'guard-webManager/option/updateContactPrivacy.jhtml',
                    'guard-webManager/option/updateWaitEdit.jhtml',
                    'guard-webManager/option/updatePromoterEdit.jhtml',
                    'guard-webManager/option/updatePromoteValidDaysEdit.jhtml',
                    'guard-webManager/option/updatePromoteDiscountEdit.jhtml',
                    'guard-webManager/option/updateOverMaxRateEdit.jhtml'
                ],
            }
        },
        computed: {
            dealType () {
                if(this.data.DealDepositType == '1') {
                    return '购买时'
                } else if (this.data.DealDepositType == '2') {
                    return '使用时'
                }
            },
            allowDebtType () {
                if(this.data.AllowDebt == '1') {
                    return '是'
                } else {
                    return '否'
                }
            },
            contactPrivacyType () {
                if(this.data.ContactPrivacy == '1') {
                    return '全部隐藏'
                } else {
                    return '部分隐藏'
                }
            },
            registerEnableType () {
                if(this.data.RegisterEnable == '1') {
                    return '开启'
                } else {
                    return '关闭'
                }
            },
            waitModeType () {
                if(this.data.WaitMode == '1') {
                    return '开启'
                } else {
                    return '关闭'
                }
            },
            promoterStatusType () {
                if(this.data.PromoterStatus == '1') {
                    return '开启'
                } else {
                    return '关闭'
                }
            },
            promoterNotCustomerType () {
                if(this.data.PromoterNotCustomer == '1') {
                    return '开启'
                } else {
                    return '关闭'
                }
            },
            appStart () {
                if(typeof this.data.AppointmentStart == 'string' && this.data.AppointmentStart.length > 0) {
                    let _time = this.data.AppointmentStart.split(' ')[1].split(':').splice(0, 2).join(':')
                    return _time
                }
            },
            appEnd () {
                if(typeof this.data.AppointmentEnd == 'string' && this.data.AppointmentEnd.length > 0) {
                    let _time = this.data.AppointmentEnd.split(' ')[1].split(':').splice(0, 2).join(':')
                    return _time
                }
            },
        },
        created () {
            this.getList()
        },
        mounted () {
            this.getObjList()
            this.getObjList1()
            this.getCon()
        },
        methods: {
            getList () {
                var _vm = this;
                _vm.$http.get({
                    url: 'guard-webManager/option/list.jhtml',
                    success: function(res){
                        if(res.status == 200 ){
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
            //获取挂号界面
            getObjList () {
                var _vm = this;
                _vm.$http.get({
                    url: 'guard-webManager/option/updateRegister.jhtml',
                    success: function(res){
                        if(res.status == 200 ){
                            _vm.registerForm.status = res.data.content.Status
                            _vm.registerForm.chargeId = res.data.content.ChargeID
                            _vm.objName = res.data.content.ChargeName
                        } else {
                            console.log(res.data.desc)
                        }
                    },
                    error: function(res){
                        console.log(res);
                    }
                });
            },
            //获取项目列表
            getObj (form) {
                var _vm = this;
                _vm.$http.get({
                    url: 'guard-webManager/select/chargeList.jhtml',
                    data: form,
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
            //获取被推荐用户送券界面
            getObjList1 () {
                var _vm = this;
                _vm.$http.get({
                    url: 'guard-webManager/option/updatePromoteCoupon.jhtml',
                    success: function(res){
                        if(res.status == 200 ){
                            _vm.promoteForm.promoteGiveCoupon = res.data.content.PromoteGiveCoupon
                            _vm.promoteForm.couponCategoryId = res.data.content.PromoteCouponCategory
                            _vm.promoteForm.amount = res.data.content.PromoteCouponAmount
                            _vm.objName1 = _vm.data.PromoteCouponCategory
                        } else {
                            console.log(res.data.desc)
                        }
                    },
                    error: function(res){
                        console.log(res);
                    }
                });
            },
            //获取券类型列表
            getCon () {
                var _vm = this;
                _vm.$http.get({
                    url: 'guard-webManager/select/couponCategoryList.jhtml',
                    success: function(res){
                        if(res.status == 200 ){
                            _vm.objData1 = res.data.content
                        } else {
                            console.log(res.data.desc)
                        }
                    },
                    error: function(res){
                        console.log(res);
                    }
                });
            },
            edit (type) {
                var _vm = this;
                _vm.key = type
                _vm.formValidate = JSON.parse(JSON.stringify(_vm.data))
                _vm.appTime = []
                _vm.appTime.push(_vm.appStart)
                _vm.appTime.push(_vm.appEnd)
                _vm.modalEdit = true
            },
            setTime (date) {
                var _vm = this;
                _vm.appUpdateTime.hour = date[0].split(':')[0]
                _vm.appUpdateTime.minute = date[0].split(':')[1]
                _vm.appUpdateTime.hour2 = date[1].split(':')[0]
                _vm.appUpdateTime.minute2 = date[1].split(':')[1]
            },
            ok () {
                var _vm = this;
                var _url = _vm.urlBox[_vm.key];
                var _data = {}
                switch (_vm.key) {
                    case "0":
                        _data = {
                            content: _vm.formValidate.SystemTitle
                        }
                        break;
                    case "1":
                        _data = {
                            custom1: _vm.formValidate.Custom1,
                            custom2: _vm.formValidate.Custom2,
                            custom3: _vm.formValidate.Custom3,
                            custom4: _vm.formValidate.Custom4,
                            custom5: _vm.formValidate.Custom5,
                            custom6: _vm.formValidate.Custom6,
                            custom7: _vm.formValidate.Custom7,
                            custom8: _vm.formValidate.Custom8,
                            custom9: _vm.formValidate.Custom9,
                            custom10: _vm.formValidate.Custom10
                        }
                        break;
                    case "2":
                        _data = {
                            content: _vm.formValidate.ConsultContentTemplate
                        }
                        break;
                    case "3":
                        _data = {
                            type: _vm.formValidate.DealDepositType
                        }
                        break;
                    case "4":
                        _data = _vm.appUpdateTime,
                        _data['interval'] = _vm.formValidate.AppointmentInterval
                        break;
                    case "5":
                        _data = {
                            type: _vm.formValidate.AllowDebt
                        }
                        break;
                    case "6":
                        _data = {
                            amount: _vm.formValidate.PointPerYuan
                        }
                        break;
                    case "7":
                        _data = {
                            type: _vm.formValidate.ContactPrivacy
                        }
                        break;
                    case "8":
                        _data = {
                            status: _vm.formValidate.WaitMode
                        }
                        break;
                    case "9":
                        _data = {
                            promoterOpen: _vm.formValidate.PromoterStatus,
                            promoterNotCustomer: _vm.formValidate.PromoterNotCustomer
                        }
                        break;
                    case "10":
                        _data = {
                            days: _vm.formValidate.ValidDays
                        }
                        break;
                    case "11":
                        _data = {
                            amount: _vm.formValidate.PromoteDiscount
                        }
                        break;
                    case "12":
                        _data = {
                            amount: _vm.formValidate.OverMaxRate
                        }
                        break;
                    default:
                    // ...
                }
                _vm.$http.post({
                    url: _url,
                    data: _data,
                    success: function(res){
                        if(res.status == 200 ){
                            _vm.getList()
                            _vm.modalEdit = false;
                            _vm.$Notice.success({
                                title: '系统提示！',
                                desc: '保存成功！'
                            });
                        } else {
                            console.log(res.data.desc)
                        }
                    },
                    error: function(res){
                        console.log(res);
                    }
                });
            },
            edit2 () {
                this.modal1 = true
            },
            handleReset (name) {
                this.$refs[name].resetFields();
            },
            show () {
                this.modal2 = true
            },
            chooseObj (data) {
                this.registerForm.chargeId = data.id
                this.objName = data.categoryName
                this.modal2 = false
            },
            ok1 () {
                var _vm = this;
                _vm.$http.post({
                    url: 'guard-webManager/option/updateRegisterEdit.jhtml',
                    data: _vm.registerForm,
                    success: function(res){
                        if(res.status == 200 ){
                            _vm.getList()
                            _vm.modal1 = false;
                            _vm.$Notice.success({
                                title: '系统提示！',
                                desc: '保存成功！'
                            });
                        } else {
                            console.log(res.data.desc)
                        }
                    },
                    error: function(res){
                        console.log(res);
                    }
                });
            },
            edit3 () {
                this.modal3 = true
            },
            show1 () {
                this.modal4 = true
            },
            chooseObj1 (data) {
                this.objName1 = data.name;
                this.promoteForm.couponCategoryId = data.id
                this.modal4 = false
            },
            ok2 () {
                var _vm = this;
                _vm.$http.post({
                    url: 'guard-webManager/option/updatePromoteCouponEdit.jhtml',
                    data: _vm.promoteForm,
                    success: function(res){
                        if(res.status == 200 ){
                            _vm.getList()
                            _vm.modal3 = false;
                            _vm.$Notice.success({
                                title: '系统提示！',
                                desc: '保存成功！'
                            });
                        } else {
                            console.log(res.data.desc)
                        }
                    },
                    error: function(res){
                        console.log(res);
                    }
                });
            },
            edit4 () {
                this.levelData = JSON.parse(JSON.stringify(this.data.PromoteLevelList))
                this.modal5 = true
            },
            remove (index) {
                this.levelData.splice(index, 1)
            },
            add1 () {
                this.$refs['levelForm'].resetFields();
                this.modal6 = true
            },
            ok4 () {
                this.levelData.push(JSON.parse(JSON.stringify(this.levelForm)))
            },
            ok3 () {
                var _vm = this;
                _vm.$http.post({
                    url: 'guard-webManager/option/updatePromoteLevelEdit.jhtml',
                    data: {
                        detailListStr: JSON.stringify(_vm.levelData)
                    },
                    success: function(res){
                        if(res.status == 200 ){
                            _vm.getList()
                            _vm.modal5 = false;
                            _vm.$Notice.success({
                                title: '系统提示！',
                                desc: '保存成功！'
                            });
                        } else {
                            console.log(res.data.desc)
                        }
                    },
                    error: function(res){
                        console.log(res);
                    }
                });
            },
        }
    }
</script>

<style scoped>
    .option .table-item td:first-child {
        background: rgba(73,133,243,0.05);
        width: 200px;
    }
    .option .table-item .action {
        width: 100px;
        text-align: center;
    }
    .option .tableEdit th {
        border-right: 1px solid rgba(65, 65, 65, 0.3); 
        border-bottom: 1px solid rgba(65, 65, 65, 0.3);
    }
</style>