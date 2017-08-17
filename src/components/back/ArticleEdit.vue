<template>
  <section class="editor">
    <input class="title"
           placeholder="标题"
           v-model="title">

    <select  v-model="belongCat"><!--TODO设置默认值-->
     <option v-for="cat in catList">{{cat.name}}</option>
   </select>

    <div :class="inspected?'inspect':'edit'">
      <textarea v-model="content" spellcheck="false"></textarea>
      <button class="toggle"
              @click="inspected = !inspected">
      </button>
      <article id="a" v-html="markedContent"></article>
    </div>
    <div class="panel">
      <button class="saveArticle"
              @click="save">保存
      </button>
    </div>
  </section>
</template>
<script>
import {mapActions, mapMutations, mapState} from 'vuex';
import marked     from '../../assets/js/marked.min';
import hljs       from '../../assets/js/highlight.pack';

export default{
 data(){
   return {
     inspected: false,
     markedContent:''
   }
 },
 created(){
    this.getCatList(),
    this.getArticle({atitle:this.$route.params.atitle})//显示当前文章
 },
 updated(){
   this.highlight()
 },
 methods: {
   save(){
     this.updateArticle();
   },
   highlight(){
     setTimeout(() => {
       hljs.initHighlighting.called = false
       hljs.initHighlighting()
     }, 0)
   },
   ...mapActions(['getArticle', 'updateArticle','getCatList']),
   ...mapMutations(['SET_ARTICLE'])
 },
 computed: {
   content: {
     get(){
       this.markedContent = marked(
         this.$store.state.article.content || '',
         {sanitize: true}
       )
       this.highlight()
       return this.article.content
     },
     set(value){
       this.$store.commit('UPDATE_CONTENT', value)
     }
   },
   title: {
     get(){
       return this.article.title
     },
     set(value){
       this.$store.commit('UPDATE_TITLE', value)
     }
   },
   belongCat:{
    get(){
      return this.article.belongCat
    },
    set(value){
      this.$store.commit('UPDATE_BELONGCAT', value)
    }
   },
   ...mapState(['article','catList'])
 }
}
</script>
<style lang="scss">
  section.editor {
    height: 100%;
    .title {
      text-align: center;
      box-sizing: border-box;
      padding: 10px;
      margin: 0 auto;
      height: 50px;
      display: block;
      font-size: 30px;
      color: black;
    }
    textarea, button, article {
      box-sizing: border-box;
      border-radius: 6px;
      height: 100%;
      float: left;
      transition: width 0.6s;
      font-size: 16px;
      line-height: 1.8;
      border: 1px solid black;
    }
    textarea, article {
      resize: none;
      padding: 20px;
      overflow-y: auto;
    }
    button {
      margin: 0 10px;
      width: 20px;
      text-align: center;
    }
    .edit, .inspect {
      height: 80%;
      margin: 0 50px;
      overflow: hidden;
    }
    .edit {
      textarea {
        width: calc(100% - 40px);
      }
      article {
        width: 0;
      }
    }
    .inspect {
      textarea {
        width: calc(50% - 20px);
      }
      article {
        width: calc(50% - 20px);
      }
    }
    .panel {
      margin: 20px 50px;
      position: relative;
      height: 30px;
      line-height: 30px;
      input {
        text-align: center;
        border-bottom: 1px solid black;
      }
      button.saveArticle {
        float: right;
        height: 30px;
        width: 80px;
      }
    }
    article {
      line-height: 1.6;
      padding-bottom: 160px;
      h2, h3, h4, h5, h6 {
        position: relative;
        margin: 1em 0;
        &:before {
          content: "#";
          color: black;
          position: absolute;
          left: -0.7em;
          top: -4px;
          font-size: 1.2em;
          font-weight: bold;
        }
      }
      h4, h5, h6 {
        &:before {
          content: ""
        }
      }
      h2, h3 {
        font-size: 22px
      }
      h4, h5, h6 {
        font-size: 18px
      }
      a {
        color: black;
        word-break: break-all;
      }
      blockquote {
        margin: 2em 0;
        padding-left: 20px;
        border-left: 4px solid black;
      }
      img {
        display: block;
        max-width: 100%;
        margin: 1em auto
      }
      code,
      pre {
        font-size: 0.8em;
        background-color: #f8f8f8;
        font-family: 'Roboto Mono', Monaco, courier, monospace;
        color: #525252;
      }
    }
  }
</style>
