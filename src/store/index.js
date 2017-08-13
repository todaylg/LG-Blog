import Vue        from 'vue';
import Vuex       from 'vuex';
import actions    from './actions';
import mutations  from './mutations';
import getters    from './getters';

Vue.use(Vuex);

const store = new Vuex.Store({
	state: {
		catName:'',
		catList:[],
		articles: [],
		article: {},
		user: {},
		articleList:[]
	},
	getters,
	mutations,
	actions
});

export default store;
