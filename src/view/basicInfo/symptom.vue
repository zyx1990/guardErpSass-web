/**
 * 症状管理页面
 */

<template>
    <div class="container-box">
        <div class="container-header">
            <h2>症状管理</h2>
            <ul class="header-btn-group">
                <li class="header-item" @click="add"><Icon type="plus-round"></Icon>增加</li>            
            </ul>
        </div>
        <div class="container-body">
            <Table stripe :columns="columns" :data="data"></Table>
            <Modal
                title="修改症状"
                v-model="modalEdit"
                :closable="false"
                @on-ok="ok"
                :loading="loading"
                class-name="vertical-center-modal">
                <Form ref="formValidate" :model="formValidate" :rules="ruleValidate" :label-width="100" label-position="right">
                    <Form-item label="名称" prop="name">
                        <Input v-model="formValidate.name" placeholder="请输入名称"></Input>
                    </Form-item>
                    <Form-item label="状态" prop="states">
                        <Radio-group v-model="formValidate.states">
                            <Radio label="1">启用</Radio>
                            <Radio label="0">禁用</Radio>
                        </Radio-group>
                    </Form-item>
                    <Form-item label="排序号" prop="sort">
                        <Input v-model="formValidate.sort" placeholder="请输入排序号"></Input>
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
                        title: '排序号',
                        key: 'sort'
                    },
                    {
                        title: '状态',
                        key: 'states',
                        render (row) {
                            const color = row.states == 1 ? 'blue' : 'red';
                            const text = row.states == 1 ? '启用' : '禁用';
                            return `<span style='color:${color};'>${text}</span>`;
                        }
                    },
                    {
                        title: '描述',
                        key: 'description'
                    },
                    {
                        title: '操作',
                        key: 'action',
                        width: 150,
                        align: 'center',
                        render (row, column, index) {
                            return `<i-button type="primary" size="small" @click="edit(${index})"><Icon type="edit"></Icon>编辑</i-button> <i-button type="error" size="small" @click="remove(${index})"><Icon type="ios-trash-outline"></Icon>删除</i-button>`;
                        }
                    }
                ],
                data: [
                    {
                        name: '鼻部整形',
                        sort: 1,
                        states: '1',
                        description: '公交广告'
                    },
                    {
                        name: '眼部整形',
                        sort: 1,
                        states: '1',
                        description: '222'
                    },
                    {
                        name: '胸部整形',
                        sort: 1,
                        states: '1',
                        description: '333'
                    },
                    {
                        name: '吸脂',
                        sort: 1,
                        states: '0',
                        description: '654654'
                    },
                    {
                        name: '脱毛',
                        sort: 1,
                        states: '1',
                        description: '6666'
                    }
                ],
                modalEdit: false,
                loading: true,
                formValidate: {
                    name: '',
                    states: '',
                    sort: '',
                    description: ''
                },
                ruleValidate: {
                    name: [
                        { required: true, message: '姓名不能为空', trigger: 'blur' }
                    ],
                    states: [
                        { required: true, message: '请选择状态', trigger: 'change' }
                    ],
                    sort: [
                        { required: true, message: '排序号不能为空', trigger: 'blur' },
                        { type: 'number', message: '排序号格式不正确', trigger: 'blur' }
                    ]
                }
            }
        },
        methods: {
            add: function() {
                this.formValidate.name = ''
                this.formValidate.states = '1'
                this.formValidate.sort = ''
                this.formValidate.description = ''
                this.modalEdit = true
            },
            edit: function(index) {
                this.formValidate.name = this.data[index].name
                this.formValidate.states = this.data[index].states
                this.formValidate.sort = this.data[index].sort
                this.formValidate.description = this.data[index].description
                this.modalEdit = true
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
                        title: '修改成功！',
                        desc: '保存成功！'
                    });
                }, 1000);
            }
        }
    }
</script>



