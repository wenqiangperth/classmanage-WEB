<template>
  <div class="body0">
    <div id="head" class="head">
      <div class="title"><i class="el-icon-back icon1 icon0" @click="returnSharePage"></i>新增共享
      </div>
    </div>
    <div class="main">
      <div style="width: 100%;height:40px"></div>
      <el-card>
        <table>
          <tr>
            <td style="width: 30%;color:#66cccc">共享类型:</td>
            <td>
              <el-select v-model="value1" placeholder="请选择">
                <el-option
                  v-for="item in options1"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                </el-option>
              </el-select>
            </td>
          </tr>
          <tr>
            <td style="width: 30%;color:#66cccc">共享对象:</td>
            <td>
              <el-select id="select" v-model="value4" placeholder="请选择">
                <el-option
                  v-for="item in options4"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                </el-option>
              </el-select>
            </td>
          </tr>

        </table>
        <!--<el-button type="info" size="small" style="float: right;margin-top:10px;margin-bottom: 15px">新增对象</el-button>-->
      </el-card>
      <!--
      <el-card class="pause" id="pause">
        <i class="el-icon-info icon0" style="color:#99CC00;font-size: 25px"></i>
        <br><br>
        <br>确认发送共享请求
        <br><br><br>
        <el-button type="text" style="float: right;color: #99CC00" @click="sendSuccess">
          SURE
        </el-button>
        <el-button type="text" style="float:right;margin-right: 5px;color:#99CC00" @click="cancelShare">CANCEL</el-button>
      </el-card>-->
      <el-button class="btn" type="success" plain style="margin-top: 20px" @click="successShare(value1,value4)"> 确认共享
      </el-button>
    </div>
  </div>
</template>

<script>
  import {MessageBox} from "mint-ui";
  export default {
    name: "SharePage",
    data() {
      return {
        courseId: 0,
        teamShare: {
          teamShareId: 1,
          receiveCourse: []
        },
        seminarShare: {
          seminarShareId: 1,
          receiveCourse: [],
        },
        options1: [{
          value: '选项1',
          label: '共享分组',
        }, {
          value: '选项2',
          label: '共享讨论课',
        }],
        value1: '',
        options2: [{
          value: '选项1',
          label: '4444**老师',
        }, {
          value: '选项2',
          label: '3333**老师',
        }],
        value2: '',
        options3: [{
          value: '选项1',
          label: '软件工程**老师',
        }, {
          value: '选项2',
          label: 'OOAD**老师',
        }],
        value3: '',
        options4: [],
        value4: ''
      }
    },
    created() {
      this.getParams();
      let that = this;
      that.$axios({
        method: 'GET',
        url: '/course/' + that.$data.courseId + '/teamshare'
      })
        .then(res => {
          if (res.data.status === 200) {
            console.log(res.data.data);
            let data = res.data.data;
            this.teamShare.teamShareId = data.teamShareId;
            this.teamShare.receiveCourse = data.receiveCourse;
            for (let i = 0; i < data.receiveCourse.length; i++) {
              this.options2.push({
                value: data.receiveCourse.receiveCourseId,
                label: data.receiveCourseName + '--' + data.receiveCourse.teacherName
              })
            }
          }
        })
        .catch(e => {
          console.log(e);
        });
      let that_ = this;
      that_.$axios({
        method: 'GET',
        url: '/course/' + that.$data.courseId + '/seminarshare'
      })
        .then(res => {
          if (res.data.status === 200) {
            console.log(res.data.data);
            let data = res.data.data;
            this.seminarShare.seminarShareId = data.seminarShareId;
            this.seminarShare.receiveCourse = data.receiveCourse;
            /*
              this.seminarShare.receiveCourse.push(
                {receiveCourseId:data.receiveCourse.receiveCourseId,
                  receiveCourseName:data.receiveCourse.receiveCourseName,
                  teacherName:data.receiveCourse.teacherName}
              );*/
            for (let i = 0; i < data.receiveCourse.length; i++) {
              this.options3.push({
                value: data.receiveCourse.receiveCourseId,
                label: data.receiveCourseName + '--' + data.receiveCourse.teacherName
              })
            }
          }
        })
        .catch(e => {
          console.log(e);
        })
    },

    methods: {
      getParams() {
        var routerParams = this.$route.params.courseId;
        this.courseId = routerParams;
      },
      returnSharePage() {
        this.$router.push({path: '/teacher/SharePage'});
      },
      successShare(shareType, subCourseId) {
        MessageBox.confirm('确认发送共享分组请求?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'info'
        }).then(() => {
          if (shareType === '选项1') {
            this.$axios({
              method: 'POST',
              url: '/course/' + this.$data.courseId + '/teamsharerequest',
              params: {
                subCourseId: subCourseId
              }
            })
              .then(res => {
                if (res.data.status === 201) {
                  this.$message({
                    type: 'success',
                    message: '发送成功！'
                  })
                } else if (res.data.status === 403) {
                  this.$message({
                    type: 'warning',
                    message: '用户权限不足！'
                  })
                } else if (res.data.status === 404) {
                  this.$message({
                    type: 'error',
                    message: '未找到主课程'
                  })
                }
              })
              .catch(e => {
                console.log(e);
              })
          } else if (shareType === '选项2') {
            this.$axios({
              method: 'POST',
              url: '/course/' + this.$data.courseId + '/seminarsharerequest',
              params: {
                subCourseId: subCourseId
              }
            })
              .then(res => {
                if (res.data.status === 201) {
                  this.$message({
                    type: 'success',
                    message: '发送成功！'
                  })
                } else if (res.data.status === 403) {
                  this.$message({
                    type: 'warning',
                    message: '用户权限不足！'
                  })
                } else if (res.data.status === 404) {
                  this.$message({
                    type: 'error',
                    message: '未找到主课程'
                  })
                }
              })
              .catch(e => {
                console.log(e);
              })
          }
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消'
          });
        });
      },
      /*cancelShare() {
        var share = document.getElementById("pause");
        share.style.display = "none";
      },
      sendSuccess() {
        this.$notify.success({
          title: 'Info',
          message: '共享请求发送成功',
          showClose: false
        });
        var share = document.getElementById("pause");
        share.style.display = "none";
        this.$router.push({path: '/teacher/SharePage'});
      }*/
    },
    watch: {
      'route': 'getParams',
      value1: function () {
        if (this.value1 === '选项1') {
          //this.options4.splice(0,this.options4.length);
          this.options4 = this.options2;
          /*for(let i=0;i<this.options2.length;i++){
            this.options4.push({value:this.options2[i].value,label:this.options2[i].label});
          }*/
        } else if (this.value1 === '选项2') {
          //this.options4.splice(0,this.options4.length);
          this.options4 = this.options3;
          /*for(let i=0;i<this.options3.length;i++){
            this.options4.push({value:this.options3[i].value,label:this.options3[i].label});
          }*/
        }
      }
    },
  }
</script>

<style scoped>

</style>
<style>


</style>

