import Vue from 'vue';

export default {
	login ({commit}, payload) {
		return Vue.http.post('/api/user/signin', payload).then(response => {
			if (response.data.state === 1) {
				payload.token = response.data.token;
				commit('SET_USER', payload);
			} else {
				return Promise.reject(response.data.msg);
   			}
		});
	}
};
