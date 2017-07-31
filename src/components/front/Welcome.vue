<template>
	<div>
	<div class='welcome'>
		<div class="welcomeText"></div>
	</div>
	<div class="eye"></div>
	</div>
</template>
<script>
export default {
	mounted(){
		window.addEventListener('load', this.eyeAnimation)
	},
	methods:{
		eyeAnimation(){
			document.querySelector('.welcome').classList.add('active');
			setTimeout(function(){
				var tt = document.querySelector('.eye'); 
				var welcome = document.querySelector('.welcome');
				tt.style.display='block';
				tt.style.animation = 'eye_animate 2s 1 alternate ease-in-out';
				welcome.style.animation = 'contentBlur 2s 1 alternate ease-in-out';
				tt.addEventListener("webkitAnimationEnd", function(){ //动画结束时事件 
					//法一：
					tt.parentElement.removeChild(tt);
				}, false); 
				welcome.addEventListener("webkitAnimationEnd", function(){ //动画结束时事件 
					//法一：
					welcome.parentElement.removeChild(welcome);
				}, false); 
			}, 2000);
		}
	}
}
</script>
<style lang='scss'>
@keyframes eye_animate{
	0%{
		opacity: 0;
	}
	20%{
		opacity: 1;
	}
	50%{
		opacity: 0.85;
	}
	70%{
		opacity: 1;
	}
	100%{
		opacity: 0;
	}
}
@keyframes contentBlur{
	0%{
		filter: blur(0);
		opacity:1;
	}
	20%{
		filter: blur(8px);
	}
	50%{
		filter: blur(2px);
	}
	70%{
		filter: blur(8px);
		opacity:1;
	}
	100%{
		filter: blur(0px);
		opacity:0;
	}
}
@keyframes show-text {
	0%   { left: 0; }
	100% { left: 300px; }
}
.eye{
	display:none;
	position:fixed;
	top:0;
	left:0;
	width: 100%;
	height: 100%;
	z-index: 2;
	background: -webkit-radial-gradient(center,ellipse closest-side,rgba(255, 255, 255, 0) 10%,#000 90%);
}
.welcome{
	position:fixed;
	top:0;
	left:0;
	z-index: 2;
    width: 100%;
    text-align: center;
    height: 100%;
    background-color: white;
    transition: all .5s ease-in-out;
}
.welcomeText{
	position: absolute;
    top: 50%;
    left: 50%;
    width: 300px;
    height: 30px;
    transform:translate(-50%,-50%);
    background-image: url(../../assets/img/v_text.png);
    background-size: 90% auto;
    background-position: center;
    background-repeat: no-repeat;
    background-color: #000;
    overflow: hidden;
    &:after{
    	position: absolute;
	    top: 0;
	    left: 0;
	    content: "";
	    display: block;
	    width: 300px;
	    height: 30px;
	    background-color: #fff;
    }
}
.welcome.active .welcomeText:after {
	animation: show-text 1s ease 0s forwards;
}
</style>