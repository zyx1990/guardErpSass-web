<template>
    <div class="layout-nav" ref="menu">
            <div class="nav-show js-nav-show" v-show="istoggle">
                <div class="nav-title">
                    <h2>锦医卫HRP</h2>
                    <span @click="meunToogle"></span>
                </div>
                <div class="admin-mes">
                    <h2>系统管理员</h2>
                    <span></span>
                </div>
                <ul class="nav-tree">
                    <!-- -->
                    <li class="nav-item" v-for="(firsts, index1) in navLinks" :class="{drowdown: firsts.child.length > 0}">
                        <em></em>
                        <h3 :class="firsts.imgClass" :data-url="firsts.url">{{firsts.name}}</h3>

                        <ol class="drowmenu" v-if="firsts.child.length > 0">
                            <li v-for="(seconds,index2) in firsts.child">{{seconds.name}}</li>
                        </ol>
                    </li>                   
                </ul>
            </div>


            <div class="nav-hidden" v-show="!istoggle">
                <div class="nav-hidden-tit"></div>
                <div class="nav-hidden-mes">
                    <span></span>
                    <em></em>
                </div>
                <ul class="nav-hidden-tree">
                    <li class="nav-item" v-for="(firsts, index1) in navLinks" :class="{drowdown: firsts.child.length > 0}">
                        <em></em>
                        <h3 :class="firsts.imgClass" :data-url="firsts.url" :data-name="firsts.name"></h3>

                        <ol class="drowmenu" v-if="firsts.child.length > 0">
                            <li v-for="(seconds,index2) in firsts.child">{{seconds.name}}</li>
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
            meunToogle: function(){
                this.istoggle = !this.istoggle;
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