/**
 * 添加回访计划页面
 */

<template>
    <div class="container-box userPower">
        <div class="container-header">
            <h2>添加回访计划</h2>
        </div>
        <div class="container-body">
            <Form ref="formValidate" :model="formValidate" :label-width="100" label-position="right">
                <Form-item label="起始日期" required prop="date">
                    <Date-picker type="date" placement="bottom-start" placeholder="选择日期" style="width: 300px" :options='options' @on-change='saveDate'></Date-picker>
                </Form-item>
                <Form-item label="回访计划" prop="data" required class='callbackSetAddObj'>
                    <Table stripe :columns="col1" :data="formValidate.data"></Table>
                    <Button type="primary" shape="circle" icon="ios-search-strong" @click='showPlan'>选择回访计划</Button>
                </Form-item>
                <Form-item label="回访人员" prop="objNum" required class='treatAddObj'>
                    <Input v-model="formValidate.objNum" placeholder="请选择回访人员" style='float:left;width:300px;margin-right:10px;'></Input>
                    <Button type="primary" shape="circle" icon="ios-search-strong" @click='show'>选择回访人员</Button>
                </Form-item>
            </Form>
            <div class="footer-btnGroup">
                <Button type="primary" shape="circle" icon="checkmark" @click='rr'>保存</Button>
                <Button type="primary" shape="circle" icon="android-arrow-back">返回</Button>
            </div>
            <Modal
                title="选择回访人员"
                width='700'
                v-model="modal"
                :closable="false"
                class-name="vertical-center-modal">
                <Form  :label-width="50" inline>
                    <Form-item label="部门">
                        <Select v-model="nameBox" style="width:162px">
                            <Option v-for="item in nameList" :value="item.id" :key="item">{{ item.value }}</Option>
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
                <Table height="350" stripe :columns="col" :data="data" @on-row-click='choose'></Table>
            </Modal>
            <Modal
                title="选择回访计划"
                width='700'
                v-model="modalPlan"
                :closable="false"
                class-name="vertical-center-modal">
                <Table height="350" stripe :columns="colP" :data="dataP" @on-row-click='chooseRow' :context='tabP'></Table>
                <Table stripe :columns="colC" :data="dataC"></Table>
            </Modal>
        </div>
    </div>
</template>

<script>
    export default {
        data () {
            return {
                formValidate: {
                    data: [],
                    date: '',
                    objNum: ''
                },
                nameBox: '',
                nameList: [
                    {
                        id: '1',
                        value: '123'
                    }
                ],
                options: {
                    disabledDate (date) {
                        return date && date.valueOf() < Date.now() - 86400000;
                    }
                },
                modal: false,
                modalPlan: false,
                col: [
                    {
                        title: '账号',
                        key: 'n'
                    },
                    {
                        title: '姓名',
                        key: 'n1'
                    },
                    {
                        title: '部门',
                        key: 'n2'
                    },
                    {
                        title: '性别',
                        key: 'n3'
                    }
                ],
                data: [
                    {
                        id: '1',
                        n: '2016',
                        n1: '2016',
                        n2: '2016',
                        n3: '2016',
                        n4: '2016',
                        n5: '2016'
                    }
                ],
                col1: [
                    {
                        title: '天数',
                        key: 'n'
                    },
                    {
                        title: '回访日期',
                        key: 'n1'
                    },
                    {
                        title: '回访类型',
                        key: 'n2'
                    },
                    {
                        title: '说明',
                        key: 'n3'
                    }
                ],
                tabP: this,
                colP: [
                    {   
                        title: '编号',
                        type: 'index',
                        width: 60
                    },
                    {
                        title: '名称',
                        key: 'n1'
                    },
                    {
                        title: '描述',
                        key: 'n2'
                    },
                    {
                        title: '选择',
                        key: 'action',
                        width: 150,
                        align: 'center',
                        render (row, column, index) {
                            return `<i-button type="primary" size="small" @click="choosePlan(row)">
                                        <Icon type="checkmark"></Icon>选中
                                    </i-button>`;
                        }
                    }
                ],
                dataP: [
                    {
                        id: '111',
                        n1: '1',
                        n2: '3',
                        children: [
                            {
                                id: '99',
                                n: '1',
                                n1: '1',
                                n2: '1'
                            },
                            {
                                id: '98',
                                n: '2',
                                n1: '2',
                                n2: '2'
                            }
                        ]   
                    },
                    {
                        id: '112',
                        n1: '11',
                        n2: '31',
                        children: [
                            {
                                id: '991',
                                n: '12',
                                n1: '21',
                                n2: '12'
                            }
                        ]   
                    }
                ],
                colC: [
                    {
                        title: '天数',
                        key: 'n'
                    },
                    {
                        title: '回访类型',
                        key: 'n1'
                    },
                    {
                        title: '说明',
                        key: 'n2'
                    }
                ], 
                dataC: []
            }
        },
        methods: {
            saveDate (date) {
                this.formValidate.date = date
            },
            rr () {
                console.log(this.formValidate)
            },
            show () {
                this.modal = true
            },
            showPlan () {
                this.modalPlan = true
            },
            choose (data) {
                this.formValidate.objNum = data.n
                this.modal = false
            },
            chooseRow (data) {
                this.dataC = data.children
            },
            choosePlan (data) {
                this.formValidate.data = data.children
                this.modalPlan = false
            }
        }
    }
</script>

<style>
    .callbackSetAddObj button {
        margin-top: 10px;
    }
</style>

