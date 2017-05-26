/**
 * 选择题页面
 */

<template>
    <div class="container-box">
        <div class="container-header">
            <h2>添加选择题</h2>
        </div>
        <div class="container-body">
            <Form :model="formItem" :label-width="100" class='surveyChoice'>
                <Form-item label="类型" prop="type">
                    <Select v-model="formItem.type" placeholder="请选择类型">
                        <Option value="1">单选题</Option>
                        <Option value="2">多选题</Option>
                    </Select>
                </Form-item>
                <Form-item label="题目内容">
                    <quill-editor ref="myTextEditor" v-model="content" :config="editorOption"></quill-editor>
                </Form-item>
                <Form-item label="选项A">
                    <Input v-model="formItem.input1"></Input>
                </Form-item>
                <Form-item label="选项B">
                    <Input v-model="formItem.input1"></Input>
                </Form-item>
                <Form-item label="选项C">
                    <Input v-model="formItem.input1"></Input>
                </Form-item>
                <Form-item label="选项D">
                    <Input v-model="formItem.input1"></Input>
                </Form-item>
                <Form-item label="选项E">
                    <Input v-model="formItem.input1"></Input>
                </Form-item>
                <Form-item label="选项F">
                    <Input v-model="formItem.input1"></Input>
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
                    type: '',
                    input1: '',
                    input2: '',
                    input3: '',
                    input4: '',
                    input5: '',
                    input6: ''
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
    .surveyChoice .ql-editor {
        height: 150px;
    }
</style>