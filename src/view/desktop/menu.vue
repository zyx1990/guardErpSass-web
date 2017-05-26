/**
 * 常用菜单页面
 */

<template>
    <div class="container-box">
        <div class="container-header">
            <h2>设置常用菜单</h2>
        </div>
        <div class="container-body">
            <Table stripe :columns="columns" :data="menuNav"></Table>
            <div class="footer-btnGroup">
                <Button type="primary" shape="circle" icon="checkmark">保存</Button>
                <Button type="primary" shape="circle" icon="android-arrow-back">返回</Button>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        data () {
            return {
                columns: [
                    {   
                        title: '序号',
                        type: 'index',
                        width: 60
                    },
                    {
                        title: '菜单',
                        key: 'name'
                    },
                    {
                        title: '设为常用菜单',
                        type: 'selection',
                        width: 60,
                        align: 'center'
                    }
                ]
            }
        },
        computed: {
            menuNav: function() {
                var data = []
                for(var i = 2; i < this.$store.getters.navLink.length; i++) {
                    data = $.merge(data, this.$store.getters.navLink[i].child)
                }
                return data
            }
        },
        methods: {
        }
    }
</script>