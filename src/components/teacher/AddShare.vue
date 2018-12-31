<template>
  <div class="body0">
    <div id="head" class="head">
      <div class="title"><i class="el-icon-back icon1 icon0" @click="returnSharePage"></i>新增共享</div>
    </div>
    <div class="main">
      <div style="width: 100%;height:40px"></div>
      <el-card style="width: 100%">
        <table style="width: 100%">
          <tr style="width: 100%">
            <td style="width: 30%;color:#66cccc">共享类型:</td>
            <td>共享分组</td>
          </tr>
          <tr style="width: 100%">
            <td style="width: 30%;color:#66cccc">共享对象:</td>
            <td>
              <el-select id="select" v-model="index1" placeholder="请选择">
                <el-option
                  v-for="(item,index1) in courses"
                  :key="index1"
                  :label="item.courseName+'-'+item.studentOrTeacherName"
                  :value="index1"
                  :disabled="item.courseId===courseId">
                </el-option>
              </el-select>
            </td>
          </tr>

        </table>
      </el-card>
      <el-button class="btn" type="success" plain style="margin-top: 20px" @click="successShare"> 确认共享
      </el-button>
    </div>
  </div>
</template>

<script>
  import {MessageBox} from "mint-ui";
  export default {
    name: "SharePage",
    data() {
      return {
        courseId: 0,
        courses: [],
        index1: '',
        teacherId: '',
        account: ''
      }
    },
    created() {
      this.getParams();
      let that = this;
      that.$axios({
        method: 'GET',
        url: '/user/information',
        headers: {
          'Authorization': window.localStorage['token']
        }
      })
        .then(res => {
          if (res.status === 200) {
            console.log(res.data);
            window.localStorage['token'] = res.headers.authorization;
            that.teacherId = res.data.id;
          }
        }).catch(e => {
        console.log(e);
      });
      that.$axios({
        method: 'GET',
        url: '/course/AllCourse',
        headers: {
          'Authorization': window.localStorage['token']
        }
      })
        .then(res => {
          if (res.status === 200) {
            window.localStorage['token'] = res.headers.authorization;
            console.log("所有课程信息");
            console.log(res.data);
            let data = res.data;

            that.courses = data;
          }
        })
        .catch(e => {
          console.log(e);
        });
    },

    methods: {
      getParams() {
        this.courseId = this.$route.params.courseId;
        this.account = this.$route.params.account;
      },
      returnSharePage() {
        this.$router.push({
          path: '/teacher/SharePage',
          name: 'SharePage',
          params: {
            courseId: this.courseId
          }
        });
      },
      successShare() {
       MessageBox.confirm('确认发送共享分组请求?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'info',
        }).then(() => {
            this.$axios({
              method: 'POST',
              url: '/course/' + this.$data.courseId + '/teamsharerequest',
              data: {
                mainCourseId: this.$data.courseId,
                subCourseId: this.$data.courses[this.index1].courseId,
                subCourseTeacherId: this.$data.courses[this.index1].studentOrTeacherId
              },
              headers: {
                'Authorization': window.localStorage['token']
              }
            })
              .then(res => {
                console.log("发起共享:");
                console.log(res);
                if (res.status === 200) {
                  window.localStorage['token'] = res.headers.authorization;
                  this.$message({
                    type: 'success',
                    message: '发送成功！'
                  });
                  this.$router.push(
                    {
                      path: '/teacher/SharePage',
                      name: 'SharePage',
                      params: {
                        courseId: this.courseId
                      }
                    }
                  )
                } else if (res.status === 403) {
                  this.$message({
                    type: 'warning',
                    message: '用户权限不足！'
                  })
                } else if (res.status === 404) {
                  this.$message({
                    type: 'error',
                    message: '未找到主课程'
                  })
                }
              })
              .catch(e => {
                console.log(e);
              })
        }).catch((e) => {
          console.log(e);
          this.$message({
            type: 'info',
            message: '已取消'
          });
        });
        this.$router.push({
          path: '/teacher/CourseManage',
          name: 'CourseManage',
          query: {
            account: this.account
          }
        })
      },
    },

  }
</script>

<style scoped>

</style>
<style>


</style>

