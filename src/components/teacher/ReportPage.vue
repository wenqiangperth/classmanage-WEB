<template>
  <div>
    <div id="head" class="head">
      <div class="title">
        <i class="el-icon-back icon1 icon0" @click="Back"></i>
        书面报告
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
      <el-card>
        <table style="width: 100%"
               v-for="(item,index) in groupInfo"
               :key="index">
          <tr id="tr0">
            <td style="width: 20%">第{{item.teamOrder}}组</td>
            <td style="width: 55%;">
              <span style="color: #66cccc" @click="downloadReport1"
                    v-if="item.reportUrl!==null">{{item.reportName}}</span>
              <span style="color: red" v-else>未提交</span>
            </td>
            <td>
              <el-input placeholder="成绩" v-model="item.result"></el-input>
            </td>
          </tr>
        </table>
      </el-card>
      <div>
        <el-button type="success" class="btn" plain
                   style="margin-top: 60px"
                   @click="downloadReport">批量下载
        </el-button>
      </div>
      <div>
        <el-button type="success" class="btn" plain
                   style="margin-top: 10px"
                   @click="editResults">修改
        </el-button>
      </div>
    </div>

  </div>
</template>

<script>
  import {MessageBox} from 'mint-ui';

  export default {
    name: "ReportPage",
    data() {
      return {
        seminarId: '',
        classId: '',
        course: [],
        roundId: '',
        files: [],
        groupInfo: [],

      }
    },
    created() {
      this.getParams();
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
            console.log("展示小组信息");
            console.log(res.data);
            this.groupInfo = res.data;
          }
        }).catch(e => {
        console.log(e);
      })
    }
    ,
    methods: {
      getParams() {
        this.seminarId = this.$route.params.seminarId;
        this.classId = this.$route.params.classId;
        this.roundId = this.$route.params.roundId;
        this.course = this.$route.params.course;
      },
      Back() {
        this.$router.push({
          path: '/teacher/BeforeSeminar',
          name: 'beforeSeminar',
          params: {
            seminarId: this.seminarId,
            course: this.course,
            roundId: this.roundId,
            classId: this.classId
          }
        })
      },
      gotoHomePage() {
        this.$router.push({path: '/teacher/HomePage'});
      },
      gotoTotalSeminar() {
        this.$router.push({path: '/teacher/TotalSeminar'});
      },
      downloadReport1() {
        MessageBox.confirm('确定下载该报告吗?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'info'
        })
          .then(() => {
            this.$axios({
              method: 'GET',
              url: '/attendance/' + this.groupInfo.teamOrder + '/class/' + this.$data.classId + '/report',
              headers: {
                'Authorization': window.localStorage['token']
              }
            })
              .then(res => {
                if (res.status === 200) {
                  window.localStorage['token'] = res.headers.authorization;
                  console.log("下载文件");
                  console.log(res.data);
                  /*this.files = res.data;
                  this.$message({
                    type: 'success',
                    message: '下载成功!'
                  });*/
                }
              })
              .catch(e => {
                console.log(e);
              })
          }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });
        })
      },
      downloadReport() {
        MessageBox.confirm('确定下载所有报告吗?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'info'
        })
          .then(() => {
            this.$axios({
              method: 'GET',
              url: '/seminar/' + this.$data.seminarId + '/class/' + this.$data.classId + '/report',
              headers: {
                'Authorization': window.localStorage['token']
              }
            })
              .then(res => {
                if (res.status === 200) {
                  window.localStorage['token'] = res.headers.authorization;
                  console.log("下载文件");
                  console.log(res.data);
                  /*this.files = res.data;
                  this.$message({
                    type: 'success',
                    message: '下载成功!'
                  });*/
                }
              })
              .catch(e => {
                console.log(e);
              })
          }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });
        })

      },
      editResults() {
        this.$router.push({path: '/teacher/AfterSeminar'});
      },

    },
    watch: {
      '$route': 'getParams'
    }
  }
</script>

<style scoped>

</style>
