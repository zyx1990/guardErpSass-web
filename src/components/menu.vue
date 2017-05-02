<template>
    <div class="layout-nav" ref="menu">
            <div class="nav-show js-nav-show">
                <div class="nav-title">
                    <h2>锦医卫HRP</h2>
                    <span @click="meunToogle"></span>
                </div>
                <div class="admin-mes">
                    <h2>系统管理员</h2>
                    <span></span>
                </div>
                <ul class="nav-tree">
                    <li class="nav-item">
                        <em></em>
                        <router-link :to="{ path: '/desktop' }" >
                            <h3 class="desktop">桌面</h3>
                        </router-link>
                    </li>
                    <li class="nav-item">
                        <em></em>
                        <a href="javascritp:void(0);">
                            <h3 class="menu">功能列表</h3>
                        </a>
                    </li>
                    <li class="nav-item">
                        <em></em>
                        <a href="javascritp:void(0);">
                            <h3 class="report-form">报表中心</h3>
                        </a>
                    </li>
                    <li class="nav-item drowdown">
                        <em></em>
                        <a href="javascritp:void(0);">
                            <h3 class="basis-info">基础信息</h3>
                        </a>
                        <ol class="drowmenu">
                            <li>
                                <a href="javascritp:void(0);">客户管理</a>
                            </li>
                            <li>
                                <a href="javascritp:void(0);">客户管理</a>
                            </li>
                            <li>
                                <a href="javascritp:void(0);">客户管理</a>
                            </li>
                            <li>
                                <a href="javascritp:void(0);">客户管理</a>
                            </li>
                            <li>
                                <a href="javascritp:void(0);">客户管理</a>
                            </li>
                        </ol>
                    </li>
                    <li class="nav-item drowdown">
                        <em></em>
                        <a href="javascritp:void(0);">
                            <h3 class="system-setting">系统设置</h3>
                        </a>
                        <ol class="drowmenu">
                            <li>
                                <a href="javascritp:void(0);">客户管理</a>
                            </li>
                            <li>
                                <a href="javascritp:void(0);">客户管理</a>
                            </li>
                            <li>
                                <a href="javascritp:void(0);">客户管理</a>
                            </li>
                            <li>
                                <a href="javascritp:void(0);">客户管理</a>
                            </li>
                            <li>
                                <a href="javascritp:void(0);">客户管理</a>
                            </li>
                        </ol>
                    </li>
                    <li class="nav-item drowdown">
                        <em></em>
                        <router-link :to="{ path: '/system' }">
                            <h3 class="customer">客户管理</h3>
                        </router-link>
                        <ol class="drowmenu">
                            <li>
                                <a href="javascritp:void(0);">客户管理</a>
                            </li>
                            <li>
                                <a href="javascritp:void(0);">客户管理</a>
                            </li>
                            <li>
                                <a href="javascritp:void(0);">客户管理</a>
                            </li>
                            <li>
                                <a href="javascritp:void(0);">客户管理</a>
                            </li>
                            <li>
                                <a href="javascritp:void(0);">客户管理</a>
                            </li>
                        </ol>
                    </li>
                    <li class="nav-item drowdown">
                        <em></em>
                        <a href="javascritp:void(0);">
                            <h3 class="hospital">医院业务</h3>
                        </a>
                        <ol class="drowmenu">
                            <li>
                                <a href="javascritp:void(0);">客户管理</a>
                            </li>
                            <li>
                                <a href="javascritp:void(0);">客户管理</a>
                            </li>
                            <li>
                                <a href="javascritp:void(0);">客户管理</a>
                            </li>
                            <li>
                                <a href="javascritp:void(0);">客户管理</a>
                            </li>
                            <li>
                                <a href="javascritp:void(0);">客户管理</a>
                            </li>
                        </ol>
                    </li>
                    <li class="nav-item drowdown">
                        <em></em>
                        <a href="javascritp:void(0);">
                            <h3 class="market">市场渠道</h3>
                        </a>
                        <ol class="drowmenu">
                            <li>
                                <a href="javascritp:void(0);">客户管理</a>
                            </li>
                            <li>
                                <a href="javascritp:void(0);">客户管理</a>
                            </li>
                            <li>
                                <a href="javascritp:void(0);">客户管理</a>
                            </li>
                            <li>
                                <a href="javascritp:void(0);">客户管理</a>
                            </li>
                            <li>
                                <a href="javascritp:void(0);">客户管理</a>
                            </li>
                        </ol>
                    </li>
                    <li class="nav-item drowdown">
                        <em></em>
                        <a href="javascritp:void(0);">
                            <h3 class="stock">库存管理</h3>
                        </a>
                        <ol class="drowmenu">
                            <li>
                                <a href="javascritp:void(0);">客户管理</a>
                            </li>
                            <li>
                                <a href="javascritp:void(0);">客户管理</a>
                            </li>
                            <li>
                                <a href="javascritp:void(0);">客户管理</a>
                            </li>
                            <li>
                                <a href="javascritp:void(0);">客户管理</a>
                            </li>
                            <li>
                                <a href="javascritp:void(0);">客户管理</a>
                            </li>
                            <li>
                                <a href="javascritp:void(0);">客户管理</a>
                            </li>
                            <li>
                                <a href="javascritp:void(0);">客户管理</a>
                            </li>
                            <li>
                                <a href="javascritp:void(0);">客户管理</a>
                            </li>
                            <li>
                                <a href="javascritp:void(0);">客户管理</a>
                            </li>
                            <li>
                                <a href="javascritp:void(0);">客户管理</a>
                            </li>
                            <li>
                                <a href="javascritp:void(0);">客户管理</a>
                            </li>
                            <li>
                                <a href="javascritp:void(0);">客户管理</a>
                            </li>
                            <li>
                                <a href="javascritp:void(0);">客户管理</a>
                            </li>
                            <li>
                                <a href="javascritp:void(0);">客户管理</a>
                            </li>
                            <li>
                                <a href="javascritp:void(0);">客户管理</a>
                            </li>
                            <li>
                                <a href="javascritp:void(0);">客户管理</a>
                            </li>
                            <li>
                                <a href="javascritp:void(0);">客户管理</a>
                            </li>
                            <li>
                                <a href="javascritp:void(0);">客户管理</a>
                            </li>
                            <li>
                                <a href="javascritp:void(0);">客户管理</a>
                            </li>
                            <li>
                                <a href="javascritp:void(0);">客户管理</a>
                            </li>
                        </ol>
                    </li>
                    <li class="nav-item drowdown">
                        <em></em>
                        <a href="javascritp:void(0);">
                            <h3 class="work">日常办公</h3>
                        </a>
                        <ol class="drowmenu">
                            <li>
                                <a href="javascritp:void(0);">客户管理</a>
                            </li>
                            <li>
                                <a href="javascritp:void(0);">客户管理</a>
                            </li>
                            <li>
                                <a href="javascritp:void(0);">客户管理</a>
                            </li>
                            <li>
                                <a href="javascritp:void(0);">客户管理</a>
                            </li>
                            <li>
                                <a href="javascritp:void(0);">客户管理</a>
                            </li>
                        </ol>
                    </li>
                    <li class="nav-item drowdown">
                        <em></em>
                        <a href="javascritp:void(0);">
                            <h3 class="weixin">微信</h3>
                        </a>
                        <ol class="drowmenu">
                            <li>
                                <a href="javascritp:void(0);">客户管理</a>
                            </li>
                            <li>
                                <a href="javascritp:void(0);">客户管理</a>
                            </li>
                            <li>
                                <a href="javascritp:void(0);">客户管理</a>
                            </li>
                            <li>
                                <a href="javascritp:void(0);">客户管理</a>
                            </li>
                            <li>
                                <a href="javascritp:void(0);">客户管理</a>
                            </li>
                        </ol>
                    </li>
                </ul>
            </div>
            <div class="nav-hidden">
                <div class="nav-hidden-tit"></div>
                <div class="nav-hidden-mes">
                    <span></span>
                    <em></em>
                </div>
                <ul class="nav-hidden-tree">
                    <li class="nav-hidden-item">
                        <em></em>
                        <router-link :to="{ path: '/desktop' }" class="desktop"></router-link>
                    </li>
                    <li class="nav-hidden-item">
                        <em></em>
                        <a href="javascritp:void(0);" class="menu"></a>
                    </li>
                    <li class="nav-hidden-item">
                        <em></em>
                        <a href="javascritp:void(0);" class="report-form"></a>
                    </li>
                    <li class="nav-hidden-item">
                        <em></em>
                        <a href="javascritp:void(0);" class="basis-info"></a>
                        <ol class="drowmenu">
                            <li>
                                <a href="javascritp:void(0);">客户管理</a>
                            </li>
                            <li>
                                <a href="javascritp:void(0);">客户管理</a>
                            </li>
                            <li>
                                <a href="javascritp:void(0);">客户管理</a>
                            </li>
                            <li>
                                <a href="javascritp:void(0);">客户管理</a>
                            </li>
                            <li>
                                <a href="javascritp:void(0);">客户管理</a>
                            </li>
                        </ol>
                    </li>
                    <li class="nav-hidden-item">
                        <em></em>
                        <a href="javascritp:void(0);" class="system-setting"></a>
                        <ol class="drowmenu">
                            <li>
                                <a href="javascritp:void(0);">客户管理</a>
                            </li>
                            <li>
                                <a href="javascritp:void(0);">客户管理</a>
                            </li>
                            <li>
                                <a href="javascritp:void(0);">客户管理</a>
                            </li>
                            <li>
                                <a href="javascritp:void(0);">客户管理</a>
                            </li>
                            <li>
                                <a href="javascritp:void(0);">客户管理</a>
                            </li>
                        </ol>
                    </li>
                    <li class="nav-hidden-item">
                        <em></em>
                        <router-link :to="{ path: '/system' }" class="customer"></router-link>
                        <ol class="drowmenu">
                            <li>
                                <a href="javascritp:void(0);">客户管理</a>
                            </li>
                            <li>
                                <a href="javascritp:void(0);">客户管理</a>
                            </li>
                            <li>
                                <a href="javascritp:void(0);">客户管理</a>
                            </li>
                            <li>
                                <a href="javascritp:void(0);">客户管理</a>
                            </li>
                            <li>
                                <a href="javascritp:void(0);">客户管理</a>
                            </li>
                        </ol>
                    </li>
                    <li class="nav-hidden-item">
                        <em></em>
                        <a href="javascritp:void(0);" class="hospital"></a>
                        <ol class="drowmenu">
                            <li>
                                <a href="javascritp:void(0);">客户管理</a>
                            </li>
                            <li>
                                <a href="javascritp:void(0);">客户管理</a>
                            </li>
                            <li>
                                <a href="javascritp:void(0);">客户管理</a>
                            </li>
                            <li>
                                <a href="javascritp:void(0);">客户管理</a>
                            </li>
                            <li>
                                <a href="javascritp:void(0);">客户管理</a>
                            </li>
                        </ol>
                    </li>
                    <li class="nav-hidden-item">
                        <em></em>
                        <a href="javascritp:void(0);" class="market"></a>
                        <ol class="drowmenu">
                            <li>
                                <a href="javascritp:void(0);">客户管理</a>
                            </li>
                            <li>
                                <a href="javascritp:void(0);">客户管理</a>
                            </li>
                            <li>
                                <a href="javascritp:void(0);">客户管理</a>
                            </li>
                            <li>
                                <a href="javascritp:void(0);">客户管理</a>
                            </li>
                            <li>
                                <a href="javascritp:void(0);">客户管理</a>
                            </li>
                        </ol>
                    </li>
                    <li class="nav-hidden-item">
                        <em></em>
                        <a href="javascritp:void(0);" class="stock"></a>
                        <ol class="drowmenu">
                            <li>
                                <a href="javascritp:void(0);">客户管理</a>
                            </li>
                            <li>
                                <a href="javascritp:void(0);">客户管理</a>
                            </li>
                            <li>
                                <a href="javascritp:void(0);">客户管理</a>
                            </li>
                            <li>
                                <a href="javascritp:void(0);">客户管理</a>
                            </li>
                            <li>
                                <a href="javascritp:void(0);">客户管理</a>
                            </li>
                        </ol>
                    </li>
                    <li class="nav-hidden-item">
                        <em></em>
                        <a href="javascritp:void(0);" class="work"></a>
                        <ol class="drowmenu">
                            <li>
                                <a href="javascritp:void(0);">客户管理</a>
                            </li>
                            <li>
                                <a href="javascritp:void(0);">客户管理</a>
                            </li>
                            <li>
                                <a href="javascritp:void(0);">客户管理</a>
                            </li>
                            <li>
                                <a href="javascritp:void(0);">客户管理</a>
                            </li>
                            <li>
                                <a href="javascritp:void(0);">客户管理</a>
                            </li>
                        </ol>
                    </li>
                    <li class="nav-hidden-item">
                        <em></em>
                        <a href="javascritp:void(0);" class="weixin"></a>
                        <ol class="drowmenu">
                            <li>
                                <a href="javascritp:void(0);">客户管理</a>
                            </li>
                            <li>
                                <a href="javascritp:void(0);">客户管理</a>
                            </li>
                            <li>
                                <a href="javascritp:void(0);">客户管理</a>
                            </li>
                            <li>
                                <a href="javascritp:void(0);">客户管理</a>
                            </li>
                            <li>
                                <a href="javascritp:void(0);">客户管理</a>
                            </li>
                        </ol>
                    </li>
                </ul>
            </div>
        </div>
</template>

<script>
    import $ from 'jquery'
    export default {
        name: 'menu',
        data() {
            return {
            }
        },
        mounted: function(){
            this.$nextTick( () => {
                var $dom = $(this.$refs.menu);
                this.$dom = $dom;
                
            });
        },
        methods: {
            meunToogle: function(){
                var $dom = this.$dom;
                // $dom.find('.js-nav-show').stop(true).animate({'opacity' : '0'}, 150, function() {
                //     $(this).css({
                //         'display' : 'none'
                //     })
                // });

                $dom.find('.js-layout-nav').stop(true).animate({'width' : '50px'}, 200, function() {
                    $('.nav-hidden').css({
                        'display' : 'block'
                    })
                });

                $dom.find('.js-layout-container').stop(true).animate({'margin-left' : '50px'}, 200, function() {
                })
            }
        }
    }

</script>
<style lang="scss" scoped>

</style>