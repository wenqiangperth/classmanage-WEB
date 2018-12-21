<template>
  <div>
    <div id="head" class="head">
      <div class="title"><i class="el-icon-back icon0 icon1" @click="returnHomePage"></i><span>我的课程</span>
        <el-dropdown class="plus" trigger="click">
          <i class="el-icon-plus icon0 icon1"></i>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item><i class="el-icon-bell" @click="gotoHomePage">&nbsp;&nbsp;个人页</i></el-dropdown-item>
            <el-dropdown-item><i class="el-icon-service" @click="gotoSeminar">&nbsp;&nbsp;讨论课</i></el-dropdown-item>
            <el-dropdown-item><i class="el-icon-back" @click="returnLogin">&nbsp;&nbsp;退 出</i></el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </div>
    </div>
    <div class="empty"></div>
    <div class="main">
      <div class="new_course" @click="NewCourse">
        <i class="el-icon-plus icon2" style="font-weight: bolder;color: #66cccc"><span
          style="color: dimgrey">新建课程</span></i>
      </div>
      <el-collapse accordion
                   background-color="#66CCCC">
        <el-collapse-item v-for="(items,index) in courses"
                          :key="index"
        >
          <template slot="title">
            <div style="font-weight: bold">
              &nbsp;&nbsp;<i class="iconfont icon-kecheng"></i>&nbsp;&nbsp;{{items.name}}
            </div>
          </template>
          <div style="width: 100%">
            <div>
              <el-button class="btn_info" type="info" plain @click="viewGrades"><i class="iconfont icon-chengjiguanli"></i>&nbsp;&nbsp;{{items.item[0]}}
              </el-button>
            </div>
            <div>
              <el-button class="btn_info" type="info" plain @click="viewGroups"><i class="iconfont icon-zudui"></i>&nbsp;&nbsp;{{items.item[1]}}
              </el-button>
            </div>
            <div>
              <el-button class="btn_info" type="info" plain @click="viewCourseInfo"><i class="iconfont icon-xinxi1"></i>&nbsp;&nbsp;{{items.item[2]}}
              </el-button>
            </div>
            <div>
              <el-button class="btn_info" type="info" plain @click="viewClassInfo"><i class="iconfont icon-xinxi"></i>&nbsp;&nbsp;{{items.item[3]}}
              </el-button>
            </div>
            <div>
              <el-button class="btn_info" type="info" plain @click="gotoSeminar"><i class="iconfont icon-guanlianguize"></i>&nbsp;&nbsp;{{items.item[4]}}
              </el-button>
            </div>
            <div>
              <el-button class="btn_info" type="info" plain @click="setShare"><i class="el-icon-share el-icon0"></i>&nbsp;&nbsp;{{items.item[5]}}
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
        courses: [
          {
            name: 'OOAD',
            item: [
              '学生成绩',
              '学生组队',
              '课程信息',
              '班级信息',
              '讨论课设置',
              '共享设置'
            ]
          },
          {
            name: 'J2EE',
            item: [
              '学生成绩',
              '学生组队',
              '课程信息',
              '班级信息',
              '讨论课设置',
              '共享设置'
            ]
          }

        ]
      }
    },
    methods: {
      returnLogin() {
        this.$router.push({path: '/'});
      },
      returnHomePage() {
        this.$router.push({path: '/teacher/HomePage'});
      },
      gotoHomePage(){
        this.$router.push({path:'/teacher/HomePage'});
      },
      NewCourse() {
        this.$router.push({path: '/teacher/NewCourse'});
      },
      viewGrades() {
        this.$router.push({path: '/teacher/StudentGrades'});
      },
      viewGroups() {
        this.$router.push({path: '/teacher/StudentGroups'});
      },
      viewCourseInfo() {
        this.$router.push({path: '/teacher/CourseInfo'});
      },
      viewClassInfo() {
        this.$router.push({path: '/teacher/ClassInfo'});
      },
      gotoSeminar() {
        this.$router.push({path: '/teacher/SeminarPage'});
      },
      setShare() {
        this.$router.push({path: '/teacher/SharePage'});
      }

    }
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
