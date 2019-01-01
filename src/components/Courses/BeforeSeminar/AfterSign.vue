<template>
    <div :style="note">
      <header class="home-title">
        <div class="homeTitle">
          <i class="el-icon-arrow-left" @click="back"></i>
          <label>OOAD-讨论课</label>
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
      <div class="divHeight"></div>

      <div style="opacity: 0.85">
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

        <div class="intro1">
          <label style=" line-height: 50px">
            PPT:
          </label>
          <label v-if="pptName!==null" style="text-align: center;color: green">
            已提交
          </label>
          <label v-else style="text-align: center;color: red" >未提交</label>
        </div>

        <div class="intro"
             style="text-align: center;height: 50px; background-color: #fff; display: block">
          <label style="line-height: 50px">
            书面报告:
          </label>
          <label v-if="reportName!==null" style="text-align: center;color: green">
            已提交
          </label>
          <label v-else style="text-align: center;color: red" >未提交</label>
        </div>

        <div class="grade">
          <a @click="check">查看成绩</a>
        </div>
        <el-upload
          class="grade"
          action="https://jsonplaceholder.typicode.com/posts/"
          :on-preview="handlePreview"
          :on-remove="handleRemove"
          :before-remove="beforeRemove"
          multiple
          :limit="3"
          :on-exceed="handleExceed"
          :file-list="fileList">
          <div class="grade" >
            <a style="background-color: blue;">书面报告提交</a>
          </div>
        </el-upload>
      </div>
      <div style="height: 100px;"></div>
    </div>
</template>

<script>
    export default {
        name: "AfterSign",
      data(){
        return{
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
          note:{
            backgroundImage:"url("+require("../../../assets/backpic.jpg")+")",
            backgroundRepeat: "no-repeat",
            backgroundSize: "100% 100%"
          },
          fileList:[]
        }
      },
      created(){
        let that=this;
        that.courseId=that.$route.query.courseId;
        that.courseName=that.$route.query.courseName;
        that.klassId=that.$route.query.klassId;
        that.seminarId=that.$route.query.seminarId;
        this.$axios({
          method:'GET',
          url:'/course/'+this.courseId+'/myteam',
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
          });

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
          url:'/seminar/'+that.seminarId+'/class/'+that.klassId+'/attendance',
          headers:{
            'Authorization':window.localStorage['token']
          }
        }).then(res=>{
            console.log(res);
            if(res.status===200){
              window.localStorage['token']=res.headers.authorization;
              let temp=res.data;
              console.log('teamId'+this.teamId);
              for(let i=0;i<temp.length;i++){
                if(this.teamId===temp[i].team.id){
                  this.pptName=temp[i].pptName;
                  this.teamOrder=temp[i].teamOrder;
                  this.teamName=temp[i].team.teamName;
                  this.reportName=temp[i].reportName;
                }
              }
            }
          }).catch(e=>{
            console.log(e);
          });
      },
      methods:{
        back(){
            this.$router.push({
              path:'/Courses/TotalSeminars',
              name:'TotalSeminars',
              query:{
                courseId: this.courseId,
                courseName: this.courseName,
                klassId: this.klassId
              }
            })
          },
        handleRemove(file, fileList) {
          console.log(file, fileList);
        },
        handlePreview(file) {
          console.log(file);
        },
        handleExceed(files, fileList) {
          this.$message.warning(`当前限制选择 3 个文件，本次选择了 ${files.length} 个文件，共选择了 ${files.length + fileList.length} 个文件`);
        },
        beforeRemove(file, fileList) {
          return this.$confirm(`确定移除 ${ file.name }？`);
        },
          check(){
            this.$router.push({
              path:'/Courses/BeforeSeminar/CheckGrade',
              name:'CheckGrade',
              query:{
                seminarId:this.seminarId,
                courseId: this.courseId,
                courseName: this.courseName,
                klassId: this.klassId,
                teamOrder:this.teamOrder,
                teamName:this.teamName,
                teamId:this.teamId,
                pptName:this.pptName,
                reportName:this.reportName,
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
    display: block;
    color: #fff;
    height: 20px;
  }

  .grade{
    margin:20px 10px 15px 10px;
    border-radius:10px;
  }

  .grade a{
    display: block;
    width: 100%;
    text-align: center;
    line-height: 50px;
    color: #fff;
    background-color: #66CCCC;
    font-size: 19px;
    font-weight: bold;
    letter-spacing: 3px;
    border-radius: 10px;
  }

  .intro1{
    text-align: center;
    height: 50px;
    background-color: #F0F0F0;
    display: block;
    margin: 0px 0 0px 0;
  }

</style>
