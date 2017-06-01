/**
 * 生日提醒
 */

<template>
    <div class="container-box" ref="containerBox">
        <div class="container-header">
            <h2>生日提醒</h2>
            <ul class="header-btn-group">
                <li class="header-item"><Icon type="gear-b"></Icon>今天</li>
                <li class="header-item"><Icon type="gear-b"></Icon>本周</li>
                <li class="header-item"><Icon type="gear-b"></Icon>本月</li>
            </ul>
        </div>
        <div class="container-body">
            <Form  :label-width="80" inline>
                <Form-item label="选择日期">
                    <Date-picker type="daterange" placement="bottom-start" placeholder="选择日期" style="width: 200px" :options='options'></Date-picker>
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
                        title: '客户编号',
                        key: 'cusNumber'
                    },
                    {
                        title: '客户姓名',
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
                        title: '生日',
                        key: 'birth'
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
                        title: '最后光临',
                        key: 'lastDate'
                    },
                    {
                        title: '会员类型',
                        key: 'menber'
                    },
                    {
                        title: '开发人员',
                        key: 'develop'
                    },
                    {
                        title: '咨询人员',
                        key: 'consult'
                    },
                    {
                        title: '电话',
                        key: 'phone'
                    }
                ],
                data: [
                    {
                        cusNumber: "1111",
                        name: '玻尿酸',
                        sex: '1',
                        age: '555',
                        birth: '05-02',
                        doorStatus: '1',
                        transactionStatus: '0',
                        firstDate: '2017-04-10',
                        lastDate: '2017-04-10',
                        menber: "金卡",
                        develop: '22',
                        consult: '33',
                        phone: '13988888888'
                    },
                    {
                        cusNumber: "1111",
                        name: '玻尿酸',
                        sex: '0',
                        age: '555',
                        birth: '05-02',
                        doorStatus: '0',
                        transactionStatus: '1',
                        firstDate: '2017-04-10',
                        lastDate: '2017-04-10',
                        menber: "金卡",
                        develop: '22',
                        consult: '33',
                        phone: '13988888888'
                    }
                ],
                options: {
                    disabledDate (date) {
                        return date && date.valueOf() > Date.now();
                    }
                }
            }
        },
        created () {
            this.$http.get({
                url: 'guard-webManager/birthday/list.jhtml',
                data: {
                    
                },
                success: function(res){
                    console.log(res);
                }
            });
        },
        methods: {
            edit: function(index) {
                
            }
        }
    }
</script>