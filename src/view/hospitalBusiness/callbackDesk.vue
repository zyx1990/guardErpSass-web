/**
 * 回访工作台
 */
<template>
	<div class="container-box">
		<div class="container-header">
			<h2>回访工作台</h2>
			<ul class="header-btn-group">
		    	<li class="header-item"><Icon type="plus-round"></Icon>批量设置回访</li>
			</ul>
		</div>
		<div class="container-body">
			<Form inline>
		        <Form-item>
		            <Date-picker type="daterange" placeholder="请选择日期" style="width: 200px"></Date-picker>
		        </Form-item>
		        <Form-item>
		            <Select placeholder="请选择回访类型" style="width: 100px" clearable>
		         		<Option :value="1">待审核</Option>
		         		<Option :value="2">审核通过</Option>
		         		<Option :value="3">审核不通过</Option>
		         	</Select>
		        </Form-item>
		        <Form-item>
		            <Select placeholder="请选择回访状态" style="width: 100px" clearable>
		         		<Option :value="1">待审核</Option>
		         		<Option :value="2">审核通过</Option>
		         		<Option :value="3">审核不通过</Option>
		         	</Select>
		        </Form-item>
		        <Form-item>
		            <Input type="text" placeholder="请选择提醒用户"></Input>
		        </Form-item>
		        <Form-item>
		            <Input type="text" placeholder="请输入客户编号"></Input>
		        </Form-item>
		        <Form-item>
		            <Input type="text" placeholder="请输入客户姓名"></Input>
		        </Form-item>
		        <Form-item>
		            <Input type="text" placeholder="请输入提醒内容"></Input>
		        </Form-item>
                <ul class="header-btn-group not-float">
                    <li class="header-item"><Icon type="search"></Icon>查询</li>
                    <li class="header-item"><Icon type="refresh"></Icon>重置</li>
                </ul>
		    </Form>


			<Table stripe :columns="columns" :data="data"></Table>
            <Modal
                title="修改渠道"
                v-model="modalEdit"
                :closable="false"
                @on-ok="ok"
                :loading="loading"
                :mask-closable="false"
                class-name="vertical-center-modal">
                <Form ref="formValidate" :model="formValidate" :rules="ruleValidate" :label-width="100" label-position="right">
                    <Form-item label="名称" prop="name">
                    	<Input v-model="formValidate.name"></Input>
                    </Form-item>
                    <Form-item label="状态" prop="states">
                        <Radio-group v-model="formValidate.states">
                            <Radio label="1">启用</Radio>
                            <Radio label="0">禁用</Radio>
                        </Radio-group>
                    </Form-item>
                    <Form-item label="排序号" prop="sort">
                        <Input v-model="formValidate.sort" placeholder="请输入排序号"></Input>
                    </Form-item>
                    <Form-item label="描述" prop="description">
                        <Input v-model="formValidate.description" type="textarea" :autosize="{minRows: 2,maxRows: 5}"></Input>
                    </Form-item>
                </Form>
            </Modal>
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
                        title: '状态	',
                        key: 'name'
                    },
                    {
                        title: '回访日期',
                        key: 'sort'
                    },
                    {
                        title: '客户',
                        key: 'name'
                    },
                    {
                        title: '回访类型',
                        key: 'sort'
                    },
                    {
                        title: '提醒用户',
                        key: 'states'
                    },
                    {
                        title: '提醒内容',
                        key: 'description'
                    },
                    {
                        title: '方式',
                        key: 'name'
                    },
                    {
                        title: '回访人',
                        key: 'sort'
                    },
                    {
                        title: '回访时间',
                        key: 'states'
                    },
                    {
                        title: '回访内容',
                        key: 'description'
                    },
                    {
                        title: '操作',
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