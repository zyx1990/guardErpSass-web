<template>
    <div id="breadcrumb">
        <ul class="breadcrumb">
            <li v-for="nav in breadData" :data-url="nav.url" @click="toggleNav"><span>{{nav.text}}</span></li> 
        </ul>
    </div>
</template>

<script>
    var isinit = false;
    export default {
        name: 'breadcrumb',
        data() {
            return {
            }
        },
        computed: {
            breadData: function() {
                return this.$store.getters.getBreadData
            }
        },
        methods: {
            toggleNav : function($event){
            	var url = $($event.currentTarget).data('url');
                console.log(url);
                // url && this.$router.push(url);
            }
        }
    }

</script>
<style lang="scss" scoped>

</style>