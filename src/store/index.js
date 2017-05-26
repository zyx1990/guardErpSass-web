import Vue from 'vue';
import Vuex from 'vuex';
Vue.use(Vuex);
import mutations from './mutations';
import actions from './actions';
//import getters from './getters';

//模块
import navLink from './modules/navLink';
import breadData from './modules/breadData';

export default new Vuex.Store({
    modules: {
        mutations,
        navLink,
        breadData
    },
    // 把actions导出去
    actions
});
