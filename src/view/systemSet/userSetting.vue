/**
 * 批量添加角色页面
 */

<template>
    <div class="container-box">
        <div class="container-header">
            <h2>{{titMsg}}</h2>
        </div>
        <div class="container-body">
            <Form :label-width="100" ref="formValidate" :model="formValidate" label-position="right" :rules="ruleValidate">
                <Form-item label="角色" prop="role">
                    <Select v-model="formValidate.role" placeholder="请选择角色">
                        <Option value="1">男</Option>
                        <Option value="0">女</Option>
                    </Select>
                </Form-item>
                <Form-item label="用户列表" prop="list" >
                    <Row>
                        <Col span="20">
                            <Table stripe :columns="columns" :data="data11" :context="self"></Table>
                        </Col>
                        <Col span="3" offset="1" class='table-left-btn'>
                            <Button type="primary" shape="circle" icon="plus-round" @click='add'>增加</Button>
                        </Col>
                    </Row>
                </Form-item>
            </Form>
            <div class="footer-btnGroup">
                <Button type="primary" shape="circle" icon="checkmark">保存</Button>
                <Button type="primary" shape="circle" icon="android-arrow-back">返回</Button>
            </div>
            <Modal
                title="选择用户"
                v-model="modalEdit"
                :width='700'
                :closable="false"
                @on-ok="ok"
                :loading="loading"
                class-name="vertical-center-modal">
                <Form  :label-width="50" inline>
                    <Form-item label="部门">
                        <Select v-model="branchBox" clearable style="width:162px">
                            <Option v-for="item in branchList" :value="item.value" :key="item">{{ item.label }}</Option>
                        </Select>
                    </Form-item>
                    <Form-item label="账号">
                        <Input type="text" placeholder="请输入账号"></Input>
                    </Form-item>
                    <Form-item label="姓名">
                        <Input type="text" placeholder="请输入姓名"></Input>
                    </Form-item>
                    <ul class="header-btn-group not-float">
                        <li class="header-item"><Icon type="search"></Icon>查询</li>
                        <li class="header-item"><Icon type="refresh"></Icon>重置</li>
                    </ul>
                </Form>
                <Table height="350" stripe :columns="columns1" :data="data1" :context="self1"></Table>
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
                        title: '用户账号',
                        key: 'accountNum'
                    },
                    {
                        title: '用户姓名',
                        key: 'name'
                    },
                    {
                        title: '操作',
                        key: 'action',
                        width: 100,
                        align: 'center',
                        render (row, column, index) {
                            return `<i-button type="error" size="small" @click="remove(${index})">
                                        <Icon type="ios-trash-outline"></Icon>删除
                                    </i-button>`;
                        }
                    }
                ],
                self: this,
                self1:this,
                columns1: [
                    {
                        type: 'selection',
                        width: 60,
                        align: 'center'
                    },
                    {
                        title: '账号',
                        key: 'accountNum'
                    },
                    {
                        title: '姓名',
                        key: 'name'
                    },
                    {
                        title: '部门',
                        key: 'branch'
                    },
                    {
                        title: '性别',
                        key: 'sex',
                        render (row) {
                            const text = row.sex == 1 ? '男' : '女';
                            return `<span>${text}</span>`;
                        }
                    }
                ],
                titMsg: '批量添加角色',
                modalEdit: false,
                loading: true,
                formValidate: {
                    role: '',
                    list: this.data11
                },
                ruleValidate: {
                    role: [
                        { required: true, message: '请选择角色', trigger: 'blur' }
                    ]
                },
                branchBox: '',
                branchList: [
                    {
                        value: '1',
                        label: '已处理'
                    },
                    {
                        value: '0',
                        label: '未处理'
                    }
                ],
            }
        },
        computed: {
            data11: function () {
                var data = [
                    {
                        accountNum: '555',
                        name: '123',
                    },
                    {
                        accountNum: '0000',
                        name: '3333',
                    }
                ];
                return data;
            },
            data1: function () {
                var data = [
                    {
                        accountNum: '22',
                        name: '55',
                        branch: '556',
                        sex: '0'
                    },
                    {
                        accountNum: '22',
                        name: '55',
                        branch: '556',
                        sex: '1'
                    }
                ];
                return data;
            }
        },
        methods: {
            add () {
                this.modalEdit = true
            },
            clean () {

            },
            remove: function(index) {
                this.$Modal.confirm({
                    title: '系统提示',
                    content: '确定删除'+ this.data11[index].accountNum +'?',
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
