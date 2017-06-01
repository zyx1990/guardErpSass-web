/**
 * 修改会员类型页面
 */

<template>
    <div class="container-box">
        <div class="container-header">
            <h2>修改会员类型</h2>
        </div>
        <div class="container-body">
            <Form :label-width="100" ref="formValidate" :model="formValidate" label-position="right" :rules="ruleForm">
                <Form-item label="权益列表" prop="equityList" required>
                    <Row>
                        <Col span="20">
                            <Table stripe :columns="col" :data="formValidate.equityList"></Table>
                        </Col>
                        <Col span="3" offset="1" class='table-left-btn'>
                            <Button type="primary" shape="circle" icon="plus-round" @click='add'>增加</Button>
                            <Button type="primary" shape="circle" icon="refresh" @click='clean'>清空</Button>
                        </Col>
                    </Row>
                </Form-item>
            </Form>
            <div class="footer-btnGroup">
                <Button type="primary" shape="circle" icon="checkmark" @click='save'>保存</Button>
                <Button type="primary" shape="circle" icon="android-arrow-back" @click='back'>返回</Button>
            </div>
            <Modal
                title="选择权益"
                v-model="modalEdit"
                :closable="false"
                @on-ok="ok"
                :loading="loading"
                class-name="vertical-center-modal">
                <Table height="350" stripe :columns="col1" :data="data" @on-selection-change='change'></Table>
            </Modal>
        </div>
    </div>
</template>

<script>
    export default {
        data () {
            const validateList = (rule, value, callback) => {
                if (value.length === 0) {
                    callback(new Error('请选择权益'));
                } else {
                    callback();
                }
            };
            return {
                col: [
                    {
                        title: '权益名称',
                        key: 'equityName'
                    },
                    {
                        title: '权益内容',
                        key: 'equityContent'
                    },
                    {
                        title: '操作',
                        key: 'action',
                        width: 100,
                        align: 'center',
                        render: (h, params) => {
                            return h('div', [
                                    h('Button', {
                                        props: {
                                            type: 'error',
                                            size: 'small',
                                            icon: 'ios-trash-outline'
                                        },
                                        on: {
                                            click: () => {
                                                this.remove(params.index)
                                            }
                                        }
                                    }, '删除'),
                                ])
                        }
                    }
                ],
                data: [],
                selectBox: [],
                col1: [
                    {
                        type: 'selection',
                        width: 60,
                        align: 'center'
                    },
                    {
                        title: '名称',
                        key: 'name'
                    },
                    {
                        title: '内容',
                        key: 'content'
                    }
                ],
                modalEdit: false,
                loading: true,
                formValidate: {
                    id: '',
                    equityList: []
                },
                ruleForm: {
                    equityList: [
                        { validator: validateList, trigger: 'blur' }
                    ]
                },
            }
        },
        created () {
            this.getId()
        },
        mounted () {
            // this.getList()
        },
        methods: {
            getId () {
                var _vm = this;
                _vm.$http.post({
                    url: 'guard-webManager/memberCategory/getEquitys.jhtml',
                    data: {id: _vm.$route.query.id},
                    success: function(res){
                        if(res.status == 200 ){
                            console.log(res)
                        } else {
                            console.log(res.data.desc)
                        }
                    },
                    error: function(res){
                        console.log(res);
                    }
                });
            },
            getList () {
                var _vm = this
                _vm.$http.get({
                    url: 'guard-webManager/select/channelInfo.jhtml',
                    success: function(res){
                        if(res.status == 200 ){
                            console.log(res.data.content)
                            _vm.data = res.data.content
                        } else {
                            console.log(res.data.desc)
                        }
                    },
                    error: function(res){
                        console.log(res);
                    }
                });
            },
            add () {
                this.modalEdit = true
            },
            clean () {
                this.formValidate.equityList.splice(0)
            },
            remove (index) {
                this.formValidate.equityList.splice(index, 1)
            },
            change (data) {
                this.selectBox = data
            },
            ok () {
                var bool = true
                for(var n of this.selectBox) {
                    for(var m of this.formValidate.equityList) {
                        if(n.id == m.channelid) {
                            bool = false
                        }
                    }
                    if(bool) {
                        n['channelid'] = n['id']
                        n['channelName'] = n['name']
                        this.formValidate.equityList.push(n)
                    } else {
                        bool = true
                    }
                }
                this.modalEdit = false
            },
            save () {
                var _vm = this
                var url = ''
                var data = {}
                var idBox = []
                for(var id of _vm.formValidate.equityList) {
                    idBox.push(id.channelid)
                }
                _vm.$refs['formValidate'].validate((valid) => {
                    if(valid) {
                        url = 'guard-webManager/memberCategory/updateEquitys.jhtml'
                        data = {
                            id: _vm.$route.query.id,
                            name: _vm.formValidate.name,
                            sortNo: _vm.formValidate.sortNo,
                            remark: _vm.formValidate.remark,
                            equityList: idBox
                        }
                        _vm.$http.ajax({
                            url: url,
                            data: data,
                            success: function(res){
                                if(res.code == 0 ){
                                    var breadData = [
                                        {
                                            url: '/desktop',
                                            text: '桌面'
                                        },
                                        {
                                            url: '/memberCategory',
                                            text: '会员类型管理'
                                        }
                                    ];
                                    _vm.$store.dispatch('setBreadData', breadData);
                                    _vm.$router.push('/memberCategory')
                                } else {
                                    console.log(res.desc)
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
                        url: '/memberCategory',
                        text: '会员类型管理'
                    }
                ];
                this.$store.dispatch('setBreadData', breadData);
                this.$router.back(-1)
            }
        }
    }
</script>
