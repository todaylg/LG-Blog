import Vue      from 'vue';
//import Store    from '../store';
import Router   from 'vue-router';

import Front  from '../components/front/Front.vue';
import Home  from '../components/front/Home/index.vue';
import Article  from '../components/front/Article/index.vue';
import Category  from '../components/front/Category/index.vue';
import About  from '../components/front/About/index.vue';

import Login  from '../components/back/Login.vue';
import Dashboard  from '../components/back/Dashboard.vue';
import ArticleCreate  from '../components/back/ArticleCreate.vue';
import CategoryEdit  from '../components/back/CategoryEdit.vue';
import ArticleList  from '../components/back/ArticleList.vue';
import UserInfoEdit  from '../components/back/userInfoEdit.vue';
import ArticleEdit  from '../components/back/ArticleEdit.vue';
import CommentEdit  from '../components/back/CommentEdit.vue';

//import Loading  from '../components/front/Share/Loading.vue';
//import Toast  from '../components/front/Share/Toast.vue';

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
					path: '', component:Home, name:'home', meta:{auth:false}
				},
				{
					path: 'home', component:Home, meta:{auth:false}
				},
				{
					path: 'article/:atitle', component: Article, name:'article',meta:{auth:false}
				},
				{
					path: 'category/:catname', component: Category, name:'category', meta:{auth:false}
				},
				{
					path: 'about', component: About, name:'about', meta:{auth:false}
				},
			]
		},
		{
			path: '/login', name:'login',component: Login, meta:{auth:false}
		},
		{
			path:'/admin',
			name:'admin',
			component:Dashboard,
			children:[
			  	{
			  		path:'',component:ArticleList,name:'admin'
			  	},
			  	{
					path:'articleList',component:ArticleList,name:'adminArticleList'
			  	},
				{
					path:'userInfoEdit',component:UserInfoEdit,name:'adminUserInfoEdit'
				},
				{
					path:'commentEdit',component:CommentEdit
				},
			  	{
			  		path:'articleEdit/:atitle', component:ArticleEdit, name:'adminArticleEdit'
			  	},
			  	{
			  		path:'articleCreate',component:ArticleCreate, name:'adminArticleCreate'
				},
			  	{
			  		path:'categoryEdit',component:CategoryEdit,name:'adminCategoryEdit'
			  	},
			]
		},

		{
			path:'*',component:Home//todo 404
		}
	]
});

// 路由钩子
router.beforeEach(({meta}, from, next) => {
	let {goTop=true}=meta;
	if (goTop) {
		window.scrollTo(0, 0); 
	}
	next();
});
// router.beforeEach(({meta,path},from,next)=>{
// 	let {auth=true}=meta;
// 	let isLogin = Boolean(Store.state.token);

// 	if(auth&&!isLogin&&path!=='/login'){
// 		return next({path:'/login'});	
// 	}
// 	// 如果登录了以后再访问reg和login则路由到Home
// 	if(isLogin&&path=='/login'){
// 		return next({path:'/admin'});
// 	}
// 	//未登录的情况下访问reg则直接路由
// 	next();
// });
//import Store    from '../store';

export default router;