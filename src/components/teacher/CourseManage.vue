<template>
  <div>
    <div id="head" class="head">
      <div class="title"><i class="el-icon-back icon1" @click="returnHomePage"></i><span>我的课程</span>
        <el-dropdown class="plus" trigger="click">
          <i class="el-icon-more icon1"></i>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item><i class="el-icon-bell"></i>&nbsp;&nbsp;个人页</el-dropdown-item>
            <el-dropdown-item>
              <div @click="gotoSeminar"><i class="el-icon-service"></i>&nbsp;&nbsp;讨论课</div>
            </el-dropdown-item>
            <el-dropdown-item>
              <div @click="returnLogin"><i class="el-icon-back"></i>&nbsp;&nbsp;退 出</div>
            </el-dropdown-item>
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
              <el-button class="btn" type="info" plain @click="viewGrades"><i class="iconfont icon-chengjiguanli"></i>&nbsp;&nbsp;{{items.item[0]}}
              </el-button>
            </div>
            <div>
              <el-button class="btn" type="info" plain @click="viewGroups"><i class="iconfont icon-zudui"></i>&nbsp;&nbsp;{{items.item[1]}}
              </el-button>
            </div>
            <div>
              <el-button class="btn" type="info" plain @click="viewCourseInfo"><i class="iconfont icon-xinxi1"></i>&nbsp;&nbsp;{{items.item[2]}}
              </el-button>
            </div>
            <div>
              <el-button class="btn" type="info" plain @click="viewClassInfo"><i class="iconfont icon-xinxi"></i>&nbsp;&nbsp;{{items.item[3]}}
              </el-button>
            </div>
            <div>
              <el-button class="btn" type="info" plain @click="gotoSeminar"><i class="iconfont icon-guanlianguize"></i>&nbsp;&nbsp;{{items.item[4]}}
              </el-button>
            </div>
            <div>
              <el-button class="btn" type="info" plain @click="setShare"><i class="el-icon-share"></i>&nbsp;&nbsp;{{items.item[5]}}
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
  .head {
    height: 70px;
    width: 100%;
    background-color: #CCFF99;
  }

  .title {
    display: block;
    text-align: center;
    line-height: 70px;
  }

  .plus {
    float: right;
    margin-right: 3%;
    line-height: 70px;
  }

  .icon1 {
    float: left;
    margin-left: 3%;
    line-height: 70px;
    font-weight: bolder;
  }

  .empty {
    width: 100%;
    height: 30px;
  }

  .main {
    width: 50%;
    margin: auto;
  }
  .new_course {
    width: 100%;
    height: 50px;
  }

  .icon2 {
    float: right;
  }

  .btn {
    width: 100%;
  }

  @media (max-width: 640px) {
    .main {
      width: 100%;
    }
  }
</style>
