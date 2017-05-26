/**
 * 添加顾客分组页面
 */

<template>
    <div class="container-box userPower">
        <div class="container-header">
            <h2>添加顾客分组</h2>
        </div>
        <div class="container-body">
            <Table stripe :columns="col" :data="data"></Table>
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
                col: [
                    {   
                        title: '序号',
                        type: 'index',
                        width: 60
                    },
                    {
                        title: '客户组名称',
                        key: 'age'
                    },
                    {
                        title: '备注',
                        key: 'address'
                    },
                    {
                        title: '选择',
                        type: 'selection',
                        width: 60,
                        align: 'center'
                    }
                ],
                data: [
                    {
                        age: 18,
                        address: '北京市朝阳区芍药居'
                    },
                    {
                        age: 25,
                        address: '北京市海淀区西二旗'
                    }
                ]
            }
        },
        methods: {
            
        }
    }
</script>


