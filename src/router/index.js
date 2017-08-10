import Vue      from 'vue';
import Router   from 'vue-router';

import Front  from '../components/front/Front.vue';
import Home  from '../components/front/Home.vue';
import Articles  from '../components/front/Articles.vue';
import Category  from '../components/front/Category.vue';
import About  from '../components/front/About.vue';

import Login  from '../components/back/Login.vue';
import Dashboard  from '../components/back/Dashboard.vue';
import ArticleCreate  from '../components/back/ArticleCreate.vue';
import CategoryEdit  from '../components/back/CategoryEdit.vue';
import ArticleList  from '../components/back/ArticleList.vue';

Vue.use(Router);

// 滚动条滚回顶部
// const scrollBehavior =(to, from, savedPosition)=> {
// 	if (savedPosition) {
// 		return savedPosition;
// 	} else {
// 		return { x: 0, y: 0 }
// 	}
// }

var router = new Router({
	mode: 'history',
	//访问不需要权限的设置路由元信息meta:false
	routes: [
		{
			path: '/', 
			component: Front,
			children:[
				{
					path: '', component:Home, meta:{auth:false}
				},
				{
					path: 'home', component:Home, meta:{auth:false}
				},
				{
					path: 'articles/:aid', component: Articles, meta:{auth:false}
				},
				{
					path: 'category', component: Category, meta:{auth:false}
				},
				{
					path: 'about', component: About, meta:{auth:false}
				},
			]
		},
		{
			path: '/login', name:'login',component: Login, meta:{auth:false}
		},
		{
			path:'/admin',
			component:Dashboard,
			children:[
			  	{
			  		path:'',component:ArticleList
			  	},
			  	{
					path:'articleList',component:ArticleList
			  	},
				// {
				// 	path:'userInfoEdit',component:userInfoEdit
				// },
				// {
				// 	path:'commentEdit',component:commentEdit
				// },
			 //  	{
			 //  		path:'articleEdit/:postId',component:ArticleEdit
			 //  	},
			  	{
			  		path:'articleCreate',component:ArticleCreate
				},
			  	{
			  		path:'categoryEdit',component:CategoryEdit
			  	},
			]
		},
		// {
		// 	path:'*',component:NotFound
		// }
	]
});

// 路由钩子
// router.beforeEach(({meta,path},from,next)=>{
// 	//store.dispatch('showProgress',0)
// 	let {auth=true}=meta
// 	// let isLogin = Boolean(store.state.token)

// 	// if(auth&&!isLogin&&path!=='/login'){
// 	// 	return next({path:'/login'})	
// 	// }
// 	// // 如果登录了以后再访问reg和login则路由到Home
// 	// if(isLogin&&(path=='/login'||path=='/reg')){
// 	// 	return next({path:'/admin'});
// 	// }
// 	// 未登录的情况下访问reg则直接路由
// 	next();
// })

export default router;