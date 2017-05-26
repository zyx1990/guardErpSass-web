/**
 * 添加回访页面
 */

<template>
    <div class="container-box userPower">
        <div class="container-header">
            <h2>添加回访</h2>
        </div>
        <div class="container-body">
            <Form ref="formValidate" :model="formValidate" :label-width="100" label-position="right">
                <Form-item label="回访类型" prop="type" required>
                    <Select v-model="formValidate.type" style="width:300px">
                        <Option v-for="item in typeList" :value="item.id" :key="item">{{ item.value }}</Option>
                    </Select>
                </Form-item>
                <Form-item label="回访方式" prop="way" required>
                    <Select v-model="formValidate.way" style="width:300px">
                        <Option v-for="item in wayList" :value="item.id" :key="item">{{ item.value }}</Option>
                    </Select>
                </Form-item>
                <Form-item label="备注" prop="remark" required>
                    <Input v-model="formValidate.remark" type="textarea" :autosize="{minRows: 2,maxRows: 7}" placeholder="请输入备注"></Input>
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
                    way: '',
                    remark: ''
                },
                wayList: [
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
                ]
            }
        },
        methods: {
            
        }
    }
</script>


