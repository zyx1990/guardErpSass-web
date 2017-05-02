import Vue from 'vue'
import Router from 'vue-router'


Vue.use(Router)

var router = new Router({
  routes: [
    {
        path: '/',
        redirect: '/login'
    },
    {
        path: '/login',
        component: resolve => require(['view/login.vue'], resolve)
    }
  ]
});

router.beforeEach((to, from, next) => {
    // var isLogin = store.getters.getIsLogin;
    // var user = window.sessionStorage.getItem('user');
    // if (!user) {
    //     if (to.path !== '/login') {
    //         return next({ path: '/login' });
    //     } else {
    //         window.sessionStorage.removeItem('user');
    //         next();
    //     }
    // } else { 
    //     store.dispatch('toggleLogin', true)
    //     next();
    // }
     next();

});

router.afterEach((to, from, next) => { 

});

export default router;