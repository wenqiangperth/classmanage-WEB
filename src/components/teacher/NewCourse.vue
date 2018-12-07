<template>
  <div class="body0">
    <div id="head" class="head">
      <div class="title"><i class="el-icon-close icon1 icon0" @click="returnCourseManage"></i>新建课程</div>
    </div>
    <div class="main">
      <el-card class="box-card">
        <table style="width: 100%">
          <tr>
            <td style="width: 28%">课程名称</td>
            <td>
              <el-input v-model="course.name">
                <i slot="suffix" class="el-input__icon el-icon-edit icon0"></i>
              </el-input>
            </td>
          </tr>
          <tr>
            <td style="width: 28%">课程要求</td>
            <td>
              <el-input class="textArea"
                        type="textarea"
                        :autosize="{ minRows: 2, maxRows: 6}"
                        v-model="course.description">
              </el-input>
            </td>
          </tr>
        </table>
      </el-card>
      <el-card class="box-card">
        <span>成绩计算规则</span>
        <table
          v-for="(item,index) in course.tableData1"
          :key="index"
          style="width: 100%">
          <tr>
            <td class="td0">{{item.make_up}}</td>
            <td>
              <el-input-number size="mini" v-model="item.percentage"></el-input-number>
            </td>
          </tr>
        </table>
      </el-card>
      <el-card class="box-card">
        <table
          style="width: 100%">
          <tr>
            <td style="width:30%">小组人数:</td>
            <td>
              <el-input placeholder="下限" v-model="course.minNum"></el-input>
            </td>
            <td>
              <el-input placeholder="上限" v-model="course.maxNum"></el-input>
            </td>
          </tr>
        </table>
        <table
          style="width:100%">
          <tr>
            <td style="width: 28%">组队开始:</td>
            <td style="text-align: right">
              <el-date-picker
                v-model="course.startTime"
                type="datetime"
                placeholder="选择日期时间"
                style="width:100%">
              </el-date-picker>
            </td>
          </tr>
          <tr>
            <td style="width: 28%">组队截止:</td>
            <td style="text-align: right">
              <el-date-picker
                v-model="course.endTime"
                type="datetime"
                placeholder="选择日期时间"
                style="width: 100%">
              </el-date-picker>
            </td>
          </tr>

        </table>
      </el-card>
      <div style="width: 100%;margin-top: 20px">
        <el-button class="btn" type="success" @click="NewSuccess">发布</el-button>
      </div>

    </div>
  </div>
</template>

<script>
  export default {
    name: "NewCourse",
    data() {
      return {
        course: {
          name: '',
          description: '',
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
          startTime: '',
          endTime: '',
          minNum: '',
          maxNum: ''
        }
      }
    },
    methods: {
      returnCourseManage() {
        this.$router.push({path: '/teacher/CourseManage'});
      },
      NewSuccess() {
        this.$router.push({path: '/teacher/CourseManage'});
      }
    }
  }
</script>

<style scoped>
  .body0 {
    font-family: "Helvetica Neue", Helvetica, "PingFang SC", "Hiragino Sans GB", "Microsoft YaHei", "微软雅黑", Arial, sans-serif;
    font-size: 14px;
  }

  .head {
    height: 70px;
    width: 100%;
    background-color: #CCFF99;
  }

  .title {
    display: block;
    text-align: center;
    line-height: 70px;
  }

  .icon0 {
    font-weight: bolder;
  }
  .icon1 {
    float: left;
    margin-left: 3%;
    line-height: 70px;
  }

  .box-card {
    width: 100%;
    margin-top: 10px;
  }

  .td0 {
    width: 50%;
    text-align: center;
  }

  .btn {
    height: 36px;
    width: 100%;
    border: none;
    background-color: #66CCCC;
    margin: auto;
  }

  .main {
    width: 50%;
    margin: auto;
  }

  .el-input-number__decrease {
    background: aquamarine;
  }
  @media (max-width: 640px) {
    .main {
      width: 100%;
      margin: auto;
    }
  }
</style>
