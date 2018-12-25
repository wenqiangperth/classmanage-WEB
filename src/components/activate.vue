<template>
  <div class="main" :style="note">
    <div class="activate-form">
      <div class="inp-title">
        <i class="el-icon-arrow-left" @click="back"></i>
        <label >密码设置</label>
      </div>

      <div class="inp-pw">
        <label >输入密码：</label>
        <input v-model="password1" type="password" placeholder="">
      </div>

      <div class="inp-pw">
        <label>确认密码：</label>
        <input v-model="password" type="password" placeholder="">
      </div>

      <div class="inp-pw">
        <label>填写邮箱：</label>
        <input v-model="email" type="email" placeholder="">
      </div>
<!--
      <div class="inp-pw">
        <label>验证码：</label>
        <input type="number" placeholder="">
      </div>

      <div class="inp-check">
        <button id="check">发送验证码</button>
      </div>
-->
      <div class="inp-sub">
        <a @click="submit">确认提交</a>
      </div>

      <div style="height:220px"></div>
      <div class="inp-info">
        <a>密码可包含数字、字母、下划线，长度不少于6位</a>
      </div>
    </div>

  </div>

</template>

<script>
    export default {
        name: "activate",
        data(){
          return {
            token:'',
            password1:'',
            password:'',
            email:'',
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
          back(){
            this.$router.push({path:'/'})
          },
          submit(){
            let that=this;
            if(that.password !== that.password1){
              this.$message({
                type:'error',
                message:'密码不一致，请重新输入'
              })
            }
            else
              that.$axios({
                method: 'PUT',
                url: '/student/active',
                headers:{
                  'Authorization': window.localStorage['token']
                },
                data:{
                  password: that.password,
                  email: that.email
                }
              })
                .then(res => {
                  if(res.status===200)
                    window.localStorage['token']=res.headers.authorization;
                    this.$message({
                      type:'success',
                      message:'账号激活成功'
                    });
                    this.$router.push({path:'/'});
                  if(res.status===400)
                    alert("信息不合法,检验邮箱是否正确！")
                })
                .catch(error => {
                  console.log(error)
                })
          }
        }
    }
</script>

<style scoped>
  .inp-title{
    line-height: 70px;
    display: block;
    background-color: #87CEEB;
    margin: 0 0px 80px 0;
    border-radius: 5px;
  }

  .inp-title label{
    font-size: 25px;
  }
  .inp-title i{
    transform: translateX(-600%);

  }

  .inp-pw{
    margin:0 30px 20px 30px;
    border:1px solid #66CCCC;
    border-radius:25px;
  }

  .inp-sub{
    margin: 90px 30px 20px 30px;
    border: 1px solid #66CCCC;
    border-radius: 25px;
  }

  .inp-pw label{
    width:5em;
    white-space: nowrap;
    text-align: left;
    display:inline-block;
    color: grey;
  }

  .inp-pw input{
    line-height:40px;
    color: darkslategrey;
    background-color:transparent;
    border:none;
    outline: none;
  }

  .inp-sub a{
    display: block;
    width: 100%;
    text-align: center;
    line-height: 40px;
    color: #fff;
    background-color: #66CCCC;
    font-size: 17px;
    letter-spacing: 3px;
    border-radius: 25px;
  }

  .inp-check button{
    text-decoration: none;
    background: #CCFF99;
    border-radius: 4px;
    color: black;
    font-size: 15px;
    transform: translateX(120%);
  }

  .inp-info a{
    color: red;
    position: absolute;
    bottom: 0;
    font-style: italic;
    font-size: 12px;
    white-space: nowrap;
    transform: translateX(-50%);
  }
</style>
