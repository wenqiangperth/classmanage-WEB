<template>
  <div>
    <div id="head" class="head">
      <div class="title"><i class="el-icon-back icon1 icon0" @click="returnSeminarPage"></i>讨论课
        <el-dropdown class="plus" trigger="click">
          <i class="el-icon-plus icon0"></i>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item><i class="el-icon-bell" @click="gotoHomePage">&nbsp;&nbsp;个人页</i></el-dropdown-item>
            <el-dropdown-item><i class="el-icon-back" @click="returnLogin">&nbsp;&nbsp;退 出</i></el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </div>
    </div>
    <div class="main">
      <el-col :span="8" id="others" style="position:fixed;z-index:99;display: none">
        <el-menu
          default-active="2"
          class="el-menu-vertical-demo"
          background-color="#dbf5f9"
          text-color="#b4b8b9"
          active-text-color="#66cccc"
          v-for="(item,index) in groups"
          :key="index">
          <el-menu-item index="index" @click="updateGrade">
            <i class="el-icon-document icon0"></i>
            <span slot="title">{{item.id}}</span>
          </el-menu-item>

        </el-menu>
      </el-col>
      <el-col :span="8" id="other"
              style="position:fixed;right:0;z-index:99;display: none">
        <el-menu
          default-active="2"
          class="el-menu-vertical-demo"
          background-color="#dbf5f9"
          text-color="#b4b8b9"
          active-text-color="#66cccc"
          v-for="(item,index) in quesGroups"
          :key="index">
          <el-menu-item index="index" @click="updateQuesGrade">
            <i class="el-icon-document icon0"></i>
            <span slot="title">{{item}}</span>
          </el-menu-item>

        </el-menu>
      </el-col>
      <el-card>
        <fieldset>
          <legend style="font-size: 20px;color:#66cccc">主题: {{seminar[0].name}}</legend>
          <p>正在展示:
            <br>组号:{{groups[group].id}} {{groups[group].name}}
            <br>组长:{{groups[group].leader}}
            <br>组员: <i v-for="item in groups[group].members">{{item}}&nbsp;</i>
          </p>
        </fieldset>
      </el-card>

      <el-card class="pause" id="pause">
        <i class="el-icon-warning icon0" style="color: red;font-size: 20px"></i>
        <br>
        <br>确认暂停
        <br>{{seminar[0].course}} &nbsp;{{date}}
        <br>{{seminar[0].name}}
        <br><br><br>
        <el-button type="text" style="float: right">
          <router-link :to="{name:'PauseSeminar',
          params:[{id:seminar[0].id},
                  {name:seminar[0].name},
                  {course:seminar[0].course},
                  {desc:seminar[0].desc}]}">
            SURE
          </router-link>
        </el-button>
        <el-button type="text" style="float:right;margin-right: 5px" @click="cancelPasue">CANCEL</el-button>
      </el-card>
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

      <el-card id="pre" style="display: block">
        <table style="width: 100%">
          <tr>
            <td style="width: 30%">
              <el-button type="success" plain size="small" @click="start">开始展示</el-button>
            </td>
            <td style="width: 30%">
              <el-button type="success" plain size="small" @click="stop">结束展示</el-button>
            </td>
            <td style="text-align: center">{{str}}</td>
          </tr>
        </table>
        <table style="width: 100%">
          <tr>
            <td style="width: 30%">展示成绩</td>
            <td>
              <el-input placeholder="输入成绩"></el-input>
            </td>
          </tr>
        </table>
        <el-button type="success" plain size="mini"
                   style="float: left;margin-left: 10px;margin-top: 5px;margin-bottom: 10px;"
                   @click="displayOthers">
          修改展示成绩
        </el-button>
        <el-button type="success" plain size="mini"
                   style="float: left;margin-left: 5px;margin-top: 5px;margin-bottom: 10px;"
                   @click="quesOthers">
          修改提问成绩
        </el-button>
        <el-button size="mini"
                   icon="el-icon-caret-right icon0" circle
                   style="float: right;margin-top: 5px;margin-bottom: 10px;background-color: #fff;border-color:#66cccc;color:#66cccc"
                   @click="isSuspend"></el-button>
      </el-card>
      <el-card id="ques" style="display: none">
        <div slot="header">
          <span>xxx小组</span>
        </div>
        <table style="width: 100%">
          <tr>
            <td style="width: 30%">提问成绩</td>
            <td>
              <el-input placeholder="输入成绩"></el-input>
            </td>
          </tr>
        </table>
        <el-button type="success" size="mini" plain
                   @click="quesSuccess"
                   style="float: right;margin-top: 10px;margin-bottom: 10px">确认
        </el-button>
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
      <el-card id="next" style="display: block">
        <el-alert
          type="info"
          show-icon
          style="font-size: 12px">
          当前有{{num}}位同学报名提问
        </el-alert>
        <div style="width: 100%;height: 10px"></div>
        <el-alert
          type="success"
          show-icon
          style="font-size: 12px">
          当前已有{{num1}}位同学提问
        </el-alert>
        <div style="width:100%;">
          <el-button type="success" plain style="width: 40%;float:left;margin-top: 10px;margin-bottom: 10px" @click="askQuestions">抽取提问
          </el-button>
          <el-button type="success" plain id="nextGroup" style="width:40%;float:right;margin-top: 10px;margin-bottom: 10px"
                     @click="nextGroup">下组展示
          </el-button>
        </div>
      </el-card>


    </div>
  </div>
