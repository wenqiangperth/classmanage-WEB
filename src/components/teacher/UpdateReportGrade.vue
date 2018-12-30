<template>
  <div>
    <div id="head" class="head">
      <div class="title">
        <i class="el-icon-back icon1 icon0" @click="Back"></i>
        修改报告成绩
      </div>
    </div>
    <div class="main">
      <el-card style="width: 100%">
        <table style="width: 100%"
               v-for="(item,index) in reports"
               :key="index">
          <tr id="tr0" style="width: 100%">
            <td style="width: 20%">{{item.groupId}}</td>
            <td style="width: 55%;"><a href="#" style="text-decoration: none;color: #66cccc">{{item.reportUrl}}</a></td>
            <td>
              <el-input id="input0" placeholder="成绩" v-model="item.result"></el-input>
            </td>
          </tr>
        </table>
      </el-card>
      <div style="width: 100%">
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
      Back() {
        this.$router.go(-1);
      },
      updateSuccess() {
        this.$router.push({path: '/teacher/AfterSeminar'});
      }

    }
  }
</script>

<style scoped>

</style>

