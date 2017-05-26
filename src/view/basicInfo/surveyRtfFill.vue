/**
 * 填空题页面
 */

<template>
    <div class="container-box">
        <div class="container-header">
            <h2>添加填空题</h2>
        </div>
        <div class="container-body">
            <Form :label-width="100" class='surveyFill'>
                <Form-item label="题目内容">
                    <Ueditor @ready="editorReady" style="width: 500px;height: 440px;"></Ueditor>
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
    import Ueditor from '../../components/Ueditor'
    export default {
        data () {
            return {
                content:''
                
            }
        },
        components: {
            Ueditor
        },
        methods: {
          editorReady (instance) {
            instance.setContent('');

            instance.addListener('contentChange', () => {
              this.content = instance.getContent();
            });
          },
        }
    }
</script>

<style>
    .surveyFill .ql-editor {
        height: 350px;
    }
</style>