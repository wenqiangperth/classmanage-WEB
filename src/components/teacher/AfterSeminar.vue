<template>
  <div>
    <div id="head" class="head">
      <div class="title">
        <router-link :to="{name:'SeminarPage'}"><i class="el-icon-back icon1 icon0"></i></router-link>
        OOAD--讨论课
        <el-dropdown class="plus" trigger="click">
          <i class="el-icon-plus icon0"></i>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item><i class="el-icon-bell icon0"></i>&nbsp;&nbsp;个人页</el-dropdown-item>
            <el-dropdown-item>
              <router-link :to="{name:'Login'}"><i class="el-icon-back icon0"></i>&nbsp;&nbsp;退 出</router-link>
            </el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </div>
    </div>
    <div class="main">
      <el-card>
        <div slot="header">
          <span>主题:{{}}</span>
        </div>
        <table style="width: 100%;text-align: center">
          <tr style="line-height: 40px">
            <td style="width: 30%">课次序号:</td>
            <td>{{}}</td>
          </tr>
          <tr>
            <td style="width: 30%">要求:</td>
            <td style="text-align: left">{{}}</td>
          </tr>
          <tr>
            <td style="width: 30%">课程情况:</td>
            <td>{{status[2]}}&nbsp;&nbsp;
              <el-button type="text">查看信息</el-button>
            </td>
          </tr>
        </table>
      </el-card>
      <div>
        <el-button type="success" class="btn" plain @click="viewReport">书面报告</el-button>
      </div>
      <div>
        <el-button type="success" class="btn1" plain @click="viewResults">查看成绩</el-button>
      </div>

    </div>

  </div>
</template>

<script>
  export default {
    name: "EndSeminar",
    data() {
      return {
        status: [
          '未开始',
          '暂停',
          '已完成'
        ]
      }
    },
    methods: {
      viewReport() {
        this.$router.push({path: '/teacher/ReportPage'});
      },
      viewResults() {
        this.$router.push({path: '/teacher/ResultsPage'});
      }
    }

  }
</script>

<style scoped>
  .head {
    height: 70px;
    width: 100%;
    background-color: #CCFF99;
  }

  .title {
    display: block;
    text-align: center;
    line-height: 70px;
  }

  .plus {
    float: right;
    margin-right: 3%;
    line-height: 70px;
  }

  .icon1 {
    float: left;
    margin-left: 3%;
    line-height: 70px;
  }

  .icon0 {
    font-weight: bolder;
  }
  .btn {
    width: 100%;
    border: none;
    color: white;
    background-color: #66cccc;
    margin-top: 100px;
  }

  .btn1 {
    width: 100%;
    border: none;
    color: white;
    background-color: #66cccc;
    margin-top: 5px;
  }

  .main {
    width: 50%;
    margin: auto;
  }

  @media (max-width: 640px) {
    .main {
      width: 100%;
    }
  }


</style>

