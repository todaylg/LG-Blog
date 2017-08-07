<template>
		<div id='content'>
			<div id="blank"></div>
			<div class="post">
          		<router-link :to="{path:'/articles'}">
          	 		<img width="1920" height="1080" src="../../assets/img/bg.jpg" class="cover">
	         	</router-link>
			    <div class="else">
			        <p>一月 22, 2017</p>
			        <h3><a class="posttitle" href="http://localhost/wordpress/?p=213">带图文章测试</a></h3>
			        <p>
					这是测试的文章
					</p>
			        <p class="here">
			            <span class="icon-letter">7</span>
			            <span class="icon-view">0</span>
			            <a href="javascript:;" class="likeThis" id="like-213"><span class="icon-like"></span><span class="count">0</span></a>
			        </p>
			    </div>
			</div>
			<div class="post">
          		<router-link :to="{path:'/articles'}">
          	 		<img width="1920" height="1080" src="../../assets/img/bg.jpg" class="cover">
	         	</router-link>
			    <div class="else">
			        <p>一月 22, 2017</p>
			        <h3><a class="posttitle" href="http://localhost/wordpress/?p=213">带图文章测试</a></h3>
			        <p>
					这是测试的文章
					</p>
			        <p class="here">
			            <span class="icon-letter">7</span>
			            <span class="icon-view">0</span>
			            <a href="javascript:;" class="likeThis" id="like-213"><span class="icon-like"></span><span class="count">0</span></a>
			        </p>
			    </div>
			</div>        
	    </div>
</template>
<script>
  
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
