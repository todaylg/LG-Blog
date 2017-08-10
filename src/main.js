import Vue from 'vue';
import VueResource  from 'vue-resource';

import store from './store';
import router from './router';
import './style/index.scss';

Vue.use(VueResource);

Vue.filter('toDate', date => {
	const d = new Date(date);
	return d.getFullYear() + '年' +(d.getMonth() + 1) + '月' +d.getDate() + '日';
});

//JWT  客户端发送请求
Vue.http.interceptors.push((request, next) => {
	if (window.localStorage.getItem('token')) {
 		request.headers.set('authorization', 'Bearer ' + window.localStorage.getItem('token'));
	}
	next((response) => {//token无效后
		if (response.status === 401) {
			router.go({name: 'login'});
		}
		return response;
	});
});

new Vue({
	el: '#app',
	router,
	store
});			