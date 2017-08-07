<template>
	<div class="contain">
		<!-- <Welcome></Welcome> -->
		<HeaderBar></HeaderBar>
		<Background></Background>
		<ArticlesList></ArticlesList>
		<!-- <FooterBar></FooterBar> -->
	</div>
</template>
<script>
	import Welcome from './Welcome.vue';
	import HeaderBar from './HeaderBar.vue';
	import Background from './Background.vue';
	import ArticlesList from './ArticlesList.vue';
	//import FooterBar from './FooterBar.vue';
	
	export default{
		components: {Welcome, HeaderBar, Background, ArticlesList}
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
