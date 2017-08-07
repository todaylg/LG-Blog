<template>
  <section class="login">
  <div id="bg" style="position: absolute; top: 0px; left: 0px; width: 100%; height: 100%; z-index: -1; overflow: hidden;"><img src="../../assets/img/bg1.png" style="display: block; opacity: 1; width:100%;height:100%;margin-top: 0px;"></div>

  <div id="login" @keyup.enter="doLogin">
      <h1><a href="http://localhost/wordpress/" title="LG-Blog" tabindex="-1">LG-Blog</a></h1>
    
  <form name="loginform" id="loginform">
    <p>
      <label for="user_login">用户名<br>
      <input type="text" name="log" id="user_login" class="input" value="" size="20"
               placeholder="username"
               v-model.trim="name"
        ></label>
    </p>
    <p>
      <label for="user_pass">密码<br>
              <input type="password" name="pwd" id="user_pass" class="input" value="" size="20"
               placeholder="password"
               v-model.trim="pwd"
        ></label>
    </p>
     
    <p class="submit">
      <input @click="doLogin()" class='button' value="登录">
    </p>
  </form>
    
    </div>

  </section>
</template>
<script>
  import {mapActions} from 'vuex';
  import {set}  from '../../assets/js/cookieUtil';

  export default{
    data(){
      return {
        name: '',
        pwd: '',
        info: ''
      }
    },
    methods: {
      doLogin(){
        if (!this.name.length) return this.info = '请输入正常的用户名'
        if (!this.pwd.length) return this.info = '请输入正常的密码'

        this.login({name: this.name, pwd: this.pwd})
          .then(() => {
            const date = new Date(Date.now() + 60000 * 30)
            set('user', this.name, date, '/', window.location.hostname)
            this.$router.push({path: '/'})
          })
          .catch(msg => this.info = msg)
      },
      clearInfo(){
        this.info = ''
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
#login {
    font: 14px/1.4 "Helvetica Neue","HelveticaNeue",Helvetica,Arial,sans-serif;
    position: absolute;
    background: rgba(255, 255, 255, 0.45);
    border-radius: 6px;
    top: 50%;
    left: 50%;
    width: 350px;
    padding: 0px !important;
    margin: -235px 0px 0px -190px !important;
    background-position: center 48%;
    h1 a {
        font-family: "Microsoft Yahei";
        font-weight: bold;
        text-indent: 0px;
        font-size: 0px;
        height: 64px;
        width: 100%;
        line-height: 88px;
        line-height: 180%;
        text-align: center;
        color: #FFF;
        text-shadow: 1px 1px 0px #000;
        margin-bottom: 10px;
        margin-top: 25px;
        background-image: url(../../assets/img/login.png);
        background-position: center bottom !important;
        background-size: contain;
        padding-top: 20px;
        box-shadow: none;
        background-repeat: no-repeat;
        margin: 0 auto 25px;
        padding: 0;
        outline: 0;
        display: block;
    }
    form {
        text-align:center;
        padding: 10px 0px;
        background: none;
        box-shadow: none;
        margin-top: 10px;
        p {
            font-family: "Microsoft Yahei";
            position: relative;
            padding: 0px 35px;
        }
        .input {
            border: 1px solid #EAEAEA;
            border-radius: 0px;
            background: none;
            padding: 5px 10px;
            color: #444;
            font-weight: normal;
            font-size: 14px;
            background: #FFF;
            font-family: "Microsoft Yahei";
            box-shadow: 0 0 0px 1000px white inset;
            height: 50px;
            border-radius: 3px;
            margin-top: 10px;
        }
    }
}
#login .submit .button {
    width: 100%;
    margin: 20px auto 40px;
    border: none;
    float: none;
    border-radius: 30px;
    height: 50px;
    font-size: 14px;
    text-align: center;
    color: #FFF;
    background: #FF5656;
    font-weight: normal;
    cursor: pointer;
    box-shadow: none;
    text-shadow: none;
    letter-spacing: 2px;
}
</style>
