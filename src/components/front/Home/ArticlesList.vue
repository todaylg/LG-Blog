<template>
		<div id='content'>
			<div id="blank"></div>
      <ul>
        <li class="post" v-for="(article,index) in articleList">
              <router-link v-if="article.special_img" :to="{ name: 'article', params: {aid: article._id } }">
                <img width="1920" height="1080" :src="article.special_img" class="cover">
            </router-link>
          <div class="else">
              <p>{{ article.publish | toDate }}</p>
              <h3>
                <router-link :to="{ name: 'article', params: {aid: article._id } }">
                  {{article.title}}
                </router-link>
          </h3>
              <p>{{article.content}}</p>
              <p class="here">
                  <span>{{article.visit_count}}</span>
                  <span>{{article.comment_count}}</span>
              </p>
          </div>
        </li>
      </ul>
      <!-- <div class="load-more">
          <button class="ladda-button" @click.prevent="addData()">
            <span v-if="isFetching" class="ladda-spinner">
              <i class="fa fa-spinner fa-spin"></i>
            </span>
            <span v-else class="ladda-label">点击查看更多</span>
          </button>
      </div>   -->
	 </div>
</template>
<script>
  import { mapState,mapActions } from 'vuex'

  export default {
  data(){
    return {
      page:1,
      limit:4
    }
  },
  computed: {
    ...mapState(['articleList'])
  },  
  created(){
      this.getFrontArticleList({page:this.page,limit:this.limit});
  },
  methods:{
    ...mapActions([
      'getFrontArticleList'
    ])
  }
}
</script>

<style lang="scss">
 #content{
 	opacity:0;
 	transform:translateY(400px);
 	transition: all 1s ease-in-out;
 }
 #blank{
 	padding-top:120px;
 }
 .post {
    margin: 40px auto 0;
    width: 1200px;
    position: relative;
}
 .post:nth-child(odd) {
    text-align: left;
}
.post:nth-child(even) {
    text-align: right;
}
.post > a {
    display: inline-block;
    width: 680px;
    height: 440px;
    overflow: hidden;
    position: relative;
    z-index: 3;
    img{
    	display: block;
    	max-width: 100%;
    	height: auto;
    }
}
.else {
    position: absolute;
    background: #fff;
    text-align: left;
    top: 20px;
    height: 398px;
    width: 498px;
    border: 1px solid #eaeaea;
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
</style>
