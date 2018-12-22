<template>
  <div class="note" :style="note">
    <div class="login-form">
      <div class="login-title">

        <a >讨论课管理系统登陆</a>
      </div>

      <el-form class="login">
        <div class="login-input">
          <label>学/工号:</label>
          <input v-model="account" type="text"  placeholder=""/>
        </div>

        <div class="login-input">
          <label>密码:</label>
          <input v-model="password" type="password" placeholder="" />
        </div>

        <div class="login-input">
          <a v-on:click="login">登陆</a>
        </div>

        <div class="login-txt">
          <a href="#/findkey1">忘记密码</a>
        </div>

        <div class="divHeight" style="height:300px"></div>

      <div class="login-info">
        <a>初始密码为123456</a>
      </div>
      </el-form>
    </div>
  </div>
</template>

<script>
export default {
  name: 'HelloWorld',
  data () {
    return {
      msg: 'Welcome to Your Vue.js App',
      account: '',
      password: '',
      note:{
        backgroundImage:"url("+require("../assets/backpic.jpg")+")",
        backgroundRepeat: "no-repeat",
        backgroundSize: "100% 100%",
      }
    }
  },
  methods:{
    login(){
      let _this = this;
      _this.$axios({
        method: 'POST',
        url: '/user/login',
        data: {
          account: _this.account,
          password: _this.password
        }
      })
        .then(response => {
          console.log(response);
          if(response.data.status===200){
            let data=response.data

            //将token与userId存入本地
            window.localStorage["token"]=response.data.data.token;
            window.localStorage["userId"]=response.data.data.user.userId;

            //有token说明有此用户
            if(localStorage.getItem('token')){
              if(response.data.role==="student" && response.data.isActived===1){
                //已激活，进入主页
                _this.$router.push({
                  path:'/HomePage',
                  name:'HomePage',
                  query:{
                    account: response.data.account
                  }
                }),
                  console.log(response)
              }else if(response.data.role==="teacher" && response.data.isActived===1){
                _this.$router.push({path:'/teacher/HomePage'});
                console.log(response.data);
              }else if(response.data.role==="student" && response.data.isActived===0){
                //激活
                _this.router.push({
                  path:'/activate',
                  name:'activate',
                  account: response.data.account
                })
              }
            }
          }
          else {
            alert("账号/密码错误！");
            console.log(response.data);
          }
        })
        .catch(error => {
          console.log(error);
        });
    }

  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1, h2 {
  font-weight: normal;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}

  .login-title a{
    display: block;
    background-color: #87CEEB;
    border-radius: 10px;
    font-style: inherit;
    font-family: 华文彩云;
    font-size: 30px;
    line-height: 90px;
    margin: 0 0 120px 0;
  }

  .login-input{
    margin:0 30px 15px 30px;
    border:1px solid #66CCCC;
    border-radius:25px;
  }

  .login-input label{
    width: 5em;
    text-align:center;
    display:inline-block;
    color: grey;
  }

  .login-input input{
    line-height:40px;
    color: darkslategrey;
    background-color:transparent;
    border:none;
    outline: none;
  }


  .login-input a{
    display: block;
    width: 100%;
    text-align: center;
    line-height: 40px;
    color: #fff;
    background-color: #66CCCC;
    font-size: 17px;
    letter-spacing: 5px;
    border-radius: 25px;
  }

  .login-txt a{
    padding-left: 240px;
  }

  .login-info a{
    color: red;
    position: absolute;
    bottom: 0;
    text-align: center;
    font-style: italic;
    font-size: 12px;
  }
</style>
