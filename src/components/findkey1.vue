<template>
    <div>
      <div class="find-title">
        <i class="el-icon-arrow-left" @click="backToLogin"></i>
        <label>找回密码</label>
      </div>

      <div class="find-pw">
        <label>学号/教工号：</label>
        <input type="number" placeholder=""/>
      </div>

      <div class="find-pw">
        <label>验证码：</label>
        <input type="number" placeholder="">
      </div>

      <div class="find-check">
        <button id="check">立即验证</button>
      </div>

      <div class="confirm">
        <a @click="confirmps">确认</a>
      </div>
    </div>
</template>

<script>
    export default {
        name: "findkey1",
        methods:{
          backToLogin(){
            this.$router.push({path:'/'})
          },
          confirmps(){
            this.$router.push({path:'/findkey2'})
          }
        }
    }
</script>

<style scoped>
  .find-title{
    line-height: 70px;
    display: block;
    background-color: #CCFF99;
    margin: 0 0px 90px 0;
    border-radius: 5px;
  }

  .find-title i{
    transform: translateX(-600%);
  }

  .find-title label{
    font-size: 23px;
    font-family: "Arial Narrow";
  }

  .find-pw{
    margin: 0 30px 20px 30px;
    border: 1px solid #66CCCC;
    border-radius: 25px;
  }

  .find-pw label{
    width:6em;
    white-space: nowrap;
    text-align: left;
    display:inline-block;
    color: grey;
  }

  .find-pw input{
    line-height:40px;
    color: darkslategrey;
    background-color:transparent;
    border:none;
    outline: none;
  }

  .find-check button{
    text-decoration: none;
    background: #CCFF99;
    border-radius: 4px;
    color: black;
    font-size: 15px;
    transform: translateX(150%);
  }

  .confirm a{
    display: block;
    width: 100%;
    text-align: center;
    line-height: 40px;
    color: #fff;
    background-color: #66CCCC;
    font-size: 17px;
    letter-spacing: 3px;
    border-radius: 25px;
    margin: 150px 0 20px 0;
  }
</style>
