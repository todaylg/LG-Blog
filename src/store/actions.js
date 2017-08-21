import axios from 'axios';
import router from '../router';

const instance = axios.create();
instance.defaults.headers.post['Content-Type'] = 'application/json';
if(localStorage.getItem('token')){
	instance.defaults.headers.common['Authorization'] = 'Bearer '+localStorage.getItem('token');
}
// axios拦截请求
axios.interceptors.request.use = instance.interceptors.request.use;

const beginLoading = (commit,flag) => {
	flag? commit('LOADMORE_TOGGLE', true):commit('LOADING_TOGGLE', true);
	return Date.now();
};
//flag = true =>LOADMORE_TOGGLE
//timeAllow代表最短Loading动画时间
const stopLoading = (commit, start, flag, timeAllowed = 500) => {
	const spareTime = timeAllowed - (Date.now() - start);
	setTimeout(commit, spareTime > 0 ? spareTime : 0, flag? 'LOADMORE_TOGGLE':'LOADING_TOGGLE', false);
};

const doToast = (state, commit, payload) => {
	commit('SET_TOAST', payload);
	commit('TOASTING_TOGGLE', true);
	return state.toast.promise;
};
//学习！！TODO 来波async/await
Promise.prototype.finally = function (callback) {
	return this.then(
		value => Promise.resolve(callback()).then(() => value),
		reason => Promise.resolve(callback()).then(() => {
			throw reason;
		})
	);
};

