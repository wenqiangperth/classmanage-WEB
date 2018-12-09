<template>
    <div>
      <header class="home-title">
        <div class="homeTitle">
          <i class="el-icon-arrow-left" @click="back"></i>
          <label>我的课程</label>
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
        <img src="../../assets/3.jpg">
      </div>

      <div class="course">
        <el-button style="width: 90%;background-color: #66CCCC"
          @click="dialogVisible=true">
          <i class="el-icon-document" style="font-size: 20px;color:#fff"></i>
          <label style="font-size: 20px;color: #fff">OOAD</label>
          <el-tag style="float: right;color:#fff">2016-(1)</el-tag>
        </el-button>
        <el-dialog
          title="OOAD"
          :visible.sync="dialogVisible"
          width="80%"
          fullscreen="true">
          <div style="color: #66CCCC;">
            <div class="Grade" style="float: left;width:50%;font-size: 30px;">
              <i class="el-icon-tickets" @click="toGrade"></i>
            </div>
            <div class="team" style="float: left;width:50%;font-size: 30px">
              <i class="el-icon-share"></i>
            </div>
          </div>
          <div style="color: #66CCCC">
            <div style="float: left;width: 50%">我的成绩</div>
            <div style="float: left;width: 50%">我的组队</div>
          </div>
        </el-dialog>
      </div>
      <div class="course">
        <el-button style="width:90%;background-color: #66CCCC">
          <i class="el-icon-document" style="font-size: 20px;color:#fff"></i>
          <label style="font-size: 20px;color: #fff">J2EE</label>
          <el-tag style="float: right;color:#fff">2016-(3)</el-tag>
        </el-button>
      </div>

    </div>
</template>

<script>
    export default {
        name: "MyCourse",
      data(){
          return{
            dialogVisible: false
          }
      },
      methods:{
        handleCommand(command){
            if(command === "course")
              this.$router.push({
                path:'/Courses/CoursePage'
              })
          },
          back(){
            this.$router.push({path:'/HomePage'});
          },
          toGrade(){
            this.$router.push({path:'/Courses/AllGrade/Grade'});
          }
      }
    }
</script>

<style scoped>
  .homeTitle{
    width: 100%;
    line-height: 70px;
    display: block;
    background-color: #CCFF99;
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
    margin: 20px 0 20px 0;
    border-radius: 50px;
  }

  .course{
    margin: 30px 0 0 0;
  }
</style>
