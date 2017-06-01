/**
 * 客户个人资料主结构模板
 */

<template>
    <div class="container-box customerIndex">
        <div class="container-header">
            <h2>【{{ cusTitle }}】</h2>
            <Dropdown style="margin-left: 20px" @on-click='toDrop'>
                <Button type="primary" shape="circle">
                    下拉菜单
                    <Icon type="arrow-down-b"></Icon>
                </Button>
                <Dropdown-menu slot="list">
                    <Dropdown-item v-if='item.children.length == 0' v-for='(item, index) in dropData' :name="item.url + ',' + item.name" :key='item.index' :divided='item.line'>{{item.name}}</Dropdown-item>
                    <Dropdown placement="right-start" v-else>
                        <Dropdown-item>
                            {{item.name}}
                            <Icon type="ios-arrow-right"></Icon>
                        </Dropdown-item>
                        <Dropdown-menu slot="list">
                            <Dropdown-item v-for='(item1, index1) in item.children' :key='item1.index1' :name="item1.url + ',' + item1.name">{{item1.name}}</Dropdown-item>
                        </Dropdown-menu>
                    </Dropdown>
                </Dropdown-menu>
            </Dropdown>
        </div>
        <div class="container-body">
            <Menu mode="horizontal" :active-name="menuRouteUrl" @on-select='toMenu'>
                <Menu-item v-for='(item, index) in menuData' :key='item.index' :name='item.url'>{{item.name}}</Menu-item>
            </Menu>
            <router-view></router-view>
        </div>
    </div>
</template>

