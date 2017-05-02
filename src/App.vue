<template>
  <div id="app">
   <keep-alive>
        <router-view class="view"></router-view>
    </keep-alive>
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

</style>
