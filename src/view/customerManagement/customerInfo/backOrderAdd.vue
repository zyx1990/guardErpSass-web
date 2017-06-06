/**
 * 退项目订单页面
 */

<template>
    <div class="container-box userPower">
        <div v-if='powerLoad > 0'>
            <div class="container-header">
                <h2>退项目订单</h2>
            </div>
            <div class="container-body">
                <Alert type="success">
                    <p>共退项目数量： 0</p>
                    <p>金额： 0</p>
                </Alert>
                <Form ref="formValidate" :model="formValidate" :label-width="100" label-position="right">
                    <Form-item label="选择项目" prop="data" required>
                        <Table stripe :columns="col" :data="formValidate.data" :context='obj'></Table>
                    </Form-item>
                    <Form-item label="扣减积分" prop="points" required style='width:400px;'>
                        <Input v-model="formValidate.points" placeholder="请输入扣减积分"></Input>
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
        <Alert type="error" show-icon v-if='powerLoad == 0'>
            提示信息
            <div slot="desc">
                <p>{{errorMsg}}</p>
                <Button type="primary" shape="circle" icon="android-arrow-back" @click='back'>返回</Button>
            </div>
        </Alert>
        <Spin fix v-if='powerLoad < 0'>
            <Icon type="load-c" size=40 class="demo-spin-icon-load"></Icon>
            <div>Loading</div>
        </Spin>
    </div>
</template>

<script>
    export default {
        data () {
            return {
                cusName: '',
                powerLoad: '-1',
                errorMsg: '',
                formValidate: {
                    customerId: '',
                    points: '',
                    remark: '',
                    data: [
                        {
                            n: '1',
                            n1: '2',
                            n2: '1',
                            n3: '4',
                            n4: '5',
                            n5: '0',
                            n6: '0'

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
                        title: '项目',
                        key: 'n'
                    },
                    {
                        title: '购买日期',
                        key: 'n1'
                    },
                    {
                        title: '数量',
                        key: 'n2'
                    },
                    {
                        title: '金额',
                        key: 'n3'
                    },
                    {
                        title: '剩余数量',
                        key: 'n4'
                    },
                    {
                        title: '退数量',
                        key: 'n5'
                    },
                    {
                        title: '退金额',
                        key: 'n6'
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
        created () {
            if (window.sessionStorage) {
                var lg = window.sessionStorage;
                this.formValidate.customerId = lg.cusId
                this.cusName = lg.cusName
            }
            this.getId(this.formValidate.customerId)
        },
        methods: {
            // 获取资料
            getId (id) {
                var _vm = this;
                _vm.$http.get({
                    url: 'guard-webManager/customerRecord/backOrderAdd.jhtml',
                    data: {customerId: id},
                    success: function(res){
                        if(res.status == 200 ){
                            if(res.data.code == 0) {
                                _vm.powerLoad = 1
                                console.log(res)
                            } else {
                                _vm.powerLoad = 0
                                _vm.errorMsg = res.data.desc
                            }
                        } else {
                            console.log(res.data.desc)
                        }
                    },
                    error: function(res){
                        console.log(res);
                    }
                });
            },
            edit (data) {
                this.modal = true
            },
            back () {
                var breadData = [
                    {
                        url: '/desktop',
                        text: '桌面'
                    },
                    {
                        url: '/customer',
                        text: '客户管理'
                    },
                    {
                        url: '/indexOrder',
                        text: this.cusName
                    }
                ];
                this.$store.dispatch('setBreadData', breadData);
                this.$router.back(-1)
            }
        }
    }
</script>