<script>
    export default {
        data () {
            return {
                cusId: '',
                cusTitle: '',
                menuRouteUrl: '',
                dropData: [
                    {
                        name: '其他',
                        url: '',
                        line: false,
                        children: [
                            {
                                name: '添加投诉',
                                url: '/groupComplainAdd',
                                line: false,
                                children: []
                            },
                            {
                                name: '设置头像',
                                url: '/avatarInfo',
                                line: false,
                                children: []
                            },
                            {
                                name: '添加黑名单',
                                url: '/blacklistOrderAdd',
                                line: false,
                                children: []
                            },
                            {
                                name: '添加开发人员变更申请',
                                url: '/exploitChangeInfo',
                                line: false,
                                children: []
                            },
                            {
                                name: '添加咨询人员变更申请',
                                url: '/managerChangeInfo',
                                line: false,
                                children: []
                            },
                            {
                                name: '更换医生申请',
                                url: '/orderDetailManagerAdd',
                                line: false,
                                children: []
                            },
                            {
                                name: '手工赠送积分',
                                url: '/pointAdd',
                                line: false,
                                children: []
                            },
                            {
                                name: '手工扣减积分',
                                url: '/pointRebate',
                                line: false,
                                children: []
                            },
                            {
                                name: '积分兑换券',
                                url: '/pointCoupon',
                                line: false,
                                children: []
                            },
                            {
                                name: '升级会员',
                                url: '/memberAdd',
                                line: false,
                                children: []
                            },
                            {
                                name: '增加权益',
                                url: '/equityAdd',
                                line: false,
                                children: []
                            },
                            {
                                name: '删除权益',
                                url: '/equityDelete',
                                line: false,
                                children: []
                            },
                            {
                                name: '送券',
                                url: '/couponOrderAdd',
                                line: false,
                                children: []
                            },
                            {
                                name: '扣券',
                                url: '/couponRebateOrderAdd',
                                line: false,
                                children: []
                            },
                            {
                                name: '添加关系',
                                url: '/relationAdd',
                                line: false,
                                children: []
                            },
                            {
                                name: '补划扣',
                                url: '/operationAdd',
                                line: false,
                                children: []
                            },
                            {
                                name: '转账',
                                url: '/depositTransferOrderAdd',
                                line: false,
                                children: []
                            },
                            {
                                name: '激活券',
                                url: '/activeCoupon',
                                line: false,
                                children: []
                            },
                            {
                                name: '添加店家佣金',
                                url: '',
                                line: false,
                                children: []
                            },
                            {
                                name: '添加欠款划扣',
                                url: '',
                                line: false,
                                children: []
                            },
                            {
                                name: '生成二维码',
                                url: '',
                                line: false,
                                children: []
                            }
                        ]
                    },
                    {
                        name: '添加咨询',
                        url: '/consultAdd',
                        line: false,
                        children: []
                    },
                    {
                        name: '添加预收款',
                        url: '/depositOrderAdd',
                        line: false,
                        children: []
                    },
                    {
                        name: '添加订单',
                        url: '/orderAdd',
                        line: false,
                        children: []
                    },
                    {
                        name: '添加咨询预约',
                        url: '/appointmentAdd',
                        line: false,
                        children: []
                    },
                    {
                        name: '添加治疗预约',
                        url: '/treatAdd',
                        line: false,
                        children: []
                    },
                    {
                        name: '添加手术',
                        url: '/surgeryAdd',
                        line: false,
                        children: []
                    },
                    {
                        name: '添加回访',
                        url: '/callbackAdd',
                        line: false,
                        children: []
                    },
                    {
                        name: '添加回访提醒',
                        url: '/callbackTaskAdd',
                        line: false,
                        children: []
                    },
                    {
                        name: '添加回访计划',
                        url: '/callbackSetAdd',
                        line: false,
                        children: []
                    },
                    {
                        name: '添加照片',
                        url: '/photoAdd',
                        line: false,
                        children: []
                    },
                    {
                        name: '添加退项目',
                        url: '/backOrderAdd',
                        line: false,
                        children: []
                    },
                    {
                        name: '添加退预收款',
                        url: '/depositRebateOrderAdd',
                        line: false,
                        children: []
                    },
                    {
                        name: '添加未成交',
                        url: '/failtureAdd',
                        line: true,
                        children: []
                    },
                    {
                        name: '添加分组',
                        url: '/groupAdd',
                        line: false,
                        children: []
                    },
                    {
                        name: '添加标签',
                        url: '/tagAdd',
                        line: false,
                        children: []
                    },
                    {
                        name: '添加问卷',
                        url: '',
                        line: false,
                        children: []
                    },
                    {
                        name: '添加病历',
                        url: '',
                        line: false,
                        children: []
                    }
                ],
                menuData: [
                    {
                        name: '客户概况',
                        url: '/customerMsg'
                    },
                    {
                        name: '消费项目',
                        url: '/indexOrderDetail'
                    },
                    {
                        name: '咨询情况',
                        url: '/indexConsult'
                    },
                    {
                        name: '预约情况',
                        url: '/indexAppointment'
                    },
                    {
                        name: '上门情况',
                        url: '/indexVisit'
                    },
                    {
                        name: '未成交情况',
                        url: '/indexFailture'
                    },
                    {
                        name: '订单情况',
                        url: '/indexOrder'
                    },
                    {
                        name: '照片管理',
                        url: '/indexPhoto'
                    },
                    {
                        name: '划扣记录',
                        url: '/indexOperation'
                    },
                    {
                        name: '回访情况',
                        url: '/indexCallback'
                    },
                    {
                        name: '问卷情况',
                        url: '/indexSurvey'
                    },
                    {
                        name: '病例记录',
                        url: '/indexMedicalRecord'
                    },
                    {
                        name: '账户情况',
                        url: '/indexAccount'
                    },
                    {
                        name: '会员权益',
                        url: '/indexMember'
                    },
                    {
                        name: '负责用户',
                        url: '/indexManager'
                    },
                    {
                        name: '客户间关系',
                        url: '/indexRelation'
                    },
                    {
                        name: '投诉反馈',
                        url: '/indexComplain'
                    },
                    {
                        name: '耗材成本',
                        url: '/indexCost'
                    },
                    {
                        name: '审核申请',
                        url: '/indexAudit'
                    },
                    {
                        name: '店家',
                        url: '/indexStore'
                    },
                    {
                        name: '微信分销',
                        url: '/indexPromoter'
                    },
                ]
            }
        },
        beforeRouteEnter(to, from, next) {
            next(vm => {
                if(to.path == '/customerIndex') {
                    vm.menuRouteUrl = '/customerMsg'
                } else {
                    vm.menuRouteUrl = to.path
                }
            });
        },
        beforeRouteUpdate (to, from, next) {
            this.menuRouteUrl = to.path
            next();
        },
        created () {
            if (window.sessionStorage) {
                var lg = window.sessionStorage;
                this.cusTitle = lg.cusName
                this.cusId = lg.cusId
            }
        },
        methods: {
            toDrop (url) {
                var _url = url.split(',')[0]
                var _text = url.split(',')[1]
                var breadData = [
                    {
                        url: '/desktop',
                        text: '桌面'
                    },
                    {
                        url: '/customerMsg',
                        text: this.cusTitle
                    },
                    {
                        url: _url,
                        text:_text
                    }
                ];
                this.$store.dispatch('setBreadData', breadData);
                this.$router.push({
                    path: _url,
                    query: {
                        id: this.cusId
                    }
                })
            },
            toMenu (url) {
                var breadData = [
                    {
                        url: '/desktop',
                        text: '桌面'
                    },
                    {
                        url: '/customer',
                        text: '客户管理'
                    },
                    {
                        url: url,
                        text: this.cusTitle
                    }
                ];
                this.$store.dispatch('setBreadData', breadData);
                this.$router.push({
                    path: url,
                    query: {
                        id: this.cusId
                    }
                })
            }
        }
    }
</script>

<style>
.container-box.customerIndex .ivu-select-dropdown {
    min-width: 150px;
}
    
</style>