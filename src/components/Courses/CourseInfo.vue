<template>
    <div>
      <header class="home-title">
        <div class="homeTitle">
          <i class="el-icon-arrow-left" @click="back"></i>
          <label>我的课程</label>
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
      <div style="height:10px; width: 100%"></div>

      <div class="main">
        <el-card>
          <div slot="header">
            <span>课程要求</span>
          </div>
          <p>{{courseInfo.description}}</p>
        </el-card>
        <el-card class="box-card">
          <span>成绩计算规则:</span>
          <br>
          <table
            v-for="(item,index) in courseInfo.tableData1"
            :key="index"
            style="width: 100%;">
            <tr>
              <td style="width:30%">{{item.make_up}}</td>
              <td style="text-align: center">
                {{item.percentage}}
              </td>
            </tr>
          </table>
        </el-card>
        <el-card>
          <table
            style="width: 100%;text-align: center">
            <tr>
              <td style="width:30%">小组人数:</td>
              <td>
                {{courseInfo.minNum}}~{{courseInfo.maxNum}}
              </td>
            </tr>
            <tr>
              <td style="width: 30%">组队开始:</td>
              <td style="text-align: center">{{courseInfo.startTime}}</td>
            </tr>
            <tr>
              <td style="width: 30%">组队截止:</td>
              <td style="text-align: center">{{courseInfo.endTime}}</td>
            </tr>
            <tr>
              <td style="width: 30%">性别要求:</td>
              <td style="text-align: center">男:{{courseInfo.maleNum}}  女:{{courseInfo.femaleNum}}</td>
            </tr>
            <!--
            <tr>
              <td style="width: 30%">星座要求:</td>
              <td style="text-align: center">{{courseInfo.star}}</td>
            </tr>
            -->
            <tr>
              <td style="width: 30%">冲突课程:</td>
              <td style="text-align:center" v-for="item in courseInfo.defeatCourse">
                {{item.name}}({{item.teacher}})</td>
            </tr>
          </table>
        </el-card>
      </div>
    </div>

</template>

<script>
    export default {
        name: "CourseInfo",
      data() {
        return {
          courseInfo: {
            name: '',
            description: '翻转课堂形式上课，学生自由组队，以小组形式每周做汇报，每组汇报时间15分钟',
            presentationWeight:'',
            questionWeight:'',
            reportWeight:'',
            tableData1: [{
              make_up: '课堂展示',
              percentage: this.presentationWeight,
            },
              {
                make_up: '课堂提问',
                percentage: this.questionWeight,
              },
              {
                make_up: '书面报告',
                percentage: this.reportWeight,
              }],
            startTime: '',
            endTime: '',
            minNum: '',
            maxNum: '',
            maleNum:'2~4',
            femaleNum: '2~4',
            defeatCourse: [{
              name: '.net',
              teacher: 'Lin'
            }]
          }
        }
      },
      created(){
          let that=this;

          that.courseId=this.$route.query.courseId

          that.$axios({
            method:'GET',
            url:'/course/courseId?userId=${localStorage.userId}',
            headers:{
              'token':window.localStorage['token']
            }
          })
            .then(res=>{
              if(res.data.status===200){
                console.log(res.data)
                that.presentationWeight=res.data.presentationWeight
                that.questionWeight=res.data.questionWeight
                that.reportWeight=res.data.reportWeight
                that.startTime=res.data.startTeamTime
                that.endTime=res.data.endTeamTime
                that.minNum=res.data.minMemberNumber
                that.maxNum=res.data.maxMemberNumber
              }
              else if(res.data.status===404)
              {
                alert("未找到指定课程")
              }
              else
                alert("错误的ID格式")
            })
            .catch((e)=>{
              console.log(e)
            })
      },
      methods:{
          back(){
            this.$router.push({path:'/Courses/MyCourse'});
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

</style>
