/**
 * 设置客户权限/回访权限页面
 */

<template>
    <div class="container-box userPower">
        <div class="container-header">
            <h2>权限</h2>
        </div>
        <div class="container-body">
            <Row :gutter="50">
                <Col span="3" offset="5">
                    <span class='title'>医院</span>
                </Col>
                <Col span="16">
                    <div><Button type="primary" shape="circle" icon="plus-round" @click='hospital'>增加</Button></div>
                     <div class="tagBox"><Tag type="border" @on-close='tagClose' closable color="blue" v-for='(item, index) in hospTag' v-bind:data-index="index" :key="item">{{item.name}}</Tag></div>
                </Col>
            </Row>
            <Row :gutter="50">
                <Col span="3" offset="5">
                    <span class='title'>部门</span>
                </Col>
                <Col span="16">
                    <div><Button type="primary" shape="circle" icon="plus-round" @click='branch'>增加</Button></div>
                    <div class="tagBox"><Tag type="border" closable color="blue">标签一</Tag></div>
                </Col>
            </Row>
            <Row :gutter="50">
                <Col span="3" offset="5">
                    <span class='title'>用户</span>
                </Col>
                <Col span="16">
                    <div><Button type="primary" shape="circle" icon="plus-round" @click='user'>增加</Button></div>
                    <div class="tagBox"><Tag type="border" closable color="blue">标签一</Tag></div>
                </Col>
            </Row>
            <div class="footer-btnGroup">
                <Button type="primary" shape="circle" icon="checkmark">保存</Button>
                <Button type="primary" shape="circle" icon="android-arrow-back">返回</Button>
            </div>
            <Modal
                title="选择医院"
                v-model="modalHosp"
                :closable="false">
                <Table stripe :columns="hospColumns" :data="hospData" highlight-row @on-row-click='rr'></Table>
            </Modal>
        </div>
    </div>
</template>

<script>
    export default {
        data () {
            return {
                hospColumns: [
                    {
                        title: '名称',
                        key: 'name'
                    },
                    {
                        title: '选择',
                        key: 'choose',
                        render (row) {
                            return `<Icon type="checkmark"></Icon>选中`;
                        }
                    }
                ],
                hospData: [
                    {
                        id: '1',
                        name: '公交广告'
                    },
                    {
                        id: '2',
                        name: '1'
                    },
                    {
                        id: '3',
                        name: '2'
                    },
                    {
                        id: '4',
                        name: '3'
                    },
                    {
                        id: '5',
                        name: '4'
                    },
                ],
                hospTag: [],
                modalHosp: false
            }
        },
        methods: {
            hospital () {
                this.modalHosp = true
            },
            branch () {

            },
            user () {

            },
            rr (r) {
                this.modalHosp = false
                this.hospTag.push(r)
                console.log(this.hospTag)
            },
            tagClose (event) {
                var $this = $(event.currentTarget).parent();
                var $index = $this.data('index')
                this.hospTag.splice($index, 1);
            }
        }
    }
</script>

<style scoped>
    .userPower .title {
        float: right;
        font-size: 13px;
        line-height: 32px;
    }
    .userPower .tagBox {
        margin: 10px 0;
    }
</style>