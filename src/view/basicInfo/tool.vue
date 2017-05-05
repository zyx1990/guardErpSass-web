/**
 * 工具管理
 */

<template>
    <div class="container-box" ref="containerBox">
        <div class="container-header">
            <h2>工具类型管理</h2>
            <ul class="header-btn-group">
                <li class="header-item" @click="add"><Icon type="plus-round"></Icon>增加</li>
            </ul>
        </div>
        <div class="container-body">
            <Table stripe :columns="columns" :data="data"></Table>
            <Modal
                title="修改工具类型"
                v-model="modalEdit"
                :closable="false"
                @on-ok="ok"
                :loading="loading"
                class-name="vertical-center-modal">
                <Form ref="formValidate" :model="formValidate" :rules="ruleValidate" :label-width="100" label-position="right">
                    <Form-item label="代码" prop="code">
                        <Input v-model="formValidate.code" placeholder="请输入代码"></Input>
                    </Form-item>
                    <Form-item label="名称" prop="name">
                        <Input v-model="formValidate.name" placeholder="请输入名称"></Input>
                    </Form-item>
                    <Form-item label="备注" prop="remark">
                        <Input v-model="formValidate.remark" type="textarea" :autosize="{minRows: 2,maxRows: 5}" placeholder="请输入备注"></Input>
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
                        title: '代码',
                        key: 'code'
                    },
                    {
                        title: '名称',
                        key: 'name'
                    },
                    {
                        title: '备注',
                        key: 'remark'
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
                        code: 'a123d',
                        name: '玻尿酸1',
                        remark: '561234'
                    },
                    {
                        code: 'aasd',
                        name: '玻尿酸2',
                        remark: '56234'
                    },
                    {
                        code: 'asa123sd',
                        name: '玻尿酸3',
                        remark: '5464'
                    },
                    {
                        code: 'ad',
                        name: '玻尿酸5',
                        remark: '5654'
                    },
                    {
                        code: 'asda123sd',
                        name: '玻尿酸7',
                        remark: '564'
                    }
                ],
                modalEdit: false,
                loading: true,
                formValidate: {
                    code: '',
                    name: '',
                    remark: ''
                },
                ruleValidate: {
                    code: [
                        { required: true, message: '代码不能为空', trigger: 'blur' }
                    ],
                    name: [
                        { required: true, message: '名称不能为空', trigger: 'blur' }
                    ]
                }
            }
        },
        methods: {
            add: function() {
                this.formValidate.code = ''
                this.formValidate.name = ''
                this.formValidate.remark = ''
                this.modalEdit = true
            },
            edit: function(index) {
                this.formValidate.code = this.data[index].code
                this.formValidate.name = this.data[index].name
                this.formValidate.remark = this.data[index].remark
                this.modalEdit = true
            },
            remove: function(index) {
                this.$Modal.confirm({
                    title: '系统提示',
                    content: '确定删除'+ this.data[index].code +'?',
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



