<template>
    <div :style="note">
      <header class="home-title">
        <div class="homeTitle">
          <i class="el-icon-arrow-left" @click="back"></i>
          <label>OOAD-讨论课</label>
          <el-dropdown trigger="click">
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
            报名情况：
          </label>
          <label style="text-align: center">
            {{teamName}},第{{teamOrder}}组
          </label>
        </div>

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

      </div>
      <div style="height: 180px"></div>
    </div>
</template>

<script>
    export default {
        name: "CheckGrade",
      data(){
        return {
          seminarId:'',
          courseId:'',
          courseName:'',
          klassId:'',
          seminarInfo:'',
          teamOrder:'',
          teamName:'',
          teamId:'',
          pptName:'',
          reportName:'',
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
          note:{
            backgroundImage:"url("+require("../../../assets/backpic.jpg")+")",
            backgroundRepeat: "no-repeat",
            backgroundSize: "100% 100%"
          },
          temp:[],
        }
      },
      created(){
        let that=this;
        that.courseId=that.$route.query.courseId;
        that.courseName=that.$route.query.courseName;
        that.klassId=that.$route.query.klassId;
        that.seminarId=that.$route.query.seminarId;
        that.teamName=that.$route.query.teamName;
        that.teamOrder=that.$route.query.teamOrder;
        that.teamId=that.$route.query.teamId;
        this.$axios({
          method:'GET',
          url:'/course/'+this.courseId+'/myTeam',
          headers:{
            'Authorization':window.localStorage['token']
          }
        }).then(res=>{
          console.log(res);
          if(res.status===200){
            this.teamId=res.data.id;
            console.log('传来的teamId'+this.teamId);
          }
        }).catch(e=>{
          console.log(e);
        })

        that.$axios({
          method:'GET',
          url:'/seminar/'+that.seminarId,
          headers:{
            'Authorization':window.localStorage['token']
          }
        }).then(res=>{
          console.log(res);
          if(res.status===200){
            window.localStorage['token']=res.headers.authorization;
            that.seminarInfo=res.data;
          }
        }).catch(e=>{
          console.log(e)
        });

        that.$axios({
          method:'GET',
          url:'/seminar/'+that.seminarId+'/team/'+that.teamId+'/seminarscore',
          headers:{
            'Authorization':window.localStorage['token']
          }
        })
          .then(res=>{
            console.log(res);
            if(res.status===200){
                window.localStorage['token']=res.headers.authorization;
                this.temp=res.data.score;
                this.tableData[0].data=this.temp.presentationScore;
                this.tableData[1].data=this.temp.questionScore;
                this.tableData[2].data=this.temp.reportScore;
                this.tableData[3].data=this.temp.totalScore;
            }
          })
          .catch(e=>{
            console.log(e);
          })
      },
      methods:{
          back(){
            this.$router.push({
              path:'/Courses/BeforeSeminar/AfterSign',
              name:'AfterSign',
              query:{
                seminarId:this.seminarId,
                courseId: this.courseId,
                courseName: this.courseName,
                klassId: this.klassId,
              }
            });
          }
      }
    }
</script>

<style scoped>
  .homeTitle{
    width: 100%;
    line-height: 70px;
    display: block;
    background-color:  #5CACEE;
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
    display: block;
    color: #fff;
    height: 20px;
  }

</style>
