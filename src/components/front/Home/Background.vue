<template>
	<div class="headertop" v-bind:class="bgshow" style="height: auto;" data-hover-only="true" data-relative-input="true">
		<figure class="bgContain">
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
			wh:1,
			scrollEvent:null
		}
	},
	mounted(){
		this.getBgWidth(),
    	window.addEventListener('resize', this.autoHW),//全局触发导致报错      
    	window.addEventListener('scroll', this.bgDisplay),
    	this.bgPreloading()
    },
    destroyed(){//注销事件
    	window.removeEventListener('scroll', this.bgDisplay),
    	window.removeEventListener('resize', this.autoHW)
  	},
    computed:{
		bgshow:function(){
			return {
				bgShow:!this.bgShow
	 		}
		},
		...mapState(['firstLoad'])//TODO 
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
    	bgPreloading(){
    		let src= [],preCount=0,that=this;
			src.push(document.querySelector('#centerbg').src);
			src.push(document.querySelector('#yz').src);
			src.push(document.querySelector('#yz').src);
			for(let i=0;i<src.length;i++){
				let imgTemp = new Image();
    			imgTemp.src = src;
    			imgTemp.onload = function(){
    				preCount++;
    				if(preCount >= src.length){
    					//图片预加载完成
    					setTimeout(()=>{
    						that.$store.state.isLoading = false;
    					},1000);
    				}
    			}
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
				this.$store.state.contentShow = false;
			}
			if(s > 0){
				if(!this.bgShow) return;
				this.bgShow = false;
				var that = this;//非常非常丑陋的方法
				this.scrollEvent = window.onwheel;
				window.onwheel = this.diableScroll;
				setTimeout(()=>{
					//动画完成之前不能滚动
					window.onwheel = that.scrollEvent;
				}, 1400);
				//内容组件向上动画 //TODO vuex
				this.$store.state.contentShow = true;
				if(this.getScrollTop()===0)window.scrollTo(0,1);
			}
    	},
		getScrollTop(){
			return (document.documentElement && document.documentElement.scrollTop) || document.body.scrollTop;
		},
		diableScroll(e){
            e.preventDefault();
            return false;
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