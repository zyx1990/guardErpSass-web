// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store/';

//封装
import http from './http/index.js'
Vue.use(http);

//富文本
import VueQuillEditor from 'vue-quill-editor';
import token from 'utils/cache.js';
Vue.prototype.$token = token;

//ui框架
import iView from 'iview';
import './assets/style/theme/rest-iview.less';
Vue.use(iView);

//全局组件
import cmpt from 'components/index.js';
Vue.use(cmpt);


Vue.config.productionTip = false;
Vue.config.debug = true;

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: { App }
})