<template>
  <div>
    <div id="head" class="head">
      <div class="title"><i class="el-icon-back icon1 icon0" @click="returnSeminarPage"></i>讨论课
        <el-dropdown class="plus" trigger="click">
          <i class="el-icon-plus icon0"></i>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item><i class="el-icon-date" @click="gotoBacklog">&nbsp;&nbsp;待 办</i></el-dropdown-item>
            <el-dropdown-item><i class="el-icon-bell" @click="gotoHomePage">&nbsp;&nbsp;个人页</i></el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </div>
    </div>
    <div class="main">
      <div style="width:100%">
        <el-card>
          <fieldset>
            <legend style="font-size: 20px;color:#66cccc">xX{{seminar[0].name}}Xx</legend>
            <p><span style="font-weight: bold;color:#616161">正在展示:</span>
              <br>组号:{{groups[group].id}} {{groups[group].name}}
              <br>已进行5分钟
              <br>已有{{quesGroups.length}}名同学提问
            </p>
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
        <el-menu default-active="1-4-1" class="el-menu-vertical-demo"
                 @open="handleOpen" @close="handleClose" :collapse="isCollapse">
          <el-submenu index="1">
            <template slot="title">
              <i class="el-icon-loading"></i>
              <span slot="title">导航一</span>
            </template>
            <el-menu-item-group>
              <span slot="title">展示小组</span>
              <el-menu-item v-for="(group,index0) in groups"
                            :key="index0"
                            index="index0"
                            v-model="group.id"
                            @click="updatePreScore">{{group.id}}
              </el-menu-item>
            </el-menu-item-group>
          </el-submenu>
          <el-submenu index="2">
            <template slot="title">
              <i class="el-icon-question el-icon0"></i>
              <span slot="title">导航二</span>
            </template>
            <el-menu-item-group>
              <span slot="title">提问小组</span>
              <el-menu-item v-for="(group,index0) in quesGroups"
                            :key="index0"
                            index="index0" @click="updateQuesScore">{{group.id}}
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
            v-model="groups[group].score">
          </el-input>
        </el-card>
        <el-card id="ques" style="display: none">
          <div slot="header">
            <span style="color: #616161;font-weight: bold">{{groupSelected}}小组</span>
          </div>
          <table style="width: 100%">
            <tr>
              <td style="width: 30%">提问成绩</td>
              <td>
                <el-input placeholder="输入成绩"></el-input>
              </td>
            </tr>
          </table>
        </el-card>
        <el-card id="update" style="display: none">
          <div slot="header">
            <span>xxx小组</span>
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
          <div slot="header">
            <span>xxx小组</span>
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
      <el-button type="success" plain style="width: 40%;float:left;margin-top: 100px" @click="askQuestions">抽取提问
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
        isCollapse: true,
        value1: '',
        seminar: [{
          id: '1',
          name: '用例分析',
          course: 'OOAD',
          desc: '界面导航图，每组要求15分组'
        }],
        group: 0,
        count: 0,
        groups: [{
          id: '1-1',
          name: 'yybby',
          score: ''
        }, {
          id: '1-2',
          name: 'nnnyyy',
          score: ''
        }, {
          id: '1-3',
          name: 'fffff',
          score: ''
        }, {
          id: '1-4',
          name: 'fffff',
          score: ''
        }, {
          id: '1-5',
          name: 'fffff',
          score: ''
        }, {
          id: '1-6',
          name: 'fffff',
          score: ''
        }
        ],
        groupSelected: '1-1',
        otherScore: '',
        otherQuesScore: '',
        quesGroups: [{
          id: '1-1',
          score: ''
        },
          {
            id: '2-1',
            score: ''
          },
          {
            id: '3-1',
            score: ''
          }
        ],
      }
    },
    methods: {
      gotoBacklog() {
        this.$router.push({path: '/teacher/Backlog'});
      },
      gotoHomePage() {
        this.$router.push({path: '/teacher/HomePage'});
      },
      returnSeminarPage() {
        this.$router.push({path: '/teacher/SeminarPage'});
      },
      handleOpen(key, keyPath) {
        console.log(key, keyPath);
      },
      handleClose(key, keyPath) {
        console.log(key, keyPath);
      },
      askQuestions() {
        var pre_ = document.getElementById("pre");
        var ques_ = document.getElementById("ques");
        var update_ = document.getElementById("update");
        update_.style.display = "none";
        var update1_ = document.getElementById("update1");
        update1_.style.display = "none";
        pre_.style.display = "none";
        ques_.style.display = "block";
      },
      nextGroup() {
        this.count++;
        this.group++;
        if ((this.count > 0) && (this.count < this.groups.length - 1)) {
          this.$router.push({path: '/teacher/StartSeminar'});
          var next_ = document.getElementById("nextGroup");
          next_.innerHTML = "下组展示";
        } else if (this.count === this.groups.length - 1) {
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
        if (this.group === this.groups.length) {
          var finish_ = document.getElementById("finished");
          finish_.style.display = "block";
        }
      },
      endSeminar() {
        this.$router.push({path: '/teacher/AfterSeminar'});
      },
      updateSuccess() {
        var pre_ = document.getElementById("pre");
        pre_.style.display = "block";
        var update_ = document.getElementById("update");
        update_.style.display = "none";
      },
      updateSuccess1() {
        var pre_ = document.getElementById("pre");
        pre_.style.display = "block";
        var update_ = document.getElementById("update1");
        update_.style.display = "none";
      },
      updatePreScore() {
        var pre_ = document.getElementById("pre");
        pre_.style.display = "none";
        var update1_ = document.getElementById("update1");
        update1_.style.display = "none";
        var ques_ = document.getElementById("ques");
        ques_.style.display = "none";
        var update_ = document.getElementById("update");
        update_.style.display = "block";
      },
      updateQuesScore() {
        var pre_ = document.getElementById("pre");
        pre_.style.display = "none";
        var ques_ = document.getElementById("ques");
        ques_.style.display = "none";
        var update_ = document.getElementById("update");
        update_.style.display = "none";
        var update1_ = document.getElementById("update1");
        update1_.style.display = "block";
      }
    }
  }
</script>

<style scoped>
  .left {
    width: 21%;
    min-height: 50px;
    float: left;
    margin-top: 10px;
  }
  .right {
    width: 79%;
    min-height: 50px;
    float: left;
    margin-top: 10px;
  }
  .el-menu-vertical-demo:not(.el-menu--collapse) {
    width: 200px;
    min-height: 400px;
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
</style>
