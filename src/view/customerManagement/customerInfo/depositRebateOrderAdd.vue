/**
 * 退预收款页面
 */

<template>
    <div class="container-box userPower">
        <div class="container-header">
            <h2>退预收款</h2>
        </div>
        <div class="container-body">
            <Alert type="success">
                <p>共退预收款： 0</p>
            </Alert>
            <Form ref="formValidate" :model="formValidate" :label-width="100" label-position="right">
                <Form-item label="退款金额" prop="points" required>
                    <Input v-model="formValidate.points" placeholder="请输入退款金额"></Input>
                </Form-item>
                <Form-item label="选择项目" prop="data" required>
                    <Table stripe :columns="col" :data="formValidate.data" :context='obj'></Table>
                </Form-item>
                <Form-item label="备注" prop="remark">
                    <Input v-model="formValidate.remark" type="textarea" :autosize="{minRows: 2,maxRows: 7}" placeholder="请输入备注"></Input>
                </Form-item>
            </Form>
            <div class="footer-btnGroup">
                <Button type="primary" shape="circle" icon="checkmark">保存</Button>
                <Button type="primary" shape="circle" icon="android-arrow-back">返回</Button>
            </div>
            <Modal
                title="修改项目"
                v-model="modal"
                :closable="false"
                class-name="vertical-center-modal">
                <Form ref="formEdit" :model="formEdit" :label-width="100" label-position="right">
                    <Form-item label="退数量" prop="number">
                        <Input v-model="formValidate.number" placeholder="请输入退数量"></Input>
                    </Form-item>
                    <Form-item label="退金额" prop="money">
                        <Input v-model="formValidate.money" placeholder="请输入退金额"></Input>
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
                formValidate: {
                    points: '',
                    remark: '',
                    data: [
                        {
                            n: '1',
                            n1: '2',
                            n2: '1',
                            n3: '4',
                            n4: '5'
                        }
                    ]
                },
                formEdit: {
                    number: '',
                    money: ''
                },
                modal: false,
                obj: this,
                col: [
                    {
                        title: '编号',
                        key: 'n'
                    },
                    {
                        title: '类型',
                        key: 'n1'
                    },
                    {
                        title: '金额',
                        key: 'n2'
                    },
                    {
                        title: '剩余金额',
                        key: 'n3'
                    },
                    {
                        title: '退款金额',
                        key: 'n4'
                    },
                    {
                        title: '操作',
                        key: 'action',
                        width: 150,
                        align: 'center',
                        render (row, column, index) {
                            return `<i-button type="primary" size="small" @click="edit(row)">
                                        <Icon type="edit"></Icon>编辑
                                    </i-button>`
                        }
                    }
                ]
            }
        },
        methods: {
            edit (data) {
                this.modal = true
            }
        }
    }
</script>


