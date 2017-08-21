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
		loadMore: false,//Loading标志位，加载更多时显示的Spinner
		noMore:false,
		isLoading:false,//Loading标志位，是否显示Spinner
		firstLoad:true,//首次加载标志位
		isToasting: false,
		contentShow:false,//主页内容显示标志
		user: {},
		userInfo:{},//后台个人信息显示
		articleList:[],//前台首页文章列表
		commentList:[],//后台评论列表,
		articleComment:[],//前台文章所属评论
		toast: {
		  promise: null,
		  info: '',
		  btnNum: 1,
		  toastResolve () {
		  },
		  toastReject () {
		  }
		}
	},
	getters,
	mutations,
	actions
});

export default store;
