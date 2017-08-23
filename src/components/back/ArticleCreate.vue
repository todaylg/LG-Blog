<template>
	<section class="editor">
		<div class='articleCrtPage'>
			<h1>新建文章</h1>
			<input class="title"
			placeholder="标题"
			v-model="title">
			<input class='articleImgUrl' type="text" placeholder="封面图片地址">
			<select	v-model="belongCat" placeholder="请选择分类" class="styled-select blue semi-square">
				<option v-for="cat in catList">{{cat.name}}</option>
			</select>
		
			<div :class="inspected?'inspect':'edit'">
				<textarea v-model="content" spellcheck="false"></textarea>
				<button class="toggle"
				@click="inspected = !inspected">
				</button>
				<article id="a" v-html="markedContent"></article>
			</div>
			<div class="panel">
				<button class="saveArticle"
				@click="add">保存
				</button>
			</div>
		</div>
	</section>
</template>
<script>
import {mapActions, mapState, mapMutations} from 'vuex';
import marked from '../../assets/js/marked.min';
import hljs from '../../assets/js/highlight.pack';

export default{
 data(){
	return {
	inspected: false,
	markedContent:''
	}
 },
 created(){
	this.getCatList(),
	this.SET_ARTICLE({content:'',title:'',belongCat:'', date: new Date()})//todo
 },
 updated(){
	this.highlight()
 },
 methods: {
	add(){
		this.addArticle()
		.catch(err => console.log(err))
	},
	highlight(){
		setTimeout(() => {
			hljs.initHighlighting.called = false
			hljs.initHighlighting()
		}, 0)
	},
	...mapActions(['addArticle','getCatList']),
	...mapMutations(['SET_ARTICLE'])
 },
 computed: {
	content: {
		get(){
			this.markedContent = marked(
			this.$store.state.article.content || '',
			{sanitize: true}
		)
			this.highlight();
			return this.$store.state.article.content;
		},
		set(value){
			this.$store.commit('UPDATE_CONTENT', value)
		}
	},
	title: {
		get(){
			return this.$store.state.article.title
		},
		set(value){
			this.$store.commit('UPDATE_TITLE', value)
		}
	},
	belongCat:{
		get(){
			return this.$store.state.article.belongCat
		},
		set(value){
			this.$store.commit('UPDATE_BELONGCAT', value)
		}
	},
	...mapState(['catList']),
 }
}
</script>
<style lang="scss">
.articleImgUrl{
	text-align: center;
	box-sizing: border-box;
	padding: 5px;
	margin: 10px 0 10px 70%;
	height: 20px;
	display: block;
	font-size: 15px;
	color: black;
	width:18%;
}
.editor{
	height:100%;
	width:100%;
}
.articleCrtPage {
	height: 100%;
	width:100%;
	margin: 0 auto;
	h1{
		padding: 10px 0 0 10px;
	}
	.title {
		text-align: center;
		box-sizing: border-box;
		padding: 10px;
		margin: 0 auto;
		height: 50px;
		display: block;
		font-size: 30px;
		color: black;
		width: 40%;
	}
	textarea, button, article {
		box-sizing: border-box;
		border-radius: 6px;
		height: 100%;
		float: left;
		transition: width 0.6s;
		font-size: 16px;
		line-height: 1.8;
		border: 1px solid black;
	}
	textarea, article {
		resize: none;
		padding: 20px;
		overflow-y: auto;
	}
	button {
		margin: 0 10px;
		width: 20px;
		text-align: center;
		background-color: #faf0e9;
	}
	.edit, .inspect {
		height: 65%;
		margin: 0 50px;
		overflow: hidden;
	}
	.edit {
		textarea {
			width: calc(100% - 40px);
		}
		article {
			width: 0;
		}
	}
	.inspect {
		textarea {
			width: calc(50% - 20px);
		}
		article {
			width: calc(50% - 20px);
		}
	}
	.panel {
		margin: 20px 50px 0 0;
		position: relative;
		height: 30px;
		line-height: 30px;
		input {
			text-align: center;
			border-bottom: 1px solid black;
		}
		button.saveArticle {
			float: right;
			height: 30px;
			width: 80px;
			}
	}
	article {
		line-height: 1.6;
		padding-bottom: 160px;
		h2, h3, h4, h5, h6 {
			position: relative;
			margin: 1em 0;
			&:before {
				content: "#";
				color: black;
				position: absolute;
				left: -0.7em;
				top: -4px;
				font-size: 1.2em;
				font-weight: bold;
			}
		}
		h4, h5, h6 {
			&:before {
				content: ""
			}
		}
		h2, h3 {
			font-size: 22px
		}
		h4, h5, h6 {
			font-size: 18px
		}
		a {
			color: black;
			word-break: break-all;
		}
		blockquote {
			margin: 2em 0;
			padding-left: 20px;
			border-left: 4px solid black;
		}
		img {
			display: block;
			max-width: 100%;
			margin: 1em auto
		}
		code,
		pre {
			font-size: 0.8em;
			background-color: #f8f8f8;
			font-family: 'Roboto Mono', Monaco, courier, monospace;
			color: #525252;
		}
	}
}
.styled-select {
	background: #d8d6d8;
	height: 29px;
	overflow: hidden;
	width: 240px;
}
.styled-select select {
	background: transparent;
	border: none;
	font-size: 14px;
	height: 29px;
	padding: 5px;
	width: 268px;
}
.semi-square {
	display: block;
	height: 20px;
	margin: 10px 0 10px 70%;
	border-radius: 5px;
	width:20%;
}
</style>
