/**
 * 审核工作台
 */
<template>
	<div class="container-box">
		<div class="container-header">
			<h2>订单审核</h2>
			<ul class="header-btn-group">
		    	<li class="header-item"><Icon type="plus-round"></Icon>审核记录</li>
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
                        title: '审核类型',
                        key: 'name'
                    },
                    {
                        title: '提交医院	',
                        key: 'sort'
                    },
                    {
                        title: '提交用户',
                        key: 'states'
                    },
                    {
                        title: '提交时间	',
                        key: 'sort'
                    },
                    {
                        title: '备注',
                        key: 'states'
                    },
                    {
                        title: '操作',
                        key: 'action',
                        width: 150,
                        align: 'center',
                        render (row, column, index) {
                            return `<i-button type="primary" size="small" @click="edit(${index})"><Icon type="edit"></Icon>编辑</i-button> <i-button type="error" size="small" @click="remove(${index})"><Icon type="ios-trash-outline"></Icon>删除</i-button>`;
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
<style lang="scss" scoped>
</style>