<template>
  <div class="body0">
    <div id="head" class="head">
      <div class="title"><i class="el-icon-close icon1 icon0" @click="returnCourseManage"></i>新建课程</div>
    </div>
    <div class="main" style="font-size: 13px">
      <el-card class="box-card">
        <table style="width: 100%">
          <tr>
            <td style="width: 28%;" class="font_style">课程名称</td>
            <td>
              <el-input v-model="course.courseName">
                <i slot="suffix" class="el-input__icon el-icon-edit icon0"></i>
              </el-input>
            </td>
          </tr>
          <tr>
            <td style="width: 28%;" class="font_style">课程要求</td>
            <td>
              <el-input class="textArea"
                        type="textarea"
                        :autosize="{ minRows: 2, maxRows: 6}"
                        v-model="course.introduction">
              </el-input>
            </td>
          </tr>
        </table>
      </el-card>
      <el-card class="box-card">
        <div slot="header">
          <span class="font_style">成绩计算规则</span>
        </div>
        <table
          v-for="(item,index) in course.tableData1"
          :key="index"
          style="width: 100%">
          <tr class="tr0">
            <td class="td0">{{item.make_up}}</td>
            <td>
              <el-input size="mini" v-model="item.percentage" style="width: 45px"></el-input><label>%</label>
            </td>
          </tr>
        </table>
      </el-card>
      <el-card style="width: 100%">
        <div slot="header">
          <span style="font-weight: bold;color: #616161;">组队要求:</span>
          <el-button type="text" style="float: right; padding: 3px 0" @click="setTeamRequires">
            <i class="el-icon-d-arrow-right" style="font-weight: bolder;font-size: 16px;color: #66cccc"></i>
          </el-button>
        </div>
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
        <el-button class="btn" type="success" plain @click="NewSuccess">发布</el-button>
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
          id: 0,
          courseName: '',
          introduction: '',
          tableData1: [{
            make_up: '课堂展示',
            percentage: '10',
          },
            {
              make_up: '课堂提问',
              percentage: '20',
            },
            {
              make_up: '书面报告',
              percentage: '30',
            }],
          startTime: '',
          endTime: '',
          minNum: '',
          maxNum: '',
          teacherId: 1,
          isGenderRequired:false,
          isGroupByConstellation:false,
          minBoyNum:'',
          minGirlNum:'',
          maxBoyNum:'',
          maxGirlNum:''
        },
        options3: [{
          value: '选项1',
          label: '软件工程**老师',
        }, {
          value: '选项2',
          label: 'OOAD**老师',
        }],
        data0: [],
      }
    },

    methods: {
      returnCourseManage() {
        this.$router.push({path: '/teacher/CourseManage'});
      },
      NewSuccess() {
        this.$axios({
          method: 'POST',
          url: '/course',
          data: {
            courseName: this.course.courseName,
            introduction: this.course.introduction,
            presentationPercentage: this.course.tableData1[0].percentage,
            questionPercentage: this.course.tableData1[1].percentage,
            reportPercentage: this.course.tableData1[2].percentage,
            teamStartTime: this.course.startTime,
            teamEndTime: this.course.endTime
          },
          headers: {
            'Authorization': window.localStorage['token']
          }
        })
          .then(res => {
            console.log(res.data);
            if (res.status === 200) {
              window.localStorage['token'] = res.headers.authorization;
              this.$message({
                type: 'success',
                message: '创建成功'
              });
              this.$router.push({path: '/teacher/CourseManage'});
            } else if (res.status === 403) {
              this.$message({
                type: 'error',
                message: '用户权限不足'
              })
            }
          })
          .catch(e => {
            console.log(e);
          })
      },
      setTeamRequires() {
        this.$router.push({path: '/teacher/SetTeamRequires'});
      }
    }
  }
</script>

<style scoped>

  .box-card {
    width: 100%;
  }

  .td0 {
    width: 50%;
    text-align: center;
    height:35px;
  }


</style>
