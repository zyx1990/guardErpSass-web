/**
 * 添加照片页面
 */

<template>
    <div class="container-box userPower">
        <div class="container-header">
            <h2>添加照片</h2>
        </div>
        <div class="container-body">
            <Form ref="formValidate" :model="formValidate" :label-width="100" label-position="right">
                <Form-item label="日期" required prop="date">
                    <Date-picker type="date" placement="bottom-start" placeholder="选择日期" style="width: 300px" :options='options' @on-change='saveDate'></Date-picker>
                </Form-item>
                <Form-item label="类型" prop="type" required>
                    <Select v-model="formValidate.type" style="width:300px" @on-change='clearType'>
                        <Option v-for="item in typeList" :value="item.id" :key="item">{{ item.value }}</Option>
                    </Select>
                </Form-item>
                <Form-item label="咨询项目" prop="type1" required v-if='formValidate.type == 1'>
                    <Select v-model="formValidate.type1" style="width:300px">
                        <Option v-for="item in typeList1" :value="item.id" :key="item">{{ item.value }}</Option>
                    </Select>
                </Form-item>
                <Form-item label="治疗项目" prop="objNum" required v-else-if='formValidate.type == 2'>
                    <Input v-model="formValidate.objNum" placeholder="请选治疗项目" style='float:left;width:300px;margin-right:10px;'></Input>
                    <Button type="primary" shape="circle" icon="ios-search-strong" @click='show'>选择治疗项目</Button>
                </Form-item>
                <Form-item label="选择图片" required>
                     <Upload
                        multiple
                        action="//jsonplaceholder.typicode.com/posts/">
                        <Button type="ghost" icon="ios-cloud-upload-outline">上传图片</Button>
                    </Upload>
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
                title="选择收费项目"
                width='700'
                v-model="modal"
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
                <Table height="350" stripe :columns="col" :data="data" @on-row-click='choose'></Table>
            </Modal>
        </div>
    </div>
</template>

<script>
    export default {
        data () {
            return {
                formValidate: {
                    type: '',
                    type1: '', 
                    objNum: '',
                    date: '',
                    remark: ''
                },
                typeList: [
                    {
                        id: '1',
                        value: '咨询'
                    },
                    {
                        id: '2',
                        value: '治疗'
                    },
                    {
                        id: '3',
                        value: '其他'
                    }
                ],
                typeList1: [
                    {
                        id: '1',
                        value: '咨询'
                    }
                ],
                options: {
                    disabledDate (date) {
                        return date && date.valueOf() < Date.now() - 86400000;
                    }
                },
                modal: false,
                col: [
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
                data: [
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
            show () {
                this.modal = true;
            },
            choose (data) {
                this.formValidate.objNum = data.n
                this.modal = false
            },
            clearType () {
                this.formValidate.type1 = ''
                this.formValidate.objNum = ''
            },
            rr () {
                console.log(this.formValidate)
            }
        }
    }
</script>

