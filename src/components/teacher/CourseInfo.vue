<template>
  <div class="body0">
    <div id="head" class="head">
      <div class="title"><i class="el-icon-back icon1 icon0" @click="returnCourseManage"></i>课程要求
        <el-dropdown class="plus" trigger="click">
          <i class="el-icon-plus icon0"></i>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item><i class="el-icon-bell" @click="gotoHomePage">&nbsp;&nbsp;个人页</i></el-dropdown-item>
            <el-dropdown-item><i class="el-icon-service" @click="gotoTotalSeminar">&nbsp;&nbsp;讨论课</i>
            </el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </div>
    </div>

    <div class="main">
      <div class="empty" style="height: 10px;width: 100%"></div>
      <el-card style="width: 100%">
        <div slot="header">
          <span style="font-weight: bold;color: #616161;float: left">简介</span>
        </div>
        <p style="font-size: 13px">{{introduction}}</p>
      </el-card>
      <el-card style="width: 100%">
        <div slot="header" style="float: left">
          <span style="font-weight: bold;color: #616161">成绩计算规则</span>
        </div>
        <table
          v-for="(item,index) in tableData1"
          :key="index"
          style="width: 100%;font-size: 13px">
          <tr style="height: 30px;width: 100%">
            <td style="width:30%">{{item.make_up}}</td>
            <td style="text-align: center">
              {{item.percentage}}%
            </td>
          </tr>
        </table>
      </el-card>
      <el-card style="width: 100%">
        <table
          style="width: 100%;text-align: center;font-size: 13px">
          <tr style="height: 30px;width: 100%">
            <td style="width: 30%">组队开始:</td>
            <td>{{teamStartTime}}</td>
          </tr>
          <tr style="height: 30px;width:100%">
            <td style="width: 30%">组队截止:</td>
            <td>{{teamEndTime}}</td>
          </tr>
        </table>
      </el-card>
      <el-card style="width: 100%">
        <div slot="header" style="float: left">
          <span style="font-weight: bold;color: #616161">组员基本要求</span>
        </div>
        <table
          style="width: 100%;text-align: center;font-size: 13px">
          <tr style="height: 35px;width: 100%">
            <td style="width:30%">小组总人数:</td>
            <td>
              {{teamMin}}~{{teamMax}}
            </td>
          </tr>
        </table>
        <table
          style="width: 100%;text-align: center;font-size: 13px">
          <tr style="height: 35px;width: 100%">
            <td style="width:40%">组内选修课程人数:</td>
            <td></td>
          </tr>
        </table>
        <table
          style="width: 100%;text-align: center;font-size: 13px"
          v-for="item in optionalCourse">
          <tr style="height: 35px;width: 100%">
            <td style="width:30%">{{item.courseName}}</td>
            <td>
              {{item.minNum}}~{{item.maxNum}}
            </td>
          </tr>
        </table>
      </el-card>
      <el-card style="width: 100%">
        <div slot="header" style="float: left">
          <span style="font-weight: bold;color: #616161">冲突课程</span>
        </div>
        <table
          style="width: 100%;text-align: center;font-size: 13px" v-for="item in conflictCourse">
          <tr style="height: 35px;width: 100%">
            <td style="width: 30%">{{item.courseName}}</td>
            <td>
              {{item.teacherName}}老师
            </td>
          </tr>
          <tr style="height: 35px;width: 100%">
            <td></td>
            <td></td>
          </tr>
        </table>
        <label style="font-size: 12px"><span style="font-weight: bold;color: red">提示：</span>选修不同冲突课程的学生不可同组，注意同课程名不同教师名为不同课程</label>
      </el-card>

      <div id="el-btn" style="width: 100%;margin-top: 20px"
           v-show="(((teamMainCourseId===null)&&(seminarMainCourseId===null))||(teamMainCourseId!==null)&&(teamMainCourseId===courseId)||(seminarMainCourseId!==null)&&(seminarMainCourseId==courseId))">
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

        course: [],
        courseId: 1,
        courseName: '',
        introduction: '翻转课堂形式上课，学生自由组队，以小组形式每周做汇报，每组汇报时间15分钟',
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
        teamStartTime: '2018-12-01 12:00:00',
        teamEndTime: '2018-12-06 12:00:00',
        minNum: 0,
        maxNum: 0,
        teamMainCourseId: 1,
        seminarMainCourseId: 1,
        teamMin: 6,
        teamMax: 8,
        optionalCourse: [
          {
            courseId: 1,
            courseName: 'J2EE',
            minNum: 6,
            maxNum: 8
          }
        ],
        conflictCourse: [
          {
            courseId: 1,
            courseName: 'J2EE',
            teacherId: 1,
            teacherName: '林坤辉'
          }
        ]
      }
    },
    created() {
      this.course = this.$route.params.course;
      this.courseId = this.course.courseId;
      this.courseName = this.course.courseName;
      let that = this;
      that.$axios({
        method: 'GET',
        url: '/course/' + that.$data.courseId,
        headers: {
          'Authorization': window.localStorage['token']
        }
      })
        .then(res => {
          if (res.status === 200) {
            window.localStorage['token'] = res.headers.authorization;
            console.log("aaaaa");
            console.log(res.data);
            let data = res.data;
            /**/
            that.introduction = data.introduction;
            that.tableData1[0].percentage = data.presentationPercentage;
            that.tableData1[1].percentage = data.questionPercentage;
            that.tableData1[2].percentage = data.reportPercentage;
            that.teamStartTime = data.teamStartTime.substring(0, 10) + ' ' + data.teamStartTime.substring(11, 19);
            that.teamEndTime = data.teamEndTime.substring(0, 10) + ' ' + data.teamEndTime.substring(11, 19);
            that.teamMainCourseId = data.teamMainCourseId;
            that.seminarMainCourseId = data.seminarMainCourseId;
          } else if (res.status === 404) {
            this.$message({
              type: 'error',
              message: '未找到课程信息'
            })
          } else if (res.status === 400) {
            this.$message({
              type: 'error',
              message: '错误的ID格式'
            })
          }
        })
        .catch((e) => {
          console.log(e);
        });
    },
    methods: {
      returnLogin() {
        this.$router.push({path: '/'});
      },
      returnCourseManage() {
        this.$router.push({path: '/teacher/CourseManage'});
      },
      gotoHomePage() {
        this.$router.push({path: '/teacher/HomePage'});
      },
      gotoTotalSeminar() {
        this.$router.push({path: '/teacher/SeminarPage'});
      },
      deleteCourse() {
        MessageBox.confirm('此操作将永久删除该课程?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.$axios({
            method: 'DELETE',
            url: '/course/' + this.$data.courseId,
            headers: {
              'Authorization': window.localStorage['token']
            }
          })
            .then(res => {
              if (res.status === 200) {
                this.$router.push({path: '/teacher/CourseManage'});
                console.log("删除成功");
                this.$message({
                  type: 'success',
                  message: '删除成功!'
                });
                window.localStorage['token'] = res.headers.authorization;

              } else if (res.status === 400) {
                this.$message({
                  type: 'error',
                  message: '错误的ID格式'
                });
              } else if (res.status === 403) {
                this.$message({
                  type: 'warning',
                  message: '用户权限不足'
                });
              } else if (res.status === 404) {
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
