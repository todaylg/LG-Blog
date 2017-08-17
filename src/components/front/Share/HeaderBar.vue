 <template>
	<header class="headerBar" v-bind:class="classObj">
        <div class="site-top">
          	<div class="site-branding">
            	<div class="site-title">
	            	<h1>
	            		<router-link :to="{name:'adminArticleCreate'}">
	              			LG
	              		</router-link>
	            	</h1>
              	</div>
          	</div>
	        <div class="burger_container" :class='navShow?"navOpen":"navClose"' @click="navShow = !navShow">
	        	<div id="burger">
	            	<div class="burger burger-top"></div>
	            	<div class="burger burger-middle"></div>
	            	<div class="burger burger-bottom"></div>
	            </div>
	            <nav class='navBar'>
		            <ul id="menu-test" class="menu">
		            	<li v-for="(cat,index) in catList">
	            			<router-link :to="{name:'category',params:{catname:cat.name}}">
	            	  			{{cat.name}}
	            	  		</router-link>
		            	</li>

		            	<!--静态数据-->
						<!-- <li>
							<router-link :to="{path:`category/${h1}`}">
	            	  			测试
	            	  		</router-link>
						</li> -->
					</ul>
				</nav><!--分类 -->
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
			sabit:true,
			navShow:false
		}
	},
	created(){
		this.getCatList();
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
		...mapState(['user','catList'])
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
		getScrollTop(){//TODO vuex
			return (document.documentElement && document.documentElement.scrollTop) || document.body.scrollTop;
		},
		...mapActions(['getCatList'])
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

@keyframes burgerTop{
	0% {
	    right: 0;
	    -webkit-transform: rotate(0deg);
	    transform: rotate(0deg);
	}
	20% {
	    right: 0;
	    -webkit-transform: rotate(15deg);
	    transform: rotate(15deg);
	}
	80% {
	    right: -5px;
	    -webkit-transform: rotate(-60deg);
	    transform: rotate(-60deg);
	}
	100% {
	    right: -5px;
	    -webkit-transform: rotate(-45deg);
	    transform: rotate(-45deg);
	}
}
@keyframes burgerBottom{
	0% {
	    right: 0;
	    -webkit-transform: rotate(0deg);
	    transform: rotate(0deg);
	}
	20% {
	    right: 0;
	    -webkit-transform: rotate(-15deg);
	    transform: rotate(-15deg);
	}
	80% {
	    right: -5px;
	    -webkit-transform: rotate(60deg);
	    transform: rotate(60deg);
	}
	100% {
	    right: -5px;
	    -webkit-transform: rotate(45deg);
	    transform: rotate(45deg);
	}
}
@keyframes burgerMiddle{
	0% {
	    width: 28px;
	}
	40% {
	    width: 30px;
	    left:-4px;
	}
	100% {
	    width: 0px;
	    left: 150%;
	}
}

@keyframes burgerTopBack{
	0% {
	    right: 0;
	    -webkit-transform: rotate(-45deg);
	    transform: rotate(-45deg);
	}
	20% {
	    right: 0;
	    -webkit-transform: rotate(-60deg);
	    transform: rotate(-60deg);
	}
	80% {
	    right: -5px;
	    -webkit-transform: rotate(15deg);
	    transform: rotate(15deg);
	}
	100% {
	    right: -5px;
	    -webkit-transform: rotate(0deg);
	    transform: rotate(0deg);
	}
}
@keyframes burgerBottomBack{
	0% {
	    right: 0;
	    -webkit-transform: rotate(45deg);
	    transform: rotate(45deg);
	}
	20% {
	    right: 0;
	    -webkit-transform: rotate(60deg);
	    transform: rotate(60deg);
	}
	80% {
	    right: -5px;
	    -webkit-transform: rotate(-15deg);
	    transform: rotate(-15deg);
	}
	100% {
	    right: -5px;
	    -webkit-transform: rotate(0deg);
	    transform: rotate(0deg);
	}
}
@keyframes burgerMiddleBack{
	0% {
		width: 0px;
	    left: 150%;
	}
	40% {
	    width: 20px;
	    right:4px;
	}
	100% {
	    width: 28px;
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

.burger_container {
    position: relative;
    display: inline-block;
    float: right;
    margin-top: 25px;
    font-size: 15px;
    #burger {
	    position: relative;
	    float: right;
	    display: block;
	    width: 28px;
	    height: 26px;
	    margin-left: 50px;
	    cursor: pointer;
	    z-index: 999;
	    .burger {
		    position: absolute;
		    top: 7px;
		    left: 50%;
		    width: 28px;
		    border-radius: 2px;
		    margin-left: -15px;
		    height: 2px;
		    background: #666;
		}
		.burger-top {
		    top: 0px;
		}
		.burger-middle {
		    top: 10px;
		}
		.burger-bottom {
		    top: 20px;
		}
	}
}
.burger_container.navOpen .burger-top{
	animation: burgerTop .6s linear normal;
	animation-fill-mode: forwards;
	transform-origin: 28px 1px;
}
.burger_container.navOpen .burger-middle{
    animation: burgerMiddle .4s linear normal;
    animation-fill-mode: forwards;
    transform-origin: 28px 1px;
}
.burger_container.navOpen .burger-bottom{
    animation: burgerBottom .6s linear normal;
    animation-fill-mode: forwards;
    transform-origin: 28px 1px;
}

.burger_container.navClose .burger-top{
	animation: burgerTopBack .6s linear normal;
	animation-fill-mode: forwards;
	transform-origin: 28px 1px;
}
.burger_container.navClose .burger-middle{
    animation: burgerMiddleBack .4s linear normal;
    animation-fill-mode: forwards;
    transform-origin: 28px 1px;
}
.burger_container.navClose .burger-bottom{
    animation: burgerBottomBack .6s linear normal;
    animation-fill-mode: forwards;
    transform-origin: 28px 1px;
}
.burger_container ul{
	margin: 0;
    padding: 0;
    list-style: none;
    display: inline-block;
}
.burger_container ul li{
	float: left;
    margin-left: 28px;
    position: relative;
    transition: all 1s ease;
}
.burger_container .navBar{
	position: relative;
    float: right;
    opacity: 0;
    transform: translateX(30px);
    transition:all .6s ease-in-out;
}
.burger_container.navOpen .navBar{
    opacity:1;
	transform: translateX(0);
}
.burger_container.navClose .navBar{
    opacity:0;
	transform: translateX(30px);
}

</style>
