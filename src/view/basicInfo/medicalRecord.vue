/**
 * 病例模板管理
 */

<template>
    <div class="container-box" ref="containerBox">
        <div class="container-header">
            <h2>病例模板管理</h2>
            <ul class="header-btn-group">
                <li class="header-item" @click="add"><Icon type="plus-round"></Icon>增加</li>
            </ul>
        </div>
        <div class="container-body">
            <Table stripe :columns="columns" :data="data"></Table>
            <Modal
                title="修改病例模板"
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
                        width: 300,
                        align: 'center',
                        render (row, column, index) {
                            return `<i-button type="primary" size="small" @click="edit(${index})">
                                        <Icon type="edit"></Icon>编辑
                                    </i-button> 
                                    <i-button type="error" size="small" @click="remove(${index})">
                                        <Icon type="ios-trash-outline"></Icon>删除
                                    </i-button>
                                    <i-button type="info" size="small" @click="build(${index})">
                                        <Icon type="ios-color-wand"></Icon>设计问卷
                                    </i-button>
                                    <i-button type="warning" size="small" @click="stamp(${index})">
                                        <Icon type="printer"></Icon>打印
                                    </i-button>`;
                        }
                    }
                ],
                data: [
                    {
                        name: '玻尿酸',
                        states: '1',
                        description: '公交广告'
                    },
                    {
                        name: '肉毒素',
                        states: '1',
                        description: '222'
                    },
                    {
                        name: '开发角',
                        states: '1',
                        description: '333'
                    },
                    {
                        name: '术后回访',
                        states: '0',
                        description: '654654'
                    },
                    {
                        name: '吸脂术后回访',
                        states: '1',
                        description: '6666'
                    }
                ],
                modalEdit: false,
                loading: true,
                formValidate: {
                    name: '',
                    states: '',
                    description: ''
                },
                ruleValidate: {
                    name: [
                        { required: true, message: '姓名不能为空', trigger: 'blur' }
                    ],
                    states: [
                        { required: true, message: '请选择状态', trigger: 'change' }
                    ]
                }
            }
        },
        methods: {
            add: function() {
                this.formValidate.name = ''
                this.formValidate.states = '1'
                this.formValidate.description = ''
                this.modalEdit = true
            },
            edit: function(index) {
                this.formValidate.name = this.data[index].name
                this.formValidate.states = this.data[index].states
                this.formValidate.description = this.data[index].description
                this.modalEdit = true
            },
            build: function(index) {
                var _vm = this;
                var breadData = [
                    {
                        url: '/desktop',
                        text: '桌面'
                    },
                    {
                        url: '/medicalRecord',
                        text: '病历模板管理'
                    }
                ];
                breadData.push({
                    url: '/medicalRecordEdit' + index,
                    text: this.data[index].name
                });
                this.$store.dispatch('setBreadData', breadData);
                this.$router.push('/medicalRecordEdit' + index)
            },
            stamp: function(index) {
                var _vm = this;
                var breadData = [
                    {
                        url: '/desktop',
                        text: '桌面'
                    },
                    {
                        url: '/medicalRecord',
                        text: '病历模板管理'
                    }
                ];
                breadData.push({
                    url: '/medicalRecordPrint' + index,
                    text: "打印设置"
                });
                this.$store.dispatch('setBreadData', breadData);
                this.$router.push('/medicalRecordPrint' + index)
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



