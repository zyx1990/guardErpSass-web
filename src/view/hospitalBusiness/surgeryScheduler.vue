/**
 * 手术排班
 */
<template>
	<div class="container-box">
		<div class="container-header">
			<h2>手术排班</h2>
		</div>
		<div class="container-body">
			<Form inline>
		        <Form-item>
		             <Date-picker type="date" placeholder="请选择日期" style="width: 200px"></Date-picker>
		        </Form-item>
		    </Form>
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
                        title: '调拨单号',
                        key: 'name'
                    },
                    {
                        title: '调拨日期',
                        key: 'sort'
                    },
                    {
                        title: '调出仓库',
                        key: 'states'
                    },
                    {
                        title: '调入仓库',
                        key: 'sort'
                    },
                    {
                        title: '操作用户',
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
                            return `<i-button type="primary" size="small" @click="edit(${index})"><Icon type="edit"></Icon>查看</i-button> `;
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