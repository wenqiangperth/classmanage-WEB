<template>
  <div>
    <div id="head" class="head">
      <div class="title">
        <i class="el-icon-back icon1 icon0" @click="returnAfterSeminar"></i>
        成绩
        <el-dropdown class="plus" trigger="click">
          <i class="el-icon-plus icon0"></i>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item><i class="el-icon-bell" @click="gotoHomePage">&nbsp;&nbsp;个人页</i></el-dropdown-item>
            <el-dropdown-item><i class="el-icon-service" @click="gotoSeminar">&nbsp;&nbsp;讨论课</i></el-dropdown-item>
            <el-dropdown-item>
              <router-link :to="{name:'Login'}"><i class="el-icon-back icon0"></i>&nbsp;&nbsp;退 出</router-link>
            </el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </div>
    </div>
    <div class="main">
      <el-card>
        <table style="width: 100%;text-align: center">
          <tr>
            <td style="width: 15%" class="font_style">组号</td>
            <td style="width: 21.25%;" class="font_style">展示</td>
            <td style="width: 21.25%;" class="font_style">提问</td>
            <td style="width: 21.25%;" class="font_style">报告</td>
            <td class="font_style">总分</td>
          </tr>
        </table>
        <table style="width: 100%;text-align: center"
               v-for="(item,index) in results"
               :key="index">
          <tr>
            <td style="width: 15%">{{item.groupId}}</td>
            <td style="width: 21.25%;">
              <el-input class="input0" placeholder="成绩" v-model="item.pre"></el-input>
            </td>
            <td style="width: 21.25%;">
              <el-input class="input0" placeholder="成绩" v-model="item.question"></el-input>
            </td>
            <td style="width: 21.25%;">
              <el-input class="input0" placeholder="成绩" v-model="item.report"></el-input>
            </td>
            <td>
              <el-input placeholder="成绩" v-model="item.all" :disabled="true"></el-input>
            </td>
          </tr>
        </table>
      </el-card>

      <div>
        <el-button type="success" class="btn" plain
                   style="margin-top: 40px"
                   @click="updateSuccess">确认修改
        </el-button>
      </div>
    </div>

  </div>
</template>

<script>
  export default {
    name: "ResultsPage",
    data() {
      return {
        results: [
          {
            groupId: '3-1',
            pre: '5.0',
            question: '5.0',
            report: '5.0',
            all: '5.0'
          },
          {
            groupId: '3-2',
            pre: '5.0',
            question: '5.0',
            report: '5.0',
            all: '5.0'
          }, {
            groupId: '3-3',
            pre: '5.0',
            question: '5.0',
            report: '5.0',
            all: '5.0'
          },
          {
            groupId: '3-4',
            pre: '5.0',
            question: '5.0',
            report: '5.0',
            all: '5.0'
          },
          {
            groupId: '3-5',
            pre: '5.0',
            question: '5.0',
            report: '5.0',
            all: '5.0'
          },
          {
            groupId: '3-6',
            pre: '5.0',
            question: '5.0',
            report: '5.0',
            all: '5.0'
          }
        ]
      }
    },
    methods: {
      gotoHomePage(){
        this.$router.push({path:'/teacher/HomePage'});
      },
      gotoSeminar(){
        this.$router.push({path:'/teacher/SeminarPage'});
      },
      updateSuccess() {
        this.$message({
          message: '修改成功!',
          type: 'success'
        });
        this.$router.push({path: '/teacher/AfterSeminar'});
      },
      returnAfterSeminar() {
        this.$router.push({path: '/teacher/AfterSeminar'});
      }

    }
  }
</script>

<style scoped>


  .input0 {
    background-color: lavender;
  }

</style>


