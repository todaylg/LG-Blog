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
	UPDATE_BELONGCAT: (state, belongCat) => {
		state.article.belongCat = belongCat;
	},
	SET_CATEDITNAME: (state, catName) => {//后台编辑分类名称
		state.catEdit.catName = catName;
	},
	SET_CATEEDITINTRO: (state, catName) => {//后台编辑分类简介
		state.catEdit.catIntro = catName;
	},
	SET_CAT: (state, cat) => {//前台分类文章
		state.cat = cat;
	},
	SET_CATLIST:  (state, catList) => {//前后通用，获得所有分类目录
		state.catList = catList;
	},
	SET_ARTICLELIST: (state, articles) => {
		state.articleList = state.articleList.concat(articles);
	},
	SET_CATATICLES:(state, articles) => {
		state.catAticles = state.catAticles.concat(articles);
	},
	SET_COMMENTLIST:(state, commentList) => {
		state.commentList = commentList;
	},
	SET_ARTICLECOMENT:(state, articleComment) => {
		state.articleComment = articleComment;
	},
	SET_ADDCOMMENT:(state, comment) => {
		state.articleComment = state.articleComment.concat(comment);
	},
};
