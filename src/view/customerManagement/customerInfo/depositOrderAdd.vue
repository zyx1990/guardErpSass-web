/**
 * 客户预收款
 */

<template>
    <div class="container-box">
        <div class="container-body">       
            <div class="container-header">
                <h2>添加预收款订单</h2>
            </div>
            <div class="container-body">
                <Alert type="success">
                    <p>总金额： 0</p>
                    <p>送券： 0</p>
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
                <h2>添加预收款项目</h2>
            </div>
            <div class="container-body">
                <Table height="420" :columns="addCol" :data="addData" stripe @on-row-click='chooseCol'></Table>
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
                        title: '价格',
                        key: 'money'
                    },
                    {
                        title: '数量',
                        key: 'number'
                    },
                    {
                        title: '总额',
                        key: 'sun',
                        render (row) {
                            const money = row.money * parseInt(row.number)
                            return `<span>${money}</span>`
                        }
                    },
                    {
                        title: '操作',
                        key: 'action',
                        width: 150,
                        align: 'center',
                        render (row, column, index) {
                            return `<i-button type="primary" size="small" @click="edit(row, ${index})">
                                        <Icon type="edit"></Icon>编辑
                                    </i-button>
                                    <i-button type="error" size="small" @click='remove(${index})'>
                                        <Icon type="ios-trash-outline"></Icon>删除
                                    </i-button>`
                        }
                    }
                ],
                editData: [],
                modalEdit: false,
                loading: true,
                formValidate: {
                    number: ''
                },
                addCol: [
                    {
                        title: '名称',
                        key: 'name'
                    },
                    {
                        title: '价格',
                        key: 'spec'
                    },
                    {
                        title: '使用范围',
                        key: 'type'
                    },
                    {
                        title: '赠券',
                        key: 'unit'
                    }
                ],
                addData:  [
                    {
                        id: '1',
                        name: '111',
                        spec: '555',
                        type: '66',
                        unit: '999',
                        money: '500',
                        number: '1'
                    },
                    {
                        id: '2',
                        name: '2',
                        spec: '2',
                        type: '2',
                        unit: '2',
                        money: '400',
                        number: '1'
                    }
                ],
                indexEdit: '',
                indexBox: []
            }
        },

        methods: {
            edit (data, index) {
                this.$refs['formValidate'].resetFields()
                this.formValidate.number = data.number
                this.indexEdit = index
                this.modalEdit = true
            },
            remove (index) {
                this.editData.splice(index, 1)
                this.indexBox.splice(index, 1)
                console.log(this.editData)
            },
            ok () {
                setTimeout(() => {
                    this.modalEdit = false;
                    this.editData[this.indexEdit].number = this.formValidate.number
                    this.$Notice.success({
                        title: '系统提示！',
                        desc: '保存成功！'
                    });
                    console.log(this.addData[0])
                }, 1000);
            },
            chooseCol (data) {
                var bool = true
                var index = data.id
                for(var i of this.indexBox) {
                    if(index == i) {
                        bool = false
                    }
                }
                if(bool) {
                    this.editData.push(data)
                    this.indexBox.push(index)
                }
            }
        }

    }
</script>   

<style>
   
</style>