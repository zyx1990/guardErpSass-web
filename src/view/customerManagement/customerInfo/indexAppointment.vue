/**
 * 预约情况页面
 */

<template>
    <div class="customer-box">
        <div class="customer-item">
            <div class="customer-item-title">
                <h3><Icon type="pricetag"></Icon>咨询预约</h3>
            </div>
            <Table :columns="col" :data="data"></Table>
        </div>
        <div class="customer-item">
            <div class="customer-item-title">
                <h3><Icon type="pricetag"></Icon>治疗预约</h3>
            </div>
            <Table :columns="col1" :data="data1"></Table>
        </div>
        <div class="customer-item">
            <div class="customer-item-title">
                <h3><Icon type="pricetag"></Icon>手术预约</h3>
            </div>
            <Table :columns="col2" :data="data2"></Table>
        </div>
    </div>
</template>

<script>
    export default {
        data () {
            return {
                cusName: '',
                cusId: '',
                col: [
                    {   
                        title: '序号',
                        type: 'index',
                        width: 60
                    },
                    {
                        title: '预约医院',
                        key: 'hospitalName'
                    },
                    {
                        title: '预约日期',
                        key: 'appointmentdate'
                    },
                    {
                        title: '预约时间',
                        key: 'appointmentstarttime',
                        render: (h, params) => {
                            return h('div', [
                                    h('span', params.row.appointmentstarttime),
                                    h('span', '-' + params.row.appointmentendtime),
                                ])
                        }
                    },
                    {
                        title: '预约咨询人员',
                        key: 'userName'
                    },
                    {
                        title: '预约码',
                        key: 'code'
                    },
                    {
                        title: '状态',
                        width: 70,
                        key: 'status',
                        render: (h, params) => {
                            const color = params.row.status === 1 ? 'blue' : 'red';
                            const text = params.row.status === 1 ? '已上门' : '未上门';
                            return h('span', {
                                style: {
                                    color: color
                                }
                            },text)
                        }
                    },
                    {
                        title: '提交时间',
                        key: 'createtime'
                    },
                    {
                        title: '提交用户',
                        key: 'createUserName',
                        return: (h, params) => {
                            return h('span', '【' + createUserHospitalName + '】 【' + createUserDeptName + '】 【' + createUserName + '】')
                        }
                    },
                    {
                        title: '备注',
                        key: 'content'
                    },
                    {
                        title: '操作',
                        key: 'action',
                        width: 180,
                        align: 'center',
                        render: (h, params) => {
                            return h('div', [
                                    h('Button', {
                                        props: {
                                            type: 'primary',
                                            size: 'small',
                                            icon: 'edit'
                                        },
                                        style: {
                                            marginRight: '5px'
                                        },
                                        on: {
                                            click: () => {
                                                this.toEdit(params.row, '1')
                                            }
                                        }
                                    }, '编辑'),
                                    h('Button', {
                                        props: {
                                            type: 'error',
                                            size: 'small',
                                            icon: 'ios-trash-outline'
                                        },
                                        on: {
                                            click: () => {
                                                this.remove(params.row, '1')
                                            }
                                        }
                                    }, '删除'),
                                ])
                        }
                    }
                ],
                data: [],
                data1: [],
                data2: [],
                col1: [
                    {   
                        title: '序号',
                        type: 'index',
                        width: 60
                    },
                    {
                        title: '预约日期',
                        key: 'appointmentdate'
                    },
                    {
                        title: '预约时间',
                        key: 'appointmentstarttime',
                        render: (h, params) => {
                            return h('div', [
                                    h('span', params.row.appointmentstarttime),
                                    h('span', '-' + params.row.appointmentendtime),
                                ])
                        }
                    },
                    {
                        title: '状态',
                        width: 70,
                        key: 'status',
                        render: (h, params) => {
                            const color = params.row.status === 1 ? 'blue' : 'red';
                            const text = params.row.status === 1 ? '已上门' : '未上门';
                            return h('span', {
                                style: {
                                    color: color
                                }
                            },text)
                        }
                    },
                    {
                        title: '预约医院',
                        key: 'hospitalName'
                    },
                    {
                        title: '预约医生',
                        key: 'userName'
                    },
                    {
                        title: '预约项目',
                        key: 'chargeName'
                    },
                    {
                        title: '提交时间',
                        key: 'createtime'
                    },
                    {
                        title: '提交用户',
                        key: 'createUserName',
                        return: (h, params) => {
                            return h('span', '【' + createUserHospitalName + '】 【' + createUserDeptName + '】 【' + createUserName + '】')
                        }
                    },
                    {
                        title: '备注',
                        key: 'remark'
                    },
                    {
                        title: '操作',
                        key: 'action',
                        width: 180,
                        align: 'center',
                        render: (h, params) => {
                            return h('div', [
                                    h('Button', {
                                        props: {
                                            type: 'primary',
                                            size: 'small',
                                            icon: 'edit'
                                        },
                                        style: {
                                            marginRight: '5px'
                                        },
                                        on: {
                                            click: () => {
                                                this.toEdit(params.row, '2')
                                            }
                                        }
                                    }, '编辑'),
                                    h('Button', {
                                        props: {
                                            type: 'error',
                                            size: 'small',
                                            icon: 'ios-trash-outline'
                                        },
                                        on: {
                                            click: () => {
                                                this.remove(params.row, '2')
                                            }
                                        }
                                    }, '删除'),
                                ])
                        }
                    }
                ],
                col2: [
                    {   
                        title: '序号',
                        type: 'index',
                        width: 60
                    },
                    {
                        title: '预约医院',
                        key: 'hospitalName'
                    },
                    {
                        title: '预约日期',
                        key: 'appointmentdate'
                    },
                    {
                        title: '预约时间',
                        key: 'appointmenttimestart',
                        render: (h, params) => {
                            const _start = params.row.appointmenttimestart.split(' ')[1].split(':')[0] + ':' + params.row.appointmenttimestart.split(' ')[1].split(':')[1]
                            const _end = params.row.appointmenttimeend.split(' ')[1].split(':')[0] + ':' + params.row.appointmenttimeend.split(' ')[1].split(':')[1]
                            return h('div', [
                                    h('span', _start),
                                    h('span', '-' + _end),
                                ])
                        }
                    },
                    {
                        title: '医生',
                        key: 'userName'
                    },
                    {
                        title: '麻醉方式',
                        key: 'anesthesiatype',
                        render: (h, params) => {
                            const color = params.row.anesthesiatype === 1 ? 'blue' : 'red';
                            const text = params.row.anesthesiatype === 1 ? '全麻' : '局麻';
                            return h('span', {
                                style: {
                                    color: color
                                }
                            },text)
                        }
                    },
                    {
                        title: '项目',
                        key: 'detailList',
                        render: (h, params) => {
                            return h('div', params.row.detailList.map(item => {
                                return h('p', item.chargeName)
                            }))
                        }
                    },
                    {
                        title: '备注',
                        key: 'remark'
                    },
                    {
                        title: '提交时间',
                        key: 'createtime'
                    },
                    {
                        title: '提交用户',
                        key: 'createUserName',
                        return: (h, params) => {
                            return h('span', '【' + createUserHospitalName + '】 【' + createUserDeptName + '】 【' + createUserName + '】')
                        }
                    },
                    {
                        title: '状态',
                        width: 70,
                        key: 'status',
                        render: (h, params) => {
                            const color = params.row.status === 0 ? 'blue' : params.row.status === 1 ? 'red' : 'orange';
                            const text = params.row.status === 0 ? '未开始' : params.row.status === 1 ? '进行中' : '已结束';
                            return h('span', {
                                style: {
                                    color: color
                                }
                            },text)
                        }
                    },
                    {
                        title: '开始时间',
                        key: 'starttime'
                    },
                    {
                        title: '结束时间',
                        key: 'endtime'
                    },
                    {
                        title: '操作',
                        key: 'action',
                        width: 220,
                        align: 'center',
                        render: (h, params) => {
                            return h('div', [
                                    h('Button', {
                                        props: {
                                            type: 'primary',
                                            size: 'small',
                                            icon: 'edit'
                                        },
                                        style: {
                                            marginRight: '2px'
                                        },
                                        on: {
                                            click: () => {
                                                this.toEdit(params.row, '3')
                                            }
                                        }
                                    }, '编辑'),
                                    h('Button', {
                                        props: {
                                            type: 'error',
                                            size: 'small',
                                            icon: 'ios-trash-outline'
                                        },
                                        style: {
                                            marginRight: '2px'
                                        },
                                        on: {
                                            click: () => {
                                                this.remove(params.row, '3')
                                            }
                                        }
                                    }, '删除'),
                                    h('Button', {
                                        props: {
                                            type: 'warning',
                                            size: 'small',
                                            icon: 'printer'
                                        },
                                        on: {
                                            click: () => {
                                                this.print(params.row)
                                            }
                                        }
                                    }, '打印'),
                                ])
                        }
                    }
                ]
            }
        },
        created () {
            if (window.sessionStorage) {
                var lg = window.sessionStorage;
                this.cusId = lg.cusId
                this.cusName = lg.cusName
            }
            this.getList(this.cusId)
        },
        methods: {
            getList (id) {
                var _vm = this;
                _vm.$http.get({
                    url: 'guard-webManager/customerRecord/getAppointments.jhtml',
                    data: {id: id},
                    success: function(res){
                        if(res.status == 200 ){
                            console.log(res)
                            _vm.data = res.data.content.appointmentList
                            _vm.data1 = res.data.content.treatList
                            _vm.data2 = res.data.content.surgeryList
                        } else {
                            console.log(res.data.desc)
                        }
                    },
                    error: function(res){
                        console.log(res);
                    }
                });
            },
            //修改预约信息
            toEdit (data, type) {
                var _url = ''
                var _text = ''
                switch (type) {
                    case '1':
                        _url = '/appointmentUpdate'
                        _text = '修改预约信息'
                        break;
                    case '2':
                        _url = '/treatUpdate'
                        _text = '修改治疗预约'
                        break;
                    case '3':
                        _url = '/surgeryUpdate'
                        _text = '修改手术预约信息'
                        break;
                }
                var breadData = [
                    {
                        url: '/desktop',
                        text: '桌面'
                    },
                    {
                        url: '/customerMsg',
                        text: this.cusName
                    },
                    {
                        url: _url,
                        text: _text
                    }
                ];
                this.$store.dispatch('setBreadData', breadData);
                this.$router.push({
                    path: _url,
                    query: {
                        id: data.id
                    }
                })
            },
            //取消订单
            remove (data, type) {
                var _vm = this;
                var _url = ''
                switch (type) {
                    case '1':
                        _url = 'guard-webManager/customerRecord/appointmentDelete.jhtml'
                        break;
                    case '2':
                        _url = 'guard-webManager/customerRecord/treatDelete.jhtml'
                        break;
                    case '3':
                        _url = 'guard-webManager/customerRecord/surgeryDelete.jhtml'
                        break;
                }
                _vm.$Modal.confirm({
                    title: '系统提示',
                    content: '确定取消此预约？',
                    onOk: () => {
                        _vm.$http.post({
                            url: _url,
                            data: {id: data.id},
                            success: function(res){
                                if(res.status == 200 ){
                                    if(res.data.code == 0) {
                                        _vm.getList(_vm.cusId)
                                        _vm.$Notice.success({
                                            title: '系统提示！',
                                            desc: '删除成功！'
                                        });
                                    } else {
                                        _vm.$Notice.error({
                                            title: '系统提示！',
                                            desc: res.data.desc
                                        });
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
                    onCancel: () => {
                        
                    }
                });
            },
        }
    }
</script>





