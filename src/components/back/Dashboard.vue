<template>
  <div class="dashboard">
      <nav class="menu" tabindex="0">
        <div class="smartphone-menu-trigger"></div>
        <header class="avatar">
          <router-link :to="{path:'/'}">
            <img src="../../assets/img/LG.png" />
          </router-link>
          <h4>晚上好</h4>
          <h2>todaylg</h2>
        </header>
        <ul>
          <li>
              <router-link :to="{path:'/admin/articleList'}" tag="li">
                <i></i>
                <span>文章列表</span>
              </router-link>
          </li>
          <li>
              <router-link :to="{path:'/admin/articleCreate'}" tag="li">
                <i></i>
                <span>新建文章</span>
              </router-link>
          </li>
          <li>
              <router-link :to="{path:'/admin/categoryEdit'}" tag="li">
                <i></i>
                <span>分类管理</span>
              </router-link>
          </li>
          <li>
              <router-link :to="{path:'/admin/userInfoEdit'}" tag="li">
                <i></i>
                <span>个人信息</span>
              </router-link>
          </li>
          <li>
              <router-link :to="{path:'/admin/commentEdit'}" tag="li">
                <i></i>
                <span>评论管理</span>
              </router-link>
          </li>
        </ul>
      </nav>
      <main>
          <router-view></router-view>
      </main>
  </div>
</template>
<script>
  
  import {mapState, mapMutations}   from 'vuex'

  export default{
    
  }
</script>
<style lang="scss" scoped>
  .dashboard{
    height:100%;
  }
  body {
    background: #ffea92;
    margin: 0;
    font-family: "Open Sans", Helvetica Neue, Helvetica, Arial, sans-serif;
    color: #fff;
    padding-left: 240px;
  }
  main {
    background-color:snow;
    margin-left:240px;
    position: relative;
    height: 100vh;
  }
  .menu {
    height: 100vh;
    width: 240px;
    position: fixed;
    top: 0;
    left: 0;
    z-index: 5;
    outline: none;
    background-color: #f8f8ff;
  }
  .menu .avatar {
    background: rgba(0, 0, 0, 0.1);
    padding: 2em 0.5em;
    text-align: center;
  }
  .menu .avatar img {
    width: 100px;
    border-radius: 50%;
    overflow: hidden;
    border: 4px solid black;
    box-shadow: 0 0 0 4px rgba(255, 255, 255, 0.2);
  }
  .menu .avatar h2 {
    font-weight: normal;
    margin-bottom: 0;
  }
  .menu ul {
    list-style: none;
    padding: 0.5em 0;
    margin: 0;
  }
  .menu ul li {
    text-align: center;
    padding: 1em 1em 1em 1em;
    font-size: 1em;
    font-weight: regular;
    background-repeat: no-repeat;
    background-position: left 15px center;
    background-size: auto 20px;
    transition: all 0.15s linear;
    cursor: pointer;
  }
  .menu ul li.icon-dashboard {
    background-image: url("http://www.entypo.com/images//gauge.svg");
  }
  .menu ul li.icon-customers {
    background-image: url("http://www.entypo.com/images//briefcase.svg");
  }
  .menu ul li.icon-users {
    background-image: url("http://www.entypo.com/images//users.svg");
  }
  .menu ul li.icon-settings {
    background-image: url("http://www.entypo.com/images//tools.svg");
  }
  .menu ul li:hover {
    background-color: rgba(0, 0, 0, 0.1);
  }
  .menu ul li:focus {
    outline: none;
  }
  @media screen and (max-width: 900px) and (min-width: 400px) {
    body {
      padding-left: 90px;
    }
    .menu {
      width: 90px;
    }
    main{
      margin-left:90px;
    }
    .menu .avatar {
      padding: 0.5em;
      position: relative;
    }
    .menu .avatar img {
      width: 60px;
    }
    .menu .avatar h2 {
      opacity: 0;
      position: absolute;
      top: 50%;
      left: 100px;
      margin: 0;
      min-width: 200px;
      border-radius: 4px;
      background: rgba(0, 0, 0, 0.4);
      transform: translate3d(-20px, -50%, 0);
      transition: all 0.15s ease-in-out;
    }
    .menu .avatar:hover h2 {
      opacity: 1;
      transform: translate3d(0px, -50%, 0);
    }
    .menu ul li {
      height: 60px;
      background-position: center center;
      background-size: 30px auto;
      position: relative;
    }
    .menu ul li span {
      opacity: 0;
      position: absolute;
      background: rgba(0, 0, 0, 0.5);
      padding: 0.2em 0.5em;
      border-radius: 4px;
      top: 50%;
      left: 80px;
      transform: translate3d(-15px, -50%, 0);
      transition: all 0.15s ease-in-out;
    }
    .menu ul li span:before {
      content: '';
      width: 0;
      height: 0;
      position: absolute;
      top: 50%;
      left: -5px;
      border-top: 5px solid transparent;
      border-bottom: 5px solid transparent;
      border-right: 5px solid rgba(0, 0, 0, 0.5);
      transform: translateY(-50%);
    }
    .menu ul li:hover span {
      opacity: 1;
      transform: translate3d(0px, -50%, 0);
    }
  }
  @media screen and (max-width: 400px) {
    body {
      padding-left: 0;
    }
    main{
      margin-left:0px;
    }
    .menu {
      width: 230px;
      box-shadow: 0 0 0 100em rgba(0, 0, 0, 0);
      transform: translate3d(-230px, 0, 0);
      transition: all 0.3s ease-in-out;
    }
    .menu .smartphone-menu-trigger {
      width: 40px;
      height: 40px;
      position: absolute;
      left: 100%;
      background: black;
    }
    .menu .smartphone-menu-trigger:before,
    .menu .smartphone-menu-trigger:after {
      content: '';
      width: 50%;
      height: 2px;
      background: #fff;
      border-radius: 10px;
      position: absolute;
      top: 45%;
      left: 50%;
      transform: translate3d(-50%, -50%, 0);
    }
    .menu .smartphone-menu-trigger:after {
      top: 55%;
      transform: translate3d(-50%, -50%, 0);
    }
    .menu ul li {
      padding: 1em 1em 1em 3em;
      font-size: 1.2em;
    }
    .menu:focus {
      transform: translate3d(0, 0, 0);
      box-shadow: 0 0 0 100em rgba(0, 0, 0, 0.6);
    }
    .menu:focus .smartphone-menu-trigger {
      pointer-events: none;
    }
  }

</style>
