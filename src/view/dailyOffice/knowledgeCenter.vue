/**
 * 知识库中心
 */
<template>
	<div class="container-box">
		<div class="container-header">
			<h2>知识库</h2>
		</div>
		<div class="container-body">
			<Form inline>
		        <Form-item>
		           <Select placeholder="请选择知识分类" style="width: 150px" clearable>
		         		<Option :value="1">面部手术</Option>
		         	</Select>
		        </Form-item>

		        <Form-item>
		            <Input type="text" placeholder="请输入标题"></Input>
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
                        title: '标题',
                        key: 'name'
                    },
                    {
                        title: '知识分类',
                        key: 'sort'
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