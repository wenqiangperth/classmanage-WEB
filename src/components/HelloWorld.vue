<template>
  <div class="main" :style="note">
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
      token:'',
      account: '',
      password: '',
      note:{
        backgroundImage:"url("+require("../assets/backpic.jpg")+")",
        backgroundRepeat: "no-repeat",
        backgroundSize: "100% 100%",
      }
    }
  },
  created(){

  },
  methods:{
    login(){
      let _this = this;
      _this.$axios({
        method: 'POST',
        url: '/user/login',
        data: {
          username: _this.account,
          password: _this.password
        },
        transformRequest: [function (data) {
          let ret = '';
          for (let it in data) {
            ret += encodeURIComponent(it) + '=' + encodeURIComponent(data[it]) + '&'
          }
          console.log(ret);
         return ret
        }],
        headers:{
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      })
        .then(res => {
           console.log(res);
          window.localStorage["token"]=res.headers.authorization;
          if(res.status===200){
              let arr=res.data.split(",");
              if(arr[0]==="{role=ROLE_STUDENT"){
                if(arr[1]===" isActive=1}"){
                  //学生已激活，进入主页
                  this.$router.push({
                    path:'/HomePage',
                    name:'HomePage',
                    query:{
                      account: this.account,
                      token: _this.token
                    }
                  })
                }
                if(arr[1]===" isActive=0}"){
                  this.$router.push({
                    path:'/activate',
                    name:'activate',
                    query:{
                      account: this.account,
                      token: _this.token
                    }
                  })
                }
              }
              if(arr[0]==="{role=ROLE_TEACHER"){
                if(arr[1]===" isActive=1}"){
                  this.$router.push({
                    path:'/teacher/HomePage',
                    query:{
                      account: this.account,
                      token: _this.token
                    }
                  });
                }
                if(arr[1]===" isActive=0}"){
                  this.$router.push({
                    path:'/teacher/EditPassword',
                    query:{
                      account: this.account
                    }
                  })
                }
              }


          }
          if(res.status!==200) {
            this.$message({
              type:'error',
              message:'账号/密码错误！'
            })
          }
        })
        .catch(e => {
          this.$message({
            type:'error',
            message:'账号/密码错误！'
          })
          console.log(e);
          _this.password='';
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
