<template>
	<div id='content' :class="contentShow?'showContent':''">
		<div class="blank"></div>
		<ul>
			<li class="post" v-for="(article,index) in articleList">
				<router-link v-if="article.special_img" :to="{ name: 'article', params: {atitle: article.title } }">
					<img :src="article.special_img">
					<img src="../../../assets/img/mask.png" >
				</router-link>
				<div class="else">
		 			<p>{{ article.publish | toDate }}</p>
					<h3>
						<router-link :to="{ name: 'article', params: {atitle: article.title } }">
							{{article.title}}
						</router-link>
					</h3>
					<p>{{article.intro}}</p>
					<p class="here">
						<span>{{article.visit_count}}</span>
						<span>{{article.comment_count}}</span>
					</p>
				</div>
	        </li>
		</ul>
		<div v-if='!loadMore' v-show="!noMore" class="pagination" @click.prevent="addAticle">
			<a>加载更多</a>
		</div>
		<div v-if="noMore" style="padding: 4%; text-align: center;color: #b9bfd0;">
			<span>Dont have more...</span>
		</div>
		<spinner v-show="loadMore" class="spinner"></spinner>
	</div>
</template>
<script>
import { mapState,mapActions } from 'vuex';
import Spinner from "../Share/Spinner.vue";

export default {
	data(){
		return {
			page:1,
			limit:3
		}
	},
	updated(){

	},
	computed: {
		...mapState(['articleList','loadMore','contentShow','noMore'])
	},
	created(){
		this.$store.state.noMore = false;
		this.$store.state.loadMore = false;
		this.$store.state.contentShow = false;
		this.getFrontArticleList({page:this.page,limit:this.limit});
	},
	methods:{
		addAticle(){
			this.page++;
			this.getFrontArticleList({page:this.page,limit:this.limit});
		},
		...mapActions([
			'getFrontArticleList'
		])
	},
	components: {
		Spinner
	}
}
</script>

<style lang="scss">
@keyframes showPost{
	0%{
		opacity:0;
		transform:translateY(40px);
	}
	100%{
		opacity:1;
		transform:translateY(0px);
	}
}
#content{
	opacity:0;
	transform:translateY(400px);
	transition: all 1s ease-in-out;
}
#content.showContent{
	opacity:1;
	transform:translateY(0px);
}
.blank{
	padding-top:120px;
}
.post {
	margin: 40px auto 0;
	width: 1200px;
	position: relative;
	animation: showPost 1s 1 ease-in-out;
}
.post:nth-child(odd){
	text-align: left; 
}
.post:nth-child(even){
	text-align: right;
}

.post:nth-child(odd) .else{
	box-shadow: 2px 2px #DADEE1;
}
.post:nth-child(even) .else{
	box-shadow: -2px 2px #DADEE1;
}
.post > a {
	display: inline-block;
	width: 680px;
	height: 440px;
	overflow: hidden;
	position: relative;
	z-index: 3;
	img:nth-child(1){
		position:relative;
		display: block;
		max-width: 100%;
		height: auto;
    }
    img:nth-child(2){
		position:absolute;
		top: 0;
		left: 0;
		width:100%;
    }
}
.else {
	position: absolute;
	background: #fff;
	text-align: left;
	top: 20px;
	height: 350px;
	width: 498px;
	border: 2px solid #eaeaea;
}
.post:nth-child(odd) .else {
	left: 660px;
}
.post:nth-child(even) .else {
	right: 660px;
}
.else p:first-child {
	color: #999;
	font-size: 12px;
	margin: 80px 0 0 80px;
}
.else h3 {
	font-size: 30px;
	line-height: 1.1;
	margin: 10px 100px 0 80px;
}
.else h3 + p {
	color: #555;
	margin: 10px 100px 0 80px;
	font-size: 14px;
	line-height: 1.8;
}
.here {
	position: absolute;
	left: 80px;
	bottom: 80px;
	color: #999;
	font-size: 13px;
}
.here span {
	display: inline-block;
	vertical-align: middle;
	margin-right: 10px;
	font-family: "icomoon","Hiragino Sans GB","Hiragino Sans GB W3","Microsoft YaHei","WenQuanYi Micro Hei",sans-serif;
}
.here a {
	display: inline-block;
	cursor: default;
}

.pagination {
	padding: 20px 0;
	text-align: center;
	font-family: miranafont,"Hiragino Sans GB",STXihei,"Microsoft YaHei",SimSun,sans-serif;
	a {
		padding: 13px 35px;
		border: 1px solid #D6D6D6;
		border-radius: 50px;
		color: #ADADAD;
		&:hover{
		color: #667783;
		border-color: #566d80;
		}
	}
}
//自适应
@media screen and (max-width: 1200px){
	.post {
		width: 900px;
		& > a {
			width: 520px;
			height: 310px;
			margin-top: 10px;
		}
	}
	.post:nth-child(even) .else {
		right: 450px;
	}
	.post:nth-child(odd) .else {
		left: 450px;
	}
	.else {
		top: 10px;
		width: 420px;
		height: 290px;
		p:first-child {
			font-size: 12px;
			margin: 50px 0 0 100px;
		}
		h3 {
			font-size: 24px;
			margin: 25px 60px 0 100px;
		}
		h3 + p {
			color: #555;
			margin: 15px 100px 0 100px;
			text-indent:20px;
			font-size: 14px;
			line-height: 1.8;
		}
		.here {
          left: 100px;
          bottom: 50px;
		}
	}
}

@media screen and (max-width: 900px){
	.post {
 		width: 100%;
		margin-top: 60px;
		background: #fff;
		padding-bottom: 10px;
		border-bottom: 1px solid #eaeaea;
		& > a {
			display: block;
			margin: 0 auto;
			width:100%;
			height:auto;
			img {
				position: relative;
				margin: 0 auto;
			}
		}
	}

	.post:nth-child(odd) .else,
	.post:nth-child(even) .else {
		box-shadow:none;
	}
	.else {
		height: auto;
		position: static;
		width: 96%;
		margin: 0 auto;
		background: transparent;
		border: none;
		p:first-child {
			margin: 30px 0 0 50px;
		}
		h3 {
			font-size: 24px;
			margin: 20px 30px 0 50px;
		}
		h3 + p {
			margin: 10px 30px 0 50px;
		}
	}
	.here {
		position: static;
		margin: 20px 50px 20px 20px;
		text-align: right;
	}
}

</style>
