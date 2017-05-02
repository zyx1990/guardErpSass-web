const state = {
    navLinks: [
        {
            name: "桌面",
            url: "desktop",
            icon: "iconfont icon-home-page",
            child: []
        },
        {
            name: "画像系统",
            url: "javascript:;",
            icon: "iconfont icon-user-syst",
            child: [
                {
                    name: "画像分析",
                    url: "javascript:;",
                    child: [
                        {
                            name: "画像群体",
                            url: "/portait/analysis/portrait-group/portrait-group",
                            child: []
                        },
                        {
                            name: "画像查询",
                            url: "/portait/analysis/portrait-query/portrait-query",
                            child: []
                        }
                    ]
                },
                {
                    name: "画像仪表盘",
                    url: "/portait/dashboard/portrait-dashboard",
                    child: []
                },
                {
                    name: "画像指数 ",
                    url: "javascript:;",
                    child: [
                        {
                            name: "客运宏观指数",
                            url: "/portait/index/transport-index/transport-index",
                            child: []
                        },
                        {
                            name: "热点城市分析",
                            url: "/portait/index/city-hotspot/city-hotspot",
                            child: []
                        }
                    ]
                },
                {
                    name: "标签建设",
                    url: "javascript:;",
                    child: [
                        {
                            name: "标签管理",
                            url: "/portait/manager/label/label",
                            child: []
                        },
                        {
                            name: "资源管理",
                            url: "/portait/manager/resource/resource",
                            child: []
                        },
                        {
                            name: "调度管理",
                            url: "/portait/manager/dispatch/dispatch",
                            child: []
                        },
                        {
                            name: "接口订阅",
                            url: "/portait/manager/subscription/subscription",
                            child: []
                        },
                        {
                            name: "作业跟踪",
                            url: "/portait/manager/track/track",
                            child: []
                        },
                        {
                            name: "消息推送配置",
                            url: "/portait/manager/msg-push-conf/msg-push-conf",
                            child: []
                        },
                        {
                            name: "消息推送日志",
                            url: "/portait/manager/msg-push-log/msg-push-log",
                            child: []
                        }
                    ]
                }
            ]
        },
        {
            name: "开放平台",
            url: "javascript:;",
            icon: "iconfont icon-platform",
            child: [
                {
                    name: "平台概况",
                    url: "/open-platform/overview/home/home",
                    child: []
                },
                {
                    name: "平台分析",
                    url: "javascript:;",
                    child: [
                        {
                            name: "访问分析",
                            url: "/open-platform/analysis/visit/visit"
                        },
                        {
                            name: "概况分析",
                            url: "/open-platform/analysis/overview/overview"
                        },
                        {
                            name: "开发者分析",
                            url: "/open-platform/analysis/developer/developer"
                        },
                        {
                            name: "应用分析",
                            url: "/open-platform/analysis/app/app"
                        },
                        {
                            name: "系统分析",
                            url: "/open-platform/analysis/system/system"
                        },
                        {
                            name: "接口分析",
                            url: "/open-platform/analysis/interface/interface"
                        }
                    ]
                },
                {
                    name: "平台管理",
                    url: "javascript:;",
                    child: [
                        {
                            name: "开发者管理",
                            url: "/open-platform/management/developer/developer"
                        },
                        {
                            name: "应用管理",
                            url: "/open-platform/management/app/app"
                        },

                        {
                            name: "系统管理",
                            url: "/open-platform/management/system/system"
                        },
                        {
                            name: "接口管理",
                            url: "/open-platform/management/interface/interface"
                        },
                        {
                            name: "接口测试",
                            url: "/open-platform/management/interface-test/interface-test"
                        }
                    ]
                },
                {
                    name: "认证管理",
                    url: "javascript:;",
                    child: [
                        {
                            name: "接口订阅",
                            url: "/open-platform/access/interface/interface"
                        }
                    ]
                }
            ]
        },
        {
            name: "数据建模",
            url: "/algorithmic-model",
            icon: "iconfont icon-algorithm-mod",
            child: []
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
