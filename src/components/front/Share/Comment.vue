<template>
<div>
	<div id="articleComment">
		<div id="commentListTitle">
			<h3>Comments<span class="noticom">{{articleComment.length}} 条评论 </span></h3>
		</div>
	    <div id="articleCL" v-for="(comment,index) in articleComment">
	    	<a class='commentUserList' :href="comment.website">{{comment.username}}</a>
	    	<div class='commentTimeList'><time>{{comment.created | toDate}}</time></div>
	    	<div class="commentContentList">
	    		{{comment.content}}
	    	</div>
	    </div>
	</div>

	<div id="postComment">
		<form id="commentform" class="comment-form">
			<input v-model='username' type="text" placeholder="昵称 (必须)" class='commentInfo' size="22" tabindex="1">
			<input v-model='email' type="text" placeholder="邮箱 (必须)" class='commentInfo'size="22" tabindex="1">
			<input v-model='website' type="text" placeholder="网站" class='commentInfo' size="22" tabindex="1">
			<textarea v-model='commentContent' placeholder="Type in your comments ..." id="commentInput" rows="5" tabindex="4"></textarea>
			

			<input @click.prevent="add()" id="postComment" type='button' value="Post Comment"> 
		</form>
	</div>
</div>
</template>
<script>
import {mapState, mapActions} from 'vuex';

export default {
	data(){
		return {
			username:'',
			email:'',
			website:'',
			commentContent:''
		}
	},
	created () {
	    this.getComment({atitle:this.$route.params.atitle})//显示当前文章下的评论
	},
	methods: {
		add(){
			//判断不能输入为空 TODO
			let commentObj = {
				username:this.username,
				email:this.email,
				website:this.website,
				content:this.commentContent,
				atitle:this.$route.params.atitle
			}
			this.addComment(commentObj);
		},
		...mapActions(['getComment','addComment'])
	},
	computed:mapState({
	    articleComment:state => state.articleComment
	})
}
</script>
<style lang="scss">
#commentListTitle{
	text-align: center;
}

#articleCL{
	padding:20px;
}

#commentListTitle{
	max-width: 860px;
	width: 100%;
	margin: 0 auto;
	margin-bottom: 40px;
	font-family: microsoft yahei;
	color: #7D7D7D;
	font-weight: 400;
	.noticom{
		margin-top:5px;
		display:block;
		font-size: 13px;
		font-weight: 400;
		color: #909090;
	}
}

.commentUserList{
	font-size: 15px;
    font-weight: 400;
}

.commentTimeList{
	margin-top: 2px;
    font-size: 12px;
    letter-spacing: 0px;
    text-transform: none;
    color: rgba(0,0,0,.35);
}

.commentContentList{
	margin: 10px;
	line-height: 32px;
    color: #63686d;
    border-bottom: 1px solid rgba(0,0,0,.05);
}

#postComment{
	#commentInput {
	    display: block;
	    font-family: "microsoft jhenghei","Arial",Sans-Serif;
	    float: none;
	    width: 100%;
	    height: 180px;
	    color: #535a63;
	    border: 1px solid #ddd;
	    font-size: 14px;
	    margin: 0;
	    padding: 21px 25px 20px;
	}
	.commentInfo {
	    border: 1px solid #ddd;
	    margin-bottom: 20px;
	    font-family: "microsoft jhenghei","Arial",Sans-Serif;
        font-size: 14px;
        float: left;
        width: 33.3%;
        padding: 21px 25px 20px;
        color: #535a63;
        background: #FFFFFF;
	}
	#postComment{
		width: auto;
		margin-top: 20px;
	    padding: 15px 25px;
	    text-transform: none;
	    color: #535a63;
	    background: none;
	    border-right: 0;
	    -webkit-transition: all 0.1s ease-out;
	    -moz-transition: all 0.1s ease-out;
	    transition: all 0.1s ease-out;
	    box-shadow: none;
	    border: 1px solid #ccc;
	    text-shadow: none;
	    &:hover{
	    	border-color: #b20082;
	    }
	}
}
</style>
