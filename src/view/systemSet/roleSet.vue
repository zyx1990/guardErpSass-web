/**
 * 角色管理配置页面
 */
<template>

    <div class="container-box">
        <div class="container-header">
            <h2>角色管理配置页面</h2>
        </div>
        <div class="container-body">
            <Tabs >
                <Tab-pane label="可操作菜单">
                    <Button type="primary" shape="circle" icon="gear-b" style='margin-bottom:15px;' @click='add'>配置菜单</Button>
                    <Table stripe :columns="menuColumns" :data="menuData"></Table>
                </Tab-pane>
                <Tab-pane label="可查看报表">
                    <Button type="primary" shape="circle" icon="gear-b" style='margin-bottom:15px;'>配置报表</Button>
                    <Table stripe :columns="reportColumns" :data="reportData"></Table>
                </Tab-pane>
                <Tab-pane label="可操作权限">
                    <Button type="primary" shape="circle" icon="gear-b" style='margin-bottom:15px;'>配置权限</Button>
                    <Table stripe :columns="powerColumns" :data="powerData"></Table>
                </Tab-pane>
            </Tabs>
            <Modal
                title="设置角色菜单"
                v-model="modalEdit"
                :closable="false"
                @on-ok="ok"
                :loading="loading"
                class-name="vertical-center-modal">
                <Table height="350" stripe :columns="columns1" :data="data1" :context="self1"></Table>
            </Modal>
        </div>
    </div>
</template>

<script>
    export default {
        data () {
            return {
                columns1: [
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
                    },
                    {
                        type: 'selection',
                        width: 60,
                        align: 'center'
                    }
                ],
                self1: this,
                modalEdit: false,
                loading: true,
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
        computed: {
            data1 () {
                var data = [
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
                ]
                return data;
            }
        },
        methods: {
            add () {
                this.modalEdit = true
            },
            ok () {
                setTimeout(() => {
                    this.modalEdit = false;
                    this.$Notice.success({
                        title: '系统提示！',
                        desc: '保存成功！'
                    });
                }, 1000);
            }
        }
    }
</script>