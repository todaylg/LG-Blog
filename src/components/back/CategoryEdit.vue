<template>
  <section>
    <input placeholder="分类名称" v-model="catName"> 
    <div>
      <button class="saveArticle"
              @click="add">新增分类
      </button>
    </div>
  	  <div class="page">
  	 <h1>分类目录</h1>
  	<table class="layout display responsive-table">
  	    <thead>
  	        <tr>
  	            <th>分类目录名称</th>
  	            <th>操作</th>
  	        </tr>
  	    </thead>
  	    <tbody>
  	        <tr v-for="(cat,index) in catList">
  	            <td class="organisationnumber">{{cat.name}}</td>
  	            <td class="actions">
  	                <a class="edit-item" title="Edit" @click="inspected = !inspected">Edit</a>
  	                <a class="remove-item" title="Delete" @click="del(cat._id)">Delete</a>
  	            </td>
  	            <td v-if='!inspected'>
  	            	<input v-model='inputVal' type="text" size='20'>
  	            	<span  @click="update(cat._id,inputVal)">Save</span>
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
	    inspected: false,
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
		  		return this.$store.state.catName
			},
			set(value){
				this.$store.commit('SET_CATEGORY', value)
			}
		},
		...mapState(['catList']),
	}
}
</script>
<style lang="scss">
  .page{
    max-width: 60em;
    margin: 0 auto;
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
    border: 1px solid #B3BFAA;
    padding: .5em 1em;
  }

  table.display th{ background: #D5E0CC; }
  table.display td{ background: #fff; }

  table.responsive-table{
    box-shadow: 0 1px 10px rgba(0, 0, 0, 0.2);
  }

  @media (max-width: 30em){
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
      
    table.responsive-table td:nth-child(1):before{
      content: 'Number';
    }
    table.responsive-table td:nth-child(2):before{
      content: 'Name';
    }
    table.responsive-table td:nth-child(1),
    table.responsive-table td:nth-child(2){
      padding-left: 25%;
    }
    table.responsive-table td:nth-child(1):before,
    table.responsive-table td:nth-child(2):before{
      position: absolute;
      left: .5em;
      font-weight: bold;
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
          background: #D5E0CC;
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
</style>
