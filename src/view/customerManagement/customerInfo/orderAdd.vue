/**
 * 客户添加订单
 */

<template>
    <div class="container-box">
        <div class="container-body">       
            <div class="container-header">
                <h2>添加项目单</h2>
            </div>
            <div class="container-body">
                <Alert type="success">
                    <p>该客户没有折扣权益</p>
                    <p>原价： 0 成交价：0 整体折扣：100</p>
                </Alert>
                <Table stripe :columns="editCol" :data="editData"></Table>
                <Form ref="formEdit" :model='formEdit' :label-width="50" label-position="right" style='margin-top:10px;'>
                    <Form-item label="备注" prop="remark">
                        <Input v-model="formEdit.remark" type="textarea" :autosize="{minRows: 2,maxRows: 5}" placeholder="请输入备注"></Input>
                    </Form-item>
                </Form>
                <div class="footer-btnGroup">
                    <Button type="primary" shape="circle" icon="checkmark">保存</Button>
                    <Button type="primary" shape="circle" icon="android-arrow-back">返回</Button>
                </div>
            </div>
            <div class="container-header">
                <h2>添加物品药品</h2>
            </div>
            <div class="container-body">
                <Tabs value="name1">
                    <Tab-pane label="添加项目" name="name1">
                        <Form  :label-width="60" inline>
                            <Form-item label="名称">
                                <Input type="text" placeholder="请输入名称"></Input>
                            </Form-item>
                            <Form-item label="拼音码">
                                <Input type="text" placeholder="请输入拼音码"></Input>
                            </Form-item>
                            <Form-item label="类型">
                                <Select v-model="typeBox" clearable style="width:162px">
                                    <Option v-for="item in typeList" :value="item.value" :key="item">{{ item.label }}</Option>
                                </Select>
                            </Form-item>
                            <ul class="header-btn-group not-float">
                                <li class="header-item"><Icon type="search"></Icon>查询</li>
                                <li class="header-item"><Icon type="refresh"></Icon>重置</li>
                            </ul>
                        </Form>
                        <Table height="420" :columns="addCol" :data="addData" @on-row-click='chooseCol' stripe></Table>
                    </Tab-pane>
                    <Tab-pane label="添加套餐" name="name2">标签二的内容</Tab-pane>
                    <Tab-pane label="常用项目" name="name3">标签三的内容</Tab-pane>
                    <Tab-pane label="最近使用" name="name4">标11</Tab-pane>
                </Tabs>
            </div>
                    
            
            <Modal
                title="修改项目"
                v-model="modalEdit"
                :closable="false"
                @on-ok="ok"
                :loading="loading"
                class-name="vertical-center-modal">
                <Form ref="formValidate" :model="formValidate" :label-width="100" label-position="right">
                    <Form-item label="数量" prop="number" required>
                        <Input v-model="formValidate.number"></Input>
                    </Form-item>
                    <Form-item label="成交金额" prop="moneySure" required>
                        <Input v-model="formValidate.moneySure"></Input>
                    </Form-item>
                    <Form-item label="医生" prop="doctor" required>
                        <Input v-model="formValidate.doctor"></Input>
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
                formEdit: {
                    remark: ''
                },
                editCol: [
                    {
                        title: '项目',
                        key: 'name'
                    },
                    {
                        title: '数量',
                        key: 'number'
                    },
                    {
                        title: '金额',
                        key: 'money'
                    },
                    {
                        title: '成交金额',
                        key: 'moneySure'
                    },
                    {
                        title: '折扣',
                        key: 'sell',
                        render (row) {
                            const sell = (row.moneySure * 100 / row.money).toFixed(2);
                            return `<span>${sell}</span>`
                        }
                    },
                    {
                        title: '套餐',
                        key: 'taocan'
                    },
                    {
                        title: '医生',
                        key: 'doctor'
                    },
                    {
                        title: '操作',
                        key: 'action',
                        width: 150,
                        align: 'center',
                        render (row, column, index) {
                            return `<i-button type="primary" size="small" @click="edit(row)">
                                        <Icon type="edit"></Icon>编辑
                                    </i-button>
                                    <i-button type="error" size="small" @click='remove(row)'>
                                        <Icon type="ios-trash-outline"></Icon>删除
                                    </i-button>`
                        }
                    }
                ],
                editData: [],
                modalEdit: false,
                loading: true,
                formValidate: {
                    number: '',
                    moneySure: '',
                    doctor: ''
                },
                addCol: [
                    {
                        title: '编号',
                        key: 'proNum'
                    },
                    {
                        title: '名称',
                        key: 'name'
                    },
                    {
                        title: '规格',
                        key: 'spec'
                    },
                    {
                        title: '分类',
                        key: 'type'
                    },
                    {
                        title: '单位',
                        key: 'unit'
                    },
                    {
                        title: '选择',
                        key: 'choose',
                        render (row) {
                            return `<Icon type="checkmark"></Icon>选中`;
                        }
                    }
                ],
                addData:  [
                    {
                        proNum: '111',
                        name: '555',
                        spec: '66',
                        type: '6666',
                        unit: '999'
                    },
                    {
                        proNum: '111',
                        name: '555',
                        spec: '66',
                        type: '6666',
                        unit: '999'
                    },
                    {
                        proNum: '111',
                        name: '555',
                        spec: '66',
                        type: '6666',
                        unit: '999'
                    },
                    {
                        proNum: '111',
                        name: '555',
                        spec: '66',
                        type: '6666',
                        unit: '999'
                    },
                    {
                        proNum: '111',
                        name: '555',
                        spec: '66',
                        type: '6666',
                        unit: '999'
                    },
                    {
                        proNum: '111',
                        name: '555',
                        spec: '66',
                        type: '6666',
                        unit: '999'
                    },
                    {
                        proNum: '111',
                        name: '555',
                        spec: '66',
                        type: '6666',
                        unit: '999'
                    },
                ],
                typeBox: '',
                typeList: [
                    {
                        value: '1',
                        label: '已处理'
                    },
                    {
                        value: '0',
                        label: '未处理'
                    }
                ]
            }
        },

        methods: {
            edit (data) {
                this.formValidate.moneySure = data.moneySure
                this.modalEdit = true
            },
            remove (index) {
                console.log(index)
            },
            ok () {
                setTimeout(() => {
                    this.modalEdit = false;
                    this.editData[0].moneySure = this.formValidate.moneySure
                    this.$Notice.success({
                        title: '系统提示！',
                        desc: '保存成功！'
                    });
                }, 1000);
            },
            chooseCol (data) {
                console.log(data)
                var a = {
                        name: '123',
                        number: '1',
                        money: '999',
                        moneySure: '555',
                        sell: '99999',
                        taocan: '566',
                        doctor: '1'
                    }
                this.editData.push(a)
            }
        }

    }
</script>   

<style>
   
</style>