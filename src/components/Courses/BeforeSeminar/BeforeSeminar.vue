<template>
    <div :style="note">
      <header class="home-title">
        <div class="homeTitle">
          <i class="el-icon-arrow-left" @click="back"></i>
          <label>OOAD-讨论课</label>
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
      <div class="main" style="opacity: 0.85;">
        <div class="divHeight"></div>
        <div>
          <img src="../../../assets/2.jpg" style="border-radius: 50px"/>
        </div>

        <div class="intro"
             style="height: 50px; background-color: #F0F0F0; display: block">
          <label style="text-align: left; line-height: 50px">
            轮次：
          </label>
          <label style="text-align: center">
            第{{seminarInfo.roundSerial}}轮
          </label>
        </div>

        <div class="intro"
             style="height: 50px; background-color: #fff; display: block">
          <label style="text-align: left; line-height: 50px">
            主题：
          </label>
          <label style="text-align: center">
            {{seminarInfo.seminarName}}
          </label>
        </div>

        <div class="intro"
             style="height: 50px; background-color: #F0F0F0; display: block">
          <label style="text-align: left; line-height: 50px">
            课次序号：
          </label>
          <label style="text-align: center">
            第{{seminarInfo.seminarSerial}}次
          </label>
        </div>

        <div class="intro"
             style="height: 50px; background-color: #fff; display: block">
          <label style="text-align: left; line-height: 50px">
            课程情况：
          </label>
          <label style="text-align: center; color: #66CCCC">
            未开始
          </label>
        </div>

        <div class="intro"
             style="height: 50px; background-color: #F0F0F0; display: block">
          <label style="text-align: left; line-height: 50px">
            展示材料：
          </label>
          <a style="text-align: center; color: #66CCCC;text-decoration: underline" @click="sign">
            查看信息
          </a>
          <el-button @click="openIntro" style="width:100%; height: 50px;text-decoration: underline;background-color: #fff">点此查看讨论课介绍</el-button>
        </div>

        <ul class="time-info">
          <li>报名开始时间：<a>{{seminarInfo.enrollStartTime}}</a></li>
          <li>报名截止时间：<a>{{seminarInfo.enrollEndTime}}</a></li>
        </ul>

        <div class="post-seminar">
          <a @click="sign">报名</a>
        </div>
      </div>
      <div style="height: 100px;"></div>
    </div>
</template>

<script>
    export default {
        name: "BeforeSeminar",
      data(){
          return {
            seminarId:'',
            courseId:'',
            courseName:'',
            klassId:'',
            seminarInfo:[],
            note:{
              backgroundImage:"url("+require("../../../assets/backpic.jpg")+")",
              backgroundRepeat: "no-repeat",
              backgroundSize: "100% 100%"
            },
            nowTime:'',
          }
      },
      created(){
        let that = this;
        that.getTime();
        that.seminarId=that.$route.query.seminarId;
        that.courseId=that.$route.query.courseId;
        that.courseName=that.$route.query.courseName;
        that.klassId=that.$route.query.klassId;
        that.$axios({
          method:'GET',
          url:'/seminar/'+that.seminarId,
          headers:{
            'Authorization':window.localStorage['token']
          }
        })
          .then(res=>{
            console.log(res);
            if(res.status===200){
              window.localStorage['token']=res.headers.authorization;
              that.seminarInfo=res.data;
              that.seminarInfo.enrollStartTime=that.timestampToTime(res.data.enrollStartTime);
              that.seminarInfo.enrollEndTime=that.timestampToTime(res.data.enrollEndTime);
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
            });
          else if(command==="per")
            this.$router.push({
              path:'/Account/ManageAccount'
            })
        },
          sign(){
            if(this.compare()){
              this.$message({
                type:'warning',
                message:'现在不再可报名时间内，无法报名'
              })
            }
            if(!this.compare()){
              this.$router.push({
                path:'/Courses/BeforeSeminar/signInfo',
                name:'signInfo',
                query:{
                  seminarId:this.seminarId,
                  courseId: this.courseId,
                  courseName: this.courseName,
                  klassId: this.klassId
                }
              });
            }
          },
          back(){
              this.$router.push({
                path:'/Courses/TotalSeminars',
                name:'TotalSeminars',
                query:{
                  seminarId:this.seminarId,
                  courseId: this.courseId,
                  courseName: this.courseName,
                  klassId: this.klassId
                }
              });
          },
          openIntro(){
            const h = this.$createElement;
            this.$notify({
              title: '讨论课介绍',
              message: h('i', { style: 'color: teal'}, this.seminarInfo.introduction),
              duration:7000
            });
          },
        getTime(){
          this.nowTime=new Date();
          console.log(this.nowTime);
        },
        timestampToTime(timestamp){
          let date = new Date(timestamp),//时间戳为10位需*1000，时间戳为13位的话不需乘1000
          Y = date.getFullYear() + '-',
          M = (date.getMonth()+1 < 10 ? '0'+(date.getMonth()+1) : date.getMonth()+1) + '-',
          D = date.getDate() + ' ',
          h = date.getHours() + ':',
          m = date.getMinutes() + ' ',
          s = date.getSeconds();
          return Y+M+D+h+m;
        },
        compare(){
          let nowTime=new Date();
          let startTime=new Date(this.seminarInfo.enrollStartTime);
          let endTime=new Date(this.seminarInfo.enrollEndTime);
          let nowY=nowTime.getFullYear(),
              nowM=nowTime.getMonth(),
              nowD=nowTime.getDate(),
              nowH=nowTime.getHours(),
              startY=startTime.getFullYear(),
              startM=startTime.getMonth(),
              startD=startTime.getDate(),
              startH=startTime.getHours(),
              endY=endTime.getFullYear(),
              endM=endTime.getMonth(),
              endD=endTime.getDate(),
              endH=endTime.getHours();
          if((startY<=nowY)&&(startM<=nowM)&&(startD<=nowD)&&(startH<=nowH)){
            if((nowY<=endY)&&(nowM<=endM)&&(nowD<=endD)&&(nowH<=endH)){
              return true;
            }
            else
              return false;
          }
          else return false;
        },
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

  .divHeight{
    height: 20px;
    display: block;
    color: #fff;
  }

  .post-seminar{
    margin:0 10px 15px 10px;
    border:1px solid #66CCCC;
    border-radius:25px;
  }

  .post-seminar a{
    display: block;
    width: 100%;
    text-align: center;
    line-height: 50px;
    color: #fff;
    background-color: #66CCCC;
    font-size: 19px;
    font-weight: bold;
    letter-spacing: 3px;
    border-radius: 25px;
  }

  ul{
    margin: 50px 0 10px 10px;
  }

  ul,li{
    text-align: left;
    list-style-type: none;
    padding: 0;
    line-height: 30px;
  }

  .time-info li a{
    color: red;
  }
</style>
