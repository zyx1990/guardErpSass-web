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
                <li class="nav-item js-nav-item" v-for="(firsts, index1) in navLinks" :class="{drowdown: firsts.child.length > 0}" @click="childMeunToggle" :data-url="firsts.url" :data-name="firsts.name">
                    <em></em>
                    <span>
                        <h3 :class="firsts.imgClass" >{{firsts.name}}</h3>
                    </span>
                    <ul class="drowmenu" v-if="firsts.child.length > 0">
                        <li v-for="(seconds,index2) in firsts.child" :data-url="seconds.url" :data-name="seconds.name" @click="routerLinkTo">     <span>{{seconds.name}}</span>
                        </li>
                    </ul>
                </li>                   
            </ul>
        </div>
        <!-- 菜单显示字情况结束-->
        
        <!-- 菜单显示图标 开始-->
        <div class="nav-hidden js-nav-hidden" v-show="!istoggle">
            <div class="nav-hidden-tit" @click="meunToogle"></div>
            <div class="nav-hidden-mes">
                <span></span>
                <em></em>
            </div>
            <ul class="nav-hidden-tree">
                <li class="nav-hidden-item js-nav-hidden-item" v-for="(firsts, index1) in navLinks" @click="childMeunToggle" :data-url="firsts.url" :data-name="firsts.name">
                    <em></em>
                    <span>
                        <h3 :class="firsts.imgClass" ></h3>
                    </span> 
                    <div class="hidden-box" v-if="firsts.child.length > 0">                 
                        <ul class="drowmenu">
                            <li v-for="(seconds,index2) in firsts.child" :data-url="seconds.url" :data-name="seconds.name" @click="routerLinkTo">     <span>{{seconds.name}}</span>
                            </li>
                        </ul>
                    </div>
                </li>
            </ul>
        </div>
        <!-- 菜单显示图标 结束-->
    </div>
</template>

<script>
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


                var path = this.$route.path;
                var $currentLi = null;
                if(this.istoggle){
                    $currentLi = $dom.find('.js-nav-show').find('[data-url="'+path+'"]');
                }else{
                    $currentLi = $dom.find('.js-nav-hidden').find('[data-url="'+path+'"]');
                }
                //TODO 临时这么写
                this.selectLi($currentLi);

                var breadData =  this.getBreadData($currentLi, []).reverse();
                this.$store.dispatch('setBreadData', breadData);
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
                        $navHiddenItem.find('.hidden-box').removeClass('block');
                        $navHiddenItem.eq(index).find('.hidden-box').addClass('block')
                        if($this.hasClass('drowopen')) {
                            $this.removeClass('drowopen');
                            $this.find('.drowmenu').stop(true).animate({'height' : '0'}, 200)
                        } else {
                            var num = $this.find('.drowmenu li').length;
                            $this.addClass('drowopen').siblings().removeClass('drowopen');
                            $this.find('.drowmenu').stop(true).animate({'height' : num * 40}, 200)
                        }
                    }else{
                       $navItem.removeClass('drowopen');
                       $navItem.find('li').removeClass('active');
                    }
                }else{
                    $navItem.eq(index).addClass('active').siblings().removeClass('active');

                    $this.addClass('active').siblings().removeClass('active').find('.hidden-box').removeClass('block');
                    $navItem.eq(index).addClass('active').siblings().removeClass('active').removeClass('drowopen').find('.drowmenu').css({'height' : '0'}).children('li').removeClass('active');
                    if($this.find('.hidden-box').length == 1) {
                        if($this.find('.hidden-box').hasClass('block')){
                            $this.find('.hidden-box').removeClass('block')
                        } else{
                            $this.find('.hidden-box').addClass('block')
                        }
                        var num = $navItem.eq(index).children('.drowmenu').children('li').length
                        $navItem.eq(index).addClass('drowopen')
                        $navItem.eq(index).children('.drowmenu').css({
                            'height' : num * 40
                        })
                    }
                }
                index == 0 ? $adminMes .addClass('nn') : $adminMes .removeClass('nn');

                if(url){
                    var breadData =  _vm.getBreadData($this, []).reverse();
                    this.$store.dispatch('setBreadData', breadData);
                    _vm.$router.push(url)
                }

                if($this.parent().hasClass('nav-hidden-tree')) {
                    if($this.offset().top + 350 > parseInt($dom.css('height'))) {
                        $navHiddenItem.find('.hidden-box').css({
                            "top" : '-275px'
                        })
                    } else {
                        $navHiddenItem.find('.hidden-box').css({
                            "top" : '0'
                        })
                    }

                }
            },
            routerLinkTo: function($event){
                var _vm = this;
                var $this = $($event.currentTarget);
                var $dom = _vm.$dom;
                var url = $this.data('url')
                $event.stopPropagation()
                $dom.find('.drowmenu li').removeClass('active');
                $this.addClass('active');
                if(url){
                    var breadData =  _vm.getBreadData($this, []).reverse();
                    this.$store.dispatch('setBreadData', breadData);
                    _vm.$router.push(url);
                }
            },
            getBreadData: function($currentLi, breadData){
                breadData.push({
                        url: $currentLi.data('url') || '',
                        text: $currentLi.data('name') || ''
                    });
                if($currentLi.data('url') != '/desktop'){
                    breadData.push({
                        url: '/desktop',
                        text: '桌面'
                    });
                }
                return breadData;
            },
            selectLi: function($currentLi){
                var $li = $currentLi.closest('ul').closest('li');
                if($li.length > 0 ){
                    console.log($li.data('name'));
                    $li.trigger('click');
                }
                $currentLi.trigger('click');

            }
        }
    }

</script>
<style lang="scss" scoped>

</style>