</template>

<script>
  export default {
    name: "StartSeminar",
    data() {
      return {
        value1: '',
        seminar: [{
          id: '1',
          name: '用例分析',
          course: 'OOAD',
          desc: '界面导航图，每组要求15分组'
        }],
        date: '',
        str: '00:00:00',
        h: 0,
        m: 0,
        s: 0,
        ms: 0,
        time: 0,
        num: 0,
        num1: 0,
        group: 0,
        groups: [{
          id: '1-1',
          name: 'yybby',
          leader: 'xxx',
          members: ['www', 'sss', 'yayaa']
        }, {
          id: '1-2',
          name: 'nnnyyy',
          leader: 'xxx',
          members: ['www', 'sss', 'yayaa']
        }, {
          id: '1-3',
          name: 'fffff',
          leader: 'xxx',
          members: ['www', 'sss', 'yayaa']
        }
        ],

        quesGroups: [
          '1-1',
          '1-2',
          '1-3'
        ],
        otherScore: 3.5,
        otherQuesScore: 1,


      }
    },
    methods: {

    gotoHomePage(){
      this.$router.push({path:'/teacher/HomePage'});
    },
      returnLogin() {
        this.$router.push({path: '/'});
      },
      returnSeminarPage() {
        this.$router.push({path: '/teacher/SeminarPage'});
      },
      timer() {
        this.ms = this.ms + 50;
        if (this.ms >= 1000) {
          this.ms = 0;
          this.s = this.s + 1;
        }
        if (this.s >= 60) {
          this.s = 0;
          this.m = this.m + 1;
        }
        if (this.m >= 60) {
          this.m = 0;
          this.h = this.h + 1;
        }
        this.str = this.toDub(this.h) + ":" + this.toDub(this.m) + ":" + this.toDub(this.s);
      },
      start() {
        this.time = setInterval(this.timer, 50);
      },
      stop() {
        clearInterval(this.time);
      },

      toDub(n) {
        if (n < 10) {
          return "0" + n;
        } else {
          return "" + n;
        }
      },
      askQuestions() {
        var pre_ = document.getElementById("pre");
        var ques_ = document.getElementById("ques");
        pre_.style.display = "none";
        ques_.style.display = "block";
      },
      nextGroup() {
        if (++this.group < this.groups.length) {
          this.$router.push({path: '/teacher/StartSeminar'});
          if (this.group + 1 === this.groups.length) {
            var next_ = document.getElementById("nextGroup");
            next_.innerHTML = "展示结束";
          }
        }
        if (this.group === this.groups.length) {
          var finish_ = document.getElementById("finished");
          finish_.style.display = "block";
        }
      },
      endSeminar() {
        this.$router.push({path: '/teacher/SeminarPage'});
      },
      quesSuccess() {
        var pre_ = document.getElementById("pre");
        var ques_ = document.getElementById("ques");
        pre_.style.display = "block";
        ques_.style.display = "none";
      },
      displayOthers() {
        var other = document.getElementById("others");
        other.style.display = "block";
      },
      quesOthers() {
        var other = document.getElementById("other");
        other.style.display = "block";
      },
      updateGrade() {
        var next_ = document.getElementById("next");
        next_.style.display = "none";
        var update_ = document.getElementById("update");
        update_.style.display = "block";
      },
      updateQuesGrade() {
        var next_ = document.getElementById("next");
        next_.style.display = "none";
        var update_ = document.getElementById("update1");
        update_.style.display = "block";
      },
      updateSuccess() {
        var other = document.getElementById("others");
        other.style.display = "none";
        var next_ = document.getElementById("next");
        next_.style.display = "block";
        var update_ = document.getElementById("update");
        update_.style.display = "none";
      },
      updateSuccess1() {
        var other = document.getElementById("other");
        other.style.display = "none";
        var next_ = document.getElementById("next");
        next_.style.display = "block";
        var update_ = document.getElementById("update1");
        update_.style.display = "none";
      },
      isSuspend() {
        var pause = document.getElementById("pause");
        pause.style.display = "block";
        var date = new Date();
        var seperator1 = "-";
        var year = date.getFullYear();
        var month = date.getMonth() + 1;
        var strDate = date.getDate();
        if (month >= 1 && month <= 9) {
          month = "0" + month;
        }
        if (strDate >= 0 && strDate <= 9) {
          strDate = "0" + strDate;
        }
        var currentdate = year + seperator1 + month + seperator1 + strDate;
        this.date = currentdate;
      },
      cancelPasue() {
        var pause_ = document.getElementById("pause");
        pause_.style.display = "none";
      }
    },
    created: function () {

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
