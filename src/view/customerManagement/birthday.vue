/**
 * 生日提醒
 */
<template>
    <div class="container-box" ref="containerBox">
        <div class="container-header">
            <h2>生日提醒</h2>
            <ul class="header-btn-group">
                <li class="header-item" @click="selectDate('day')"><Icon type="gear-b"></Icon>今天</li>
                <li class="header-item" @click="selectDate('wek')"><Icon type="gear-b"></Icon>本周</li>
                <li class="header-item" @click="selectDate('mou')"><Icon type="gear-b"></Icon>本月</li>
            </ul>
        </div>
        <div class="container-body">
            <Form  :label-width="80" inline>
                <Form-item label="选择日期">
                    <Date-picker type="daterange" placement="bottom-start" placeholder="选择日期" 
                    style="width: 200px" format="MM-dd" :value="nowDate" @on-change="dateChange"></Date-picker>
                </Form-item>
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
                        title: '客户编号',
                        key: 'id'
                    },
                    {
                        title: '客户姓名',
                        key: 'name',
                        render: (h, params) => {
                           return h('span', {
                                on: {
                                    click: () => {
                                        this.$router.push({path: 'customerIndex', query: {id: params.row.id}});
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
                    {
                        title: '性别',
                        key: 'gender',
                        render: (h, params) => {
                            var gender = '女';
                            if(params.row.gender == 1){
                                gender = '女';
                            }else{
                                gender = '男';
                            }
                            return h('span', gender)
                        }
                    },
                    {
                        title: '年龄',
                        key: 'age',
                        render: (h, params) => {
                            var age = 20;
                            if(params.row.birthyear != 0){
                                age = moment().format('YYYY') - params.row.birthyear;
                            }
                            return h('span', age)
                        }
                    },
                    {
                        title: '生日',
                        key: 'birthday'
                    },
                    {
                        title: '上门状态',
                        key: 'firstvisittime',
                        render: (h, params) => {
                            var firstVisit = '已上门';
                            if(params.row.firstvisittime != null){
                                firstVisit = '已上门';
                            }else{
                                firstVisit = '未上门';
                            }
                            return h('span', firstVisit)
                        }
                    },
                    {
                        title: '成交状态',
                        key: 'firstdealtime',
                        render: (h, params) => {
                            var firstDeal = '已成交';
                            if(params.row.firstdealtime != null){
                                firstDeal = '已成交';
                            }else{
                                firstDeal = '未成交';
                            }
                            return h('span', firstDeal)
                        }
                    },
                    {
                        title: '初诊日期',
                        key: 'firstvisittime',
                        render: (h, params) => {
                            if(params.row.firstvisittime != null){
                                return h('span', moment(params.row.firstvisittime).format('YYYY-MM-DD'))
                            }
                            
                        }
                    },
                    {
                        title: '最后光临',
                        key: 'lastvisittime',
                        render: (h, params) => {
                            if(params.row.lastvisittime != null){
                                return h('span', moment(params.row.lastvisittime).format('YYYY-MM-DD'))
                            }
                        }
                    },
                    {
                        title: '会员类型',
                        key: 'memberCategoryName'
                    },
                    {
                        title: '开发人员',
                        key: 'exploitUserName'
                    },
                    {
                        title: '咨询人员',
                        key: 'managerUserName'
                    },
                    {
                        title: '电话',
                        key: 'mobile'
                    }
                ],
                data: [],
                nowDate: [moment().format('MM-DD'), moment().format('MM-DD')],
                pageLodading: true,
                page: {}
            }
        },
        mounted () {
            this.getPageList();
        },
        methods: {
            getPageList: function(){
                var _vm = this;
                _vm.$http.get({
                    url: 'guard-webManager/birthday/list.jhtml',
                    data: {
                        pageNumber: _vm.currtPageNum || 1,
                        pageSize: 10,
                        startTime: _vm.nowDate[0],
                        endTime : _vm.nowDate[1]
                    },
                    success: function(data){
                        var data = data.data || {};
                        if(data.code == 0){
                            _vm.pageLodading = false;
                            try {
                                var content = data.content || [];
                                _vm.data = content.page.content || [];
                                _vm.page = {
                                    pageNumber: content.page.pageNumber,
                                    total: content.page.total,
                                    totalPages: content.page.totalPages
                                }
                                
                            } catch (error) {
                                _vm.data = [];
                                _vm.page = {}
                            }
                        }
                        
                    }
                });
            },
            dateChange: function(date) {
                this.pageLodading = true;
                this.nowDate = date;
                this.getPageList();
            },
            changePage: function(pageNum){
                this.currtPageNum = pageNum;
                this.pageLodading = true;
                this.getPageList();
            },
            selectDate: function(type){
                var date = [];
                const nowDate = new Date();
                if(type == 'day'){
                    date = [moment().format('MM-DD'), moment().format('MM-DD')];
                }else if(type == 'wek'){
                    var wek = nowDate.setTime(nowDate.getTime() - 3600 * 1000 * 24 * 7);
                    date = [moment(wek).format('MM-DD'), moment().format('MM-DD')];
                }else{
                    var mon = nowDate.setTime(nowDate.getTime() - 3600 * 1000 * 24 * 30);
                    date = [moment(mon).format('MM-DD'), moment().format('MM-DD')];
                }
                this.nowDate = date;
                this.pageLodading = true;
                this.getPageList();
            }
        }
    }
</script>
<style lang="scss" scoped>

</style>