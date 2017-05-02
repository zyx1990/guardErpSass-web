const state = {
    navLinks: [
        {
            name: "桌面",
            url: "desktop",
            imgClass: "desktop",
            child: []
        },
        {
            name: "功能列表",
            url: "",
            imgClass: "menu",
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
