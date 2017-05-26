/**
 * 添加治疗预约信息页面
 */

<template>
    <div class="container-box userPower">
        <div class="container-header">
            <h2>治疗预约信息</h2>
        </div>
        <div class="container-body">
            <Form ref="formValidate" :model="formValidate" :label-width="100" label-position="right">
                <Form-item label="选择医院" prop="hospital" required v-if='seen'>
                    <Select v-model="formValidate.hospital" style="width:300px">
                        <Option v-for="item in hospList" :value="item.id" :key="item">{{ item.value }}</Option>
                    </Select>
                </Form-item>
                <Form-item label="选择医院" v-else>
                    <span>123</span>
                </Form-item>
                <Form-item label="预约日期" required prop="date">
                    <Date-picker type="date" placement="bottom-start" placeholder="选择日期" style="width: 300px" :options='options' @on-change='saveDate'></Date-picker>
                </Form-item>
                <Form-item label="预约时间" required prop="time">
                     <Time-picker format="HH:mm" type="timerange" placement="bottom-start" placeholder="选择时间" style="width: 300px" @on-change='saveTime'></Time-picker>
                </Form-item>
                <Form-item label="预约医生" prop="name" required>
                    <Select v-model="formValidate.name" style="width:300px">
                        <Option v-for="item in nameList" :value="item.id" :key="item" :label='item.name'>
                            <span>{{item.name}}</span>
                            <span style="float:right;color:#ccc">{{item.hosp}}</span>
                        </Option>
                    </Select>
                </Form-item>
                <Form-item label="预约项目" prop="objNum" required class='treatAddObj'>
                    <Input v-model="formValidate.objNum" placeholder="请选择预约项目" style='float:left;width:300px;margin-right:10px;'></Input>
                    <Button type="primary" shape="circle" icon="ios-search-strong" @click='showBuy'>选择已购项目</Button>
                    <Button type="primary" shape="circle" icon="ios-search-strong" @click='showAll'>选择所有项目</Button>
                </Form-item>
                <Form-item label="备注" prop="remark">
                    <Input v-model="formValidate.remark" type="textarea" :autosize="{minRows: 2,maxRows: 7}" placeholder="请输入备注"></Input>
                </Form-item>
            </Form>
            <div class="footer-btnGroup">
                <Button type="primary" shape="circle" icon="checkmark" @click='rr'>保存</Button>
                <Button type="primary" shape="circle" icon="android-arrow-back">返回</Button>
            </div>
            <Modal
                title="选择已购项目"
                width='700'
                v-model="modalbuy"
                :closable="false"
                class-name="vertical-center-modal">
                <Table height="350" stripe :columns="colBuy" :data="dataBuy" @on-row-click='chooseBuy'></Table>
            </Modal>
            <Modal
                title="选择已购项目"
                width='700'
                v-model="modalall"
                :closable="false"
                class-name="vertical-center-modal">
                <Form  :label-width="50" inline>
                    <Form-item label="名称">
                        <Input type="text" placeholder="请输入名称"></Input>
                    </Form-item>
                    <Form-item label="拼音码">
                        <Input type="text" placeholder="请输入拼音码"></Input>
                    </Form-item>
                    <ul class="header-btn-group not-float">
                        <li class="header-item"><Icon type="search"></Icon>查询</li>
                        <li class="header-item"><Icon type="refresh"></Icon>重置</li>
                    </ul>
                </Form>
                <Table height="350" stripe :columns="colAll" :data="dataAll" @on-row-click='chooseAll'></Table>
            </Modal>
        </div>
    </div>
</template>

<script>
    export default {
        data () {
            return {
                seen: true,
                formValidate: {
                    hospital: '',
                    date: '',
                    time: [],
                    name: '',
                    remark: '',
                    objNum: '',
                },
                nameList: [
                    {
                        id: '1',
                        name: '123',
                        hosp: '545'
                    }
                ],
                hospList: [
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
                modalbuy: false,
                colBuy: [
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
                dataBuy: [
                    {
                        n: '2016',
                        n1: '2016',
                        n2: '2016',
                        n3: '2016',
                        n4: '2016',
                        n5: '2016'
                    }
                ],
                modalall: false,
                colAll: [
                    {
                        title: '编号',
                        key: 'n'
                    },
                    {
                        title: '名称',
                        key: 'n1'
                    },
                    {
                        title: '规格',
                        key: 'n2'
                    },
                    {
                        title: '拼音码',
                        key: 'n3'
                    },
                    {
                        title: '类型',
                        key: 'n4'
                    },
                    {
                        title: '价格',
                        key: 'n5'
                    },
                    {
                        title: '操作部门',
                        key: 'n6'
                    }
                ],
                dataAll: [
                    {
                        n: '2016',
                        n1: '2016',
                        n2: '2016',
                        n3: '2016',
                        n4: '2016',
                        n5: '2016',
                        n6: '2016'
                    }
                ],
            }
        },
        methods: {
            saveDate (date) {
                this.formValidate.date = date
            },
            saveTime (time) {
                this.formValidate.time = time
            },
            rr () {
                console.log(this.formValidate)
            },
            showBuy () {
                this.modalbuy = true
            },
            showAll () {
                this.modalall = true
            },
            chooseBuy (data) {
                this.formValidate.objNum = data.n
                this.modalbuy = false
            },
            chooseAll (data) {
                this.formValidate.objNum = data.n
                this.modalall = false
            },
        }
    }
</script>

<style>
   .treatAddObj button {
        margin: 0 10px;
   } 
</style>

