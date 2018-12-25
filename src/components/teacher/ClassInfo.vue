<template>
  <div>
    <div id="head" class="head">
      <div class="title"><i class="el-icon-back icon1 icon0" @click="returnCourseManage"></i>{{courseName}}
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
      <div class="new_course" @click="addClass(courseId)" style="width: 100%;height: 50px">
        <i class="el-icon-plus icon2" style="font-weight: bolder;color: #66cccc"><span
          style="color: dimgrey">新建班级</span></i>
      </div>
      <div style="width: 100%"
           v-for="(item,index) in classInfo"
           :key="index">
        <el-card>
          <div slot="header">
            <span style="font-weight: bold">{{item.grade}}-{{item.klassSerial}}</span>
          </div>
          <table style="width: 100%;font-weight: bold;color: dimgrey">
            <tr>
              <td style="width: 35%">讨论课时间:</td>
              <td>{{item.klassTime}}</td>
            </tr>
            <tr>
              <td style="width: 35%">讨论课地点:</td>
              <td>{{item.klassLocation}}</td>
            </tr>
            <tr>
              <td style="width: 35%">学生名单:</td>
              <!--<td>{{item.nameList.name}}</td>-->
              <td>
                <el-upload
                  class="upload-demo"
                  action="https://jsonplaceholder.typicode.com/posts/"
                  multiple
                  :limit="3"
                  :on-exceed="handleExceed">
                  <el-button size="mini" type="info" plain>点击上传</el-button>
                  <!--<div slot="tip" class="el-upload__tip" style="float:right">未选择任何文件</div>-->
                </el-upload>
              </td>
            </tr>
            <tr>
              <td style="width: 35%"></td>
              <td></td>
            </tr>
          </table>
          <table style="width: 100%;text-align: center">
            <tr style="height: 20px">
              <td></td>
            </tr>
            <tr style="height: 20px">
              <td>
                <el-button type="success" plain size="small" style="width: 40%" @click="Submit">提交</el-button>
              </td>
              <td>
                <el-button type="info" size="small" style="width: 40%" @click="DeleteClass(item.id)">删除</el-button>
              </td>
            </tr>
            <tr style="height: 20px">
              <td></td>
            </tr>
          </table>
        </el-card>

      </div>

    </div>

  </div>
</template>

<script>
  import {MessageBox} from 'mint-ui';
  export default {
    name: "ClassInfo",
    data() {
      return {
        courseId: 2,
        courseName: '',
        classInfo: [
          {
            courseId: '',
            id: 2,
            grade: 2016,
            klassSerial: 1,
            klassTime: '周三7，8节',
            klassLocation: '海韵教学楼',
          }
        ]
      }
    },
    created() {
      this.getParams();
      console.log(this.courseId);
      let that = this;
      that.$axios({
        method: 'GET',
        url: '/course/' + that.$data.courseId + '/class',
        headers: {
          'Authorization': window.localStorage['token']
        }
      })
        .then(res => {
          if (res.status === 200) {
            window.localStorage['token'] = res.headers.authorization;
            let data = res.data;
            console.log(data);
            that.classInfo = data;
          } else if (res.status === 400) {
            that.$message({
              type: 'error',
              message: '错误的ID格式'
            })
          } else if (res.status === 404) {
            that.$message({
              type: 'error',
              message: '未找到班级'
            })
          }
        })
        .catch(e => {
          console.log(e);
        })
    }
    ,
    methods: {
      getParams() {
        this.courseId = this.$route.query.courseId;
        this.courseName = this.$route.query.courseName;
      },
      gotoHomePage(){
        this.$router.push({path:'/teacher/HomePage'});
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
      handleExceed(files, fileList) {
        this.$message.warning(`当前限制选择 3 个文件，本次选择了 ${files.length} 个文件，共选择了 ${files.length + fileList.length} 个文件`);
      },
      addClass(courseId) {
        this.$router.push({
          path: '/teacher/NewClass',
          name: 'NewClass',
          params: {
            courseId: courseId,
            courseName: this.courseName
          }
        });
      },
      Submit() {

        this.$message({
          message: '提交成功！',
          type: 'success'
        });

      },
      DeleteClass(classId) {
        MessageBox.confirm('此操作将永久删除该班级?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.$axios({
            method: 'DELETE',
            url: '/class/' + classId,
            headers: {
              'Authorization': window.localStorage['token']
            }
          })
            .then(res => {
              if (res.status === 200) {
                window.localStorage['token'] = res.headers.authorization;
                this.$message({
                  type: 'success',
                  message: '删除成功!'
                });
                this.$router.push({
                  path: '/teacher/CourseManage',
                })
              } else if (res.status === 400) {
                this.$message({
                  type: 'error',
                  message: '错误的ID格式!'
                });
              } else if (res.status === 403) {
                this.$message({
                  type: 'error',
                  message: '用户的权限不足!'
                });
              } else if (res.status === 404) {
                this.$message({
                  type: 'error',
                  message: '未找到该班级!'
                });
              }
            }).catch(e => {
            console.log(e);
          })
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });
        });
      }
    },
    watch: {
      '$route': 'getParams'
    }
  }
</script>

<style scoped>
  .icon2 {
    float: right;
    margin-top: 20px;
    margin-bottom: 10px;
  }
</style>
