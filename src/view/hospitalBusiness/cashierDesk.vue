/**
 * 收银台
 */
<template>
	<div class="container-box">
		<div class="container-header">
			<h2>收银台</h2>
			<ul class="header-btn-group">
		    	<li class="header-item"><Icon type="plus-round"></Icon>结算记录</li>
		    	<li class="header-item"><Icon type="plus-round"></Icon>收银记录</li>
		    	<li class="header-item"><Icon type="plus-round"></Icon>还欠款</li>
		    	<li class="header-item"><Icon type="plus-round"></Icon>结算</li>
			</ul>
		</div>
		<div class="container-body">
			<Tabs>
			 	<Tab-pane label="待收费列表">
		        	<Table stripe :columns="columns" :data="data"></Table>
		        </Tab-pane>
		        <Tab-pane label="今日收银列表">
				    <Table stripe :columns="columns" :data="data"></Table>
		        </Tab-pane>
		        <Tab-pane label="今日发票记录" >
		        	<Table stripe :columns="columns" :data="data"></Table>
		        </Tab-pane>
		        <Tab-pane label="查找客户">
		        	<Table stripe :columns="columns" :data="data"></Table>
		        </Tab-pane>
		    </Tabs>			
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
                        title: '审核状态',
                        key: 'name'
                    },
                    {
                        title: '订单类型',
                        key: 'sort'
                    },
                    {
                        title: '客户',
                        key: 'states'
                    },
                    {
                        title: '金额',
                        key: 'sort'
                    },
                    {
                        title: '提交用户',
                        key: 'states'
                    },
                    {
                        title: '提交时间',
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