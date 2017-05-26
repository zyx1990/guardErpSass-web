/**
 * 库存查询
 */
<template>
	<div class="container-box">
		<div class="container-header">
			<h2>库存查询</h2>
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
		            <Input type="text" placeholder="请输入编号"></Input>
		        </Form-item>
		        <Form-item>
		            <Input type="text" placeholder="请输入名称"></Input>
		        </Form-item>
		        <Form-item>
		            <Input type="text" placeholder="请输入拼音码"></Input>
		        </Form-item>

		        <Form-item>
					<Select placeholder="请选择分类" style="width: 150px" clearable>
		         		<Option :value="1">面部手术</Option>
		         	</Select>
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
                        title: '仓库',
                        key: 'name'
                    },
                    {
                        title: '编号	',
                        key: 'sort'
                    },
                    {
                        title: '名称',
                        key: 'states'
                    },
                    {
                        title: '规格',
                        key: 'sort'
                    },
                    {
                        title: '拼音码',
                        key: 'states'
                    },
                    {
                        title: '类别',
                        key: 'states'
                    },
                    {
                        title: '数量',
                        key: 'action'
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