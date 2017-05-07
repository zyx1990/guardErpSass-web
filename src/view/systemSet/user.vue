/**
 * 用户管理
 */

<template>
    <div class="container-box" ref="containerBox">
        <div class="container-header">
            <h2>用户管理</h2>
            <ul class="header-btn-group">
                <li class="header-item"><Icon type="gear-b"></Icon>批量设置角色</li>
                <li class="header-item"><Icon type="plus-round"></Icon>增加</li>
            </ul>
        </div>
        <div class="container-body">
            <Form  :label-width="60" inline>
                <Form-item label="账号">
                    <Input type="text" placeholder="请输入账号"></Input>
                </Form-item>
                <Form-item label="姓名">
                    <Input type="text" placeholder="请输入姓名"></Input>
                </Form-item>
                <Form-item label="所属医院">
                    <Select v-model="hospBox" clearable style="width:162px">
                        <Option v-for="item in hospList" :value="item.value" :key="item">{{ item.label }}</Option>
                    </Select>
                </Form-item>
                <Form-item label="角色">
                    <Select v-model="roleBox" clearable style="width:162px">
                        <Option v-for="item in roleList" :value="item.value" :key="item">{{ item.label }}</Option>
                    </Select>
                </Form-item>
                <Form-item label="状态">
                    <Select v-model="statusBox" clearable style="width:162px">
                        <Option v-for="item in statusList" :value="item.value" :key="item">{{ item.label }}</Option>
                    </Select>
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
                        title: '医院',
                        key: 'hospital'
                    },
                    {
                        title: '编号',
                        key: 'number'
                    },
                    {
                        title: '账号',
                        key: 'accountNum'
                    },
                    {
                        title: '姓名',
                        key: 'name'
                    },
                    {
                        title: '性别',
                        key: 'sex',
                        render (row) {
                            const text = row.sex == 1 ? '男' : '女';
                            return `<span>${text}</span>`;
                        }
                    },
                    {
                        title: '部门',
                        key: 'branch'
                    },
                    {
                        title: '状态',
                        key: 'states',
                        render (row) {
                            const color = row.states == 1 ? 'blue' : 'red';
                            const text = row.states == 1 ? '启用' : '禁用';
                            return `<span style='color:${color};'>${text}</span>`;
                        }
                    },
                    {
                        title: '角色',
                        key: 'role'
                    },
                    {
                        title: '电话',
                        key: 'telephone'
                    },
                    {
                        title: '手机',
                        key: 'phone'
                    },
                    {
                        title: '操作',
                        key: 'action',
                        width: 350,
                        align: 'center',
                        render (row, column, index) {
                            return `<i-button type="primary" size="small" @click="edit(${index})"><Icon type="edit"></Icon>编辑</i-button>
                                    <i-button type="error" size="small" @click="remove(${index})"><Icon type="ios-trash-outline"></Icon>删除</i-button>
                                    <i-button type="info" size="small" @click="set(${index})"><Icon type="gear-b"></Icon>配置</i-button>
                                    <i-button type="warning" size="small" @click="cusStamp(${index})"><Icon type="wrench"></Icon>客户权限</i-button>
                                    <i-button type="warning" size="small" @click="backStamp(${index})"><Icon type="person"></Icon>回访权限</i-button>`;
                        }
                    }
                ],
                data: [
                    {
                        hospital: '锦医卫集团总部',
                        number: '123',
                        accountNum: '124142',
                        name: '玻尿酸',
                        sex: '1',
                        branch: 'sdfs',
                        states: '0',
                        role: '222',
                        telephone: '2121',
                        phone: '21111'
                    },
                    {
                        hospital: '锦医卫集团总部',
                        number: '123',
                        accountNum: '124142',
                        name: '玻尿酸',
                        sex: '0',
                        branch: 'sdfs',
                        states: '1',
                        role: '222',
                        telephone: '2121',
                        phone: '21111'
                    }
                ],
                statusBox: '',
                statusList: [
                    {
                        value: '1',
                        label: '已处理'
                    },
                    {
                        value: '0',
                        label: '未处理'
                    }
                ],
                roleBox: '',
                roleList: [
                    {
                        value: '1',
                        label: '已处理'
                    },
                    {
                        value: '0',
                        label: '未处理'
                    }
                ],
                hospBox: '',
                hospList: [
                    {
                        value: '1',
                        label: '已处理'
                    },
                    {
                        value: '0',
                        label: '未处理'
                    }
                ]
            }
        },
        methods: {
            edit: function(index) {

            },
            remove: function(index) {

            },
            set: function(index) {

            },
            cusStamp: function(index) {

            },
            backStamp: function(index) {

            }
        }
    }
</script>