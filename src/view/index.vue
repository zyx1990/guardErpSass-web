<template>
    <div class="layout-box">
  		<div class="layout-main">
  			<div class="layout-container">
  				<cmptNavBar class="layout-breadcrumb"></cmptNavBar>
  				<div class="container-wrap">
  					 <router-view class="view"></router-view>
  				</div>
  			</div>
  		</div>
  		<cmptMeun class="layout-nav"></cmptMeun>
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

        }
    }

</script>