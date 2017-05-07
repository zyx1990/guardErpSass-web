/**
 * 套餐管理
 */

<template>
    <div class="container-box" ref="containerBox">
        <div class="container-header">
            <h2>套餐管理</h2>
            <ul class="header-btn-group">
                <li class="header-item"><Icon type="plus-round"></Icon>增加</li>
            </ul>
        </div>
        <div class="container-body">
            <Form  :label-width="60" inline>
                <Form-item label="名称">
                    <Input type="text" placeholder="请输入名称"></Input>
                </Form-item>
                <Form-item label="拼音码">
                    <Input type="text" placeholder="请输入拼音码"></Input>
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
                        title: '名称',
                        key: 'name'
                    },
                    {
                        title: '拼音码',
                        key: 'pinyin'
                    },
                    {
                        title: '价格',
                        key: 'price',
                        render (row) {
                            return `<span style='color: orange;'>${row.price}</span>`
                        }
                    },
                    {
                        title: '状态',
                        key: 'states',
                        render (row) {
                            const color = row.states == 1 ? 'blue' : 'red';
                            const text = row.states == 1 ? '启用' : '禁用';
                            return `<span style='color:${color};'>${text}</span>`;
                        }
                    },
                    {
                        title: '操作',
                        key: 'action',
                        width: 350,
                        align: 'center',
                        render (row, column, index) {
                            return `<i-button type="primary" size="small" @click="edit(${index})"><Icon type="edit"></Icon>编辑</i-button>
                                    <i-button type="error" size="small" @click="remove(${index})"><Icon type="ios-trash-outline"></Icon>删除</i-button>`;
                        }
                    }
                ],
                data: [
                    {
                        name: '玻尿酸',
                        pinyin: 'sdfs',
                        price: '￥2.00',
                        states: '1'
                    },
                    {
                        name: '玻尿酸',
                        pinyin: 'sdfs',
                        price: '￥2.00',
                        states: '0'
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
                ]
            }
        },
        methods: {
            edit: function(index) {

            },
            remove: function(index) {

            }
        }
    }
</script>