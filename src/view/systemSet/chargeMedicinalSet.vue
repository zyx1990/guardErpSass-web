<template>
    <div class="container-box chargeMedicinalSet">
        <div class="container-body">       
            <div class="container-header">
                <h2>修改收费项目</h2>
            </div>
            <div class="container-body">
                <Alert type="success">最大数量不限制则填0</Alert>
                <Table stripe :columns="editCol" :data="editData"></Table>
                <Form ref="formValidate" :label-width="50" label-position="right">
                    <Form-item label="状态">
                        <Radio-group >
                            <Radio label="1">启用</Radio>
                            <Radio label="0">禁用</Radio>
                        </Radio-group>
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
            </div>
                    
            
            <Modal
                title="修改数量"
                v-model="modalEdit"
                :closable="false"
                @on-ok="ok"
                :loading="loading"
                class-name="vertical-center-modal">
                <Form ref="formValidate" :model="formValidate" :label-width="100" label-position="right">
                    <Form-item label="默认数量" prop="defaultQtf">
                        <Input v-model="formValidate.defaultQtf" placeholder="请输入默认数量"></Input>
                    </Form-item>
                    <Form-item label="最大数量" prop="maxQtf">
                        <Input v-model="formValidate.maxQtf" placeholder="请输入最大数量"></Input>
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
                msg: '111',
                editCol: [
                    {
                        title: '项目编号',
                        key: 'proNum'
                    },
                    {
                        title: '名称',
                        key: 'name'
                    },
                    {
                        title: '规格',
                        key: 'type'
                    },
                    {
                        title: '单位',
                        key: 'unit'
                    },
                    {
                        title: '默认数量',
                        key: 'defaultQtf'
                    },
                    {
                        title: '最大数量',
                        key: 'maxQtf'
                    },
                    {
                        title: '操作',
                        key: 'action',
                        width: 150,
                        align: 'center',
                        render (row, column, index) {
                            return `<i-button type="primary" size="small" @click="edit(${index})">
                                        <Icon type="edit"></Icon>编辑
                                    </i-button>
                                    <i-button type="error" size="small" @click='remove(${index})'>
                                        <Icon type="ios-trash-outline"></Icon>删除
                                    </i-button>`
                        }
                    }
                ],
                editData: [
                    {
                        proNum: '123',
                        name: '555',
                        type: '99',
                        unit: '555',
                        defaultQtf: '99999',
                        maxQtf: '566'
                    },
                    {
                        proNum: '123',
                        name: '555',
                        type: '99',
                        unit: '555',
                        defaultQtf: '99999',
                        maxQtf: '566'
                    },
                    {
                        proNum: '123',
                        name: '555',
                        type: '99',
                        unit: '555',
                        defaultQtf: '99999',
                        maxQtf: '566'
                    }
                ],
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
                modalEdit: false,
                loading: true,
                formValidate: {
                    defaultQtf:  '',
                    maxQtf: ''
                },
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
        mounted () {

        },

        methods: {
            edit (index) {
                this.modalEdit = true
            },
            remove (index) {
                console.log(index)
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
            chooseCol (data) {
                console.log(data)
            }
        }

    }
</script>   

<style>
   
</style>