<template>
  <div>
    <div id="head" class="head">
      <div class="title"><i class="el-icon-back icon1 icon0" @click="Back"></i>{{courseName}}
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
                          :key="index"
        >
          <template slot="title">
            <div style="font-weight: bold">
              &nbsp;&nbsp;<i class="el-icon-service el-icon0"></i>&nbsp;&nbsp;第{{items.roundSerial}}轮
            </div>
          </template>
          <div style="width: 100%">
            <el-button class="btn" type="info" plain @click="setRound(items.id)">该轮轮次设置</el-button>
          </div>
          <div style="width:100%" v-for="(item,index0) in items.seminars" :key="index0">
            <el-card style="width:100%">
              <div slot="header">
                <span style="float:left;font-weight: bold;color: #616161">{{item.topic}}</span>
                <i class="el-icon-edit el-icon0" style="float: right" v-if="true"
                   @click="updateSeminarInfo(item.seminarId,roundInfo)"></i>
                <i v-else-if="false"></i><!--接口后换isMaster -->
              </div>
              <div style="width: 100%" v-for="(class1,index1) in classInfo" :key="index1">
                <div class="div0" @click="checkClassSeminar(class1.classId,item.seminarId,items.roundSerial)">
                  <i class="iconfont icon-xinxi"></i>{{class1.grade}}-{{class1.classSerial}}
                </div>
              </div>
            </el-card>
          </div>

        </el-collapse-item>
      </el-collapse>
      <div style="width: 100%" v-if="true"><!-- 接口后换成isMaster-->
        <el-button class="btn" type="success" plain @click="NewSeminar(courseId,roundInfo)"
                   style="margin-top: 10px"><i class="el-icon-plus" style="font-weight: bolder"></i>&nbsp;&nbsp;新建讨论课
        </el-button>
      </div>
      <div style="width: 100%" v-else-if="!isMaster"></div>

    </div>
  </div>
</template>

<script>
  export default {
    name: "temp",
    data() {
      return {
        courseId: 1,
        courseName: 'OOAD',
        isMaster: true,
        classInfo: [
          {classId: 1, grade: 2016, classSerial: 1},
          {classId: 2, grade: 2016, classSerial: 1},
          {classId: 3, grade: 2016, classSerial: 1},
        ],
        roundInfo: [{
          id: 1,
          roundSerial: 1,
          seminars: [
            {seminarId: 1, topic: '业务流程分析', order: 2},
            {seminarId: 2, topic: '邻域模型分析', order: 1},
          ],
        },
          {
            id: 2,
            roundSerial: 2,
            seminars: [
              {seminarId: 1, topic: '业务流程分析', order: 2},
              {seminarId: 2, topic: '邻域模型分析', order: 1},
            ],
          }],
        currentClassInfo: {},

      }
    },
    created() {
      this.getParams();
      let that = this;
      that.$axios({
        method: 'GET',
        url: '/course/' + that.$data.courseId + '/round'
      })
        .then(res => {
          if (res.data.status === 200) {
            let data = res.data.data;
            console.log(data);
            that.roundInfo = [];
            for (let i = 0; i < data.size; i++) {
              that.roundInfo[i].id = data[i].id;
              that.roundInfo[i].roundSerial = data[i].roundSerial;
            }

          } else if (res.data.status === 400) {
            that.$message({
              message: '错误的ID格式',
              type: 'error'
            })
          } else if (res.data.status === 404) {
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
        url: '/course/' + that.$data.courseId + '/class'
      })
        .then(res => {
          if (res.data.status === 200) {
            let data = res.data.data;
            console.log(data);
            that.classInfo = [];
            for (let i = 0; i < data.size; i++) {
              that.classInfo.push({
                classId: data[i].id,
                grade: data[i].grade,
                classSerial: data[i].classSerial
              });
            }
          } else if (res.data.status === 400) {
            that.$message({
              message: '错误的ID格式',
              type: 'error'
            })
          } else if (res.data.status === 404) {
            that.$message({
              message: '未找到班级',
              type: 'error'
            })
          }
        }).catch(e => {
        console.log(e);
      });
      for (let i = 0; i < that.roundInfo.size; i++) {
        that.$axios({
          method: 'GET',
          url: '/course/' + that.data.roundInfo[i].id + '/seminar'
        })
          .then(res => {
            if (res.data.status === 200) {
              let data_ = res.data.data;
              console.log(data_);
              that.roundInfo[i].seminars = [];
              that.roundInfo[i].seminars = data_;
            } else if (res.data.status === 400) {
              that.$message({
                message: '错误的ID格式',
                type: 'error'
              })
            } else if (res.data.status === 404) {
              that.$message({
                message: '未找到讨论课',
                type: 'error'
              })
            }
          }).catch(e => {
          console.log(e);
        });
      }
    },
    methods: {
      getParams() {
        this.courseId = this.$route.params.courseId;
        this.courseName = this.$route.params.courseName;
        this.isMaster = this.$route.params.isMaster;
      },
      Back() {
        this.$router.go(-1);
      },
      setRound(roundId) {
        this.$router.push({
          path: '/teacher/SetRound',
          name: 'SetRound',
          params: {
            roundId: roundId
          }
        })
      },
      NewSeminar(courseId, roundInfo) {
        console.log("courseId" + courseId);
        console.log("roundInfo" + roundInfo);
        this.$router.push({
          path: '/teacher/NewSeminar',
          name: 'NewSeminar',
          params: {
            courseId: courseId,
            roundInfo: roundInfo
          }
        })
      },
      updateSeminarInfo(seminarId, roundInfo) {
        this.$router.push({
          path: '/teacher/UpdateSeminarInfo',
          name: 'UpdateSeminarInfo',
          params: {
            seminarId: seminarId,
            roundInfo: roundInfo
          }
        })
      },
      checkClassSeminar(classId, seminarId, roundId) {
        console.log("classId" + classId);
        console.log("seminarId" + seminarId);
        this.$router.push({
          path: '/teacher/BeforeSeminar',
          name: 'beforeSeminar',
          params: {
            classId: classId,
            seminarId: seminarId,
            roundId: roundId
          }
        })

      },
      gotoTotalSeminar() {
        this.$router.push({path: '/teacher/TotalSeminar'});
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
  .div0 {
    width: 100%;
    height: 45px;
    border-radius: 5px;
    background-color: rgba(102, 204, 204, 0.2);
  }
</style>
