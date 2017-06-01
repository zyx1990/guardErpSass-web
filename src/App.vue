<template>
  <div id="app">
       <router-view></router-view>
  </div>
</template>

<script>
	export default {
	    name: 'app',
	    watch: {
        '$route':'router'
      },
      methods:{
      	router: function(){
      		//console.log('路由监听 如果写在嵌套路由中初始化第一次无法监听， 在app文件中可以监听');
      	}
      }
	}
</script>

<style lang="scss">
/* ui框架 有自带rest样式*/ 
@import '~iview/dist/styles/iview.css';
@import './assets/style/theme/rest-iview.css';

/*公共样式*/
@import './assets/style/_commom.scss';

/* 模块样式*/
@import './assets/style/module/module.css';

@import './assets/style/_base.scss';

</style>
