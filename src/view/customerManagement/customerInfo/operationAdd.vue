/**
 * 添加划扣页面
 */

<template>
    <div class="container-box userPower">
        <div class="container-header">
            <h2>添加划扣</h2>
        </div>
        <div class="container-body">
            <Form ref="formValidate" :model="formValidate" :label-width="100" label-position="right">
                <Form-item label="划扣日期" required prop="date">
                    <Date-picker type="date" placement="bottom-start" placeholder="选择日期" style="width: 300px" :options='options' @on-change='saveDate'></Date-picker>
                </Form-item>
                <Form-item label="备注" prop="remark">
                    <Input v-model="formValidate.remark" type="textarea" :autosize="{minRows: 2,maxRows: 7}" placeholder="请输入备注"></Input>
                </Form-item>
            </Form>
            <div class="customer-item">
                <div class="customer-item-title">
                    <h3><Icon type="pricetag"></Icon>待划扣项目列表</h3>
                </div>
                <Table :columns="col" :data="data" :context='eee'></Table>
            </div>
            <div class="footer-btnGroup">
                <Button type="primary" shape="circle" icon="checkmark">保存</Button>
                <Button type="primary" shape="circle" icon="android-arrow-back">返回</Button>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        data () {
            return {
                eee: this,
                formValidate: {
                    date: '',
                    remark: ''
                },
                options: {
                    disabledDate (date) {
                        return date && date.valueOf() < Date.now() - 86400000;
                    }
                },
                data: [
                    {
                        q: '1',
                        q1: '1',
                        q2: '1',
                        q3: '1',
                        q4: '1',
                        q5: '1',
                        q6: '1',
                        q7: '1',
                        q8: '1',
                        q9: '',
                    }
                ],
                col: [
                    {
                        type: 'index',
                        width: 60,
                        align: 'center'
                    },
                    {
                        title: '项目名称',
                        key: 'q'
                    },
                    {
                        title: '订购医院',
                        key: 'q1'
                    },
                    {
                        title: '订购日期',
                        key: 'q2'
                    },
                    {
                        title: '分类',
                        key: 'q3'
                    },
                    {
                        title: '指定医生',
                        key: 'q4'
                    },
                    {
                        title: '单位',
                        key: 'q5'
                    },
                    {
                        title: '购买数量',
                        key: 'q6'
                    },
                    {
                        title: '剩余数量',
                        key: 'q7'
                    },
                    {
                        title: '划扣数量',
                        key: 'q8'
                    },
                    {
                        title: '医生列表',
                        key: 'q9'
                    },
                    {
                        title: '操作',
                        key: 'action',
                        width: 150,
                        align: 'center',
                        render (row, column, index) {
                            return `<i-button type="primary" size="small" @click="edit(row)">
                                        <Icon type="edit"></Icon>编辑
                                    </i-button>`;
                        }
                    }
                ]
            }
        },
        methods: {
            saveDate (date) {
                this.formValidate.date = date
            },
            edit (data) {

            }
        }
    }
</script>


