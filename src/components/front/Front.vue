<template>
	<div class="contain">
		<HeaderBar></HeaderBar>
		<router-view></router-view>	
		<FooterBar></FooterBar>
		<ScrollTop></ScrollTop>
	</div>
</template>
<script>
	import HeaderBar from './Share/HeaderBar.vue';
	import ScrollTop from './Share/ScrollTop.vue';
	import FooterBar from './Share/FooterBar.vue';
	
	export default{
		components: {HeaderBar, ScrollTop, FooterBar}
	}
</script>
<style lang="scss">

</style>
