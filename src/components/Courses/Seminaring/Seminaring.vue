<template>
    <div class="main" :style="note">
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
      <div class="divHeight"></div>
      <div>
        <img src="../../../assets/2.jpg" style="border-radius: 50px"/>
      </div>

     <div style="opacity: 0.8">
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
           {{status}}
         </label>
       </div>

       <div class="intro"
            style="height: 50px; background-color: #F0F0F0; display: block">
         <label style="text-align: left; line-height: 50px">
           展示材料：
         </label>
         <a style="text-align: center; color: #66CCCC;text-decoration: underline" @click="check">
           查看信息
         </a>
       </div>

       <div class="intro"
            style="height: 50px; background-color: #fff; display: block">
         <label style="text-align: left; line-height: 50px">
           PPT：
         </label>
         <a v-if="this.pptName!==null" style="text-align: center; color: #66CCCC" @click="check">
           已提交
         </a>
         <a v-if="this.pptName===null" style="text-align: center; color: red" @click="check">
           未提交
         </a>
       </div>
       <el-button @click="openIntro" style="width:100%; height: 50px;text-decoration: underline;background-color: #f0f0f0">点此查看讨论课介绍</el-button>
     </div>

      <div class="enter-seminar">
        <a @click="present">进入讨论课</a>
      </div>

      <el-upload
        class="upload-demo"
        :http-request="upload"
        action="https://jsonplaceholder.typicode.com/posts/"
        :on-preview="handlePreview"
        :on-remove="handleRemove"
        multiple
        :limit="3"
        :on-exceed="handleExceed"
        :file-list="fileList">
        <el-button style="font-size: 19px;font-weight: bold;letter-spacing: 3px;border-radius: 25px;margin-top: 25px" type="success"
                   @click="upload">
          <i class="el-icon-upload"></i> 上传PPT</el-button>
      </el-upload>

      <div style="height: 50px;"></div>

    </div>
</template>

<script>
    export default {
      name: "Seminaring",
      data(){
        return{
          seminarId:'',
          courseId:'',
          courseName:'',
          klassId:'',
          teamId:'',
          attendanceId:'',
          seminarInfo:[],
          pptName:'',
          status:'正在进行',
          fileList:[],
          klassSeminarId: '',
          note:{
            backgroundImage:"url("+require("../../../assets/backpic.jpg")+")",
            backgroundRepeat: "no-repeat",
            backgroundSize: "100% 100%"
          }
        }
      },
      created(){
        let that = this;
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
              this.seminarInfo=res.data;
              this.intro=res.data.introduction;
            }
          })
          .catch(e=>{
            console.log(e)
          })

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

        that.$axios({
          method:'GET',
          url:'/seminar/'+that.seminarId+'/class/'+that.klassId+'/attendance',
          headers:{
            'Authorization':window.localStorage['token']
          }
        })
          .then(res=>{
            console.log(res);
            if(res.status===200){
              window.localStorage['token']=res.headers.authorization;
              let temp=res.data;
              this.klassSeminarId = res.data[1].klassSeminarId;
              console.log('teamId'+this.teamId);
              for(let i=0;i<temp.length;i++){
                if(this.teamId===temp[i].team.id){
                  this.attendanceId=temp[i].id;
                  this.pptName=temp[i].pptName;
                }
              }
            }
          })
          .catch(e=>{
            console.log(e);
          });
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
            this.$router.push({
              path:'/Courses/TotalSeminars',
              name:'TotalSeminars',
              query:{
                seminarId:this.seminarId,
                courseId: this.courseId,
                courseName: this.courseName,
                klassId: this.klassId
              }
            })
          },
          present(){
              this.$router.push({
                path:'/Courses/Seminaring/present',
                name:'present',
                query:{
                  seminarId:this.seminarId,
                  courseId: this.courseId,
                  courseName: this.courseName,
                  klassId: this.klassId,
                  seminarName:this.seminarInfo.seminarName,
                  teamId: this.teamId,
                  klassSeminarId: this.klassSeminarId
                }
              });
          },
          check(){
            this.$router.push({
              path:'/Courses/Seminaring/download',
              name:'download',
              query:{
                seminarId:this.seminarId,
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
        openIntro(){
          const h = this.$createElement;
          this.$notify({
            title: '讨论课介绍',
            message: h('i', { style: 'color: teal'}, this.intro),
            duration:7000
          });
        },
        upload(file){
            console.log('file是啥：');
            console.log(file);
            let formData=new FormData();
            let config={
              headers:{
                'Content-Type':'multipart/form-data'
              }
            }
            formData.append('file',file.file);
            // this.$axios.post('/attendance/'+this.$data.attendanceId+'/powerpoint',formData)
            this.$axios({
              url:'/attendance/'+this.$data.attendanceId+'/powerpoint',
              method: 'POST',
              processData: false,
              data: formData,
              config: config,
              headers:{
                'Authorization': window.localStorage['token']
              }
            })
              .then(res=>{
                console.log(res);
                if(res.status===200){
                  this.$message({
                    type:'success',
                    message:'上传文件成功！'
                  })
                }
                else{
                  this.$message({
                    type:'error',
                    message:'上传失败！请重新上传！'
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

  .enter-seminar{
    width:90%;
    margin:20px 10px 15px 10px;
    border:1px solid #66CCCC;
    border-radius:25px;
  }

  .enter-seminar a{
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

</style>
