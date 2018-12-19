<template>
  <div class="body0">
    <div id="head" class="head">
      <div class="title"><i class="el-icon-back icon1 icon0" @click="returnCourseManage"></i>课程信息
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
          <span style="font-weight: bold">课程要求</span>
        </div>
        <p>{{courseInfo.description}}</p>
      </el-card>
      <el-card class="box-card">
        <div slot="header" style="float: left">
          <span style="font-weight: bold">成绩计算规则</span>
        </div>
        <table
          v-for="(item,index) in courseInfo.tableData1"
          :key="index"
          style="width: 100%;">
          <tr style="height: 35px">
            <td style="width:30%">{{item.make_up}}</td>
            <td style="text-align: center">
              {{item.percentage}}%
            </td>
          </tr>
        </table>
      </el-card>
      <el-card>
        <table
          style="width: 100%;text-align: center">
          <tr style="height: 35px">
            <td style="width:30%">小组人数:</td>
            <td>
              {{courseInfo.minNum}}~{{courseInfo.maxNum}}
            </td>
          </tr>
          <tr style="height: 35px">
            <td style="width: 30%">组队开始:</td>
            <td style="text-align: right">{{courseInfo.startTime}}</td>
          </tr>
          <tr style="height: 35px">
            <td style="width: 30%">组队截止:</td>
            <td style="text-align: right">{{courseInfo.endTime}}</td>
          </tr>
        </table>
      </el-card>
      <div style="width: 100%;margin-top: 20px">
        <el-button class="btn_info" type="info"
                   @click="deleteCourse" plain
                   style="float: right">
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
        courseInfo: {
          name: '',
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
          startTime: '2018-12-01 12:00:00',
          endTime: '2018-12-06 12:00:00',
          minNum: 6,
          maxNum: 8
        }
      }
    },
    methods: {
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
      deleteCourse() {
        MessageBox.confirm('此操作将永久删除该课程?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.$message({
            type: 'success',
            message: '删除成功!'
          });
          this.$router.push({path:'/teacher/CourseManage'});
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });
        });
      }
      }
  }
</script>

<style scoped>


</style>
