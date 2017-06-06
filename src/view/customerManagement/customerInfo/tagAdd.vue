/**
 * 客户标签管理页面
 */

<template>
    <div class="container-box userPower">
        <div v-if='powerLoad > 0'>
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
        <Alert type="error" show-icon v-if='powerLoad == 0'>
            提示信息
            <div slot="desc">
                <p>{{errorMsg}}</p>
                <Button type="primary" shape="circle" icon="android-arrow-back" @click='back'>返回</Button>
            </div>
        </Alert>
        <Spin fix v-if='powerLoad < 0'>
            <Icon type="load-c" size=40 class="demo-spin-icon-load"></Icon>
            <div>Loading</div>
        </Spin>
    </div>
</template>

<script>
    export default {
        data () {
            return {
                cusName: '',
                powerLoad: '-1',
                errorMsg: '',
                formValidate: {
                    customerId: '',
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
                        key: 'detailList',
                        render: (h, params) => {
                            return h('div', params.row.detailList.map(item => {
                                return h('Tag', {
                                    props: {
                                        type: 'border',
                                        color: 'blue'
                                    },
                                    on: {
                                        "click": () => {
                                            this.choose(item)
                                        }
                                    }
                                },item.tagName)
                            }))
                        }
                    }
                ],
            }
        },
        created () {
            if (window.sessionStorage) {
                var lg = window.sessionStorage;
                this.formValidate.customerId = lg.cusId
                this.cusName = lg.cusName
            }
            this.getId(this.formValidate.customerId)
        },
        methods: {
            // 获取资料
            getId (id) {
                var _vm = this;
                _vm.$http.get({
                    url: 'guard-webManager/customerRecord/tagAdd.jhtml',
                    data: {customerId: id},
                    success: function(res){
                        if(res.status == 200 ){
                            if(res.data.code == 0) {
                                _vm.powerLoad = 1
                                _vm.data = res.data.content
                            } else {
                                _vm.powerLoad = 0
                                _vm.errorMsg = res.data.desc
                            }
                        } else {
                            console.log(res.data.desc)
                        }
                    },
                    error: function(res){
                        console.log(res);
                    }
                });
            },
            choose (data) {
                console.log(data)
            },
        }
    }
</script>


