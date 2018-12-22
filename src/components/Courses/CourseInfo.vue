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
            <span style="font-size: large;color: #409eff;font-weight: bold">课程要求</span>
          </div>
          <p>{{intro}}</p>
        </el-card>
        <el-card class="box-card">
          <span style="font-size: large;color: #409eff;font-weight: bold">成绩计算规则:</span>
          <br>
          <table style="width: 100%;text-align: center">
            <tr>
              <td style="width:30%">课堂展示</td>
              <td>
                {{presentationWeight}}
              </td>
            </tr>
            <tr>
              <td style="width:30%">课堂提问</td>
              <td>
                {{questionWeight}}
              </td>
            </tr>
            <tr>
              <td style="width:30%">书面报告</td>
              <td>
                {{reportWeight}}
              </td>
            </tr>
          </table>
        </el-card>
        <el-card>
          <span style="font-size: large;color: #409eff;font-weight: bold">其他要求</span>
          <br>
          <table
            style="width: 100%;text-align: center">
            <tr>
              <td style="width:30%">小组人数:</td>
              <td>
                {{minNum}}~{{maxNum}}
              </td>
            </tr>
            <tr>
              <td style="width: 30%">组队开始:</td>
              <td style="text-align: center">{{startTime}}</td>
            </tr>
            <tr>
              <td style="width: 30%">组队截止:</td>
              <td style="text-align: center">{{endTime}}</td>
            </tr>
            <tr>
              <td style="width: 30%">性别要求:</td>
              <td style="text-align: center">男:{{maleNum}}  女:{{femaleNum}}</td>
            </tr>
            <!--
            <tr>
              <td style="width: 30%">星座要求:</td>
              <td style="text-align: center">{{courseInfo.star}}</td>
            </tr>
            -->
            <tr>
              <td style="width: 30%">冲突课程:</td>
              <td style="text-align:center" v-for="item in defeatCourse">
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
            defeatCourse: [{
              name: '.net',
              teacher: 'Lin'
            }],
            intro: '',
            startTime: '',
            endTime: '',
            minNum: '1',
            maxNum: '6',
            maleNum:'',
            femaleNum: '2~4',
            name: '',
            presentationWeight:'',
            questionWeight:'',
            reportWeight:''
          }
      },
      created(){
          let that=this;

          //that.courseId=this.$route.query.courseId
          that.courseId=1;

          that.$axios({
            method:'GET',
            url:'/course/'+that.courseId
            // headers:{
            //   'token':window.localStorage['token']
            // }
          })
            .then(res=>{
              console.log(res);
              if(res.status===200){
                that.presentationWeight=res.data.presentationPercentage
                that.questionWeight=res.data.questionPercentage
                that.reportWeight=res.data.reportPercentage
                that.startTime=res.data.teamStartTime
                that.endTime=res.data.teamEndTime
                that.intro=res.data.introduction
                // that.minNum=res.data.minMemberNumber
                // that.maxNum=res.data.maxMemberNumber
                console.log(that.startTime)
              }
              else if(res.status===404)
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

</style>
