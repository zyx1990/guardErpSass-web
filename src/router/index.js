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
                //桌面
                {
                    path: '/desktop/menu',
                    component(resolve) {
                        require.ensure(['view/desktop/menu'], () => {
                            resolve(require('view/desktop/menu'));
                        });
                    }
                }, 
                {
                    path: '/desktop/favorite',
                    component(resolve) {
                        require.ensure(['view/desktop/favorite'], () => {
                            resolve(require('view/desktop/favorite'));
                        });
                    }
                }, 
                {
                    path: '/desktop/noticeCenter:id',
                    component(resolve) {
                        require.ensure(['view/desktop/noticeCenter'], () => {
                            resolve(require('view/desktop/noticeCenter'));
                        });
                    }
                }, 
                //报表中心
                {
                    path: '/reportCenter',
                    component(resolve) {
                        require.ensure(['view/reportCenter'], () => {
                            resolve(require('view/reportCenter'));
                        });
                    }
                },
                {
                    path: '/failtureDetail',
                    component(resolve) {
                        require.ensure(['view/reportCenter/failtureDetail'], () => {
                            resolve(require('view/reportCenter/failtureDetail'));
                        });
                    }
                },
                {
                    path: '/hospitalFailtureDetail',
                    component(resolve) {
                        require.ensure(['view/reportCenter/hospitalFailtureDetail'], () => {
                            resolve(require('view/reportCenter/hospitalFailtureDetail'));
                        });
                    }
                },
                {
                    path: '/userFailtureDetail',
                    component(resolve) {
                        require.ensure(['view/reportCenter/userFailtureDetail'], () => {
                            resolve(require('view/reportCenter/userFailtureDetail'));
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
                    path: '/callbackSetEdit',
                    component(resolve) {
                        require.ensure(['view/basicInfo/callbackSetEdit'], () => {
                            resolve(require('view/basicInfo/callbackSetEdit'));
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
                    path: '/tagGroupEdit',
                    component(resolve) {
                        require.ensure(['view/basicInfo/tagGroupEdit'], () => {
                            resolve(require('view/basicInfo/tagGroupEdit'));
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
                    path: '/surveyEdit',
                    component(resolve) {
                        require.ensure(['view/basicInfo/surveyEdit'], () => {
                            resolve(require('view/basicInfo/surveyEdit'));
                        });
                    }
                },
                {
                    path: '/surveyRtfFill:id',
                    component(resolve) {
                        require.ensure(['view/basicInfo/surveyRtfFill'], () => {
                            resolve(require('view/basicInfo/surveyRtfFill'));
                        });
                    }
                },
                {
                    path: '/surveyRtfChoice:id',
                    component(resolve) {
                        require.ensure(['view/basicInfo/surveyRtfChoice'], () => {
                            resolve(require('view/basicInfo/surveyRtfChoice'));
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
                    path: '/medicalRecordEdit:id',
                    component(resolve) {
                        require.ensure(['view/basicInfo/medicalRecordEdit'], () => {
                            resolve(require('view/basicInfo/medicalRecordEdit'));
                        });
                    }
                },
                {
                    path: '/medicalRecordRtf:id',
                    component(resolve) {
                        require.ensure(['view/basicInfo/medicalRecordRtf'], () => {
                            resolve(require('view/basicInfo/medicalRecordRtf'));
                        });
                    }
                },
                {
                    path: '/medicalRecordPrint:id',
                    component(resolve) {
                        require.ensure(['view/basicInfo/medicalRecordPrint'], () => {
                            resolve(require('view/basicInfo/medicalRecordPrint'));
                        });
                    }
                },
                {
                    path: '/medicalRecordUpdate',
                    component(resolve) {
                        require.ensure(['view/basicInfo/medicalRecordUpdate'], () => {
                            resolve(require('view/basicInfo/medicalRecordUpdate'));
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
                    path: '/userSetting',
                    component(resolve) {
                        require.ensure(['view/systemSet/userSetting'], () => {
                            resolve(require('view/systemSet/userSetting'));
                        });
                    }
                },
                {
                    path: '/userCheck:id',
                    component(resolve) {
                        require.ensure(['view/systemSet/userCheck'], () => {
                            resolve(require('view/systemSet/userCheck'));
                        });
                    }
                },
                {
                    path: '/userPower:id',
                    component(resolve) {
                        require.ensure(['view/systemSet/userPower'], () => {
                            resolve(require('view/systemSet/userPower'));
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
                    path: '/roleSet',
                    component(resolve) {
                        require.ensure(['view/systemSet/roleSet'], () => {
                            resolve(require('view/systemSet/roleSet'));
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
                    path: '/depositChargeEdit',
                    component(resolve) {
                        require.ensure(['view/systemSet/depositChargeEdit'], () => {
                            resolve(require('view/systemSet/depositChargeEdit'));
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
                    path: '/couponCategoryEdit',
                    component(resolve) {
                        require.ensure(['view/systemSet/couponCategoryEdit'], () => {
                            resolve(require('view/systemSet/couponCategoryEdit'));
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
                    path: '/chargeEdit',
                    component(resolve) {
                        require.ensure(['view/systemSet/chargeEdit'], () => {
                            resolve(require('view/systemSet/chargeEdit'));
                        });
                    }
                },
                {
                    path: '/chargeMedicinalSet',
                    component(resolve) {
                        require.ensure(['view/systemSet/chargeMedicinalSet'], () => {
                            resolve(require('view/systemSet/chargeMedicinalSet'));
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
                    path: '/chargeSetEdit',
                    component(resolve) {
                        require.ensure(['view/systemSet/chargeSetEdit'], () => {
                            resolve(require('view/systemSet/chargeSetEdit'));
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
                    path: '/productEdit',
                    component(resolve) {
                        require.ensure(['view/systemSet/productEdit'], () => {
                            resolve(require('view/systemSet/productEdit'));
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
                    path: '/memberCategoryQuitys',
                    component(resolve) {
                        require.ensure(['view/systemSet/memberCategoryQuitys'], () => {
                            resolve(require('view/systemSet/memberCategoryQuitys'));
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
                    path: '/channelGroupCheck',
                    component(resolve) {
                        require.ensure(['view/systemSet/channelGroupCheck'], () => {
                            resolve(require('view/systemSet/channelGroupCheck'));
                        });
                    }
                },
                {
                    path: '/channelGroupEdit',
                    component(resolve) {
                        require.ensure(['view/systemSet/channelGroupEdit'], () => {
                            resolve(require('view/systemSet/channelGroupEdit'));
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
                    path: '/itemCheckSymptom',
                    component(resolve) {
                        require.ensure(['view/systemSet/itemCheckSymptom'], () => {
                            resolve(require('view/systemSet/itemCheckSymptom'));
                        });
                    }
                },
                {
                    path: '/itemCheckCharge',
                    component(resolve) {
                        require.ensure(['view/systemSet/itemCheckCharge'], () => {
                            resolve(require('view/systemSet/itemCheckCharge'));
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
                    path: '/treatDoctorEdit',
                    component(resolve) {
                        require.ensure(['view/systemSet/treatDoctorEdit'], () => {
                            resolve(require('view/systemSet/treatDoctorEdit'));
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

                //客户个人资料
                {
                    path: '/customerIndex',
                    component(resolve) {
                        require.ensure(['view/customerManagement/customerInfo/customerIndex'], () => {
                            resolve(require('view/customerManagement/customerInfo/customerIndex'));
                        });
                    },
                    children: [
                        {
                            path: '',
                            component(resolve) {
                                require.ensure(['view/customerManagement/customerInfo/customerMsg'], () => {
                                    resolve(require('view/customerManagement/customerInfo/customerMsg'));
                                });
                            }
                        },
                        {
                            path: '/customerMsg',
                            component(resolve) {
                                require.ensure(['view/customerManagement/customerInfo/customerMsg'], () => {
                                    resolve(require('view/customerManagement/customerInfo/customerMsg'));
                                });
                            }
                        },
                        {
                            path: '/indexOrderDetail',
                            component(resolve) {
                                require.ensure(['view/customerManagement/customerInfo/indexOrderDetail'], () => {
                                    resolve(require('view/customerManagement/customerInfo/indexOrderDetail'));
                                });
                            }
                        },
                        {
                            path: '/indexConsult',
                            component(resolve) {
                                require.ensure(['view/customerManagement/customerInfo/indexConsult'], () => {
                                    resolve(require('view/customerManagement/customerInfo/indexConsult'));
                                });
                            }
                        },
                        {
                            path: '/indexAppointment',
                            component(resolve) {
                                require.ensure(['view/customerManagement/customerInfo/indexAppointment'], () => {
                                    resolve(require('view/customerManagement/customerInfo/indexAppointment'));
                                });
                            }
                        },
                        {
                            path: '/indexVisit',
                            component(resolve) {
                                require.ensure(['view/customerManagement/customerInfo/indexVisit'], () => {
                                    resolve(require('view/customerManagement/customerInfo/indexVisit'));
                                });
                            }
                        },
                        {
                            path: '/indexFailture',
                            component(resolve) {
                                require.ensure(['view/customerManagement/customerInfo/indexFailture'], () => {
                                    resolve(require('view/customerManagement/customerInfo/indexFailture'));
                                });
                            }
                        },
                        {
                            path: '/indexOrder',
                            component(resolve) {
                                require.ensure(['view/customerManagement/customerInfo/indexOrder'], () => {
                                    resolve(require('view/customerManagement/customerInfo/indexOrder'));
                                });
                            }
                        },
                        {
                            path: '/indexPhoto',
                            component(resolve) {
                                require.ensure(['view/customerManagement/customerInfo/indexPhoto'], () => {
                                    resolve(require('view/customerManagement/customerInfo/indexPhoto'));
                                });
                            }
                        },
                        {
                            path: '/indexOperation',
                            component(resolve) {
                                require.ensure(['view/customerManagement/customerInfo/indexOperation'], () => {
                                    resolve(require('view/customerManagement/customerInfo/indexOperation'));
                                });
                            }
                        },
                        {
                            path: '/indexCallback',
                            component(resolve) {
                                require.ensure(['view/customerManagement/customerInfo/indexCallback'], () => {
                                    resolve(require('view/customerManagement/customerInfo/indexCallback'));
                                });
                            }
                        },
                        {
                            path: '/indexSurvey',
                            component(resolve) {
                                require.ensure(['view/customerManagement/customerInfo/indexSurvey'], () => {
                                    resolve(require('view/customerManagement/customerInfo/indexSurvey'));
                                });
                            }
                        },
                        {
                            path: '/indexMedicalRecord',
                            component(resolve) {
                                require.ensure(['view/customerManagement/customerInfo/indexMedicalRecord'], () => {
                                    resolve(require('view/customerManagement/customerInfo/indexMedicalRecord'));
                                });
                            }
                        },
                        {
                            path: '/indexAccount',
                            component(resolve) {
                                require.ensure(['view/customerManagement/customerInfo/indexAccount'], () => {
                                    resolve(require('view/customerManagement/customerInfo/indexAccount'));
                                });
                            }
                        },
                        {
                            path: '/indexMember',
                            component(resolve) {
                                require.ensure(['view/customerManagement/customerInfo/indexMember'], () => {
                                    resolve(require('view/customerManagement/customerInfo/indexMember'));
                                });
                            }
                        },
                        {
                            path: '/indexManager',
                            component(resolve) {
                                require.ensure(['view/customerManagement/customerInfo/indexManager'], () => {
                                    resolve(require('view/customerManagement/customerInfo/indexManager'));
                                });
                            }
                        },
                        {
                            path: '/indexRelation',
                            component(resolve) {
                                require.ensure(['view/customerManagement/customerInfo/indexRelation'], () => {
                                    resolve(require('view/customerManagement/customerInfo/indexRelation'));
                                });
                            }
                        },
                        {
                            path: '/indexComplain',
                            component(resolve) {
                                require.ensure(['view/customerManagement/customerInfo/indexComplain'], () => {
                                    resolve(require('view/customerManagement/customerInfo/indexComplain'));
                                });
                            }
                        },
                        {
                            path: '/indexCost',
                            component(resolve) {
                                require.ensure(['view/customerManagement/customerInfo/indexCost'], () => {
                                    resolve(require('view/customerManagement/customerInfo/indexCost'));
                                });
                            }
                        },
                        {
                            path: '/indexAudit',
                            component(resolve) {
                                require.ensure(['view/customerManagement/customerInfo/indexAudit'], () => {
                                    resolve(require('view/customerManagement/customerInfo/indexAudit'));
                                });
                            }
                        },
                        {
                            path: '/indexStore',
                            component(resolve) {
                                require.ensure(['view/customerManagement/customerInfo/indexStore'], () => {
                                    resolve(require('view/customerManagement/customerInfo/indexStore'));
                                });
                            }
                        },
                        {
                            path: '/indexPromoter',
                            component(resolve) {
                                require.ensure(['view/customerManagement/customerInfo/indexPromoter'], () => {
                                    resolve(require('view/customerManagement/customerInfo/indexPromoter'));
                                });
                            }
                        }
                    ]
                },
                //客户添加资料
                {
                    path: '/consultAdd',
                    component(resolve) {
                        require.ensure(['view/customerManagement/customerInfo/consultAdd'], () => {
                            resolve(require('view/customerManagement/customerInfo/consultAdd'));
                        });
                    }
                },
                {
                    path: '/consultUpdate',
                    component(resolve) {
                        require.ensure(['view/customerManagement/customerInfo/consultUpdate'], () => {
                            resolve(require('view/customerManagement/customerInfo/consultUpdate'));
                        });
                    }
                },
                {
                    path: '/depositOrderAdd',
                    component(resolve) {
                        require.ensure(['view/customerManagement/customerInfo/depositOrderAdd'], () => {
                            resolve(require('view/customerManagement/customerInfo/depositOrderAdd'));
                        });
                    }
                },
                {
                    path: '/depositOrderView',
                    component(resolve) {
                        require.ensure(['view/customerManagement/customerInfo/depositOrderView'], () => {
                            resolve(require('view/customerManagement/customerInfo/depositOrderView'));
                        });
                    }
                },
                {
                    path: '/orderAdd',
                    component(resolve) {
                        require.ensure(['view/customerManagement/customerInfo/orderAdd'], () => {
                            resolve(require('view/customerManagement/customerInfo/orderAdd'));
                        });
                    }
                },
                {
                    path: '/orderView',
                    component(resolve) {
                        require.ensure(['view/customerManagement/customerInfo/orderView'], () => {
                            resolve(require('view/customerManagement/customerInfo/orderView'));
                        });
                    }
                },
                {
                    path: '/orderUpdate',
                    component(resolve) {
                        require.ensure(['view/customerManagement/customerInfo/orderUpdate'], () => {
                            resolve(require('view/customerManagement/customerInfo/orderUpdate'));
                        });
                    }
                },
                {
                    path: '/appointmentAdd',
                    component(resolve) {
                        require.ensure(['view/customerManagement/customerInfo/appointmentAdd'], () => {
                            resolve(require('view/customerManagement/customerInfo/appointmentAdd'));
                        });
                    }
                },
                {
                    path: '/appointmentUpdate',
                    component(resolve) {
                        require.ensure(['view/customerManagement/customerInfo/appointmentUpdate'], () => {
                            resolve(require('view/customerManagement/customerInfo/appointmentUpdate'));
                        });
                    }
                },
                {
                    path: '/treatAdd',
                    component(resolve) {
                        require.ensure(['view/customerManagement/customerInfo/treatAdd'], () => {
                            resolve(require('view/customerManagement/customerInfo/treatAdd'));
                        });
                    }
                },
                {
                    path: '/treatUpdate',
                    component(resolve) {
                        require.ensure(['view/customerManagement/customerInfo/treatUpdate'], () => {
                            resolve(require('view/customerManagement/customerInfo/treatUpdate'));
                        });
                    }
                },
                {
                    path: '/surgeryAdd',
                    component(resolve) {
                        require.ensure(['view/customerManagement/customerInfo/surgeryAdd'], () => {
                            resolve(require('view/customerManagement/customerInfo/surgeryAdd'));
                        });
                    }
                },
                {
                    path: '/surgeryUpdate',
                    component(resolve) {
                        require.ensure(['view/customerManagement/customerInfo/surgeryUpdate'], () => {
                            resolve(require('view/customerManagement/customerInfo/surgeryUpdate'));
                        });
                    }
                },
                {
                    path: '/callbackAdd',
                    component(resolve) {
                        require.ensure(['view/customerManagement/customerInfo/callbackAdd'], () => {
                            resolve(require('view/customerManagement/customerInfo/callbackAdd'));
                        });
                    }
                },
                {
                    path: '/callbackUpdate',
                    component(resolve) {
                        require.ensure(['view/customerManagement/customerInfo/callbackUpdate'], () => {
                            resolve(require('view/customerManagement/customerInfo/callbackUpdate'));
                        });
                    }
                },
                {
                    path: '/callbackTaskAdd',
                    component(resolve) {
                        require.ensure(['view/customerManagement/customerInfo/callbackTaskAdd'], () => {
                            resolve(require('view/customerManagement/customerInfo/callbackTaskAdd'));
                        });
                    }
                },
                {
                    path: '/callbackTaskUpdate',
                    component(resolve) {
                        require.ensure(['view/customerManagement/customerInfo/callbackTaskUpdate'], () => {
                            resolve(require('view/customerManagement/customerInfo/callbackTaskUpdate'));
                        });
                    }
                },
                {
                    path: '/callbackSetAdd',
                    component(resolve) {
                        require.ensure(['view/customerManagement/customerInfo/callbackSetAdd'], () => {
                            resolve(require('view/customerManagement/customerInfo/callbackSetAdd'));
                        });
                    }
                },
                {
                    path: '/photoAdd',
                    component(resolve) {
                        require.ensure(['view/customerManagement/customerInfo/photoAdd'], () => {
                            resolve(require('view/customerManagement/customerInfo/photoAdd'));
                        });
                    }
                },
                {
                    path: '/backOrderAdd',
                    component(resolve) {
                        require.ensure(['view/customerManagement/customerInfo/backOrderAdd'], () => {
                            resolve(require('view/customerManagement/customerInfo/backOrderAdd'));
                        });
                    }
                },
                {
                    path: '/depositRebateOrderAdd',
                    component(resolve) {
                        require.ensure(['view/customerManagement/customerInfo/depositRebateOrderAdd'], () => {
                            resolve(require('view/customerManagement/customerInfo/depositRebateOrderAdd'));
                        });
                    }
                },
                {
                    path: '/failtureAdd',
                    component(resolve) {
                        require.ensure(['view/customerManagement/customerInfo/failtureAdd'], () => {
                            resolve(require('view/customerManagement/customerInfo/failtureAdd'));
                        });
                    }
                },
                {
                    path: '/failtureUpdate',
                    component(resolve) {
                        require.ensure(['view/customerManagement/customerInfo/failtureUpdate'], () => {
                            resolve(require('view/customerManagement/customerInfo/failtureUpdate'));
                        });
                    }
                },
                {
                    path: '/groupAdd',
                    component(resolve) {
                        require.ensure(['view/customerManagement/customerInfo/groupAdd'], () => {
                            resolve(require('view/customerManagement/customerInfo/groupAdd'));
                        });
                    }
                },
                {
                    path: '/tagAdd',
                    component(resolve) {
                        require.ensure(['view/customerManagement/customerInfo/tagAdd'], () => {
                            resolve(require('view/customerManagement/customerInfo/tagAdd'));
                        });
                    }
                },
                {
                    path: '/tagInfo',
                    component(resolve) {
                        require.ensure(['view/customerManagement/customerInfo/tagInfo'], () => {
                            resolve(require('view/customerManagement/customerInfo/tagInfo'));
                        });
                    }
                },
                //添加其他
                {
                    path: '/groupComplainAdd',
                    component(resolve) {
                        require.ensure(['view/customerManagement/customerInfo/groupComplainAdd'], () => {
                            resolve(require('view/customerManagement/customerInfo/groupComplainAdd'));
                        });
                    }
                },
                {
                    path: '/avatarInfo',
                    component(resolve) {
                        require.ensure(['view/customerManagement/customerInfo/avatarInfo'], () => {
                            resolve(require('view/customerManagement/customerInfo/avatarInfo'));
                        });
                    }
                },
                {
                    path: '/blacklistOrderAdd',
                    component(resolve) {
                        require.ensure(['view/customerManagement/customerInfo/blacklistOrderAdd'], () => {
                            resolve(require('view/customerManagement/customerInfo/blacklistOrderAdd'));
                        });
                    }
                },
                {
                    path: '/exploitChangeInfo',
                    component(resolve) {
                        require.ensure(['view/customerManagement/customerInfo/exploitChangeInfo'], () => {
                            resolve(require('view/customerManagement/customerInfo/exploitChangeInfo'));
                        });
                    }
                },
                {
                    path: '/managerChangeInfo',
                    component(resolve) {
                        require.ensure(['view/customerManagement/customerInfo/managerChangeInfo'], () => {
                            resolve(require('view/customerManagement/customerInfo/managerChangeInfo'));
                        });
                    }
                },
                {
                    path: '/orderDetailManagerAdd',
                    component(resolve) {
                        require.ensure(['view/customerManagement/customerInfo/orderDetailManagerAdd'], () => {
                            resolve(require('view/customerManagement/customerInfo/orderDetailManagerAdd'));
                        });
                    }
                },
                {
                    path: '/pointAdd',
                    component(resolve) {
                        require.ensure(['view/customerManagement/customerInfo/pointAdd'], () => {
                            resolve(require('view/customerManagement/customerInfo/pointAdd'));
                        });
                    }
                },
                {
                    path: '/pointRebate',
                    component(resolve) {
                        require.ensure(['view/customerManagement/customerInfo/pointRebate'], () => {
                            resolve(require('view/customerManagement/customerInfo/pointRebate'));
                        });
                    }
                },
                {
                    path: '/pointCoupon',
                    component(resolve) {
                        require.ensure(['view/customerManagement/customerInfo/pointCoupon'], () => {
                            resolve(require('view/customerManagement/customerInfo/pointCoupon'));
                        });
                    }
                },
                {
                    path: '/memberAdd',
                    component(resolve) {
                        require.ensure(['view/customerManagement/customerInfo/memberAdd'], () => {
                            resolve(require('view/customerManagement/customerInfo/memberAdd'));
                        });
                    }
                },
                {
                    path: '/equityAdd',
                    component(resolve) {
                        require.ensure(['view/customerManagement/customerInfo/equityAdd'], () => {
                            resolve(require('view/customerManagement/customerInfo/equityAdd'));
                        });
                    }
                },
                {
                    path: '/equityDelete',
                    component(resolve) {
                        require.ensure(['view/customerManagement/customerInfo/equityDelete'], () => {
                            resolve(require('view/customerManagement/customerInfo/equityDelete'));
                        });
                    }
                },
                {
                    path: '/couponOrderAdd',
                    component(resolve) {
                        require.ensure(['view/customerManagement/customerInfo/couponOrderAdd'], () => {
                            resolve(require('view/customerManagement/customerInfo/couponOrderAdd'));
                        });
                    }
                },
                {
                    path: '/couponRebateOrderAdd',
                    component(resolve) {
                        require.ensure(['view/customerManagement/customerInfo/couponRebateOrderAdd'], () => {
                            resolve(require('view/customerManagement/customerInfo/couponRebateOrderAdd'));
                        });
                    }
                },
                {
                    path: '/relationAdd',
                    component(resolve) {
                        require.ensure(['view/customerManagement/customerInfo/relationAdd'], () => {
                            resolve(require('view/customerManagement/customerInfo/relationAdd'));
                        });
                    }
                },
                {
                    path: '/operationAdd',
                    component(resolve) {
                        require.ensure(['view/customerManagement/customerInfo/operationAdd'], () => {
                            resolve(require('view/customerManagement/customerInfo/operationAdd'));
                        });
                    }
                },
                {
                    path: '/depositTransferOrderAdd',
                    component(resolve) {
                        require.ensure(['view/customerManagement/customerInfo/depositTransferOrderAdd'], () => {
                            resolve(require('view/customerManagement/customerInfo/depositTransferOrderAdd'));
                        });
                    }
                },
                {
                    path: '/activeCoupon',
                    component(resolve) {
                        require.ensure(['view/customerManagement/customerInfo/activeCoupon'], () => {
                            resolve(require('view/customerManagement/customerInfo/activeCoupon'));
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
                    path: '/customerGroupManagement',
                    component(resolve) {
                        require.ensure(['view/customerManagement/customerGroupManagement'], () => {
                            resolve(require('view/customerManagement/customerGroupManagement'));
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