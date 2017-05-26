/**
 * 用户查看权限页面
 */
<template>

    <div class="container-box">
        <div class="container-header">
            <h2>用户查看权限页面</h2>
        </div>
        <div class="container-body">
            <Tabs >
                <Tab-pane label="可操作菜单">
                    <Table stripe :columns="menuColumns" :data="menuData"></Table>
                </Tab-pane>
                <Tab-pane label="可查看报表">
                    <Table stripe :columns="reportColumns" :data="reportData"></Table>
                </Tab-pane>
                <Tab-pane label="可操作权限">
                    <Table stripe :columns="powerColumns" :data="powerData"></Table>
                </Tab-pane>
            </Tabs>

            
        </div>
    </div>
</template>

<script>
    export default {
        data () {
            return {
                menuColumns: [
                    {   
                        title: '序号',
                        type: 'index',
                        width: 60
                    },
                    {
                        title: '菜单名称',
                        key: 'name'
                    },
                    {
                        title: '菜单模块',
                        key: 'type'
                    },
                    {
                        title: '菜单介绍',
                        key: 'introduce'
                    }
                ],
                menuData: [
                    {
                        name: '渠道管理',
                        type: '基础信息',
                        introduce: '1'
                    },
                    {
                        name: '渠道管理',
                        type: '基础信息',
                        introduce: '1'
                    },
                    {
                        name: '渠道管理',
                        type: '基础信息',
                        introduce: '1'
                    },
                    {
                        name: '渠道管理',
                        type: '基础信息',
                        introduce: '1'
                    },
                    {
                        name: '渠道管理',
                        type: '基础信息',
                        introduce: '1'
                    }
                ],
                reportColumns: [
                    {   
                        title: '序号',
                        type: 'index',
                        width: 60
                    },
                    {
                        title: '报表名称',
                        key: 'name'
                    },
                    {
                        title: '报表编号',
                        key: 'number'
                    },
                    {
                        title: '报表模块',
                        key: 'type'
                    },
                    {
                        title: '报表介绍',
                        key: 'introduce'
                    }
                ],
                reportData: [
                    {
                        name: '集团未成交明细',
                        number: '2313',
                        type: '未成交',
                        introduce: ' 整个医院的未成交明细查看'
                    },
                    {
                        name: '集团未成交明细',
                        number: '2313',
                        type: '未成交',
                        introduce: ' 整个医院的未成交明细查看'
                    },
                    {
                        name: '集团未成交明细',
                        number: '2313',
                        type: '未成交',
                        introduce: ' 整个医院的未成交明细查看'
                    },
                    {
                        name: '集团未成交明细',
                        number: '2313',
                        type: '未成交',
                        introduce: ' 整个医院的未成交明细查看'
                    },
                    {
                        name: '集团未成交明细',
                        number: '2313',
                        type: '未成交',
                        introduce: ' 整个医院的未成交明细查看'
                    }
                ],
                powerColumns: [
                    {
                        title: '序号',
                        type: 'index',
                        width: 60
                    },
                    {
                        title: '权限名称',
                        key: 'name'
                    },
                    {
                        title: '权限介绍',
                        key: 'introduce'
                    }
                ],
                powerData: [
                    {
                        name: '可被预约',
                        introduce: '可以查看客户的联系方式'
                    },
                    {
                        name: '可被预约',
                        introduce: '可以查看客户的联系方式'
                    },
                    {
                        name: '可被预约',
                        introduce: '可以查看客户的联系方式'
                    },
                    {
                        name: '可被预约',
                        introduce: '可以查看客户的联系方式'
                    }
                ]
            }
        },
        methods: {

        }
    }
</script>