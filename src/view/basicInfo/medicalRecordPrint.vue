/**
 * 病历模板打印设置页面
 */

<template>
    <div class="container-box">
        <div class="container-header">
            <h2>打印设置管理</h2>
        </div>
        <div class="container-body">
            <Table stripe :columns="columns" :data="data" :show-header='false'></Table>
            <Modal
                title="添加项目"
                v-model="modalEdit"
                :closable="false"
                @on-ok="ok"
                :loading="loading"
                class-name="vertical-center-modal">
                <Form ref="formValidate" :model="formValidate" :rules="ruleValidate" :label-width="100" label-position="right">
                    <Form-item label="宽度" prop="width" v-if='!seen'>
                        <Input v-model="formValidate.width" placeholder="请输入宽度"></Input>
                    </Form-item>
                    <Form-item label="大小" prop="size" v-if='seen'>
                        <Input v-model="formValidate.size" placeholder="请输入大小"></Input>
                    </Form-item>
                    <Form-item label="类型" prop="type" v-if='seen'>
                        <Select v-model="formValidate.type" placeholder="请选择类型">
                            <Option value="1">单选题</Option>
                            <Option value="2">多选题</Option>
                        </Select>
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
                        title: '标题',
                        key: 'title',
                        width: 150,
                        className: 'table-info-column'
                    },
                    {
                        title: '内容',
                        key: 'content'
                    },
                    {
                        title: '操作',
                        key: 'action',
                        width: 100,
                        align: 'center',
                        render (row, column, index) {
                            return `<i-button type="primary" size="small" @click="edit(${index})">
                                        <Icon type="edit"></Icon>编辑
                                    </i-button>`;
                        }
                    }
                ],
                data: [
                    {
                        title: '宽度',
                        content: '123'
                    },
                    {
                        title: '字体',
                        content: '23123'
                    },
                    {
                        title: '模板',
                        content: '666'
                    }
                ],
                modalEdit: false,
                loading: true,
                seen: true,
                formValidate: {
                    width: '',
                    size: '',
                    type: ''
                },
                ruleValidate: {
                    width: [
                        { required: true, message: '宽度不能为空', trigger: 'blur' }
                    ],
                    size: [
                        { required: true, message: '大小不能为空', trigger: 'blur' }
                    ],
                    type: [
                        { required: true, message: '请选择', trigger: 'blur' }
                    ]
                }
            }
        },
        methods: {
            edit (index) {
                switch (index) {
                    case 0 :
                        this.seen = false;
                        this.modalEdit = true;
                        break;
                    case 1 :
                        this.seen = true;
                        this.modalEdit = true;
                        break;
                    case 2 :
                        this.$router.push('/medicalRecordUpdate')
                }
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