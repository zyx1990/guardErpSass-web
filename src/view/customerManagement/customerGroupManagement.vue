/*
分组管理
*/
<template>
	<div class="container-box">
		<div class="container-header">
			<h2>客户组————{{GroupManagementName}}</h2>
			<ul class="header-btn-group">
		    	<li class="header-item" @click="clear"><Icon type="plus-round"></Icon>清空</li>
                <li class="header-item" @click="add"><Icon type="plus-round"></Icon>添加客户</li>
                <li class="header-item" @click="importResult"><Icon type="plus-round"></Icon>导入结果集</li>
                <li class="header-item" @click="batchSet"><Icon type="plus-round"></Icon>批量设置回访</li>
			</ul>
		</div>
		<div class="container-body">
			<Table stripe :columns="columns" :data="data"></Table>
            <div class="table-page">
                <div class="table-info">当前第{{page.pageNumber}}页，共{{page.totalPages}}页，总共{{page.total}}条记录</div>
                <Page class="table-paginate" :total="page.total" @on-change='changePage' :current='page.pageNumber'></Page>
            </div>
            <Modal
                title="添加客户"
                v-model="modalAdd"
                :closable="false"
                @on-ok="modalAddOk"
                :loading="loading"
                class-name="vertical-center-modal">
                <Form :model="modalAddForm" :label-width="100" label-position="right">
                    <Form-item label="文本域">
                        <Input v-model="modalAddForm.textarea" type="textarea" :autosize="{minRows: 3,maxRows: 5}" 
                        placeholder="请输入..."></Input>
                    </Form-item>
                   
                </Form>
            </Modal>

            <Modal
                title="导入结果集"
                v-model="modalImport"
                :closable="false"
                @on-ok="modalImportOk"
                :loading="loading"
                class-name="vertical-center-modal">
                <Form :model="modalImportForm" :label-width="100" label-position="right">
                    <Form-item label="结果集">
                        <Select v-model="modalImportForm.select" placeholder="请选择">
                            <Option value="beijing">北京市</Option>
                            <Option value="shanghai">上海市</Option>
                            <Option value="shenzhen">深圳市</Option>
                        </Select>
                    </Form-item>
                </Form>
            </Modal>


            <Modal
                title="批量设置回访"
                v-model="modalBatch"
                :closable="false"
                @on-ok="modalBatchOk"
                :loading="loading"
                class-name="vertical-center-modal">
                <Form :model="modalBatchForm" :label-width="100" label-position="right">
                   
                </Form>
            </Modal>
		</div>
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
                        key: 'createuserid'
                    },
                    {
                        title: '客户姓名',
                        key: 'name'
                    },
                    {
                        title: '性别',
                        key: 'sort'
                    },
                    {
                        title: '渠道',
                        key: 'sort'
                    },
                    {
                        title: '主咨询项目',
                        key: 'sort'
                    },
                    {
                        title: '会员类型',
                        key: 'sort'
                    },
                    
                ],
                data: [],
                modalAdd: false,
                modalImport: false,
                modalBatch: false,
                loading: true,
                modalAddForm: {},
                modalImportForm: {},
                modalBatchForm: {},
                page: {},
                currtPageNumber: 1,
                GroupManagementName: ''

            }
        },
        mounted: function () {
          this.query = this.$route.query;
          this.GroupManagementName = this.$store.getters.getBreadData.reverse()[0].text;
         
          this.getList();
        },
        methods: {
            getList: function(){
                var _vm = this;
                _vm.$http.get({
                    url: 'guard-webManager/customerGroup/getGroupDetail.jhtml',
                    data: {
                        id: _vm.query.id,
                        pageNumber: _vm.query.currtPageNumber || 1,
                        pageSize: 10
                    },
                    success: function(data){
                        var data = data.data || {};
                        try {
                            var content = data.content || {};
                            _vm.data = content.content || [];
                            _vm.page = {
                                pageNumber: content.pageNumber,
                                total: content.total,
                                totalPages: content.totalPages
                            }
                        } catch (error) {
                            _vm.data = {};
                        }

                    }
                });
            },
            changePage: function(pageNum){
                this.currtPageNum = pageNum;
                this.getList();
            },
            clear: function(row){
                var _vm = this;
                _vm.$Modal.confirm({
                    title: '系统提示',
                    content: '确定清空'+ _vm.GroupManagementName +'?',
                    onOk: () => {
                        _vm.$http.post({
                            url: 'guard-webManager/customerGroup/clear.jhtml',
                            data: {
                                id: _vm.query.id
                            },
                            success: function(data){
                                var data = data.data || {};
                                if(data.code == 0){
                                    this.$Notice.success({
                                        title: '系统提示！',
                                        desc: '删除成功！'
                                    });
                                    this.getList();
                                }
                            }
                        });
                    }
                });
            },
            add: function(){
                this.modalAdd = true;
            },
            modalAddOk: function() {
                

            },
            importResult: function(){
                this.modalImport = true;
            },
            modalImportOk: function(index) {
                
            },
            batchSet: function(){
                this.modalBatch = true;
            },
            modalBatchOk: function(index) {

            }

        }
    }
</script>