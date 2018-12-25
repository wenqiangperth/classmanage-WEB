<template>
  <div class="body0">
    <div id="head" class="head">
      <div class="title"><i class="el-icon-close icon1 icon0" @click="returnSeminarPage"></i>修改讨论课信息</div>
    </div>
    <div class="main">
      <div style="width: 100%;height: 15px"></div>
      <el-card class="box-card">
        <table style="width: 100%">
          <tr>
            <td style="width: 28%">主题</td>
            <td>
              <el-input v-model="seminarName">
                <i slot="suffix" class="el-input__icon el-icon-edit icon0"></i>
              </el-input>
            </td>
          </tr>
          <tr>
            <td style="width: 28%">要求</td>
            <td>
              <el-input class="textArea"
                        type="textarea"
                        placeholder="讨论课详情"
                        :autosize="{ minRows: 2, maxRows: 9}"
                        v-model="introduction">
              </el-input>
            </td>
          </tr>
          <tr style="height:50px">
            <td style="width: 28%">次序号:</td>
            <td style="text-align: right">
              <el-input-number size="mini" v-model="seminarSerial"></el-input-number>
            </td>
          </tr>
          <tr>
            <td style="width: 28%;height: 35px">是否可见:</td>
            <td style="text-align: right">
              <el-switch
                :active-value=1
                :inactive-value=0
                v-model=isVisible
                active-color="#66cccc"
                inactive-color="#616161">
              </el-switch>
            </td>
          </tr>
        </table>
      </el-card>
      <el-card class="box-card">
        <table
          style="width:100%">
          <tr>
            <td style="width: 26%">报名开始</td>
            <td style="text-align: right">
              <el-date-picker
                v-model="startTime"
                type="datetime"
                placeholder="选择日期时间"
                style="width:100%">
              </el-date-picker>
            </td>
          </tr>
          <tr>
            <td style="width: 26%">报名截止</td>
            <td style="text-align: right">
              <el-date-picker
                v-model="endTime"
                type="datetime"
                placeholder="选择日期时间"
                style="width: 100%">
              </el-date-picker>
            </td>
          </tr>
          <tr>
            <td style="width: 26%">报名组数</td>
            <td style="text-align: right">
              <el-input-number size="mini" v-model="signUpNum"></el-input-number>
            </td>
          </tr>
          <tr>
            <td style="width: 26%">报名顺序</td>
            <td style="text-align: right">
              <el-select v-model="value" placeholder="请选择">
                <el-option
                  v-for="item in signUpOrder"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                </el-option>
              </el-select>
            </td>
          </tr>
          <tr>
            <td style="width: 26%">round</td>
            <td style="text-align: right">
              <el-select v-model="value1" placeholder="请选择">
                <el-option
                  v-for="item in roundInfo"
                  :key="item.id"
                  :label="item.seminarSerial"
                  :value="item.id">
                </el-option>
              </el-select>
            </td>
          </tr>
        </table>
      </el-card>
      <el-button type="info" size="small"
                 style="float: right;margin-top: 15px;margin-bottom: 15px"
                 @click="deleteSeminar">删除该讨论课
      </el-button>
      <div style="width: 100%;margin-top: 20px">
        <el-button class="btn" type="success" @click="NewSuccess" plain>保存</el-button>
      </div>

    </div>
  </div>
</template>

<script>
  import {MessageBox} from 'mint-ui';
  export default {
    name: "UpdateSeminarInfo",
    data() {
      return {
        seminarId: 1,
        seminarName: '',
        introduction: '',
        isVisible: '',
        startTime: '',
        endTime: '',
        signUpNum: '',
        seminarSerial: '',
        signUpOrder: [{
          value: '选项1',
          label: '自定'
        },
          {
            value: '选项2',
            label: '默认'
          }],
        roundInfo: [],
        rounds: [{
          value: '选项1',
          label: ''
        }, {
          value: '选项2',
          label: '第一轮'
        }],
        value: '默认',
        value1: '无(默认新建)'
      }
    },
    created() {
      this.seminarId = this.$route.params.seminar.id;
      this.seminarName = this.$route.params.seminar.seminarName;
      this.seminarSerial = this.$route.params.seminar.seminarSerial;
      this.introduction = this.$route.params.seminar.introduction;
      this.isVisible = this.$route.params.seminar.isVisible;
      this.value1 = this.$route.params.roundSerial;
      this.startTime = this.$route.params.seminar.enrollStartTime;
      this.endTime = this.$route.params.seminar.enrollEndTime;
      this.signUpNum = this.$route.params.seminar.maxTeam;
      console.log(this.seminarId);
    },
    methods: {
      returnSeminarPage() {
        this.$router.push({path: '/teacher/SeminarPage'});
      },
      NewSuccess() {
        this.$axios({
          method: 'PUT',
          url: '/seminar/' + this.seminarId,
          data: {
            seminarId: this.seminarId,
            seminarName: this.seminarName,
            introduction: this.introduction,
            seminarSerial: this.seminarSerial,
            isVisible: this.isVisible,
            roundId: this.value1,
            enrollStartTime: this.startTime,
            enrollEndTime: this.endTime,
            maxTeam: this.signUpNum
          },
          headers: {
            'Authorization': window.localStorage['token']
          }
        }).then(res => {
          if (res.status === 200) {
            window.localStorage['token'] = res.headers.authorization;
            this.$message({
              message: '修改成功！',
              type: 'success'
            });
            this.$router.push({path: '/teacher/seminarPage'});
          } else if (res.status === 400) {
            this.$message({
              message: '错误的ID格式！',
              type: 'error'
            });
          } else if (res.status === 403) {
            this.$message({
              message: '权限不足！',
              type: 'error'
            });
          }
        })

      },
      deleteSeminar() {
        MessageBox.confirm('此操作将永久删除该讨论课?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.$axios({
            method: 'DELETE',
            url: '/seminar/' + this.$data.seminarId,
            headers: {
              'Authorization': window.localStorage['token']
            }
          })
            .then(res => {
              if (res.status === 200) {
                window.localStorage['token'] = res.headers.authorization;
                this.$message({
                  type: 'success',
                  message: '删除成功!'
                });
                this.$router.push({path: '/teacher/SeminarPage'});
              } else if (res.status === 400) {
                this.$message({
                  type: 'error',
                  message: '错误的ID格式!'
                });
              } else if (res.status === 403) {
                this.$message({
                  type: 'error',
                  message: '用户权限不足!'
                });
              } else if (res.status === 404) {
                this.$message({
                  type: 'error',
                  message: '未找到!'
                });
              }
            }).catch(e => {
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

  .box-card {
    width: 100%;
  }

</style>

