<template>
  <div>
    <div id="head" class="head">
      <div class="title">
        <router-link :to="{name:'ReportPage'}"><i class="el-icon-back icon1 icon0"></i></router-link>
        OOAD--书面报告
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
        <table style="width: 100%"
               v-for="(item,index) in reports"
               :key="index">
          <tr id="tr0">
            <td style="width: 20%">{{item.groupId}}</td>
            <td style="width: 55%;"><a href="#" style="text-decoration: none">{{item.reportUrl}}</a></td>
            <td>
              <el-input id="input0" placeholder="成绩" v-model="item.result"></el-input>
            </td>
          </tr>
        </table>
      </el-card>
      <div>
        <el-button type="success" class="btn" plain
                   style="margin-top: 10px"
                   @click="updateSuccess">确认修改
        </el-button>
      </div>
    </div>

  </div>
</template>

<script>
  export default {
    name: "GradeReports",
    data() {
      return {
        reports: [
          {
            groupId: '3-1',
            reportUrl: '3-1业务流程.ppt',
            result: '5.0'
          },
          {
            groupId: '3-2',
            reportUrl: '3-2业务流程.ppt',
            result: '5.0'
          }, {
            groupId: '3-3',
            reportUrl: '3-3业务流程.ppt',
            result: '5.0'
          },
          {
            groupId: '3-4',
            reportUrl: '3-4业务流程.ppt',
            result: '空'
          },
          {
            groupId: '3-5',
            reportUrl: '3-5业务流程.ppt',
            result: '5.0'
          },
          {
            groupId: '3-6',
            reportUrl: '3-6业务流程.ppt',
            result: '5.0'
          }
        ]
      }
    },
    methods: {
      updateSuccess() {
        this.$router.push({path: '/teacher/AfterSeminar'});
      },

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

