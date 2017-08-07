import Vue      from 'vue';
import Router   from 'vue-router';
import Home  from '../components/front/Home.vue';
import Login  from '../components/back/Login.vue';
import Articles  from '../components/front/Articles.vue';
import Category  from '../components/front/Category.vue';
import About  from '../components/front/About.vue';

Vue.use(Router);

export default new Router({
	mode: 'history',
	routes: [
		{path: '/', component: Home},
		{path: '/login', name:'login',component: Login},
		{path: '/articles/:aid', component: Articles},
		{path: '/category', component: Category},
		{path: '/about', component: About},
	]
});
