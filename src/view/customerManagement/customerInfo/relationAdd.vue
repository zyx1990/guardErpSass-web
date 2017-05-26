/**
 * 添加客户关系页面
 */

<template>
    <div class="container-box userPower">
        <div class="container-header">
            <h2>添加客户关系</h2>
        </div>
        <div class="container-body">
            <Form ref="formValidate" :model="formValidate" :label-width="100" label-position="right">
                <Form-item label="关系" prop="type" required>
                    <Select v-model="formValidate.type" style="width:300px">
                        <Option v-for="item in typeList" :value="item.id" :key="item">{{ item.value }}</Option>
                    </Select>
                </Form-item>
                <Form-item label="关联客户编号" prop="points" required style='width:400px;'>
                    <Input v-model="formValidate.points" placeholder="请输入客户编号"></Input>
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
                    points: ''
                },
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


