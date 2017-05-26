/**
 * 盘点记录
 */


<template>
	<div class="container-box">
		<div class="container-header">
			<h2>盘点记录</h2>
			<ul class="header-btn-group">
		    	<li class="header-item"><Icon type="plus-round"></Icon>增加</li>
			</ul>
		</div>
		<div class="container-body">
			<Form inline>
				<Form-item>
					<Select placeholder="请选择仓库" style="width: 150px" clearable>
		         		<Option :value="1">面部手术</Option>
		         	</Select>
		        </Form-item>
		        <Form-item>
		             <Date-picker type="daterange" placeholder="请选择日期" style="width: 200px"></Date-picker>
		        </Form-item>
		        <Form-item>
		            <Input type="text" placeholder="请输入盘点单号"></Input>
		        </Form-item>
                <ul class="header-btn-group not-float">
                    <li class="header-item"><Icon type="search"></Icon>查询</li>
                    <li class="header-item"><Icon type="refresh"></Icon>重置</li>
                </ul>
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
                        title: '盘点单号',
                        key: 'name'
                    },
                    {
                        title: '盘点日期',
                        key: 'sort'
                    },
                    {
                        title: '仓库',
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