<template>
  <div>
    <div id="head" class="head">
      <div class="title">
        <i class="el-icon-back icon1 icon0" @click="Back"></i>OOAD
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
            <label>{{currentSeminarInfo.status}}
              <el-button type="text" size="small" style="color:#66cccc;" @click="checkInfo(currentSeminarInfo.status)">
                查看信息
              </el-button>
            </label>
          </td>
        </tr>
      </table>
      <div style="width: 100%" v-if="currentSeminarInfo.status===0">
        <el-button type="success" class="btn" plain @click="startSeminar" style="margin-top: 160px">开始讨论课</el-button>
      </div>
      <div style="width: 100%" v-else-if="currentSeminarInfo.status===1">
        <el-button type="success" class="btn" plain @click="gotoOngoingSeminar" style="margin-top: 160px">进入讨论课
        </el-button>
      </div>
      <div style="width: 100%" v-else-if="currentSeminarInfo.status===2">
        <div style="width: 100%">
          <el-button type="success" class="btn" plain @click="checkReport" style="margin-top: 160px">书面报告</el-button>
        </div>
        <div style="width: 100%;margin-top: 10px">
          <el-button type="success" class="btn" plain @click="checkGrades" style="margin-top: 160px">查看成绩报告</el-button>
        </div>
      </div>
      <!--
      <div>
        <el-button type="success" class="btn1 btn" plain @click="updateInfo">修改讨论课信息</el-button>
      </div>
      <el-button type="info" size="mini" plain
                 style="float: right;margin-top: 5px">
        删除讨论课
      </el-button>-->
    </div>


  </div>
</template>

<script>
  export default {
    name: "BeforeSeminar",
    data() {
      return {
        seminar: {
          seminarId: '',
          order: '2',
          topic: '领域模型',
          num: '1',
          require: '界面导航图和所有界面原型设计课堂讨论每个小组15分钟',
          status: '未开始',
        },
        classId: '',
        seminarId: '',
        roundId: '',
        currentSeminarInfo: {}
      }
    },
    created() {
      this.getParams();
      let that = this;
      that.$axios({
        method: 'GET',
        url: '/seminar/' + that.$data.seminarId + '/class/' + that.$data.classId
      }).then(res => {
        if (res.data.status === 200) {
          let data_ = res.data.data;
          that.currentSeminarInfo.seminarId = seminarId;
          that.currentSeminarInfo.seminarName = data_.seminarName;
          that.currentSeminarInfo.introduction = data_.introduction;
          that.currentSeminarInfo.status = data_.status;
          that.currentSeminarInfo.maxTeam = data_.maxTeam;
          that.currentSeminarInfo.seminarSerial = data.seminarSerial;
          that.currentSeminarInfo.enrollStartTime = data_.enrollStartTime;
          that.currentSeminarInfo.enrollEndTime = data_.enrollEndTime;
          that.currentSeminarInfo.reportDDL = data_.reportDDL;
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
      },
      gotoHomePage(){
        this.$router.push({path:'/teacher/HomePage'});
      },
      startSeminar() {
        this.$router.push({path: '/teacher/StartSeminar'});
      },
      gotoOngoingSeminar() {
        this.$router.push({path: '/teacher/StartSeminar'});
      },
      Back() {
        this.$router.go(-1);
      },
      gotoTotalSeminar() {
        this.$router.push({path: '/teacher/TotalSeminar'});
      },
      checkInfo() {
        this.$router.push({path: '/teacher/CheckInformation'});
      },
      checkReport() {

      },
      checkGrades() {

      }
    },
    watch: {
      '$route': 'getParams'
    }

  }
</script>

<style scoped>

  .tr0 {
    height: 45px;
    background-color: rgba(97, 97, 97, 0.05);
  }

  .tr1 {
    height: 45px;
    background-color: rgba(102, 204, 204, 0.05);
  }

  .td1 {
    width: 30%;
  }



</style>
