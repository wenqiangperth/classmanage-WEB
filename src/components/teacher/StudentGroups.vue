<template>
  <div>
    <div id="head" class="head">
      <div class="title"><i class="el-icon-back icon1 icon0" @click="returnCourseManage"></i>组队信息
        <el-dropdown class="plus" trigger="click">
          <i class="el-icon-plus icon1 icon0"></i>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item><i class="el-icon-bell" @click="gotoHomePage">&nbsp;&nbsp;个人页</i></el-dropdown-item>
            <el-dropdown-item><i class="el-icon-service" @click="gotoSeminar">&nbsp;&nbsp;讨论课</i></el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </div>
    </div>
    <div class="empty"></div>
    <div class="main">
      <el-collapse accordion v-for="(item,index) in info"
                   :key="index">
        <el-collapse-item>
          <template slot="title">
            <div style="font-weight: bold" v-for="cid in classInfo">
              &nbsp;&nbsp<span v-show="cid.id===item.klassId"><i class="header-icon el-icon-star-off el-icon0"></i>&nbsp;&nbsp;{{cid.klassSerial}}-{{item.teamSerial}}-{{item.teamName}}</span>
              <span v-if="(item.status===0)&&(cid.id===item.klassId)" style="color: red;"><i class="el-icon-warning"
                                                                                             style="font-size: 18px"></i></span>
              <span v-else-if="(item.status===2)&&(cid.id===item.klassId)" style="color: red;"><i class="el-icon-time"
                                                                                                  style="font-size: 18px"></i></span>
            </div>
          </template>
          <el-card style="width:100%">
            <div slot="header" v-for="leader in item.students">
              <span v-show="leader.id===item.leaderId"
                    style="font-weight:bold;color: #616161">组长:{{leader.studentName}}</span>
            </div>
            <el-table
              :data="item.students"
              style="width: 100%;margin: auto"
            >
              <el-table-column
                prop="account"
                label="学号"
                style="width: 50%"
                align="center">
              </el-table-column>
              <el-table-column
                prop="studentName"
                label="姓名"
                style="width: 50%"
                align="center">
              </el-table-column>
            </el-table>
          </el-card>
        </el-collapse-item>
      </el-collapse>
    </div>

  </div>
</template>

<script>
  export default {
    name: "StudentGroups",
    data() {
      return {
        courseId: '',
        courseName: '',
        course: [],
        info: [{
          klassId: '',
          teamName: '',
          teamSerial: '',
          leaderId: '',
          students: [
            {
              id: '',
              account: '',
              studentName: ''
            }
          ],
          status: ''
        }],
        classInfo: [
          {
            id: '',
            klassSerial: ''
          }
        ],
        groups: []
      }
    },
    created() {
      this.getParams();
      let that = this;
      that.$axios({
        method: 'GET',
        url: '/course/' + that.$data.courseId + '/team',
        headers: {
          'Authorization': window.localStorage['token']
        }
      })
        .then(res => {
          console.log(res.data);
          if (res.status === 200) {
            window.localStorage['token'] = res.headers.authorization;
            let data = res.data;
            //console.log(data);
            that.info = data;
          } else if (res.status === 400) {
            this.$message({
              type: 'error',
              message: '错误的ID格式'
            })
          } else if (res.status === 404) {
            this.$message({
              type: 'error',
              message: '未找到组队信息'
            })
          }
        })
        .catch(e => {
          console.log(e);
        });
      if (that.course.teamMainCourseId !== null && that.courseId !== that.course.teamMainCourseId) {
        that.$axios({
          method: 'GET',
          url: '/course/' + that.course.teamMainCourseId + '/class',
          headers: {
            'Authorization': window.localStorage['token']
          }
        })
          .then(res => {
            console.log(res.data);
            if (res.status === 200) {
              window.localStorage['token'] = res.headers.authorization;
              let data = res.data;
              console.log(data);
              this.classInfo = data;
            } else if (res.status === 400) {
              this.$message({
                type: 'error',
                message: '错误的ID格式'
              })
            } else if (res.status === 404) {
              this.$message({
                type: 'error',
                message: '未找到组队信息'
              })
            }
          })
          .catch(e => {
            console.log(e);
          });
      } else {
        that.$axios({
          method: 'GET',
          url: '/course/' + that.courseId + '/class',
          headers: {
            'Authorization': window.localStorage['token']
          }
        })
          .then(res => {
            console.log(res.data);
            if (res.status === 200) {
              window.localStorage['token'] = res.headers.authorization;
              let data = res.data;
              console.log(data);
              this.classInfo = data;
            } else if (res.status === 400) {
              this.$message({
                type: 'error',
                message: '错误的ID格式'
              })
            } else if (res.status === 404) {
              this.$message({
                type: 'error',
                message: '未找到组队信息'
              })
            }
          })
          .catch(e => {
            console.log(e);
          });
      }

    },
    methods: {
      getParams() {
        this.course = this.$route.params.course;
        this.courseId = this.$route.params.course.courseId;
        this.courseName = this.$route.params.course.courseName;
      },
      gotoBacklog() {
        this.$router.push({path: '/teacher/Backlog'});
      },
      returnCourseManage() {
        this.$router.push({path: '/teacher/CourseManage'});
      },
      gotoSeminar() {
        this.$router.push({path: '/teacher/SeminarPage'});
      },
      gotoHomePage(){
        this.$router.push({path: '/teacher/HomePage'});
      }

    },
    watch: {
      '$route': 'getParams'
    }
  }
</script>

<style scoped>

  .empty {
    width: 100%;
    height: 30px;
  }

</style>

