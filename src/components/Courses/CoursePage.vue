<template>
    <div class="main" :style="note">
      <header class="home-title">
        <div class="homeTitle">
          <i class="el-icon-arrow-left" @click="back"></i>
          <label>讨论课</label>
          <el-dropdown trigger="click" @command="handleCommand">
            <span class="el-dropdown-link">
              <i class="el-icon-plus"></i>
            </span>
            <el-dropdown-menu class="el-dropDown" slot="dropdown">
              <el-dropdown-item>
                <i class="el-icon-menu"></i>
                个人页
              </el-dropdown-item>
              <el-dropdown-item>
                <i class="el-icon-star-on"></i>
                讨论课
              </el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </div>
      </header>
      <div>
        <img src="../../assets/3.jpg"/>
      </div>
      <div class="divHeight"></div>
      <el-col :span="24">
        <el-menu
          default-active="2"
          class="el-menu-vertical-demo"
          background-color="#f0f0f0"
          active-text-color="#ffd04b">
          <el-menu-item
            v-for="(course,index) in courses"
            :key="index"
            index="1"
            @click="getCourse(index)"
            style="text-align: left">
            <i class="el-icon-menu"></i>
            <span slot="title">{{course.courseName}} </span>
            <span style="float: right">({{course.klass.grade}}--{{course.klass.klassSerial}})</span>
          </el-menu-item>
        </el-menu>
      </el-col>
      <div style="height: 500px;"></div>
    </div>
</template>

<script>
    export default {
        name: "CoursePage",
      data() {
        return{
          courses:[],
          courseId:'',
          courseName:'',
          klassId:'',
          //背景图片
          note:{
            backgroundImage:"url("+require("../../assets/backpic.jpg")+")",
            backgroundRepeat: "no-repeat",
            backgroundSize: "100% 100%"
          }
        }
      },
      created(){
        this.$axios({
          method:'GET',
          url:'/course',
          headers:{
            'Authorization':window.localStorage['token']
          }
        })
          .then(res=>{
            console.log(res);
            if(res.status===200){
              this.courses=res.data;
            }
          })
          .catch(e=>{
            console.log(e);
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
        back(){
          this.$router.push({path:'/HomePage'});
        },
        getCourse(index){
          this.courseId=this.courses[index].courseId;
          this.courseName=this.courses[index].courseName;
          this.klassId=this.courses[index].klassId;
          console.log('klassId:'+this.klassId);
          this.$router.push({
            path:'/Courses/TotalSeminars',
            name:'TotalSeminars',
            query:{
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

  .divHeight{
    width: 100%;
    height: 30px;
    color: #fff;
  }

  .homeTitle{
    width: 100%;
    line-height: 70px;
    display: block;
    background-color: #5CACEE;
    border-radius: 5px;
  }

  .el-icon-arrow-left{
    transform: translateX(-600%);
  }

  .homeTitle label{
    font-style: normal;
    font-size: 25px;
  }

  .el-icon-plus{
    font-size: 25px;
    color: grey;
    font-weight: bold;
    transform: translateX(400%);
  }
  .el-dropDown{
    transform: translateX(120%);
  }

  .line{
    background-color: #fff;
    height: 2px;
  }


</style>
