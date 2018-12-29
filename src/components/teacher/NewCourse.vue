<template>
  <div class="body0">
    <div id="head" class="head">
      <div class="title"><i class="el-icon-close icon1 icon0" @click="returnCourseManage"></i>新建课程</div>
    </div>
    <div class="main" style="font-size: 13px">
      <el-card class="box-card">
        <table style="width: 100%">
          <tr>
            <td style="width: 28%;" class="font_style">课程名称</td>
            <td>
              <el-input v-model="course.courseName">
                <i slot="suffix" class="el-input__icon el-icon-edit icon0"></i>
              </el-input>
            </td>
          </tr>
          <tr>
            <td style="width: 28%;" class="font_style">课程要求</td>
            <td>
              <el-input class="textArea"
                        type="textarea"
                        :autosize="{ minRows: 2, maxRows: 6}"
                        v-model="course.introduction">
              </el-input>
            </td>
          </tr>
        </table>
      </el-card>
      <el-card class="box-card">
        <div slot="header">
          <span class="font_style">成绩计算规则</span>
        </div>
        <!--<table-->
          <!--v-for="(item,index) in course.tableData1"-->
          <!--:key="index"-->
          <!--style="width: 100%">-->
          <!--<tr class="tr0">-->
            <!--<td class="td0">{{item.make_up}}</td>-->
            <!--<td>-->
              <!--<el-input size="mini" v-model="item.percentage" style="width: 45px"></el-input><label>%</label>-->
            <!--</td>-->
          <!--</tr>-->
        <!--</table>-->
        <tr class="tr0">
          <td class="td0">展示占比：</td>
          <td>
            <el-input size="mini" v-model="course.presentationPercentage" style="width: 45px"></el-input><label>%</label>
          </td>
        </tr>
        <tr class="tr0">
          <td class="td0">提问占比：</td>
          <td>
            <el-input size="mini" v-model="course.questionPercentage" style="width: 45px"></el-input><label>%</label>
          </td>
        </tr>
        <tr class="tr0">
          <td class="td0">报告占比：</td>
          <td>
            <el-input size="mini" v-model="course.reportPercentage" style="width: 45px"></el-input><label>%</label>
          </td>
        </tr>
      </el-card>
      <el-card style="width: 100%">
        <table
          style="width:100%">
          <tr>
            <td style="width: 28%">组队开始:</td>
            <td style="text-align: right">
              <el-date-picker
                v-model="course.teamStartTime"
                type="datetime"
                placeholder="选择日期时间"
                style="width:100%">
              </el-date-picker>
            </td>
          </tr>
          <tr>
            <td style="width: 28%">组队截止:</td>
            <td style="text-align: right">
              <el-date-picker
                v-model="course.teamEndTime"
                type="datetime"
                placeholder="选择日期时间"
                style="width: 100%">
              </el-date-picker>
              </td>
            </tr>
          </table>
      </el-card>
      <el-card class="card">
        <div slot="header">
          <span class="title0">组队基本要求:</span>
        </div>
        <table style="width: 100%">
          <tr style="width: 100%;height:45px">
            <td style="width:40%">小组总人数:</td>
            <td style="width: 30%">
              <el-input v-model="minCount" placeholder="下限"></el-input>
            </td>
            <td>
              <el-input v-model="maxCount" placeholder="上限"></el-input>
            </td>
          </tr>
          <tr style="width: 100%;height:45px">
            <td style="width: 40%">组内选修课程人数:</td>
            <td></td>
            <td></td>
          </tr>
        </table>
        <table style="width: 100%" v-for="(role,index) in memberRole" :key="index">
          <tr style="width: 100%;height: 45px">
            <td style="width: 40%">
              <el-select v-model="role.name" placeholder="请选择">
                <el-option
                  v-for="item in data1"
                  :key="item.courseId"
                  :label="item.courseName+item.studentOrTeacherName"
                  :value="item.courseId">
                </el-option>
              </el-select>
            </td>
            <td style="width: 30%">
              <el-input v-model="role.minNum" placeholder="下限"></el-input>
            </td>
            <td>
              <el-input v-model="role.maxNum" placeholder="上限"></el-input>
            </td>
          </tr>
        </table>
        <el-button type="info" size="small" style="float: right;margin-top: 5px;margin-bottom: 5px" @click="addObject">
          新增
        </el-button>
        <table style="width: 100%">
          <tr style="width: 100%;height:55px">
            <td style="width: 40%">选修课人数要求:</td>
            <td>
              <el-select v-model="requires1" placeholder="请选择">
                <el-option
                  v-for="(item0,index) in numRequires"
                  :key="index"
                  :label="item0.require"
                  :value="item0.flag">
                </el-option>
              </el-select>
            </td>
          </tr>
        </table>
        <div style="width: 100%;font-size: 13px;text-align: left">
          <span style="font-weight: bold;color: red">提示:</span><label>均满足指选课人数均需达到要求，满足其一指任意选课人数满足即可(多指冲突课程)</label>
        </div>
      </el-card>
      <el-card class="card">
        <div slot="header">
          <span class="title0">冲突课程:</span>
        </div>
        <!--<table style="width: 100%" v-for="(items,index) in conflictCourse" :key="index">-->
          <!--<tr style="width: 100%;height: 45px">-->
            <!--<td style="width: 60%">-->
              <!--<el-select v-model="items.courseId" placeholder="请选择">-->
                <!--<el-option-->
                  <!--v-for="item in courses"-->
                  <!--:key="item.courseId"-->
                  <!--:label="item.courseName+item.teacherName"-->
                  <!--:value="item.courseId">-->
                <!--</el-option>-->
              <!--</el-select>-->
            <!--</td>-->
            <!--<td style="width: 30%"></td>-->
            <!--<td></td>-->
          <!--</tr>-->
        <!--</table>-->
        <table style="width: 100%" v-for="(role,index) in memberRole" :key="index">
          <tr style="width: 100%;height: 45px">
            <td style="width: 40%">
              <el-select v-model="role.name" placeholder="请选择">
                <el-option
                  v-for="item in data1"
                  :key="item.courseId"
                  :label="item.courseName+item.studentOrTeacherName"
                  :value="item.courseId">
                </el-option>
              </el-select>
            </td>
          </tr>
        </table>
        <div style="width: 100%;height:70px">
          <el-button type="info" size="small" style="float: right;margin-top: 5px;margin-bottom: 5px"
                     @click="addObject1">
            新增
          </el-button>
        </div>
        <div style="width: 100%;font-size: 13px;text-align: left;">
          <span style="font-weight: bold;color: red">提示:</span><label>选修不同冲突课程的学生不可同组，注意同课程名不同教师为不同课程</label>
        </div>
      </el-card>
      <div style="width: 100%;margin-top: 20px">
        <el-button class="btn" type="success" plain @click="NewSuccess">发布</el-button>
      </div>

    </div>
  </div>
