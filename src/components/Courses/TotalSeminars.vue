<template>
    <div>
      <header class="home-title">
        <div class="homeTitle">
          <i class="el-icon-arrow-left" @click="back"></i>
          <label>OOAD 2016(1)</label>
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
      <div>
        <img src="../../assets/user.png" style="border-radius: 50px">
      </div>

      <div class="main">
        <el-collapse>
          <el-collapse-item v-for="(items,index) in courses"
                            :key="index">
            <template slot="title">
              <div style="font-weight: bold; font-size: 15px;font-family: 微软雅黑">
                &nbsp;&nbsp;<i class="iconfont icon-kecheng"></i>&nbsp;&nbsp;
                {{items.name}}
              </div>
            </template>
            <div style="width: 100%">
              <div>
                <el-button class="btn" type="info" plain  @click="AfterSeminar">
                  <i class="iconfont icon-chengjiguanli"></i>&nbsp;&nbsp;
                  {{items.item[0]}}
                </el-button>
              </div>
              <div>
                <el-button class="btn" type="info" plain @click="present">
                  <i class="iconfont icon-zudui"></i>&nbsp;&nbsp;
                  {{items.item[1]}}
                </el-button>
              </div>
              <div>
                <el-button class="btn" type="info" plain @click="BeforeSeminar">
                  <i class="iconfont icon-xinxi"></i>&nbsp;&nbsp;
                  {{items.item[2]}}
                </el-button>
              </div>
            </div>
          </el-collapse-item>
        </el-collapse>
      </div>

    </div>
</template>

<script>
    export default {
        name: "TotalSeminars",
      methods: {
        back(){
          this.$router.push({path:'/Courses/CoursePage'});
        },
        BeforeSeminar(){
          this.$router.push({path:'/Courses/BeforeSeminar/BeforeSeminar'});
        },
        present(){
          this.$router.push({path:'/Courses/Seminaring/Seminaring'});
        },
        AfterSeminar(){
          this.$router.push({path:'/Courses/AfterSeminar/SeminarInfo'})
        }
      },

      data() {
        return {
          courses: [
            {
              name: '第一轮',
              item: [
                '业务流程分析',
                '领域模型设计',
                'myBatis'
              ]
            },
            {
              name: '第二轮',
              item: [
                '代码检查',
                '对象模型设计',
                '用例分析'
              ]
            }

          ]
        };
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
    transform: translateX(200%);
  }
  .el-dropDown{
    transform: translateX(70%);
  }

  .btn {
    width: 100%;
    background-color: #66CCCC;
    color: #fff;
    font-size: 16px;
  }



</style>
