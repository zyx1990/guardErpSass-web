/**
 * 客户选择器
 */

<template>
    <div class="container-box" ref="containerBox">
        <div class="container-header">
            <h2>客户结果集</h2>
            <ul class="header-btn-group">
                <li class="header-item" @click="add"><Icon type="plus-round"></Icon>增加</li>
                <li class="header-item"><Icon type="social-buffer"></Icon></Icon>合并</li>
                <li class="header-item">
                    <Dropdown style="margin-left: 20px">
                        <a href="javascript:void(0)" class="header-item-drow">
                            添加查询
                            <Icon type="arrow-down-b"></Icon>
                        </a>
                        <Dropdown-menu slot="list">
                            <Dropdown-item>驴打滚</Dropdown-item>
                            <Dropdown-item>炸酱面</Dropdown-item>
                            <Dropdown-item>豆汁儿</Dropdown-item>
                            <Dropdown-item>冰糖葫芦</Dropdown-item>
                            <Dropdown-item>北京烤鸭</Dropdown-item>
                        </Dropdown-menu>
                    </Dropdown>
                </li>
            </ul>
        </div>
        <div class="container-body">
            <Table stripe :columns="columns" :data="data"></Table>
            <Modal
                title="修改客户结果集"
                v-model="modalEdit"
                :closable="false"
                @on-ok="ok"
                :loading="loading"
                class-name="vertical-center-modal">
                <Form ref="formValidate" :model="formValidate" :rules="ruleValidate" :label-width="100" label-position="right">
                    <Form-item label="名称" prop="name">
                        <Input v-model="formValidate.name" placeholder="请输入名称"></Input>
                    </Form-item>
                    <Form-item label="备注" prop="description">
                        <Input v-model="formValidate.description" type="textarea" :autosize="{minRows: 2,maxRows: 5}" placeholder="请输入备注"></Input>
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
                columns: [
                    {   
                        title: '序号',
                        type: 'index',
                        width: 60
                    },
                    {
                        title: '名称',
                        key: 'name'
                    },
                    {
                        title: '创建用户',
                        key: 'creatUser'
                    },
                    {
                        title: '备注',
                        key: 'description'
                    },
                    {
                        title: '操作',
                        key: 'action',
                        width: 300,
                        align: 'center',
                        render (row, column, index) {
                            return `<i-button type="primary" size="small" @click="edit(${index})"><Icon type="edit"></Icon>编辑</i-button> <i-button type="error" size="small" @click="remove(${index})"><Icon type="ios-trash-outline"></Icon>删除</i-button>
                                <i-button type="info" size="small" @click="build(${index})"><Icon type="ios-color-wand"></Icon>详细</i-button>
                                <i-button type="warning" size="small" @click="stamp(${index})"><Icon type="wrench"></Icon>权限</i-button>`;
                        }
                    }
                ],
                data: [
                    {
                        name: '玻尿酸',
                        creatUser: '李小龙',
                        description: '公交广告'
                    },
                    {
                        name: '肉毒素',
                        creatUser: '李小龙',
                        description: '222'
                    },
                    {
                        name: '开发角',
                        creatUser: '李小龙',
                        description: '333'
                    },
                    {
                        name: '术后回访',
                        creatUser: '李小龙',
                        description: '654654'
                    },
                    {
                        name: '吸脂术后回访',
                        creatUser: '李小龙',
                        description: '6666'
                    }
                ],
                modalEdit: false,
                loading: true,
                formValidate: {
                    name: '',
                    description: ''
                },
                ruleValidate: {
                    name: [
                        { required: true, message: '姓名不能为空', trigger: 'blur' }
                    ]
                }
            }
        },
        mounted () {
            this.getList();
        },
        methods: {
            getList: function(){
                var _vm = this;
                _vm.$http.get({
                    url: 'guard-webManager/customerFilter/list.jhtml',
                    success: function(res){
                        console.log(res);
                    }
                });
            },
            add: function() {
                this.formValidate.name = ''
                this.formValidate.description = ''
                this.modalEdit = true
            },
            edit: function(index) {
                this.formValidate.name = this.data[index].name
                this.formValidate.description = this.data[index].description
                this.modalEdit = true
            },
            build: function(index) {

            },
            stamp: function(index) {

            },
            remove: function(index) {
                this.$Modal.confirm({
                    title: '系统提示',
                    content: '确定删除'+ this.data[index].name +'?',
                    onOk: () => {
                        this.$Notice.success({
                             title: '系统提示！',
                             desc: '删除成功！'
                        });
                    },
                    onCancel: () => {
                        
                    }
                });
            },
            ok () {
                setTimeout(() => {
                    this.modalEdit = false;
                    this.$Notice.success({
                        title: '系统提示！',
                        desc: '保存成功！'
                    });
                }, 1000);
            }
        }
    }
</script>

<style scoped>
    .header-item-drow {
        color: #fff;
    }
</style>



