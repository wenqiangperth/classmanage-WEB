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
    <div class="empty"></div>
    <div class="main">
      <el-tree
        node-key="id"
        :data="data"
        :props="defaultProps"
        accordion
        @node-click="handleNodeClick"
        style="width: 100%;font-weight: bold">
      </el-tree>


      <el-dialog
        title="选择要修改的讨论课"
        :visible.sync="dialogTableVisible"
        width="90%">
        <el-select v-model="option" placeholder="请选择"
                   style="margin-bottom: 60px">
          <el-option
            v-for="(item,index) in data"
            :key="index"
            :label="item.children.label"
          >
          </el-option>
        </el-select>
        <el-button type="info" size="small" plain @click="gotoUpdate">确定</el-button>

      </el-dialog>
      <div class="new">
        <div>
          <el-button class="btn" type="success" plain @click="NewSeminar(courseId,rounds)"
                     style="margin-top: 10px"><i class="el-icon-plus" style="font-weight: bolder"></i>&nbsp;&nbsp;新建讨论课
          </el-button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: "SeminarPage",
    data() {
      return {
        courseId: 1,
        courseName: '',
        rounds: [
          {id: 1, roundSerial: 1},
        ],
        classes: [
          {classId: 1, grade: 2016, classSerial: 1},
        ],
        roundsInfo: [
          {
            roundId: 1,
            topics: [
              {seminarId: 1, topic: '业务流程分析', order: 2},
              {seminarId: 2, topic: '邻域模型分析', order: 1},
            ]
          }
        ],
        dialogTableVisible: false,
        data: [{
          id: 1,
          label: '第1轮',
          children: [{
            id: 11,
            label: '该轮轮次设置',
          },
            {
              id: 12,
              label: '修改讨论课'
            },
            {
              id: 13,
              label: '业务流程分析',
              children: [{
                id: 131,
                label: '2016--1'
              }, {
                id: 132,
                label: '2016--2'
              }, {
                id: 133,
                label: '2016--3'
              }]
            },
            {
              id: 14,
              label: '领域模型设计',
              children: [{
                id: 141,
                label: '2016--1'
              }, {
                id: 142,
                label: '2016--2'
              }, {
                id: 142,
                label: '2016--3'
              }]
            }]
        }, {
          label: '第2轮',
          children: [{
            label: '该轮轮次设置',
          },
            {
              label: '业务流程分析',
              children: [{
                label: '2016--1'
              }, {
                label: '2016--2'
              }, {
                label: '2016--3'
              }]
            },
            {
              label: '领域模型设计',
              children: [{
                label: '2016--1'
              }, {
                label: '2016--2'
              }, {
                label: '2016--3'
              }]
            }]
        }],
        defaultProps: {
          children: 'children',
          label: 'label'
        },
        options: [
          {
            value: '选项1',
            label: 'OOAD'
          }, {
            value: '选项2',
            label: 'J2EE'
          }
        ],
        value: '',
        options2: [
          {
            value: '选项1',
            label: '2016--1'
          }, {
            value: '选项2',
            label: '2016--2'
          }
        ],
        value2: '',
        options3: [
          {
            value: '选项1',
            label: '界面'
          }, {
            value: '选项2',
            label: '模型'
          }
        ],
        value3: '',
        seminar: [{
          id: '1',
          name: '用例分析',
          course: 'OOAD',
          desc: '界面导航图，每组要求15分组'
        }],
        option: ''

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
            that.rounds.splice(0, that.rounds.length);
            that.rounds = data;

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
            that.classes.splice(0, that.rounds.length);
            for (let i = 0; i < data.length; i++) {
              that.classes.push({
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
      for (let i = 0; i < that.rounds.length; i++) {
        that.$axios({
          method: 'GET',
          url: '/course/' + that.data.rounds[i].id + '/seminar'
        })
          .then(res => {
            if (res.data.status === 200) {
              let data_ = res.data.data;
              console.log(data_);
              that.roundsInfo.splice(0, that.roundsInfo.length);
              that.roundsInfo[i].topics = data_;
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
        for (let i = 0; i < that.rounds.length; i++) {
          data[i].label = '第' + that.rounds[i].roundSerial + '轮';
          //data[i].id=i+1;
          data[i].children[0].label = '该轮轮次设置';
          data[i].children[1].label = '修改讨论课';
          data[i].children[0].id = that.rounds[i].roundId;
          data[i].children[1].id = that.rounds[i].roundId * 10;
          for (let k = 2; k < that.roundsInfo[i].topics.length; k++) {
            data[i].children[k].label = that.roundsInfo[i].topics[k - 2].topic;
            //data[i].children[k].id = (i+1)*10+k+1;
            for (let m = 0; m < that.classes.length; m++) {
              data[i].children[k].children[m].label = that.classes.grade + '-' + that.classes.classSerial;
              data[i].children[k].children[m].id = that.classes.classId * 100;
            }
          }
        }
      }
    },
    methods: {
      getParams() {
        this.courseId = this.$route.params.courseId;
        this.courseName = this.$route.params.courseName;
      },
      handleNodeClick(data) {
        if (data.label === '该轮轮次设置') {
          this.$router.push({
            path: '/teacher/SetRound',
            name: 'SetRound',
            params: {
              roundId: data.id
            }
          });
        }
        if (data.label === '修改讨论课') {
          this.dialogTableVisible = true;
          let roundId = data.id / 10;

        }
        if (data.label === '2016--1')
          this.$router.push({path: '/teacher/BeforeSeminar'});
        if (data.label === '2016--2')
          this.$router.push({path: '/teacher/AfterSeminar'});

      },
      NewSeminar(courseId, rounds) {
        this.$router.push({
          path: '/teacher/NewSeminar',
          name: 'NewSeminar',
          params: {
            courseId: courseId,
            rounds: rounds
          }
        });
      },
      Back() {
        this.$router.go(-1);
      },
      gotoStartSeminar() {
        this.$router.push({path: '/teacher/OngoingSeminar'});
      },
      gotoUpdate() {
        this.dialogTableVisible = false;
        this.$router.push({path: '/teacher/UpdateSeminarInfo'});
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

  .empty {
    width: 100%;
    height: 30px;
  }

  .new {
    width: 100%;
    margin-top: 250px;
  }


</style>

