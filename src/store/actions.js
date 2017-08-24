import axios from 'axios';
import router from '../router';

const beginLoading = (commit,flag) => {
	flag? commit('LOADMORE_TOGGLE', true):commit('LOADING_TOGGLE', true);
	return Date.now();
};
//flag = true =>LoadMore
//		false =>Loading
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
//学习！！TODO 
Promise.prototype.finally = function (callback) {
	return this.then(
		value => Promise.resolve(callback()).then(() => value),
		reason => Promise.resolve(callback()).then(() => {
			throw reason;
		})
	);
};

export default {
	login ({commit}, payload) {
		return axios.post('/api/userLogin', payload).then(response => {
			commit('SET_USER', response.data);
		});
	},
	logoutUser({commit, state, dispatch}) {
		return doToast(state, commit, {info: '确定注销吗?', btnNum: 2})
			.then(
			 	() => doToast(state, commit, {info: '注销成功', btnNum: 1})
			)
			.finally(() => commit('TOASTING_TOGGLE', false))
			.then(() => {
				commit('LOUGOUT_USER');
				router.push({name: 'login'});
			})
			.catch((err) => {console.log(err);});
	},
	getUserinfo({commit}){//todo findOne
		return axios.get('/api/getUserinfo').then(response => {
		  	commit('SET_USERINFO', response.data);
		  });
	},
	changePwd({commit, state, dispatch}, payload) {
		return doToast(state, commit, {info: '确定更改密码吗?', btnNum: 2})
			.then(()=> axios.post('/api/changePwd', payload))
			.then(
			 	() => doToast(state, commit, {info: '更改密码成功', btnNum: 1})
			)
			.finally(() => commit('TOASTING_TOGGLE', false))
			.then(() => {
				commit('LOUGOUT_USER');
				router.push({name: 'login'});
			})
			.catch((err) => {console.log(err);});
	},
	getArticle ({commit}, atitle) {
		const start = beginLoading(commit, false);
		return axios.post('/api/getArticle', atitle).then(response => {
			stopLoading(commit, start, false);
			commit('SET_ARTICLE', response.data);
		});
	},
	getFrontArticle ({commit}, atitle) {//前台访问单篇文章
		//const start = beginLoading(commit, false);
		return axios.post('/api/getFrontArticle', atitle).then(response => {
			//stopLoading(commit, start, false);
			commit('SET_ARTICLE', response.data);
		});
	},
	updateArticle({commit, state, dispatch}){
		return doToast(state, commit, {info: '确定修改文章吗?', btnNum: 2})
			.then(()=> axios.post('/api/updateArticle',state.article))
			.then(
			 	() => doToast(state, commit, {info: '修改文章成功', btnNum: 1})
			)
			.finally(() => commit('TOASTING_TOGGLE', false))
			.then(() => {
				dispatch('getArticleList');
			})
			.catch((err) => {console.log(err);});
	},
	delArticle({commit, state, dispatch}, id){
		return doToast(state, commit, {info: '确定删除文章吗?', btnNum: 2})
			.then(()=> axios.post('/api/delArticle',{id:id}))
			.then(
			 	() => doToast(state, commit, {info: '删除文章成功', btnNum: 1})
			)
			.finally(() => commit('TOASTING_TOGGLE', false))
			.then(() => {
				dispatch('getArticleList');
			})
			.catch((err) => {console.log(err);});
	},
	addArticle ({state,commit,dispatch}) {
		return doToast(state, commit, {info: '确定添加文章吗?', btnNum: 2})
			.then(()=> axios.post('/api/addArticle', state.article))
			.then(
			 	() => doToast(state, commit, {info: '添加文章成功', btnNum: 1})
			)
			.finally(() => commit('TOASTING_TOGGLE', false))
			.then(() => {
				router.push({name: 'admin'});
			})
			.catch((err) => {console.log(err);});
	},
	addCategory ({state,commit,dispatch}) {
		return doToast(state, commit, {info: '确定添加分类吗?', btnNum: 2})
			.then(()=> axios.post('/api/addCategory', state.catEdit))
			.then(
			 	() => doToast(state, commit, {info: '添加分类成功', btnNum: 1})
			)
			.finally(() => commit('TOASTING_TOGGLE', false))
			.then(() => {
				dispatch('getCatList');
			})
			.catch((err) => {console.log(err);});
	},
	delCategory ({state,commit,dispatch},id) {
		return doToast(state, commit, {info: '确定删除该分类吗?', btnNum: 2})
			.then(()=> axios.post('/api/delCategory',{id:id}))
			.then(
				() => doToast(state, commit, {info: '删除分类成功', btnNum: 1})
			)
			.finally(() => commit('TOASTING_TOGGLE', false))
			.then(() => {
				dispatch('getCatList');
			})
			.catch((err) => {console.log(err);});
	},
	updateCat({state,commit,dispatch}, payload){
		return doToast(state, commit, {info: '确定更改吗?', btnNum: 2})
			.then(()=> axios.post('/api/updateCat',payload))
			.then(
				() => doToast(state, commit, {info: '更改成功', btnNum: 1})
			)
			.finally(() => commit('TOASTING_TOGGLE', false))
			.then(() => {
				dispatch('getCatList');
			})
			.catch((err) => {console.log(err);});
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
		return axios.get('/api/getCommentList')
			.then(commentList => {
				commit('SET_COMMENTLIST', commentList.data);
			});
	},
	delComment({state,commit,dispatch},id) {
		return doToast(state, commit, {info: '确定删除该评论吗?', btnNum: 2})
			.then(()=> axios.post('/api/delComment',{id:id}))
			.then(
			 	() => doToast(state, commit, {info: '删除评论成功', btnNum: 1})
			)
			.finally(() => commit('TOASTING_TOGGLE', false))
			.then(() => {
				dispatch('getCommentList');
			})
			.catch((err) => {console.log(err);});
	},
	getComment({commit}, atitle) {//显示当前文章下的评论列表
		return axios.post('/api/getFrontComment',atitle)
			.then((result) => {
				commit('SET_ARTICLECOMENT', result.data);
			});
	},
	addComment ({state, commit, dispatch},preload) {
		return doToast(state, commit, {info: '确定添加评论吗?', btnNum: 2})
			.then(() => axios.post('/api/addComment', {comment:preload}))
			.then(
			 	() => doToast(state, commit, {info: '评论成功', btnNum: 1})
			)
			.finally(() => commit('TOASTING_TOGGLE', false))
			.then(() => {
				dispatch('getComment',{atitle:preload.atitle});
				state.article.comment_count++;
			})
			.catch((err) => {console.log(err);});
	},
};
