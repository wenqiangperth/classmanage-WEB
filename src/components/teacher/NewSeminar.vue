<template>
  <div class="body0">
    <div id="head" class="head">
      <div class="title"><i class="el-icon-close icon1 icon0" @click="returnSeminarPage"></i>新建讨论课</div>
    </div>
    <div class="main">
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
              <el-input-number size="mini" v-model="orderNum"></el-input-number>
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
              <el-select v-model="roundId" placeholder="请选择">
                <el-option
                  v-for="item in roundInfo"
                  :key="item.id"
                  :label="item.roundSerial"
                  :value="item.id">
                </el-option>
              </el-select>
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
    name: "NewSeminar",
    data() {
      return {
        courseId: 0,
        seminarName: '',
        introduction: '',
        isVisible: '',
        startTime: '',
        endTime: '',
        signUpNum: 1,
        orderNum: 1,
        signUpOrder: [{
          value: '选项1',
          label: '自定'
        },
          {
            value: '选项2',
            label: '默认'
          }],
        value: '',
        /*rounds: [{
          value: '选项1',
          label: '无(默认新建)'
        }, {
          value: '选项2',
          label: '第一轮'
        }],*/
        roundInfo: [],
        roundId: '',
        course: []
      }
    },
    created() {
      this.getParams();
    },
    methods: {
      getParams() {
        this.courseId = this.$route.params.courseId;
        this.roundInfo = this.$route.params.roundInfo;
        this.course = this.$route.params.course
        console.log("courseId" + this.courseId);
      },
      returnSeminarPage() {
        this.$router.push({path: '/teacher/SeminarPage'});
      },
      NewSuccess() {
        this.$axios({
          method: 'POST',
          url: '/seminar',
          data: {
            seminarName: this.seminarName,
            introduction: this.introduction,
            seminarSerial: this.orderNum,
            isVisible: this.isVisible,
            enrollStartTime: this.startTime,
            enrollEndTime: this.endTime,
            maxTeam: this.signUpNum,
            roundId: this.roundId,
            courseId: this.courseId
          },
          headers: {
            'Authorization': window.localStorage['token']
          }
        })
          .then(res => {
            if (res.status === 200) {
              window.localStorage['token'] = res.headers.authorization;
              this.$message({
                message: '发布成功！',
                type: 'success'
              });
              this.$router.push({
                path: '/teacher/seminarPage',
                name: 'SeminarPage',
                params: {
                  course: this.course
                }
              });
            } else if (res.status === 403) {
              this.$message({
                message: '用户权限不足！',
                type: 'error'
              });
            }
          })
          .catch(e => {
            console.log(e);
          })

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
