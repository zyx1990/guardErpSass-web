/**
 * 接诊工作台
 */
<template>
	<div class="container-box">
		<div class="container-header">
			<h2>接诊工作台</h2>
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
                        title: '客户',
                        key: 'name'
                    },
                    {
                        title: '上门时间',
                        key: 'sort'
                    },
                    {
                        title: '会员类型',
                        key: 'states'
                    },
                    {
                        title: '咨询项目',
                        key: 'sort'
                    },
                    {
                        title: '开发人员',
                        key: 'states'
                    },
                    {
                        title: '接诊人员',
                        key: 'states'
                    },
                    {
                        title: '咨询人员',
                        key: 'sort'
                    },
                    {
                        title: '新老客',
                        key: 'states'
                    },
                    {
                        title: '类型',
                        key: 'states'
                    },
                    {
                        title: '操作',
                        key: 'action',
                        width: 150,
                        align: 'center',
                        render (row, column, index) {
                            return `<i-button type="primary" size="small" @click="edit(${index})">
                            			<Icon type="edit"></Icon>编辑
                            		</i-button> 
                            		<i-button type="error" size="small" @click="remove(${index})">
                            			<Icon type="ios-trash-outline"></Icon>删除
                            		</i-button>`;
                        }
                    }
                ],
                data: [
                    {
                        name: '公交广告',
                        sort: 1,
                        states: '1',
                        description: '公交广告'
                    },
                    {
                        name: '成都青羊大道',
                        sort: 1,
                        states: '1',
                        description: '222'
                    },
                    {
                        name: '北京网络渠道',
                        sort: 1,
                        states: '1',
                        description: '333'
                    },
                    {
                        name: '美容美发',
                        sort: 1,
                        states: '0',
                        description: '654654'
                    },
                    {
                        name: '北京网络渠道',
                        sort: 1,
                        states: '1',
                        description: '6666'
                    }
                ]
            }
        },
        methods: {

        }
    }
</script>