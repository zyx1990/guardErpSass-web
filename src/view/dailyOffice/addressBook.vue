/**
 * 通讯录
 */
<template>
	<div class="container-box">
		<div class="container-header">
			<h2>通讯录</h2>
		</div>
		<div class="container-body">
			<Form inline>
		        <Form-item>
		        	<Select placeholder="请选择部门" style="width: 100px" clearable>
		         		<Option :value="1">总裁办</Option>
		         	</Select>
		        </Form-item>
		        <Form-item>
		            <Input type="text" placeholder="请输入姓名"></Input>
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
                        title: '部门',
                        key: 'name'
                    },
                    {
                        title: '姓名',
                        key: 'sort'
                    },
                    {
                        title: '性别',
                        key: 'states'
                    },
                    {
                        title: '电话',
                        key: 'description'
                    },
                    {	
                		title: '手机',
                        type: 'index'
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
                ],
                modalEdit: false,
                loading: true,
                formValidate: {
                    name: '',
                    states: '',
                    sort: '',
                    description: ''
                },
                ruleValidate: {
                    name: [
                        { required: true, message: '姓名不能为空', trigger: 'blur' }
                    ],
                    states: [
                        { required: true, message: '请选择状态', trigger: 'change' }
                    ],
                    sort: [
                        { required: true, message: '排序号不能为空', trigger: 'blur' },
                        { type: 'string', message: '排序号格式不正确', trigger: 'blur' }
                    ]
                }
            }
        },
        methods: {
        }
            
    }
</script>
<style lang="scss" scoped>
</style>