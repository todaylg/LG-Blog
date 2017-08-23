<template>
	<section class='categoryEdit'>
		<div class="page">
			<h1>分类目录</h1>
	 		<input class="addCatIpt" placeholder="分类名称" v-model="catName">
	 		<input class="addCatIpt" placeholder="分类简介" v-model="catIntro">	
			<div>
				<button class="addCatBtn"
				@click="add">新增分类
				</button>
			</div>
			<table class="layout display responsive-table">
				<thead>
				<tr>
					<th>分类目录名称</th>
					<th>分类目录简介</th>
					<th>删除</th>
					<th>更改</th>
				</tr>
				</thead>
				<tbody>
					<tr v-for="(cat,index) in catList">
						<td class="organisationnumber">{{cat.name}}</td>
						<td class="organisationnumber">{{cat.intro}}</td>
						<td class="actions">
							<a class="remove-item" title="Delete" @click="del(cat._id)">Delete</a>
						</td>
						<td>
							<input v-model='inputVal' type="text" size='20'>
							<span	@click="update(cat._id,inputVal)">Save</span>
						</td>
					</tr>
				</tbody>
			</table>
		</div>
	</section>
</template>
<script>
import {mapActions, mapState} from 'vuex';

export default{
	data(){
		return {
			inputVal:''
		}
	},
	created(){
		this.getCatList()
	},
	methods: {
		add(){
			this.addCategory()
			.catch(err => console.log(err))
		},
		del(id){
			this.delCategory(id)
			.catch(err => console.log(err))
		},
		update(id,val){
			this.updateCat({id,val})
			.catch(err => console.log(err))
		},
		...mapActions(['addCategory','getCatList','delCategory','updateCat'])
	},
	computed: {
		catName: {
			get(){
					return this.$store.state.catEdit.catName
			},
			set(value){
				this.$store.commit('SET_CATEDITNAME', value)
			}
		},
		catIntro:{
			get(){
				return this.$store.state.catEdit.catIntro
			},
			set(value){
				this.$store.commit('SET_CATEEDITINTRO', value)
			}
		},
		...mapState(['catList']),
	}
}
</script>
<style lang="scss">
 .page{
	max-width: 65em;
	margin: 0 auto;
	.addCatIpt{
		text-align: center;
		box-sizing: border-box;
		padding: 5px;
		margin: 10px 0 10px 70%;
		height: 20px;
		display: block;
		font-size: 15px;
		color: black;
		width: 20%;
	}
	.addCatBtn{
		padding: 3px 60px;
		border: 1px solid #ede3dc;
		border-radius: 50px;
		color: black;
		margin: 10px 0 10px 70%;
		width: 20%;
		&:hover{
			color: #667783;
			border-color: #566d80;
		}
	}
	table th,
	table td{
		text-align: left;
	}
	table.layout{
		width: 100%;
		border-collapse: collapse;
	}
	table.display{
		margin: 1em 0;
	}
	table.display th,
	table.display td{
		text-align:center;
		border: 1px solid #B3BFAA;
		padding: .5em 1em;
	}

	table.display th{ background: #fdf6f1; }
	table.display td{ background: #fff; }

	table.responsive-table{
		box-shadow: 0 1px 10px rgba(0, 0, 0, 0.2);
	}
}

@media (max-width: 30em){
	.page{
		table.responsive-table{
			box-shadow: none;	
		}
 		table.responsive-table thead{
	 		display: none; 
		}
		table.display th,
		table.display td{
			padding: .5em;
		}
 
		table.responsive-table tr,
		table.responsive-table td{
 			display: block;
 		}
		 table.responsive-table tr{
		 	position: relative;
		 	margin-bottom: 1em;
		 	box-shadow: 0 1px 10px rgba(0, 0, 0, 0.2);
		 }
		 table.responsive-table td{
		 	border-top: none;
		 }
		 table.responsive-table td.organisationnumber{
		 	background: #fdf6f1;
		 	border-top: 1px solid #B3BFAA;
		 }
		 table.responsive-table td.actions{
		 	position: absolute;
		 	top: 0;
		 	right: 0;
			border: none;
			background: none;
		}
	}
}
</style>
