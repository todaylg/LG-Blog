<template>
	<section class="account">
		<div class="page">
			<h1>个人信息</h1>
			<header class="avatar">
				<img v-bind:src="userInfo.avatar" />
				<h4>{{userInfo.username}}</h4>
				<h5>{{userInfo.intro}}</h5>
			</header>
			<div class="title">修改密码</div>
			<div class="password">
				<input type="password"
					placeholder="输入新密码"
					v-model="pwd">
					<br>
				<input type="password"
			placeholder="再输入一次"
			v-model="pwdRepeat">
	</div>
	<div class="logout">
		<button @click="logout">注销</button>
	</div>
	<div class="panel">
		<button @click="savePwd">保存</button>
	</div>
		</div>
	</section>
</template>
<script>
import {mapState, mapActions} from 'vuex';

export default{
	data(){
		return {
			pwd: '',
			pwdRepeat: ''
		}
	},
	created(){
		this.getUserinfo()
	},
	computed: {
		...mapState(['userInfo'])
	},
	methods: {
		savePwd(){
			if (this.pwd === this.pwdRepeat&&this.pwd!='') {
				this.changePwd({_id:this.userInfo._id,password:this.pwd})
			}
		},
		logout(){
			this.logoutUser();
		},
		...mapActions(['getUserinfo','logoutUser','changePwd'])
	}
}
</script>
<style lang="scss" scoped>
.account {
	height: 100%;
}
.page{
	margin: 0 auto;
	.avatar {
		background: rgba(0, 0, 0, 0.1);
		padding: 2em 0.5em;
		text-align: center;
	}
	.avatar img {
		width: 100px;
		border-radius: 50%;
		overflow: hidden;
		border: 4px solid black;
		box-shadow: 0 0 0 4px rgba(255, 255, 255, 0.2);
	}
	.avatar h2 {
			font-weight: normal;
			margin-bottom: 0;
	}
	.title{
		text-align: center;
		margin: 20px;
		font-size: 20px;
	}
	.password {
		width: 30%;
		margin: 40px auto;
		text-align:center;
		input {
		width: 100%;
		height: 40px;
		text-align: center;
		box-sizing: border-box;
		padding: 5px;
		display: block;
		font-size: 15px;
		color: black;
		}
	}
	.logout{
		position: absolute;
		bottom: 40px;
		left: 30px;
		button {
			height: 50px;
			width: 300%;
			border: 1px solid #ede3dc;
			border-radius: 50px;
			color: black;
		}
	}
	.panel {
		position: absolute;
		bottom: 40px;
		right: 100px;
		button {
			height: 50px;
			width: 300%;
			border: 1px solid #ede3dc;
			border-radius: 50px;
			color: black;
		}
	}
}
</style>
