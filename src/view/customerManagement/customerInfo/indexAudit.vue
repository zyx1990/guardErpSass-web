/**
 * 审核申请页面
 */

<template>
    <div class="customer-box">
        <div class="customer-item">
            <div class="customer-item-title">
                <h3><Icon type="pricetag"></Icon>开发人员变更</h3>
            </div>
            <Table :columns="col" :data="data"></Table>
        </div>
        <div class="customer-item">
            <div class="customer-item-title">
                <h3><Icon type="pricetag"></Icon>咨询人员变更</h3>
            </div>
            <Table :columns="col1" :data="data1"></Table>
        </div>
        <div class="customer-item">
            <div class="customer-item-title">
                <h3><Icon type="pricetag"></Icon>医生变更</h3>
            </div>
            <Table :columns="col2" :data="data2"></Table>
        </div>
        <div class="customer-item">
            <div class="customer-item-title">
                <h3><Icon type="pricetag"></Icon>黑名单</h3>
            </div>
            <Table :columns="col3" :data="data3"></Table>
        </div>
        <div class="customer-item">
            <div class="customer-item-title">
                <h3><Icon type="pricetag"></Icon>会员变更</h3>
            </div>
            <Table :columns="col4" :data="data4"></Table>
        </div>
        <div class="customer-item">
            <div class="customer-item-title">
                <h3><Icon type="pricetag"></Icon>增加权益</h3>
            </div>
            <Table :columns="col5" :data="data5"></Table>
        </div>
        <div class="customer-item">
            <div class="customer-item-title">
                <h3><Icon type="pricetag"></Icon>删除权益</h3>
            </div>
            <Table :columns="col6" :data="data6"></Table>
        </div>
        <div class="customer-item">
            <div class="customer-item-title">
                <h3><Icon type="pricetag"></Icon>预收款转账</h3>
            </div>
            <Table :columns="col7" :data="data7"></Table>
        </div>
        <div class="customer-item">
            <div class="customer-item-title">
                <h3><Icon type="pricetag"></Icon>送券</h3>
            </div>
            <Table :columns="col8" :data="data8"></Table>
        </div>
        <div class="customer-item">
            <div class="customer-item-title">
                <h3><Icon type="pricetag"></Icon>扣券</h3>
            </div>
            <Table :columns="col9" :data="data9"></Table>
        </div>
        <div class="customer-item">
            <div class="customer-item-title">
                <h3><Icon type="pricetag"></Icon>赠送积分</h3>
            </div>
            <Table :columns="col10" :data="data10"></Table>
        </div>
        <div class="customer-item">
            <div class="customer-item-title">
                <h3><Icon type="pricetag"></Icon>扣减积分</h3>
            </div>
            <Table :columns="col11" :data="data11"></Table>
        </div>
        <div class="customer-item">
            <div class="customer-item-title">
                <h3><Icon type="pricetag"></Icon>积分兑换券</h3>
            </div>
            <Table :columns="col12" :data="data12"></Table>
        </div>
        <div class="customer-item">
            <div class="customer-item-title">
                <h3><Icon type="pricetag"></Icon>欠费划扣</h3>
            </div>
            <Table :columns="col13" :data="data13"></Table>
        </div>
    </div>
</template>

