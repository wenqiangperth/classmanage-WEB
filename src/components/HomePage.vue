<template>
    <div class="note" :style="note">
      <header class="home-title">
        <div class="homeTitle">
          <i class="el-icon-arrow-left" @click="back"></i>
          <label>个人主页</label>
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

      <div class="per-info b-line" style="margin-top: 20px">
        <div class="per-pic">
          <img src="../assets/user.png"/>
        </div>
        <div class="per-in">
          <h2>{{name}}</h2>
          <span>学号：{{accountNumber}}</span>
        </div>
      </div>

      <div class="per-box" style="margin-top: 40px">
        <div class="per-box1">
          <i class="el-icon-document"></i>
          <label @click="findCourse">我的课程</label>
          <i class="el-icon-d-arrow-right"></i>
        </div>

        <div class="per-box1" style="margin-top: 20px;">
          <i class="el-icon-bell"></i>
          <label @click="account">账号安全</label>
          <i class="el-icon-d-arrow-right"></i>
        </div>
        <div style="height:350px"></div>
      </div>
    </div>
</template>

<script>
    export default {
        name: "HomePage",
      data(){
        return {
          name: '',
          accountNumber:'',
          note:{
            backgroundImage:"url("+require("../assets/backpic.jpg")+")",
            backgroundRepeat: "no-repeat",
            backgroundSize: "100% 100%",
          }

        }
      },
      created(){
          this.getData();
          let that=this
          that.$axios({
            method:'GET',
            url:'/user/information?userId=${localStorage.userId}',
            headers:{
              'token': window.localStorage['token']
            }
          })
            .then(response=>{
              if(response.status===200){
                that.name=response.data.name
              }
            })
            .catch(e=>{
              console.log(e)
            })
      },
      methods:{
          handleCommand(command){
            if(command === "course")
              this.$router.push({
                path:'/Courses/CoursePage'
              })
          },

          back(){
            this.$router.push({path:'/'});
          },

          findCourse(){
            this.$router.push({path:'/Courses/MyCourse'})
          },

          getData(){
            this.accountNumber = this.$route.query.account
            //console.log('id',this.id)
            console.log('accountNumber',this.accountNumber)
          },

          account(){
            this.$router.push({path:'/Account/ManageAccount'});
          }
      }
    }
</script>

<style scoped>

  .divHeight{
    width: 100%;
    height: 20px;
    background: #f5f5f5;
    position: relative;
    overflow: hidden;
  }

  .homeTitle{
    width: 100%;
    line-height: 70px;
    display: block;
    background-color: #87CEEB;
    border-radius: 5px;
  }

  .el-icon-arrow-left{
    transform: translateX(-500%);
  }

  .homeTitle label{
    font-style: normal;
    font-size: 25px;
  }

  .el-icon-plus{
    font-size: 25px;
    color: grey;
    font-weight: bold;
    transform: translateX(340%);
  }
  .el-dropDown{
    transform: translateX(90%);
  }

  .aui-center span{
    text-align: center;
    width: 100%;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    font-size: 1.15rem;
    color: #333;
  }

  .per-info{
    display: -webkit-box;
    display: -webkit-flex;
    display: flex;
    -webkit-box-align: center;
    -webkit-align-items: center;
    align-items: center;
    padding: 15px;
    position: relative;
  }
  
  .b-line{
    position: relative;
  }

  .per-pic{
    width:60px;
    height:60px;
    margin-right:0.6rem;
    position:relative;
  }

  .per-pic img{
    width:80px;
    height:80px;
    display:block;
    border:none;
    border-radius:100%;
  }

  .per-in{
    -webkit-box-flex: 1;
    -webkit-flex: 1;
    flex: 1;
    min-width: 0;
    font-size: 14px;
    color: #333;
  }

  .per-in h2{
    font-weight:normal;
    font-size:1.2rem;
  }

  .per-in span{
    font-size:0.8rem;
    color:#9e9e9e;
    position:relative;
    padding-right:25px;
  }

  .per-box1{
    line-height: 45px;
    display: block;
    background-color: #66CCCC;
    width: 100%;
    border-radius: 4px;
  }
  .el-icon-document,.el-icon-bell{
    font-size: 25px;
    transform: translateX(-400%);
    color: lightgoldenrodyellow;
  }
  .el-icon-d-arrow-right{
    font-size: 20px;
    transform: translateX(500%);
    color: #fff;
  }

</style>
