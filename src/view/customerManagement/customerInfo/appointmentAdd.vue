/**
 * 添加咨询预约页面
 */

<template>
    <div class="container-box userPower">
        <div class="container-header">
            <h2>添加咨询预约</h2>
        </div>
        <div class="container-body">
            <Form ref="formValidate" :model="formValidate" :label-width="100" label-position="right">
                <Form-item label="选择医院" prop="hospital" required>
                    <Select v-model="formValidate.hospital" style="width:300px">
                        <Option v-for="item in hospList" :value="item.id" :key="item">{{ item.value }}</Option>
                    </Select>
                </Form-item>
                <Form-item label="预约日期" required prop="date">
                    <Date-picker type="date" placement="bottom-start" placeholder="选择日期" style="width: 300px" :options='options' @on-change='saveDate'></Date-picker>
                </Form-item>
                <Form-item label="预约时间" required prop="time">
                     <Time-picker format="HH:mm" type="timerange" placement="bottom-start" placeholder="选择时间" style="width: 300px" @on-change='saveTime'></Time-picker>
                </Form-item>
                <Form-item label="预约咨询人员" prop="name">
                    <Select v-model="formValidate.name" style="width:300px" :disabled='formValidate.hospital.length == 0'>
                        <Option v-for="item in nameList" :value="item.id" :key="item" :label='item.name'>
                            <span>{{item.name}}</span>
                            <span style="float:right;color:#ccc">{{item.hosp}}</span>
                        </Option>
                    </Select>
                </Form-item>
                <Form-item label="备注" prop="remark">
                    <Input v-model="formValidate.remark" type="textarea" :autosize="{minRows: 2,maxRows: 7}" placeholder="请输入备注"></Input>
                </Form-item>
            </Form>
            <div class="footer-btnGroup">
                <Button type="primary" shape="circle" icon="checkmark" @click='rr'>保存</Button>
                <Button type="primary" shape="circle" icon="android-arrow-back">返回</Button>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        data () {
            return {
                formValidate: {
                    hospital: '',
                    date: '',
                    time: [],
                    name: '',
                    remark: ''
                },
                nameList: [
                    {
                        id: '1',
                        name: '123',
                        hosp: '545'
                    }
                ],
                hospList: [
                    {
                        id: '1',
                        value: '123'
                    }
                ],
                options: {
                    disabledDate (date) {
                        return date && date.valueOf() < Date.now() - 86400000;
                    }
                },
            }
        },
        methods: {
            saveDate (date) {
                this.formValidate.date = date
            },
            saveTime (time) {
                this.formValidate.time = time
            },
            rr () {
                console.log(this.formValidate)
            }
        }
    }
</script>

