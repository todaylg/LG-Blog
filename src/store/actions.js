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
	getArticle ({commit}, id) {
		return Vue.http.get('/api/getArticle', {params: {id}}).then(response => {
			commit('SET_ARTICLE', response.data);
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
		return Vue.http.post('/api/addCategory',{catName:state.catName}).then(response => {
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
	getArticleList ({commit}, id) {
		return Vue.http.get('/api/getArticleList')
			.then(response => response.json())
			.then(articles => {
				commit('SET_ARTICLES', articles);
			});
	},
	getFrontArticleList({commit}, payload) {
		return Vue.http.get('/api/getFrontArticleList', {params: {payload}}).then(response => response.json()).then(articles => {
			console.log(articles);
			console.log(articles.length);
			if (articles.length != 0) {
				commit('SET_ARTICLELIST', articles);
			}
		});
	}
};
