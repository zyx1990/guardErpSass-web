/**
 * 客户组管理
 */

<template>
    <div class="container-box" ref="containerBox">
        <div class="container-header">
            <h2>客户组管理</h2>
            <ul class="header-btn-group">
                <li class="header-item" @click="add"><Icon type="plus-round"></Icon>增加</li>
            </ul>
        </div>
        <div class="container-body">
            <Form  :label-width="50" inline>
                <Form-item label="名称">
                    <Input type="text" placeholder="请输入名称"></Input>
                </Form-item>
                <ul class="header-btn-group not-float">
                    <li class="header-item"><Icon type="search"></Icon>查询</li>
                    <li class="header-item"><Icon type="refresh"></Icon>重置</li>
                </ul>
            </Form>
            <Table stripe :columns="columns" :data="data"></Table>
            <Modal
                title="修改客户组"
                v-model="modalEdit"
                :closable="false"
                @on-ok="ok"
                :loading="loading"
                class-name="vertical-center-modal">
                <Form ref="formValidate" :model="formValidate" :rules="ruleValidate" :label-width="100" label-position="right">
                    <Form-item label="名称" prop="name">
                        <Input v-model="formValidate.name" placeholder="请输入名称"></Input>
                    </Form-item>
                    <Form-item label="描述" prop="description">
                        <Input v-model="formValidate.description" type="textarea" :autosize="{minRows: 2,maxRows: 5}" placeholder="请输入描述"></Input>
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
                        title: '说明',
                        key: 'description'
                    },
                    {
                        title: '操作',
                        key: 'action',
                        width: 250,
                        align: 'center',
                        render (row, column, index) {
                            return `<i-button type="primary" size="small" @click="edit(${index})"><Icon type="edit"></Icon>编辑</i-button> <i-button type="error" size="small" @click="remove(${index})"><Icon type="ios-trash-outline"></Icon>删除</i-button>
                                <i-button type="info" size="small" @click="build(${index})"><Icon type="ios-color-wand"></Icon>管理分组</i-button>`;
                        }
                    }
                ],
                data: [
                    {
                        name: '玻尿酸',
                        description: '公交广告'
                    },
                    {
                        name: '肉毒素',
                        description: '222'
                    },
                    {
                        name: '开发角',
                        description: '333'
                    },
                    {
                        name: '术后回访',
                        description: '654654'
                    },
                    {
                        name: '吸脂术后回访',
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
        methods: {
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



