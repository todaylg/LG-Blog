import Vue      from 'vue';
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
import UserInfoEdit  from '../components/back/UserInfoEdit.vue';
import ArticleEdit  from '../components/back/ArticleEdit.vue';
import CommentEdit  from '../components/back/CommentEdit.vue';


import NotFound  from '../components/share/NotFound.vue';
//import Loading  from '../components/front/Share/Loading.vue';
//import Toast  from '../components/front/Share/Toast.vue';

Vue.use(Router);

var router = new Router({
	mode: 'history',
	//访问不需要权限的设置路由元信息meta:false
	scrollBehavior (to, from, savedPosition) {
	    if (to.hash) {
	        return {
	            selector: to.hash
	        };
	    } else {
	        return {x: 0, y: 0};
	    }
	},
	routes: [
		{
			path: '/', 
			component: Front,
			children:[
				{
					path: '', component:Home, name:'home', meta:{auth:false,title: '首页'}
				},
				{
					path: 'home', component:Home, meta:{auth:false,title: '首页'}
				},
				{
					path: 'article/:atitle', component: Article, name:'article',meta:{auth:false,title: '文章'}
				},
				{
					path: 'category/:catname', component: Category, name:'category', meta:{auth:false,title: '分类'}
				},
				{
					path: 'about', component: About, name:'about', meta:{auth:false,title: '关于'}
				},
			]
		},
		{
			path: '/login', name:'login',component: Login, meta:{auth:false,title: '登录'}
		},
		{
			path:'/admin',
			name:'admin',
			component:Dashboard,
			children:[
			  	{
			  		path:'',component:ArticleList,name:'admin',meta: {title: '后台管理'}
			  	},
			  	{
					path:'articleList',component:ArticleList,name:'adminArticleList',meta: {title: '文章列表'}
			  	},
				{
					path:'userInfoEdit',component:UserInfoEdit,name:'adminUserInfoEdit',meta: {title: '个人信息'}
				},
				{
					path:'commentEdit',component:CommentEdit,meta: {title: '评论管理'}
				},
			  	{
			  		path:'articleEdit/:atitle', component:ArticleEdit, name:'adminArticleEdit',meta: {title: '文章编辑'}
			  	},
			  	{
			  		path:'articleCreate',component:ArticleCreate, name:'adminArticleCreate',meta: {title: '新建文章'}
				},
			  	{
			  		path:'categoryEdit',component:CategoryEdit,name:'adminCategoryEdit',meta: {title: '分类管理'}
			  	},
			]
		},
		{
			path:'*',component:NotFound
		}
	]
});

router.beforeEach(({meta,path},from,next)=>{
	document.title = 'LG-Blog| '+meta.title;
	let {auth=true}=meta;
	let isLogin = Boolean(localStorage.getItem('token'));
	console.log('isLogin'+isLogin);
	//访问要登录但是又没登录的情况转到login
	if(auth&&!isLogin&&path!=='/login'){
		return next({name:'login'});	
	}
	// 登录了以后访问login则路由到admin
	if(isLogin&&path=='/login'){
		return next({name:'admin'});
	}
	next();
});

export default router;