/**
 * 系统日志记录
 */

<template>
    <div class="container-box" ref="containerBox">
        <div class="container-header">
            <h2>系统日志记录</h2>
        </div>
        <div class="container-body">
            <Form  :label-width="70" inline>
                <Form-item label="操作日期">
                    <Date-picker type="daterange" placement="bottom-start" placeholder="选择日期" style="width: 180px" :options='options'></Date-picker>
                </Form-item>
                <Form-item label="日志类型">
                    <Select v-model="typeBox" clearable style="width:162px">
                        <Option v-for="item in typeList" :value="item.value" :key="item" :disabled="item.choose">{{ item.label }}</Option>
                    </Select>
                </Form-item>
                <Form-item label="所属医院">
                    <Select v-model="hospBox" clearable style="width:162px">
                        <Option v-for="item in hospList" :value="item.value" :key="item">{{ item.label }}</Option>
                    </Select>
                </Form-item>
                <Form-item label="账号">
                    <Input type="text" placeholder="请输入账号"></Input>
                </Form-item>
                <Form-item label="姓名">
                    <Input type="text" placeholder="请输入姓名"></Input>
                </Form-item>
                <Form-item label="客户编号">
                    <Input type="text" placeholder="请输入客户编号"></Input>
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
                        title: '医院',
                        key: 'hospital'
                    },
                    {
                        title: '账号',
                        key: 'userNum'
                    },
                    {
                        title: '姓名',
                        key: 'name'
                    },
                    {
                        title: '操作类型',
                        key: 'type'
                    },
                    {
                        title: '操作IP',
                        key: 'ip'
                    },
                    {
                        title: '操作时间',
                        key: 'time'
                    },
                    {
                        title: '操作客户',
                        key: 'customer'
                    },
                    {
                        title: '内容',
                        key: 'content'
                    }
                ],
                data: [
                    {
                        hospital: '锦医卫北京机构',
                        userNum: '12313',
                        name: '赵国浩',
                        type: '瑞蓝玻尿酸',
                        ip: '222.76.129.35',
                        time: '2017-05-04 15:12:15',
                        customer: '赵国浩',
                        content: '1'
                    },
                    {
                        hospital: '锦医卫北京机构',
                        userNum: '12313',
                        name: '赵国浩',
                        type: '瑞蓝玻尿酸',
                        ip: '222.76.129.35',
                        time: '2017-05-04 15:12:15',
                        customer: '赵国浩',
                        content: '1'
                    },
                    {
                        hospital: '锦医卫北京机构',
                        userNum: '12313',
                        name: '赵国浩',
                        type: '瑞蓝玻尿酸',
                        ip: '222.76.129.35',
                        time: '2017-05-04 15:12:15',
                        customer: '赵国浩',
                        content: '1'
                    }
                ],
                hospBox: '',
                hospList: [
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
            
        }
    }
</script>



