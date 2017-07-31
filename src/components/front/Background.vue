<template>
	<div class="headertop filter-nothing" style="height: auto;">
		<figure id="centerbg" class="centerbg">
		</figure>
	</div>
</template>
<script>
export default {
	mounted(){
    	this.autoHW(),
    	window.addEventListener('resize', this.autoHW)
    },
    methods: {
    	autoHW(){
    		document.querySelector('#centerbg').style.height = window.innerHeight+'px';
    	}
    }
}
</script>
<style lang='scss'>
	.headertop{
		position: relative;
    	overflow: hidden;
	    height: 0;
	    #centerbg {
		    width: 100%;
		    height: 550px;
		    margin: 0;
		    padding: 0;
		    background-image: url(../../assets/img/bg.jpg);
		    background-position: top center;
		    background-repeat: no-repeat;
		    background-attachment: fixed;
		    background-size: cover;
		    z-index: -1;
		}
	}
</style>