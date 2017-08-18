<template>
	<div class="contain">
		<HeaderBar></HeaderBar>
    <!--实际上线-->
		<!-- <router-view v-show="!isLoading"></router-view>
		<Loading v-show="isLoading"></Loading>	 -->
    <router-view></router-view>
		<FooterBar></FooterBar>
		<Toast v-show="isToasting"></Toast>	
		<ScrollTop></ScrollTop>
	</div>
</template>
<script>
import {mapState} from 'vuex';
import HeaderBar from './Share/HeaderBar.vue';
import ScrollTop from './Share/ScrollTop.vue';
import FooterBar from './Share/FooterBar.vue';
import Loading from './Share/Loading.vue';
import Toast from './Share/Toast.vue';

export default{
	components: {HeaderBar, ScrollTop, FooterBar, Loading, Toast},
	computed: {
        ...mapState(['isLoading','isToasting'])
    }
}
</script>
<style lang="scss">

</style>
