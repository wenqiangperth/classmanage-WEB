<template>
  <div>
    <div id="head" class="head">
      <div class="title">
        <i class="el-icon-back icon1 icon0" @click="Back"></i>
        成绩
      </div>
    </div>
    <div class="main">
      <el-card style="width: 100%">
        <table style="width: 100%;text-align: center">
          <tr style="width: 100%">
            <td style="width: 15%" class="font_style">组号</td>
            <td style="width: 21.25%;" class="font_style">展示</td>
            <td style="width: 21.25%;" class="font_style">提问</td>
            <td style="width: 21.25%;" class="font_style">报告</td>
            <td class="font_style">总分</td>
          </tr>
        </table>
        <table style="width: 100%;text-align: center"
               v-for="(item,index) in results"
               :key="index">
          <tr style="width: 100%">
            <td style="width: 15%">{{classSerial}}-{{item.teamSerial}}</td>
            <td style="width: 21.25%;">
              <el-input class="input0" placeholder="成绩" v-model="item.score.presentationScore"></el-input>
            </td>
            <td style="width: 21.25%;">
              <el-input class="input0" placeholder="成绩" v-model="item.score.questionScore"></el-input>
            </td>
            <td style="width: 21.25%;">
              <el-input class="input0" placeholder="成绩" v-model="item.score.reportScore"></el-input>
            </td>
            <td>
              <el-input placeholder="成绩" v-model="item.score.totalScore" :disabled="true"></el-input>
            </td>
          </tr>
        </table>
      </el-card>

      <div style="width: 100%">
        <el-button type="success" class="btn" plain
                   style="margin-top: 40px"
                   @click="updateSuccess">确认修改
        </el-button>
      </div>
    </div>

  </div>
</template>

<script>
  export default {
    name: "ResultsPage",
    data() {
      return {
        seminarId: '',
        course: [],
        classId: '',
        roundId: '',
        results: [],
        classSerial: ''
      }
    },
    created() {
      this.course = this.$route.params.course;
      this.seminarId = this.$route.params.seminarId;
      this.roundId = this.$route.params.roundId;
      this.classId = this.$route.params.classId;
      let that = this;
      that.$axios({
        method: 'GET',
        url: '/class/' + that.classId,
        headers: {
          'Authorization': window.localStorage['token']
        }
      })
        .then(res => {
          if (res.status === 200) {
            window.localStorage['token'] = res.headers.authorization;
            console.log(res.data);
            that.classSerial = res.data.klassSerial;
          }
        })
        .catch(e => {
          console.log(e);
        });
      that.$axios({
        method: 'GET',
        url: '/seminar/' + that.seminarId + '/class/' + that.classId + '/seminarscore',
        headers: {
          'Authorization': window.localStorage['token']
        }
      })
        .then(res => {
          if (res.status === 200) {
            window.localStorage['token'] = res.headers.authorization;
            console.log(res.data);
            that.results = res.data;
          }
        })
        .catch(e => {
          console.log(e);
        });

    },
    methods: {
      gotoHomePage(){
        this.$router.push({path:'/teacher/HomePage'});
      },
      gotoSeminar(){
        this.$router.push({
          path: '/teacher/TotalSeminar'
        });
      },
      Back() {
        this.$router.push({
          path: '/teacher/BeforeSeminar',
          name: 'beforeSeminar',
          params: {
            course: this.course,
            classId: this.classId,
            roundId: this.roundId,
            seminarId: this.seminarId
          }
        })
      },
      updateSuccess() {
        this.$axios({
          method: 'PUT',
          url: '/seminar/' + this.seminarId + '/class/' + this.classId + '/seminarscore',
          data: {
            results: this.results
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
                path: '/teacher/BeforeSeminar',
                name: 'beforeSeminar',
                params: {
                  seminarId: this.seminarId,
                  classId: this.classId,
                  roundId: this.roundId,
                  course: this.course
                }
              });
            }
          }).catch(e => {
          console.log(e);
        })

      }

    }
  }
</script>

<style scoped>


  .input0 {
    background-color: lavender;
  }

</style>


