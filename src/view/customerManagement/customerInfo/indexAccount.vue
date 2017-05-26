/**
 * 账户情况页面
 */

<template>
    <div class="customer-box">
        <div class="customer-item">
            <div class="customer-item-title">
                <h3><Icon type="pricetag"></Icon>账户情况</h3>
            </div>
            <table class="tableEdit">
                <tr>
                    <td class="tit">余额</td>
                    <td>101492</td>
                    <td class="tit">券额</td>
                    <td>小光</td>
                    <td class="tit">积分</td>
                    <td>小光</td>
                </tr>
            </table>
        </div>
        <div class="customer-item">
            <div class="customer-item-title">
                <h3><Icon type="pricetag"></Icon>预收款</h3>
            </div>
            <Table :columns="col" :data="data"></Table>
        </div>
        <div class="customer-item">
            <div class="customer-item-title">
                <h3><Icon type="pricetag"></Icon>券</h3>
            </div>
            <Table :columns="col1" :data="data1"></Table>
        </div>
        <div class="customer-item">
            <div class="customer-item-title">
                <h3><Icon type="pricetag"></Icon>积分</h3>
            </div>
            <Table :columns="col2" :data="data2"></Table>
        </div>
        <div class="customer-item">
            <div class="customer-item-title">
                <h3><Icon type="pricetag"></Icon>预收款变动</h3>
            </div>
            <Table :columns="col3" :data="data3"></Table>
        </div>
        <div class="customer-item">
            <div class="customer-item-title">
                <h3><Icon type="pricetag"></Icon>券变动</h3>
            </div>
            <Table :columns="col4" :data="data4"></Table>
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
                col: [
                    {   
                        title: '序号',
                        type: 'index',
                        width: 60
                    },
                    {
                        title: '时间',
                        key: 'name'
                    },
                    {
                        title: '类型',
                        key: 'address'
                    },
                    {
                        title: '所属医院',
                        key: 'address'
                    },
                    {
                        title: '获取方式',
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
                        title: '剩余金额',
                        key: 'address'
                    },
                    {
                        title: '操作员',
                        key: 'address'
                    },
                    {
                        title: '备注',
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
                        title: '时间',
                        key: 'name'
                    },
                    {
                        title: '类型',
                        key: 'address'
                    },
                    {
                        title: '所属医院',
                        key: 'address'
                    },
                    {
                        title: '获取方式',
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
                        title: '剩余金额',
                        key: 'address'
                    },
                    {
                        title: '操作员',
                        key: 'address'
                    },
                    {
                        title: '过期时间',
                        key: 'address'
                    },
                    {
                        title: '状态',
                        key: 'address'
                    },
                    {
                        title: '备注',
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
                        title: '时间',
                        key: 'name'
                    },
                    {
                        title: '类型',
                        key: 'address'
                    },
                    {
                        title: '操作医院',
                        key: 'address'
                    },
                    {
                        title: '数量',
                        key: 'address'
                    },
                    {
                        title: '操作员',
                        key: 'address'
                    },
                    {
                        title: '备注',
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
                        title: '时间',
                        key: 'name'
                    },
                    {
                        title: '变动类型',
                        key: 'address'
                    },
                    {
                        title: '预收款类型',
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
                    }
                ],
                col4: [
                    {   
                        title: '序号',
                        type: 'index',
                        width: 60
                    },
                    {
                        title: '时间',
                        key: 'name'
                    },
                    {
                        title: '变动类型',
                        key: 'address'
                    },
                    {
                        title: '券类型',
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
                    }
                ],
            }
        },
        methods: {
            
        }
    }
</script>

<style scoped>
    .customer-item .person-pic img {
        display: block;
        width: 120px;
        height: 120px;
    }
    .customer-item .person-vip img {
        display: block;
        width: 64px;
        height: 64px;
    }
</style>




