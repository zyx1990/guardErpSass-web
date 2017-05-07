/**
 * 权益管理
 */

<template>
    <div class="container-box" ref="containerBox">
        <div class="container-header">
            <h2>权益管理</h2>
        </div>
        <div class="container-body">
            <div class="equity-box">
                <h3><Icon type="pricetag"></Icon>折扣类权益</h3>
                <ul class="header-btn-group">
                    <li class="header-item" @click="add"><Icon type="plus-round"></Icon>增加</li>
                </ul>
            </div>
            <Table stripe :columns="columns" :data="data"></Table>
            <Modal
                title="修改权益"
                v-model="modalEdit"
                :closable="false"
                @on-ok="ok"
                :loading="loading"
                class-name="vertical-center-modal">
                <Form ref="formValidate" :model="formValidate" :rules="ruleValidate" :label-width="100" label-position="right">
                    <Form-item label="名称" prop="name">
                        <Input v-model="formValidate.name" placeholder="请输入名称"></Input>
                    </Form-item>
                    <Form-item label="折扣(0-100)" prop="sale">
                        <Input v-model="formValidate.sale" placeholder="请输入折扣"></Input>
                    </Form-item>
                    <Form-item label="内容" prop="content">
                        <Input v-model="formValidate.content" type="textarea" :autosize="{minRows: 2,maxRows: 5}" placeholder="请输入内容"></Input>
                    </Form-item>
                </Form>
            </Modal>
            <div class="equity-box second">
                <h3><Icon type="pricetag"></Icon>自定义权益</h3>
                <ul class="header-btn-group">
                    <li class="header-item"><Icon type="plus-round"></Icon>增加</li>
                </ul>
            </div>
            <Table stripe :columns="columns1" :data="data1"></Table>
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
                        title: '折扣(%)',
                        key: 'sale'
                    },
                    {
                        title: '内容',
                        key: 'content'
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
                columns1: [
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
                        title: '内容',
                        key: 'content'
                    },
                    {
                        title: '操作',
                        key: 'action',
                        width: 150,
                        align: 'center',
                        render (row, column, index) {
                            return `<i-button type="primary" size="small"><Icon type="edit"></Icon>编辑</i-button> <i-button type="error" size="small"><Icon type="ios-trash-outline"></Icon>删除</i-button>`;
                        }
                    } 
                ],
                data: [
                    {
                        name: '玻尿酸1',
                        sale: '95.00',
                        content: '561234'
                    },
                    {
                        name: '玻尿酸2',
                        sale: '7.00',
                        content: '56234'
                    }
                ],
                data1: [
                    {
                        name: '玻尿酸1',
                        content: '561234'
                    },
                    {
                        name: '玻尿酸2',
                        content: '56234'
                    }
                ],
                modalEdit: false,
                loading: true,
                formValidate: {
                    sale: '',
                    name: '',
                    content: ''
                },
                ruleValidate: {
                    sale: [
                        { required: true, message: '折扣不能为空', trigger: 'blur' }
                    ],
                    name: [
                        { required: true, message: '名称不能为空', trigger: 'blur' }
                    ]
                }
            }
        },
        methods: {
            add: function() {
                this.formValidate.sale = ''
                this.formValidate.name = ''
                this.formValidate.content = ''
                this.modalEdit = true
            },
            edit: function(index) {
                this.formValidate.sale = this.data[index].sale
                this.formValidate.name = this.data[index].name
                this.formValidate.content = this.data[index].content
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
                        title: '系统提示！',
                        desc: '保存成功！'
                    });
                }, 1000);
            }
        }
    }
</script>

<style scoped>
    .equity-box {
        overflow: hidden;
        padding-bottom: 15px;
    }
    .equity-box.second {
        padding-top: 15px;
    }
    .equity-box h3 {
        float: left;
        line-height: 29px;
        font-weight: normal;
    }
</style>
<style>
    .equity-box h3 i {
        margin-right: 10px;
    }
</style>



