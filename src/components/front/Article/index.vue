<template>
	<div class="articleContain">
		<div class="blank"></div>
		<div id='articleMain'>
			<h1 id='articleTitle'>{{article.title}}</h1>
			<div id="articleInfo">
				<span>{{article.created}}</span>
				<span>浏览量： {{article.visit_count}}</span>
				<span>评论量： {{article.comment_count}}</span>
			</div>
			<div id='articleContent' v-html="article.content"></div>
			<Comment></Comment>
		</div>
	</div>
</template>
<script>
import {mapState, mapActions} from 'vuex';
import marked from '../../../assets/js/marked.min.js';
import hljs from '../../../assets/js/highlight.pack.js';
import Comment from "../Share/Comment.vue";

export default{
	data(){
		return {
	  	
	  	}
	},
	updated(){
		this.highlight()
    },
	created () {
		this.getFrontArticle({atitle:this.$route.params.atitle})//显示当前文章
	},
	components: {Comment},
	methods: {
		highlight(){
		  setTimeout(() => {
		    hljs.initHighlighting.called = false
		    hljs.initHighlighting()
		  }, 0)
		},
		...mapActions(['getFrontArticle'])
	},
	computed:mapState({
		article:state => {
	        state.article.content = marked(state.article.content || '')
	        return state.article
	    }
	})
}
</script>
<style lang="scss">
.articleContain{
	max-width: 800px;
    padding: 0 10px;
    margin-left: auto;
    margin-right: auto;
	animation: showPost 1s;
	.blank{
		padding-top:80px;
	}
	#articleMain{
		padding: 40px 0 0;
		#articleTitle{
			font-size: 30px;
		    color: #333;
		    line-height: 1.3;
		    position: relative;
		    font-weight: bold;
		}
		#articleInfo{
			margin-top: 20px;
		    color: #666;
		    font-size: 13px;
		    span{
		    	display: inline-block;
		    	margin-right: 20px;
		    }
		}
		#articleContent{
			font-size: 14px;
		    line-height: 2;
		    color: #333;
		    &:before{
		    	content: '';
	    	    height: 1px;
	    	    width: 100px;
	    	    background: #eee;
	    	    display: block;
	    	    margin: 30px auto 40px;
		    }
		    &:after{
		    	content: "";
	    	    height: 1px;
	    	    width: 100%;
	    	    background: #eee;
	    	    display: block;
	    	    margin: 30px auto 40px;
		    }
		}
	}
}

</style>
