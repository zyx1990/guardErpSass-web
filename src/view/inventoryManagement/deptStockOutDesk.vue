/**
 * 科室发料中心
 */
<template>

	<div class="container-box">
		<div class="container-header">
			<h2>库存有效期预警</h2>
		</div>
		<div class="container-body">
		    <Tabs >
		        <Tab-pane label="发货请求">
		        	<Table stripe :columns="shiRequestColumns" :data="shiRequestData"></Table>
		        </Tab-pane>
		        <Tab-pane label="今日发货记录">
		        	<Table stripe :columns="recordTodayColumns" :data="recordTodayData"></Table>
		        </Tab-pane>
		    </Tabs>

			
		</div>
	</div>
</template>

<script>
    export default {
        data () {
            return {
                shiRequestColumns: [
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
                        title: '划扣项目',
                        key: 'sort'
                    },
                    {
                        title: '划扣时间',
                        key: 'states'
                    },
                    {
                        title: '发货仓库',
                        key: 'sort'
                    },
                    {
                        title: '编号',
                        key: 'states'
                    },
                    {
                        title: '名称',
                        key: 'states'
                    },
                    {
                        title: '规格',
                        key: 'action'
                    },
                    {
                        title: '单位',
                        key: 'states'
                    },
                    {
                        title: '数量',
                        key: 'states'
                    },
                    {
                        title: '发货',
                        key: 'action'
                    }
                ],
                shiRequestData: [
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
                ],
                recordTodayColumns: [
                	{	
                		title: '序号',
                        type: 'index',
                        width: 60
                    },
                    {
                        title: '操作时间',
                        key: 'name'
                    },
                    {
                        title: '客户',
                        key: 'sort'
                    },
                    {
                        title: '仓库',
                        key: 'states'
                    },
                    {
                        title: '编号',
                        key: 'sort'
                    },
                    {
                        title: '名称',
                        key: 'states'
                    },
                    {
                        title: '名称',
                        key: 'states'
                    },
                    {
                        title: '规格',
                        key: 'action'
                    },
                    {
                        title: '数量',
                        key: 'states'
                    },
                    {
                        title: '操作人员',
                        key: 'states'
                    },
                    {
                        title: '操作',
                        key: 'action'
                    }
                ],
                recordTodayData: [
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