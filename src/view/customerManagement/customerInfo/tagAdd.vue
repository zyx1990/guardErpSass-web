/**
 * 客户标签管理页面
 */

<template>
    <div class="container-box userPower">
        <div class="container-header">
            <h2>客户标签管理</h2>
        </div>
        <div class="container-body">
            <Form ref="formValidate" :model="formValidate" :label-width="100" label-position="right">
                <Form-item label="标签" prop="tag" required>
                    <div class="tagBox">
                        <Tag type="border" color="blue" closable>标签一</Tag>
                    </div>
                </Form-item>
            </Form>
            <Tabs value="name1">
                <Tab-pane label="查找标签" name="name1">
                    <Form inline>
                        <Form-item>
                            <Input type="text" placeholder="请输入标签名称"></Input>
                        </Form-item>
                        <ul class="header-btn-group not-float">
                            <li class="header-item"><Icon type="search"></Icon>查询</li>
                            <li class="header-item"><Icon type="refresh"></Icon>重置</li>
                        </ul>
                        <div class="tagBox">
                            <Tag type="border" color="blue">标签一</Tag>
                        </div>
                    </Form>
                </Tab-pane>
                <Tab-pane label="标签组" name="name2">
                    <Table stripe :columns="col" :data="data"></Table>
                </Tab-pane>
            </Tabs>
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
                    tag: ''
                },
                data: [],
                col: [
                    {
                        title: '标签组',
                        key: 'name'
                    },
                    {
                        title: '标签',
                        key: 'age'
                    }
                ],
            }
        },
        methods: {
            
        }
    }
</script>


