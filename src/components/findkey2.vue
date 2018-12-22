<template>
    <div class="main" :style="note">
      <div class="find-title">
        <i class="el-icon-arrow-left" @click="back" ></i>
        <label>密码设置</label>
      </div>
      <div class="find-pw">
        <label>输入密码：</label>
        <input v-model="password1" type="password" placeholder=""/>
      </div>

      <div class="find-pw">
        <label>确认密码：</label>
        <input v-model="password" type="password" placeholder="">
      </div>

      <div class="confirm">
        <a @click="submit">确认提交</a>
      </div>
      <div style="height: 230px;"></div>

      <div class="inp-info">
        <a>密码可包含数字、字母、下划线，长度不少于6位</a>
      </div>
    </div>
</template>

<script>
    export default {
        name: "findkey2",
        data(){
          return {
            account:'',
            password1: '',
            password: '',
            note:{
              backgroundImage:"url("+require("../assets/backpic.jpg")+")",
              backgroundRepeat: "no-repeat",
              backgroundSize: "100% 100%",
            }
          }
        },
      created(){
          this.account = this.$route.query.account
      },
        methods:{
          back(){
            this.$router.push({path:'/findkey1'})
          },
          submit(){
           let that = this
            if(that.password1 !== that.password)
              alert("密码不一致，请重新输入！")
            else{
              that.$axios({
                method: 'PUT',
                url:'/user/password',
                data:{
                  password: that.password
                }
              })
                .then(response => {
                  if(response.status === 200){
                    alert("已成功修改密码")
                    this.$router.push({path:'/'})
                  }
                  else if(response.status===400)
                    alert("密码设置错误，请重新输入")
                })
                .catch( e =>{
                  console.log(e)
                })
            }
          }
        }
    }
</script>

<style scoped>
  .find-title{
    line-height: 70px;
    display: block;
    background-color: #87CEEB;
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
