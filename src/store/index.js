import Vue        from 'vue';
import Vuex       from 'vuex';
import actions    from './actions';
import mutations  from './mutations';
import getters    from './getters';

Vue.use(Vuex);

const store = new Vuex.Store({
	state: {
		cat:{},//前台获取分类文章时需要的分类信息（名称、简介）
		catAticles:[],//所属分类目录下的文章
		catEdit:{},//后台编辑分类(名称、简介)
		catList:[],//前后通用
		articles: [],//后台文章列表
		article: {},//前后通用???
		loadFlag:true,
		user: {},
		articleList:[],//前台首页文章列表
		commentList:[],//后台评论列表,
		articleComment:[]//前台文章所属评论
	},
	getters,
	mutations,
	actions
});

export default store;
