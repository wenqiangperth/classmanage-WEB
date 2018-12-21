<template>
  <div>
    <div id="head" class="head">
      <div class="title"><i class="el-icon-back icon1 icon0" @click="returnCourseManage"></i>班级信息
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
      <div class="new_course" @click="addClass" style="width: 100%;height: 50px">
        <i class="el-icon-plus icon2" style="font-weight: bolder;color: #66cccc"><span
          style="color: dimgrey">新建班级</span></i>
      </div>
      <div style="width: 100%"
           v-for="(item,index) in classInfo"
           :key="index">
        <el-card>
          <div slot="header">
            <span style="font-weight: bold">{{item.classId}}</span>
          </div>
          <table style="width: 100%;font-weight: bold;color: dimgrey">
            <tr>
              <td style="width: 35%">讨论课时间:</td>
              <td>{{item.time}}</td>
            </tr>
            <tr>
              <td style="width: 35%">讨论课地点:</td>
              <td>{{item.address}}</td>
            </tr>
            <tr>
              <td style="width: 35%">学生名单:</td>
              <td>{{item.nameList.name}}</td>
            </tr>
            <tr>
              <td style="width: 35%"></td>
              <td>
                <el-upload
                  class="upload-demo"
                  action="https://jsonplaceholder.typicode.com/posts/"
                  multiple
                  :limit="3"
                  :on-exceed="handleExceed">
                  <el-button size="mini" type="info" plain>点击上传</el-button>
                  <div slot="tip" class="el-upload__tip" style="float:right">未选择任何文件</div>
                </el-upload>
              </td>
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
                <el-button type="info" size="small" style="width: 40%" @click="DeleteClass">删除</el-button>
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
        classInfo: [
          {
            classId: '2016--1',
            time: '周三7，8节',
            address: '海韵教学楼',
            nameList:
              {
                name: 'student.xlsx',
                url: 'E:/name.xlsx'
              }
          },
          {
            classId: '2016--2',
            time: '周三7，8节',
            address: '海韵教学楼',
            nameList:
              {
                name: 'student.xlsx',
                url: 'E:/name.xlsx'
              }
          },
          {
            classId: '2016--3',
            time: '周三7，8节',
            address: '海韵教学楼',
            nameList:
              {
                name: '当前无名单',
                url: 'E:/name.xlsx'
              }
          }
        ]
      }
    },
    methods: {
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
      addClass() {
        this.$router.push({path: '/teacher/NewClass'});
      },
      Submit() {
        this.$message({
          message: '提交成功！',
          type: 'success'
        });

      },
      DeleteClass() {
        MessageBox.confirm('此操作将永久删除该班级?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.$message({
            type: 'success',
            message: '删除成功!'
          });
          this.$router.push({path: '/teacher/CourseManage'});
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });
        });
      }
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
