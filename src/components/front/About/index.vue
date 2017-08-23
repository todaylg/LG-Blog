<template>
	<div class="about">
		<div class="bz_yz">
			<div class="bz_yz_Box">
				<img class='bz_yz_Img' id="bz_yz_1" src="../../../assets/img/about/about_yz.png">
				<img class='bz_yz_Img' id="bz_yz_2" src="../../../assets/img/about/about_yz_q1.png">
				<img class='bz_yz_Img' id="bz_yz_3" src="../../../assets/img/about/about_bz_s.png">
				<img class='bz_yz_Img' id="bz_yz_4" src="../../../assets/img/about/about_yz_q2.png">
				<img class='bz_yz_Img' id="bz_yz_5" src="../../../assets/img/about/about_bz.png">
				<img class='bz_yz_Img' id="bz_yz_6" src="../../../assets/img/about/about_bz_lh.png">
				<img class='bz_yz_Img' id="bz_yz_7" src="../../../assets/img/about/about_bz_q.png">
			</div>
			<h1 class="toMyself">『勿忘初心』</h1>
			<div class="intro">
				<h2>关于LG：</h2>
				<p>辽工大老学弟</p>
				<p>专业通信,误入前端</p>
				<p>重度沉迷撸码与动漫</p>
				<p>Rua~ 小僵尸一枚</p>
				<p>交朋♂友: <a title="Find Me" target="_blank" href="https://github.com/todaylg">Github</a>/<a title="Find Me" target="_blank" href="mailto:lg2lugang@gmail.com">Email</a></p>
			</div>
		</div>
	</div>
</template>
<script>
import Velocity from "../../../assets/js/velocity.min.js";

export default{
	mounted(){
		this.bz_yz_animation();
	},
	methods:{
		bz_yz_animation(){
			var bz_yz_1 = document.querySelector('#bz_yz_1');
			var bz_yz_2 = document.querySelector('#bz_yz_2');
			var bz_yz_3 = document.querySelector('#bz_yz_3');
			var bz_yz_4 = document.querySelector('#bz_yz_4');
			var bz_yz_5 = document.querySelector('#bz_yz_5');
			var bz_yz_6 = document.querySelector('#bz_yz_6');
			var bz_yz_7 = document.querySelector('#bz_yz_7');
			var intro =  document.querySelector('.intro');
			var toMyself =  document.querySelector('.toMyself');

			Velocity.animate(bz_yz_1, {
			    opacity:[1,0]
			}, {
			    duration: 2000
			})
			.then(Velocity(bz_yz_2,{
			    opacity:[1,0]
			},{
			    duration: 600,
			    delay:1000
			}))
			.then(Velocity(bz_yz_3,{
			    opacity:[1,0]
			},{
			    duration: 600,
			    delay:2200
			}))
			.then(Velocity(bz_yz_4,{
			    opacity:[1,0]
			},{
			    duration: 600,
			    delay:2500
			}))
			.then(Velocity(bz_yz_5,{
			    opacity:[1,0]
			},{
			    duration: 600,
			    delay:3500
			}))
			.then(Velocity(bz_yz_6,{
			    opacity:[1,0]
			},{
			    duration: 600,
			    delay:3500
			}))
			.then(Velocity(bz_yz_7,{
			    opacity:[1,0]
			},{
			    duration: 600,
			    delay:3500
			}))
			.then(Velocity(intro,{
			    opacity:[1,0],
			    translateX:[0,-100]
			},{
			    duration: 1000,
			    delay:4200
			}))
			.then(Velocity(toMyself,{
			    opacity:[1,0],
			    translateX:[0,100]
			},{
			    duration: 1000,
			    delay:5500
			}))
		}
	}
}
</script>
<style lang="scss">
.about{
	width: 100%;
    background-color: #fff;
    .bz_yz{
    	position: relative;
	    width: 1000px;
	    height: 600px;
	    margin: 0 auto;
	    margin-top:80px;
	    .bz_yz_Box{
	    	position:absolute;
	    	left:200px;
	    	top:0px;
	    	width:600px;
	    	height:546px;
			.bz_yz_Img{
				position:absolute;
				top:0;
				left:0;
				width:100%;
				opacity:0;
			}
	    }
    }
}
.toMyself{
	opacity:0;
	position: absolute;
    top: 200px;
    right: 50px;
    font-weight: normal;
    font-size: 24px;
    color: #666;
}
.intro{
	opacity:0;
	position: absolute;
    top: 0px;
    left: 0px;
    width: 180px;
    padding: 10px;
    font-size: 14px;
    color: #666;
    h2,p{
    	font-size: 16px;
	    color: #666;
	    font-weight: normal;
	    border-bottom: solid 1px #e0e0e0;
    }
    p{
    	text-align:center;
    	a{
    		font-size: 12px;
    		&:hover{
    			color:#e0e0e0;
    			cursor: pointer;
    		}
    	}
    }
}
</style>
