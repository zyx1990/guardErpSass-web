<template>
    <div class="layout-box" ref="layoutBox">
  		<div class="layout-main">
  			<div class="layout-container js-layout-container">
  				<cmptNavBar class="layout-breadcrumb"></cmptNavBar>
  				<div class="container-wrap">
  					 <router-view class="view"></router-view>
  				</div>
  			</div>
  		</div>
  		<cmptMeun class="layout-nav" @on-click-toggle="meunToogle"></cmptMeun>
  	</div>
</template>

<script>
	import cmptNavBar from 'components/nav-bar.vue';
	import cmptMeun from 'components/menu.vue';

    export default {
        data() {
            return {

            }
        },
        components: {
            cmptNavBar,
            cmptMeun
        },
        methods: {
          meunToogle: function(istoggle){
            var _vm = this,
            $dom = $(_vm.$refs.layoutBox),
            $layoutContainer = $dom.find('.js-layout-container');
            if(istoggle){
              $layoutContainer.stop(true).animate({'margin-left' : '50px'}, 200);
            }else{
              $layoutContainer.stop(true).animate({'margin-left' : '200px'}, 200);
            }
          }
        }
    }

</script>