<template>
    <div class="main" :style="note">
      <header class="home-title">
        <div class="homeTitle">
          <i class="el-icon-arrow-left" @click="back"></i>
          <label>账户邮箱</label>
          <el-dropdown trigger="click" @command="handleCommand">
            <span class="el-dropdown-link">
              <i class="el-icon-plus"></i>
            </span>
            <el-dropdown-menu class="el-dropDown" slot="dropdown">
              <el-dropdown-item command="per">
                <i class="el-icon-menu"></i>
                个人页
              </el-dropdown-item>
              <el-dropdown-item command="course">
                <i class="el-icon-star-on"></i>
                讨论课
              </el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </div>
      </header>

      <div class="change">
        <label style="font-weight: bold">e-mail:</label>
        <input v-model="email" type="text" placeholder="输入正确的邮箱格式"/>
      </div>

      <div class="icon">
        <i class="el-icon-message"></i>
      </div>

      <div class="confirm">
        <a @click="confirm">确认提交</a>
      </div>
      <div style="height: 170px"></div>
    </div>
</template>

<script>
    export default {
        name: "ChangeEmail",
      data(){
        return{
          email:'',
          note:{
            backgroundImage:"url("+require("../../assets/backpic.jpg")+")",
            backgroundRepeat: "no-repeat",
            backgroundSize: "100% 100%",
          }

        }
      },
      methods:{
        handleCommand(command){
          if(command === "course")
            this.$router.push({
              path:'/Courses/CoursePage'
            });
          else if(command==="per")
            this.$router.push({
              path:'/Account/ManageAccount'
            })
        },
        back(){
          this.$router.push('/Account/ManageAccount');
        },
        confirm(){
          let that = this;
          that.$axios({
            method:'PUT',
            url:'/user/email',
            headers:{
              'Authorization':window.localStorage['token']
            },
            data:{
              email: that.email
            }
          })
            .then(res=>{
              console.log(res);
              if(res.status===200){
                that.$message({
                  message:"邮箱修改成功！",
                  type:'success'
                });
                that.$router.push({path:'/Account/ManageAccount'})
              }
              if(res.status===400){
                alert("信息不合法")
              }
            })
            .catch(e=>{
              console.log(e)
            })
        }
      }
    }
</script>

<style scoped>
  .homeTitle{
    width: 100%;
    line-height: 70px;
    display: block;
    background-color:#87CEEB;
    border-radius: 5px;
  }

  .el-icon-arrow-left{
    transform: translateX(-380%);
  }

  .homeTitle label{
    font-style: normal;
    font-size: 25px;
  }

  .el-icon-plus{
    font-size: 25px;
    color: grey;
    font-weight: bold;
    transform: translateX(250%);
  }
  .el-dropDown{
    transform: translateX(70%);
  }
  .change{
    margin: 50px 30px 50px 30px;
    border: 1px solid #66CCCC;
    border-radius: 25px;
  }

  .icon{
    color: #66cccc;
    font-size: 80px;
  }

  .el-icon-message{
    color: #66cccc;
  }

  .change label{
    width:6em;
    white-space: nowrap;
    text-align: left;
    display:inline-block;
    color: grey;
  }

  .change input{
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

</style>
