<template>
    <div>
      <header class="home-title">
        <div class="homeTitle">
          <i class="el-icon-arrow-left" @click="back"></i>
          <label>OOAD </label>
          <el-dropdown trigger="click" >
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

      <el-collapse v-model="activeName" class="team" accordion>
        <el-collapse-item v-for="team in teams">
          <template slot="title">
            <div style="font-size: 17px"><i class="header-icon el-icon-search"></i>
               {{team.teamSerial}}   {{team.teamName}}</div>
          </template>
          <div style="text-align: left;font-size: 16px;font-family: 幼圆">
            <div style="background-color: #66cccc;font-weight: bold">组长：{{team.leaderId}}——</div>
            <div v-for="mem in team.students">组员：{{mem.studentName}}——{{mem.account}}</div>
          </div>
        </el-collapse-item>
      </el-collapse>

      <div class="pic"><img style="border-radius: 50px" src="../../../assets/1.jpg"></div>

      <el-collapse v-model="activeName2">
        <el-collapse-item>
          <template slot="title">
            <div style="font-size: 17px"><i class="header-icon el-icon-search"></i>
              未组队学生</div>
          </template>
          <div v-for="ren in Unteam" style="text-align: left;font-size: 16px;font-family: 幼圆">
            {{ren.studentName}}——{{ren.account}}
            <div class="line"/>
          </div>
        </el-collapse-item>
      </el-collapse>

      <div class="login-input">
        <a @click="MakeTeam">创建小组</a>
      </div>
    </div>
</template>

<script>
    export default {
        name: "TeamInfo",
      data(){
        return{
          courseId:1,
          activeName: '1',
          activeName2: '2',
          teams:[],
          Unteam:[]
        };
      },
      created(){
          let that = this;
          that.$axios({
            method:'GET',
            url:'course/'+that.$data.courseId+'/team',
            // params:{
            //   courseId: that.courseId
            // }
          })
            .then(res=>{
              console.log(res);
              if(res.status===200){
                alert("访问成功")
                console.log(res.data);
                that.teams = res.data;
              }
              else if(res.data.status===404){
                alert("未找到未组队学生！")
              }
            })
            .catch(e=>{
              console.log(e)
            })

          that.$axios({
            method:'GET',
            url:'course/'+that.$data.courseId+'/noTeam',
            params:{
              courseId: that.courseId
            }
          })
            .then(res=>{
              console.log(res);
              if(res.status===200){
                that.Unteam =res.data;
                console.log(that.Unteam);
              }
              else if(res.data.status===404){
                alert("未找到未组队学生！")
              }
            })
            .catch(e=>{
              console.log(e)
            })
      },
      methods:{
          back(){
            this.$router.push({path:'/Courses/MyCourse'})
          },
          MakeTeam(){
            this.$router.push({path:'/Courses/MyTeam/MakeTeam'})
          }
      }
    }
</script>

<style scoped>
  .homeTitle{
    width: 100%;
    line-height: 70px;
    display: block;
    background-color: #5CACEE;
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

  .pic{
    margin: 10px 0 10px 0;
  }

  .line{
    height: 2px;
    background-color: #66cccc;
  }

  .login-input{
    margin:40px 30px 15px 30px;
    border:1px solid #66CCCC;
    border-radius:25px;
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
</style>
