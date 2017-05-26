/**
 * 病历模板管理设计页面
 */

<template>
    <div class="container-box">
        <div class="container-header">
            <h2>病历模板管理</h2>
            <ul class="header-btn-group">
                <li class="header-item" @click="addEasy"><Icon type="plus-round"></Icon>添加项目</li>
                <li class="header-item" @click="rtf"><Icon type="plus-round"></Icon>添加复杂项目</li>
            </ul>
        </div>
        <div class="container-body">
            <Table stripe :columns="columns" :data="data"></Table>
            <Modal
                title="添加项目"
                v-model="modalEdit"
                :closable="false"
                @on-ok="ok"
                :loading="loading"
                class-name="vertical-center-modal">
                <Form ref="formValidate" :model="formValidate" :rules="ruleValidate" :label-width="100" label-position="right">
                    <Form-item label="名称" prop="name">
                        <Input v-model="formValidate.name" placeholder="请输入名称"></Input>
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
                        title: '题目',
                        key: 'title'
                    },
                    {
                        title: '调整顺序',
                        key: 'action',
                        width: 200,
                        align: 'center',
                        render (row, column, index) {
                            return `<i-button type="primary" size="small" @click="up(${index})">
                                        <Icon type="arrow-up-c"></Icon>
                                    </i-button> 
                                    <i-button type="error" size="small" @click="down(${index})">
                                        <Icon type="arrow-down-c"></Icon>
                                    </i-button>`;
                        }
                    },
                    {
                        title: '操作',
                        key: 'action',
                        width: 250,
                        align: 'center',
                        render (row, column, index) {
                            return `<i-button type="primary" size="small" @click="edit(${index})">
                                        <Icon type="edit"></Icon>编辑
                                    </i-button> 
                                    <i-button type="error" size="small" @click="remove(${index})">
                                        <Icon type="ios-trash-outline"></Icon>删除
                                    </i-button>`;
                        }
                    }
                ],
                data: [
                    {
                        title: '1'
                    },
                    {
                        title: '2'
                    },
                    {
                        title: '3'
                    }
                ],
                modalEdit: false,
                loading: true,
                formValidate: {
                    name: ''
                },
                ruleValidate: {
                    name: [
                        { required: true, message: '姓名不能为空', trigger: 'blur' }
                    ]
                }
            }
        },
        methods: {
            up (index) {
                var temp;
                if(index != 0) {
                    temp = this.data[index]
                    this.$set(this.data, index, this.data[index - 1])
                    this.$set(this.data, index - 1, temp)
                }
            },
            down (index) {
                var temp;
                if(index != this.data.length - 1) {
                    temp = this.data[index]
                    this.$set(this.data, index, this.data[index + 1])
                    this.$set(this.data, index + 1, temp)
                }
            },
            edit () {

            },
            remove (index) {
                this.$Modal.confirm({
                    title: '系统提示',
                    content: '确定删除'+ this.data[index].title +'?',
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
            addEasy () {
                this.resetField()
                this.formValidate.name = ''
                this.modalEdit = true
            },
            rtf () {
                this.$router.push('/medicalRecordRtf0')
            },
            ok () {
                setTimeout(() => {
                    this.modalEdit = false;
                    this.$Notice.success({
                        title: '系统提示！',
                        desc: '保存成功！'
                    });
                }, 1000);
            },
            resetField () {
                this.$refs.formValidate.fields.forEach(field => {
                    field.resetField();
                });
            }
        }
    }
</script>