<template>
	<div class="headertop" v-bind:class="bgshow" style="height: auto;" data-hover-only="true" data-relative-input="true">
		<figure class="bgContain" data-depth="0.3">
			<img id="centerbg" src="../../assets/img/bg.jpg">
		</figure>
	</div>
</template>
<script>
import Parallax from "../../assets/js/parallax.min.js";
export default {
	data(){
		return {
			bgShow:true
		}
	},
	mounted(){
    	this.autoHW(),
    	this.parallax(),
    	window.addEventListener('resize', this.autoHW),
    	window.addEventListener('scroll', this.bgDisplay)
    },
    computed:{
		bgshow:function(){
			return {
				bgShow:!this.bgShow
	 		}
		}
	},
    methods: {
    	autoHW(){
    		document.querySelector('.bgContain').style.height = window.innerHeight+'px';
    		document.querySelector('#centerbg').style.width = window.innerWidth+'px';
    	},
    	parallax(){
    		var scene = document.querySelector('.headertop');
			new Parallax(scene);
    	},
    	bgDisplay(){
    		var s = this.getScrollTop();
    		if(s===0){
    			if(this.bgShow) return;
				this.bgShow = true;
				//内容组件向下动画
				document.querySelector('#content').style.opacity = '0';
				document.querySelector('#content').style.transform = 'translateY(400px)';
			}
			if(s > 0){
				if(!this.bgShow) return;
				this.bgShow = false;
				//内容组件向上动画
				//setTimeout(function(){
					document.querySelector('#content').style.opacity = '1';
					document.querySelector('#content').style.transform = 'translateY(0)';
				//}, 200);
			}
    	},
		getScrollTop(){
			return (document.documentElement && document.documentElement.scrollTop) || document.body.scrollTop;
		}
    }
}
</script>
<style lang='scss'>
	.headertop{
		position: absolute;
    	overflow: hidden;
	    height: 0;
	    transition-timing-function: cubic-bezier(.7,0,.3,1);
    	transition-duration: 1.2s;
    	transition-property: opacity,transform;
    	&.bgShow{
    		opacity: 0;
    		transform: translateY(-100%) scale(.9);
    		&+#content{//下面文章上来的动画得慢一点
				transition-delay: .6s;
    		}
    	}
	    .bgContain {
		    width: 100%;
		    height: 550px;
		    margin: 0;
		    padding: 0;
		    z-index: -1;
		    #centerbg{
		    	transform: scale(1.1);
		    	transform-origin:50% 50%;
		    }
		}
	}
</style>