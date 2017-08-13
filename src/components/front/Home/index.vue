<template>
	<div class="contain">
		<!-- <Welcome></Welcome> -->
		<Background></Background>
		<ArticlesList></ArticlesList>
		<ScrollTop></ScrollTop>
	</div>
</template>
<script>
	//import Welcome from '../Share/Welcome.vue';
	import ScrollTop from '../Share/ScrollTop.vue';
	import Background from './Background.vue';
	import ArticlesList from './ArticlesList.vue';
	
	export default{
		components: {
			//Welcome,
			Background,
			ArticlesList,
			ScrollTop
		}
	}
</script>
<style lang="scss">
 	.contain:before{
 		content: '';
	    display: block;
	    width: 1px;
	    height: 200%;
	    position: absolute;
	    left: 50%;
	    background: #eaeaea;
	    top: -50%;
	    z-index: 0;
 	}
</style>
