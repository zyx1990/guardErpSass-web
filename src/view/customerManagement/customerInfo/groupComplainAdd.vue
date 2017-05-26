/**
 * 添加投诉页面
 */

<template>
    <div class="container-box userPower">
        <div class="container-header">
            <h2>添加投诉</h2>
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
                <Form-item label="投诉类型" prop="type" required>
                    <Select v-model="formValidate.type" style="width:300px">
                        <Option v-for="item in typeList" :value="item.id" :key="item">{{ item.value }}</Option>
                    </Select>
                </Form-item>
                <Form-item label="投诉医生" prop="name" required>
                    <Select v-model="formValidate.name" style="width:300px">
                        <Option v-for="item in nameList" :value="item.id" :key="item" :label='item.name'>
                            <span>{{item.name}}</span>
                            <span style="float:right;color:#ccc">{{item.hosp}}</span>
                        </Option>
                    </Select>
                </Form-item>
                <Form-item label="治疗项目" prop="objNum" required class='treatAddObj'>
                    <Input v-model="formValidate.objNum" placeholder="请选择预约项目" style='float:left;width:300px;margin-right:10px;'></Input>
                    <Button type="primary" shape="circle" icon="ios-search-strong" @click='show'>选择治疗项目</Button>
                </Form-item>
                <Form-item label="投诉内容" prop="remark" required>
                    <Input v-model="formValidate.remark" type="textarea" :autosize="{minRows: 2,maxRows: 7}" placeholder="请输入投诉内容"></Input>
                </Form-item>
            </Form>
            <div class="footer-btnGroup">
                <Button type="primary" shape="circle" icon="checkmark" @click='rr'>保存</Button>
                <Button type="primary" shape="circle" icon="android-arrow-back">返回</Button>
            </div>
            <Modal
                title="选择治疗项目"
                width='700'
                v-model="modal"
                :closable="false"
                class-name="vertical-center-modal">
                <Table height="350" stripe :columns="col" :data="data" @on-row-click='choose'></Table>
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
                    type: '',
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
                typeList: [
                    {
                        id: '1',
                        value: '123'
                    }
                ],
                modal: false,
                col: [
                    {
                        title: '项目编号',
                        key: 'n'
                    },
                    {
                        title: '项目名称',
                        key: 'n1'
                    },
                    {
                        title: '分类',
                        key: 'n2'
                    }
                ],
                data: [
                    {
                        n: '2016',
                        n1: '2016',
                        n2: '2016'
                    }
                ],
                
            }
        },
        methods: {
            rr () {
                console.log(this.formValidate)
            },
            show () {
                this.modal = true
            },
            choose (data) {
                this.formValidate.objNum = data.n
                this.modal = false
            },
        }
    }
</script>

<style>
   .treatAddObj button {
        margin: 0 10px;
   } 
</style>

