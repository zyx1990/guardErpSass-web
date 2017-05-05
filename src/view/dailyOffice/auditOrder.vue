/**
 *  审核请求
 */
<template>
	<div class="container-box">
		<div class="container-header">
			<h2>审核请求</h2>
		</div>
		<div class="container-body">
			<Form inline>
				<Form-item>
		            <Select placeholder="请选择审核状态" style="width: 150px" clearable>
		         		<Option :value="1">面部手术</Option>
		         	</Select>
		        </Form-item>
		        <Form-item>
		             <Date-picker type="daterange" placeholder="请选择日期" style="width: 200px"></Date-picker>
		        </Form-item>
		        <Form-item>
		            <Input type="text" placeholder="请输入客户端编号"></Input>
		        </Form-item>
                <ul class="header-btn-group not-float">
                    <li class="header-item"><Icon type="search"></Icon>查询</li>
                    <li class="header-item"><Icon type="refresh"></Icon>重置</li>
                </ul>
		    </Form>


			<Table stripe :columns="columns" :data="data"></Table>

            <div class="table-page">
                <div class="table-info">当前第1页，共1页，总共5条记录</div>
                <Page class="table-paginate"></Page>
            </div>

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
                        title: '客户姓名',
                        key: 'sort'
                    },
                    {
                        title: '提交时间',
                        key: 'states'
                    },
                    {
                        title: '类型',
                        key: 'description'
                    },
                    {	
                		title: '申请原因	',
                        type: 'index'
                    },
                    {
                        title: '审核状态',
                        key: 'name'
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
            edit: function(index) {
                this.formValidate.name = this.data[index].name
                this.formValidate.states = this.data[index].states
                this.formValidate.sort = this.data[index].sort
                this.formValidate.description = this.data[index].description
                this.modalEdit = true
            },
            remove (index) {
                this.$Modal.confirm({
                    title: '系统提示',
                    content: '确定删除'+ this.data[index].name +'?',
                    onOk: () => {
                        this.$Notice.success({
                             title: '系统提示！',
                             desc: '删除成功！'
                        });
                    },
                    onCancel: () => {
                        
                    }
                });
            },
            ok () {
                setTimeout(() => {
                    this.modalEdit = false;
                    this.$Notice.success({
                         title: '系统提示！',
                         desc: '保存成功！'
                    });
                }, 2000);
            }
        }
    }
</script>
<style lang="scss" scoped>
</style>