<template>
  <div>
    <div id="head" class="head">
      <div class="title"><i class="el-icon-back icon1 icon0" @click="returnSeminarPage"></i>讨论课
        <el-dropdown class="plus" trigger="click">
          <i class="el-icon-plus icon0"></i>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item><i class="el-icon-bell" @click="gotoHomePage">&nbsp;&nbsp;个人页</i></el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </div>
    </div>
    <div class="main">
      <div style="width:100%">
        <el-card>
          <fieldset>
            <legend style="font-size: 20px;color:#66cccc">xX{{seminarName}}Xx</legend>
            <p v-if="nowIndex!==-1"><span style="font-weight: bold;color:#616161">正在展示:</span>
              <br>组号:{{klassSerial}}-{{teamSerial}} {{teamName}}
              <br>已有<span style="color: #66cccc;font-weight: bold">{{quesNum}}</span>名同学提问
            </p>
            <p v-else-if="nowIndex===1">展示即将开始</p>
          </fieldset>
        </el-card>
      </div>
      <el-card class="finish" id="finished">
        <i class="el-icon-warning icon0" style="color: red;font-size: 20px"></i>
        <br>
        <br>讨论课已结束
        <br>请设定书面报告截止日期
        <br>
        <br>
        <el-date-picker
          v-model="value1"
          type="datetime"
          placeholder="选择日期时间">
        </el-date-picker>
        <br><br>
        <el-button type="text" style="float: right" @click="endSeminar">SURE</el-button>
      </el-card>
      <div class="left">
        <el-menu default-active="1-4-1" class="el-menu-vertical-demo" :collapse="isCollapse">
          <el-submenu index="1">
            <template slot="title">
              <i class="iconfont icon-huatong"></i>&nbsp;&nbsp;展示
              <span slot="title"></span>
            </template>
            <el-menu-item-group>
              <span slot="title">展示小组</span>
              <el-menu-item v-for="(group,index0) in attendanceInfo"
                            :key="index0"
                            index="index0"
                            v-model="index0"
                            @click.native="updatePreScore(index0)">
                {{group.team.klassSerial}}-{{group.team.teamSerial}}{{group.team.teamName}}
              </el-menu-item>
            </el-menu-item-group>
          </el-submenu>
          <el-submenu index="2">
            <template slot="title">
              <i class="iconfont icon-jushou"></i>&nbsp;&nbsp;提问
              <span slot="title"></span>
            </template>
            <el-menu-item-group>
              <span slot="title">提问小组</span>
              <el-menu-item v-for="(group1,index1) in quesGroups"
                            :key="index1"
                            index=index1 @click="updateQuesScore(index1)">
                {{group1.questionSerial}}.{{group1.klassSerial}}-{{group1.teamSerial}}{{group1.teamName}}
              </el-menu-item>
            </el-menu-item-group>
          </el-submenu>
        </el-menu>
      </div>
      <div class="right">
        <el-card id="pre" style="display: block">
          <div slot="header">
            <span style="font-weight: bold;color: #616161">展示成绩</span>
          </div>
          <el-input
            placeholder="输入成绩"
            suffix-icon="el-icon-edit"
            v-model="presentationScore">
          </el-input>
          <el-button type="info" size="small" style="margin-top: 5px;float: right;margin-bottom: 5px" @click="gradePre">
            确认
          </el-button>
        </el-card>
        <el-card id="ques" style="display: none">
          <div v-if="nowQuesGroup!==null" slot="header">
            <span style="color: #616161;font-weight: bold">给提问打分</span>
          </div>
          <table style="width: 100%">
            <tr>
              <td style="width: 30%">提问成绩</td>
              <td>
                <el-input placeholder="输入成绩"></el-input>
              </td>
            </tr>
            <tr>
              <td style="width: 30%"></td>
              <td>
                <el-button type="info" size="small" style="margin-top: 5px;float: right;margin-bottom: 5px"
                           @click="gradeQues">确认
                </el-button>
              </td>
            </tr>
          </table>
        </el-card>
        <el-card id="update" style="display: none">
          <div slot="header">
            <span>修改展示成绩</span>
            <!--<span>{{attendanceInfo[tempUpdate].team.klassSerial}}-{{attendanceInfo[tempUpdate].team.teamSerial}}{{attendanceInfo[tempUpdate].team.teamName}}小组</span>-->
          </div>
          <table style="width: 100%">
            <tr>
              <td style="width: 30%">展示成绩</td>
              <td>
                <el-input v-model="otherScore"></el-input>
              </td>
            </tr>
          </table>
          <el-button type="success" size="mini" plain
                     @click="updateSuccess"
                     style="float: right;margin-top: 10px;margin-bottom: 10px">确认修改
          </el-button>
        </el-card>
        <el-card id="update1" style="display: none">
          <div v-if="quesGroups.length!==0" slot="header">
            <span>修改提问成绩</span>
            <!--<span>{{quesGroups[tempQuesUpdate].klassSerial}}-{{quesGroups[tempQuesUpdate].teamSerial}}{{quesGroups[tempQuesUpdate].teamName}}小组</span>-->
          </div>
          <table style="width: 100%">
            <tr>
              <td style="width: 30%">提问成绩</td>
              <td>
                <el-input v-model="otherQuesScore"></el-input>
              </td>
            </tr>
          </table>
          <el-button type="success" size="mini" plain
                     @click="updateSuccess1"
                     style="float: right;margin-top: 10px;margin-bottom: 10px">确认修改
          </el-button>
        </el-card>
      </div>
    </div>
    <div class="main" style="float: left">
      <el-button id="askQues" type="success" plain style="width: 40%;float:left;margin-top: 100px"
                 @click="askQuestions">抽取提问
      </el-button>
      <el-button type="success" plain id="nextGroup" style="width:40%;float:right;margin-top: 100px"
                 @click="nextGroup">
        开始展示
      </el-button>
    </div>
  </div>
