<template>
    <div :style="note">
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

      <div class="main" style="opacity: 0.85;">
        <div>
          <el-button style="width: 90%;margin:10px 0 10px 0;background-color: #f0f0f0" @click="EnterTeam">进入我的小组</el-button>
        </div>

        <div style="width: 100%;background-color: #fff">
          <el-tag>小组信息总览</el-tag>
        </div>
        <el-collapse v-model="activeName" class="team" accordion>
          <el-collapse-item v-for="(team,index) in teams" :key="index" :class="{'active':index%2!=1}">
            <template slot="title">
              <div style="font-size: 17px;font-weight: bold">
                <i class="header-icon el-icon-search"></i>
                {{team.klassSerial}}-{{team.teamSerial}}  : {{team.teamName}}
                <a v-if="team.status===2" style="color:green;font-size: 20px">
                  <i class="el-icon-success"></i>
                </a>
                <a v-else-if="team.status===0" style="color: red;font-size: 20px">
                  <i class="el-icon-warning"></i>
                </a>
                <a v-else style="color: orange;font-size: 20px">
                  <i class="el-icon-info"></i>
                </a>
              </div>
            </template>
            <div style="text-align: left;font-size: 16px;font-family: 幼圆">
              <div style="background-color: #66cccc;font-weight: bold">组长：{{team.leaderName}}——{{team.leaderAccount}}</div>
              <div v-for="mem in team.students">
                组员：{{mem.studentName}}——{{mem.account}}
              </div>
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
    </div>
</template>

<script>
    export default {
        name: "TeamInfo",
      data(){
        return{
          courseId:'',
          activeName: '1',
          activeName2: '2',
          leaderName:'',
          leaderAccount:'',
          teams:[],
          leaders:[],
          Unteam:[],
          teamId:'',
          note:{
            backgroundImage:"url("+require("../../../assets/sky.jpg")+")",
            backgroundRepeat: "no-repeat",
            backgroundSize: "100% 100%"
          },
          userId:'',
        };
      },
      created(){
          let that = this;
          //先获得上个页面的courseId
          that.courseId=that.$route.query.courseId;
          console.log(that.courseId);
          that.$axios({
            method:'GET',
            url:'course/'+that.courseId+'/team',
            headers:{
              'Authorization':window.localStorage['token']
            }
          })
            .then(res=>{
              console.log(res);
              if(res.status===200){
                window.localStorage['token']=res.headers.authorization;
                this.teams=res.data;
                for(let i=0;i<this.teams.length;i++){
                  for(let j=0;j<this.teams[i].students.length;j++){
                    if(this.teams[i].leaderId===this.teams[i].students[j].id){
                      this.teams[i].leaderAccount=this.teams[i].students[j].account;
                      this.teams[i].leaderName=this.teams[i].students[j].studentName;
                    }
                  }
                }
              }
              else if(res.status===404){
                alert("尚未有队伍信息！")
              }
            })
            .catch(e=>{
              console.log(e)
            });

          that.$axios({
            method:'GET',
            url:'course/'+that.$data.courseId+'/noTeam',
            headers:{
              'Authorization':window.localStorage['token']
            }
          })
            .then(res=>{
              console.log(res);
              if(res.status===200){
                window.localStorage['token']=res.headers.authorization;
                that.Unteam =res.data;
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
            url:'/user/information',
            headers:{
              'Authorization':window.localStorage['token']
            }
          }).then(res=>{
            console.log(res);
            if(res.status===200){
              this.userId=res.data.id;
            }
          })
      },
      methods:{
          back(){
            this.$router.push({path:'/Courses/MyCourse'})
          },
          MakeTeam(){
            this.$router.push({
              path:'/Courses/MyTeam/MakeTeam',
              name:'MakeTeam',
              query:{
                courseId:this.courseId
              }
            })
          },
          EnterTeam(){
            this.$axios({
              method:'GET',
              url:'/course/'+this.$data.courseId+'/myteam',
              headers:{
                'Authorization': window.localStorage['token']
              }
            })
              .then(res=>{
                console.log('判断身份');
                console.log(res);
                if(res.status===200){
                  if(this.userId===res.data.leaderId){
                    //进入组长管理界面
                    this.$router.push({
                      path:'/Courses/MyTeam/TeamManage',
                      name:'TeamManage',
                      query:{
                        courseId: this.courseId
                      }
                    })

                  }else{
                    //进入组员信息界面
                    this.$router.push({
                      path:'/Courses/MyTeam/WithDraw'
                    })
                  }
                }
                if(res.status===500){
                  this.$message({
                    type:'warning',
                    message:'您尚未加入任何小组，快去创建小组吧~'
                  })
                }
              })
              .catch(e=>{
                console.log(e);
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
    font-weight: bold;
    width: 100%;
    text-align: center;
    line-height: 40px;
    color: #fff;
    background-color: #66CCCC;
    font-size: 17px;
    letter-spacing: 5px;
    border-radius: 25px;
    margin-bottom: 20px;
  }

  .team {
    background-color: #f0f0f0;
  }
</style>
