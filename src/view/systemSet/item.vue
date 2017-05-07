/**
 * 报表项目管理页面
 */

<template>
    <div class="container-box">
        <div class="container-header">
            <h2>报表项目管理</h2>
            <ul class="header-btn-group">
                <li class="header-item"><Icon type="settings"></Icon>检测症状</li> 
                <li class="header-item"><Icon type="settings"></Icon>检测收费项目</li>  
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
                        title: '组名称',
                        key: 'group'
                    },
                    {
                        title: '排序号',
                        key: 'sort'
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
                        name: '鼻部整形',
                        group: '111',
                        sort: 1,
                        description: '公交广告'
                    },
                    {
                        name: '眼部整形',
                        sort: 2,
                        group: '22',
                        description: '222'
                    }
                ]
            }
        },
        methods: {
        }
    }
</script>