</template>

<script>
  export default {
    name: "temp",
    data() {
      return {
        ws: null,
        webserver: '',
        isCollapse: true,
        course: [],
        classId: '',
        seminarId: '',
        roundId: '',
        attendanceInfo: [],
        score: '',
        nowIndex: -1,
        value1: '',
        team: '',
        klassSerial: '',
        seminarName: '',
        teamSerial: '',
        teamName: '',
        presentationScore: '',
        questionId: '',
        questionScore: '',
        klassSeminarId: '',
        otherScore: '',
        otherQuesScore: '',
        tempUpdate: 1,
        tempQuesUpdate: 1,
        quesNum: 0,
        quesGroups: [
          {
            questionId: 0,
            questionSerial: 0,
            teamSerial: 0,
            klassSerial: 0,
            teamName: '',
            quesScore: 0
          }
        ],
        nowQuesGroup: {}

      }
    },
    created() {
      this.course = this.$route.params.course;
      this.classId = this.$route.params.classId;
      this.seminarId = this.$route.params.seminarId;
      this.roundId = this.$route.params.roundId;
      this.getParams();
      //this.klassSeminarId=this.$route.params.klassSeminarId;
      console.log("klassSeminarId");
      console.log(this.klassSeminarId);
      let that = this;
      that.$axios({
        method: 'GET',
        url: '/seminar/' + that.seminarId + '/class/' + that.classId + '/attendance',
        headers: {
          'Authorization': window.localStorage['token']
        }
      })
        .then(res => {
          if (res.status === 200) {
            window.localStorage['token'] = res.headers.authorization;
            console.log("获得当前展示信息");
            console.log(res.data);
            that.attendanceInfo = res.data;
            that.seminarName = that.attendanceInfo[that.nowIndex + 1].score.seminarName;
            that.klassSerial = that.attendanceInfo[that.nowIndex + 1].team.klassSerial;
            console.log("KlassSerial" + that.klassSerial);
            that.teamSerial = that.attendanceInfo[that.nowIndex + 1].team.teamSerial;
            console.log("teamId" + that.teamSerial);
            that.teamName = that.attendanceInfo[that.nowIndex + 1].team.teamName;
            that.klassSeminarId = that.attendanceInfo[0].klassSeminarId;
            for (let i = 0; i < that.attendanceInfo.length; i++) {
              if (that.attendanceInfo[i].isPresent === 1)
                that.index = i;
            }
            that.$axios({
              method: 'GET',
              url: '/seminar/' + that.SeminaringInfo[0].klassSeminarId + '/attendance/' + that.SeminaringInfo[that.index].id + '/questionnumber',
              headers: {
                'Authorization': window.localStorage['token']
              }
            }).then(res => {
              if (res.status === 200) {
                console.log("当前提问人数：");
                console.log(res);
                that.quesNum = res.data;
              }
            }).catch(e => {
              console.log(e)
            })
          }
        }).catch(e => {
        console.log(e);
      });

    },
    watch: {
      '$route': 'getParams'
    },
    methods: {
      getParams() {
        this.klassSeminarId = this.$route.params.klassSeminarId;
      },
      /*websocket*/
      initWebSocket() { //初始化weosocket
        let that = this;
        this.$axios({
          method: 'GET',
          url: '/seminar/' + that.$data.klassSeminarId + '/enterseminar',
          headers: {
            'Authorization': window.localStorage['token']
          }
        })
          .then(res => {
            if (res.status === 200) {
              window.localStorage['token'] = res.headers.authorization;
              that.webserver = res.data;
              console.log("随便一句话");
              that.ws = new WebSocket(that.webserver);
              that.ws.onopen = function (evt) {
                console.log("连接成功");
              };
              that.ws.onmessage = that.websocketonmessage;
              that.ws.onclose = that.websocketclose;
            }
          })
          .catch(e => {
            console.log(e)
          })
      },
      websocketonmessage(e) { //数据接收
        //const message = JSON.parse(e.data);
        let that = this;
        let message = e.data;
        console.log(message);
        console.log("aaa" + message);
        if (message === "提问") {
          that.quesNum++;
        }
        // else if (message === "提问") {
        //   that.questionNum++;
        // }
        // else if (message === "抽取提问") {
        //   that.questionNum--;
        // } else if (message === "请您开始提问") {
        //   this.$message({
        //     type: 'success',
        //     message: '请您开始提问'
        //   })
        // } else {
        //   this.$message({
        //     type: 'warning',
        //     message: '很遗憾，您未被选中，请您耐心等待！'
        //   })
        // }

      },
      websocketsend(agentData) {//数据发送
        this.ws.send(agentData);
      },
      websocketclose(e) {  //关闭
        console.log("connection closed (" + e.code + ")");
      },

      gotoBacklog() {
        this.$router.push({path: '/teacher/Backlog'});
      },
      gotoHomePage() {
        this.$router.push({path: '/teacher/HomePage'});
      },
      returnSeminarPage() {
        this.$router.push({
          path: '/teacher/SeminarPage',
          name: 'SeminarPage',
          params: {
            course: this.course
          }
        });
      },
      //抽取提问
      askQuestions() {
        //拿到提问小组信息
        let that = this;
        this.$axios({
          method: 'GET',
          url: '/attendance/' + this.attendanceInfo[this.nowIndex].id + '/question',
          headers: {
            'Authorization': window.localStorage['token']
          }
        })
          .then(res => {
            if (res.status === 200) {
              that.nowQuesGroup = res.data;
              console.log("提问小组信息");
              if (res.data === null) {
                this.$message({
                  type: 'info',
                  message: '当前没有同学提问'
                })
              } else {
                that.ws.send("抽取提问" + that.nowQuesGroup.id);
              }
              window.localStorage['token'] = res.headers.authorization;
            }
          }).catch(e => {
          console.log(e);
        });
        var askQues = document.getElementById("askQues");
        askQues.disabled = true;
        var pre_ = document.getElementById("pre");
        var ques_ = document.getElementById("ques");
        var update_ = document.getElementById("update");
        update_.style.display = "none";
        var update1_ = document.getElementById("update1");
        update1_.style.display = "none";
        pre_.style.display = "none";
        ques_.style.display = "block";


      },
      //给展示打分
      gradePre() {
        this.$axios({
          method: 'POST',
          url: '/seminar/' + this.klassSeminarId + '/team/' + this.attendanceInfo[this.nowIndex].team.teamId + '/enterseminar',
          data: {
            presentationScore: this.presentationScore
          },
          headers: {
            'Authorization': window.localStorage['token']
          }
        })
          .then(res => {
            if (res.status === 200) {
              window.localStorage['token'] = res.headers.authorization;
              this.$message({
                type: 'success',
                message: '展示打分成功'
              })
            }
          })
          .catch(e => {
            console.log(e);
          });
      },
      //给提问打分
      gradeQues() {
        var askQues = document.getElementById("askQues");
        askQues.disabled = false;
        //向后端发请求保存提问成绩
        this.$axios({
          method: 'PUT',
          url: '/attendance/question/' + this.questionId,
          data: {
            questionScore: this.questionScore
          }
        })
          .then(res => {
            if (res.status === 200) {
              this.$message({
                type: 'success',
                message: '保存成功！'
              })
            }
          }).catch(e => {
          console.log(e);
        })
      },
      //下组展示

      nextGroup() {
        let that = this;
        if (this.nowIndex === -1) {
          this.initWebSocket();
          this.$axios({
            method: 'PUT',
            url: '/seminar/' + this.seminarId + '/status',
            data: {
              status: 1,
              klassId: this.classId
            }
          })
            .then(res => {
              if (res.status === 200) {

              }
            }).catch(e => {
            console.log(e);
          });
        } else {
          this.$axios({
            method: 'DELETE',
            url: '/seminar/' + this.klassSeminarId + '/question',
            headers: {
              'Authorization': window.localStorage['token']
            }
          })
            .then(res => {
              if (res.status === 200) {
                window.localStorage['token'] = res.headers.authorization;
                that.ws.send("下一组展示");
              }
            }).catch(e => {
            console.log(e);
          })
        }
        this.nowIndex++;
        this.$axios({
          method: 'PUT',
          url: '/attendance/' + this.attendanceInfo[this.nowIndex].id + '/status',
          data: {
            status: 1
          }
        })
          .then(res => {
            if (res.status === 200) {
              console.log("设置小组展示状态为1");
            }
          })
          .catch(e => {
            console.log(e);
          });
        if (this.nowIndex > 0) {
          this.$axios({
            method: 'PUT',
            url: '/attendance/' + this.attendanceInfo[this.nowIndex - 1].id + '/status',
            data: {
              status: 0
            }
          })
            .then(res => {
              if (res.status === 200) {
                console.log("设置上一小组展示状态为0");
              }
            })
            .catch(e => {
              console.log(e);
            });
        }
        this.quesNum = 0;

        if ((this.nowIndex > -1) && (this.nowIndex < this.attendanceInfo.length - 1)) {
          var next_ = document.getElementById("nextGroup");
          next_.innerHTML = "下组展示";
        } else if (this.nowIndex === this.attendanceInfo.length - 1) {
          var next0_ = document.getElementById("nextGroup");
          next0_.innerHTML = "结束展示";
        }
        var pre_ = document.getElementById("pre");
        var ques_ = document.getElementById("ques");
        var update_ = document.getElementById("update");
        update_.style.display = "none";
        var update1_ = document.getElementById("update1");
        update_.style.display = "none";
        pre_.style.display = "block";
        ques_.style.display = "none";
        if (this.nowIndex === this.attendanceInfo.length) {
          var finish_ = document.getElementById("finished");
          finish_.style.display = "block";
        }

      },
      //确认修改展示成绩
      updateSuccess() {
        var pre_ = document.getElementById("pre");
        pre_.style.display = "block";
        var update_ = document.getElementById("update");
        update_.style.display = "none";
        //向后端请求保存修改的展示成绩
        this.$axios({
          method: 'POST',
          url: '/seminar/' + this.klassSeminarId + '/team/' + this.attendanceInfo[this.tempUpdate].team.teamId + '/enterseminar',
          data: {
            presentationScore: this.otherScore
          },
          headers: {
            'Authorization': window.localStorage['token']
          }
        })
          .then(res => {
            if (res.status === 200) {
              window.localStorage['token'] = res.headers.authorization;
              this.$message({
                type: 'success',
                message: '修改成功'
              })
            }
          });

      },
      //确认修改提问成绩
      updateSuccess1() {
        var pre_ = document.getElementById("pre");
        pre_.style.display = "block";
        var update_ = document.getElementById("update1");
        update_.style.display = "none";
        this.$axios({
          method: 'PUT',
          url: '/attendance/question/' + this.questionId,
          data: {
            questionScore: this.otherQuesScore
          },
          headers: {
            'Authorization': window.localStorage['token']
          }
        })
          .then(res => {
            if (res.status === 200) {
              window.localStorage['token'] = res.headers.authorization;
              this.$message({
                type: 'success',
                message: '修改成功！'
              })
            }
          }).catch(e => {
          console.log(e);
        })
      },
      //选择要修改展示成绩的小组
      updatePreScore(index) {
        this.tempUpdate = index;
        var pre_ = document.getElementById("pre");
        pre_.style.display = "none";
        var update1_ = document.getElementById("update1");
        update1_.style.display = "none";
        var ques_ = document.getElementById("ques");
        ques_.style.display = "none";
        var update_ = document.getElementById("update");
        update_.style.display = "block";

      },
      updateQuesScore(index1) {
        this.tempQuesUpdate = index1;
        var pre_ = document.getElementById("pre");
        pre_.style.display = "none";
        var ques_ = document.getElementById("ques");
        ques_.style.display = "none";
        var update_ = document.getElementById("update");
        update_.style.display = "none";
        var update1_ = document.getElementById("update1");
        update1_.style.display = "block";
      },
      endSeminar() {
        //向websocket发送最后一组展示Id
        //设置讨论课状态
        this.$axios({
          method: 'PUT',
          url: '/seminar/' + this.seminarId + '/status',
          data: {
            status: 2,
            klassId: this.classId
          }
        })
          .then(res => {
            if (res.status === 200) {
              this.$message({
                type: 'success',
                message: '讨论课已结束'
              })
            }
          }).catch(e => {
          console.log(e);
        });
        this.$axios({
          method: 'PUT',
          url: '/attendance/' + this.attendanceInfo[this.nowIndex].id + '/status',
          data: {
            status: 0
          }
        })
          .then(res => {
            if (res.status === 200) {
              console.log("设置最后小组展示状态为0");
            }
          })
          .catch(e => {
            console.log(e);
          });
        //设置书面报告时间
        this.$axios({
          method: 'PUT',
          url: '/seminar/' + this.seminarId + '/reportddl',
          data: {
            reportddl: this.value1
          }
        }).then(res => {
          if (res.status === 200) {
            console.log("设置成功");
          }
        }).catch(e => {
          console.log(e);
        });
        this.$router.push({
          path: '/teacher/BeforeSeminar',
          name: 'beforeSeminar',
          params: {
            seminarId: this.seminarId,
            roundId: this.roundId,
            classId: this.classId,
            course: this.course
          }
        });
      }
    }
  }
</script>

<style scoped>
  .left {
    width: 30%;
    min-height: 50px;
    float: left;
    margin-top: 10px;
  }

  .right {
    width: 70%;
    min-height: 50px;
    float: left;
    margin-top: 10px;
  }
  .finish {
    position: fixed;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    z-index: 999;
    margin: auto;
    width: 80%;
    height: 220px;
    text-align: center;
    font-size: 14px;
    display: none;
  }

  .el-menu-vertical-demo:not(.el-menu--collapse) {
    width: 200px;
    min-height: 400px;
  }
</style>
<style>

  .el-menu-item.is-active {
    color: #66cccc;
  }

  .el-menu-item, .el-submenu__title {
    height: 45px;
    line-height: 45px;
  }

  .el-menu--collapse .el-menu .el-submenu,
  .el-menu--popup {
    min-width: 100px;
  }

  .el-submenu__title i {
    color: #66cccc;
  }

  .el-submenu [class^=el-icon-] {
    font-size: 25px;
  }

  .el-menu--collapse {
    width: 90px;
  }

  .el-menu {
    border-left: solid 1px #e6e6e6;
  }
</style>
