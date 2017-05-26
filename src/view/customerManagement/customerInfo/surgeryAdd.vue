/**
 * 手术预约信息页面
 */

<template>
    <div class="container-box userPower">
        <div class="container-header">
            <h2>手术预约信息</h2>
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
                <Form-item label="麻醉类型" prop="type" required>
                    <Select v-model="formValidate.type" style="width:300px">
                        <Option v-for="item in typeList" :value="item.id" :key="item">{{ item.value }}</Option>
                    </Select>
                </Form-item>
                <Form-item label="预约医生" prop="name" required>
                    <Select v-model="formValidate.name" style="width:300px">
                        <Option v-for="item in nameList" :value="item.id" :key="item" :label='item.name'>
                            <span>{{item.name}}</span>
                            <span style="float:right;color:#ccc">{{item.hosp}}</span>
                        </Option>
                    </Select>
                </Form-item>
                <Form-item label="预约项目" prop="data" required class='surgeryAddObj'>
                    <Table stripe :columns="col" :data="formValidate.data" :context='obj'></Table>
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
                    type: '',
                    name: '',
                    remark: '',
                    data: [],
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
                typeList: [
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
                obj: this,
                col: [
                    {
                        title: '项目编号',
                        key: 'n'
                    },
                    {
                        title: '项目名称',
                        key: 'n3'
                    },
                    {
                        title: '操作',
                        key: 'action',
                        width: 150,
                        align: 'center',
                        render (row, column, index) {
                            return `<i-button type="error" size="small" @click='remove(${index})'>
                                        <Icon type="ios-trash-outline"></Icon>删除
                                    </i-button>`
                        }
                    }
                ],
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
                        id: '1',
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
                        id: '55',
                        n: '2016',
                        n1: '2016',
                        n2: '2016',
                        n3: '2016',
                        n4: '2016',
                        n5: '2016',
                        n6: '2016'
                    }
                ],
                idBox: []
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
                if(this.repeatDel(data.id)) {
                    this.formValidate.data.push(data)
                    this.modalbuy = false
                }
                
            },
            chooseAll (data) {
                if(this.repeatDel(data.id)) {
                    this.formValidate.data.push(data)
                    this.modalall = false
                }
            },
            remove (index) {
                this.formValidate.data.splice(index, 1)
                this.idBox.splice(index, 1)
            },
            repeatDel (id) {
                var bool = true
                for(var i of this.idBox) {
                    if(id == i) {
                        bool = false
                    }
                }
                if(bool) {
                    this.idBox.push(id)
                }
                return bool
            }
        }
    }
</script>

<style>
   .surgeryAddObj button {
        margin: 10px 10px 0;
   } 
</style>

