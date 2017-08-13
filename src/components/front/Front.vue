<template>
	<div class="contain">
		<HeaderBar></HeaderBar>
		<router-view></router-view>	
		<!-- <FooterBar></FooterBar> -->
	</div>
</template>
<script>
	import HeaderBar from './Share/HeaderBar.vue';
	//import FooterBar from './Share/FooterBar.vue';
	
	export default{
		components: {HeaderBar}
	}
</script>
<style lang="scss">

</style>
