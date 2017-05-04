<template>
    <div class="desktop">{{msg}}</div>
</template>
<script>
    export default {
    	name: 'desktop',
        data: function() {
            return {
                msg: '111'
            }
        },
        mounted: function(){
        	this.$nextTick(function(){
        		console.log('1111');
        		$(window).resize(function(){
        			console.log('222444');
        		})
        		$(this.$el).resize(function(){
        			console.log('222');
        		});
        	});
        }
    }
</script>   