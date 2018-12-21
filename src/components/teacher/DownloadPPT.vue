<template>
  <div>
    <div id="head" class="head">
      <div class="title"><i class="el-icon-back icon1 icon0" @click="returnHomePage"></i>OOAD
        <el-dropdown class="plus" trigger="click">
          <i class="el-icon-plus icon0"></i>
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
          <td style="width: 30%"><label>第{{index+1}}组</label></td>
          <td>
            <a href="#" style="text-decoration: none" @click="download(index)">{{item}}</a>
          </td>
        </tr>
        <tr class="tr1" v-show="index%2===1">
          <td style="width: 30%"><label>第{{index+1}}组</label></td>
          <td>
            <a href="#" style="text-decoration: none">{{item}}</a>
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
      let that = this;
      //先获取展示的Id,展示顺序
      that.$axios({
        method: 'GET',
        url: '/attendance/attendanceId/report',
        params: {
          attendanceId: that.attendanceId
        }
      })
        .then(res => {
          if (res.data.status === 200) {
            let data = res.data.data;
            that.groupInfo = data.order;//返回此次讨论课的展示顺序和对应ID？？？
          }
        })
        .catch(e => {
          console.log(e);
        })

    },
    methods: {
      returnHomePage() {
        this.$router.push({path: '/teacher/HomePage'});
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
              url: '/attendance/attendanceId/powerpoint',
              params: {
                attendanceId: index
              }
            })
              .then(res => {
                if (res.data.status === 200) {
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
              url: '/seminar/{seminarId}/class/{classId}/ppt',
              params: {
                ppt: that.groupInfo
              }
            })
              .then(res => {
                if (res.data.status === 200) {
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
          });
      }
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

  .info {
    width: 100%;
    font-size: 14px;
    font-family: "Helvetica Neue", Helvetica, "PingFang SC", "Hiragino Sans GB", Arial, sans-serif;
  }
</style>

