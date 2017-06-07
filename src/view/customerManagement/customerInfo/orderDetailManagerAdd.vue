/**
 * 修改指定医生页面
 */

<template>
    <div class="container-box userPower">
        <div v-if='powerLoad > 0'>
            <div class="container-header">
                <h2>修改指定医生</h2>
            </div>
            <div class="container-body">
                <Form ref="formValidate" :model="formValidate" :label-width="100" label-position="right">
                    <Form-item label="项目" prop="objNum" required class='treatAddObj'>
                        <Input v-model="formValidate.objNum" placeholder="请选择项目" style='float:left;width:300px;margin-right:10px;'></Input>
                        <Button type="primary" shape="circle" icon="ios-search-strong" @click='show'>选择项目</Button>
                    </Form-item>
                    <Form-item label="新医生" prop="userId" required>
                        <Select v-model="formValidate.userId" style="width:300px">
                            <Option v-for="item in hospList" :value="item.id" :key="item">{{ item.name }}</Option>
                        </Select>
                    </Form-item>
                    <Form-item label="原因" prop="remark">
                        <Input v-model="formValidate.remark" type="textarea" :autosize="{minRows: 2,maxRows: 7}" placeholder="请输入原因"></Input>
                    </Form-item>
                </Form>
                <div class="footer-btnGroup">
                    <Button type="primary" shape="circle" icon="checkmark">保存</Button>
                    <Button type="primary" shape="circle" icon="android-arrow-back">返回</Button>
                </div>
                <Modal
                    title="选择项目"
                    width='700'
                    v-model="modal"
                    :closable="false"
                    class-name="vertical-center-modal">
                    <Table height="350" stripe :columns="col" :data="data" @on-row-click='choose'></Table>
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
                    detailId: '',
                    userId: '',
                    content: '',

                    objNum: '',
                    remark: ''
                },
                hospList: [],
                modal: false,
                col: [
                    {
                        title: '订购日期',
                        key: 'n'
                    },
                    {
                        title: '项目名称',
                        key: 'n1'
                    },
                    {
                        title: '分类',
                        key: 'n2'
                    },
                    {
                        title: '数量',
                        key: 'n3'
                    },
                    {
                        title: '下单用户',
                        key: 'n4'
                    },
                    {
                        title: '指定医生',
                        key: 'n5'
                    }
                ],
                data: [
                    {
                        n: '2016',
                        n1: '2016',
                        n2: '2016',
                        n3: '2016',
                        n4: '2016',
                        n5: '65465'
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
                    url: 'guard-webManager/customerRecord/orderDetailManagerAdd.jhtml',
                    data: {customerId: id},
                    success: function(res){
                        if(res.status == 200 ){
                            if(res.data.code == 0) {
                                _vm.powerLoad = 1
                                console.log(res)
                                _vm.hospList = res.data.content.UserList
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
            show () {
                this.modal = true
            },
            choose (data) {
                this.formValidate.objNum = data.n
                this.modal = false 
            }
        }
    }
</script>


