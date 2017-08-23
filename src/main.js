import Vue from 'vue';

import store from './store';
import router from './router';
import './style/common.scss';

Vue.filter('toDate', date => {
	const d = new Date(date);
	return d.getFullYear() + '年' +(d.getMonth() + 1) + '月' +d.getDate() + '日';
});

new Vue({
	el: '#app',
	router,
	store
});			