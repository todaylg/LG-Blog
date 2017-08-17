<template>
	<div class="catAticle">
	<div class="blank"></div>
	<!--静态数据-->
		<!-- <div id='catAticleMain'>
			<div id='catTitle'>
				<h1 id="catName">test</h1>
				<h1 id="catIntro">intro</h1>
			</div>
		</div> -->
	<!--静态数据-->
<!--    <article class="post post-list">
		<div class="post-entry">
			<div class="feature">
				<a>
					<img width="150" height="150" src="../../../assets/img/bg.png">
				</a>
			</div>	
			<h1 class="entry-title"><a>文章测试标题</a></h1>
			<div class="p-time">文章测试时间</div>
			<p>intro</p>
			<footer class="entry-footer">
				<div class="post-more">
					<a>More</a>
				</div>
			</footer>
		</div>	
	</article> -->

		<div id='catAticleMain'>
			<div id='catTitle'>
				<h1 id="catName">{{cat.name}}</h1>
				<h1 id="catIntro">{{cat.intro}}</h1>
			</div>
		</div>

		<article class="catPost" v-for="(article,index) in catAticles">
			<div class="post-entry">
				<div class="feature">
					<router-link v-if="article.special_img" :to="{ name: 'article', params: {atitle: article.title} }">
						<img width="150" height="150" :src="article.special_img">
            		</router-link>
				</div>	
				<h1 class="entry-title">
					<router-link :to="{ name: 'article', params: {atitle: article.title } }">
					  {{article.title}}
					</router-link>
				</h1>
				<div class="p-time">{{ article.publish | toDate }}</div>
				 <p>{{article.intro}}</p>
				<footer class="entry-footer">
					<div class="post-more">
						<a>More</a>
					</div>
				</footer>
			</div>	
		</article>
		

		<!--可以抽出去Loadmore组件-->
		  <div v-if='loadFlag' id="pagination" @click.prevent="addAticle">
		    <a>加载更多</a>
		  </div>
		  <div v-else style="padding: 4%; text-align: center;color: #b9bfd0;">
		    <span>Dont have more...</span>
		  </div>
	</div>
</template>
<script>
import {mapState, mapActions} from 'vuex';

export default{
	data(){
	  return {
	    page:1,
	    limit:2
	  }
	},
	watch: {
    '$route': 'initData'
	},  
	created () {
		this.initData();
	},
	beforeRouteLeave (to, from, next) {
		this.$store.state.loadFlag = true;
		this.$store.state.catAticles = [];
		this.$store.state.cat = {};
		console.log("LeaveCategory ");
	    next();
	},
	methods: {
		initData(){
			this.$store.state.loadFlag = true;
			this.$store.state.catAticles = [];
			this.$store.state.cat = {};
			this.page = 1;
			console.log('initData:'+this.$route.params.catname);
			this.getCat({catname:this.$route.params.catname});//显示当前分类目录的名称及简介
		    this.getCatArticle({page:this.page,limit:this.limit,catname:this.$route.params.catname})//显示当前分类目录下的文章
		},
		addAticle(){
		  this.page++;
		 this.getCatArticle({page:this.page,limit:this.limit,catname:this.$route.params.catname})//继续显示当前分类目录下的文章
		},
		...mapActions(['getCat', 'getCatArticle']),
	},
	computed:{
		...mapState(['cat','catAticles','loadFlag'])
	},
}
</script>
<style lang="scss">
.catAticle{
	max-width: 800px;
    padding: 0 10px;
    margin-left: auto;
    margin-right: auto;
	animation: showPost 1s;
	.blank{
		padding-top:80px;
	}
	#catAticleMain{
		padding: 40px 0 0;
	}
	#catTitle{
		text-align:center;
		margin-bottom: 50px;
		h1 {
		    font-size: 25px;
		    font-weight: 400;
		    color: #676767;
		}
		#catName{
			font-size: 35px;
			text-align: left;
		}
		#catIntro{
			text-align: right;
			border-bottom: 1px dashed #ddd;
		}
	}
}
.catPost{
	max-width: 800px;
}
.post-entry{
	position: relative;
	p{
	    min-height: 60px;
	    margin: 0 0 0 17%;
	    font-size: 15px;
	    font-family: miranafont,"Hiragino Sans GB",STXihei,"Microsoft YaHei",SimSun,sans-serif;
	    color: rgba(0,0,0,.66);
	    letter-spacing: 0;
	    line-height: 30px;
	}
}
.feature{
	position: absolute;
    margin-top: 10px;
	img{
		width: 100px;
	    height: 100px;
	    border-radius: 50%;
	    padding: 2px;
	    border: 1px solid #DADADA;
	    position: relative;
	}
}
.entry-title{
	font-size: 20px;
    font-weight: 400;
    line-height: 50px;
    margin: 0 0 0 17%;
    position: relative;
    z-index: 1;
    display: inline-block;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    width: 70%;
}
.p-time {
    position: absolute;
    right: 0;
    top: 16px;
    font-size: 12px;
    color: #989898;
    letter-spacing: 0;
}
.entry-footer {
    margin: 0 0 0 17%;
    list-style: none;
    .post-more{
    	margin-top: 10px;
    	text-align: right;
    }
}
</style>
