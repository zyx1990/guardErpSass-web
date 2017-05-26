/**
 * 手工赠送积分页面
 */

<template>
    <div class="container-box userPower">
        <div class="container-header">
            <h2>手工赠送积分</h2>
        </div>
        <div class="container-body">
            <Form ref="formValidate" :model="formValidate" :label-width="100" label-position="right">
                <Form-item label="现有积分">
                    <span>3134</span>
                </Form-item>
                <Form-item label="赠送积分" prop="points" style="width:400px;">
                    <Input v-model="formValidate.points" placeholder="请输入赠送积分"></Input>
                </Form-item>
                <Form-item label="备注" prop="remark">
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
                    points: '',
                    remark: ''
                }
            }
        },
        methods: {
            
        }
    }
</script>


