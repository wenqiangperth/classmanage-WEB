<template>
    <div>
      <header class="home-title">
        <div class="homeTitle">
          <i class="el-icon-arrow-left" @click="back"></i>
          <label>讨论课</label>
          <el-dropdown trigger="click">
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
          @open="handleOpen"
          @close="handleClose"
          background-color="#66CCCC"
          text-color="#fff"
          active-text-color="#ffd04b">
          <el-menu-item index="2" style="text-align: left">
            <i class="el-icon-menu"></i>
            <span slot="title">软件工程</span>
          </el-menu-item>
          <div class="line"></div>
          <el-menu-item index="3" style="text-align: left" @click="getCourse">
            <i class="el-icon-document"></i>
            <span slot="title">OOAD</span>
          </el-menu-item>
          <div class="line"></div>
          <el-menu-item index="4" style="text-align: left">
            <i class="el-icon-setting"></i>
            <span slot="title">J2EE</span>
          </el-menu-item>
        </el-menu>
      </el-col>
    </div>
</template>

<script>
    export default {
        name: "CoursePage",
      data() {

      },
      methods:{
          back(){
            this.$router.push({path:'/HomePage'});
          },
        getCourse(){
            this.$router.push({path:'/Courses/TotalSeminars'});
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
    background-color: #CCFF99;
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
    height: 1px;
  }


</style>