<script>
    export default {
        data () {
            return {
                data: [],
                data1: [],
                data2: [],
                data3: [],
                data4: [],
                data5: [],
                data6: [],
                data7: [],
                data8: [],
                data9: [],
                data10: [],
                data11: [],
                data12: [],
                data13: [],
                col: [
                    {   
                        title: '序号',
                        type: 'index',
                        width: 60
                    },
                    {
                        title: '提交时间',
                        key: 'name'
                    },
                    {
                        title: '提交医院',
                        key: 'address'
                    },
                    {
                        title: '提交用户',
                        key: 'address'
                    },
                    {
                        title: '原开发人员',
                        key: 'address'
                    },
                    {
                        title: '新开发人员',
                        key: 'address'
                    },
                    {
                        title: '原因',
                        key: 'address'
                    },
                    {
                        title: '审核状态',
                        key: 'address'
                    },
                    {
                        title: '审核情况',
                        key: 'address'
                    }
                ],
                col1: [
                    {   
                        title: '序号',
                        type: 'index',
                        width: 60
                    },
                    {
                        title: '提交时间',
                        key: 'name'
                    },
                    {
                        title: '提交医院',
                        key: 'address'
                    },
                    {
                        title: '提交用户',
                        key: 'address'
                    },
                    {
                        title: '原开发人员',
                        key: 'address'
                    },
                    {
                        title: '新开发人员',
                        key: 'address'
                    },
                    {
                        title: '原因',
                        key: 'address'
                    },
                    {
                        title: '审核状态',
                        key: 'address'
                    },
                    {
                        title: '审核情况',
                        key: 'address'
                    }
                ],
                col2: [
                    {   
                        title: '序号',
                        type: 'index',
                        width: 60
                    },
                    {
                        title: '提交时间',
                        key: 'name'
                    },
                    {
                        title: '提交医院',
                        key: 'address'
                    },
                    {
                        title: '提交用户',
                        key: 'address'
                    },
                    {
                        title: '项目',
                        key: 'address'
                    },
                    {
                        title: '原医生',
                        key: 'address'
                    },
                    {
                        title: '新医生',
                        key: 'address'
                    },
                    {
                        title: '原因',
                        key: 'address'
                    },
                    {
                        title: '审核状态',
                        key: 'address'
                    },
                    {
                        title: '审核情况',
                        key: 'address'
                    }
                ],
                col3: [
                    {   
                        title: '序号',
                        type: 'index',
                        width: 60
                    },
                    {
                        title: '提交时间',
                        key: 'name'
                    },
                    {
                        title: '提交医院',
                        key: 'address'
                    },
                    {
                        title: '提交用户',
                        key: 'address'
                    },
                    {
                        title: '原因',
                        key: 'address'
                    },
                    {
                        title: '审核状态',
                        key: 'address'
                    },
                    {
                        title: '审核情况',
                        key: 'address'
                    }
                ],
                col4: [
                    {   
                        title: '序号',
                        type: 'index',
                        width: 60
                    },
                    {
                        title: '提交时间',
                        key: 'name'
                    },
                    {
                        title: '提交医院',
                        key: 'address'
                    },
                    {
                        title: '提交用户',
                        key: 'address'
                    },
                    {
                        title: '原会员类型',
                        key: 'address'
                    },
                    {
                        title: '新会员类型',
                        key: 'address'
                    },
                    {
                        title: '原因',
                        key: 'address'
                    },
                    {
                        title: '审核状态',
                        key: 'address'
                    },
                    {
                        title: '审核情况',
                        key: 'address'
                    }
                ],
                col5: [
                    {   
                        title: '序号',
                        type: 'index',
                        width: 60
                    },
                    {
                        title: '提交时间',
                        key: 'name'
                    },
                    {
                        title: '提交医院',
                        key: 'address'
                    },
                    {
                        title: '提交用户',
                        key: 'address'
                    },
                    {
                        title: '权益类型',
                        key: 'address'
                    },
                    {
                        title: '备注',
                        key: 'address'
                    },
                    {
                        title: '审核状态',
                        key: 'address'
                    },
                    {
                        title: '审核情况',
                        key: 'address'
                    }
                ],
                col6: [
                    {   
                        title: '序号',
                        type: 'index',
                        width: 60
                    },
                    {
                        title: '提交时间',
                        key: 'name'
                    },
                    {
                        title: '提交医院',
                        key: 'address'
                    },
                    {
                        title: '提交用户',
                        key: 'address'
                    },
                    {
                        title: '权益类型',
                        key: 'address'
                    },
                    {
                        title: '备注',
                        key: 'address'
                    },
                    {
                        title: '审核状态',
                        key: 'address'
                    },
                    {
                        title: '审核情况',
                        key: 'address'
                    }
                ],
                col7: [
                    {   
                        title: '序号',
                        type: 'index',
                        width: 60
                    },
                    {
                        title: '提交时间',
                        key: 'name'
                    },
                    {
                        title: '提交医院',
                        key: 'address'
                    },
                    {
                        title: '提交用户',
                        key: 'address'
                    },
                    {
                        title: '转账客户',
                        key: 'address'
                    },
                    {
                        title: '预收款编号',
                        key: 'address'
                    },
                    {
                        title: '金额',
                        key: 'address'
                    },
                    {
                        title: '备注',
                        key: 'address'
                    },
                    {
                        title: '审核状态',
                        key: 'address'
                    },
                    {
                        title: '审核情况',
                        key: 'address'
                    }
                ],
                col8: [
                    {   
                        title: '序号',
                        type: 'index',
                        width: 60
                    },
                    {
                        title: '提交时间',
                        key: 'name'
                    },
                    {
                        title: '提交医院',
                        key: 'address'
                    },
                    {
                        title: '提交用户',
                        key: 'address'
                    },
                    {
                        title: '券类型',
                        key: 'address'
                    },
                    {
                        title: '金额',
                        key: 'address'
                    },
                    {
                        title: '备注',
                        key: 'address'
                    },
                    {
                        title: '审核状态',
                        key: 'address'
                    },
                    {
                        title: '审核情况',
                        key: 'address'
                    }
                ],
                col9: [
                    {   
                        title: '序号',
                        type: 'index',
                        width: 60
                    },
                    {
                        title: '提交时间',
                        key: 'name'
                    },
                    {
                        title: '提交医院',
                        key: 'address'
                    },
                    {
                        title: '提交用户',
                        key: 'address'
                    },
                    {
                        title: '券编号',
                        key: 'address'
                    },
                    {
                        title: '金额',
                        key: 'address'
                    },
                    {
                        title: '备注',
                        key: 'address'
                    },
                    {
                        title: '审核状态',
                        key: 'address'
                    },
                    {
                        title: '审核情况',
                        key: 'address'
                    }
                ],
                col10: [
                    {   
                        title: '序号',
                        type: 'index',
                        width: 60
                    },
                    {
                        title: '提交时间',
                        key: 'name'
                    },
                    {
                        title: '提交医院',
                        key: 'address'
                    },
                    {
                        title: '提交用户',
                        key: 'address'
                    },
                    {
                        title: '积分数量',
                        key: 'address'
                    },
                    {
                        title: '备注',
                        key: 'address'
                    },
                    {
                        title: '审核状态',
                        key: 'address'
                    },
                    {
                        title: '审核情况',
                        key: 'address'
                    }
                ],
                col11: [
                    {   
                        title: '序号',
                        type: 'index',
                        width: 60
                    },
                    {
                        title: '提交时间',
                        key: 'name'
                    },
                    {
                        title: '提交医院',
                        key: 'address'
                    },
                    {
                        title: '提交用户',
                        key: 'address'
                    },
                    {
                        title: '积分数量',
                        key: 'address'
                    },
                    {
                        title: '备注',
                        key: 'address'
                    },
                    {
                        title: '审核状态',
                        key: 'address'
                    },
                    {
                        title: '审核情况',
                        key: 'address'
                    }
                ],
                col12: [
                    {   
                        title: '序号',
                        type: 'index',
                        width: 60
                    },
                    {
                        title: '提交时间',
                        key: 'name'
                    },
                    {
                        title: '提交医院',
                        key: 'address'
                    },
                    {
                        title: '提交用户',
                        key: 'address'
                    },
                    {
                        title: '积分数量',
                        key: 'address'
                    },
                    {
                        title: '券类型',
                        key: 'address'
                    },
                    {
                        title: '券金额',
                        key: 'address'
                    },
                    {
                        title: '备注',
                        key: 'address'
                    },
                    {
                        title: '审核状态',
                        key: 'address'
                    },
                    {
                        title: '审核情况',
                        key: 'address'
                    }
                ],
                col13: [
                    {   
                        title: '序号',
                        type: 'index',
                        width: 60
                    },
                    {
                        title: '提交时间',
                        key: 'name'
                    },
                    {
                        title: '提交医院',
                        key: 'address'
                    },
                    {
                        title: '提交用户',
                        key: 'address'
                    },
                    {
                        title: '划扣项目',
                        key: 'address'
                    },
                    {
                        title: '划扣数量',
                        key: 'address'
                    },
                    {
                        title: '开始数量',
                        key: 'address'
                    },
                    {
                        title: '备注',
                        key: 'address'
                    },
                    {
                        title: '审核状态',
                        key: 'address'
                    },
                    {
                        title: '审核情况',
                        key: 'address'
                    }
                ],
            }
        },
        methods: {
            
        }
    }
</script>





