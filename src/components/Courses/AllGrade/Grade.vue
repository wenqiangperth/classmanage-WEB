<template>
  <div :style="note">
    <header class="home-title" >
      <div class="homeTitle">
        <i class="el-icon-arrow-left" @click="back"></i>
        <label>OOAD </label>
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
    <div class="pic">
      <img src="../../../assets/2.jpg">
    </div>

    <div class="main" style="opacity: 0.8;">
      <el-collapse accordion>
        <el-collapse-item v-for="(round,index) in roundInfo"
                          :key="index" >
          <template slot="title" >
            <div @click="chooseRound(index)" style="text-align: left;font-weight: bold; font-size: 15px;font-family: 微软雅黑;width: 100%">
              <i class="iconfont icon-chengjiguanli"></i>
              第{{round.roundSerial}}轮
            </div>
          </template>
          <div style="width: 100%">
            <div v-for="(seminar,semId) in courses">
              <el-button class="btn" type="info" plain @click="checkScore(semId)">
                <i class="el-icon-document"></i>
                {{seminar.seminarName}}
              </el-button>

            </div>
          </div>
        </el-collapse-item>
      </el-collapse>
      <el-dialog
        title="成绩"
        :visible.sync="dialogTableVisible"
        width="90%">
        <el-table
          :data="tableData"
          style="width: 100%">
          <el-table-column
            prop="name"
            label="项目"
            width="180"
            align="center">
          </el-table-column>
          <el-table-column
            prop="data"
            label="成绩"
            width="180"
            align="center">
          </el-table-column>
        </el-table>
      </el-dialog>

    </div>
    <div style="height: 400px;"></div>
  </div>
</template>

<script>
    export default {
      name: "Grade",
      data() {
        return {
          courseId:'',
          teamId:'',
          roundInfo:[],
          courses: [],
          tableData: [{
            name:'展示',
            data:''
          },{
            name:'提问',
            data:''
          },{
            name:'书面报告',
            data:''
          },{
            name:'总成绩',
            data:''
          }],
          temp:[],
          dialogTableVisible: false,
          note:{
            backgroundImage:"url("+require("../../../assets/sky.jpg")+")",
            backgroundRepeat: "no-repeat",
            backgroundSize: "100% 100%",
          }
        };
      },
      created(){
        this.courseId=this.$route.query.courseId;
        //根据courseId获得轮次
        this.$axios({
          method:'GET',
          url:'course/'+this.courseId+'/round',
          headers:{
            'Authorization':window.localStorage['token']
          }
        })
          .then(res=>{
            console.log(res);
            if(res.status===200){
              window.localStorage["token"]=res.headers.authorization;
              this.roundInfo = res.data;
            }
            else{
              alert("wrong")
            }
          });

        //根据courseId获得teamId
        this.$axios({
          method:'GET',
          url:'course/'+this.courseId+'/myteam',
          headers:{
            'Authorization':window.localStorage['token']
          }
        })
          .then(res=>{
            console.log(res);
            if(res.status===200){
              this.teamId=res.data.id;
              console.log('teamId :'+this.teamId);
            }
          })
          .catch(e=>{
            console.log(e);
          })


      },
      methods: {
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
          this.$router.push({path:'/Courses/MyCourse'})
        },
        chooseRound(index){
          let roundId = this.roundInfo[index].id;
          console.log(roundId);
          this.$axios({
            method:'GET',
            url:'round/'+roundId+'/seminar',
            headers:{
              'Authorization': window.localStorage['token']
            }
          })
            .then(res=>{
              console.log(res);
              if(res.status===200){
                this.courses=res.data;
              }else{
                alert("wrong")
              }
            })
        },
        checkScore(semId){
           this.dialogTableVisible=true;
           let seminarId = this.courses[semId].id;
           console.log(seminarId);
           this.$axios({
             method:'GET',
             url:'seminar/'+seminarId+'/team/'+this.$data.teamId+'/seminarscore',
             headers:{
               'Authorization': window.localStorage['token']
             }
           })
             .then(res=>{
               console.log(res);
               if(res.status===200){
                 this.temp=res.data.score;
                 this.tableData[0].data=this.temp.presentationScore;
                 this.tableData[1].data=this.temp.questionScore;
                 this.tableData[2].data=this.temp.reportScore;
                 this.tableData[3].data=this.temp.totalScore;
                 console.log(this.tableData);
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
    opacity: 0.8;
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

  .pic img{
    margin: 20px 0 15px 0;
    border-radius: 50px;
  }

  .btn {
    width: 100%;
    background-color: #66CCCC;
    color: #fff;
    font-size: 16px;
    font-weight: bold;
  }
</style>
