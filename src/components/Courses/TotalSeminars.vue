<template>
    <div :style="note">
      <header class="home-title">
        <div class="homeTitle">
          <i class="el-icon-arrow-left" @click="back"></i>
          <label>{{courseName}}</label>
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
      <div>
        <img src="../../assets/user.png" style="border-radius: 50px">
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
            <div style="width: 100%;">
              <div v-for="(seminar,semId) in courses" style="font-weight: bold">
                <el-button class="btn" type="info" plain @click="EnterSeminar(semId)">
                  <i class="el-icon-document"></i>
                  {{seminar.seminarName}}
                </el-button>
              </div>
            </div>
          </el-collapse-item>
        </el-collapse>
      </div>
      <div style="height: 250px;"></div>
    </div>
</template>

<script>
    export default {
        name: "TotalSeminars",
      data() {
        return {
          courseId:'',
          roundId:'',
          courses: [],
          courseName:'',
          teamId:'',
          roundInfo:[],
          klassId:'',
          seminarInfo:[],
          note:{
            backgroundImage:"url("+require("../../assets/sky.jpg")+")",
            backgroundRepeat: "no-repeat",
            backgroundSize: "100% 100%",
          }
        };
      },
      created(){
        let that=this;
        that.courseId=that.$route.query.courseId;
        that.courseName=that.$route.query.courseName;
        that.klassId=that.$route.query.klassId;

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

        this.$axios({
          method:'GET',
          url:'/course/'+this.courseId+'/myteam',
          headers:{
            'Authorization':window.localStorage['token']
          }
        })
          .then(res=>{
            console.log(res);
            if(res.status===200){
              this.teamId=res.data.id;
              console.log('传来的teamId'+this.teamId);
            }
          })
          .catch(e=>{
            console.log(e);
          })

      },
      methods: {
        back(){
          this.$router.push({path:'/Courses/CoursePage'});
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
        EnterSeminar(index){
          let seminarId=this.courses[index].id;
          this.$axios({
            method:'GET',
            url:'/seminar/'+seminarId+'/class/'+this.$data.klassId,
            headers:{
              'Authorization':window.localStorage['token']
            }
          })
            .then(res=>{
              console.log(res);
              if(res.status===200){
                window.localStorage['token']=res.headers.authorization;
                if(res.data.status===2){        //进入已结束的讨论课界面
                  this.$axios({
                    method:'GET',
                    url:'/seminar/'+seminarId+'/class/'+this.klassId+'/attendance',
                    headers:{
                      'Authorization':window.localStorage['token']
                    }
                  })
                    .then(res=>{
                      console.log(res);
                      if(res.status===200){
                        this.seminarInfo=res.data;
                        let teamOrder;
                        for(let i=0;i<this.seminarInfo.length;i++){
                          if(this.teamId===this.seminarInfo[i].teamId)
                            teamOrder=this.seminarInfo[i].teamOrder;
                        }
                        console.log('teamOrder'+teamOrder);
                        if(teamOrder>=1){      //展示顺序不为空表示已报名，进入结束讨论课的界面，可以提交书面报告查看成绩
                          this.$router.push({
                            path:'/Courses/BeforeSeminar/AfterSign',
                            name:'AfterSign',
                            query:{
                              seminarId:seminarId,
                              courseId: this.courseId,
                              courseName: this.courseName,
                              klassId: this.klassId,
                            }
                          })
                        }
                        else{                //展示顺序为空表示尚未报名
                          this.$router.push({
                            path:'/Courses/AfterSeminar/SeminarInfo',
                            name:'SeminarInfo',
                            query:{
                              seminarId:seminarId,
                              courseId: this.courseId,
                              courseName: this.courseName,
                              klassId: this.klassId
                            }
                          })
                        }
                      }
                    })
                    .catch(e=>{
                      console.log(e)
                    })







                  // this.$router.push({
                  //   path:'/Courses/AfterSeminar/SeminarInfo',
                  //   name:'SeminarInfo',
                  //   query:{
                  //     seminarId:seminarId,
                  //     courseId: this.courseId,
                  //     courseName: this.courseName,
                  //     klassId: this.klassId
                  //   }
                  // })
                }
                if(res.data.status===1){        //进入正在进行的讨论课
                  this.$router.push({
                    path:'/Courses/Seminaring/Seminaring',
                    name:'Seminaring',
                    query:{
                      seminarId:seminarId,
                      courseId: this.courseId,
                      courseName: this.courseName,
                      klassId: this.klassId
                    }
                  })
                }
                if(res.data.status===0){        //进入尚未进行的讨论课
                  this.$axios({
                    method:'GET',
                    url:'/seminar/'+seminarId+'/class/'+this.klassId+'/attendance',
                    headers:{
                      'Authorization':window.localStorage['token']
                    }
                  })
                    .then(res=>{
                      console.log(res);
                      if(res.status===200){
                        this.seminarInfo=res.data;
                        let teamOrder;
                        for(let i=0;i<this.seminarInfo.length;i++){
                          if(this.teamId===this.seminarInfo[i].teamId)
                            teamOrder=this.seminarInfo[i].teamOrder;
                        }
                        console.log('teamOrder'+teamOrder);
                        if(teamOrder>=1){      //展示顺序不为空表示已报名，进入修改报名界面
                          this.$router.push({
                            path:'/Courses/BeforeSeminar/ChangeSign',
                            name:'ChangeSign',
                            query:{
                              seminarId: seminarId,
                              courseId: this.courseId,
                              courseName: this.courseName,
                              klassId: this.klassId,

                            }
                          })
                        }
                        else{                //展示顺序为空表示尚未报名
                          this.$router.push({
                            path:'/Courses/BeforeSeminar/BeforeSeminar',
                            // name:'Seminaring',
                            query:{
                              seminarId:seminarId,
                              courseId: this.courseId,
                              courseName: this.courseName,
                              klassId: this.klassId
                            }
                          })
                        }
                      }
                    })
                    .catch(e=>{
                      console.log(e)
                    })

                }
              }
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
    transform: translateX(-440%);
  }

  .homeTitle label{
    font-style: normal;
    font-size: 25px;
  }

  .el-icon-plus{
    font-size: 25px;
    color: grey;
    font-weight: bold;
    transform: translateX(270%);
  }
  .el-dropDown{
    transform: translateX(70%);
  }

  .btn {
    width: 100%;
    background-color: #66CCCC;
    color: #fff;
    font-size: 16px;
    font-weight: bold;
  }



</style>
