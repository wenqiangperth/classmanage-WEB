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
             :key="index" style="width: 100%">
        <tr class="tr0" v-show="index%2===0">
          <td style="width: 30%"><label>第{{index+1}}组</label></td>
          <td>
            <label @click="download(index)">{{item}}</label>
          </td>
        </tr>
        <tr class="tr1" v-show="index%2===1">
          <td style="width: 30%"><label>第{{index+1}}组</label></td>
          <td>
            <label @click="download(index)">{{item}}</label>
          </td>
        </tr>
      </table>
      <el-button class="btn" type="success" plain style="margin-top: 40px" @click="batchDownload">批量下载</el-button>
    </div>

  </div>
</template>

<script>
  import {MessageBox} from "mint-ui";

  export default {
    name: "DownloadPPT",
    data() {
      return {
        attendanceId: '',
        classId: '',
        seminarId: '',
        course: [],
        roundId: '',
        ppt: [],
        groupInfo: [
          '1-1.ppt',
          '1-2.ppt',
          '1-3.ppt',
          '1-4.ppt',
          '1-5.ppt',
        ]
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
            console.log(data);

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
      download(index) {
        let that = this;
        console.log(index);

        MessageBox.confirm('确定下载所有ppt吗?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'info'
        })
          .then(() => {
            that.$axios({
              method: 'GET',
              url: '/attendance/' + (index + 1) + '/powerpoint',
              headers: {
                'Authorization': window.localStorage['token']
              }
            })
              .then(res => {
                if (res.status === 200) {
                  window.localStorage['token'] = res.headers.authorization;
                  this.$message({
                    type: 'success',
                    message: '下载成功!'
                  });
                }
              })
              .catch(e => {
                console.log(e);
              })
          })
          .catch(() => {
            this.$message({
              type: 'info',
              message: '已取消删除'
            });
          })
      },
      batchDownload() {
        let that = this;
        MessageBox.confirm('确定下载所有ppt吗?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'info'
        })
          .then(() => {
            that.$axios({
              method: 'GET',
              url: '/seminar/' + this.$data.seminarId + '/class/' + this.$data.classId + '/ppt',
              headers: {
                'Authorization': window.localStorage['token']
              }
            })
              .then(res => {
                if (res.status === 200) {
                  window.localStorage['token'] = res.headers.authorization;
                  console.log(res.data);
                  that.ppt = res.data;
                  this.$message({
                    type: 'success',
                    message: '下载成功!'
                  });
                }
              })
              .catch(e => {
                console.log(e);
              })
          })
          .catch(() => {
            this.$message({
              type: 'info',
              message: '已取消下载'
            });
          });
      }
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
  }
</style>

