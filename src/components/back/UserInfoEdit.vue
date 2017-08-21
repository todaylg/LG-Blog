<template>
  <section class="account">
    <div class="title">用户信息</div>
    <header class="avatar">
        <img v-bind:src="userInfo.avatar" />
      <h4>{{userInfo.username}}</h4>
      <h5>{{userInfo.intro}}</h5>
    </header>
    <div class="title">修改密码</div>
    <div class="password">
      <i class="fa fa-key fa-fw"></i>
      <input type="password"
             placeholder="输入新密码"
             v-model="pwd">
      <br>
      <i class="fa fa-key fa-fw"></i>
      <input type="password"
             placeholder="再输入一次"
             v-model="pwdRepeat">
    </div>
    <div class="panel">
      <button @click="savePwd">保存</button>
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
    computed: mapState(['userInfo']),
    methods: {
      savePwd(){
        if (this.pwd === this.pwdRepeat) {
          //this.$store.dispatch('savePwd', this.pwd)
        }
      },
      ...mapActions(['getUserinfo'])
    }
  }
</script>
<style lang="scss" scoped>

  section.account {
    height: 100%;
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
    .password {
      width: 260px;
      margin: 100px auto 40px auto;
      input {
        height: 30px;
        padding: 6px;
        margin: 10px auto;
        border-bottom: 1px solid black;
      }
    }
    .panel {
      position: absolute;
      bottom: 40px;
      right: 100px;
      button {
        height: 30px;
        width: 80px;
      }
    }
  }
</style>
