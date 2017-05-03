<template>
    <div class="layout-nav js-layout-nav" ref="menu">
        <!-- 菜单显示字的情况 开始-->  
        <div class="nav-show js-nav-show" v-show="istoggle">
            <div class="nav-title">
                <h2>锦医卫HRP</h2>
                <span @click="meunToogle($event)"></span>
            </div>
            <div class="admin-mes">
                <h2>系统管理员</h2>
                <span></span>
            </div>
            <ul class="nav-tree">
                <!-- -->
                <li class="nav-item js-nav-item" v-for="(firsts, index1) in navLinks" :class="{drowdown: firsts.child.length > 0}" @click="childMeunToggle">
                    <em></em>
                    <span>
                        <h3 :class="firsts.imgClass" :data-url="firsts.url">{{firsts.name}}</h3>
                    </span>
                    <ol class="drowmenu" v-if="firsts.child.length > 0">
                        <li v-for="(seconds,index2) in firsts.child" :data-url="seconds.url" @click="routerLinkTo">     <span>{{seconds.name}}</span>
                        </li>
                    </ol>
                </li>                   
            </ul>
        </div>
        <!-- 菜单显示字情况结束-->
        
        <!-- 菜单显示图标 开始-->
        <div class="nav-hidden" v-show="!istoggle">
            <div class="nav-hidden-tit" @click="meunToogle"></div>
            <div class="nav-hidden-mes">
                <span></span>
                <em></em>
            </div>
            <ul class="nav-hidden-tree">
                <li class="nav-hidden-item js-nav-hidden-item" v-for="(firsts, index1) in navLinks" @click="childMeunToggle">
                    <em></em>
                    <span>
                        <h3 :class="firsts.imgClass" :data-url="firsts.url" :data-name="firsts.name"></h3>
                    </span>                  
                    <ol class="drowmenu" v-if="firsts.child.length > 0">
                        <li v-for="(seconds,index2) in firsts.child" :data-url="seconds.url" @click="routerLinkTo">     <span>{{seconds.name}}</span>
                        </li>
                    </ol>
                </li>
            </ul>
        </div>
        <!-- 菜单显示图标 结束-->
    </div>
</template>

<script>
    import $ from 'jquery'
    export default {
        name: 'menu',
        data() {
            return {
                istoggle: true
            }
        },
        computed: {
            navLinks: function(){
                return this.$store.getters.navLink;
            }
        },
        mounted: function(){
            this.$nextTick( () => {
                var $dom = $(this.$refs.menu);
                this.$dom = $dom;
                
            });
        },
        methods: {
            //meunToogle 方法是控制菜单是否显示文字
            meunToogle: function(){
                var _vm = this,
                $dom = this.$dom,
                $navShow = $dom.find('.js-nav-show');
                if(_vm.istoggle){
                    $navShow.stop(true).animate({'opacity' : '0'}, 150, function() {
                        _vm.istoggle = false;
                    });
                    $dom.stop(true).animate({'width' : '50px'}, 200);
                }else{
                    $dom.stop(true).animate({'width' : '200px'}, 200);
                    $navShow.stop(true).animate({'opacity' : '1'}, 100, function() {
                        _vm.istoggle = true;
                    });
                }
                //触发函数
                _vm.$emit('on-click-toggle',_vm.istoggle);
            },
            //childMeunToggle 方法是控制子菜单的显示控制
            childMeunToggle: function($event){
                var _vm = this,
                $dom = _vm.$dom,
                $this = $($event.currentTarget),
                index = $this.index(),
                $navHiddenItem = $dom.find('.js-nav-hidden-item'),
                $navItem = $dom.find('.js-nav-item'),
                $adminMes = $('.admin-mes'),
                url = $this.data('url');
                //展开模式
                $this.addClass('active').siblings().removeClass('active');
                if(_vm.istoggle){
                    $navHiddenItem.eq(index).addClass('active').siblings().removeClass('active');
                    $navItem.find('.drowmenu').stop(true).animate({'height' : '0'}, 200);

                    if($this.hasClass('drowdown')) {
                        $navHiddenItem.find('.drowmenu').removeClass('block');
                        $navHiddenItem.eq(index).find('.drowmenu').addClass('block')
                        if($this.hasClass('drowopen')) {
                            $this.removeClass('drowopen');
                            $this.find('.drowmenu').stop(true).animate({'height' : '0'}, 200)
                        } else {
                            var num = $this.find('.drowmenu li').length;
                            $this.addClass('drowopen').siblings().removeClass('drowopen');
                            $this.find('.drowmenu').stop(true).animate({'height' : num * 40}, 200)
                        }
                    }
                }else{
                    $navItem.eq(index).addClass('active').siblings().removeClass('active');

                    $this.addClass('active').siblings().removeClass('active').find('.drowmenu').removeClass('block');
                    $navItem.eq(index).addClass('active').siblings().removeClass('active').removeClass('drowopen').find('.drowmenu').css({'height' : '0'}).children('li').removeClass('active');
                    if($this.find('.drowmenu').length == 1) {
                        if($this.find('.drowmenu').hasClass('block')){
                            $this.find('.drowmenu').removeClass('block')
                        } else{
                            $this.find('.drowmenu').addClass('block')
                        }
                        var num = $navItem.eq(index).children('.drowmenu').children('li').length
                        $navItem.eq(index).addClass('drowopen')
                        $navItem.eq(index).children('.drowmenu').css({
                            'height' : num * 40
                        })
                    }
                }
                index == 0 ? $adminMes .addClass('nn') : $adminMes .removeClass('nn');
                
                //url && _vm.$router.push(url);
            },
            routerLinkTo: function($event){
                var _vm = this;
                var $this = $($event.currentTarget);
                var $dom = _vm.$dom;
                var url = $this.data('url')
                $event.stopPropagation()
                $dom.find('.drowmenu li').removeClass('active');
                $this.addClass('active');
                //url && _vm.$router.push(url);
            }
        }
    }

</script>
<style lang="scss" scoped>

</style>