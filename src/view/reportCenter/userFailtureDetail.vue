/**
 * 用户未成交明细
 */

<template>
    <div class="container-box" ref="containerBox">
        <div class="container-header">
            <h2>用户未成交明细</h2>
            <ul class="header-btn-group">
                <li class="header-item"><Icon type="ios-download-outline"></Icon>导出</li>
            </ul>
        </div>
        <div class="container-body">
            <Form  :label-width="60" inline>
                <Form-item label="提交日期">
                    <Date-picker type="daterange" placement="bottom-start" placeholder="选择日期" style="width: 180px" :options='options'></Date-picker>
                </Form-item>
                <Form-item label="未成交类型" :label-width="80">
                    <Select v-model="typeBox" clearable style="width:162px">
                        <Option v-for="item in typeList" :value="item.value" :key="item">{{ item.label }}</Option>
                    </Select>
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
                        title: '日期',
                        key: 'date'
                    },
                    {
                        title: '时间',
                        key: 'time'
                    },
                    {
                        title: '客户编号',
                        key: 'number'
                    },
                    {
                        title: '客户姓名',
                        key: 'name'
                    },
                    {
                        title: '未成交类型',
                        key: 'type'
                    },
                    {
                        title: '内容',
                        key: 'content'
                    }
                ],
                data: [
                    {
                        date: '2017-05-08',
                        time: '2017-05-08 10:11:43',
                        number: '123',
                        name: 'sdfs',
                        type: '0',
                        content: '21111'
                    }
                ],
                typeBox: '',
                typeList: [
                    {
                        value: '1',
                        label: '已处理'
                    },
                    {
                        value: '0',
                        label: '未处理'
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