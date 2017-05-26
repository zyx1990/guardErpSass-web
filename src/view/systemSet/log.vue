/**
 * 系统日志记录
 */

<template>
    <div class="container-box" ref="containerBox">
        <div class="container-header">
            <h2>系统日志记录</h2>
        </div>
        <div class="container-body">
            <Form :label-width="70" inline :model="formSearch" ref='formSearch'>
                <Form-item label="操作日期" prop='date'>
                    <Date-picker type="daterange" placement="bottom-start" placeholder="选择日期" style="width: 180px" :options='options' @on-change='saveDate' ref='dateTime'></Date-picker>
                </Form-item>
                <Form-item label="日志类型" prop='type'>
                    <Select v-model="formSearch.type" style="width:162px">
                        <Option v-for="item in typeList" :value="item" :key="item">{{ english(item) }}</Option>
                    </Select>
                </Form-item>
                <Form-item label="所属医院" prop='hospitalId'>
                    <Select v-model="formSearch.hospitalId" style="width:200px">
                        <Option v-for="item in hospList" :value="item.id" :key="item">{{ item.name }}</Option>
                    </Select>
                </Form-item>
                <Form-item label="账号" prop='account'>
                    <Input v-model="formSearch.account" placeholder="请输入账号"></Input>
                </Form-item>
                <Form-item label="姓名" prop='name'>
                    <Input v-model="formSearch.name" placeholder="请输入姓名"></Input>
                </Form-item>
                <Form-item label="客户编号" prop='customerId'>
                    <Input v-model="formSearch.customerId" placeholder="请输入客户编号"></Input>
                </Form-item>
                <ul class="header-btn-group not-float">
                    <li class="header-item" @click="getList('1', '10', formSearch)"><Icon type="search"></Icon>查询</li>
                    <li class="header-item" @click="handleReset('formSearch')"><Icon type="refresh"></Icon>重置</li>
                </ul>
            </Form>
            <Table stripe :columns="columns" :data="data"></Table>
            <div class="table-page">
                <div class="table-info">当前第{{pageNumber}}页，共{{totalPages}}页，总共{{total}}条记录</div>
                <Page class="table-paginate" :total="totalNum" @on-change='changePage' :current='pageNum'></Page>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        data () {
            return {
                total: '',
                totalPages: '',
                pageNumber: '1',
                formSearch: {
                    userId: '0',
                    startTime: '',
                    endTime: '',
                    type: '',
                    hospitalId: '',
                    account: '',
                    name: '',
                    customerId: ''
                },
                hospList: [],
                typeList: [],
                columns: [
                    {   
                        title: '序号',
                        width: 70,
                        render: (h, params) => {
                            const _index = (this.pageNumber - 1) * 10
                            return h('span', params.index + 1 + _index)
                        }
                    },
                    {
                        title: '医院',
                        key: 'hospitalName'
                    },
                    {
                        title: '账号',
                        key: 'userAccount'
                    },
                    {
                        title: '姓名',
                        key: 'userName'
                    },
                    {
                        title: '操作类型',
                        key: 'type',
                        render: (h, params) => {
                            return h('span', this.english(params.row.type))
                        }
                    },
                    {
                        title: '操作IP',
                        key: 'ip'
                    },
                    {
                        title: '操作时间',
                        key: 'createtime'
                    },
                    {
                        title: '操作客户',
                        key: 'customerName'
                    },
                    {
                        title: '内容',
                        key: 'description'
                    }
                ],
                data: [],
                options: {
                    disabledDate (date) {
                        return date && date.valueOf() > Date.now();
                    }
                },
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
            this.getHops()
            this.getType()
        },
        methods: {
            // 替换中英文
            english (val) {
                var box = [
                    {
                        value: "login",
                        text: '登录'
                    },
                    {
                        value: "modifyPassword",
                        text: '修改密码'
                    },
                    {
                        value: "exportReport",
                        text: '导出报表'
                    },
                    {
                        value: "exportFilter",
                        text: '导出客户结果集'
                    },
                    {
                        value: "updateCustomer",
                        text: '修改客户资料'
                    },
                    {
                        value: "updateChannel",
                        text: '修改渠道'
                    },
                    {
                        value: "updateStore",
                        text: '修改店家'
                    },
                    {
                        value: "updateMobile",
                        text: '修改联系方式'
                    },
                    {
                        value: "updateConsult",
                        text: '修改咨询'
                    },
                    {
                        value: "deleteConsult",
                        text: '删除咨询'
                    },
                    {
                        value: "updateFailture",
                        text: '修改未成交'
                    },
                    {
                        value: "deleteFailture",
                        text: '删除未成交'
                    },
                    {
                        value: "deleteTag",
                        text: '删除标签'
                    },
                    {
                        value: "deleteRelation",
                        text: '删除关系'
                    },
                    {
                        value: "updateSurvey",
                        text: '修改问卷'
                    },
                    {
                        value: "deleteSurvey",
                        text: '删除问卷'
                    },
                    {
                        value: "updateMedicalRecord",
                        text: '修改病历'
                    },
                    {
                        value: "deleteMedicalRecord",
                        text: '删除病历'
                    },
                    {
                        value: "updatePhoto",
                        text: '修改照片'
                    },
                    {
                        value: "deletePhoto",
                        text: '修改照片'
                    },
                    {
                        value: "updateAppointment",
                        text: '修改咨询预约'
                    },
                    {
                        value: "deleteAppointment",
                        text: '删除咨询预约'
                    },
                    {
                        value: "updateTreat",
                        text: '修改治疗预约'
                    },
                    {
                        value: "deleteTreat",
                        text: '删除治疗预约'
                    },
                    {
                        value: "updateSurgery",
                        text: '修改手术预约'
                    },
                    {
                        value: "deleteSurgery",
                        text: '删除手术预约'
                    },
                    {
                        value: "updateCallbackTask",
                        text: '修改回访提醒'
                    },
                    {
                        value: "deleteCallbackTask",
                        text: '删除回访提醒'
                    },
                    {
                        value: "updateCallback",
                        text: '修改回访'
                    },
                    {
                        value: "deleteCallback",
                        text: '删除回访'
                    },
                    {
                        value: "updateOperation",
                        text: '修改划扣'
                    },
                    {
                        value: "deleteOperation",
                        text: '删除划扣'
                    },
                    {
                        value: "changeExploitOwnerShip",
                        text: '更改开发归属'
                    },
                    {
                        value: "changeManagerOwnerShip",
                        text: '更改咨询归属'
                    },
                    {
                        value: "deleteCommission",
                        text: '删除店家佣金'
                    },
                    {
                        value: "updateChargeCategory",
                        text: '修改收费项目类型'
                    },
                    {
                        value: "deleteChargeCategory",
                        text: '删除收费项目类型'
                    },
                    {
                        value: "updateCharge",
                        text: '修改收费项目'
                    },
                    {
                        value: "deleteCharge",
                        text: '删除收费项目'
                    },
                    {
                        value: "updateChargeSet",
                        text: '修改收费套餐'
                    },
                    {
                        value: "deleteChargeSet",
                        text: '删除收费套餐'
                    },
                    {
                        value: "updateProductCategory",
                        text: '修改物品类型'
                    },
                    {
                        value: "deleteProductCategory",
                        text: '删除物品类型'
                    },
                    {
                        value: "updateProduct",
                        text: '修改物品'
                    },
                    {
                        value: "deleteProduct",
                        text: '删除物品'
                    },
                    {
                        value: "updateSupplier",
                        text: '修改供应商'
                    },
                    {
                        value: "deleteSupplier",
                        text: '删除供应商'
                    },
                    {
                        value: "deleteStore",
                        text: '删除店家'
                    },
                    {
                        value: "updateUser",
                        text: '修改用户'
                    },
                    {
                        value: "deleteUser",
                        text: '删除用户'
                    },
                    {
                        value: "updateSaleBack",
                        text: '修改回款'
                    },
                    {
                        value: "deleteSaleBack",
                        text: '删除回款'
                    },
                    {
                        value: "deletePurchase",
                        text: '删除进货'
                    },
                    {
                        value: "deleteReturn",
                        text: '删除退货'
                    },
                    {
                        value: "deleteAllocate",
                        text: '删除调拨'
                    },
                    {
                        value: "deleteCheck",
                        text: '删除盘点'
                    },
                    {
                        value: "deleteUse",
                        text: '删除领用'
                    },
                ]
                for(let i in box) {
                    if(val == box[i].value) {
                        return box[i].text
                    }
                }
            },
            //获取分页
            getList(pageNumber, pageSize, form) {
                var _vm = this;
                // for(var key in form) {
                //     if(form[key] == '') {
                //         form[key] = null
                //     }
                // }
                form['pageNumber'] = pageNumber
                form['pageSize'] = pageSize
                console.log(form)
                _vm.$http.get({
                    url: 'guard-webManager/log/page.jhtml',
                    data: form,
                    success: function(res){
                        if(res.status == 200 ){
                            console.log(res.data.content)
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
            //日期获取
            saveDate (date) {
                this.formSearch.startTime = date[0]
                this.formSearch.endTime = date[1]
            },
            //获取医院下拉列表
            getHops () {
                var _vm = this;
                _vm.$http.get({
                    url: 'guard-webManager/select/hospitalList.jhtml',
                    success: function(res){
                        if(res.status == 200 ){
                            _vm.hospList = res.data.content
                        } else {
                            console.log(res.data.desc)
                        }
                    },
                    error: function(res){
                        console.log(res);
                    }
                });
            },
            //获取日志类型下拉列表
            getType () {
                var _vm = this;
                _vm.$http.get({
                    url: 'guard-webManager/select/logTypeInfo.jhtml',
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
            //重置
            handleReset (name) {
                this.$refs['dateTime'].handleClear();
                this.$refs[name].resetFields();
            },
            //分页
            changePage (num) {
                this.getList(num, '10', this.formSearch)
            },
        },
    }
</script>



