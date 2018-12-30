<template>
  <div>
    <div id="head" class="head">
      <div class="title"><i class="el-icon-back icon1 icon0" @click="Back"></i>OOAD
        <el-dropdown class="plus" trigger="click">
          <span class="el-dropdown-link">
            <i class="el-icon-plus icon0"></i>
          </span>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item><i class="el-icon-bell" @click="gotoHomePage">&nbsp;&nbsp;个人页</i></el-dropdown-item>
            <el-dropdown-item><i class="el-icon-service" @click="gotoSeminar"></i>&nbsp;&nbsp;讨论课</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </div>
    </div>
    <div class="main">
      <div style="width:100%;height:25px"></div>
      <table class="info" cellspacing="0" v-for="(item,index) in groupInfo"
             :key="index">
        <tr class="tr0" v-show="index%2===0">
          <td style="width: 30%"><label>第{{item.teamOrder}}组</label></td>
          <td>
            <label v-if="item.pptUrl===null"><span
              style="color: red">未提交</span></label>
            <label v-else>{{item.pptName}}</label>
          </td>
        </tr>
        <tr class="tr1" v-show="index%2===1">
          <td style="width: 30%"><label>第{{item.teamOrder}}组</label></td>
          <td>
            <label v-if="item.pptUrl===null"><span
              style="color: red">未提交</span></label>
            <label v-else>{{item.pptName}}</label>
          </td>
        </tr>
      </table>
    </div>

  </div>
</template>

<script>
  export default {
    name: "CheckInfo",
    data() {
      return {
        attendanceId: '',
        classId: '',
        seminarId: '',
        course: [],
        roundId: '',
        groupInfo: []
      }
    },
    created() {
      this.classId = this.$route.params.classId;
      this.seminarId = this.$route.params.seminarId;
      this.course = this.$route.params.course;
      this.roundId = this.$route.params.roundId;
      let that = this;
      that.$axios({
        method: 'GET',
        url: '/seminar/' + that.seminarId + '/class/' + that.classId + '/attendance',
        headers: {
          'Authorization': window.localStorage['token']
        }
      })
        .then(res => {
          if (res.status === 200) {
            window.localStorage['token'] = res.headers.authorization;
            let data = res.data;
            console.log("展示小组信息");
            console.log(data);
            that.groupInfo = data;

          }
        })
        .catch(e => {
          console.log(e);
        })
    },
    methods: {
      Back() {
        this.$router.push({
          path: '/teacher/BeforeSeminar',
          name: 'beforeSeminar',
          params: {
            course: this.course,
            roundId: this.roundId,
            classId: this.classId,
            seminarId: this.seminarId
          }
        })
      },
      gotoSeminar() {
        this.$router.push({path: '/teacher/SeminarPage'});
      },
      gotoHomePage() {
        this.$router.push({path: '/teacher/HomePage'});
      },
    }
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

  .info {
    width: 100%;
    font-size: 14px;
    font-family: 黑体;
  }
</style>
