/**
 * 激活券页面
 */

<template>
    <div class="container-box userPower">
        <div class="container-header">
            <h2>激活券</h2>
        </div>
        <div class="container-body">
            <Form ref="formValidate" :model="formValidate" :label-width="100" label-position="right">
                <Form-item label="券代码" prop="points" style="width:400px;" required>
                    <Input v-model="formValidate.points" placeholder="请输入券代码"></Input>
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
                    points: ''
                }
            }
        },
        methods: {
            
        }
    }
</script>


