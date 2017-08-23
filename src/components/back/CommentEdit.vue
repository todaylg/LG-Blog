<template>
	<section class='commentEdit'>
		<div class="page">
			<h1>评论管理</h1>
			<table class="layout display responsive-table">
				<thead>
					<tr>
						<th>用户名</th>
						<th>Email地址</th>
						<th>用户站点</th>
						<th>评论文章</th>
						<th>评论内容</th>
						<th>评论时间</th>
						<th>操作</th>
					</tr>
				</thead>
				<tbody>
					<tr v-for="(comment,index) in commentList">
						<td class="organisationnumber">{{comment.username}}</td>
						<td class="organisationnumber">{{comment.email}}</td>
						<td class="organisationnumber">{{comment.website}}</td>
						<td class="organisationnumber">{{comment.atitle}}</td>
						<td class="organisationnumber">{{comment.content}}</td>
						<td class="organisationnumber">{{comment.created | toDate}}</td>
						<td class="actions">
							<router-link class="edit-item" :to="{ name: 'article', params: {atitle: comment.atitle } }"><!--实际上线的时候这里要变成target:_blank-->
								查看
							</router-link>
							<a class="remove-item" title="Delete" @click="del(comment._id)">删除</a>
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
	created(){
		this.getCommentList()
	},
	computed: {
		...mapState(['commentList'])
	},
	methods: {
		del(id){
			this.delComment(id);
		},
		...mapActions(['getCommentList','delComment'])
	}
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
