<template>
  <div>
    <div id="head" class="head">
      <div class="title"><i class="el-icon-back icon1 icon0" @click="returnCourseManage"></i>学生成绩
      </div>
    </div>

    <div class="main" style="font-size: 14px" v-for="(round,index) in rounds"
         :key="index">
      <el-collapse accordion>
        <el-collapse-item>
          <template slot="title">
            <div style="width: 100%;text-align: left" @click="getScores(index)">
              &nbsp;&nbsp;<i class="header-icon el-icon-service el-icon0"></i>&nbsp;&nbsp;<span
              style="font-weight: bold;font-family: 黑体;color: #616161">第{{round.roundSerial}}轮</span>
            </div>
          </template>
          <div style="width: 100%;">
            <div v-for="(item,index0) in scores"
                 :key="index0">
              <el-button type="info" plain style="width:100%" @click="showGrade(index0)">
                <i class="iconfont icon-zudui"></i>&nbsp;&nbsp;{{item.team.klassSerial}}-{{item.team.teamSerial}}&nbsp;&nbsp;{{item.team.teamName}}
              </el-button>
            </div>
          </div>


        </el-collapse-item>
      </el-collapse>
      <div style="width: 100%">
        <el-dialog custom-class="customWidth"
          title="成绩"
          :visible.sync="dialogTableVisible"
          width="90%">
          <el-table
            :data="seminarsScore"
            style="width: 100%;"
          >
            <el-table-column
              prop="seminarName"
              label="主题"
              style="width: 30%"
              align="center">
            </el-table-column>
            <el-table-column
              label="展示"
              style="width: 24%"
              align="center">
              <template slot-scope="scope">
                <el-input v-model="scope.row.presentationScore"></el-input>
              </template>
            </el-table-column>
            <el-table-column
              label="提问"
              style="width: 24%"
              align="center">
              <template slot-scope="scope">
                <el-input v-model="scope.row.questionScore"></el-input>
              </template>
            </el-table-column>
            <el-table-column
              label="报告"
              align="center">
              <template slot-scope="scope">
                <el-input v-model="scope.row.reportScore"></el-input>
              </template>
            </el-table-column>
          </el-table>
          <table style="width: 100%">
            <tr style="width: 100%">
              <td style="text-align: center;width: 30%">总成绩</td>
              <td style="text-align: center;width: 30%">
                <el-input width="75" v-model="roundScore.presentationScore" :disabled="true"></el-input>
              </td>
              <td style="text-align: center;width: 30%">
                <el-input width="75" v-model="roundScore.questionScore" :disabled="true"></el-input>
              </td>
              <td style="text-align: center;width: 30%">
                <el-input width="75" v-model="roundScore.reportScore" :disabled="true"></el-input>
              </td>
            </tr>
          </table>
          <table style="width: 60%">
            <tr style="width: 100%">
              <td style="width: 40%">本轮总成绩</td>
              <td>
                <el-input v-model="roundScore.totalScore" :disabled="true"></el-input>
              </td>
            </tr>
          </table>
          <el-button type="info" plain @click="UpdateGrades(index)"
                     style="margin-top: 5px;float: right;margin-bottom: 15px">
            修改
          </el-button>
        </el-dialog>
      </div>

    </div>
  </div>
</template>

<script>
  export default {
    name: "CourseManage",
    data() {
      return {
        account: '',
        scores: [],
        courseId: '',
        courseName: '',
        rounds: [],
        teams: [],
        seminarsScore: [],
        roundScore: [],
        dialogTableVisible: false
      }
    },
    created() {
      this.courseId = this.$route.params.courseId;
      this.courseName = this.$route.params.courseName;
      let that = this;
      that.$axios({
        method: 'GET',
        url: '/course/' + that.$data.courseId + '/round',
        headers: {
          'Authorization': window.localStorage['token']
        }
      })
        .then(res => {
          if (res.status === 200) {
            window.localStorage['token'] = res.headers.authorization;
            console.log("进入");
            console.log(res.data);
            that.rounds = res.data;
          }
        }).catch(e => {
        console.log(e);
      });
    },
    methods: {
      returnCourseManage() {
        this.$router.push({
          path: '/teacher/CourseManage',
          name: 'CourseManage',
          params: {
            account: this.account
          }
        });
      },
      UpdateGrades(index) {
        let scores0 = this.scores[index].roundScore;
        this.$axios({
          method: 'PUT',
          url: '',
          data: {
            scores: scores0
          },
          headers: {
            'Authorization': window.localStorage['token']
          }
        }).then(res => {
          if (res.status === 200) {
            window.localStorage['token'] = res.headers.authorization;
            this.$message({
              type: 'success',
              message: '修改成功'
            })
          }
        }).catch(e => {
          console.log(e);
        })
      },
      showGrade(index) {
        this.dialogTableVisible = true;
        this.seminarsScore = this.scores[index].seminarScores;
        this.roundScore = this.scores[index].roundScore;
      },
      getScores(index) {
        this.$axios({
          method: 'GET',
          url: '/course/' + this.courseId + '/round/' + this.rounds[index].id + '/roundscore',
          headers: {
            'Authorization': window.localStorage['token']
          }
        })
          .then(res => {
            if (res.status === 200) {
              console.log("轮次下所有成绩");
              console.log(res.data);
              this.scores = res.data;

            }
          })
      }

    }
  }
</script>

<style scoped>

  .empty {
    width: 100%;
    height: 40px;
  }


</style>
<style>
  .customWidth {
    width: 60%;
  }
  .el-dialog__body {
    padding: 10px 20px 50px 20px;
  }

  .el-collapse-item__header {
    font-size: 15px;
    font-weight: bold;
    color: #616161;
  }
</style>

