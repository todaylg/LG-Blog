export default {
	SET_USER: (state, user) => {
		localStorage.setItem('token', user.token);
		localStorage.setItem('username', user.username);
		state.user = {
			username:user.username,
			intro:user.intro,
			avatar:user.avatar
		};
		console.log(user);
	},
	UNSET_USER: (state) => {
	    localStorage.removeItem('token');
	    localStorage.removeItem('username');
	    state.user = {};
	},
	SET_ARTICLE: (state, article) => {
		state.article = article;
	},
	SET_ARTICLES: (state, articles) => {
		state.articles = articles;
	},
	UPDATE_CONTENT: (state, content) => {
		state.article.content = content;
	},
	UPDATE_TITLE: (state, title) => {
		state.article.title = title;
	},
	SET_CATEGORY: (state, catName) => {
		state.catName = catName;
	},
	SET_CATLIST:  (state, catList) => {
		state.catList = catList;
	},
	SET_ARTICLELIST: (state, articles) => {
		state.articleList = state.articleList.concat(articles);
	},
};
