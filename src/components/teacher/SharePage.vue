<template>
  <div class="body0">
    <div id="head" class="head">
      <div class="title"><i class="el-icon-back icon1 icon0" @click="returnCourseManage"></i>共享设置
        <el-dropdown class="plus" trigger="click">
          <i class="el-icon-plus icon0"></i>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item><i class="el-icon-bell" @click="gotoHomePage">&nbsp;&nbsp;个人页</i></el-dropdown-item>
            <el-dropdown-item><i class="el-icon-service" @click="gotoSeminar">&nbsp;&nbsp;讨论课</i></el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </div>
    </div>

    <div class="main">
      <div style="width: 100%;height:60px">
        <el-button type="success" size="small" plain style="float: right;margin-top: 20px" @click="addShare()">
          <i
          class="el-icon-plus" style="font-weight: bolder"></i> 新增共享
        </el-button>
      </div>
      <el-collapse accordion v-for="(item,index) in sharesTeam"
                   :key="index">
        <el-collapse-item v-if="item.status===1">
          <template slot="title">
            <i class="el-icon-share el-icon0" style="float: left;margin-left: 20px;"></i>{{item.subCourseName}}({{item.subCourseTeacherName}})
          </template>
          <el-card>
            <table>
              <tr>
                <td style="width: 30%;color:#66cccc">共享类型:</td>
                <td>共享分组</td>
              </tr>
              <tr>
                <td style="width: 30%;color:#66cccc">共享情况:</td>
                <td v-if="courseId===item.mainCourseId">主课程</td>
                <td v-else-if="courseId===item.subCourseId">从课程</td>
              </tr>
            </table>
            <el-button type="info" size="small" style="float: right;margin-bottom: 5px" @click="cancelShare(item.id)">
              取消共享
            </el-button>
          </el-card>
        </el-collapse-item>

      </el-collapse>
    </div>
  </div>
</template>

<script>
  import {MessageBox} from 'mint-ui';
  export default {
    name: "SharePage",
    data() {
      return {
        courseId: 1,
        sharesTeam: [],
      }
    },
    created() {
      this.getParams();
      let that = this;
      that.$axios({
        method: 'GET',
        url: '/course/' + this.$data.courseId + '/teamshare',
        headers: {
          'Authorization': window.localStorage['token']
        }
      })
        .then(res => {
          if (res.status === 200) {
            window.localStorage['token'] = res.headers.authorization;
            console.log("team共享信息");
            console.log(res.data);
            that.sharesTeam = res.data;

          }
        })
        .catch(e => {
          console.log(e);
        })
    },
    methods: {
      getParams() {
        this.courseId = this.$route.params.courseId;
      },
      returnLogin() {
        this.$router.push({path: '/'});
      },
      returnCourseManage() {
        this.$router.push({path: '/teacher/CourseManage'});
      },
      gotoSeminar() {
        this.$router.push({path: '/teacher/SeminarPage'});
      },
      addShare() {
        this.$router.push({
          path: '/teacher/AddShare',
          name: 'AddShare',
          params: {
            courseId: this.courseId
          }
        });
      },
      cancelShare(teamSharedId) {
        MessageBox.confirm('此操作将取消共享分组?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.$axios({
            method: 'DELETE',
            url: '/course/teamshare/' + teamSharedId,
            headers: {
              'Authorization': window.localStorage['token']
            }
          })
            .then(res => {
              if (res.status === 200) {
                this.$message({
                  type: 'success',
                  message: '取消成功!'
                });
                window.localStorage['token'] = res.headers.authorization;
                this.$router.push({
                  path: '/teacher/SharePage',
                  name: 'SharePage',
                  params: {
                    course: this.course
                  }
                })

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
        });
      },
      gotoHomePage() {
        this.$router.push({path: '/teacher/HomePage'});
      }
    },
    watch: {
      '$route': 'getParams'
    }
  }
</script>

<style scoped>

</style>
<style>
  .el-collapse-item__arrow {
    font-weight: bolder;
  }

</style>

