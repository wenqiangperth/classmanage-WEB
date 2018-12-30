<template>
  <div class="body0">
    <div id="head" class="head">
      <div class="title"><i class="el-icon-close icon1 icon0" @click="returnSeminarPage"></i>轮次设置</div>
    </div>
    <div class="main">
      <el-card style="width: 100%">
        <div slot="header">
          <span class="font_style">讨论课:</span>
          <!--<el-button type="success" size="small" plain style="float: right" @click="addSeminar"><i
            class="el-icon-plus"></i>&nbsp;添加讨论课
          </el-button>-->
        </div>
        <table
          style="width: 100%;text-align: center"
          v-for="seminar in seminars">
          <tr style="width: 100%">
            <td>{{seminar.seminarName}}</td>
          </tr>
        </table>
      </el-card>
      <el-card style="width: 100%">
        <div slot="header">
          <span class="font_style">成绩设置:</span>
        </div>
        <table style="width: 100%;">
          <tr style="width: 100%">
            <td style="width: 50%;text-align: center">展示:</td>
            <td>
              <el-select v-model="roundInfo.presentationScoreMethod" placeholder="请选择">
                <el-option
                  v-for="item in options"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                </el-option>
              </el-select>
            </td>
          </tr>
          <tr style="width: 100%">
            <td style="width: 50%;text-align: center">提问:</td>
            <td>
              <el-select v-model="roundInfo.questionScoreMethod" placeholder="请选择">
                <el-option
                  v-for="item in options2"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                </el-option>
              </el-select>
            </td>
          </tr>
          <tr style="width: 100%">
            <td style="width: 50%;text-align: center">报告:</td>
            <td>
              <el-select v-model="roundInfo.reportScoreMethod" placeholder="请选择">
                <el-option
                  v-for="item in options3"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                </el-option>
              </el-select>
            </td>
          </tr>
        </table>
      </el-card>
      <el-card style="width: 100%">
        <div slot="header">
          <span class="font_style">本轮讨论课报名次数:</span>
        </div>
        <table
          v-for="item in roundInfo.klassRounds"
          style="width: 100%"
        >
          <tr style="width: 100%">
            <td style="width: 50%;text-align: center">{{item.klassSerial}}班:</td>
            <td>
              <el-input-number size="mini" v-model="item.enrollNumber"></el-input-number>
            </td>
          </tr>
        </table>
      </el-card>
      <div style="width: 100%;margin-top: 20px">
        <el-button class="btn" type="success" plain @click="SetSuccess">修改</el-button>
      </div>
    </div>

  </div>
</template>

<script>
  export default {
    name: "SetRound",
    data() {
      return {
        roundId: 1,
        seminars: [],
        roundInfo: {},
        course: [],
        options: [{
          value: 1,
          label: '最高分'
        }, {
          value: 0,
          label: '平均分'
        }],
        options2: [{
          value: 1,
          label: '最高分'
        }, {
          value: 0,
          label: '平均分'
        }],
        options3: [{
          value: 1,
          label: '最高分'
        }, {
          value: 0,
          label: '平均分'
        }],

      }
    },
    created() {
      this.getParams();
      let that = this;
      that.$axios({
        method: 'GET',
        url: '/round/' + that.$data.roundId + '/seminar',
        headers: {
          'Authorization': window.localStorage['token']
        }
      })
        .then(res => {
          if (res.status === 200) {
            window.localStorage['token'] = res.headers.authorization;
            that.seminars = [];
            that.seminars = res.data;
          } else if (res.status === 400) {
            this.$message({
              type: 'error',
              message: '错误的ID格式'
            })
          } else if (res.status === 404) {
            this.$message({
              type: 'error',
              message: '未找到讨论课'
            })
          }
        })
        .catch(e => {
          console.log(e);
        });
      that.$axios({
        method: 'GET',
        url: '/round/' + that.$data.roundId,
        headers: {
          'Authorization': window.localStorage['token']
        }
      })
        .then(res => {
          if (res.status === 200) {
            window.localStorage['token'] = res.headers.authorization;
            let data_ = res.data;
            console.log(data_);
            that.roundInfo = data_;
          } else if (res.status === 400) {
            this.$message({
              type: 'error',
              message: '错误的ID格式'
            })
          } else if (res.status === 404) {
            this.$message({
              type: 'error',
              message: '未找到轮次'
            })
          }
        })
        .catch(e => {
          console.log(e);
        })
    }
    ,
    methods: {
      getParams() {
        this.roundId = this.$route.params.roundId;
        this.course = this.$route.params.course;
      },
      returnSeminarPage() {
        this.$router.push({
          path: '/teacher/SeminarPage',
          name: 'SeminarPage',
          params: {
            course: this.course
          }
        });
      },
      SetSuccess() {
        this.$axios({
          method: 'PUT',
          url: '/round/' + this.$data.roundId,
          data: {
            presentationScoreMethod: this.roundInfo.presentationScoreMethod,
            questionScoreMethod: this.roundInfo.questionScoreMethod,
            reportScoreMethod: this.roundInfo.reportScoreMethod,
            klassRounds: this.roundInfo.klassRounds
          },
          headers: {
            'Authorization': window.localStorage['token']
          }
        })
          .then(res => {
            if (res.status === 200) {
              window.localStorage['token'] = res.headers.authorization;
              this.$message({
                message: '修改成功!',
                type: 'success'
              });
              this.$router.push({
                path: '/teacher/SeminarPage',
                name: 'SeminarPage',
                params: {
                  course: this.course
                }
              });
            } else if (res.status === 400) {
              this.$message({
                type: 'error',
                message: '错误的ID格式'
              })
            } else if (res.status === 403) {
              this.$message({
                type: 'error',
                message: '用户权限不足'
              })
            }
          }).catch(e => {
          console.log(e);
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

