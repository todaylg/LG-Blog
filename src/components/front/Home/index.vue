<template>
	<div class="contain">
		<Welcome v-if="firstLoad"></Welcome>
		<transition name="fade">
			<Background v-show="!firstLoad"></Background>
		</transition>
		<ArticlesList></ArticlesList>
	</div>
</template>
<script>
	import {mapState} from 'vuex';
	import Welcome from '../Share/Welcome.vue';
	import Background from './Background.vue';
	import ArticlesList from './ArticlesList.vue';
	
	export default{
		beforeRouteLeave (to, from, next) {
			this.$store.state.loadFlag = true;
			this.$store.state.articleList = [];
			// window.removeEventListener('resize');
			// window.removeEventListener('scroll');   ERROR Method
			console.log("LeaveHome!! ");
			next();
		},
		components: {
			Welcome,
			Background,
			ArticlesList
		},
		computed:{
			...mapState(['firstLoad'])
		},
	}
</script>
<style lang="scss">
.fade-enter-active{
  transition: opacity .5s ease-in-out
}
.fade-enter{
  opacity: 0
}
 	// .contain:before{
 	// 	content: '';
	 //    display: block;
	 //    width: 1px;
	 //    height: 200%;
	 //    position: absolute;
	 //    left: 50%;
	 //    background: #eaeaea;
	 //    top: -50%;
	 //    z-index: 0;
 	// }
</style>
