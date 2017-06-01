<template>
    <div id="breadcrumb">
        <ul class="breadcrumb">
            <li v-for="(nav, index) in breadData" :data-url="nav.url" :data-index="index" @click="toggleNav"><span>{{nav.text}}</span></li> 
        </ul>
    </div>
</template>

<script>
    var isinit = false;
    export default {
        name: 'breadcrumb',
        props: ['title'],
        data() {
            return {
            }
        },
        watch: {
            title(val) {
                var _breadData = JSON.parse(window.sessionStorage[val])
                this.$store.dispatch('setBreadData', _breadData);
            }
        },
        mounted: function(){
            console.log(this.title +'组件通信方式')
        },
        computed: {
            breadData: function() {
                return this.$store.getters.getBreadData
            }
        },
        methods: {
            toggleNav : function($event){
            	var url = $($event.currentTarget).data('url');
                var index = $($event.currentTarget).data('index') + 1;
                this.breadData.splice(index)
                this.$store.dispatch('setBreadData', this.breadData);
                this.$router.push(url)
            }
        }
    }

</script>
<style lang="scss" scoped>

</style>