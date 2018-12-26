<template>
  <div>
    <div id="head" class="head">
      <div class="title"><i class="el-icon-back icon0 icon1" @click="gotoHomePage"></i><span>我的课程</span>
        <el-dropdown class="plus" trigger="click">
          <i class="el-icon-plus icon0 icon1"></i>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item><i class="el-icon-bell" @click="gotoHomePage">&nbsp;&nbsp;个人页</i></el-dropdown-item>
            <el-dropdown-item><i class="el-icon-service" @click="gotoTotalSeminar">&nbsp;&nbsp;讨论课</i>
            </el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </div>
    </div>
    <div class="empty"></div>
    <div class="main">
      <div class="new_course" @click="NewCourse(courses.studentOrTeacherId)">
        <i class="el-icon-plus icon2" style="font-weight: bolder;color: #66cccc"><span
          style="color: dimgrey">新建课程</span></i>
      </div>
      <el-collapse accordion background-color="#66CCCC" v-for="(items,index) in courses"
                   :key="index">
        <el-collapse-item>
          <template slot="title">
            <div style="font-weight: bold">
              &nbsp;&nbsp;<i class="iconfont icon-kecheng"></i>&nbsp;&nbsp;{{items.courseName}}
            </div>
          </template>
          <div style="width: 100%">
            <div>
              <el-button class="btn_info" type="info" plain @click="viewGrades(index)">
                <i class="iconfont icon-chengjiguanli"></i>&nbsp;&nbsp;{{item[0]}}
              </el-button>
            </div>
            <div>
              <el-button class="btn_info" type="info" plain @click="viewGroups(index)">
                <i class="iconfont icon-zudui"></i>&nbsp;&nbsp;{{item[1]}}
              </el-button>
            </div>
            <div>
              <el-button class="btn_info" type="info" plain @click="viewCourseInfo(index)">
                <i class="iconfont icon-xinxi1"></i>&nbsp;&nbsp;{{item[2]}}
              </el-button>
            </div>
            <div>
              <el-button class="btn_info" type="info" plain @click="viewClassInfo(index)">
                <i class="iconfont icon-xinxi"></i>&nbsp;&nbsp;{{item[3]}}
              </el-button>
            </div>
            <div>
              <el-button class="btn_info" type="info" plain @click="gotoSeminar(index)">
                <i class="iconfont icon-guanlianguize"></i>&nbsp;&nbsp;{{item[4]}}
              </el-button>
            </div>
            <div>
              <el-button class="btn_info" type="info" plain @click="setShare(index)">
                <i class="el-icon-share el-icon0"></i>&nbsp;&nbsp;{{item[5]}}
              </el-button>
            </div>
          </div>
        </el-collapse-item>
      </el-collapse>

    </div>
  </div>
</template>

<script>
  export default {
    name: "CourseManage",
    data() {
      return {
        courses: [],
        account: '',
        item: [
          '学生成绩',
          '学生组队',
          '课程信息',
          '班级信息',
          '讨论课设置',
          '共享设置'
        ],
      }
    },
    created() {
      this.account = this.$route.query.account;
      let that = this;
      that.$axios({
        method: 'GET',
        url: '/course',
        headers: {
          'Authorization': window.localStorage['token']
        }
      })
        .then(response => {
          if (response.status === 200) {
            window.localStorage['token'] = response.headers.authorization;
            let data = response.data;
            that.courses = data;
            console.log(that.courses);
          } else if (response.status === 404) {
            that.$message({
              type: 'error',
              message: '未找到课程'
            })
          } else if (response.status === 400) {
            that.$message({
              type: 'error',
              message: '错误的id格式'
            })
          }

        })
        .catch(e => {
          console.log(e)
        })
    },
    methods: {

      gotoHomePage(){
        this.$router.push({
          path: '/teacher/HomePage',
          name: 'homePage',
          query: {
            account: this.account
          }
        });
      },
      gotoTotalSeminar() {
        this.$router.push({path: '/teacher/TotalSeminar'});
      },
      NewCourse(teacherId) {
        this.$router.push({
          path: '/teacher/NewCourse',
          name: 'NewCourse',
          params: {
            teacherId: teacherId
          }
        });
      },
      viewGrades(index) {
        let course = this.courses[index];
        this.$router.push({
          path: '/teacher/StudentGrades',
          name: 'StudentGrades',
          params: {
            courseId: course.courseId,
            courseName: course.courseName
          }
        });
      },
      viewGroups(index) {
        let course = this.courses[index];
        this.$router.push({
          path: '/teacher/StudentGroups',
          name: 'StudentGroups',
          params: {
            courseId: course.courseId,
            courseName: course.courseName
          }
        });
      },
      viewCourseInfo(index) {
        let course = this.courses[index];
          this.$router.push({
            path: '/teacher/CourseInfo',
            name: 'CourseInfo',
            params: {
              course: course
            }
          });
      },
      viewClassInfo(index) {
        let course = this.courses[index];
        this.$router.push({
          path: '/teacher/ClassInfo',
          name: 'ClassInfo',
          query: {
            courseId: course.courseId,
            courseName: course.courseName
          }
        });
      },
      gotoSeminar(index) {
        let course = this.courses[index];
        this.$router.push({
          path: '/teacher/SeminarPage',
          name: 'SeminarPage',
          params: {
            course: course

          }
        });
      },
      setShare(index) {
        let course = this.courses[index];
        this.$router.push({
          path: '/teacher/SharePage',
          name: 'SharePage',
          params: {
            courseId: course.courseId,
            courseName: course.courseName
          }
        });
      },

      },

  }
</script>

<style scoped>

  .empty {
    width: 100%;
    height: 30px;
  }

  .new_course {
    width: 100%;
    height: 50px;
  }

  .icon2 {
    float: right;
  }

  .btn_info {
    width: 100%;
  }

</style>
