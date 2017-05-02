<template>
  <div id="app">
       <router-view></router-view>
  </div>
</template>

<script>
	export default {
	    name: 'app'
	}
</script>

<style lang="scss">
/* ui框架 有自带rest样式*/ 
@import '~iview/dist/styles/iview.css';


/*公共样式*/
@import './assets/style/_commom.scss';

/* 模块样式*/
@import './assets/style/module/module.css';


</style>
