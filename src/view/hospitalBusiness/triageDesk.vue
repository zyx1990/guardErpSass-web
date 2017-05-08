/**
 * 分诊工作台
 */
<template>
	<div class="container-box">
		<div class="container-header">
			<h2>分诊工作台</h2>
		</div>
		<div class="container-body">
			<Tabs>
			 	<Tab-pane label="候诊列表">
		        	<Table stripe :columns="columns" :data="data"></Table>
		        </Tab-pane>
		        <Tab-pane label="客户识别">
				    <Form inline>
				        <Form-item>
				            <Input type="text" placeholder="请输入客户编号/手机号/电话号码/预约号/姓名"></Input>
				        </Form-item>
		                <ul class="header-btn-group not-float">
		                    <li class="header-item"><Icon type="search"></Icon>查询</li>
		                    <li class="header-item"><Icon type="refresh"></Icon>重置</li>
		                </ul>
				    </Form>
		        </Tab-pane>
		        <Tab-pane label="接诊人员列表" >
		        	<Table stripe :columns="columns" :data="data"></Table>
		        </Tab-pane>
		        <Tab-pane label="今日预约上门列表">
		        	<Table stripe :columns="columns" :data="data"></Table>
		        </Tab-pane>
		        <Tab-pane label="今日上门记录">
		        	<Table stripe :columns="columns" :data="data"></Table>
		        </Tab-pane>
		        <Tab-pane label="今日上分诊记录">
		        	<Table stripe :columns="columns" :data="data"></Table>
		        </Tab-pane>
		        <Tab-pane label="今日前台登记客户">
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
                        title: '店家',
                        key: 'name'
                    },
                    {
                        title: '回款日期',
                        key: 'sort'
                    },
                    {
                        title: '金额',
                        key: 'states'
                    },
                    {
                        title: '提交用户',
                        key: 'sort'
                    },
                    {
                        title: '提交时间',
                        key: 'states'
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