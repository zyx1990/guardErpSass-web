/**
 * 添加咨询页面
 */

<template>
    <div class="container-box userPower">
        <div class="container-header">
            <h2>添加咨询</h2>
        </div>
        <div class="container-body">
            <Form ref="formValidate" :model="formValidate" :label-width="100" label-position="right">
                <Form-item label="方式" prop="type" required>
                    <Select v-model="formValidate.type" style="width:300px">
                        <Option v-for="item in typeList" :value="item.id" :key="item">{{ item.value }}</Option>
                    </Select>
                </Form-item>
                <Form-item label="咨询项目" prop="objName" required>
                    <Select v-model="formValidate.objName" style="width:300px" @on-change='rr' :clearable='true' ref='select' placeholder='请选择，可多选，排序分先后'>
                        <Option v-for="(item, index) in objList" :value="index" :key="item" >{{ item.value }}</Option>
                    </Select>
                    <div class="tagbox">
                        <Tag closable color="blue" type="border" v-for='(item, index) in tagBox' :key='item' :name='index' @on-close="tagClose">{{item.value}}</Tag>
                    </div>
                </Form-item>
                <Form-item label="咨询内容" prop="remark" required>
                    <Input v-model="formValidate.remark" type="textarea" :autosize="{minRows: 2,maxRows: 7}" placeholder="请输入咨询内容"></Input>
                </Form-item>
            </Form>
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
                formValidate: {
                    type: '',
                    objName: '',
                    remark: ''
                },
                typeList: [
                    {
                        id: '1',
                        value: '123'
                    }
                ],
                objList: [
                    {
                        id: '1',
                        value: '6666'
                    },
                    {
                        id: '2',
                        value: '6123126'
                    },
                    {
                        id: '3',
                        value: '65556'
                    }
                ],
                tagBox: [],
                tagIndex: []
            }
        },
        methods: {
            rr (aa) {
                var bool = 0
                for(var index of this.tagIndex) {
                    if(aa == index) {
                        bool = 1
                    }
                }
                if(bool == 0 && typeof aa != 'string') {
                    this.tagIndex.push(aa)
                    this.tagBox.push(this.objList[aa])
                }
            },
            tagClose (event, name) {
                this.tagIndex.splice(name, 1)
                this.tagBox.splice(name, 1)
                this.$refs['select'].clearSingleSelect()
            }
        }
    }
</script>

