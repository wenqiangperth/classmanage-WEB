<template>
  <div class="body0">
    <div id="head" class="head">
      <div class="title"><i class="el-icon-close icon1 icon0" @click="returnClassInfo"></i>新建班级</div>
    </div>
    <div class="main">
      <el-card style="width: 100%">
        <div slot="header">
          <table style="width: 100%">
            <tr style="width: 100%">
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
          <tr style="width: 100%">
            <td style="width: 35%">上课时间:</td>
            <td>
              <el-input v-model="classInfo.classTime" placeholder="周三1,2节"></el-input>
            </td>
          </tr>
          <tr style="width: 100%">
            <td style="width: 35%">上课地点:</td>
            <td>
              <el-input v-model="classInfo.classLocation" placeholder="海韵教学楼101"></el-input>
            </td>
          </tr>
          <tr style="height: 50px;width: 100%">
            <td style="width: 35%">学生名单:</td>
            <td>
              <el-upload
                class="upload-demo"
                :http-request="upload"
                action="https://jsonplaceholder.typicode.com/posts/"
                :on-preview="handlePreview"
                :on-remove="handleRemove"
                :limit="3"
                multiple
                :on-exceed="handleExceed"
                :file-list="fileList">
                <el-button size="mini" type="info">上传学生名单</el-button>
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
        courseName: '',
        classInfo: {},
        fileList: []
      }
    },
    created() {
      this.getParams();
    },
    methods: {
      getParams() {
        this.courseId = this.$route.params.courseId;
        this.courseName = this.$route.params.courseName;
      },
      returnClassInfo() {
        this.$router.push({
          path: '/teacher/ClassInfo',
          name: 'ClassInfo',
          query: {
            courseId: this.courseId,
            courseName: this.courseName
          }

        });
      },
      handleRemove(file, fileList) {
        console.log(file, fileList);
      },
      handlePreview(file) {
        console.log(file);
      },
      handleExceed(files, fileList) {
        this.$message.warning(`当前限制选择 3 个文件，本次选择了 ${files.length} 个文件，共选择了 ${files.length + fileList.length} 个文件`);
      },
      upload(file) {
        console.log("file");
        console.log(file);
        let formData = new FormData();
        let config = {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        };
        formData.append('file' + file.file);
        this.$axios({
          method: 'PUT',
        })
      },
      NewSuccess() {
        this.$axios({
          method: 'POST',
          url: '/class',
          data: {
            courseId: this.courseId,
            grade: this.classInfo.grade,
            klassSerial: this.classInfo.classSerial,
            klassTime: this.classInfo.classTime,
            klassLocation: this.classInfo.classLocation
          },
          headers: {
            'Authorization': window.localStorage['token']
          }
        })
          .then(res => {
            if (res.status === 200) {
              window.localStorage['token'] = res.headers.authorization;
              this.$message({
                message: '新建成功！',
                type: 'success'
              });
              this.$router.push({
                path: '/teacher/ClassInfo',
                name: 'ClassInfo',
                query: {
                  courseId: this.courseId,
                  courseName: this.courseName
                }

              });
            } else if (res.status === 403) {
              this.$message({
                message: '用户权限不足！',
                type: 'error'
              });
            } else if (res.status === 404) {
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
