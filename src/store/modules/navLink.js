const state = {
    navLinks: [
        {
            name: "桌面",
            url: "/desktop",
            imgClass: "desktop",
            child: []
        },
        {
            name: "报表中心",
            url: "",
            imgClass: "report-form",
            child: []
        },
        {
            name: "基础信息",
            url: "",
            imgClass: "basis-info",
            child: [
                {
                    name: "渠道管理",
                    url: "/channel",
                    imgClass: "",
                    child: []
                },
                {
                    name: "症状管理",
                    url: "/symptom",
                    imgClass: "",
                    child: []
                },
                {
                    name: "回访类型管理",
                    url: "/callbackCategory",
                    imgClass: "",
                    child: [] 
                },
                {
                    name: "回访组管理",
                    url: "/callbackSet",
                    imgClass: "",
                    child: []
                },
                {
                    name: "未成交类型管理",
                    url: "/failtureCategory",
                    imgClass: "",
                    child: []
                },
                {
                    name: "投诉类型管理",
                    url: "/complainCategory",
                    imgClass: "",
                    child: []
                },
                {
                    name: "标签管理",
                    url: "/tag",
                    imgClass: "",
                    child: [] 
                },
                {
                    name: "标签组管理",
                    url: "/tagGroup",
                    imgClass: "",
                    child: []
                },
                {
                    name: "单位管理",
                    url: "/unit",
                    imgClass: "",
                    child: []
                },
                {
                    name: "银行卡管理",
                    url: "/cardCategory",
                    imgClass: "",
                    child: [] 
                },
                {
                    name: "工具管理",
                    url: "/tool",
                    imgClass: "",
                    child: []
                },
                {
                    name: "关系管理",
                    url: "/relation",
                    imgClass: "",
                    child: []
                },
                {
                    name: "问卷模板管理",
                    url: "/survey",
                    imgClass: "",
                    child: []
                },
                {
                    name: "病历模板管理",
                    url: "/medicalRecord",
                    imgClass: "",
                    child: [] 
                },
                {
                    name: "岗位分工管理",
                    url: "/position",
                    imgClass: "",
                    child: []
                }
            ]
        },
        {
            name: "系统设置",
            url: "",
            imgClass: "system-setting",
            child: [{
                name: "客户管理",
                url: "",
                imgClass: "",
                child: []
            },
            {
                name: "客户管理",
                url: "",
                imgClass: "",
                child: []
            },
            {
                name: "客户管理",
                url: "",
                imgClass: "",
                child: [] 
            },
            {
                name: "客户管理",
                url: "",
                imgClass: "",
                child: []
            },
            {
                name: "客户管理",
                url: "",
                imgClass: "",
                child: []
            }]
        },
        {
            name: "客户管理",
            url: "",
            imgClass: "customer",
            child: [{
                name: "客户管理",
                url: "/customermange",
                imgClass: "",
                child: []
            },
            {
                name: "投诉记录",
                url: "",
                imgClass: "",
                child: []
            },
            {
                name: "客户组管理",
                url: "",
                imgClass: "",
                child: [] 
            },
            {
                name: "客户选择器",
                url: "",
                imgClass: "",
                child: []
            },
            {
                name: "客户归属权变更",
                url: "",
                imgClass: "",
                child: []
            },
            {
                name: "生日提醒",
                url: "",
                imgClass: "",
                child: []
            }]
        },
        {
            name: "医院业务",
            url: "",
            imgClass: "hospital",
            child: [{
                name: "客户管理",
                url: "",
                imgClass: "",
                child: []
            },
            {
                name: "客户管理",
                url: "",
                imgClass: "",
                child: []
            },
            {
                name: "客户管理",
                url: "",
                imgClass: "",
                child: [] 
            },
            {
                name: "客户管理",
                url: "",
                imgClass: "",
                child: []
            },
            {
                name: "客户管理",
                url: "",
                imgClass: "",
                child: []
            }]
        },
        {
            name: "市场渠道",
            url: "",
            imgClass: "market",
            child: [{
                name: "客户管理",
                url: "",
                imgClass: "",
                child: []
            },
            {
                name: "客户管理",
                url: "",
                imgClass: "",
                child: []
            },
            {
                name: "客户管理",
                url: "",
                imgClass: "",
                child: [] 
            },
            {
                name: "客户管理",
                url: "",
                imgClass: "",
                child: []
            },
            {
                name: "客户管理",
                url: "",
                imgClass: "",
                child: []
            }]
        },
        {
            name: "库存管理",
            url: "",
            imgClass: "stock",
            child: [{
                name: "客户管理",
                url: "",
                imgClass: "",
                child: []
            },
            {
                name: "客户管理",
                url: "",
                imgClass: "",
                child: []
            },
            {
                name: "客户管理",
                url: "",
                imgClass: "",
                child: [] 
            },
            {
                name: "客户管理",
                url: "",
                imgClass: "",
                child: []
            },
            {
                name: "客户管理",
                url: "",
                imgClass: "",
                child: []
            }]
        },
        {
            name: "日常办公",
            url: "",
            imgClass: "work",
            child: [{
                name: "客户管理",
                url: "",
                imgClass: "",
                child: []
            },
            {
                name: "客户管理",
                url: "",
                imgClass: "",
                child: []
            },
            {
                name: "客户管理",
                url: "",
                imgClass: "",
                child: [] 
            },
            {
                name: "客户管理",
                url: "",
                imgClass: "",
                child: []
            },
            {
                name: "客户管理",
                url: "",
                imgClass: "",
                child: []
            }]
        },
        {
            name: "微信",
            url: "",
            imgClass: "weixin",
            child: [{
                name: "客户管理",
                url: "",
                imgClass: "",
                child: []
            },
            {
                name: "客户管理",
                url: "",
                imgClass: "",
                child: []
            },
            {
                name: "客户管理",
                url: "",
                imgClass: "",
                child: [] 
            },
            {
                name: "客户管理",
                url: "",
                imgClass: "",
                child: []
            },
            {
                name: "客户管理",
                url: "",
                imgClass: "",
                child: []
            }]
        }

        
    ]
}
const getters = {
    navLink: function (state) {
        return state.navLinks;
    }
};


export default {
    state,
    getters
}
