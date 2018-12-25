<template>
  <div class="body0">
    <div id="head" class="head">
      <div class="title"><i class="el-icon-back icon1 icon0" @click="returnCourseManage"></i>共享设置
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
      <el-card class="pause" id="pause">
        <i class="el-icon-warning icon0" style="color:red;font-size: 25px"></i>
        <br><br>
        <br>是否取消本次共享
        <br><br><br>
        <el-button type="text" style="float: right;color: #99CC00" @click="successCancel">
          SURE
        </el-button>
        <el-button type="text" style="float:right;margin-right: 5px;color:#99CC00" @click="cancel">CANCEL</el-button>
      </el-card>
      <div style="width: 100%;height:60px">
        <el-button type="success" size="small" plain style="float: right;margin-top: 20px" @click="addShare(courseId)">
          <i
          class="el-icon-plus" style="font-weight: bolder"></i> 新增共享
        </el-button>
      </div>
      <el-collapse accordion v-for="(item,index) in sharesTeam"
                   :key="index">
        <el-collapse-item>
          <template slot="title">
            <i class="el-icon-share el-icon0" style="float: left;margin-left: 20px;"></i>{{item.courseName}}({{item.teacher}})
          </template>
          <el-card>
            <table>
              <tr>
                <td style="width: 30%;color:#66cccc">共享类型:</td>
                <td>{{item.shareType}}</td>
              </tr>
              <tr>
                <td style="width: 30%;color:#66cccc">共享情况:</td>
                <td>{{item.courseType}}</td>
              </tr>
            </table>
            <el-button type="info" size="small" style="float: right;margin-bottom: 5px" @click="cancelShare">
              取消共享
            </el-button>
          </el-card>
        </el-collapse-item>

      </el-collapse>
    </div>
  </div>
</template>

<script>
  export default {
    name: "SharePage",
    data() {
      return {
        courseId: 1,
        sharesTeam: [
          {
            teamSharedId: '',
            masterCourse: {
              masterCourseId: '',
              masterCourseName: '',
              teacherName: ''
            },
            receiveCourse: [{
              receiveCourseId: '',
              receiveCourseName: '',
              teacherName: ''
            }]
          }
        ],
        shareSeminar: [
          {
            seminarSharedId: '',
            masterCourse: {
              masterCourseId: '',
              masterCourseName: '',
              teacherName: ''
            },
            receiveCourse: [{
              receiveCourseId: '',
              receiveCourseName: '',
              teacherName: ''
            }]
          }
        ]
      }
    },
    created() {
      this.getParams();
      this.$axios({
        method: 'GET',
        url: '/course/' + this.$data.courseId + '/share',
        headers: {
          'Authorization': window.localStorage['token']
        }
      })
        .then(res => {
          if (res.status === 200) {

          }
        })
    },
    methods: {
      getParams() {
        var routerParams = this.$route.params.courseId;
        this.courseId = routerParams;
        console.log(this.courseId);
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
      addShare(courseId) {
        this.$router.push({
          path: '/teacher/AddShare',
          name: 'AddShare',
          params: {
            courseId: courseId
          }
        });
      },
      cancelShare() {
        var share = document.getElementById("pause");
        share.style.display = "block";
      },
      cancel() {
        var share = document.getElementById("pause");
        share.style.display = "none";
      },
      gotoHomePage() {
        this.$router.push({path: '/teacher/HomePage'});
      },
      successCancel() {
        this.$notify.success({
          title: 'Info',
          message: '取消共享操作成功',
          showClose: false
        });
        var share = document.getElementById("pause");
        share.style.display = "none";
      }
    },
    watch: {
      '$route': 'getParams'
    }
  }
</script>

<style scoped>
  .pause {
    position: fixed;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    z-index: 999;
    margin: auto;
    width: 70%;
    height: 200px;
    text-align: center;
    font-size: 14px;
    display: none;
  }

</style>
<style>
  .el-collapse-item__arrow {
    font-weight: bolder;
  }

</style>

