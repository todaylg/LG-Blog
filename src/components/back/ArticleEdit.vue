<template>
	<section class="editor">
		<input class="editorTitle" placeholder="标题" v-model="title">
		<input v-model="imgUrl" class='articleImgUrl' type="text" placeholder="封面图片地址">
		<div class="styled-select semi-square">
			<select	v-model="belongCat"><!--TODO设置默认值:--><!--Fixed:v-bind:value-->
				<option v-for="cat in catList" v-bind:value="cat.name">{{cat.name}}</option>
			</select>
		</div>
		<textarea id="editor"></textarea>

		<div class="panel">
			<button class="saveArticle"
			@click="save">保存
			</button>
		</div>
	</section>
</template>
<script>
import {mapActions, mapMutations, mapState} from 'vuex';
import SimpleMDE from 'simplemde';
import fontCss from 'font-awesome/css/font-awesome.min.css';
import lightCss from '../../assets/css/highlight.css';
import css from 'simplemde/dist/simplemde.min.css'
import marked	 from '../../assets/js/marked';

let simplemde;

export default{
	data(){
		return {
			articleContent:''
		}
	},
	created(){
		this.getCatList(),
		this.getArticle({atitle:this.$route.params.atitle})//显示当前文章
	},
	mounted() {
		simplemde = new SimpleMDE({
			autoDownloadFontAwesome: false,
			element: document.getElementById("editor"),
			spellChecker: false,
			previewRender: function(plainText) {
				return marked(plainText); // Returns HTML from a custom parser
			},
		});
		simplemde.codemirror.on("change", () => {
			let value = simplemde.value();
			this.article.content = value;
		});
		this.$nextTick(() => {
			this.articleContent = this.article.content;
			simplemde.value(this.articleContent);
		})
	},
	methods: {
		save(){
			this.updateArticle();
		},
	 	...mapActions(['getArticle', 'updateArticle','getCatList']),
	 	...mapMutations(['SET_ARTICLE'])
 	},
 	computed: {
		title: {
			get(){
				return this.article.title
			},
			set(value){
				this.$store.commit('UPDATE_TITLE', value)
			}
		},
		belongCat:{
			get(){
				return this.article.category
			},
			set(value){
				this.$store.commit('UPDATE_BELONGCAT', value)
			}
		},
		imgUrl:{
			get(){
				return this.$store.state.article.special_img
			},
			set(value){
				this.$store.commit('UPDATE_SPECIALIMG', value)
			}
		},
		...mapState(['article','catList'])
	},
	 watch: {
		 article(val, oldVal) {
			 this.articleContent = val.content;
			 simplemde.value(this.articleContent);
		 }
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
	margin: 10px 0 10px 70%;
	border-radius: 5px;
	width:20%;
}
section.editor {
	height: 100%;
	.editorTitle{ 
		text-align: center;
		box-sizing: border-box;
		padding: 10px;
		margin: 0 auto;
		height: 50px;
		display: block;
		font-size: 30px;
		color: black;
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
	}
	.edit, .inspect {
		height: 80%;
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
		margin: 20px 50px;
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

</style>
