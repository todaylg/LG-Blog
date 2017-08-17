import Vue from 'vue';
import router   from '../router';

export default {
	welcomeComplete(){
		var bg = document.querySelector('#centerbg');
		var bz = document.querySelector('#bz');
		var yz = document.querySelector('#yz');
		Velocity(bg, {
			blur: [4,0]
		}, {
		    duration: 2000
		});
		Velocity(bz,{
			blur: 0,
			translateX:[0,10]
		},{
		    duration: 2500
		});
		Velocity(yz,{
			blur: 0,
			translateX:[0,-10]
		},{
			duration: 2500
		});
	},
	login ({commit}, payload) {
		return Vue.http.post('/api/userLogin', payload).then(response => {
			commit('SET_USER', response.data);
			router.go({name: 'admin'});
		});
	},
	getUserinfo({commit}){//todo findOne
		return Vue.http.get('/api/getUserinfo').then(response => {
		  	commit('SET_USER', response.data);
		  });
	},
	getArticle ({commit}, atitle) {//前台后台要不通用？？
		console.log('atitle:'+atitle);
		//这里get方法不行，先TODO再找原因，可能是中文作为参数不行？？？get 的params参数都会自动转为小写？
		return Vue.http.post('/api/getArticle', atitle).then(response => {
			commit('SET_ARTICLE', response.data);
		});
	},
	updateArticle({commit, state, dispatch}){
		return Vue.http.post('/api/updateArticle',state.article).then(response => {
			if (response.data.state === 1) {
				dispatch('getArticleList');
				alert('updateArticle成功');
			} else {
				alert('updateArticle失败');
			}
		});
	},
	delArticle({commit,dispatch}, id){
		return Vue.http.post('/api/delArticle',{id:id}).then(response => {
			if (response.data.state === 1) {
				dispatch('getArticleList');
				alert('del成功');
			} else {
				alert('del失败');
			}
		});
	},
	addArticle ({state}) {
		return Vue.http.post('/api/addArticle', state.article).then(response => {
			if (response.data.state === 1) {
				alert('保存成功');
			} else {
				alert('保存失败');
			}
		});
	},
	addCategory ({state,dispatch}) {
		return Vue.http.post('/api/addCategory', state.catEdit).then(response => {
			if (response.data.state === 1) {
				dispatch('getCatList');// why slow???
				alert('add成功');
			} else {
				alert('add失败');
			}
		});
	},
	delCategory ({state,dispatch},id) {
		return Vue.http.post('/api/delCategory',{id:id}).then(response => {
			if (response.data.state === 1) {
				dispatch('getCatList');
				alert('del成功');
			} else {
				alert('del失败');
			}
		});
	},
	updateCat({commit,dispatch}, payload){
		return Vue.http.post('/api/updateCat',payload).then(response => {
			if (response.data.state === 1) {
				dispatch('getCatList');
				alert('updateCat成功');
			} else {
				alert('updateCat失败');
			}
		});
	},
	getCatList ({commit}) {
		return Vue.http.get('/api/getCatList')
			.then(response => response.json())
			.then(catList  => {
				commit('SET_CATLIST', catList.data);
			});
	},
	getCat ({commit}, catname) {//显示当前分类目录的名称及简介
		return Vue.http.post('/api/getCat',catname)
			.then(response => response.json())
			.then((result) => {
				console.log('cat: '+result.data.name);
				commit('SET_CAT', result.data);
			});
	},
	getArticleList ({commit}, id) {
		return Vue.http.get('/api/getArticleList')
			.then(response => response.json())
			.then(articles => {
				commit('SET_ARTICLES', articles);
			});
	},
	getFrontArticleList({state, commit}, payload) {
		return Vue.http.get('/api/getFrontArticleList', {params: payload}).then(response => response.json()).then(articles => {
			console.log(articles);
			console.log(articles.length);
			if (articles.length != 0) {
				commit('SET_ARTICLELIST', articles);
			}
			if(articles.length >= 0&&articles.length <payload.limit){
				state.loadFlag = false;
			}
		});
	},
	getCatArticle({state, commit}, payload){
		return Vue.http.get('/api/getCatAticle',{params: payload}).then(response => response.json()).then(articles => {
			console.log(articles);
			console.log(articles.length);
			if (articles.length != 0) {
				commit('SET_CATATICLES', articles);
			}
			if(articles.length >= 0&&articles.length <payload.limit){
				state.loadFlag = false;
			}
		});
	},
	getCommentList({commit}) {
		console.log('getCommentList');
		return Vue.http.get('/api/getCommentList')
			.then(response => response.json())
			.then(commentList => {
				console.log('getCommentList  ok!:'+commentList);
				commit('SET_COMMENTLIST', commentList.data);
			});
	},
	delComment({state,dispatch},id) {
		return Vue.http.post('/api/delComment',{id:id}).then(response => {
			if (response.data.state === 1) {
				dispatch('getCommentList');
				alert('del成功');
			} else {
				alert('del失败');
			}
		});
	},
	getComment({commit}, atitle) {//显示当前文章下的评论列表
		return Vue.http.post('/api/getFrontComment',atitle)
			.then(response => response.json())
			.then((result) => {
				console.log('CommentCount: '+result.data.length);
				commit('SET_ARTICLECOMENT', result.data);
			});
	},
	addComment ({commit,dispatch},preload) {
		return Vue.http.post('/api/addComment', {comment:preload}).then(response => {
			if (response.data.state === 1) {
				//这里不应该重新再向服务器去取，而应该将返回回来的数据直接添加到本地即可（减少一次请求）
				commit('SET_ADDCOMMENT', response.data.data);
				console.log('addcomment: '+response.data.data.content);
				alert('添加成功');
			} else {
				alert('添加失败');
			}
		});
	},
};
