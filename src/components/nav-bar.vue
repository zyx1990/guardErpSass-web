<template>
    <div id="nav-bar">
        <ul class="breadcrumb">
            <li v-for="nav in navBar" :data-url="nav.url" @click="toggleNav($event)">{{nav.text}}</li> 
        </ul>
    </div>
</template>

<script>
    var isinit = false;
    export default {
        name: 'nav-bar',
        data() {
            return {
            }
        },
        computed: {
            navBar: function() {
                //return this.$store.getters.getNavBar
            }
        },
        methods: {
            toggleNav : function($event){
            	var url = $($event).data('url');
                this.$router.push(url);
            }
        }
    }

</script>
<style lang="scss" scoped>

</style>