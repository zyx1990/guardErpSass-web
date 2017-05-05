/**
 * 客户归属权变更
 */

<template>
    <div class="container-box" ref="containerBox">
        <div class="container-header">
            <h2>归属权管理</h2>
            <ul class="header-btn-group">
                <li class="header-item"><Icon type="gear-b"></Icon>批量设置开发人员</li>
                <li class="header-item"><Icon type="gear-b"></Icon>批量设置咨询人员</li>
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
                        title: '名称',
                        key: 'name'
                    },
                    {
                        title: '部门',
                        key: 'branch'
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
                        title: '开发人员归属',
                        key: 'develop'
                    },
                    {
                        title: '咨询人员归属',
                        key: 'consult'
                    },
                    {
                        title: '操作',
                        key: 'action',
                        width: 300,
                        align: 'center',
                        render (row, column, index) {
                            return `<i-button type="primary" size="small" @click="edit(${index})"><Icon type="edit"></Icon>变更</i-button>`;
                        }
                    },
                    {
                        title: '操作',
                        key: 'action',
                        width: 300,
                        align: 'center',
                        render (row, column, index) {
                            return `<i-button type="primary" size="small" @click="edit(${index})"><Icon type="edit"></Icon>变更</i-button>`;
                        }
                    }
                ],
                data: [
                    {
                        name: '玻尿酸',
                        branch: '总裁办',
                        states: '1',
                        develop: '22',
                        consult: '33'
                    },
                    {
                        name: '玻尿酸',
                        branch: '总裁办',
                        states: '0',
                        develop: '22',
                        consult: '33'
                    }
                ]
            }
        },
        methods: {
            edit: function(index) {
                
            }
        }
    }
</script>