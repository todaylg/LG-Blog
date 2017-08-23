<template>
<div>
	<figure class="bgContain">
		<img id="loginBG" src="../../assets/img/login_BG.png">
		<img id="login_yz" src="../../assets/img/login_yz.png">
		<img id='login_bz' src="../../assets/img/login_bz.png">
		<div class="container" :class="loginFlag?'logining':''">
			<h1>{{loginTip}}</h1>
			<div class="form">
				<input type="text" name="log" id="user_login" class="input" value="" size="20"
					 placeholder="username"
					 v-model.trim="username"
				>
				 <input type="password" name="pwd" id="user_pass" class="input" value="" size="20"
					 placeholder="password"
					 v-model.trim="pwd"
				>
				<button id="login-button" v-on:click.prevent="doLogin">Login</button>
			</div>
		</div>
	</figure>
	
	</div>
</template>
<script>
import {mapActions, mapState} from 'vuex';
import Velocity from "../../assets/js/velocity.min.js";

export default{
	data(){
		return {
			username: 'lg',
			pwd: '123',
			loginFlag:false,
			loginTip:'Welcome'
		}
	},
	mounted(){
		this.loginAnimation()
	},
	computed:{
	},
	methods: {
		doLogin(){
			if (!this.username.length) return this.loginTip = '用户名不能为空';
			if (!this.pwd.length) return this.loginTip = '密码不能为空';
			this.loginTip = 'Welcome';
			this.loginFlag = true;
			this.login({username: this.username, pwd: this.pwd});
		},
		clearInfo(){
			this.info = ''
		},
	loginAnimation(){
		var bg = document.querySelector('#loginBG');
		var bz = document.querySelector('#login_bz');
		var yz = document.querySelector('#login_yz');
		var panel = document.querySelector('.container');
		Velocity(bg, {
			blur: [4,0]
		}, {
		duration: 2000
		});
		Velocity(panel, {
			blur: [0,2]
		}, {
		duration: 2000
		});
		Velocity(bz,{
			blur: [0,6],
			translateX:[0,10]
		},{
		duration: 2500
		});
		Velocity(yz,{
			blur: [0,6],
			translateX:[0,-10]
		},{
			duration: 2500
		});
	},
	...mapActions(['login'])
	},
	watch: {
		name: 'clearInfo',
		pwd: 'clearInfo'
	}
}
</script>
<style lang="scss" scoped>
.bgContain {
	position:absolute;
	top:0;
	left:0;
	bottom:0;
	right:0;
	width: 100%;
	height: 100%;
	overflow-y: hidden;
	overflow-x: hidden;
	margin: 0;
	padding: 0;
	z-index: -1;
}

#login_yz{
	position: absolute;
	right: 10%;
	bottom: 0;
	filter:blur(8px);
	width: 15%;
}

#login_bz{
	position: absolute;
	left:10%;
	bottom: 0;
	filter:blur(8px);
	width: 19%;
}

.container ::-webkit-input-placeholder {
	/* WebKit browsers */
	font-family: 'Source Sans Pro', sans-serif;
	color: white;
	font-weight: 300;
}

.container :-moz-placeholder {
	/* Mozilla Firefox 4 to 18 */
	font-family: 'Source Sans Pro', sans-serif;
	color: white;
	opacity: 1;
	font-weight: 300;
}

.container ::-moz-placeholder {
	/* Mozilla Firefox 19+ */
	font-family: 'Source Sans Pro', sans-serif;
	color: white;
	opacity: 1;
	font-weight: 300;
}

.container :-ms-input-placeholder {
	/* Internet Explorer 10+ */
	font-family: 'Source Sans Pro', sans-serif;
	color: white;
	font-weight: 300;
}

.container {
	position: absolute;
	background: rgba(255,255,255,0.2);
	border-radius: 30px;
	top: 50%;
	left: 50%;
	width: 30%;
	transform: translate(-50%,-50%);
	opacity:1;
	padding: 80px 0;
	color:white;
	height: 400px;
	text-align: center;
	font-family: 'Source Sans Pro', sans-serif;
	font-weight: 300;
}

.container h1 {
	font-size: 40px;
	transition:transform .3s ease-in-out;
	font-weight: 200;
}

.container.logining h1{
	transform: translateY(85px);
}

.container.logining .form{
	opacity:0;
}

.form {
	padding: 20px 0;
	position: relative;
	z-index: 2;
	transition:opacity .3s ease-in-out;
}

.form input {
	-webkit-appearance: none;
	 -moz-appearance: none;
		appearance: none;
	outline: 0;
	border: 1px solid rgba(255, 255, 255, 0.4);
	background-color: rgba(255, 255, 255, 0.2);
	width: 250px;
	border-radius: 3px;
	padding: 10px 15px;
	margin: 0 auto 10px auto;
	display: block;
	text-align: center;
	font-size: 18px;
	color: white;
	-webkit-transition-duration: 0.25s;
		transition-duration: 0.25s;
	font-weight: 300;
}

.form input:hover {
	background-color: rgba(255, 255, 255, 0.4);
}

.form input:focus {
	background-color: white;
	width: 300px;
	color: #517c9d;
}

.form button {
	-webkit-appearance: none;
	 -moz-appearance: none;
		appearance: none;
	outline: 0;
	background-color: white;
	border: 0;
	padding: 10px 15px;
	color: #517c9d;
	border-radius: 3px;
	width: 250px;
	cursor: pointer;
	font-size: 18px;
	-webkit-transition-duration: 0.25s;
		transition-duration: 0.25s;
}

.form button:hover {
	background-color: #f5f7f9;
}

@media screen and (max-width: 900px){
	#login_yz{
	position: absolute;
	right: 10%;
	bottom: 0;
	width: 16%;
	}
	#login_bz{
	position: absolute;
	left:10%;
	bottom: 0;
	width: 20%;
	}
	.container {
	width:100%;
	}
}

</style>
