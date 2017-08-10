import Vue from 'vue';

export default {
	login ({commit}, payload) {
		return Vue.http.post('/api/userLogin', payload).then(response => {
			if (response.data.state === 1) {
				payload.token = response.data.token;
				commit('SET_USER', payload);
			} else {
				return Promise.reject(response.data.msg);
   			}
		});
	},
	getArticle ({commit}, id) {
	  return Vue.http.get('/api/getArticle', {params: {id}})
	    .then(response => {
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
	}
};
