/**
 * 投诉记录
 */

<template>
    <div class="container-box" ref="containerBox">
        <div class="container-header">
            <h2>投诉记录</h2>
        </div>
        <div class="container-body">
            <Form  :label-width="70" inline>
                <Form-item label="投诉日期">
                    <Date-picker type="daterange" placement="bottom-start" placeholder="选择日期" style="width: 162px" :options='options'></Date-picker>
                </Form-item>
                <Form-item label="类型">
                    <Select v-model="typeBox" clearable style="width:162px">
                        <Option v-for="item in typeList" :value="item.value" :key="item" :disabled="item.choose">{{ item.label }}</Option>
                    </Select>
                </Form-item>
                <Form-item label="客户编号">
                    <Input type="text" placeholder="请输入客户编号"></Input>
                </Form-item>
                <Form-item label="状态">
                    <Select v-model="statusBox" clearable style="width:162px">
                        <Option v-for="item in statusList" :value="item.value" :key="item">{{ item.label }}</Option>
                    </Select>
                </Form-item>
                <ul class="header-btn-group not-float">
                    <li class="header-item"><Icon type="search"></Icon>查询</li>
                    <li class="header-item"><Icon type="refresh"></Icon>重置</li>
                </ul>
            </Form>
            <Table stripe :columns="columns" :data="data"></Table>
            <div class="table-page">
                <div class="table-info">当前第1页，共1页，总共5条记录</div>
                <Page class="table-paginate"></Page>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        data () {
            return {
                columns: [
                    {   
                        title: '序号',
                        type: 'index',
                        width: 60
                    },
                    {
                        title: '客户',
                        key: 'customer',
                        render (row) {
                            return `<Icon type="person"></Icon>${row.customer[0].name} (${row.customer[0].num})`
                        }
                    },
                    {
                        title: '投诉类型',
                        key: 'compType'
                    },
                    {
                        title: '投诉对象',
                        key: 'compName'
                    },
                    {
                        title: '投诉项目',
                        key: 'compObj'
                    },
                    {
                        title: '投诉内容',
                        key: 'compCon'
                    },
                    {
                        title: '提交时间',
                        key: 'subDate'
                    },
                    {
                        title: '提交用户',
                        key: 'subUser'
                    },
                    {
                        title: '状态',
                        key: 'status',
                        render (row) {
                            const color = row.status == 1 ? 'blue' : 'red';
                            const text = row.status == 1 ? '已处理' : '未处理';
                            return `<span style='color:${color};'>${text}</span>`;
                        }
                    },
                    {
                        title: '处理用户',
                        key: 'handleUser'
                    },
                    {
                        title: '处理时间',
                        key: 'handleDate'
                    },
                    {
                        title: '处理措施',
                        key: 'measure'
                    },
                    {
                        title: '客户反馈',
                        key: 'feedback'
                    },
                    {
                        title: '操作',
                        key: 'action',
                        width: 100,
                        align: 'center',
                        render (row, column, index) {
                            return `<i-button type="primary" size="small" @click="handle(${index})"><Icon type="edit"></Icon>处理</i-button>`;
                        }
                    }
                ],
                data: [
                    {
                        customer: [
                            {
                                name: '阿斯顿',
                                num: '1231654'
                            }
                        ],
                        compType: ' 服务不好',
                        compName: '赵国浩',
                        compObj: '瑞蓝玻尿酸',
                        compCon: '服务态度不好',
                        subDate: '2017-05-04 15:12:15',
                        subUser: '赵国浩',
                        status: '1',
                        handleUser: '测试医生',
                        handleDate: '2017-04-24 14:49:32',
                        measure: '测试',
                        feedback: '5465'
                    },
                    {
                        customer: [
                            {
                                name: '阿斯顿',
                                num: '1231654'
                            }
                        ],
                        compType: ' 服务不好',
                        compName: '赵国浩',
                        compObj: '瑞蓝玻尿酸',
                        compCon: '服务态度不好',
                        subDate: '2017-05-04 15:12:15',
                        subUser: '赵国浩',
                        status: '0',
                        handleUser: '',
                        handleDate: '',
                        measure: '',
                        feedback: ''
                    }
                ],
                statusBox: '',
                statusList: [
                    {
                        value: '1',
                        label: '已处理'
                    },
                    {
                        value: '0',
                        label: '未处理'
                    }
                ],
                typeBox: '',
                typeList: [
                    {
                        value: '2',
                        label: 'sss',
                        choose: false
                    },
                    {
                        value: '3',
                        label: 'ssss',
                        choose: true
                    }
                ],
                options: {
                    disabledDate (date) {
                        return date && date.valueOf() > Date.now();
                    }
                },
            }
        },
        methods: {
            handle: function(index) {
                
            }
        }
    }
</script>



