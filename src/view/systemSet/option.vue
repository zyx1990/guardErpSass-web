/**
 * 系统设置
 */

<template>
    <div class="container-box option">
        <div class="container-header">
            <h2>系统设置</h2>
        </div>
        <div class="container-body">
            <table class="tableEdit">
                <tbody>
                    <tr class="table-item">
                        <td>系统名称</td>
                        <td>锦医卫信息管理系统</td>
                        <td class="action">
                            <i-button type="primary" size="small" @click="edit">
                                <Icon type="edit"></Icon>编辑
                            </i-button>
                        </td>
                    </tr>
                    <tr class="table-item">
                        <td>客户自定义字段</td>
                        <td>
                            <table class="tableEdit">
                                <tbody>
                                    <tr>
                                        <td>自定义1</td>
                                        <td>初诊医生</td>
                                    </tr>
                                    <tr>
                                        <td>自定义2</td>
                                        <td>初诊医生</td>
                                    </tr>
                                    <tr>
                                        <td>自定义3</td>
                                        <td>初诊医生</td>
                                    </tr>
                                    <tr>
                                        <td>自定义4</td>
                                        <td>初诊医生</td>
                                    </tr>
                                    <tr>
                                        <td>自定义5</td>
                                        <td>初诊医生</td>
                                    </tr>
                                    <tr>
                                        <td>自定义6</td>
                                        <td>初诊医生</td>
                                    </tr>
                                    <tr>
                                        <td>自定义7</td>
                                        <td>初诊医生</td>
                                    </tr>
                                    <tr>
                                        <td>自定义8</td>
                                        <td>初诊医生</td>
                                    </tr>
                                    <tr>
                                        <td>自定义9</td>
                                        <td>初诊医生</td>
                                    </tr>
                                    <tr>
                                        <td>自定义10</td>
                                        <td>初诊医生</td>
                                    </tr>
                                </tbody>
                            </table>
                        </td>
                        <td class="action">
                            <i-button type="primary" size="small" @click="edit">
                                <Icon type="edit"></Icon>编辑
                            </i-button>
                        </td>
                    </tr>
                    <tr class="table-item">
                        <td>默认咨询模板</td>
                        <td>555</td>
                        <td class="action">
                            <i-button type="primary" size="small" @click="edit">
                                <Icon type="edit"></Icon>编辑
                            </i-button>
                        </td>
                    </tr>
                    <tr class="table-item">
                        <td>预收款成交设置</td>
                        <td>使用时</td>
                        <td class="action">
                            <i-button type="primary" size="small" @click="edit">
                                <Icon type="edit"></Icon>编辑
                            </i-button>
                        </td>
                    </tr>
                    <tr class="table-item">
                        <td>预约设置</td>
                        <td>
                            <p>开始时间：08:10</p>
                            <p>结束时间：23:00</p>
                            <p>时间间隔：30 分钟</p>
                        </td>
                        <td class="action">
                            <i-button type="primary" size="small" @click="edit">
                                <Icon type="edit"></Icon>编辑
                            </i-button>
                        </td>
                    </tr>
                    <tr class="table-item">
                        <td>允许欠款</td>
                        <td>是</td>
                        <td class="action">
                            <i-button type="primary" size="small" @click="edit">
                                <Icon type="edit"></Icon>编辑
                            </i-button>
                        </td>
                    </tr>
                    <tr class="table-item">
                        <td>积分比例</td>
                        <td>1</td>
                        <td class="action">
                            <i-button type="primary" size="small" @click="edit">
                                <Icon type="edit"></Icon>编辑
                            </i-button>
                        </td>
                    </tr>
                    <tr class="table-item">
                        <td>隐私保护</td>
                        <td>全部隐藏</td>
                        <td class="action">
                            <i-button type="primary" size="small" @click="edit">
                                <Icon type="edit"></Icon>编辑
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
               
            }
        },
        methods: {
            edit () {}
            
        }
    }
</script>

<style scoped>
    .option .table-item td:first-child {
        background: rgba(73,133,243,0.05);
        width: 200px;
    }
    .option .table-item .action {
        width: 100px;
        text-align: center;
    }
</style>