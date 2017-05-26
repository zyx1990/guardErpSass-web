/**
 * 复杂项目页面
 */

<template>
    <div class="container-box">
        <div class="container-header">
            <h2>添加复杂项目</h2>
        </div>
        <div class="container-body">
            <Form :model="formItem" :label-width="100" class='surveyFill'>
                <Form-item label="名称" prop='name'>
                    <Input v-model="formItem.name"></Input>
                </Form-item>
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
                    name: ''
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