<template>
  <div>
    <div id="head" class="head">
      <div class="title"><i class="el-icon-back icon1 icon0" @click="Back"></i>{{course.courseName}}
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
      <el-collapse accordion
                   background-color="#66CCCC">
        <el-collapse-item v-for="(items,index) in roundInfo"
                          :key="index">
          <template slot="title">
            <div style="font-weight: bold;width:100%;text-align: left;" @click="chooseRound(index)">
              &nbsp;&nbsp;<i class="el-icon-service el-icon0"></i><span>&nbsp;&nbsp;第{{items.roundSerial}}轮</span>
            </div>
          </template>
          <div style="width: 100%">
            <el-button class="btn" type="info" plain @click="setRound(items.id)">该轮轮次设置</el-button>
          </div>
          <div style="width:100%" v-for="(item,index0) in seminars" :key="index0">
            <el-card style="width:100%">
              <div slot="header">
                <span style="float:left;font-weight: bold;color: #616161">{{item.seminarName}}</span>
                <i v-if="(course.seminarMainCourseId!==0)&&(course.courseId !== course.seminarMainCourseId)"></i>
                <i class="el-icon-edit el-icon0" style="float: right" v-else
                   @click="updateSeminarInfo(index0)"></i>
              </div>
              <div style="width: 100%" v-for="(class1,index1) in classInfo" :key="index1">
                <div class="div0" @click="checkClassSeminar(class1.id,item.id,items.roundSerial)">
                  <i class="iconfont icon-xinxi"></i>{{class1.grade}}-{{class1.klassSerial}}
                </div>
              </div>
            </el-card>
          </div>

        </el-collapse-item>
      </el-collapse>
      <div style="width: 100%"
           v-if="(course.seminarMainCourseId!==0)&&(course.courseId !== course.seminarMainCourseId)"></div>
      <div style="width: 100%" v-else>
        <el-button class="btn" type="success" plain @click="NewSeminar(course.courseId,roundInfo)"
                   style="margin-top: 10px"><i class="el-icon-plus" style="font-weight: bolder"></i>&nbsp;&nbsp;新建讨论课
        </el-button>
      </div>

    </div>
  </div>
</template>

<script>
  export default {
    name: "temp",
    data() {
      return {
        course: [],
        classInfo: [],
        seminars: [],
        roundInfo: [],
        currentClassInfo: {},
        teamMainCourseId: '',
        seminarMainCourseId: ''

      }
    },
    created() {
      this.course = this.$route.params.course;
      console.log(this.course);
      let that = this;
      that.$axios({
        method: 'GET',
        url: '/course/' + that.course.courseId + '/round',
        headers: {
          'Authorization': window.localStorage['token']
        }
      })
        .then(res => {
          if (res.status === 200) {
            window.localStorage['token'] = res.headers.authorization;
            let data = res.data;
            that.roundInfo = data;
            console.log("轮次" + that.roundInfo[0].id);

          } else if (res.status === 400) {
            that.$message({
              message: '错误的ID格式',
              type: 'error'
            })
          } else if (res.status === 404) {
            that.$message({
              message: '未找到轮次',
              type: 'error'
            })
          }
        }).catch(e => {
        console.log(e);
      });
      that.$axios({
        method: 'GET',
        url: '/course/' + that.course.courseId + '/class',
        headers: {
          'Authorization': window.localStorage['token']
        }
      })
        .then(res => {
          if (res.status === 200) {
            window.localStorage['token'] = res.headers.authorization;
            let data = res.data;
            that.classInfo = data;
            //console.log(that.classInfo[0]);
          } else if (res.status === 400) {
            that.$message({
              message: '错误的ID格式',
              type: 'error'
            })
          } else if (res.status === 404) {
            that.$message({
              message: '未找到班级',
              type: 'error'
            })
          }
        }).catch(e => {
        console.log(e);
      });

    },
    methods: {
      Back() {
        this.$router.go(-1);
      },
      setRound(roundId) {
        this.$router.push({
          path: '/teacher/SetRound',
          name: 'SetRound',
          params: {
            roundId: roundId,
            course: this.course
          }
        })
      },
      NewSeminar(courseId, roundInfo) {
        this.$router.push({
          path: '/teacher/NewSeminar',
          name: 'NewSeminar',
          params: {
            courseId: courseId,
            roundInfo: roundInfo,
            course: this.course
          }
        })
      },
      updateSeminarInfo(index0) {
        var seminarId = this.seminars[index0].id;
        var roundInfo = this.roundInfo;
        this.$router.push({
          path: '/teacher/UpdateSeminarInfo',
          name: 'UpdateSeminarInfo',
          params: {
            seminarId: seminarId,
            roundInfo: roundInfo,
            course: this.course
          }
        })
      },
      checkClassSeminar(classId, seminarId, roundId) {
        //console.log("classId" + classId);
        //console.log("seminarId" + seminarId);
        this.$router.push({
          path: '/teacher/BeforeSeminar',
          name: 'beforeSeminar',
          params: {
            classId: classId,
            seminarId: seminarId,
            roundId: roundId,
            course: this.course
          }
        })

      },
      gotoTotalSeminar() {
        this.$router.push({path: '/teacher/TotalSeminar'});
      },
      gotoHomePage() {
        this.$router.push({path: '/teacher/HomePage'});
      },
      chooseRound(index) {
        let roundId = this.roundInfo[index].id;
        let that = this;
        that.$axios({
          method: 'GET',
          url: '/round/' + roundId + '/seminar',
          headers: {
            'Authorization': window.localStorage['token']
          }
        })
          .then(res => {
            if (res.status === 200) {
              window.localStorage['token'] = res.headers.authorization;
              let data_ = res.data;
              that.seminars = data_;
              console.log("讨论课：" + res.data[0].id);
            } else if (res.status === 400) {
              that.$message({
                message: '错误的ID格式',
                type: 'error'
              })
            } else if (res.status === 404) {
              that.$message({
                message: '未找到讨论课',
                type: 'error'
              })
            }
          }).catch(e => {
          console.log(e);
        });
      },

    },
  }
</script>

<style scoped>
  .div0 {
    width: 100%;
    height: 45px;
    border-radius: 5px;
    background-color: rgba(102, 204, 204, 0.2);
  }
</style>
