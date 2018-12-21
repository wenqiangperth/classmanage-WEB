<template>
  <div>
    <div id="head" class="head">
      <div class="title">
        <i class="el-icon-back icon1 icon0" @click="gotoSeminarPage"></i>
        OOAD
        <el-dropdown class="plus" trigger="click">
          <i class="el-icon-plus icon0"></i>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item><i class="el-icon-bell" @click="gotoHomePage">&nbsp;&nbsp;个人页</i></el-dropdown-item>
            <el-dropdown-item><i class="el-icon-service" @click="gotoSeminarPage">&nbsp;&nbsp;个人页</i></el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </div>
    </div>
    <div class="main">
      <div style="width:100%;height:25px"></div>
      <table class="info" cellspacing="0" style="font-family: 黑体;color: #616161">
        <tr class="tr0">
          <td class="td1"><label>轮次:</label></td>
          <td><label>{{seminar.round}}</label></td>
        </tr>
        <tr class="tr1">
          <td class="td1"><label>主题:</label></td>
          <td><label>{{seminar.topic}}</label></td>
        </tr>
        <tr class="tr0">
          <td class="td1"><label>课次序号:</label></td>
          <td><label>{{seminar.num}}</label></td>
        </tr>
        <tr class="tr1">
          <td class="td1"><label>要求:</label></td>
          <td><label>{{seminar.require}}</label></td>
        </tr>
        <tr class="tr0">
          <td class="td1"><label>课程情况:</label></td>
          <td>
            <label>{{seminar.status}}
              <el-button type="text" size="small" style="color:#66cccc;" @click="checkInfo">查看信息</el-button>
            </label>
          </td>
        </tr>
      </table>
      <div>
        <el-button type="success" class="btn" plain @click="viewReport" style="margin-top: 140px">书面报告</el-button>
      </div>
      <div>
        <el-button type="success" class="btn1 btn" plain @click="viewResults">查看成绩</el-button>
      </div>

    </div>

  </div>
</template>

<script>
  export default {
    name: "EndSeminar",
    data() {
      return {
        seminar: {
          seminarId: '',
          round: '第二轮',
          topic: '领域模型',
          num: '1',
          require: '界面导航图和所有界面原型设计课堂讨论每个小组15分钟',
          status: '已完成',

        },
      }
    },
    methods: {
      gotoHomePage(){
        this.$router.push({path:'/teacher/HomePage'});
      },
      gotoSeminarPage() {
        this.$router.push({path: '/teacher/SeminarPage'});
      },
      viewReport() {
        this.$router.push({path: '/teacher/ReportPage'});
      },
      viewResults() {
        this.$router.push({path: '/teacher/ResultsPage'});
      },
      checkInfo() {
        this.$router.push({path: '/teacher/CheckInformation'});
      }
    }

  }
</script>

<style scoped>

  .btn1 {
    margin-top: 5px;
  }

  .tr0 {
    height: 45px;
    background-color: rgba(97, 97, 97, 0.05);
  }

  .tr1 {
    height: 45px;
    background-color: rgba(102, 204, 204, 0.05);
  }

  .td1 {
    width: 30%;
  }


</style>

