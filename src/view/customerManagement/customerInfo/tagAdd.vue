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
                    <Form-item label="标签" prop="groupList" required>
                        <div class="tagBox">
                            <div v-for='(item, index) in tagBox' :key='item' class='tagList-item' @click="close(index)">
                                <Tag type="border" closable  color="blue">{{item.name}}</Tag>
                            </div>
                        </div>
                    </Form-item>
                </Form>
                <Tabs value="name1">
                    <Tab-pane label="查找标签" name="name1">
                        <Form inline ref='formSearch' :model='formSearch'>
                            <Form-item prop='name'>
                                <Input v-model="formSearch.name" placeholder="请输入标签名称"></Input>
                            </Form-item>
                            <ul class="header-btn-group not-float">
                                <li class="header-item" @click="getList(formSearch)"><Icon type="search"></Icon>查询</li>
                                <li class="header-item" @click="handleReset('formSearch')"><Icon type="refresh"></Icon>重置</li>
                            </ul>
                        </Form>
                        <div class="tagBox">
                            <div v-for='item in tagList' :key='item' class='tagList-item' @click="choose(item, '1')">
                                <Tag type="border" color="blue">{{item.name}}</Tag>
                            </div>
                        </div>
                    </Tab-pane>
                    <Tab-pane label="标签组" name="name2">
                        <Table stripe :columns="col" :data="data"></Table>
                    </Tab-pane>
                </Tabs>
                <div class="footer-btnGroup">
                    <Button type="primary" shape="circle" icon="checkmark" @click='save'>保存</Button>
                    <Button type="primary" shape="circle" icon="android-arrow-back" @click='back'>返回</Button>
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
                    groupList: []
                },
                formSearch: {
                    name: ''
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
                                return h('div', {
                                    style: {
                                        display: 'inline-block',
                                        margin: '0px 5px'
                                    },
                                    on: {
                                        click: () => {
                                            this.choose(item, '2')
                                        }
                                    }
                                }, [
                                    h('Tag', {
                                        props: {
                                            type: 'border',
                                            color: 'blue'
                                        }
                                    }, item.tagName)
                                ])
                            }))
                        }
                    }
                ],
                tagList: [],
                tagBox: [],
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
                                console.log(res)
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
            //查找标签
            getList (form) {
                var _vm = this;
                _vm.$http.get({
                    url: 'guard-webManager/select/tagList.jhtml',
                    data: form,
                    success: function(res){
                        if(res.status == 200 ){
                            console.log(res)
                            _vm.tagList = res.data.content.content
                        } else {
                            console.log(res.data.desc)
                        }
                    },
                    error: function(res){
                        console.log(res);
                    }
                });
            },
            choose (data, type) {
                var _vm = this
                var _bool = true
                if(type == 2) {
                    data['name'] = data['tagName']
                } else {
                    data['tagid'] = data['id']
                }
                for(let item of _vm.tagBox) {
                    if(item.tagid == data.tagid) {
                        _bool = false
                    }
                }
                if(_bool) {
                    _vm.tagBox.push(data)
                    _vm.formValidate.groupList.push(data.tagid)
                }
            },
            close (index) {
                this.tagBox.splice(index, 1)
                this.formValidate.groupList.splice(index, 1)
            },
            handleReset (name) {
                var _vm = this
                _vm.$refs[name].resetFields();
            },
            save () {
                var _vm = this
                _vm.$refs['formValidate'].validate((valid) => {
                    if(valid) { 
                        _vm.$http.ajax({
                            url: 'guard-webManager/customerRecord/addTag.jhtml',
                            data: _vm.formValidate,
                            success: function(res){
                                console.log(res)
                                if(res.code == 0) {
                                    var breadData = [
                                        {
                                            url: '/desktop',
                                            text: '桌面'
                                        },
                                        {
                                            url: '/customer',
                                            text: '客户管理'
                                        },
                                        {
                                            url: '/customerMsg',
                                            text: _vm.cusName
                                        }
                                    ];
                                    _vm.$store.dispatch('setBreadData', breadData);
                                    _vm.$router.push('/customerMsg')
                                } else {
                                    _vm.$Notice.error({
                                        title: '系统提示！',
                                        desc: res.desc
                                    });
                                }
                            },
                            error: function(res){
                                console.log(res);
                            }
                        });
                    }
                })
            },
            back () {
                var breadData = [
                    {
                        url: '/desktop',
                        text: '桌面'
                    },
                    {
                        url: '/customer',
                        text: '客户管理'
                    },
                    {
                        url: '/customerMsg',
                        text: this.cusName
                    }
                ];
                this.$store.dispatch('setBreadData', breadData);
                this.$router.back(-1)
            }
        }
    }
</script>

<style scoped>
    .tagList-item {
        display: inline-block;
        margin: 3px 6px;
    }
</style>

