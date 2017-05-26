/**
 * 项目折扣
 */

<template>
    <div class="container-box" ref="containerBox">
        <div class="container-header">
            <h2>收费项目折扣限制</h2>
            <ul class="header-btn-group">
                <li class="header-item" @click='add'><Icon type="plus-round"></Icon>增加</li>
            </ul>
        </div>
        <div class="container-body">
            <Form :label-width="50" inline ref='formSearch' :model='formSearch'>
                <Form-item label="名称" prop='name'>
                    <Input v-model="formSearch.name" placeholder="请输入名称"></Input>
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
            <Modal
                :title="modalTit"
                v-model="modalEdit"
                :closable="false"
                @on-ok="ok"
                :loading="loading"
                class-name="vertical-center-modal">
                <Form ref="formValidate" :model="formValidate" :rules="ruleForm" :label-width="100" label-position="right">
                    <Form-item label="收费项目" prop="chargeId" required>
                        <Input v-model="objName" readonly icon="ios-search" placeholder="请选择收费项目" @on-focus='show'></Input>
                    </Form-item>
                    <Form-item label="折扣" prop="discount" required>
                        <Input v-model="formValidate.discount" placeholder="请输入折扣"></Input>
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
                        width: 70,
                        render: (h, params) => {
                            const _index = (this.pageNumber - 1) * 10
                            return h('span', params.index + 1 + _index)
                        }
                    },
                    {
                        title: '项目编号',
                        key: 'chargeID'
                    },
                    {
                        title: '项目名称',
                        key: 'chargeName'
                    },
                    {
                        title: '类型',
                        key: 'chargeCategoryName'
                    },
                    {
                        title: '价格',
                        key: 'chargePrice',
                        render: (h,params) => {
                            return h('span', {
                                style: {
                                    color: 'orange'
                                }
                            }, '￥' + (params.row.chargePrice).toFixed(2))
                        }
                    },
                    {
                        title: '折扣(%)',
                        key: 'discount',
                        render: (h, params) => {
                            return h('span', (params.row.discount * 100).toFixed(2))
                        }
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
                                            type: 'primary',
                                            size: 'small',
                                            icon: 'edit'
                                        },
                                        style: {
                                            marginRight: '5px'
                                        },
                                        on: {
                                            click: () => {
                                                this.edit(params.row)
                                            }
                                        }
                                    }, '编辑'),
                                    h('Button', {
                                        props: {
                                            type: 'error',
                                            size: 'small',
                                            icon: 'ios-trash-outline'
                                        },
                                        on: {
                                            click: () => {
                                                this.remove(params.row)
                                            }
                                        }
                                    }, '删除'),
                                ])
                        }
                    }
                ],
                data: [],
                total: '',
                totalPages: '',
                pageNumber: '1',
                formSearch: {
                    name: ''
                },
                modalTit: '',
                modalEdit: false,
                loading: true,
                key: true,
                formValidate: {
                    id: '',
                    discount: '',
                    chargeId: ''
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
                ruleForm: {}
            }
        },
        computed: {
            totalNum: function () {
                return this.total * 1
            },
            pageNum: function () {
                return this.pageNumber * 1
            }
        },
        created () {
            this.getList('1', '10', this.formSearch)
        },
        methods: {
            getList(pageNumber, pageSize, form) {
                var _vm = this;
                form['pageNumber'] = pageNumber
                form['pageSize'] = pageSize
                _vm.$http.get({
                    url: 'guard-webManager/chargeDiscount/page.jhtml',
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
            remove (data) {
                var _vm = this;
                _vm.$Modal.confirm({
                    title: '系统提示',
                    content: '确定删除'+ data.name +'?',
                    onOk: () => {
                        _vm.$http.post({
                            url: 'guard-webManager/chargeDiscount/del.jhtml',
                            data: {id: data.id},
                            success: function(res){
                                console.log(res)
                                if(res.status == 200 ){
                                    if(res.data.code == 0) {
                                        _vm.getList('1', '10', _vm.formSearch)
                                        _vm.$Notice.success({
                                            title: '系统提示！',
                                            desc: '删除成功！'
                                        });
                                    } else {
                                        _vm.$Notice.error({
                                            title: '系统提示！',
                                            desc: res.data.desc
                                        });
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
                    onCancel: () => {
                        
                    }
                });
            },
            changePage (num) {
                this.getList(num, '10', this.formSearch)
            },
            handleReset (name) {
                this.$refs[name].resetFields();
            },
            add () {
                var _vm = this;
                _vm.modalTit = '添加收费项目折扣'
                _vm.$refs['formValidate'].resetFields();
                _vm.objName = ''
                _vm.key = false
                _vm.modalEdit = true
                _vm.loading = true;
            },
            show () {
                this.modal2 = true
            },
            chooseObj (data) {
                this.formValidate.chargeId = data.id
                this.objName = data.categoryName
                this.modal2 = false
            },
            ok () {
                var _vm = this;
                _vm.$refs['formValidate'].validate((valid) => {
                    if (valid) {
                        var url = '';
                        if(_vm.key) {
                            url = 'guard-webManager/chargeDiscount/update.jhtml'
                        } else {
                            url = 'guard-webManager/chargeDiscount/add.jhtml'
                        }
                        _vm.$http.post({
                            url: url,
                            data: _vm.formValidate,
                            success: function(res){
                                if(res.status == 200 ){
                                    _vm.getList('1', '10', _vm.formSearch)
                                    _vm.$refs['formValidate'].resetFields();
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
                    } else {
                        _vm.loading = false;
                    }
                })
            }, 
        }
    }
</script>