/**
 * 投诉记录
 */
<template>
    <div class="container-box" ref="containerBox">
        <div class="container-header">
            <h2>投诉记录</h2>
        </div>
        <div class="container-body">
            <Form  :label-width="70" inline>
                <Form-item label="投诉日期">
                    <Date-picker type="daterange" placement="bottom-start" placeholder="选择日期" style="width: 200px" 
                    format="yyyy-MM-dd" @on-change="dateChange" :value="nowDate"></Date-picker>
                </Form-item>
                <Form-item label="类型">
                    <Select v-model="typeBox" clearable style="width:200px">
                        <Option v-for="item in typeList" :value="item.id" :key="item">{{ item.name }}</Option>
                    </Select>
                </Form-item>
                <Form-item label="客户编号">
                    <Input type="text" placeholder="请输入客户编号" style="width:200px" v-model="customID"></Input>
                </Form-item>
                <Form-item label="状态">
                    <Select v-model="statusBox" clearable style="width:200px">
                        <Option v-for="item in statusList" :value="item.value" :key="item">{{ item.label }}</Option>
                    </Select>
                </Form-item>
                <ul class="header-btn-group not-float">
                    <li class="header-item" @click="search"><Icon type="search"></Icon>查询</li>
                    <li class="header-item" @click="refresh"><Icon type="refresh"></Icon>重置</li>
                </ul>
            </Form>
            <Table stripe :columns="columns" :data="data"></Table>
            <div class="table-page">
                <div class="table-info">当前第{{page.pageNumber}}页，共{{page.totalPages}}页，总共{{page.total}}条记录</div>
                <Page class="table-paginate" :total="page.total" @on-change='changePage' :current='page.pageNumber'></Page>
            </div>
        </div>
        <Spin fix v-show="pageLodading">
            <Icon type="load-c" size=40 class="spin-icon-load"></Icon>
            <div>Loading</div>
        </Spin>
    </div>
</template>

<script>
    export default {
        data () {
            return {
                columns: [
                    {   
                        title: '序号',
                        type: 'index',
                        width: 60
                    },
                    {
                        title: '客户',
                        key: 'customerName',
                        render: (h, params) => {
                           return h('span', {
                                on: {
                                    click: () => {
                                        this.$router.push({path: 'customerIndex', query: {id: params.row.customerid}});
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
                                h('span', params.row.customerName+'('+params.row.customerid+')')
                            ]) 
                        }
                        
                    },
                    {
                        title: '投诉类型',
                        key: 'categoryName'
                    },
                    {
                        title: '投诉对象',
                        key: 'targetUserName'
                    },
                    {
                        title: '投诉项目',
                        key: 'chargeName'
                    },
                    {
                        title: '投诉内容',
                        key: 'content'
                    },
                    {
                        title: '提交时间',
                        key: 'createtime',
                        render: (h, params) => {
                            if(params.row.createtime != null){
                                return h('span', moment(params.row.createtime).format('YYYY-MM-DD'))
                            }
                            
                        }
                    },
                    {
                        title: '提交用户',
                        key: 'createUserName'
                    },
                    {
                        title: '状态',
                        key: 'status',
                        render: (h, params) => {
                            var status = params.row.status;
                            var statusText = '已处理';
                            if(status == 1){
                                statusText = '已处理';
                            }else{
                                statusText = '未处理';
                            }
                            return h('span', statusText);

                        }
                    
                    },
                    {
                        title: '处理用户',
                        key: 'finishUserName'
                    },
                    {
                        title: '处理时间',
                        key: 'finishtime',
                        render: (h, params) => {
                            if(params.row.finishtime != null){
                                return h('span', moment(params.row.finishtime).format('YYYY-MM-DD'))
                            }
                            
                        }
                    },
                    {
                        title: '处理措施',
                        key: 'solution'
                    },
                    {
                        title: '客户反馈',
                        key: 'feedback'
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
                                        type: 'primary',
                                        size: 'small',
                                        icon: 'edit'
                                    },
                                    style: {
                                        marginRight: '5px'
                                    },
                                    on: {
                                        click: () => {
                                            //this.edit(params.row, 2)
                                        }
                                    }
                                }, '操作')    
                            ])

                        }
    
                    }
                ],
                data: [],
                statusBox: '',
                statusList: [
                    {
                        value: '1',
                        label: '已处理'
                    },
                    {
                        value: '0',
                        label: '未处理'
                    }
                ],
                typeBox: '',
                typeList: [],
                customID: '',
                page: {},
                currtPageNum: 1,
                pageLodading: true,
                nowDate: [moment().format('YYYY-MM-DD'), moment().format('YYYY-MM-DD')]
            }
        },
        mounted: function() {
            this.getPage();
            this.getAllComplainCategoryInfo();
        },
        methods: {
            getPage: function(){
                var _vm = this;
                _vm.$http.get({
                    url: 'guard-webManager/complain/page.jhtml',
                    data: {
                        pageNumber: _vm.currtPageNum || 1,
                        pageSize: 10,
                        startTime: _vm.nowDate[0],
                        endTime: _vm.nowDate[1],
                        categoryId: '',
                        customerId: _vm.customID,
                        status: _vm.statusBox
                    },
                    success: function(data){
                        var data = data.data || {};
                        if(data.code == 0){
                            _vm.pageLodading = false;
                            try {
                                var content = data.content || [];
                                _vm.data = content.content || [];
                                _vm.page = {
                                    pageNumber: content.pageNumber,
                                    total: content.total,
                                    totalPages: content.totalPages
                                }
                            } catch (error) {
                                _vm.data = [];
                                _vm.page = {}
                            }
                        }
                        
                    }

                });
            },
            getAllComplainCategoryInfo: function(){
                var _vm = this;
                _vm.$http.get({
                    url: 'guard-webManager/select/allComplainCategoryInfo.jhtml',
                    success: function(data){
                        var data = data.data || {};
                        if(data.code == 0){
                            try {
                                _vm.typeList = data.content || []
                            } catch (error) {
                                _vm.typeList = [];
                            }
                        }
                        

                    }
                });
            },
            handle: function(index) {
                
            },
            search: function(){
                 this.getPageList();
            },
            refresh: function(){
                var _vm = this;
                _vm.nowDate = [moment().format('YYYY-MM-DD'), moment().format('YYYY-MM-DD')];
                _vm.customID = '';
                _vm.statusBox = '';
                _vm.typeBox = '';

            },
            dateChange: function(date) {
                this.pageLodading = true;
                this.nowDate = date;
                this.getPage();
            },
            changePage: function(pageNum){
                this.currtPageNum = pageNum;
                this.pageLodading = true;
                this.getPageList();
            },
        }
    }
</script>



