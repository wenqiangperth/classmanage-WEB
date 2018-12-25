<template>
  <div class="body0">
    <div class="head">
      <div class="title"><i class="el-icon-back icon1 icon0" @click="returnNewCourse"></i>组队要求
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
    <div class="main" style="font-size: 13px">
      <el-card class="card">
        <div slot="header">
          <span class="title0">组队基本要求:</span>
        </div>
        <table style="width: 100%">
          <tr style="width: 100%;height:45px">
            <td style="width:40%">小组总人数:</td>
            <td style="width: 30%">
              <el-input v-model="memberMin" placeholder="下限"></el-input>
            </td>
            <td>
              <el-input v-model="memberMax" placeholder="下限"></el-input>
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
                  v-for="item in courses"
                  :key="item.courseId"
                  :label="item.courseName+item.teacherName"
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
                  :value="index">
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
        <table style="width: 100%" v-for="(items,index) in conflictCourse" :key="index">
          <tr style="width: 100%;height: 45px">
            <td style="width: 60%">
              <el-select v-model="items.courseId" placeholder="请选择">
                <el-option
                  v-for="item in courses"
                  :key="item.courseId"
                  :label="item.courseName+item.teacherName"
                  :value="item.courseId">
                </el-option>
              </el-select>
            </td>
            <td style="width: 30%"></td>
            <td></td>
          </tr>
        </table>
        <el-button type="info" size="small" style="float: right;margin-top: 5px;margin-bottom: 5px" @click="addObject1">
          新增
        </el-button>
        <div style="width: 100%;font-size: 13px;text-align: left;margin-top: 15px">
          <span style="font-weight: bold;color: red">提示:</span><label>选修不同冲突课程的学生不可同组，注意同课程名不同教师为不同课程</label>
        </div>
      </el-card>
    </div>
  </div>
</template>

<script>
  export default {
    name: "SetTeamRequires",
    data() {
      return {
        memberMin: '',
        memberMax: '',
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
          {id: 1, require: '均满足'},
          {id: 2, require: '满足其一'}
        ],
        requires1: '',
        conflictCourse: [
          {
            courseId: 1,
            courseName: 'OOAD',
            teacherName: '邱明'
          }
        ]

      }
    },
    methods: {
      returnNewCourse() {
        this.$router.push({path: '/teacher/NewCourse'});
      },
      gotoHomePage() {
        this.$router.push({path: '/teacher/HomePage'});
      },
      gotoTotalSeminar() {
        this.$router.push({path: '/teacher/TotalSeminar'});
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
  .card {
    width: 100%;
  }

  .title0 {
    font-weight: bold;
    color: #616161;
    float: left;
  }
</style>
