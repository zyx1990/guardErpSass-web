/**
 * 咨询医生设置
 */

<template>
    <div class="container-box">
        <div class="container-header">
            <h2>咨询医生设置管理</h2>
            <ul class="header-btn-group">
                <li class="header-item"><Icon type="plus-round"></Icon>增加</li>
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
                        title: '序号',
                        type: 'index',
                        width: 60
                    },
                    {
                        title: '医生',
                        key: 'name'
                    },
                    {
                        title: '允许分诊',
                        key: 'triage',
                        render (row) {
                            const color = row.triage == 1 ? 'blue' : 'red';
                            const text = row.triage == 1 ? '是' : '否';
                            return `<span style='color:${color};'>${text}</span>`;
                        }
                    },
                    {
                        title: '允许预约',
                        key: 'order',
                        render (row) {
                            const color = row.order == 1 ? 'blue' : 'red';
                            const text = row.order == 1 ? '是' : '否';
                            return `<span style='color:${color};'>${text}</span>`;
                        }
                    },
                    {
                        title: '排班关联',
                        key: 'time',
                        render (row) {
                            const color = row.time == 1 ? 'blue' : 'red';
                            const text = row.time == 1 ? '是' : '否';
                            return `<span style='color:${color};'>${text}</span>`;
                        }
                    },
                    {
                        title: '别名',
                        key: 'alias'
                    },
                    {
                        title: '操作',
                        key: 'action',
                        width: 150,
                        align: 'center',
                        render (row, column, index) {
                            return `<i-button type="primary" size="small"><Icon type="edit"></Icon>编辑</i-button> <i-button type="error" size="small"><Icon type="ios-trash-outline"></Icon>删除</i-button>`;
                        }
                    }
                ],
                data: [
                    {
                        name: '锦医卫集团总部',
                        triage: '1',
                        order: '1',
                        time: '0',
                        alias: '公交广告'
                    },
                    {
                        name: '锦医卫集团总部',
                        triage: '0',
                        order: '0',
                        time: '1',
                        alias: '公交广告'
                    },
                    
                ]
            }
        },
        methods: {}
            
    }
</script>