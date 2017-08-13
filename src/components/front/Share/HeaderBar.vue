<template>
	<header class="headerBar" v-bind:class="classObj">
        <div class="site-top">
          	<div class="site-branding">
            	<div class="site-title">
	            	<h1>
	            		<a href="<?php bloginfo('url');?>">
	              			LG
	              		</a>
	            	</h1>
              	</div>
          	</div>
          	<div v-if="!user.name" class="header-user-avatar">
          		<router-link :to="{path:'/admin'}">
          	 		<img src="../../../assets/img/LG.png" width="30" height="30">
	         	</router-link>
          	   </div>
          	<div v-else class="header-user-avatar">
          		<img v-bind:src="user.avatar" width="30" height="30">
          	    <div class="header-user-menu">
          	        <div class="herder-user-name">
          	        	晚上好!
          	        	<div class="herder-user-name-u">{{user.name}}</div>
          	    	</div>
          	        <div class="user-menu-option">
          	        	<router-link :to="{path:'/admin'}">管理中心</router-link>
          	            <a href="http://localhost/wordpress/wp-admin/post-new.php" target="_top">撰写文章</a>
          	            <a href="http://localhost/wordpress/w·p-admin/profile.php" target="_top">个人资料</a>
          	        	<a href="http://localhost/wordpress/wp-login.php?action=logout&amp;redirect_to=http%3A%2F%2Flocalhost%2Fwordpress&amp;_wpnonce=4386ebd208" target="_top">退出登录</a>
          	        </div>
          	    </div>
          	</div>
	        <div class="lower">
	        	<div id="show-nav" class="showNav">
	            	<div class="line line1"></div>
	            	<div class="line line2"></div>
	            	<div class="line line3"></div>
	            </div>
	            <nav></nav><!--分类 -->
	        </div>
        </div>
      </header><!-- #masthead -->
</template>
<script>
import {mapState, mapActions} from 'vuex';

export default {
	data(){
		return {
			h1:0,
			h2:50,
			ss:this.getScrollTop(),
			yya:false,
			gizle:false,
			sabit:true
		}
	},
	mounted(){
		window.addEventListener('scroll', this.navDisplay)
	},
	computed:{
		classObj:function(){
			return {
				gizle:this.gizle,
				sabit:this.sabit,
				yya:this.yya
	 		}
		},
		...mapState(['user'])
	},
	methods:{
		navDisplay(){
			var s = this.getScrollTop();
			if(s== this.h1){
				this.yya = false;
			}
			if(s > this.h1){
				this.yya = true;
			}
			if(s > this.h2){
				this.gizle = true;
				if(s > this.ss){
					this.sabit = false;
				}else{
					this.sabit = true;
				}
				this.ss = s;
			}
		},
		getScrollTop(){
			return (document.documentElement && document.documentElement.scrollTop) || document.body.scrollTop;
		}
	}
}
</script>
<style lang="scss">
@keyframes header-user-menu{
	0% {
	    opacity: 0;
	    transform: translateY(-20px);
	}
	100% {
	    opacity: 1;
	    transform: translateY(0);
	}
}
header{
	&.headerBar{
		width: 100%;
	    background: none;
	    transition: all .5s ease;
	    position: fixed;
	    top: 0;
	    z-index:1;
	    .site-top {
		    width: 100%;
		    display: block;
		    margin: 0 auto;
		    padding: 0 20px;
		    font-family: miranafont,"Hiragino Sans GB",STXihei,"Microsoft YaHei",SimSun,sans-serif;
		}
	}
	&.yya {
	    position: fixed;
	    left: 0;
	    top: 0;
	    background: rgba(255, 255, 255, .98);
	    box-shadow: 0 0 1px rgba(0,0,0,.15);
	}
	&.gizle {
	    top: -100px;
	}
	&.sabit {
	    top: 0;
	    z-index: 1;
	}
}

.site-branding {
    float: left;
    position: relative;
    height: 75px;
    line-height: 75px;
    margin-left: -6px;
    .site-title {
	    margin: 0;
	    a {
	    	color: #464646;
			font-weight: 400;
			&:hover {
				color: #FE9600;
			}
	    }
	}
}
.header-user-avatar {
    position: relative;
    float: right;
    margin-left: 20px;
    margin-top: 22px;
    img {
	    border-radius: 100%;
	    cursor: pointer;
	}
	.header-user-menu {
	    position: absolute;
	    width: 130px;
	    right: 0;
	    text-align: left;
	    background: none;
	    padding-top: 20px;
	    margin-top: -10px;
	    display: none;
	    overflow: hidden;
	    animation: header-user-menu .4s;
	    .herder-user-name {
		    font-size: 12px;
		    background: #F5F5F5;
		    padding: 10px 10px;
		    border-bottom: 1px solid #eee;
		    border-radius: 4px 4px 0 0;
		    &:before{
		    	content: "";
	    	    width: 0;
	    	    height: 0;
	    	    border-left: 10px solid transparent;
	    	    border-right: 10px solid transparent;
	    	    border-bottom: 10px solid #F5F5F5;
	    	    position: absolute;
	    	    top: 10px;
	    	    right: 5px;
		    }
		    .herder-user-name-u {
		        font-weight: bold;
		        font-size: 14px;
		        overflow: hidden;
		        text-overflow: ellipsis;
		        -o-text-overflow: ellipsis;
		        white-space: nowrap;
		    }
		}
		.user-menu-option {
		    padding: 5px 0;
		    background: #F5F5F5;
		    border-radius: 0 0 4px 4px;
		    width: 130px;
		    a {
		        display: block;
		        padding: 6px 10px;
		        margin: 2px 0;
		        width: 100%;
		        text-align: left;
		        color: #333;
		        font-size: 13px;
		        &:hover{
		        	background-color: #f1f1f1;
		        }
		    }
		}
	}
}
.header-user-avatar:hover .header-user-menu {
    display: block;
}
.lower {
    position: relative;
    display: inline-block;
    float: right;
    margin: 16.5px 0 0 0;
    font-size: 15px;
    #show-nav {
	    position: relative;
	    float: right;
	    margin-left: 20px;
	    display: block;
	    width: 30px;
	    height: 33px;
	    margin-top: 4.5px;
	    cursor: pointer;
	    z-index: 999;
	    .line {
		    position: absolute;
		    top: 7px;
		    left: 50%;
		    width: 28px;
		    margin-left: -15px;
		    height: 2px;
		    background: #666;
		    -webkit-transition: all .2s ease;
		}
		.line1 {
		    top: 16px;
		}
		.line3 {
		    top: 25px;
		}
	}
}
</style>
