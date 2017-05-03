import Vue from 'vue'
import Router from 'vue-router'


Vue.use(Router);

//前面最好把路由相关信息抽出来 避免new Router 过于庞大

var router = new Router({
    routes: [
        {
            path: '/',
            redirect: '/login'
        }, {
            path: '/desktop',
            component: resolve => require(['view/index.vue'], resolve),
            children: [
                {
                    path: '',
                    component(resolve) {
                        require.ensure(['view/desktop'], () => {
                            resolve(require('view/desktop'));
                        });
                    }
                },                
                {
                    path: '/customermange',
                    component(resolve) {
                        require.ensure(['view/customermange'], () => {
                            resolve(require('view/customermange'));
                        });
                    }
                }
            ]
        }, {
            path: '/login',
            component: resolve => require(['view/login.vue'], resolve)
        }
    ],
    scrollBehavior(to, from, savedPosition) {
        // 在按下 后退/前进 按钮时，就会像浏览器的原生表现那样
        if (savedPosition) {
            return savedPosition;
        }
        // 滚动到锚点
        if (to.hash) {
            return {
                selector: to.hash
            };
        }
        // 让页面滚动到顶部
        return {
            x: 0,
            y: 0
        }
    }

});


//路由进入前后事件
router.beforeEach((to, from, next) => {
    //防止没有登录直接登录主页面
    var user = window.sessionStorage.getItem('userAccount');

    if(!user){
        if(to.path !== '/login'){
            return next({ path: '/login' });
        }else{
            next();
        }       
    }else{
        if(to.path == '/login'){
            window.sessionStorage.removeItem('userAccount');
        }
        next();
    }
});

router.afterEach((to, from, next) => {

});

export default router;