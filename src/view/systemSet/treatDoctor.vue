/**
 * 医生治疗预约设置
 */

<template>
    <div class="container-box treatDoctor">
        <div class="container-header">
            <h2>医生治疗预约设置</h2>
            <ul class="header-btn-group">
                <li class="header-item"><Icon type="plus-round"></Icon>批量增加</li>
                <li class="header-item"><Icon type="plus-round"></Icon>增加</li>
            </ul>
        </div>
        <div class="container-body">
            <table class="treatDoctorTable">
                <thead>
                    <tr>
                        <th class="indexCol">序号</th>
                        <th>医生</th>
                        <th>时间段</th>
                        <th>人数限制</th>
                        <th class="childAct">操作</th>
                        <th class="parentAct">操作</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for='(item, index) in items'>
                        <td class="indexCol" :rowspan="item.idspan" :class="{hidden: item.iddis}">{{item.idret}}</td>
                        <td :rowspan="item.idspan" :class="{hidden: item.iddis}">{{item.name}}</td>
                        <td>{{item.time}}</td>
                        <td>{{item.people}}</td>
                        <td class="childAct">
                            <i-button type="primary" size="small" @click='edit(item, index)'>
                                <Icon type="edit"></Icon>编辑
                            </i-button> 
                            <i-button type="error" size="small">
                                <Icon type="ios-trash-outline"></Icon>删除
                            </i-button>
                        </td>
                        <td class="parentAct" :rowspan="item.idspan" :class="{hidden: item.iddis}">
                            <i-button type="error" size="small">
                                <Icon type="ios-trash-outline"></Icon>删除
                            </i-button>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
</template>

<script>
    export default {
        data () {
            return {
               items: []
            }
        },
        mounted () {
            this.items = [
                    {
                        name: '1',
                        time: '1',
                        people: '1',
                        id: '111'
                    },
                    {
                        name: '1',
                        time: '1',
                        people: '1',
                        id: '111'
                    },
                    {
                        name: '2',
                        time: '2',
                        people: '2',
                        id: '222'
                    },
                    {
                        name: '212',
                        time: '2123',
                        people: '21231',
                        id: '222'
                    },
                    {
                        name: '211231231232',
                        time: '2123',
                        people: '21231',
                        id: '222'
                    },
                    {
                        name: '2567',
                        time: '56752',
                        people: '5762',
                        id: '222'
                    },
                    {
                        name: '3',
                        time: '3',
                        people: '3',
                        id: '333'
                    },
                    {
                        name: '312312',
                        time: '3123',
                        people: '12313',
                        id: '333'
                    },
                    {
                        name: '312312',
                        time: '3123',
                        people: '12313',
                        id: '444'
                    }
                ]
            this.items = this.combineCell('id', this.items)
        },
        methods: {
            edit (data, index) {
                console.log(data.id)
                console.log(index)
            },
            combineCell (key, list) {
                var k = 0;
                var resetIndex = 1;
                while (k < list.length) {
                    list[k][key + 'span'] = 1;
                    list[k][key + 'dis'] = false;
                    list[k][key + 'ret'] = resetIndex;
                    for (var i = k + 1; i <= list.length - 1; i++) {
                        if(list[k][key] == list[i][key]) {
                            list[k][key + 'span']++;
                            list[k][key + 'dis'] = false;
                            list[i][key + 'span'] = 1;
                            list[i][key + 'dis'] = true;
                        } else {
                            resetIndex++;
                            break;
                        }
                    }
                    k = i;
                }
                console.log(list[0])
                return list;
            }
        }
    }
</script>

<style>
    .treatDoctor .treatDoctorTable {
        width: 100%;
        border-collapse:collapse;
        border-bottom: 1px solid #d7dde4;
        border-right: 1px solid #d7dde4;
    }
</style>

<style scoped>
    .treatDoctor .treatDoctorTable tr {
        border-top: 1px solid #d7dde4;
        border-left: 1px solid #d7dde4;
    }
    .treatDoctorTable td, 
    .treatDoctorTable th {
        height: 60px;
        padding: 0 18px;
        text-align: left;
    }
    .treatDoctor .treatDoctorTable tbody tr:nth-of-type(odd) {
        /*background: rgba(73,133,243,0.05);*/
    }
    .treatDoctorTable .indexCol {
        width: 80px;
    }
    .treatDoctorTable .childAct {
        width: 150px;
        text-align: center;
    }
    .treatDoctorTable .parentAct {
        width: 100px;
        text-align: center;
    }
    .hidden {
        display: none;
    }
</style>