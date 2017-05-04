import Vue from 'vue'
import Router from 'vue-router'


Vue.use(Router);

//前面最好把路由相关信息抽出来 避免new Router 过于庞大

var router = new Router({
    routes: [
        {
            path: '/',
            redirect: '/login'
        }, 
        {
            path: '/desktop',
            component(resolve){
                require.ensure(['view/index.vue'], () => {
                    resolve(require('view/index.vue'));
                });
            },
            children: [
                {
                    path: '',
                    component(resolve) {
                        require.ensure(['view/desktop'], () => {
                            resolve(require('view/desktop'));
                        });
                    }
                }, 
                //基础信息
                {
                    path: '/channel',
                    component(resolve) {
                        require.ensure(['view/basicInfo/channel'], () => {
                            resolve(require('view/basicInfo/channel'));
                        });
                    }
                },
                {
                    path: '/symptom',
                    component(resolve) {
                        require.ensure(['view/basicInfo/symptom'], () => {
                            resolve(require('view/basicInfo/symptom'));
                        });
                    }
                },
                {
                    path: '/callbackCategory',
                    component(resolve) {
                        require.ensure(['view/basicInfo/callbackCategory'], () => {
                            resolve(require('view/basicInfo/callbackCategory'));
                        });
                    }
                },
                {
                    path: '/callbackSet',
                    component(resolve) {
                        require.ensure(['view/basicInfo/callbackSet'], () => {
                            resolve(require('view/basicInfo/callbackSet'));
                        });
                    }
                },
                {
                    path: '/failtureCategory',
                    component(resolve) {
                        require.ensure(['view/basicInfo/failtureCategory'], () => {
                            resolve(require('view/basicInfo/failtureCategory'));
                        });
                    }
                },
                {
                    path: '/complainCategory',
                    component(resolve) {
                        require.ensure(['view/basicInfo/complainCategory'], () => {
                            resolve(require('view/basicInfo/complainCategory'));
                        });
                    }
                },
                {
                    path: '/tag',
                    component(resolve) {
                        require.ensure(['view/basicInfo/tag'], () => {
                            resolve(require('view/basicInfo/tag'));
                        });
                    }
                },
                {
                    path: '/tagGroup',
                    component(resolve) {
                        require.ensure(['view/basicInfo/tagGroup'], () => {
                            resolve(require('view/basicInfo/tagGroup'));
                        });
                    }
                },
                {
                    path: '/unit',
                    component(resolve) {
                        require.ensure(['view/basicInfo/unit'], () => {
                            resolve(require('view/basicInfo/unit'));
                        });
                    }
                },
                {
                    path: '/unit',
                    component(resolve) {
                        require.ensure(['view/basicInfo/unit'], () => {
                            resolve(require('view/basicInfo/unit'));
                        });
                    }
                },
                {
                    path: '/cardCategory',
                    component(resolve) {
                        require.ensure(['view/basicInfo/cardCategory'], () => {
                            resolve(require('view/basicInfo/cardCategory'));
                        });
                    }
                },
                {
                    path: '/tool',
                    component(resolve) {
                        require.ensure(['view/basicInfo/tool'], () => {
                            resolve(require('view/basicInfo/tool'));
                        });
                    }
                },
                {
                    path: '/relation',
                    component(resolve) {
                        require.ensure(['view/basicInfo/relation'], () => {
                            resolve(require('view/basicInfo/relation'));
                        });
                    }
                },
                {
                    path: '/survey',
                    component(resolve) {
                        require.ensure(['view/basicInfo/survey'], () => {
                            resolve(require('view/basicInfo/survey'));
                        });
                    }
                },
                {
                    path: '/medicalRecord',
                    component(resolve) {
                        require.ensure(['view/basicInfo/medicalRecord'], () => {
                            resolve(require('view/basicInfo/medicalRecord'));
                        });
                    }
                },
                {
                    path: '/position',
                    component(resolve) {
                        require.ensure(['view/basicInfo/position'], () => {
                            resolve(require('view/basicInfo/position'));
                        });
                    }
                },


                //系统设置
                {
                    path: '/hospital',
                    component(resolve) {
                        require.ensure(['view/systemSet/hospital'], () => {
                            resolve(require('view/systemSet/hospital'));
                        });
                    }
                },
                {
                    path: '/dept',
                    component(resolve) {
                        require.ensure(['view/systemSet/dept'], () => {
                            resolve(require('view/systemSet/dept'));
                        });
                    }
                },
                {
                    path: '/user',
                    component(resolve) {
                        require.ensure(['view/systemSet/user'], () => {
                            resolve(require('view/systemSet/user'));
                        });
                    }
                },
                {
                    path: '/role',
                    component(resolve) {
                        require.ensure(['view/systemSet/role'], () => {
                            resolve(require('view/systemSet/role'));
                        });
                    }
                },
                {
                    path: '/option',
                    component(resolve) {
                        require.ensure(['view/systemSet/option'], () => {
                            resolve(require('view/systemSet/option'));
                        });
                    }
                },
                {
                    path: '/log',
                    component(resolve) {
                        require.ensure(['view/systemSet/log'], () => {
                            resolve(require('view/systemSet/log'));
                        });
                    }
                },
                {
                    path: '/depositCharge',
                    component(resolve) {
                        require.ensure(['view/systemSet/depositCharge'], () => {
                            resolve(require('view/systemSet/depositCharge'));
                        });
                    }
                },
                {
                    path: '/couponCategory',
                    component(resolve) {
                        require.ensure(['view/systemSet/couponCategory'], () => {
                            resolve(require('view/systemSet/couponCategory'));
                        });
                    }
                },
                {
                    path: '/chargeCategory',
                    component(resolve) {
                        require.ensure(['view/systemSet/chargeCategory'], () => {
                            resolve(require('view/systemSet/chargeCategory'));
                        });
                    }
                },
                {
                    path: '/charge',
                    component(resolve) {
                        require.ensure(['view/systemSet/charge'], () => {
                            resolve(require('view/systemSet/charge'));
                        });
                    }
                },
                {
                    path: '/chargeSet',
                    component(resolve) {
                        require.ensure(['view/systemSet/chargeSet'], () => {
                            resolve(require('view/systemSet/chargeSet'));
                        });
                    }
                },
                {
                    path: '/productCategory',
                    component(resolve) {
                        require.ensure(['view/systemSet/productCategory'], () => {
                            resolve(require('view/systemSet/productCategory'));
                        });
                    }
                },
                {
                    path: '/product',
                    component(resolve) {
                        require.ensure(['view/systemSet/product'], () => {
                            resolve(require('view/systemSet/product'));
                        });
                    }
                },
                {
                    path: '/equity',
                    component(resolve) {
                        require.ensure(['view/systemSet/equity'], () => {
                            resolve(require('view/systemSet/equity'));
                        });
                    }
                },
                {
                    path: '/memberCategory',
                    component(resolve) {
                        require.ensure(['view/systemSet/memberCategory'], () => {
                            resolve(require('view/systemSet/memberCategory'));
                        });
                    }
                },
                {
                    path: '/channelGroup',
                    component(resolve) {
                        require.ensure(['view/systemSet/channelGroup'], () => {
                            resolve(require('view/systemSet/channelGroup'));
                        });
                    }
                },
                {
                    path: '/item',
                    component(resolve) {
                        require.ensure(['view/systemSet/item'], () => {
                            resolve(require('view/systemSet/item'));
                        });
                    }
                },
                {
                    path: '/itemGroup',
                    component(resolve) {
                        require.ensure(['view/systemSet/itemGroup'], () => {
                            resolve(require('view/systemSet/itemGroup'));
                        });
                    }
                },
                {
                    path: '/chargeDiscount',
                    component(resolve) {
                        require.ensure(['view/systemSet/chargeDiscount'], () => {
                            resolve(require('view/systemSet/chargeDiscount'));
                        });
                    }
                },
                {
                    path: '/userDiscount',
                    component(resolve) {
                        require.ensure(['view/systemSet/userDiscount'], () => {
                            resolve(require('view/systemSet/userDiscount'));
                        });
                    }
                },
                {
                    path: '/print',
                    component(resolve) {
                        require.ensure(['view/systemSet/print'], () => {
                            resolve(require('view/systemSet/print'));
                        });
                    }
                },
                {
                    path: '/auditRule',
                    component(resolve) {
                        require.ensure(['view/systemSet/auditRule'], () => {
                            resolve(require('view/systemSet/auditRule'));
                        });
                    }
                },
                {
                    path: '/manager',
                    component(resolve) {
                        require.ensure(['view/systemSet/manager'], () => {
                            resolve(require('view/systemSet/manager'));
                        });
                    }
                },
                {
                    path: '/treatDoctor',
                    component(resolve) {
                        require.ensure(['view/systemSet/treatDoctor'], () => {
                            resolve(require('view/systemSet/treatDoctor'));
                        });
                    }
                },
                {
                    path: '/consultDoctor',
                    component(resolve) {
                        require.ensure(['view/systemSet/consultDoctor'], () => {
                            resolve(require('view/systemSet/consultDoctor'));
                        });
                    }
                },


                //客户管理
                {
                    path: '/customer',
                    component(resolve) {
                        require.ensure(['view/customerManagement/customer'], () => {
                            resolve(require('view/customerManagement/customer'));
                        });
                    }
                },
                {
                    path: '/complain',
                    component(resolve) {
                        require.ensure(['view/customerManagement/complain'], () => {
                            resolve(require('view/customerManagement/complain'));
                        });
                    }
                },
                {
                    path: '/customerGroup',
                    component(resolve) {
                        require.ensure(['view/customerManagement/customerGroup'], () => {
                            resolve(require('view/customerManagement/customerGroup'));
                        });
                    }
                },
                {
                    path: '/customerFilter',
                    component(resolve) {
                        require.ensure(['view/customerManagement/customerFilter'], () => {
                            resolve(require('view/customerManagement/customerFilter'));
                        });
                    }
                },
                {
                    path: '/ownership',
                    component(resolve) {
                        require.ensure(['view/customerManagement/ownership'], () => {
                            resolve(require('view/customerManagement/ownership'));
                        });
                    }
                },
                {
                    path: '/birthday',
                    component(resolve) {
                        require.ensure(['view/customerManagement/birthday'], () => {
                            resolve(require('view/customerManagement/birthday'));
                        });
                    }
                },

                //医院业务
                {
                    path: '/onlineDesk',
                    component(resolve) {
                        require.ensure(['view/hospitalBusiness/onlineDesk'], () => {
                            resolve(require('view/hospitalBusiness/onlineDesk'));
                        });
                    }
                },
                {
                    path: '/callbackDesk',
                    component(resolve) {
                        require.ensure(['view/hospitalBusiness/callbackDesk'], () => {
                            resolve(require('view/hospitalBusiness/callbackDesk'));
                        });
                    }
                },
                {
                    path: '/frontDesk',
                    component(resolve) {
                        require.ensure(['view/hospitalBusiness/frontDesk'], () => {
                            resolve(require('view/hospitalBusiness/frontDesk'));
                        });
                    }
                },
                {
                    path: '/triageDesk',
                    component(resolve) {
                        require.ensure(['view/hospitalBusiness/triageDesk'], () => {
                            resolve(require('view/hospitalBusiness/triageDesk'));
                        });
                    }
                },
                {
                    path: '/liveDesk',
                    component(resolve) {
                        require.ensure(['view/hospitalBusiness/liveDesk'], () => {
                            resolve(require('view/hospitalBusiness/liveDesk'));
                        });
                    }
                },
                {
                    path: '/cashierDesk',
                    component(resolve) {
                        require.ensure(['view/hospitalBusiness/cashierDesk'], () => {
                            resolve(require('view/hospitalBusiness/cashierDesk'));
                        });
                    }
                },
                {
                    path: '/deptDesk',
                    component(resolve) {
                        require.ensure(['view/hospitalBusiness/deptDesk'], () => {
                            resolve(require('view/hospitalBusiness/deptDesk'));
                        });
                    }
                },
                {
                    path: '/bed',
                    component(resolve) {
                        require.ensure(['view/hospitalBusiness/bed'], () => {
                            resolve(require('view/hospitalBusiness/bed'));
                        });
                    }
                },
                {
                    path: '/inpatientDesk',
                    component(resolve) {
                        require.ensure(['view/hospitalBusiness/inpatientDesk'], () => {
                            resolve(require('view/hospitalBusiness/inpatientDesk'));
                        });
                    }
                },
                {
                    path: '/surgeryDesk',
                    component(resolve) {
                        require.ensure(['view/hospitalBusiness/surgeryDesk'], () => {
                            resolve(require('view/hospitalBusiness/surgeryDesk'));
                        });
                    }
                },
                {
                    path: '/surgeryScheduler',
                    component(resolve) {
                        require.ensure(['view/hospitalBusiness/surgeryScheduler'], () => {
                            resolve(require('view/hospitalBusiness/surgeryScheduler'));
                        });
                    }
                },                
                {
                    path: '/treatScheduler',
                    component(resolve) {
                        require.ensure(['view/hospitalBusiness/treatScheduler'], () => {
                            resolve(require('view/hospitalBusiness/treatScheduler'));
                        });
                    }
                },             
                {
                    path: '/activity',
                    component(resolve) {
                        require.ensure(['view/hospitalBusiness/activity'], () => {
                            resolve(require('view/hospitalBusiness/activity'));
                        });
                    }
                },


                //市场渠道
                {
                    path: '/store',
                    component(resolve) {
                        require.ensure(['view/marketChannel/store'], () => {
                            resolve(require('view/marketChannel/store'));
                        });
                    }
                },
                {
                    path: '/storeManager',
                    component(resolve) {
                        require.ensure(['view/marketChannel/storeManager'], () => {
                            resolve(require('view/marketChannel/storeManager'));
                        });
                    }
                },
                {
                    path: '/marketDesk',
                    component(resolve) {
                        require.ensure(['view/marketChannel/marketDesk'], () => {
                            resolve(require('view/marketChannel/marketDesk'));
                        });
                    }
                },
                {
                    path: '/couponActivity',
                    component(resolve) {
                        require.ensure(['view/marketChannel/couponActivity'], () => {
                            resolve(require('view/marketChannel/couponActivity'));
                        });
                    }
                },
                {
                    path: '/saleBack',
                    component(resolve) {
                        require.ensure(['view/marketChannel/saleBack'], () => {
                            resolve(require('view/marketChannel/saleBack'));
                        });
                    }
                },


                //库存管理
                {
                    path: '/warehouse',
                    component(resolve) {
                        require.ensure(['view/inventoryManagement/warehouse'], () => {
                            resolve(require('view/inventoryManagement/warehouse'));
                        });
                    }
                },
                {
                    path: '/supplier',
                    component(resolve) {
                        require.ensure(['view/inventoryManagement/supplier'], () => {
                            resolve(require('view/inventoryManagement/supplier'));
                        });
                    }
                },
                {
                    path: '/purchase',
                    component(resolve) {
                        require.ensure(['view/inventoryManagement/purchase'], () => {
                            resolve(require('view/inventoryManagement/purchase'));
                        });
                    }
                },
                {
                    path: '/invoice',
                    component(resolve) {
                        require.ensure(['view/inventoryManagement/invoice'], () => {
                            resolve(require('view/inventoryManagement/invoice'));
                        });
                    }
                },
                {
                    path: '/return',
                    component(resolve) {
                        require.ensure(['view/inventoryManagement/return'], () => {
                            resolve(require('view/inventoryManagement/return'));
                        });
                    }
                },
                {
                    path: '/allocate',
                    component(resolve) {
                        require.ensure(['view/inventoryManagement/allocate'], () => {
                            resolve(require('view/inventoryManagement/allocate'));
                        });
                    }
                },
                {
                    path: '/check',
                    component(resolve) {
                        require.ensure(['view/inventoryManagement/check'], () => {
                            resolve(require('view/inventoryManagement/check'));
                        });
                    }
                },
                {
                    path: '/use',
                    component(resolve) {
                        require.ensure(['view/inventoryManagement/use'], () => {
                            resolve(require('view/inventoryManagement/use'));
                        });
                    }
                },
                {
                    path: '/stock',
                    component(resolve) {
                        require.ensure(['view/inventoryManagement/stock'], () => {
                            resolve(require('view/inventoryManagement/stock'));
                        });
                    }
                },
                {
                    path: '/deptStockOutDesk',
                    component(resolve) {
                        require.ensure(['view/inventoryManagement/deptStockOutDesk'], () => {
                            resolve(require('view/inventoryManagement/deptStockOutDesk'));
                        });
                    }
                },
                {
                    path: '/expiration',
                    component(resolve) {
                        require.ensure(['view/inventoryManagement/expiration'], () => {
                            resolve(require('view/inventoryManagement/expiration'));
                        });
                    }
                },
                //日常办公
                {
                    path: '/addressBook',
                    component(resolve) {
                        require.ensure(['view/dailyOffice/addressBook'], () => {
                            resolve(require('view/dailyOffice/addressBook'));
                        });
                    }
                },
                {
                    path: '/shiftCategory',
                    component(resolve) {
                        require.ensure(['view/dailyOffice/shiftCategory'], () => {
                            resolve(require('view/dailyOffice/shiftCategory'));
                        });
                    }
                },
                {
                    path: '/myShift',
                    component(resolve) {
                        require.ensure(['view/dailyOffice/myShift'], () => {
                            resolve(require('view/dailyOffice/myShift'));
                        });
                    }
                },
                {
                    path: '/shift',
                    component(resolve) {
                        require.ensure(['view/dailyOffice/shift'], () => {
                            resolve(require('view/dailyOffice/shift'));
                        });
                    }
                },
                {
                    path: '/notice',
                    component(resolve) {
                        require.ensure(['view/dailyOffice/notice'], () => {
                            resolve(require('view/dailyOffice/notice'));
                        });
                    }
                },
                {
                    path: '/knowledgeCategory',
                    component(resolve) {
                        require.ensure(['view/dailyOffice/knowledgeCategory'], () => {
                            resolve(require('view/dailyOffice/knowledgeCategory'));
                        });
                    }
                },
                {
                    path: '/knowledge',
                    component(resolve) {
                        require.ensure(['view/dailyOffice/knowledge'], () => {
                            resolve(require('view/dailyOffice/knowledge'));
                        });
                    }
                },
                {
                    path: '/knowledgeCenter',
                    component(resolve) {
                        require.ensure(['view/dailyOffice/knowledgeCenter'], () => {
                            resolve(require('view/dailyOffice/knowledgeCenter'));
                        });
                    }
                },
                {
                    path: '/auditOrder',
                    component(resolve) {
                        require.ensure(['view/dailyOffice/auditOrder'], () => {
                            resolve(require('view/dailyOffice/auditOrder'));
                        });
                    }
                },
                {
                    path: '/auditOrderDesk',
                    component(resolve) {
                        require.ensure(['view/dailyOffice/auditOrderDesk'], () => {
                            resolve(require('view/dailyOffice/auditOrderDesk'));
                        });
                    }
                },
                //微信
                {
                    path: '/promoter',
                    component(resolve) {
                        require.ensure(['view/WeChat/promoter'], () => {
                            resolve(require('view/WeChat/promoter'));
                        });
                    }
                },
                {
                    path: '/promoteCustomer',
                    component(resolve) {
                        require.ensure(['view/WeChat/promoteCustomer'], () => {
                            resolve(require('view/WeChat/promoteCustomer'));
                        });
                    }
                },
                {
                    path: '/promoteRecord',
                    component(resolve) {
                        require.ensure(['view/WeChat/promoteRecord'], () => {
                            resolve(require('view/WeChat/promoteRecord'));
                        });
                    }
                },
                {
                    path: '/promoteRebate',
                    component(resolve) {
                        require.ensure(['view/WeChat/promoteRebate'], () => {
                            resolve(require('view/WeChat/promoteRebate'));
                        });
                    }
                },         
                {
                    path: '/VerifyMessage',
                    component(resolve) {
                        require.ensure(['view/WeChat/VerifyMessage'], () => {
                            resolve(require('view/WeChat/VerifyMessage'));
                        });
                    }
                }
            ]
        }, 
        {
            path: '/login',
            component(resolve){
                require.ensure(['view/login.vue'], () => {
                    resolve(require('view/login.vue'));
                });
            }
        }
    ],
    scrollBehavior(to, from, savedPosition) {
        // 在按下 后退/前进 按钮时，就会像浏览器的原生表现那样
        if (savedPosition) {
            return savedPosition;
        }
        // 滚动到锚点
        if (to.hash) {
            return {
                selector: to.hash
            };
        }
        // 让页面滚动到顶部
        return {
            x: 0,
            y: 0
        }
    }

});


//路由进入前后事件
router.beforeEach((to, from, next) => {
    //防止没有登录直接登录主页面
    var user = window.sessionStorage.getItem('userAccount');

    if(!user){
        if(to.path !== '/login'){
            return next({ path: '/login' });
        }else{
            next();
        }       
    }else{
        if(to.path == '/login'){
            window.sessionStorage.removeItem('userAccount');
        }
        next();
    }
});

router.afterEach((to, from, next) => {

});

export default router;