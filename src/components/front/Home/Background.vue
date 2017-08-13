<template>
	<div class="headertop" v-bind:class="bgshow" style="height: auto;" data-hover-only="true" data-relative-input="true">
		<figure class="bgContain" data-depth="0.3">
			<img id="centerbg" src="../../../assets/img/bg.png">
			<img id="yz" src="../../../assets/img/玉子.png">
			<img id='bz' src="../../../assets/img/饼藏.png">
		</figure>
	</div>
</template>
<script>
import Velocity from "../../../assets/js/velocity.min.js";
import { mapState } from 'vuex';

export default {
	data(){
		return {
			bgShow:true,
			wh:1
		}
	},
	mounted(){
		this.getBgWidth(),
    	window.addEventListener('resize', this.autoHW),
    	window.addEventListener('scroll', this.bgDisplay)
    },
    computed:{
		bgshow:function(){
			return {
				bgShow:!this.bgShow
	 		}
		},
		...mapState(['welcomeComplete']),
		welcomeEnd:function(){
			if(this.welcomeComplete)this.bgAnimation();
		}
	},
    methods: {
    	autoHW(){
    		document.querySelector('#centerbg').style.width = window.innerWidth+'px';
    		document.querySelector('.bgContain').style.height = window.innerWidth/this.wh+'px';
    	},
    	getBgWidth(){
    		let src = document.querySelector('#centerbg').src;
    		let imgTemp = new Image();
    		imgTemp.src = src;
    		var that = this;
    		imgTemp.onload = function(){
    			that.wh =  imgTemp.width/imgTemp.height;
    			that.autoHW();
    			that.bgAnimation();
    		}
    	},
    	bgAnimation(){
    		var bg = document.querySelector('#centerbg');
    		var bz = document.querySelector('#bz');
    		var yz = document.querySelector('#yz');
    		Velocity(bg, {
    			blur: [3,0]
    		}, {
    		    duration: 2000
    		});
    		Velocity(bz,{
    			blur: 0,
    			translateX:[0,10]
    		},{
    		    duration: 2500
    		});
    		Velocity(yz,{
    			blur: 0,
    			translateX:[0,-10]
    		},{
    			duration: 2500
    		});
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
		    	transform: scale(1);
		    	transform-origin:50% 50%;
		    }
		}
	}
	#yz{
		width: 35%;
		position: absolute;
		bottom: 0;
		left: 10%;
		filter:blur(4px);
		transform:translateX(-10px);
	}
	#bz{
		width: 42%;
		position: absolute;
		bottom: 0;
		right: 10%;
		filter:blur(4px);
		transform:translateX(-10px);
	}
</style>