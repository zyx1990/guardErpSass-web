import cmptBreadcrumb from 'components/breadcrumb.vue';
import cmptMenu from 'components/menu.vue';
import cmptUeditor from 'components/Ueditor.vue';

const cmpt = {
    cmptBreadcrumb,
    cmptMenu,
    cmptUeditor
};

exports.install = function (Vue, options) { 

    Object.keys(cmpt).forEach(function(key) {
        Vue.component(key, cmpt[key]);
    });
}