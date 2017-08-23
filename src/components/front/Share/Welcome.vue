<template>
	<div>
	<div class='welcome'>
		<div id="ripple1" class="ripple"></div>
		<div id="ripple2" class="ripple"></div>
		<div class="topBlock"></div>
		<div class="buttomBlock"></div>
		<div class="welcomeText"></div>
	</div>
	<div class="eye"></div>
	</div>
</template>
<script>
import Velocity from "../../../assets/js/velocity.min.js";

export default {
	mounted(){
		this.eyeAnimation();
	},
	methods:{
		eyeAnimation(){
			//TODO Rewrite
			var that = this;
			var topBlock = document.querySelector('.topBlock');
			var buttomBlock = document.querySelector('.buttomBlock');
			var tt = document.querySelector('.eye'); 
			var welcome = document.querySelector('.welcome');
			var ripple1 = document.querySelector('#ripple1');
			var ripple2 = document.querySelector('#ripple2');
			//todo
			document.body.style.overflowY='hidden';
			Velocity.animate(topBlock, {
			    top:0
			}, {
			    duration: 1500,
			    easing: "ease-in-out",
			    complete:()=>{
			    	document.querySelector('.welcomeText').classList.add('active');
			    }
			})
			Velocity.animate(buttomBlock, {
			    bottom:0
			}, {
				easing: "ease-in-out",
			    duration: 1500
			})

			Velocity.animate(tt, {
			    opacity:[1,0]
			}, {
				begin: ()=>tt.style.display='block',
			    duration: 400,
			    delay:2200,
			    complete:()=>ripple1.classList.add('wave')
			})
			.then(Velocity(tt,{
				opacity:0.85
			},{
			    duration: 600
			}))
			.then(Velocity(tt,{
				opacity:1
			},{
			    duration: 400,
			    complete:()=>{
			    	ripple2.classList.add('wave');
			    	Velocity.animate(buttomBlock, {
			    	    bottom:'-100%'
			    	}, {
			    		easing: "ease-in-out",
			    	    duration: 1000
			    	})
			    	Velocity.animate(topBlock, {
			    	    top:'-100%'
			    	}, {
			    		easing: "ease-in-out",
			    	    duration: 1000
			    	})
			    }
			}))
			.then(Velocity(tt,{
				opacity:0
			},{
			    duration: 600,
			    complete: function() {
			    	tt.parentElement.removeChild(tt);
			    	//that.welcomeComplete();
			    	that.$store.state.firstLoad = false;
			    }
			}))
			
			Velocity.animate(welcome, {
				blur: [8,0],
			    opacity:1
			}, {
			    duration: 400,
			    delay:2200
			})
			.then(Velocity(welcome,{
				blur: 1,
			},{
			    duration: 600
			}))
			.then(Velocity(welcome,{
				blur: 8,
				opacity:1
			},{
			    duration: 400
			}))
			.then(Velocity(welcome,{
				blur: 0,
				opacity:0
			},{
			    duration: 600,
			    complete: function() {
			    	welcome.parentElement.removeChild(welcome);
			    	document.body.style.overflowY='scroll';
			    }
			}))
		},
	}
}
</script>
<style lang='scss' scoped>
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
}
.welcomeText{
	position: absolute;
    top: 50%;
    left: 50%;
    width: 300px;
    height: 30px;
    transform:translate(-50%,-50%);
    background-image: url(../../../assets/img/welcome_text.png);
    background-size: 90% auto;
    background-position: center;
    background-repeat: no-repeat;
    background-color: #000;
    overflow: hidden;
}

.welcomeText:after{
	position: absolute;
    top: 0;
    left: 0;
    content: "";
    display: block;
    width: 300px;
    height: 30px;
    background-color: #fff;
}

.welcomeText.active:after {
	animation: show-text 1s ease 0s forwards;
}

/*block*/
.topBlock,.buttomBlock{
	position: absolute;
	width: 100%;
	height: 20%;
	background-color: black;
	//transition: all 1s ease-out;
}

.topBlock{
	top:-100%;
}

.buttomBlock{
	bottom:-100%;
}

/*ripple*/
.ripple {
  position: absolute;
  z-index: 1;
  opacity: 1;
}

.ripple.wave:before, .ripple.wave:after {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  width: 59px;
  height: 59px;
  border-radius: 50%;
  border: 2px solid rgba(64, 58, 62, 0.7);
  -webkit-filter: blur(0);
          filter: blur(0);
  -webkit-transform-origin: 50%;
          transform-origin: 50%;
  z-index: 1;
  animation:rip 2s 1 ease-out;
}

.ripple.wave:after {
  animation-delay:50ms;
}

#ripple1{
	top: 50%;
	left: 50%;
	margin-left:140px;
	margin-top:10px;
}

#ripple2{
	top: 50%;
    left: 50%;
    margin-left:-200px;
	margin-top:-70px;
}

@-webkit-keyframes rip{
	100% {
	border-color: transparent;
	-webkit-filter: blur(2px);
	        filter: blur(2px);
	-webkit-transform: scale(4);
	        transform: scale(4);
	-webkit-transition: 2100ms blur ease, 900ms border-color ease, 1000ms -webkit-transform ease;
	transition: 2100ms blur ease, 900ms border-color ease, 1000ms -webkit-transform ease;
	transition: 1000ms transform ease, 2100ms blur ease, 900ms border-color ease;
	transition: 1000ms transform ease, 2100ms blur ease, 900ms border-color ease, 1000ms -webkit-transform ease;
	}
}

@keyframes show-text {
	0%   { left: 0; }
	100% { left: 300px; }
}
</style>