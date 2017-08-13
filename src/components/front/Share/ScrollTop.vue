<template>
<div>
  <div id="backToTop"></div>
  <div class="gotop" @click.prevent="gotop">
      <img src="../../../assets/img/recive.png" width="100px" >
  </div>
</div>
</template>
<script>
export default {
  data(){
    return {
      isShowTop:false
    }
  },
  mounted(){
    window.addEventListener('scroll', this.handleScroll)
  },
  methods:{
    handleScroll(){
      if (window.scrollY > 200) {
      document.querySelector('.gotop').classList.add('isShowTop');
       var windowHeight = window.innerHeight;
       if(windowHeight<1100){//图片够长了
        document.querySelector('#backToTop').style.top = -(900-(windowHeight-150))+'px';
       }else{
        document.querySelector('#backToTop').style.top = 0;
       }
      } else {
        document.querySelector('.gotop').classList.remove('isShowTop');
        document.querySelector('#backToTop').style.top = -900+'px';
      }
    },
    gotop(){
      window.scrollTo(0,0)
    }
  }
}
</script>
<style lang="scss">
    .gotop {
      position: fixed;
      right: 20px;
      bottom: -10px;
      transition: all 1s;
    }
    .gotop.isShowTop{
      opacity:1;
      transform:translateY(0);
    }
    .gotop{
      opacity:0;
      transform:translateY(100%);
    }
    
    .gotop:hover {
      transform:rotate(3deg);
    }

    #backToTop {
      cursor: pointer;
      position: fixed;
      right: 0px;
      top: -900px;
      z-index: 2;
      width: 70px;
      height: 900px;
      background: url(../../../assets/img/line.png);
      transition: all .5s ease-in-out;
    }
</style>