</template>

<script>
  export default {
    name: "NewCourse",
    data() {
      return {
        course: {
          courseName: '',
          introduction: '',
          presentationPercentage:'',
          questionPercentage:'',
          reportPercentage:'',
          teamStartTime: '',
          teamEndTime: '',
        },
        minCount: '',
        maxCount: '',
        courses: [
          {courseId: 1, courseName: 'J2EE', teacherName: '邱明'},
          {courseId: 2, courseName: 'J2EE', teacherName: '邱明'}
        ],
        memberRole: [
          {
            courseId: 1,
            name: '',
            minNum: '',
            maxNum: ''
          },
        ],
        numRequires: [
          {flag: 0, require: '均满足'},
          {flag: 1, require: '满足其一'}
        ],
        requires1: '',
        differConflicts: [],
        conflictCourse: [],
        data0: [],
        data1:[],
        minNum:'',
        maxNum:'',


      }
    },

    created(){
      let that=this;
      that.$axios({
        method:'GET',
        url:'/course/AllCourse',
        headers:{
          'Authorization':window.localStorage['token']
        }
      }).then(res=>{
        console.log(res);
        if(res.status===200){
          that.data1=res.data;
          this.conflictCourse=res.data;
        }
      })
    },
    methods: {
      returnCourseManage() {
        this.$router.push({path: '/teacher/CourseManage'});
      },
      NewSuccess() {
        this.$axios({
          method: 'POST',
          url: '/course',
          data: {
            // courseName: this.course.courseName,
            // introduction: this.course.introduction,
            // presentationPercentage: this.course.presentationPercentage,
            // questionPercentage: this.course.questionPercentage,
            // reportPercentage: this.reportPercentage,
            // teamStartTime: this.course.teamStartTime,
            // teamEndTime: this.course.teamEndTime
            course: this.course,
          },
          headers: {
            'Authorization': window.localStorage['token']
          }
        })
          .then(res => {
            console.log(res.data);
            if (res.status === 200) {
              window.localStorage['token'] = res.headers.authorization;
              this.$message({
                type: 'success',
                message: '创建成功'
              });
              this.$router.push({path: '/teacher/CourseManage'});
            } else if (res.status === 403) {
              this.$message({
                type: 'error',
                message: '用户权限不足'
              })
            }
          })
          .catch(e => {
            console.log(e);
          })
      },
      setTeamRequires() {
        this.$router.push({path: '/teacher/SetTeamRequires'});
      },
      addObject() {
        this.memberRole.push({});
      },
      addObject1() {
        this.conflictCourse.push({});
      }
    }
  }
</script>

<style scoped>

  .box-card {
    width: 100%;
  }

  .td0 {
    width: 50%;
    text-align: center;
    height:35px;
  }


</style>
