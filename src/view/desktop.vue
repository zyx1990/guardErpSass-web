<template>
    <div class="container-box desktop">
        <div class="container-body">
            <Row :gutter="80">
                <Col span="12">
                    <div class="main-box">
                        <div class="container-header">
                            <h2>常用菜单</h2>
                            <ul class="header-btn-group">
                                <li class="header-item" @click="setLink" data-url='/desktop/menu' data-name='设置常用菜单'><Icon type="gear-b"></Icon>设置</li>
                            </ul>
                        </div>
                        <div class="container-body">
                            {{msg}}
                        </div>
                    </div>
                    <div class="main-box">
                        <div class="container-header">
                            <h2>常用报表</h2>
                            <ul class="header-btn-group">
                                <li class="header-item" @click="setLink" data-url='/desktop/favorite' data-name='设置常用报表'><Icon type="gear-b"></Icon>设置</li>
                            </ul>
                        </div>
                        <div class="container-body">
                            {{msg}}
                        </div>
                    </div>
                </Col>
                <Col span="12">
                    <div class="main-box">
                        <div class="container-header">
                            <h2>我的信息</h2>
                        </div>
                        <div class="container-body">
                            {{msg}}
                        </div>
                    </div>
                    <div class="main-box">
                        <div class="container-header">
                            <h2>公告</h2>
                        </div>
                        <div class="container-body">
                            {{msg}}
                        </div>
                    </div>
                </Col>
            </Row>
        </div>
    </div>
</template>

<script>
    export default {
    	name: 'desktop',
        data: function() {
            return {
                msg: '111'
            }
        },
        methods: {
            setLink: function($event) {
                var _vm = this;
                var $this = $($event.currentTarget);
                var breadData = [
                    {
                        url: '/desktop',
                        text: '桌面'
                    }
                ];
                breadData.push({
                    url: $this.data('url') || '',
                    text: $this.data('name') || ''
                });
                this.$store.dispatch('setBreadData', breadData);
                this.$router.push($this.data('url'))
            }
        }
    }
</script>   

<style>
    .container-box.desktop .main-box {
        margin-bottom: 50px;
    }
</style>