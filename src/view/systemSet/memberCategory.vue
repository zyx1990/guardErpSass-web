/**
 * 会员类型管理
 */

<template>
    <div class="container-box" ref="containerBox">
        <div class="container-header">
            <h2>会员类型管理</h2>
            <ul class="header-btn-group">
                <li class="header-item"><Icon type="gear-b"></Icon>重置会员</li>
            </ul>
        </div>
        <div class="container-body">
            <Table stripe :columns="columns" :data="data"></Table>
        </div>
    </div>
</template>

<script>
    export default {
        data () {
            return {
                columns: [
                    {
                        title: '等级',
                        key: 'rank'
                    },
                    {
                        title: '名称',
                        key: 'name'
                    },
                    {
                        title: '图标',
                        key: 'icon'
                    },
                    {
                        title: '金额限制',
                        key: 'money'
                    },
                    {
                        title: '备注',
                        key: 'remark'
                    },
                    {
                        title: '权益列表',
                        key: 'list',
                        render (row) {
                            return `<p v-for='item in data[0].list'>{{item.msg}}</p>`;
                        }
                    },
                    {
                        title: '操作',
                        key: 'action',
                        width: 400,
                        align: 'center',
                        render (row, column, index) {
                            return `<i-button type="primary" size="small" @click="edit(${index})"><Icon type="edit"></Icon>编辑</i-button>
                                    <i-button type="error" size="small" @click="remove(${index})"><Icon type="edit"></Icon>修改图标</i-button>
                                    <i-button type="info" size="small" @click="set(${index})"><Icon type="gear-b"></Icon>默认图标</i-button>
                                    <i-button type="warning" size="small" @click="cusStamp(${index})"><Icon type="edit"></Icon>修改金额</i-button>
                                    <i-button type="error" size="small" @click="backStamp(${index})"><Icon type="wrench"></Icon>配置权益</i-button>`;
                        }
                    }
                ],
                data: [
                    {
                        rank: '0',
                        name: '123',
                        icon: '124142',
                        money: '玻尿酸',
                        remark: '1',
                        list: [
                            {msg: '1'},
                            {msg: '2'},
                            {msg: '3'}
                        ]
                    }
                ]
            }
        },
        methods: {
            edit: function(index) {

            },
            remove: function(index) {

            },
            set: function(index) {

            },
            cusStamp: function(index) {

            },
            backStamp: function(index) {

            }
        }
    }
</script>