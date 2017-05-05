/**
 * 客户管理
 */

<template>
    <div class="container-box" ref="containerBox">
        <div class="container-header">
            <h2>客户列表</h2>
        </div>
        <div class="container-body">
            <Form  :label-width="80" inline>
                <Form-item label="编号">
                    <Input type="text" placeholder="请输入编号"></Input>
                </Form-item>
                <Form-item label="姓名">
                    <Input type="text" placeholder="请输入姓名"></Input>
                </Form-item>
                <Form-item label="手机/电话">
                    <Input type="text" placeholder="请输入手机/电话"></Input>
                </Form-item>
                <Form-item label="档案号">
                    <Input type="text" placeholder="请输入档案号"></Input>
                </Form-item>
                <Form-item label="性别">
                    <Select v-model="sexBox" clearable style="width:162px">
                        <Option v-for="item in sexList" :value="item.value" :key="item">{{ item.label }}</Option>
                    </Select>
                </Form-item>
                <Form-item label="上门状态">
                    <Select v-model="doorBox" clearable style="width:162px">
                        <Option v-for="item in doorList" :value="item.value" :key="item">{{ item.label }}</Option>
                    </Select>
                </Form-item>
                <Form-item label="成交状态">
                    <Select v-model="transactionBox" clearable style="width:162px">
                        <Option v-for="item in transactionList" :value="item.value" :key="item">{{ item.label }}</Option>
                    </Select>
                </Form-item>
                <Form-item label="微信状态">
                    <Select v-model="weixinBox" clearable style="width:162px">
                        <Option v-for="item in weixinList" :value="item.value" :key="item">{{ item.label }}</Option>
                    </Select>
                </Form-item>
                <Form-item label="渠道">
                    <Select v-model="channelBox" clearable style="width:162px">
                        <Option v-for="item in channelList" :value="item.value" :key="item" :disabled="item.choose">{{ item.label }}</Option>
                    </Select>
                </Form-item>
                <Form-item label="主咨询项目">
                    <Select v-model="mainProjectBox" clearable style="width:162px">
                        <Option v-for="item in mainProjectList" :value="item.value" :key="item" :disabled="item.choose">{{ item.label }}</Option>
                    </Select>
                </Form-item>
                <Form-item label="咨询项目">
                    <Select v-model="projectBox" clearable style="width:162px">
                        <Option v-for="item in projectList" :value="item.value" :key="item" :disabled="item.choose">{{ item.label }}</Option>
                    </Select>
                </Form-item>
                <Form-item label="会员类型">
                    <Select v-model="menberBox" clearable style="width:162px">
                        <Option v-for="item in menberList" :value="item.value" :key="item">{{ item.label }}</Option>
                    </Select>
                </Form-item>
                <Form-item label="客户组">
                    <Select v-model="custGroupBox" clearable style="width:162px">
                        <Option v-for="item in custGroupList" :value="item.value" :key="item">{{ item.label }}</Option>
                    </Select>
                </Form-item>
                <Form-item label="结果集">
                    <Select v-model="resultBox" clearable style="width:162px">
                        <Option v-for="item in resultList" :value="item.value" :key="item">{{ item.label }}</Option>
                    </Select>
                </Form-item>
                <Form-item label="到诊医院">
                    <Select v-model="hosBox" clearable style="width:162px">
                        <Option v-for="item in hosList" :value="item.value" :key="item">{{ item.label }}</Option>
                    </Select>
                </Form-item>
                <Form-item label="预约医院">
                    <Select v-model="orderHosBox" clearable style="width:162px">
                        <Option v-for="item in orderHosList" :value="item.value" :key="item">{{ item.label }}</Option>
                    </Select>
                </Form-item>
                <Form-item label="开发人员">
                    <Input type="text"></Input>
                </Form-item>
                <Form-item label="咨询人员">
                    <Input type="text"></Input>
                </Form-item>
                <Form-item label="净收总额">
                    <Input type="text"></Input>
                </Form-item>
                <Form-item label="标签">
                    <Input type="text"></Input>
                </Form-item>
                <Form-item label="推荐店家">
                    <Input type="text"></Input>
                </Form-item>
                <Form-item label="自定义字段">
                    <Input type="text"></Input>
                </Form-item>
                <Form-item label="初诊日期">
                    <Date-picker type="daterange" placement="bottom-start" placeholder="选择日期" style="width: 162px" :options='options'></Date-picker>
                </Form-item>
                <Form-item label="最后光临">
                    <Date-picker type="daterange" placement="bottom-start" placeholder="选择日期" style="width: 162px" :options='options'></Date-picker>
                </Form-item>
                <Form-item label="登记日期">
                    <Date-picker type="daterange" placement="bottom-start" placeholder="选择日期" style="width: 162px" :options='options'></Date-picker>
                </Form-item>
                <Form-item label="最后咨询">
                    <Date-picker type="daterange" placement="bottom-start" placeholder="选择日期" style="width: 162px" :options='options'></Date-picker>
                </Form-item>
                <Form-item label="预约日期">
                    <Date-picker type="daterange" placement="bottom-start" placeholder="选择日期" style="width: 162px" :options='options'></Date-picker>
                </Form-item>
                <ul class="header-btn-group not-float">
                    <li class="header-item"><Icon type="search"></Icon>查询</li>
                    <li class="header-item"><Icon type="refresh"></Icon>重置</li>
                </ul>
            </Form>
            <Table stripe :columns="columns" :data="data"></Table>
            <div style="margin: 10px;overflow: hidden">
                <div style="float: right;">
                    <Page :total="100" :current="1" show-total></Page>
                </div>
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
                        title: '客户编号',
                        key: 'cusNumber'
                    },
                    {
                        title: '姓名',
                        key: 'name',
                        render (row) {
                            return `<Icon type="person"></Icon>${row.name}`
                        }
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
                        title: '年龄',
                        key: 'age'
                    },
                    {
                        title: '会员',
                        key: 'menber'
                    },
                    {
                        title: '渠道',
                        key: 'channel'
                    },
                    {
                        title: '咨询项目',
                        key: 'project'
                    },
                    {
                        title: '开发人员',
                        key: 'developer'
                    },
                    {
                        title: '咨询人员',
                        key: 'consultant'
                    },
                    {
                        title: '上门状态',
                        key: 'doorStatus',
                        render (row) {
                            const color = row.doorStatus == 1 ? 'blue' : 'red';
                            const text = row.doorStatus == 1 ? '已上门' : '未上门';
                            return `<span style='color:${color};'>${text}</span>`;
                        }
                    },
                    {
                        title: '成交状态',
                        key: 'transactionStatus',
                        render (row) {
                            const color = row.transactionStatus == 1 ? 'blue' : 'red';
                            const text = row.transactionStatus == 1 ? '已成交' : '未成交';
                            return `<span style='color:${color};'>${text}</span>`;
                        }
                    },
                    {
                        title: '初诊日期',
                        key: 'firstDate'
                    },
                    {
                        title: '初诊医院',
                        key: 'hospital'
                    },
                    {
                        title: '最后光临',
                        key: 'lastDate'
                    },
                    {
                        title: '预约到诊日期',
                        key: 'orderDate'
                    },
                    {
                        title: '预约医院',
                        key: 'orderHosp'
                    },
                    {
                        title: '登记时间',
                        key: 'registerDate'
                    },
                    {
                        title: '登记医院',
                        key: 'registerHosp'
                    },
                    {
                        title: '登记人员',
                        key: 'registerPeo'
                    },
                    {
                        title: '推荐店家',
                        key: 'shop'
                    }
                ],
                data: [
                    {
                        cusNumber: '101391',
                        name: '玻尿酸',
                        sex: '0',
                        age: 100,
                        menber: '超级会员',
                        channel: '广告',
                        project: '鼻部整形',
                        developer: '李航',
                        consultant: '周旭',
                        doorStatus: '1',
                        transactionStatus: '1',
                        firstDate: '2017-05-05',
                        hospital: '锦医卫北京机构',
                        lastDate: '2017-05-05',
                        orderDate: '',
                        orderHosp: '锦医卫北京机构',
                        registerDate: '2017-05-05 13:32:05',
                        registerHosp: '锦医卫北京机构',
                        registerPeo: '赵国浩',
                        shop: '沈阳美容院'
                    },
                    {
                        cusNumber: '101391',
                        name: '玻尿酸',
                        sex: '0',
                        age: 100,
                        menber: '超级会员',
                        channel: '广告',
                        project: '鼻部整形',
                        developer: '李航',
                        consultant: '周旭',
                        doorStatus: '1',
                        transactionStatus: '0',
                        firstDate: '2017-05-05',
                        hospital: '锦医卫北京机构',
                        lastDate: '2017-05-05',
                        orderDate: '',
                        orderHosp: '锦医卫北京机构',
                        registerDate: '2017-05-05 13:32:05',
                        registerHosp: '锦医卫北京机构',
                        registerPeo: '赵国浩',
                        shop: '沈阳美容院'
                    },
                    {
                        cusNumber: '101391',
                        name: '玻尿酸',
                        sex: '0',
                        age: 100,
                        menber: '超级会员',
                        channel: '广告',
                        project: '鼻部整形',
                        developer: '李航',
                        consultant: '周旭',
                        doorStatus: '1',
                        transactionStatus: '0',
                        firstDate: '2017-05-05',
                        hospital: '锦医卫北京机构',
                        lastDate: '2017-05-05',
                        orderDate: '',
                        orderHosp: '锦医卫北京机构',
                        registerDate: '2017-05-05 13:32:05',
                        registerHosp: '锦医卫北京机构',
                        registerPeo: '赵国浩',
                        shop: '沈阳美容院'
                    },
                    {
                        cusNumber: '101391',
                        name: '玻尿酸',
                        sex: '0',
                        age: 100,
                        menber: '超级会员',
                        channel: '广告',
                        project: '鼻部整形',
                        developer: '李航',
                        consultant: '周旭',
                        doorStatus: '0',
                        transactionStatus: '0',
                        firstDate: '2017-05-05',
                        hospital: '锦医卫北京机构',
                        lastDate: '2017-05-05',
                        orderDate: '',
                        orderHosp: '锦医卫北京机构',
                        registerDate: '2017-05-05 13:32:05',
                        registerHosp: '锦医卫北京机构',
                        registerPeo: '赵国浩',
                        shop: '沈阳美容院'
                    },
                    {
                        cusNumber: '101391',
                        name: '玻尿酸',
                        sex: '0',
                        age: 100,
                        menber: '超级会员',
                        channel: '广告',
                        project: '鼻部整形',
                        developer: '李航',
                        consultant: '周旭',
                        doorStatus: '0',
                        transactionStatus: '1',
                        firstDate: '2017-05-05',
                        hospital: '锦医卫北京机构',
                        lastDate: '2017-05-05',
                        orderDate: '',
                        orderHosp: '锦医卫北京机构',
                        registerDate: '2017-05-05 13:32:05',
                        registerHosp: '锦医卫北京机构',
                        registerPeo: '赵国浩',
                        shop: '沈阳美容院'
                    }
                ],
                sexBox: '',
                sexList: [
                    {
                        value: '1',
                        label: '男'
                    },
                    {
                        value: '0',
                        label: '女'
                    }
                ],
                doorBox: '',
                doorList: [
                    {
                        value: '1',
                        label: '已上门'
                    },
                    {
                        value: '0',
                        label: '未上门'
                    }
                ],
                transactionBox: '',
                transactionList: [
                    {
                        value: '1',
                        label: '已成交'
                    },
                    {
                        value: '0',
                        label: '未成交'
                    }
                ],
                weixinBox: '',
                weixinList: [
                    {
                        value: '1',
                        label: '已绑定'
                    },
                    {
                        value: '0',
                        label: '未绑定'
                    }
                ],
                channelBox: '',
                channelList: [
                    {
                        value: '2',
                        label: 'sss',
                        choose: false
                    },
                    {
                        value: '3',
                        label: 'ssss',
                        choose: true
                    }
                ],
                mainProjectBox: '',
                mainProjectList: [
                    {
                        value: '2',
                        label: 'sss',
                        choose: false
                    },
                    {
                        value: '3',
                        label: 'ssss',
                        choose: true
                    }
                ],
                projectBox: '',
                projectList: [
                    {
                        value: '2',
                        label: 'sss',
                        choose: false
                    },
                    {
                        value: '3',
                        label: 'ssss',
                        choose: true
                    }
                ],
                menberBox: '',
                menberList: [
                    {
                        value: '2',
                        label: 'sss'
                    },
                    {
                        value: '3',
                        label: 'ssss'
                    }
                ],
                custGroupBox: '',
                custGroupList: [
                    {
                        value: '2',
                        label: 'sss'
                    },
                    {
                        value: '3',
                        label: 'ssss'
                    }
                ],
                resultBox: '',
                resultList: [
                    {
                        value: '2',
                        label: 'sss'
                    },
                    {
                        value: '3',
                        label: 'ssss'
                    }
                ],
                hosBox: '',
                hosList: [
                    {
                        value: '2',
                        label: 'sss'
                    },
                    {
                        value: '3',
                        label: 'ssss'
                    }
                ],
                orderHosBox: '',
                orderHosList: [
                    {
                        value: '2',
                        label: 'sss'
                    },
                    {
                        value: '3',
                        label: 'ssss'
                    }
                ],
                options: {
                    disabledDate (date) {
                        return date && date.valueOf() > Date.now();
                    }
                },
            }
        },
        methods: {
            
        }
    }
</script>



