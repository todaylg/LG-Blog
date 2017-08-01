<template>
	<div class="contain">
		<Welcome></Welcome>
		<HeaderBar></HeaderBar>
		<Background></Background>
		<div id='content'>
		  <h1 id="blank">test</h1>
	      <h1>test</h1>
	      <h1>test</h1>
	      <h1>test</h1>
	      <h1>test</h1>
	      <h1>test</h1>
	      <h1>test</h1>
	      <h1>test</h1>
	      <h1>test</h1>
	      <h1>test</h1>
	      <h1>test</h1>
	      <h1>test</h1>
	      <h1>test</h1>
	      <h1>test</h1>
	      <h1>test</h1>
	      <h1>test</h1>
	      <h1>test</h1>
	      <h1>test</h1>
	      <h1>test</h1>
	      <h1>test</h1>
	      <h1>test</h1>
	      <h1>test</h1>
	      <h1>test</h1>
	      <h1>test</h1>
	      <h1>test</h1>
	      <h1>test</h1>
	      <h1>test</h1>
	      <h1>test</h1>
	      <h1>test</h1>
	      <h1>test</h1>
	      <h1>test</h1>
	      <h1>test</h1>
	      <h1>test</h1>
	      <h1>test</h1>
	      <h1>test</h1>
	      <h1>test</h1>
	      <h1>test</h1>
	      <h1>test</h1>
	      <h1>test</h1>
	      </div>
		<!-- <FooterBar></FooterBar> -->
	</div>
</template>
<script>
	import Welcome from './Welcome.vue';
	import HeaderBar from './HeaderBar.vue';
	import Background from './Background.vue';
	import FooterBar from './FooterBar.vue';
	
	export default{
		components: {Welcome, HeaderBar, Background, FooterBar}
	}
</script>
<style lang="scss">
 #content{
 	text-align:center;
 	opacity:0;
 	transform:translateY(400px);
 	transition: all 1s ease-in-out;
 }
 #blank{
 	padding-top:120px;
 }
</style>
