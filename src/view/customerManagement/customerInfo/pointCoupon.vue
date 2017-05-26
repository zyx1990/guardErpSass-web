/**
 * 积分兑换券页面
 */

<template>
    <div class="container-box userPower">
        <div class="container-header">
            <h2>积分兑换券</h2>
        </div>
        <div class="container-body">
            <Form ref="formValidate" :model="formValidate" :label-width="100" label-position="right">
                <Form-item label="现有积分">
                    <span>1234</span>
                </Form-item>
                <Form-item label="兑换积分" prop="points" style="width:300px;">
                    <Input v-model="formValidate.points" placeholder="请输入兑换积分"></Input>
                </Form-item>
                <Form-item label="兑换券" prop="objNum" required class='treatAddObj'>
                    <Input v-model="formValidate.objNum" placeholder="请选择兑换券" style='float:left;width:300px;margin-right:10px;'></Input>
                    <Button type="primary" shape="circle" icon="ios-search-strong" @click='show'>选择兑换券</Button>
                </Form-item>
                <Form-item label="兑换券积分" prop="points" style="width:300px;">
                    <Input v-model="formValidate.points" placeholder="请输入兑换券积分"></Input>
                </Form-item>
            </Form>
            <div class="footer-btnGroup">
                <Button type="primary" shape="circle" icon="checkmark">保存</Button>
                <Button type="primary" shape="circle" icon="android-arrow-back">返回</Button>
            </div>
            <Modal
                title="选择兑换券"
                width='700'
                v-model="modal"
                :closable="false"
                class-name="vertical-center-modal">
                <Table height="350" stripe :columns="col" :data="data" @on-row-click='choose'></Table>
            </Modal>
        </div>
    </div>
</template>

<script>
    export default {
        data () {
            return {
                formValidate: {
                    points: '',
                    objNum: '',
                },
                modal: false,
                col: [
                    {
                        title: '编号',
                        key: 'n'
                    },
                    {
                        title: '名称',
                        key: 'n1'
                    },
                    {
                        title: '可使用医院',
                        key: 'n2'
                    },
                    {
                        title: '备注',
                        key: 'n3'
                    }
                ],
                data: [
                    {
                        n: '2016',
                        n1: '2016',
                        n2: '2016',
                        n3: '2016',
                        n4: '2016'
                    }
                ],
            }
        },
        methods: {
            show () {
                this.modal = true
            },
            choose (data) {
                this.formValidate.objNum = data.n
                this.modal = false 
            }
        }
    }
</script>


