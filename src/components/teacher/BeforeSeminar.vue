<template>
  <div>
    <div id="head" class="head">
      <div class="title">
        <i class="el-icon-back icon1 icon0" @click="Back"></i>讨论课
        <el-dropdown class="plus" trigger="click">
          <span class="el-dropdown-link">
            <i class="el-icon-plus icon0"></i>
          </span>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item><i class="el-icon-bell" @click="gotoHomePage">&nbsp;&nbsp;个人页</i></el-dropdown-item>
            <el-dropdown-item><i class="el-icon-service" @click="gotoTotalSeminar">&nbsp;&nbsp;讨论课</i>
            </el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </div>
    </div>
    <div class="main">
      <div style="width: 100%;height: 15px"></div>
      <table class="info" cellspacing="0" style="font-family: 黑体;color: #616161;width:100%">
        <tr class="tr0">
          <td class="td1"><label>轮次:</label></td>
          <td><label>第{{roundId}}轮</label></td>
        </tr>
        <tr class="tr1">
          <td class="td1"><label>主题:</label></td>
          <td><label>{{currentSeminarInfo.seminarName}}</label></td>
        </tr>
        <tr class="tr0">
          <td class="td1"><label>课次序号:</label></td>
          <td><label>{{currentSeminarInfo.seminarSerial}}</label></td>
        </tr>
        <tr class="tr1">
          <td class="td1"><label>要求:</label></td>
          <td><label>{{currentSeminarInfo.introduction}}</label></td>
        </tr>
        <tr class="tr0">
          <td class="td1"><label>课程情况:</label></td>
          <td>
            <label v-if="status===0">未开始</label>
            <label v-else-if="status===1">正在进行</label>
            <label v-else-if="status===2">已结束</label>
            <el-button type="text" size="small" style="color:#66cccc;"
                       @click="checkInfo(status,classId,seminarId)">
              查看信息
            </el-button>

          </td>
        </tr>
      </table>
      <div style="width: 100%" v-if="status===0">
        <el-button type="success" class="btn" plain @click="startSeminar" style="margin-top: 160px">开始讨论课</el-button>
      </div>
      <div style="width: 100%" v-else-if="status===1">
        <el-button type="success" class="btn" plain @click="gotoOngoingSeminar" style="margin-top: 160px">进入讨论课
        </el-button>
      </div>
      <div style="width: 100%;" v-else-if="status===2">
        <div style="width: 100%">
          <el-button type="success" class="btn" plain @click="checkReport(seminarId,classId)" style="margin-top: 100px">
            书面报告
          </el-button>
        </div>
        <div style="width: 100%;margin-top: 10px">
          <el-button type="success" class="btn" plain @click="checkGrades(seminarId,classId)">查看成绩</el-button>
        </div>
      </div>
    </div>


  </div>
</template>

<script>
  export default {
    name: "BeforeSeminar",
    data() {
      return {

        classId: '',
        seminarId: '',
        roundId: '',
        currentSeminarInfo: [],
        status: '',
        course: [],
        klassSeminarId: ''
      }
    },
    created() {
      this.getParams();
      let that = this;
      that.$axios({
        method: 'GET',
        url: '/seminar/' + that.$data.seminarId,
        headers: {
          'Authorization': window.localStorage['token']
        }
      }).then(res => {
        if (res.status === 200) {
          window.localStorage['token'] = res.headers.authorization;
          let data_ = res.data;
          console.log("当前信息");
          console.log(data_);
          that.currentSeminarInfo = data_;

        }
      })
        .catch(e => {
          console.log(e);
        });

      that.$axios({
        method: 'GET',
        url: '/seminar/' + that.$data.seminarId + '/class/' + that.$data.classId,
        headers: {
          'Authorization': window.localStorage['token']
        }
      }).then(res => {
        console.log("aaaaa");
        console.log(res.data);
        if (res.status === 200) {
          window.localStorage['token'] = res.headers.authorization;
          that.status = res.data.status;
          that.klassSeminarId = res.data.id;
          console.log("aaaaaaaaaaaaaa");
          console.log(that.klassSeminarId);
        }
      })
        .catch(e => {
          console.log(e);
        })
    },
    methods: {
      getParams() {
        this.seminarId = this.$route.params.seminarId;
        this.classId = this.$route.params.classId;
        this.roundId = this.$route.params.roundId;
        this.course = this.$route.params.course;
      },
      gotoHomePage() {
        this.$router.push({
          path: '/teacher/HomePage',
        });
      },
      startSeminar() {
        let that=this;
        console.log('执行xia:');
        console.log(that.currentSeminarInfo.seminarName);
        this.$axios({
          method: 'PUT',
          url: '/seminar/' + this.seminarId + '/status',
          headers:{
            'Authorization':window.localStorage['token']
          },
          data: {
            status: 1,
            klassId: this.classId
          }
        })
          .then(res => {
            console.log(res);
            if (res.status === 200) {
              that.$router.push({
                path: '/teacher/StartSeminar',
                name: 'StartSeminar',
                params: {
                  classId: that.classId,
                  seminarId: that.seminarId,
                  course: that.course,
                  roundId: that.roundId,
                  seminarName: that.currentSeminarInfo.seminarName
                }
              });
            }
          }).catch(e => {
          console.log(e);
        });
      },
      gotoOngoingSeminar() {
        this.$router.push({
          path: '/teacher/StartSeminar',
          name: 'StartSeminar',
          params: {
            classId: this.classId,
            seminarId: this.seminarId,
            seminarName:this.currentSeminarInfo.seminarName,
          }
        });
      },
      Back() {
        this.$router.push({
          path: '/teacher/SeminarPage',
          name: 'SeminarPage',
          params: {
            course: this.course
          }
        })
      },
      gotoTotalSeminar() {
        this.$router.push({path: '/teacher/TotalSeminar'});
      },
      checkInfo(status, classId, seminarId) {

        this.$router.push({
            path: '/teacher/CheckInformation',
            name: 'CheckInformation',
            params: {
              roundId: this.roundId,
              course: this.course,
              seminarId: seminarId,
              classId: classId
            }
          });
      },
      checkReport(seminarId, classId) {
        this.$router.push({
          path: '/teacher/ReportPage',
          name: 'ReportPage',
          params: {
            seminarId: seminarId,
            classId: classId,
            roundId: this.roundId,
            course: this.course
          }
        })
      },
      checkGrades(seminarId, classId) {
        this.$router.push({
          path: '/teacher/ResultsPage',
          name: 'ResultsPage',
          params: {
            seminarId: seminarId,
            classId: classId,
            roundId: this.roundId,
            course: this.course
          }
        })
      }
    },


  }
</script>

<style scoped>

  .tr0 {
    width: 100%;
    height: 45px;
    background-color: rgba(97, 97, 97, 0.05);
  }

  .tr1 {

    width: 100%;
    height: 45px;
    background-color: rgba(102, 204, 204, 0.05);
  }

  .td1 {
    width: 30%;
  }


</style>
