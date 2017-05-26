/**
 * 病例编辑模板页面
 */

<template>
    <div class="container-box">
        <div class="container-header">
            <h2>编辑模板</h2>
        </div>
        <div class="container-body">
            <Alert type="success">参数说明： 医院名称：$HospitalName 客户编号： $CustomerID 客户名称：$CustomerName 性别 $Gender 年龄 $Age 病历号：$No 病历创建日期：$CreateDate 创建用户：$CreateUserName 题号内容 $T1$(第一题为T1，第二题为T2，以此类推)</Alert>
            <Form :model="formItem" :label-width="100" class='surveyFill'>
                <Form-item label="内容">
                    <quill-editor ref="myTextEditor" v-model="content" :config="editorOption"></quill-editor>
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
    import { quillEditor } from 'vue-quill-editor';
    export default {
        data: function(){
            return {
                content: '11',
                editorOption: {

                },
                formItem: {

                }
            }
        },
        components: {
            quillEditor
        },
        methods: {
            
        }
    }
</script>

<style>
    .surveyFill .ql-editor {
        height: 350px;
    }
</style>