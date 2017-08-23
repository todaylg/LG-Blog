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
</style>
