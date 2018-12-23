<template>
  <div class="body0">
    <div id="head" class="head">
      <div class="title"><i class="el-icon-close icon1 icon0" @click="returnClassInfo"></i>新建班级</div>
    </div>
    <div class="main">
      <el-card>
        <div slot="header">
          <table style="width: 100%">
            <tr>
              <td style="width: 35%"><span>班级名:</span></td>
              <td style="width: 35%">
                <el-input v-model="classInfo.grade" placeholder="年级"></el-input>
              </td>
              <td>
                <el-input v-model="classInfo.classSerial" placeholder="班级"></el-input>
              </td>
            </tr>
          </table>
        </div>
        <table style="width: 100%">
          <tr>
            <td style="width: 35%">上课时间:</td>
            <td>
              <el-input v-model="classInfo.classTime" placeholder="周三1,2节"></el-input>
            </td>
          </tr>
          <tr>
            <td style="width: 35%">上课地点:</td>
            <td>
              <el-input v-model="classInfo.classLocation" placeholder="海韵教学楼101"></el-input>
            </td>
          </tr>
          <tr style="height: 50px">
            <td style="width: 35%">学生名单:</td>
            <td>
              <el-upload
                class="upload-demo"
                action="https://jsonplaceholder.typicode.com/posts/"
                multiple>
                <el-button size="mini" type="info">选择文件</el-button>
                <div slot="tip" class="el-upload__tip" style="float:right;">未选择任何文件</div>
              </el-upload>
            </td>
          </tr>
        </table>
      </el-card>
      <div style="width: 100%;margin-top: 180px">
        <el-button class="btn" type="success" plain @click="NewSuccess">保存</el-button>
      </div>

    </div>
  </div>
</template>

<script>
  export default {
    name: "NewClass",
    data() {
      return {
        courseId: 1,
        classInfo: {
          classId: '',
          grade: '',
          classSerial: '',
          classTime: '',
          classLocation: '',
          nameList:
            {
              name: 'student.xlsx',
              url: 'E:/name.xlsx'
            }
        }
      }
    },
    created() {
      this.getParams();
    },
    methods: {
      getParams() {
        this.courseId = this.$route.params.courseId;
      },
      returnClassInfo() {
        this.$router.push({path: '/teacher/ClassInfo'});
      },
      NewSuccess() {
        this.$axios({
          method: 'POST',
          url: '/course/' + this.$data.courseId + '/class',
          data: {
            grade: this.classInfo.grade,
            classSerial: this.classInfo.classSerial,
            classTime: this.classInfo.classTime,
            classLocation: this.classInfo.classLocation
          }
        })
          .then(res => {
            if (res.data.status === 201) {
              this.$message({
                message: '新建成功！',
                type: 'success'
              });
              this.$router.push({path: '/teacher/ClassInfo'});
            } else if (res.data.status === 403) {
              this.$message({
                message: '用户权限不足！',
                type: 'error'
              });
            } else if (res.data.status === 404) {
              this.$message({
                message: '未找到课程！',
                type: 'error'
              });
            }
          })
          .catch(e => {
            console.log(e);
          });
      }
    },
    watch: {
      '$route': 'getParams'
    }
  }
</script>

<style scoped>

</style>
