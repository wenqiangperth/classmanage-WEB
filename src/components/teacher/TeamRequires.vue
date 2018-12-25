<template>
  <div class="body0">
    <div id="head" class="head">
      <div class="title"><i class="el-icon-back icon1 icon0" @click="returnCourseInfo"></i>组队要求
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
    <div class="empty" style="height: 10px;width: 100%"></div>
    <div class="main">
      <el-card class="box-card">
        <div slot="header" style="float: left">
          <span style="font-weight: bold;color: #616161">组员基本要求</span>
        </div>
        <table
          style="width: 100%;text-align: center;font-size: 13px">
          <tr style="height: 35px">
            <td style="width:30%">小组总人数:</td>
            <td>
              {{teamMin}}~{{teamMax}}
            </td>
          </tr>
        </table>
        <table
          style="width: 100%;text-align: center;font-size: 13px">
          <tr style="height: 35px">
            <td style="width:40%">组内选修课程人数:</td>
            <td></td>
          </tr>
        </table>
        <table
          style="width: 100%;text-align: center;font-size: 13px"
          v-for="item in optionalCourse">
          <tr style="height: 35px">
            <td style="width:30%">{{item.courseName}}</td>
            <td>
              {{item.minNum}}~{{item.maxNum}}
            </td>
          </tr>
        </table>
      </el-card>
      <el-card>
        <div slot="header" style="float: left">
          <span style="font-weight: bold;color: #616161">冲突课程</span>
        </div>
        <table
          style="width: 100%;text-align: center;font-size: 13px" v-for="item in conflictCourse">
          <tr style="height: 35px">
            <td style="width: 30%">{{item.courseName}}</td>
            <td>
              {{item.teacherName}}老师
            </td>
          </tr>
          <tr style="height: 35px">
            <td></td>
            <td></td>
          </tr>
        </table>
        <label style="font-size: 12px"><span style="font-weight: bold;color: red">提示：</span>选修不同冲突课程的学生不可同组，注意同课程名不同教师名为不同课程</label>
      </el-card>

    </div>

  </div>
</template>

<script>
  export default {
    name: "TeamRequires",
    data() {
      return {
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
    methods: {
      gotoTotalSeminar() {
        this.$router.push({path: '/teacher/SeminarPage'});
      },
      returnCourseInfo() {
        this.$router.push({path: '/teacher/CourseInfo'});
      },
      gotoHomePage() {
        this.$router.push({path: '/teacher/HomePage'});
      }

    }
  }
</script>

<style scoped>

</style>
