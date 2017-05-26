/**
 * 客户概况页面
 */

<template>
    <div class="customer-box">
        <div class="customer-item">
            <div class="customer-item-title">
                <h3><Icon type="pricetag"></Icon>客户概况</h3>
            </div>
            <Row :gutter="50">
                <Col span="12" class='person-pic'><img src="" alt="" /></Col>
                <Col span="12">
                    <div class="person-vip"><img src="" alt="" /></div>
                    <div>金卡</div>
                </Col>
            </Row>
        </div>
        <Row :gutter="50">
            <Col span="12">
                <div class="customer-item">
                    <div class="customer-item-title">
                        <h3><Icon type="pricetag"></Icon>客户特征</h3>
                    </div>
                    <div>
                        <Tag color="blue">标签一</Tag>
                        <Tag color="blue">标签一</Tag>
                    </div>
                </div>
            </Col>
            <Col span="12">
                <div class="customer-item">
                    <div class="customer-item-title">
                        <h3><Icon type="pricetag"></Icon>客户分组</h3>
                        <ul class="header-btn-group">
                            <li class="header-item"><Icon type="information"></Icon>详情</li>
                        </ul>
                    </div>
                    <div>
                        <Tag color="blue">标签一</Tag>
                        <Tag color="red">标签一</Tag>
                    </div>
                </div>
            </Col>
        </Row>
        <Row :gutter="50">
            <Col span="12">
                <div class="customer-item">
                    <div class="customer-item-title">
                        <h3><Icon type="pricetag"></Icon>咨询项目</h3>
                    </div>
                    <div>
                        <Tag color="blue">标签一</Tag>
                        <Tag color="red">标签一</Tag>
                    </div>
                </div>
            </Col>
            <Col span="12">
                <div class="customer-item">
                    <div class="customer-item-title">
                        <h3><Icon type="pricetag"></Icon>客户标签</h3>
                        <ul class="header-btn-group">
                            <li class="header-item"><Icon type="information"></Icon>详情</li>
                        </ul>
                    </div>
                    <div>
                        <Tag color="blue">标签一</Tag>
                        <Tag color="red">标签一</Tag>
                    </div>
                </div>
            </Col>
        </Row> 
        <div class="customer-item">
            <div class="customer-item-title">
                <h3><Icon type="pricetag"></Icon>客户信息</h3>
                <ul class="header-btn-group">
                    <li class="header-item"><Icon type="edit"></Icon>编辑</li>
                </ul>
            </div>
            <table class="tableEdit">
                <tr>
                    <td class="tit">客户编号</td>
                    <td>101492</td>
                    <td class="tit">姓名</td>
                    <td>小光</td>
                </tr>
                <tr>
                    <td class="tit">登记人</td>
                    <td>【锦医卫北京机构】【总裁办】【吕洋洋】</td>
                    <td class="tit">登记时间</td>
                    <td>2017-05-12 17:50:55</td>
                </tr>
                <tr>
                    <td class="tit">性别</td>
                    <td>123</td>
                    <td class="tit">渠道</td>
                    <td>789</td>
                </tr>
                <tr>
                    <td class="tit">联系方式</td>
                    <td>123</td>
                    <td class="tit">备用联系方式</td>
                    <td>789</td>
                </tr>
                <tr>
                    <td class="tit">咨询项目</td>
                    <td colspan="3">123</td>
                </tr>
                <tr>
                    <td class="tit">开发人员</td>
                    <td>123</td>
                    <td class="tit">咨询人员</td>
                    <td>789</td>
                </tr>
                <tr>
                    <td class="tit">推荐店家</td>
                    <td>123</td>
                    <td class="tit">推荐人</td>
                    <td>789</td>
                </tr>
                <tr>
                    <td class="tit">地区</td>
                    <td>123</td>
                    <td class="tit">地址</td>
                    <td>789</td>
                </tr>
                <tr>
                    <td class="tit">咨询次数</td>
                    <td colspan="3">123</td>
                </tr>
                <tr>
                    <td class="tit">初次咨询时间</td>
                    <td>123</td>
                    <td class="tit">最后咨询时间</td>
                    <td>789</td>
                </tr>
                <tr>
                    <td class="tit">初诊医院</td>
                    <td>123</td>
                    <td class="tit">初诊日期</td>
                    <td>789</td>
                </tr>
                <tr>
                    <td class="tit">上门次数</td>
                    <td>123</td>
                    <td class="tit">最近到诊</td>
                    <td>789</td>
                </tr>
                <tr>
                    <td class="tit">年龄</td>
                    <td>123</td>
                    <td class="tit">生日</td>
                    <td>789</td>
                </tr>
                <tr>
                    <td class="tit">绑定微信</td>
                    <td>123</td>
                    <td class="tit">绑定时间</td>
                    <td>789</td>
                </tr>
                <tr>
                    <td class="tit">咨询次数</td>
                    <td colspan="3">123</td>
                </tr>
                <tr>
                    <td class="tit">档案号</td>
                    <td colspan="3">备注</td>
                </tr>
            </table>
        </div>
        <div class="customer-item">
            <div class="customer-item-title">
                <h3><Icon type="pricetag"></Icon>详细信息</h3>
                <ul class="header-btn-group">
                    <li class="header-item"><Icon type="edit"></Icon>编辑</li>
                </ul>
            </div>
            <table class="tableEdit">
                <tr>
                    <td class="tit">初诊医生</td>
                    <td>101492</td>
                    <td class="tit">自定义字段，可以抓取数据</td>
                    <td>小光</td>
                </tr>
                <tr>
                    <td class="tit">面部轮廓</td>
                    <td>【锦医卫北京机构】【总裁办】【吕洋洋】</td>
                    <td class="tit">皮肤状态</td>
                    <td>2017-05-12 17:50:55</td>
                </tr>
                <tr>
                    <td class="tit">注射病历号</td>
                    <td>123</td>
                    <td class="tit">是否过敏</td>
                    <td>789</td>
                </tr>
                <tr>
                    <td class="tit">是否做过VISIA检测</td>
                    <td>123</td>
                    <td class="tit">首次到门诊年月</td>
                    <td>789</td>
                </tr>
                <tr>
                    <td class="tit">成都客户</td>
                    <td>123</td>
                    <td class="tit">身份证号</td>
                    <td>789</td>
                </tr>
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
            
        }
    }
</script>

<style scoped>
    .customer-item .person-pic img {
        display: block;
        width: 120px;
        height: 120px;
    }
    .customer-item .person-vip img {
        display: block;
        width: 64px;
        height: 64px;
    }
</style>




