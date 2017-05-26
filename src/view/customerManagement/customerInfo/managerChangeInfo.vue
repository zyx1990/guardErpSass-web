/**
 * 添加咨询人员变更申请页面
 */

<template>
    <div class="container-box userPower">
        <div class="container-header">
            <h2>添加咨询人员变更申请</h2>
        </div>
        <div class="container-body">
            <Form ref="formValidate" :model="formValidate" :label-width="100" label-position="right">
                <Form-item label="变更类型">
                    <span>开发人员</span>
                </Form-item>
                <Form-item label="当前咨询人员">
                    <span>开发人员</span>
                </Form-item>
                <Form-item label="新咨询人员" prop="objNum" required class='treatAddObj'>
                    <Input v-model="formValidate.objNum" placeholder="请选择新咨询人员" style='float:left;width:300px;margin-right:10px;'></Input>
                    <Button type="primary" shape="circle" icon="ios-search-strong" @click='show'>选择新咨询人员</Button>
                </Form-item>
                <Form-item label="变更原因" prop="remark" required>
                    <Input v-model="formValidate.remark" type="textarea" :autosize="{minRows: 2,maxRows: 7}" placeholder="请输入变更原因"></Input>
                </Form-item>
            </Form>
            <div class="footer-btnGroup">
                <Button type="primary" shape="circle" icon="checkmark">保存</Button>
                <Button type="primary" shape="circle" icon="android-arrow-back">返回</Button>
            </div>
            <Modal
                title="选择新开发人员"
                width='700'
                v-model="modal"
                :closable="false"
                class-name="vertical-center-modal">
                <Form  :label-width="50" inline>
                    <Form-item label="部门">
                        <Select v-model="hospital" style="width:162px">
                            <Option v-for="item in hospList" :value="item.id" :key="item">{{ item.value }}</Option>
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
        </div>
    </div>
</template>

<script>
    export default {
        data () {
            return {
                formValidate: {
                    objNum: '',
                    remark: ''
                },
                modal: false,
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
                        title: '医院',
                        key: 'n2'
                    },
                    {
                        title: '部门',
                        key: 'n3'
                    },
                    {
                        title: '性别',
                        key: 'n4'
                    }
                ],
                data: [
                    {
                        n: '2016',
                        n1: '2016',
                        n2: '2016',
                        n3: '2016',
                        n4: '2016'
                    }
                ],
                hospital: '',
                hospList: [
                    {
                        id: '1',
                        value: '123'
                    }
                ],
            }
        },
        methods: {
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


