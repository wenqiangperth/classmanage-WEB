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
               v-for="(item,index) in files"
               :key="index">
          <tr id="tr0">
            <td style="width: 20%">{{item.attendanceId}}</td>
            <td style="width: 55%;"><span style="color: #66cccc" @click="downloadReport1">{{item.file}}</span></td>
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
        files: [],
        reports: [
          {
            groupId: '3-1',
            reportUrl: '3-1业务流程.pdf',
            result: ''
          },
          {
            groupId: '3-2',
            reportUrl: '3-2业务流程.pdf',
            result: ''
          }, {
            groupId: '3-3',
            reportUrl: '3-3业务流程.pdf',
            result: ''
          },
          {
            groupId: '3-4',
            reportUrl: '3-4业务流程.pdf',
            result: ''
          },
          {
            groupId: '3-5',
            reportUrl: '3-5业务流程.pdf',
            result: ''
          },
          {
            groupId: '3-6',
            reportUrl: '3-6业务流程.pdf',
            result: ''
          }
        ]
      }
    },
    created() {
      this.getParams();
    }
    ,
    methods: {
      getParams() {
        this.seminarId = this.$route.params.seminarId;
        this.classId = this.$route.params.classId;
      },
      Back() {
        this.$router.go(-1);
      },
      gotoHomePage(){
        this.$router.push({path:'/teacher/HomePage'});
      },
      gotoTotalSeminar() {
        this.$router.push({path: '/teacher/TotalSeminar'});
      },
      downloadReport1() {

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
              url: '/seminar/' + this.$data.seminarId + '/class/' + this.$data.classId + '/report'
            })
              .then(res => {
                if (res.status === 200) {
                  console.log(res.data);
                  this.files = res.data;
                  this.$message({
                    type: 'success',
                    message: '下载成功!'
                  });
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