export default {
	// welcomeComplete(){
	// 	var bg = document.querySelector('#centerbg');
	// 	var bz = document.querySelector('#bz');
	// 	var yz = document.querySelector('#yz');
	// 	Velocity(bg, {
	// 		blur: [4,0]
	// 	}, {
	// 	    duration: 2000
	// 	});
	// 	Velocity(bz,{
	// 		blur: 0,
	// 		translateX:[0,10]
	// 	},{
	// 	    duration: 2500
	// 	});
	// 	Velocity(yz,{
	// 		blur: 0,
	// 		translateX:[0,-10]
	// 	},{
	// 		duration: 2500
	// 	});
	// },
	login ({commit}, payload) {
		return axios.post('/api/userLogin', payload).then(response => {
			commit('SET_USER', response.data);
			router.push({name: 'admin'});
		});
	},
	getUserinfo({commit}){//todo findOne
		return axios.get('/api/getUserinfo').then(response => {
		  	commit('SET_USERINFO', response.data);
		  });
	},
	getArticle ({commit}, atitle) {//前台后台要不通用？？不能通用，因为前台访问涉及访问量的增加
		const start = beginLoading(commit, false);
		console.log('atitle:'+atitle);
		//这里get方法不行，先TODO再找原因，可能是中文作为参数不行？？？get 的params参数都会自动转为小写？
		return axios.post('/api/getArticle', atitle).then(response => {
			stopLoading(commit, start, false);
			commit('SET_ARTICLE', response.data);
		});
	},
	getFrontArticle ({commit}, atitle) {//前台访问单篇文章
		//const start = beginLoading(commit, false);
		console.log('atitle:'+atitle.atitle);
		return axios.post('/api/getFrontArticle', atitle).then(response => {
			//stopLoading(commit, start, false);
			commit('SET_ARTICLE', response.data);
		});
	},
	updateArticle({commit, state, dispatch}){
		return axios.post('/api/updateArticle',state.article).then(response => {
			if (response.data.state === 1) {
				dispatch('getArticleList');
				alert('updateArticle成功');
			} else {
				alert('updateArticle失败');
			}
		});
	},
	delArticle({commit,dispatch}, id){
		return axios.post('/api/delArticle',{id:id}).then(response => {
			if (response.data.state === 1) {
				dispatch('getArticleList');
				alert('del成功');
			} else {
				alert('del失败');
			}
		});
	},
	addArticle ({state}) {
		return axios.post('/api/addArticle', state.article).then(response => {
			if (response.data.state === 1) {
				alert('保存成功');
			} else {
				alert('保存失败');
			}
		});
	},
	addCategory ({state,dispatch}) {
		return axios.post('/api/addCategory', state.catEdit).then(response => {
			if (response.data.state === 1) {
				dispatch('getCatList');// why slow???
				alert('add成功');
			} else {
				alert('add失败');
			}
		});
	},
	delCategory ({state,dispatch},id) {
		return axios.post('/api/delCategory',{id:id}).then(response => {
			if (response.data.state === 1) {
				dispatch('getCatList');
				alert('del成功');
			} else {
				alert('del失败');
			}
		});
	},
	updateCat({commit,dispatch}, payload){
		return axios.post('/api/updateCat',payload).then(response => {
			if (response.data.state === 1) {
				dispatch('getCatList');
				alert('updateCat成功');
			} else {
				alert('updateCat失败');
			}
		});
	},
	getCatList ({commit}) {
		return axios.get('/api/getCatList')
			.then(catList  => {
				commit('SET_CATLIST', catList.data);
			});
	},
	getCat ({commit}, catname) {//显示当前分类目录的名称及简介
		return axios.post('/api/getCat',catname)
			.then((result) => {
				console.log('cat: '+result.data.name);
				commit('SET_CAT', result.data);
			});
	},
	getArticleList ({commit}, id) {
		return axios.get('/api/getArticleList')
			.then(articles => {
				commit('SET_ARTICLES', articles.data);
			});
	},
	getFrontArticleList({state, commit}, payload) {
		if(payload.page ===1){//首次取文章(附带加载 Home Animation)
			const start = beginLoading(commit,false);
			return axios.get('/api/getFrontArticleList', {params: payload}).then(articles => {
				let length = articles.data.length;
				console.log(articles.data);
				console.log(length);
				if (length != 0) {
					commit('SET_ARTICLELIST', articles.data);
				}
				if(length >= 0&&length <payload.limit){
					commit('NOMORE_TOGGLE', true);
				}
				stopLoading(commit, start , false);
			});
		}else{//LoadMore
			const start = beginLoading(commit,true);
			return axios.get('/api/getFrontArticleList', {params: payload}).then(articles => {
				let length = articles.data.length;
				console.log(articles.data);
				console.log(length);
				if (length != 0) {
					commit('SET_ARTICLELIST', articles.data);
				}
				if(length >= 0&&length <payload.limit){
					commit('NOMORE_TOGGLE', true);
				}
				stopLoading(commit, start , true);
			});
		}
		
	},
	getCatArticle({state, commit}, payload){
		if(payload.page ===1){//首次取文章
			const start = beginLoading(commit,false);
			return axios.get('/api/getCatAticle',{params: payload}).then(articles => {
				let length = articles.data.length;
				console.log(articles.data);
				console.log(length);
				if (length != 0) {
					commit('SET_CATATICLES', articles.data);
				}
				if(length >= 0&&length <payload.limit){
					commit('NOMORE_TOGGLE', true);
				}
				stopLoading(commit, start , false);
			});
		}else{//LoadMore
			const start = beginLoading(commit,true);
			return axios.get('/api/getCatAticle',{params: payload}).then(articles => {
				let length = articles.data.length;
				console.log(articles.data);
				console.log(length);
				if (length != 0) {
					commit('SET_CATATICLES', articles.data);
				}
				if(length >= 0&&length <payload.limit){
					commit('NOMORE_TOGGLE', true);
				}
				stopLoading(commit, start , true);
			});
		}
	},
	getCommentList({commit}) {
		console.log('getCommentList');
		return axios.get('/api/getCommentList')
			.then(commentList => {
				console.log('getCommentList  ok!:'+commentList);
				commit('SET_COMMENTLIST', commentList.data);
			});
	},
	delComment({state,dispatch},id) {
		return axios.post('/api/delComment',{id:id}).then(response => {
			if (response.data.state === 1) {
				dispatch('getCommentList');
				alert('del成功');
			} else {
				alert('del失败');
			}
		});
	},
	getComment({commit}, atitle) {//显示当前文章下的评论列表
		return axios.post('/api/getFrontComment',atitle)
			.then((result) => {
				console.log('CommentCount: '+result.data.length);
				commit('SET_ARTICLECOMENT', result.data);
			});
	},
	addComment ({state, commit, dispatch},preload) {
		return doToast(state, commit, {info: '确定添加评论吗?', btnNum: 2})
			.then(() => axios.post('/api/addComment', {comment:preload}))
			.then(
			 	() => doToast(state, commit, {info: '保存成功', btnNum: 1}),
				() => doToast(state, commit, {info: '保存失败', btnNum: 1})
			)
			.finally(() => commit('TOASTING_TOGGLE', false))
			.then(() => {
				console.log('preload.atitle:'+preload.atitle);
				dispatch('getComment',{atitle:preload.atitle});
				state.article.comment_count++;
			})
			.catch((err) => {console.log(err);});
	},
};
