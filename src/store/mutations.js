export default {
	SET_USER: (state, user) => {
		state.user = user;
		localStorage.setItem('token', user.token);
		console.log(user);
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
};
