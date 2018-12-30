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

