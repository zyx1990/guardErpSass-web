/**
 * 全院排班表
 */
<template>
	<div class="container-box">
		<div class="container-header">
			<h2>全院排班表 </h2>
			<ul class="header-btn-group">
		    	<li class="float-left">
		         	<Select placeholder="请选择状态" style="width: 150px" clearable>
		         		<Option :value="1">锦衣卫集团总部</Option>
		         		<Option :value="2">锦衣卫北京机构</Option>
		         		<Option :value="3">锦衣卫上海机构</Option>
		         		<Option :value="2">锦衣卫广州机构</Option>
		         		<Option :value="3">锦衣卫深圳机构</Option>
		         	</Select>
		    	</li>
		    	<li class="header-item" ><Icon type="arrow-up-a"></Icon>上一周</li>
		    	<li class="header-item" ><Icon type="navicon-round"></Icon></Icon>本周</li>
		    	<li class="header-item" ><Icon type="arrow-down-a"></Icon></Icon>下一周</li>
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
                		title: '部门',
                        type: 'index',
                        width: 60
                    },
                    {
                        title: '用户	',
                        key: 'name'
                    },
                    {
                        title: '2017-05-01 (星期一)',
                        key: 'sort'
                    },
                    {
                        title: '2017-05-01 (星期二)',
                        key: 'sort'
                    },
                    {
                        title: '2017-05-01 (星期三)',
                        key: 'sort'
                    },
                    {
                        title: '2017-05-01 (星期四)',
                        key: 'sort'
                    },
                    {
                        title: '2017-05-01 (星期五)',
                        key: 'sort'
                    },
                    {
                        title: '2017-05-01 (星期六)',
                        key: 'sort'
                    },
                    {
                        title: '2017-05-01 (星期天)',
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
                        { type: 'number', message: '排序号格式不正确', trigger: 'blur' }
                    ]
                }
            }
        },
        methods: {
        }
    }
</script>