<template>
	<section class="articleList">
		<div class="page">
			<h1>文章列表</h1>
			<table class="layout display responsive-table">
				<thead>
					<tr>
						<th>标题</th>
						<th>分类</th>
						<th>日期</th>
						<th>操作</th>
					</tr>
				</thead>
				<tbody>
					<tr v-for="(article,index) in articles">
						<router-link :to="{name:'adminArticleEdit',params:{atitle:article.title}}"
						 tag="td">
							{{article.title}}
						</router-link>
						<td>
							{{article.category}}
						</td> 
						<td>
							{{article.created | toDate}}
						</td>
						<td>
							<router-link class="fa fa-pencil-square-o"
							 :to="{name:'editor',query:{id:article._id}}"
							 tag="i">
							</router-link>
							<span
						 	@click="delArticle(article._id)">Delete
							</span>
						</td>
					</tr>
				</tbody>
			</table>
		</div>
	</section>
</template>
<script>
import {mapState, mapActions} from 'vuex';
export default{
	created(){
		this.getArticleList();
	},
	computed: mapState(['articles']),
	methods: mapActions(['getArticleList','delArticle'])
}
</script>
<style lang="scss" scoped>
.page{
	max-width: 65em;
	margin: 0 auto;
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
