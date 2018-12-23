<template>
  <div class="body0">
    <div id="head" class="head">
      <div class="title"><i class="el-icon-back icon1 icon0" @click="returnCourseManage"></i>{{courseName}}
        <el-dropdown class="plus" trigger="click">
          <i class="el-icon-plus icon0"></i>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item><i class="el-icon-bell" @click="gotoHomePage">&nbsp;&nbsp;个人页</i></el-dropdown-item>
            <el-dropdown-item><i class="el-icon-service" @click="gotoSeminar">&nbsp;&nbsp;讨论课</i></el-dropdown-item>
            <el-dropdown-item><i class="el-icon-back" @click="returnLogin">&nbsp;&nbsp;退 出</i></el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </div>
    </div>
    <div class="empty" style="height: 10px;width: 100%"></div>
    <div class="main">
      <el-card>
        <div slot="header" style="float: left">
          <span style="font-weight: bold;color: #616161">课程要求</span>
        </div>
        <p style="font-size: 13px">{{description}}</p>
      </el-card>
      <el-card class="box-card">
        <div slot="header" style="float: left">
          <span style="font-weight: bold;color: #616161">成绩计算规则</span>
        </div>
        <table
          v-for="(item,index) in tableData1"
          :key="index"
          style="width: 100%;font-size: 13px">
          <tr style="height: 30px">
            <td style="width:30%">{{item.make_up}}</td>
            <td style="text-align: center">
              {{item.percentage}}%
            </td>
          </tr>
        </table>
      </el-card>
      <el-card>
        <table
          style="width: 100%;text-align: center;font-size: 13px">
          <tr style="height: 30px">
            <td style="width:30%">小组人数:</td>
            <td>
              {{minNum}}~{{maxNum}}
            </td>
          </tr>
          <tr style="height: 30px">
            <td style="width: 30%">组队开始:</td>
            <td>{{startTime}}</td>
          </tr>
          <tr style="height: 30px">
            <td style="width: 30%">组队截止:</td>
            <td>{{endTime}}</td>
          </tr>
          <tr style="height: 30px">
            <td style="width: 30%">性别要求:</td>
            <td>男:{{maleNum}} 女:{{femaleNum}}</td>
          </tr>
          <tr style="height: 30px">
            <td style="width: 30%">冲突课程:</td>
            <td v-for="item in defeatCourse">
              {{item.name}}({{item.teacher}})
            </td>
          </tr>
        </table>
      </el-card>
      <div id="el-btn" style="width: 100%;margin-top: 20px">
        <el-button type="success"
                   @click="deleteCourse" plain
                   style="float: right;margin-bottom: 20px">
          删除该课程
        </el-button>
      </div>

    </div>

  </div>
</template>

<script>
  import {MessageBox} from 'mint-ui'
  export default {
    name: "CourseInfo",
    data() {
      return {

        courseId: 1,
        courseName: '',
          description: '翻转课堂形式上课，学生自由组队，以小组形式每周做汇报，每组汇报时间15分钟',
          tableData1: [{
            make_up: '课堂展示',
            percentage: '1',
          },
            {
              make_up: '课堂提问',
              percentage: '2',
            },
            {
              make_up: '书面报告',
              percentage: '3',
            }],
        startTeamTime: '2018-12-01 12:00:00',
        endTeamTime: '2018-12-06 12:00:00',
          minNum: 6,
          maxNum: 8,
          maleNum: '2-4',
          femaleNum: '2-4',
          defeatCourse: [{
            name: '.net',
            teacher: 'Lin'
          }],
        teamMainCourseId: 1,
        seminarMainCourseId: 1
      }
    },
    created() {
      this.getParams();
      let that = this;
      that.$axios({
        method: 'GET',
        url: '/course/' + that.$data.courseId,
      })
        .then(res => {
          if (res.data.status === 200) {
            console.log(res.data.data);
            let data = res.data.data;
            that.tableData1[0].percentage = data.presentationPercentage;
            that.tableData1[1].percentage = data.questionPercentage;
            that.tableData1[2].percentage = data.reportPercentage;
            that.startTeamTime = data.startTeamTime;
            that.endTeamTime = data.endTeamTime;
            that.minNum = data.MinMemberNumber;
            that.maxNum = data.MaxMemberNumber;
            that.teamMainCourseId = data.teamMainCourseId;
            that.seminarMainCourseId = data.seminarMainCourseId;
          } else if (res.data.status === 404) {
            alert("未找到指定课程");
          } else {
            alert("错误的ID格式");
          }
        })
        .catch((e) => {
          console.log(e);
        });
      this.isMasterCourse();
    },
    methods: {
      getParams() {
        this.courseId = this.$route.params.courseId;
        this.courseName = this.$route.params.courseName;
      },
      returnLogin() {
        this.$router.push({path: '/'});
      },
      gotoHomePage(){
        this.$router.push({path:'/teacher/HomePage'});
      },
      returnCourseManage() {
        this.$router.push({path: '/teacher/CourseManage'});
      },
      gotoSeminar() {
        this.$router.push({path: '/teacher/SeminarPage'});
      },
      isMasterCourse() {
        var btn = document.getElementById("el-btn");
        if ((teamMainCourseId !== courseId) || (seminarMainCourseId !== courseId)) {
          btn.style.display = "none";
        }
      },
      deleteCourse() {
        MessageBox.confirm('此操作将永久删除该课程?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.$axios({
            method: 'DELETE',
            url: '/course/' + this.$data.courseId
          })
            .then(res => {
              if (res.data.status === 204) {
                this.$message({
                  type: 'success',
                  message: '删除成功!'
                });
                this.$router.push({path: '/teacher/CourseManage'});
              } else if (res.data.status === 400) {
                this.$message({
                  type: 'error',
                  message: '错误的ID格式'
                });
              } else if (res.data.status === 403) {
                this.$message({
                  type: 'warning',
                  message: '用户权限不足'
                });
              } else if (res.data.status === 404) {
                this.$message({
                  type: 'error',
                  message: '未找到课程'
                });
              }
            })
            .catch(e => {
              console.log(e);
            })


        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });
        });
      }
    },
    watch: {
      '$route': 'getParams'
    }
  }
</script>

<style scoped>


</style>
