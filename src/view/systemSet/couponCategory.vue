/**
 * 代金券类型管理
 */

<template>
    <div class="container-box">
        <div class="container-header">
            <h2>代金券类型管理</h2>
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
                        title: '名称',
                        key: 'name'
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
                        title: '可用医院',
                        key: 'hospital'
                    },
                    {
                        title: '使用范围',
                        key: 'used'
                    },
                    {
                        title: '描述',
                        key: 'description'
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
                        name: '价格通用预收款贵',
                        states: '1',
                        hospital: '锦医卫北京机构、锦医卫上海机构、锦医卫广州机构、锦医卫深圳机构',
                        used: '无限制',
                        description: '公交广告'
                    },
                    {
                        name: '价格通用预收款贵',
                        states: '0',
                        hospital: '锦医卫北京机构',
                        used: '无限制',
                        description: '公交广告'
                    },
                    {
                        name: '价格通用预收款贵',
                        states: '1',
                        hospital: '锦医卫广州机构',
                        used: '无限制',
                        description: '公交广告'
                    }
                ]
            }
        },
        methods: {
            
        }
    }
</script>